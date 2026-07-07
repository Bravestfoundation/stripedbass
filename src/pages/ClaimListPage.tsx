import { useState } from 'react';
import { Link } from 'wouter';
import { Search } from 'lucide-react';
import { CategoryTag } from '../components/CategoryTag';

const categories = ['ALL', 'MGMT', 'ASMT', 'REGS', 'ALLOC', 'MORT', 'SPWN', 'ECOL', 'ECON', 'DATA', 'LEGIS', 'PROC'];

const claims = [
  { slug: 'mrip-data-accuracy', domain: 'DATA', claim: 'MRIP data accurately counts recreational striped bass harvest.', summary: "NOAA's own analysis found that the Fishing Effort Survey (FES) component of MRIP contained a systematic error.", category: 'Data/Science', reviewed: 'Dec 2024' },
  { slug: 'menhaden-decline-impact', domain: 'ECOL', claim: 'The decline of Atlantic menhaden has directly harmed striped bass populations.', summary: 'While menhaden are the primary forage fish for striped bass, the direct causal relationship is scientifically contested.', category: 'Management', reviewed: 'Dec 2024' },
  { slug: 'commercial-harvest-share', domain: 'ALLOC', claim: 'Commercial fishermen take a small share of the total striped bass harvest.', summary: "The commercial fishery's impact is concentrated on large, reproductively valuable fish.", category: 'Management', reviewed: 'Dec 2024' },
  { slug: 'chesapeake-spawning-failures', domain: 'SPWN', claim: 'Striped bass have experienced multiple consecutive spawning failures in the Chesapeake Bay.', summary: 'The YOY index has recorded a series of below-average year classes.', category: 'Data/Science', reviewed: 'Dec 2024' },
  { slug: 'circle-hooks-mortality', domain: 'MORT', claim: 'Circle hooks significantly reduce catch-and-release mortality in striped bass.', summary: 'Multiple peer-reviewed studies confirm that circle hooks substantially reduce deep hooking.', category: 'Fishing Technique', reviewed: 'Dec 2024' },
  { slug: 'overfished-2022', domain: 'MGMT', claim: 'Striped bass were declared overfished in 2022.', summary: 'The 2022 ASMFC stock assessment update confirmed that the stock was both overfished and experiencing overfishing.', category: 'Management', reviewed: 'Dec 2024' },
  { slug: 'landlocked-same-species', domain: 'DATA', claim: 'Freshwater landlocked striped bass are the same species as saltwater striped bass.', summary: 'Landlocked striped bass are the same species (Morone saxatilis) as their anadromous counterparts.', category: 'Biology', reviewed: 'Dec 2024' },
  { slug: 'not-endangered', domain: 'MGMT', claim: 'Striped bass are an endangered species.', summary: 'Striped bass are not listed under the Endangered Species Act.', category: 'Management', reviewed: 'Dec 2024' },
  { slug: 'only-spawn-chesapeake', domain: 'SPWN', claim: 'Striped bass only spawn in the Chesapeake Bay.', summary: 'The Chesapeake Bay produces 70-80% but significant spawning also occurs in the Hudson, Delaware, and Roanoke Rivers.', category: 'Biology', reviewed: 'Dec 2024' },
  { slug: 'slot-limits-effective', domain: 'REGS', claim: 'Slot limits are more effective than minimum size limits for protecting striped bass.', summary: 'Slot limits protect both undersized and large, highly fecund females.', category: 'Management', reviewed: 'Dec 2024' },
];

export function ClaimListPage() {
  const [activeDomain, setActiveDomain] = useState('ALL');
  const [search, setSearch] = useState('');

  const filtered = claims.filter((c) => {
    if (activeDomain !== 'ALL' && c.domain !== activeDomain) return false;
    if (search && !c.claim.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-1">
        <h1 className="text-lg font-bold tracking-wider">CLAIM RECORDS</h1>
        <span style={{ color: 'var(--text-muted)' }}>·</span>
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {filtered.length} records · documented evidence, no verdicts
        </span>
      </div>

      <div className="flex items-center justify-between my-4">
        <div
          className="flex items-center rounded-lg border px-3 py-2 flex-1 mr-4"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
        >
          <Search className="w-4 h-4 mr-2" style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search claims..."
            className="flex-1 bg-transparent border-none outline-none text-sm"
            style={{ color: 'var(--text-primary)' }}
          />
        </div>
        <Link href="/submit">
          <button className="px-3 py-2 rounded text-xs font-semibold"
            style={{ backgroundColor: 'var(--accent)', color: '#000' }}>
            Submit a Claim
          </button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveDomain(cat)}
            className="px-3 py-1 rounded text-xs font-semibold tracking-wider cursor-pointer"
            style={{
              backgroundColor: activeDomain === cat ? 'var(--accent)' : 'var(--bg-card)',
              color: activeDomain === cat ? '#000' : 'var(--text-secondary)',
              border: `1px solid ${activeDomain === cat ? 'var(--accent)' : 'var(--border)'}`,
            }}
          >
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
        {filtered.map((claim) => (
          <Link key={claim.slug} href={`/claim/${claim.slug}`}>
            <div
              className="grid grid-cols-[60px_1fr_120px_80px] gap-4 items-start rounded-lg border px-4 py-3 cursor-pointer"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}
            >
              <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded text-center"
                style={{ backgroundColor: 'var(--accent)15', color: 'var(--accent)' }}>
                CLAIM
              </span>
              <div>
                <div className="text-sm font-medium mb-1">"{claim.claim}"</div>
                <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{claim.summary}</div>
              </div>
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{claim.category}</span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{claim.reviewed}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
