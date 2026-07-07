# Stripedbass.org

**The Striped Bass Authority** — Atlantic Striped Bass Research Database

A full-stack research platform with AI-powered search across ASMFC documents, stock assessments, and scientific literature on Atlantic striped bass management.

## Features

- **AI Chat** — RAG-powered Q&A over 835 document chunks (527K+ words)
- **Wiki** — 15 in-depth articles across 11 knowledge domains
- **Claim Records** — 25 fact-checked claims with sourced evidence
- **Data Room** — Annotated summaries of key scientific documents
- **Document Library** — 20 indexed PDFs from ASMFC, NOAA, state agencies
- **Regulations Hub** — State-by-state fishing rules for all 16 Atlantic jurisdictions

## Stack

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4 + Wouter
- **Backend:** Express + tRPC + Drizzle ORM
- **Database:** PostgreSQL (with pgvector for RAG embeddings)
- **AI:** OpenRouter (chat) + OpenAI embeddings
- **Deploy:** Railway

## Development

```bash
cp .env.example .env
# Fill in DATABASE_URL and OPENROUTER_API_KEY
npm install
npm run db:push    # Create tables
npm run db:seed    # Seed from scraped data
npm run dev        # Start client + server
```

## License

MIT
