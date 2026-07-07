/**
 * Seed script — reads scraped JSON data and inserts into PostgreSQL.
 * Run with: npm run db:seed (requires DATABASE_URL in .env)
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../server/db/schema';
import dotenv from 'dotenv';

dotenv.config();

const DATA_DIR = resolve(import.meta.dirname, '../scraped-data');

function loadJSON<T>(filename: string): T {
  const raw = readFileSync(resolve(DATA_DIR, filename), 'utf-8');
  return JSON.parse(raw) as T;
}

function slugify(text: string): string {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 200);
}

async function seed() {
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle(client, { schema });

  console.log('🌱 Seeding database...');

  // --- Wiki Articles ---
  const wikiData = loadJSON<any[]>('wiki_articles.json');
  console.log(`  📚 Inserting ${wikiData.length} wiki articles...`);
  for (const article of wikiData) {
    await db.insert(schema.wikiArticles).values({
      slug: article.slug,
      title: article.title,
      category: article.category,
      categoryLabel: article.categoryLabel || article.category_label || article.category,
      summary: article.summary,
      content: article.content,
      citations: article.citations || [],
    }).onConflictDoNothing();
  }

  // --- Claim Records ---
  const claimsData = loadJSON<any[]>('claim_records.json');
  console.log(`  ⚖️  Inserting ${claimsData.length} claim records...`);
  for (const claim of claimsData) {
    await db.insert(schema.claimRecords).values({
      slug: claim.slug,
      claimText: claim.claim_text || claim.claimText,
      domain: claim.domain,
      category: claim.category,
      summary: claim.summary,
      content: claim.content,
      citations: claim.citations || [],
    }).onConflictDoNothing();
  }

  // --- Documents ---
  const docsData = loadJSON<any[]>('documents.json');
  console.log(`  📄 Inserting ${docsData.length} documents...`);
  for (const doc of docsData) {
    await db.insert(schema.documents).values({
      slug: doc.slug || slugify(doc.title),
      title: doc.title,
      author: doc.author,
      year: doc.year,
      type: doc.type,
      jurisdiction: doc.jurisdiction,
      description: doc.description,
      sourceUrl: doc.source_url || doc.sourceUrl,
      downloadUrl: doc.download_url || doc.downloadUrl,
      wordsIndexed: doc.words_indexed || doc.wordsIndexed || 0,
      status: doc.status || 'pending',
    }).onConflictDoNothing();
  }

  // --- Data Room ---
  const dataRoomData = loadJSON<any[]>('data_room.json');
  console.log(`  🗄️  Inserting ${dataRoomData.length} data room items...`);
  for (const item of dataRoomData) {
    await db.insert(schema.dataRoomItems).values({
      slug: item.slug,
      title: item.title,
      author: item.author,
      year: item.year,
      type: item.type,
      description: item.description,
      anglerTakeaway: item.angler_takeaway || item.anglerTakeaway,
      fullSummary: item.full_summary || item.fullSummary,
      downloadUrl: item.download_url || item.downloadUrl,
      sourceUrl: item.source_url || item.sourceUrl,
    }).onConflictDoNothing();
  }

  // --- Regulations ---
  const regsData = loadJSON<any[]>('regulations.json');
  console.log(`  📋 Inserting ${regsData.length} state regulations...`);
  for (const reg of regsData) {
    await db.insert(schema.regulations).values({
      state: reg.state,
      sizeLimit: reg.size_limit || reg.sizeLimit,
      bagLimit: reg.bag_limit || reg.bagLimit,
      slotLimit: reg.slot_limit || reg.slotLimit,
      seasonOpen: reg.season_open || reg.seasonOpen,
      seasonClosed: reg.season_closed || reg.seasonClosed || '',
      notes: reg.notes || '',
      officialUrl: reg.official_url || reg.officialUrl,
    }).onConflictDoNothing();
  }

  console.log('✅ Seeding complete!');
  await client.end();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err);
  process.exit(1);
});
