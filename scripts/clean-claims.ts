/**
 * Clean claim record content: strip web_extract metadata.
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

  const claims = await db.select().from(schema.claimRecords);
  console.log(`Cleaning ${claims.length} claims...`);

  let cleaned = 0;
  for (const claim of claims) {
    let content = claim.content;
    const original = content;

    // Remove web_extract boilerplate
    content = content.replace(/^Stripedbass\.org\n+/m, '');
    content = content.replace(/^Title: [^\n]+\n+/m, '');
    content = content.replace(/^URL Source: [^\n]+\n+/m, '');

    // Remove footer
    content = content.replace(/\[Back to Claims?\]?\([^)]*\)\s*$/m, '');
    content = content.replace(/\[Ask the AI[^\]]*\]\([^)]*\)\s*$/m, '');

    // Remove Primary Sources section (we have citations separately)
    const psIndex = content.indexOf('\n## Primary Sources\n');
    if (psIndex > 0) content = content.slice(0, psIndex).trim();
    const psIndex2 = content.indexOf('\n## Sources\n');
    if (psIndex2 > 0) content = content.slice(0, psIndex2).trim();

    content = content.trim();
    if (content !== original) {
      await db.update(schema.claimRecords).set({ content }).where(sql`slug = ${claim.slug}`);
      cleaned++;
    }
  }

  console.log(`Done. Cleaned ${cleaned} of ${claims.length} claims.`);
  await client.end();
}

clean().catch(console.error);
