import { useState } from 'react';
import { Link, useSearch } from 'wouter';
import { Search } from 'lucide-react';
import { CategoryTag } from '../components/CategoryTag';
import { trpc } from '../lib/trpc';

const categories = ['ALL', 'MGMT', 'ASMT', 'REGS', 'ALLOC', 'MORT', 'SPWN', 'ECOL', 'ECON', 'DATA', 'LEGIS', 'PROC'];

export function WikiListPage() {
  const searchParams = useSearch();
  const initialCat = new URLSearchParams(searchParams).get('category') || 'ALL';
  const [activeCategory, setActiveCategory] = useState(initialCat);
  const [search, setSearch] = useState('');
  const { data: articles = [] } = trpc.wiki.list.useQuery({});

  const filtered = articles.filter((a: any) => {
    if (activeCategory !== 'ALL' && a.category !== activeCategory) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) &&
        !a.summary.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-1">
        <h1 className="text-lg font-bold tracking-wider">WIKI KNOWLEDGE BASE</h1>
        <span style={{ color: 'var(--text-muted)' }}>·</span>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{filtered.length} articles · 11 domains</span>
      </div>

      <div className="my-4">
        <div className="flex items-center rounded-lg border px-3 py-2" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
          <Search className="w-4 h-4 mr-2" style={{ color: 'var(--text-muted)' }} />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search articles..."
            className="flex-1 bg-transparent border-none outline-none text-sm" style={{ color: 'var(--text-primary)' }} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className="px-3 py-1 rounded text-xs font-semibold tracking-wider cursor-pointer transition-colors"
            style={{ backgroundColor: activeCategory === cat ? 'var(--accent)' : 'var(--bg-card)', color: activeCategory === cat ? '#000' : 'var(--text-secondary)', border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border)'}` }}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-[60px_1fr_160px_80px] gap-4 px-4 py-2 mb-2">
        <span className="section-header">TYPE</span>
        <span className="section-header">ARTICLE</span>
        <span className="section-header">CATEGORY</span>
        <span className="section-header">REVIEWED</span>
      </div>

      <div className="space-y-2">
        {filtered.map((a: any) => (
          <Link key={a.slug} href={`/wiki/${a.slug}`}>
            <div className="grid grid-cols-[60px_1fr_160px_80px] gap-4 items-start rounded-lg border px-4 py-3 cursor-pointer transition-colors"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
              <CategoryTag code={a.category} />
              <div>
                <div className="text-sm font-medium mb-1">{a.title}</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{a.summary}</div>
              </div>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{a.categoryLabel}</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Jun 2026</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
