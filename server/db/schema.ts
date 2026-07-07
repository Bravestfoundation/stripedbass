import { pgTable, serial, text, varchar, integer, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

// Wiki articles - the knowledge base
export const wikiArticles = pgTable('wiki_articles', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  title: text('title').notNull(),
  category: varchar('category', { length: 64 }).notNull(), // MGMT, ASMT, REGS, etc.
  categoryLabel: varchar('category_label', { length: 128 }).notNull(), // "Management Plans", "Stock Assessments"
  summary: text('summary').notNull(),
  content: text('content').notNull(), // Full markdown content
  citations: jsonb('citations').$type<Array<{ label: string; url?: string; text: string }>>(),
  reviewedAt: timestamp('reviewed_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Claim records - fact-checked claims
export const claimRecords = pgTable('claim_records', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  claimText: text('claim_text').notNull(), // The claim itself in quotes
  domain: varchar('domain', { length: 64 }).notNull(), // MGMT, DATA, MORT, etc.
  category: varchar('category', { length: 128 }).notNull(), // "Data/Science", "Management"
  summary: text('summary').notNull(),
  content: text('content').notNull(), // Full analysis markdown
  citations: jsonb('citations').$type<Array<{ label: string; url?: string; text: string }>>(),
  reviewedAt: timestamp('reviewed_at').defaultNow(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Documents - the PDF library
export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  title: text('title').notNull(),
  author: varchar('author', { length: 256 }).notNull(),
  year: integer('year').notNull(),
  type: varchar('type', { length: 64 }).notNull(), // "Stock Assessment", "Amendment", "Addendum", etc.
  jurisdiction: varchar('jurisdiction', { length: 64 }).notNull(), // "ASMFC", "Maryland", "NOAA", etc.
  description: text('description').notNull(),
  sourceUrl: text('source_url'), // Public URL for the original document
  downloadUrl: text('download_url'), // Direct download link
  localPath: varchar('local_path', { length: 512 }), // Path to stored PDF
  wordsIndexed: integer('words_indexed').default(0),
  status: varchar('status', { length: 32 }).default('pending'), // indexed, failed, fetching, pending
  createdAt: timestamp('created_at').defaultNow(),
});

// Document chunks for RAG
export const documentChunks = pgTable('document_chunks', {
  id: serial('id').primaryKey(),
  documentId: integer('document_id').notNull().references(() => documents.id),
  chunkIndex: integer('chunk_index').notNull(),
  content: text('content').notNull(),
  embedding: text('embedding'), // We'll store as text and cast to vector in queries
  tokenCount: integer('token_count').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

// Data room - annotated document summaries
export const dataRoomItems = pgTable('data_room_items', {
  id: serial('id').primaryKey(),
  slug: varchar('slug', { length: 256 }).notNull().unique(),
  title: text('title').notNull(),
  author: varchar('author', { length: 256 }).notNull(),
  year: integer('year').notNull(),
  type: varchar('type', { length: 64 }).notNull(), // "Stock Assessment", "Regulatory Document", etc.
  description: text('description').notNull(),
  anglerTakeaway: text('angler_takeaway').notNull(),
  fullSummary: text('full_summary'), // Extended AI summary
  downloadUrl: text('download_url'),
  sourceUrl: text('source_url'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Regulations - state-by-state fishing rules
export const regulations = pgTable('regulations', {
  id: serial('id').primaryKey(),
  state: varchar('state', { length: 128 }).notNull().unique(),
  sizeLimit: text('size_limit').notNull(),
  bagLimit: text('bag_limit').notNull(),
  slotLimit: text('slot_limit').notNull(),
  seasonOpen: text('season_open').notNull(),
  seasonClosed: text('season_closed'),
  notes: text('notes'),
  officialUrl: text('official_url'),
  updatedAt: timestamp('updated_at').defaultNow(),
});
