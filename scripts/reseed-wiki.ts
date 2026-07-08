/**
 * Re-seed wiki articles: update existing rows with full content from the 15-article JSON.
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { eq } from 'drizzle-orm';
import * as schema from '../server/db/schema';
import dotenv from 'dotenv';

dotenv.config();

async function reseed() {
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle(client, { schema });

  const data = JSON.parse(readFileSync(resolve(import.meta.dirname, '../scraped-data/wiki_articles.json'), 'utf-8'));
  console.log(`Updating ${data.length} wiki articles...`);

  for (const article of data) {
    const result = await db.update(schema.wikiArticles)
      .set({
        title: article.title,
        category: article.category,
        categoryLabel: article.categoryLabel || article.category,
        summary: article.summary,
        content: article.content,
        citations: article.citations || [],
      })
      .where(eq(schema.wikiArticles.slug, article.slug));
    console.log(`  ✅ ${article.slug}: ${article.title.slice(0, 50)}`);
  }

  // Verify
  const articles = await db.select({ slug: schema.wikiArticles.slug, title: schema.wikiArticles.title })
    .from(schema.wikiArticles);
  const empty = articles.filter(a => !a.title);
  console.log(`\nDone. ${articles.length} total, ${empty.length} still empty.`);
  
  await client.end();
}

reseed().catch(console.error);
