import { useState } from 'react';
import { Link } from 'wouter';
import { Search } from 'lucide-react';
import { CategoryTag } from '../components/CategoryTag';

const categories = ['ALL', 'MGMT', 'ASMT', 'REGS', 'ALLOC', 'MORT', 'SPWN', 'ECOL', 'ECON', 'DATA', 'LEGIS', 'PROC'];

// Placeholder data - will be replaced with tRPC query
const articles = [
  { slug: 'mrip-data-errors', category: 'DATA', categoryLabel: 'Data & Methodology', title: 'MRIP Data Errors and the FES Methodology: How Recreational Catch Estimates Went Wrong', summary: 'NOAA acknowledged in 2023 that the MRIP FES had a telescoping error that overstated recreational striped bass catch by ~30-40%.', reviewed: 'Jun 2026' },
  { slug: 'rebuilding-plan-1984-2029', category: 'MGMT', categoryLabel: 'Management Plans', title: 'The Striped Bass Rebuilding Plan: From the 1984 Collapse to the 2029 Deadline', summary: 'Striped bass have been rebuilt once (by 1995) and are currently in a second rebuilding period with a 2029 deadline.', reviewed: 'Jun 2026' },
  { slug: 'maryland-juvenile-index', category: 'ASMT', categoryLabel: 'Stock Assessments', title: 'The Maryland Juvenile Striped Bass Index: 70 Years of Recruitment Data', summary: 'Maryland has measured juvenile striped bass abundance every year since 1954.', reviewed: 'Jun 2026' },
  { slug: 'atlantic-striped-bass-conservation-act-1984', category: 'LEGIS', categoryLabel: 'Legislative History', title: 'The Atlantic Striped Bass Conservation Act of 1984', summary: 'The 1984 Act gave the ASMFC real enforcement authority for the first time.', reviewed: 'Jun 2026' },
  { slug: 'state-regulations-2025', category: 'REGS', categoryLabel: 'State Regulations', title: 'Atlantic Striped Bass State Regulations: A Comparative Overview (2025)', summary: 'Striped bass regulations vary by state within the ASMFC framework.', reviewed: 'Jun 2026' },
  { slug: 'menhaden-striper-connection', category: 'ECOL', categoryLabel: 'Forage & Ecosystem', title: 'Atlantic Menhaden and Striped Bass: The Forage Connection', summary: 'Menhaden are the primary prey of adult striped bass.', reviewed: 'Jun 2026' },
  { slug: 'how-asmfc-works', category: 'PROC', categoryLabel: 'Agency & Process', title: 'How the ASMFC Works: Structure, Process, and Decision-Making', summary: 'The ASMFC is a 15-state interstate compact that manages striped bass in state waters.', reviewed: 'Jun 2026' },
  { slug: 'diodati-release-mortality', category: 'MORT', categoryLabel: 'Mortality Data', title: 'The Diodati Release Mortality Study (1996): A Critical Examination', summary: 'The 9% release mortality figure comes from a 1996 study with serious methodological flaws.', reviewed: 'Jun 2026' },
  { slug: '2018-benchmark-assessment', category: 'ASMT', categoryLabel: 'Stock Assessments', title: '2018 Benchmark Stock Assessment for Atlantic Striped Bass', summary: 'The 2018 benchmark found the stock overfished and overfishing occurring.', reviewed: 'Jun 2026' },
  { slug: 'commercial-recreational-allocation', category: 'ALLOC', categoryLabel: 'Allocation & Quota', title: 'Commercial vs. Recreational Allocation of Atlantic Striped Bass', summary: 'Striped bass are allocated ~82% recreational, ~18% commercial.', reviewed: 'Jun 2026' },
  { slug: 'stock-assessment-methods', category: 'DATA', categoryLabel: 'Data & Methodology', title: 'How ASMFC Stock Assessments Work: Methods, Data, and Peer Review', summary: 'Stock assessments use catch data, the Maryland juvenile index, and statistical models.', reviewed: 'Jun 2026' },
  { slug: 'economic-impact', category: 'ECON', categoryLabel: 'Economic Impact', title: 'The Economic Impact of Recreational Striped Bass Fishing', summary: 'Recreational striped bass fishing generates ~$7.8B in annual economic activity.', reviewed: 'Jun 2026' },
  { slug: 'chesapeake-bay-spawning', category: 'SPWN', categoryLabel: 'Spawning & Recruitment', title: 'The Chesapeake Bay Spawning Stock: The Engine of the Atlantic Coast Population', summary: 'The Chesapeake Bay produces 70-80% of the Atlantic coast striped bass population.', reviewed: 'Jun 2026' },
  { slug: 'amendment-6-2003', category: 'MGMT', categoryLabel: 'Management Plans', title: 'ASMFC Amendment 6 to the Interstate Fishery Management Plan for Atlantic Striped Bass (2003)', summary: 'Amendment 6 governed striped bass for nearly 20 years.', reviewed: 'Jun 2026' },
  { slug: 'amendment-7-2022', category: 'MGMT', categoryLabel: 'Management Plans', title: 'ASMFC Amendment 7 to the Interstate Fishery Management Plan for Atlantic Striped Bass', summary: 'Amendment 7 declared the stock overfished, set a 2029 rebuilding deadline.', reviewed: 'Jun 2026' },
];

export function WikiListPage() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = articles.filter((a) => {
    if (activeCategory !== 'ALL' && a.category !== activeCategory) return false;
    if (search && !a.title.toLowerCase().includes(search.toLowerCase()) &&
        !a.summary.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <h1 className="text-lg font-bold tracking-wider" style={{ color: 'var(--text-primary)' }}>
          WIKI KNOWLEDGE BASE
        </h1>
        <span style={{ color: 'var(--text-muted)' }}>·</span>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {filtered.length} articles · 11 domains
        </span>
      </div>

      {/* Search */}
      <div className="my-4">
        <div
          className="flex items-center rounded-lg border px-3 py-2"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
        >
          <Search className="w-4 h-4 mr-2" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search articles..."
            className="flex-1 bg-transparent border-none outline-none text-sm"
            style={{ color: 'var(--text-primary)' }}
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-3 py-1 rounded text-xs font-semibold tracking-wider cursor-pointer transition-colors"
            style={{
              backgroundColor: activeCategory === cat ? 'var(--accent)' : 'var(--bg-card)',
              color: activeCategory === cat ? '#000' : 'var(--text-secondary)',
              border: `1px solid ${activeCategory === cat ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Table header */}
      <div className="grid grid-cols-[60px_1fr_160px_80px] gap-4 px-4 py-2 mb-2">
        <span className="section-header">TYPE</span>
        <span className="section-header">ARTICLE</span>
        <span className="section-header">CATEGORY</span>
        <span className="section-header">REVIEWED</span>
      </div>

      {/* Article list */}
      <div className="space-y-2">
        {filtered.map((article) => (
          <Link key={article.slug} href={`/wiki/${article.slug}`}>
            <div
              className="grid grid-cols-[60px_1fr_160px_80px] gap-4 items-start rounded-lg border px-4 py-3 cursor-pointer transition-colors"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--bg-card)',
              }}
            >
              <CategoryTag code={article.category} />
              <div>
                <div className="text-sm font-medium mb-1">{article.title}</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                  {article.summary}
                </div>
              </div>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                {article.categoryLabel}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {article.reviewed}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
