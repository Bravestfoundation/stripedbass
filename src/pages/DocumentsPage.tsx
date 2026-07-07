import { Download, ExternalLink, CheckCircle, AlertCircle, Clock, Loader } from 'lucide-react';

const documents = [
  { slug: 'mass-dmf-release-mortality-2025', type: 'Scientific Paper', jurisdiction: 'Massachusetts', year: 2025, title: 'Massachusetts DMF Release Mortality Research Update (2025)', author: 'Massachusetts Division of Marine Fisheries', description: 'Updated release mortality research using acoustic tagging. Challenges the 9% Diodati estimate.', sourceUrl: 'https://www.saltwaterguidesassociation.com/release-mortality-revisited-new-research-from-massachusetts-dmf/', status: 'fetching', wordsIndexed: 0 },
  { slug: 'asmfc-amendment-7-addendum-ii-2024', type: 'Addendum', jurisdiction: 'ASMFC', year: 2024, title: 'Addendum II to Amendment 7 to the IFMP for Atlantic Striped Bass', author: 'ASMFC', description: 'Adjusted recreational measures under Amendment 7.', status: 'indexed', wordsIndexed: 12105 },
  { slug: 'asmfc-amendment-7-addendum-i-2023', type: 'Addendum', jurisdiction: 'ASMFC', year: 2023, title: 'Addendum I to Amendment 7 to the IFMP for Atlantic Striped Bass', author: 'ASMFC', description: 'Emergency measures implemented under Amendment 7.', status: 'indexed', wordsIndexed: 6517 },
  { slug: 'asmfc-update-assessment-2023', type: 'Stock Assessment', jurisdiction: 'ASMFC', year: 2023, title: '2023 Update Stock Assessment for Atlantic Striped Bass', author: 'ASMFC', description: 'Annual update to the 2018 benchmark.', status: 'indexed', wordsIndexed: 9601 },
  { slug: 'asmfc-amendment-7-2022', type: 'Amendment', jurisdiction: 'ASMFC', year: 2022, title: 'Amendment 7 to the Interstate Fishery Management Plan for Atlantic Striped Bass', author: 'ASMFC', description: 'The current governing management document.', sourceUrl: 'https://asmfc.org/wp-content/uploads/2025/01/AtlStripedBassAm7_May2022.pdf', status: 'indexed', wordsIndexed: 51204 },
  { slug: 'asmfc-benchmark-assessment-2018', type: 'Stock Assessment', jurisdiction: 'ASMFC', year: 2019, title: '2018 Benchmark Stock Assessment for Atlantic Striped Bass', author: 'ASMFC', description: 'Found the stock overfished and overfishing occurring.', status: 'indexed', wordsIndexed: 180593 },
  { slug: 'asmfc-benchmark-assessment-2013', type: 'Stock Assessment', jurisdiction: 'ASMFC', year: 2013, title: '2013 Benchmark Stock Assessment for Atlantic Striped Bass', author: 'ASMFC', description: 'Previous benchmark. Found stock not overfished but noted declining recruitment.', status: 'indexed', wordsIndexed: 239092 },
  { slug: 'asmfc-amendment-6-2003', type: 'Amendment', jurisdiction: 'ASMFC', year: 2003, title: 'Amendment 6 to the Interstate Fishery Management Plan for Atlantic Striped Bass', author: 'ASMFC', description: 'Governed management from 2003 to 2022.', sourceUrl: 'https://asmfc.org/wp-content/uploads/2025/01/sbAmendment6.pdf', status: 'indexed', wordsIndexed: 35374 },
];

const statusIcons: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
  indexed: { icon: CheckCircle, color: '#22c55e', label: 'AI Indexed' },
  failed: { icon: AlertCircle, color: '#ef4444', label: 'Failed' },
  fetching: { icon: Loader, color: '#fbbf24', label: 'Fetching' },
  pending: { icon: Clock, color: '#64748b', label: 'Pending' },
};

export function DocumentsPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-lg font-bold tracking-wider mb-1">DOCUMENT LIBRARY</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        The complete corpus of primary source documents on Atlantic striped bass. Every document indexed and searchable by the Striper AI.
      </p>

      <div className="text-xs flex gap-4 mb-6" style={{ color: 'var(--text-muted)' }}>
        <span>Showing {documents.length} of {documents.length} documents</span>
      </div>

      <div className="space-y-3">
        {documents.map((doc) => {
          const statusInfo = statusIcons[doc.status] || statusIcons.pending;
          const StatusIcon = statusInfo.icon;
          return (
            <div key={doc.slug} className="rounded-lg border p-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <StatusIcon className="w-3.5 h-3.5" style={{ color: statusInfo.color }} />
                    <span className="text-[10px] font-semibold" style={{ color: statusInfo.color }}>{statusInfo.label}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-muted)' }}>{doc.type}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{doc.jurisdiction}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{doc.year}</span>
                  </div>
                  <h3 className="text-sm font-semibold mb-1">{doc.title}</h3>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{doc.author}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{doc.description}</p>
                  {doc.wordsIndexed > 0 && (
                    <p className="text-[10px] mt-1" style={{ color: 'var(--accent)' }}>
                      {doc.wordsIndexed.toLocaleString()} words indexed
                    </p>
                  )}
                </div>
                {doc.sourceUrl && (
                  <a href={doc.sourceUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 px-2 py-1 rounded text-[10px] border ml-4 shrink-0"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                    <ExternalLink className="w-3 h-3" /> Source
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
