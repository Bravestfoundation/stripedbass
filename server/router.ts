import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { db, schema } from './db';
import { eq, ilike, or, sql, desc } from 'drizzle-orm';
import type { Context } from './context';

const t = initTRPC.context<Context>().create();
const publicProcedure = t.procedure;

export const appRouter = t.router({
  // Wiki articles
  wiki: t.router({
    list: publicProcedure
      .input(z.object({
        category: z.string().optional(),
        search: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        let query = db.select().from(schema.wikiArticles).orderBy(desc(schema.wikiArticles.reviewedAt));
        // TODO: add filtering once data is seeded
        return query;
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const [article] = await db.select().from(schema.wikiArticles)
          .where(eq(schema.wikiArticles.slug, input.slug));
        return article ?? null;
      }),
  }),

  // Claim records
  claims: t.router({
    list: publicProcedure
      .input(z.object({
        domain: z.string().optional(),
        search: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.select().from(schema.claimRecords).orderBy(desc(schema.claimRecords.reviewedAt));
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const [claim] = await db.select().from(schema.claimRecords)
          .where(eq(schema.claimRecords.slug, input.slug));
        return claim ?? null;
      }),
  }),

  // Documents library
  documents: t.router({
    list: publicProcedure
      .input(z.object({
        type: z.string().optional(),
        jurisdiction: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        return db.select().from(schema.documents).orderBy(desc(schema.documents.year));
      }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const [doc] = await db.select().from(schema.documents)
          .where(eq(schema.documents.slug, input.slug));
        return doc ?? null;
      }),
  }),

  // Data room
  dataRoom: t.router({
    list: publicProcedure.query(async () => {
      return db.select().from(schema.dataRoomItems).orderBy(desc(schema.dataRoomItems.year));
    }),

    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const [item] = await db.select().from(schema.dataRoomItems)
          .where(eq(schema.dataRoomItems.slug, input.slug));
        return item ?? null;
      }),
  }),

  // Regulations
  regulations: t.router({
    list: publicProcedure.query(async () => {
      return db.select().from(schema.regulations).orderBy(schema.regulations.state);
    }),
  }),

  // Stats for homepage
  stats: publicProcedure.query(async () => {
    const [wikiCount] = await db.select({ count: sql<number>`count(*)` }).from(schema.wikiArticles);
    const [claimCount] = await db.select({ count: sql<number>`count(*)` }).from(schema.claimRecords);
    const [docCount] = await db.select({ count: sql<number>`count(*)` }).from(schema.documents);
    const [chunkCount] = await db.select({ count: sql<number>`count(*)` }).from(schema.documentChunks);
    const [wordCount] = await db.select({ total: sql<number>`coalesce(sum(words_indexed), 0)` }).from(schema.documents);

    return {
      wikiArticles: Number(wikiCount.count),
      claimRecords: Number(claimCount.count),
      documents: Number(docCount.count),
      chunks: Number(chunkCount.count),
      wordsIndexed: Number(wordCount.total),
    };
  }),

  // AI Chat (placeholder - will implement with OpenRouter)
  aiChat: t.router({
    chat: publicProcedure
      .input(z.object({ message: z.string() }))
      .mutation(async ({ input }) => {
        // TODO: implement RAG with pgvector + OpenRouter
        return {
          response: 'AI chat is being set up. Check back soon!',
          sources: [],
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
