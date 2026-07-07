/**
 * Clean wiki article content: strip web_extract metadata headers and footer links.
 */
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { sql } from 'drizzle-orm';
import * as schema from '../server/db/schema';
import dotenv from 'dotenv';

dotenv.config();

async function clean() {
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle(client, { schema });

  const articles = await db.select().from(schema.wikiArticles);
  console.log(`Cleaning ${articles.length} articles...`);

  let cleaned = 0;
  for (const article of articles) {
    let content = article.content;
    const original = content;

    // Remove web_extract metadata lines at the start
    content = content.replace(/^Stripedbass\.org\n+/m, '');
    content = content.replace(/^Title: [^\n]+\n+/m, '');
    content = content.replace(/^URL Source: [^\n]+\n+/m, '');
    content = content.replace(/^\[Wiki\]\([^)]+\)\/[A-Z]+[^\n]*\n+/m, '');
    content = content.replace(/^\d+ citations\n+/m, '');
    content = content.replace(/^[A-Z]+[A-Za-z &]+\n+/m, ''); // Category label line
    content = content.replace(/^Reviewed [^\n]+\n+/m, '');
    content = content.replace(/^\d+ primary source citations[^\n]*\n+/m, '');
    content = content.replace(/^Overview\n+/m, '');

    // Remove the duplicate title at the top (the # heading that matches the article title)
    const titlePattern = new RegExp(`^# ${article.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n+`, 'm');
    content = content.replace(titlePattern, '');

    // Remove footer links
    content = content.replace(/\[Back to Wiki\]\([^)]+\)\s*\[Ask the AI about this\]\([^)]+\)\s*$/m, '');

    // Remove the Primary Sources section if it starts with "## Primary Sources" — we have citations separately
    const psIndex = content.indexOf('\n## Primary Sources\n');
    if (psIndex > 0) {
      content = content.slice(0, psIndex).trim();
    }

    // Trim
    content = content.trim();

    if (content !== original) {
      await db.update(schema.wikiArticles)
        .set({ content })
        .where(sql`slug = ${article.slug}`);
      cleaned++;
      console.log(`  ✅ Cleaned: ${article.slug}`);
    }
  }

  console.log(`Done. Cleaned ${cleaned} of ${articles.length} articles.`);
  await client.end();
}

clean().catch(console.error);
