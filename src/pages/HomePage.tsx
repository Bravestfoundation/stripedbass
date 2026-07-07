import { useState } from 'react';
import { Link } from 'wouter';
import { Search, FileCheck, BookOpen, Database, FileText, ArrowRight } from 'lucide-react';
import { CategoryTag } from '../components/CategoryTag';
import { trpc } from '../lib/trpc';

const suggestedQueries = [
  'What did the 2018 benchmark assessment find?',
  'What is the current SSB relative to Bmsy?',
  'How does Amendment 7 define overfishing?',
  'What is the MRIP FES telescoping error?',
  'How is the Chesapeake Bay juvenile index calculated?',
  'What are the 2025 striped bass regulations in Maryland?',
];

const domains = [
  { code: 'MGMT', label: 'Management Plans' },
  { code: 'ASMT', label: 'Stock Assessments' },
  { code: 'REGS', label: 'State Regulations' },
  { code: 'ALLOC', label: 'Allocation & Quota' },
  { code: 'MORT', label: 'Mortality Data' },
  { code: 'SPWN', label: 'Spawning & Recruitment' },
  { code: 'ECOL', label: 'Forage & Ecosystem' },
  { code: 'ECON', label: 'Economic Impact' },
  { code: 'DATA', label: 'Data & Methodology' },
  { code: 'LEGIS', label: 'Legislative History' },
  { code: 'PROC', label: 'Agency & Process' },
];

export function HomePage() {
  const [query, setQuery] = useState('');
  const stats = trpc.stats.useQuery();
  const wiki = trpc.wiki.list.useQuery({});
  const claims = trpc.claims.list.useQuery({});

  const recentWiki = (wiki.data ?? []).slice(0, 5);
  const recentClaims = (claims.data ?? []).slice(0, 5);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-2 mb-1">
        <h1 className="text-sm font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>STRIPEDBASS.ORG</h1>
        <span style={{ color: 'var(--text-muted)' }}>·</span>
        <span className="text-xs tracking-wider" style={{ color: 'var(--text-muted)' }}>ATLANTIC STRIPED BASS RESEARCH DATABASE</span>
        <span className="ml-2 px-2 py-0.5 text-[10px] rounded-full bg-green-500/20 text-green-400 font-semibold">LIVE</span>
      </div>

      {/* Search */}
      <div className="mt-6 mb-4">
        <div className="flex items-center rounded-lg border px-4 py-3" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-card)' }}>
          <span className="text-xs mr-3 font-mono" style={{ color: 'var(--accent)' }}>query://</span>
          <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about striped bass management, stock assessments, regulations..."
            className="flex-1 bg-transparent border-none outline-none text-sm" style={{ color: 'var(--text-primary)' }} />
          <Link href={query ? `/ask?q=${encodeURIComponent(query)}` : '/ask'}>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold"
              style={{ backgroundColor: query ? 'var(--accent)' : 'var(--bg-card)', color: query ? '#000' : 'var(--text-muted)' }}>
              Ask AI <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {suggestedQueries.map((q) => (
          <Link key={q} href={`/ask?q=${encodeURIComponent(q)}`}>
            <button className="px-3 py-1.5 rounded-full text-xs border cursor-pointer transition-colors hover:border-[var(--accent)]"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)' }}>{q}</button>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { icon: FileCheck, label: 'CLAIM RECORDS', value: stats.data?.claimRecords ?? '—', sub: 'records' },
          { icon: BookOpen, label: 'WIKI ARTICLES', value: stats.data?.wikiArticles ?? '—', sub: 'articles' },
          { icon: Database, label: 'WORDS INDEXED', value: stats.data ? `${Math.round(stats.data.wordsIndexed / 1000)}K+` : '—', sub: 'corpus' },
          { icon: FileText, label: 'SOURCE DOCUMENTS', value: stats.data?.documents ?? '—', sub: 'PDFs' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border p-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span className="section-header">{s.label}</span>
            </div>
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-header">WIKI — RECENT ARTICLES</h2>
            <Link href="/wiki"><span className="text-xs cursor-pointer" style={{ color: 'var(--accent)' }}>view all &gt;</span></Link>
          </div>
          <div className="space-y-2">
            {recentWiki.map((a: any) => (
              <Link key={a.slug} href={`/wiki/${a.slug}`}>
                <div className="rounded-lg border p-3 cursor-pointer transition-colors" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
                  <div className="flex items-center gap-2 mb-1">
                    <CategoryTag code={a.category} />
                    <span className="text-sm font-medium truncate">{a.title}</span>
                  </div>
                  <p className="text-xs line-clamp-2" style={{ color: 'var(--text-secondary)' }}>{a.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-header">CLAIM RECORDS — RECENT</h2>
            <Link href="/claim-records"><span className="text-xs cursor-pointer" style={{ color: 'var(--accent)' }}>view all &gt;</span></Link>
          </div>
          <div className="space-y-2">
            {recentClaims.map((c: any) => (
              <Link key={c.slug} href={`/claim/${c.slug}`}>
                <div className="rounded-lg border p-3 cursor-pointer transition-colors" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
                  <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--accent)15', color: 'var(--accent)' }}>CLAIM</span>
                  <p className="text-sm mt-1">{c.claimText}</p>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{c.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Domains */}
      <div className="grid grid-cols-3 gap-2">
        {domains.map((d) => (
          <Link key={d.code} href={`/wiki?category=${d.code}`}>
            <div className="flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
              <CategoryTag code={d.code} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{d.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
