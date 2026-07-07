import { useState } from 'react';
import { Link } from 'wouter';
import { Search, FileCheck, BookOpen, Database, FileText, ArrowRight } from 'lucide-react';
import { CategoryTag } from '../components/CategoryTag';

const suggestedQueries = [
  'What did the 2018 benchmark assessment find?',
  'What is the current SSB relative to Bmsy?',
  'How does Amendment 7 define overfishing?',
  'What is the MRIP FES telescoping error?',
  'How is the Chesapeake Bay juvenile index calculated?',
  'What are the 2025 striped bass regulations in Maryland?',
];

const recentWiki = [
  { slug: 'commercial-recreational-allocation', category: 'ALLOC', title: 'Commercial vs. Recreational Allocation of Atlantic Striped Bass', summary: 'Striped bass are allocated ~82% recreational, ~18% commercial. The commercial quota is 8.022 million pounds.' },
  { slug: 'rebuilding-plan-1984-2029', category: 'MGMT', title: 'The Striped Bass Rebuilding Plan: From the 1984 Collapse to the 2029 Deadline', summary: 'Striped bass have been rebuilt once (by 1995) and are currently in a second rebuilding period with a 2029 deadline.' },
  { slug: '2018-benchmark-assessment', category: 'ASMT', title: '2018 Benchmark Stock Assessment for Atlantic Striped Bass', summary: 'The 2018 benchmark found the stock overfished and overfishing occurring. It set SSBmsy at ~228,000 MT.' },
  { slug: 'maryland-juvenile-index', category: 'ASMT', title: 'The Maryland Juvenile Striped Bass Index: 70 Years of Recruitment Data', summary: 'Maryland has measured juvenile striped bass abundance every year since 1954.' },
  { slug: 'diodati-release-mortality', category: 'MORT', title: 'The Diodati Release Mortality Study (1996): A Critical Examination', summary: 'The 9% release mortality figure comes from a 1996 study with serious methodological flaws.' },
];

const recentClaims = [
  { slug: 'mrip-data-accuracy', claim: 'MRIP data accurately counts recreational striped bass harvest.', category: 'Data/Science' },
  { slug: 'menhaden-decline-impact', claim: 'The decline of Atlantic menhaden has directly harmed striped bass populations.', category: 'Management' },
  { slug: 'commercial-harvest-share', claim: 'Commercial fishermen take a small share of the total striped bass harvest.', category: 'Management' },
  { slug: 'chesapeake-spawning-failures', claim: 'Striped bass have experienced multiple consecutive spawning failures in the Chesapeake Bay.', category: 'Data/Science' },
  { slug: 'catch-release-mortality-9pct', claim: 'Catch-and-release mortality for striped bass is 9%, as established by the Diodati study.', category: 'Data/Science' },
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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-1">
        <h1 className="text-sm font-bold tracking-wider" style={{ color: 'var(--text-secondary)' }}>
          STRIPEDBASS.ORG
        </h1>
        <span style={{ color: 'var(--text-muted)' }}>·</span>
        <span className="text-xs tracking-wider" style={{ color: 'var(--text-muted)' }}>
          ATLANTIC STRIPED BASS RESEARCH DATABASE
        </span>
        <span className="ml-2 px-2 py-0.5 text-[10px] rounded-full bg-green-500/20 text-green-400 font-semibold">
          LIVE
        </span>
      </div>

      {/* Search */}
      <div className="mt-6 mb-4">
        <div
          className="flex items-center rounded-lg border px-4 py-3"
          style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-card)' }}
        >
          <span className="text-xs mr-3 font-mono" style={{ color: 'var(--accent)' }}>query://</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask about striped bass management, stock assessments, regulations..."
            className="flex-1 bg-transparent border-none outline-none text-sm"
            style={{ color: 'var(--text-primary)' }}
          />
          <Link href={query ? `/ask?q=${encodeURIComponent(query)}` : '/ask'}>
            <button
              className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold"
              style={{
                backgroundColor: query ? 'var(--accent)' : 'var(--bg-card)',
                color: query ? '#000' : 'var(--text-muted)',
              }}
            >
              Ask AI <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>
      </div>

      {/* Suggested queries */}
      <div className="flex flex-wrap gap-2 mb-8">
        {suggestedQueries.map((q) => (
          <Link key={q} href={`/ask?q=${encodeURIComponent(q)}`}>
            <button
              className="px-3 py-1.5 rounded-full text-xs border cursor-pointer transition-colors hover:border-[var(--accent)]"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--bg-card)',
                color: 'var(--text-secondary)',
              }}
            >
              {q}
            </button>
          </Link>
        ))}
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { icon: FileCheck, label: 'CLAIM RECORDS', value: '25', sub: 'records' },
          { icon: BookOpen, label: 'WIKI ARTICLES', value: '15', sub: 'articles' },
          { icon: Database, label: 'WORDS INDEXED', value: '527K+', sub: 'corpus' },
          { icon: FileText, label: 'SOURCE DOCUMENTS', value: '10', sub: 'PDFs' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border p-4"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
          >
            <div className="flex items-center gap-2 mb-2">
              <stat.icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
              <span className="section-header">{stat.label}</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {stat.value}
            </div>
            <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Two-column content */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Wiki articles */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-header">WIKI — RECENT ARTICLES</h2>
            <Link href="/wiki">
              <span className="text-xs cursor-pointer" style={{ color: 'var(--accent)' }}>
                view all &gt;
              </span>
            </Link>
          </div>
          <div className="space-y-2">
            {recentWiki.map((article) => (
              <Link key={article.slug} href={`/wiki/${article.slug}`}>
                <div
                  className="rounded-lg border p-3 cursor-pointer transition-colors"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--bg-card)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <CategoryTag code={article.category} />
                    <span className="text-sm font-medium truncate">{article.title}</span>
                  </div>
                  <p className="text-xs line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                    {article.summary}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Claims */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-header">CLAIM RECORDS — RECENT</h2>
            <Link href="/claim-records">
              <span className="text-xs cursor-pointer" style={{ color: 'var(--accent)' }}>
                view all &gt;
              </span>
            </Link>
          </div>
          <div className="space-y-2">
            {recentClaims.map((claim) => (
              <Link key={claim.slug} href={`/claim/${claim.slug}`}>
                <div
                  className="rounded-lg border p-3 cursor-pointer transition-colors"
                  style={{
                    borderColor: 'var(--border)',
                    backgroundColor: 'var(--bg-card)',
                  }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: 'var(--accent)15', color: 'var(--accent)' }}>
                      CLAIM
                    </span>
                  </div>
                  <p className="text-sm mb-1">{claim.claim}</p>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{claim.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Domain categories */}
      <div className="grid grid-cols-3 gap-2">
        {domains.map((d) => (
          <Link key={d.code} href={`/wiki?category=${d.code}`}>
            <div
              className="flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer transition-colors"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--bg-card)',
              }}
            >
              <CategoryTag code={d.code} />
              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{d.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
