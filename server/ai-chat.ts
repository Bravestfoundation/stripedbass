/**
 * AI Chat service — searches wiki articles + claims for context, then queries OpenRouter.
 * Simple keyword search approach (no vector DB needed for 15 articles + 25 claims).
 */
import { db, schema } from './db';
import { ilike, or, sql } from 'drizzle-orm';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = 'anthropic/claude-3.5-sonnet';

interface ChatResult {
  response: string;
  sources: Array<{ title: string; slug: string; type: 'wiki' | 'claim' }>;
}

// Simple keyword search across wiki + claims content
async function findRelevantContext(query: string): Promise<string> {
  const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  if (words.length === 0) return '';

  // Search wiki articles
  const articles = await db.select({
    title: schema.wikiArticles.title,
    slug: schema.wikiArticles.slug,
    category: schema.wikiArticles.category,
    summary: schema.wikiArticles.summary,
    content: schema.wikiArticles.content,
  }).from(schema.wikiArticles);

  // Search claims
  const claims = await db.select({
    claimText: schema.claimRecords.claimText,
    slug: schema.claimRecords.slug,
    summary: schema.claimRecords.summary,
    content: schema.claimRecords.content,
  }).from(schema.claimRecords);

  // Score articles by keyword match density
  type Scored = { text: string; title: string; slug: string; type: 'wiki' | 'claim'; score: number };
  const scored: Scored[] = [];

  for (const a of articles) {
    const searchable = `${a.title} ${a.summary} ${a.content}`.toLowerCase();
    const score = words.reduce((s, w) => s + (searchable.includes(w) ? 1 : 0), 0);
    if (score > 0) {
      scored.push({ text: `[Wiki: ${a.title}]\n${a.summary}\n\n${a.content.slice(0, 3000)}`, title: a.title, slug: a.slug, type: 'wiki', score });
    }
  }

  for (const c of claims) {
    const searchable = `${c.claimText} ${c.summary} ${c.content}`.toLowerCase();
    const score = words.reduce((s, w) => s + (searchable.includes(w) ? 1 : 0), 0);
    if (score > 0) {
      scored.push({ text: `[Claim: "${c.claimText}"]\n${c.summary}\n\n${c.content.slice(0, 2000)}`, title: c.claimText, slug: c.slug, type: 'claim', score });
    }
  }

  // Take top 3 most relevant
  scored.sort((a, b) => b.score - a.score);
  const top = scored.slice(0, 3);

  return top.map(t => t.text).join('\n\n---\n\n');
}

export async function chat(message: string): Promise<ChatResult> {
  if (!OPENROUTER_API_KEY) {
    return { response: 'AI chat requires an OPENROUTER_API_KEY to be configured.', sources: [] };
  }

  const context = await findRelevantContext(message);

  const systemPrompt = `You are the Stripedbass.org AI assistant — an expert on Atlantic striped bass management, stock assessments, regulations, and science. You answer questions based on the research corpus of ASMFC documents, stock assessments, and scientific literature.

RULES:
- Answer based on the provided context. If the context doesn't contain the answer, say so.
- Cite specific documents, amendments, or data when possible.
- Be concise but thorough. Use plain English, not jargon.
- When discussing regulations, always remind the user to verify with their state agency.
- Format your response in markdown.`;

  const userPrompt = context
    ? `Based on the following research context:\n\n${context}\n\n---\n\nUser question: ${message}`
    : `User question: ${message}\n\n(No specific documents matched this query. Answer from general knowledge about Atlantic striped bass management.)`;

  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://stripedbass.org',
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        max_tokens: 2000,
        temperature: 0.3,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error('OpenRouter API error:', res.status, errText);
      return { response: `AI service returned an error (${res.status}). Please try again.`, sources: [] };
    }

    const data = await res.json() as any;
    const response = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

    // Extract sources from the context we used
    const articles = await db.select({ title: schema.wikiArticles.title, slug: schema.wikiArticles.slug })
      .from(schema.wikiArticles);
    const claims = await db.select({ claimText: schema.claimRecords.claimText, slug: schema.claimRecords.slug })
      .from(schema.claimRecords);

    const words = message.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    const sources: ChatResult['sources'] = [];

    for (const a of articles) {
      if (words.some(w => a.title.toLowerCase().includes(w)) && sources.length < 3) {
        sources.push({ title: a.title, slug: a.slug, type: 'wiki' });
      }
    }

    return { response, sources };
  } catch (err: any) {
    console.error('AI chat error:', err?.message || err);
    console.error('Stack:', err?.stack);
    return { response: 'Sorry, there was an error processing your request.', sources: [] };
  }
}
