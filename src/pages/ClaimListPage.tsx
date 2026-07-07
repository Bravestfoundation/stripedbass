import { useState } from 'react';
import { Link } from 'wouter';
import { Search } from 'lucide-react';
import { trpc } from '../lib/trpc';

const categories = ['ALL', 'MGMT', 'ASMT', 'REGS', 'ALLOC', 'MORT', 'SPWN', 'ECOL', 'ECON', 'DATA', 'LEGIS', 'PROC'];

export function ClaimListPage() {
  const [activeDomain, setActiveDomain] = useState('ALL');
  const [search, setSearch] = useState('');
  const { data: claims = [] } = trpc.claims.list.useQuery({});

  const filtered = claims.filter((c: any) => {
    if (activeDomain !== 'ALL' && c.domain !== activeDomain) return false;
    if (search && !c.claimText.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-1">
        <h1 className="text-lg font-bold tracking-wider">CLAIM RECORDS</h1>
        <span style={{ color: 'var(--text-muted)' }}>·</span>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{filtered.length} records · documented evidence, no verdicts</span>
      </div>

      <div className="flex items-center justify-between my-4">
        <div className="flex items-center rounded-lg border px-3 py-2 flex-1 mr-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
          <Search className="w-4 h-4 mr-2" style={{ color: 'var(--text-muted)' }} />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search claims..."
            className="flex-1 bg-transparent border-none outline-none text-sm" style={{ color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveDomain(cat)}
            className="px-3 py-1 rounded text-xs font-semibold tracking-wider cursor-pointer"
            style={{ backgroundColor: activeDomain === cat ? 'var(--accent)' : 'var(--bg-card)', color: activeDomain === cat ? '#000' : 'var(--text-secondary)', border: `1px solid ${activeDomain === cat ? 'var(--accent)' : 'var(--border)'}` }}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[60px_1fr_120px_80px] gap-4 px-4 py-2 mb-2">
        <span className="section-header">DOMAIN</span>
        <span className="section-header">CLAIM</span>
        <span className="section-header">CATEGORY</span>
        <span className="section-header">REVIEWED</span>
      </div>

      <div className="space-y-2">
        {filtered.map((c: any) => (
          <Link key={c.slug} href={`/claim/${c.slug}`}>
            <div className="grid grid-cols-[60px_1fr_120px_80px] gap-4 items-start rounded-lg border px-4 py-3 cursor-pointer" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
              <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded text-center" style={{ backgroundColor: 'var(--accent)15', color: 'var(--accent)' }}>CLAIM</span>
              <div>
                <div className="text-sm font-medium mb-1">"{c.claimText}"</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{c.summary}</div>
              </div>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{c.category}</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Dec 2024</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
