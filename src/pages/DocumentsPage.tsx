import { CheckCircle, AlertCircle, Clock, Loader, ExternalLink } from 'lucide-react';
import { trpc } from '../lib/trpc';

const statusIcons: Record<string, { icon: typeof CheckCircle; color: string; label: string }> = {
  indexed: { icon: CheckCircle, color: '#22c55e', label: 'AI Indexed' },
  Indexed: { icon: CheckCircle, color: '#22c55e', label: 'AI Indexed' },
  'AI Indexed': { icon: CheckCircle, color: '#22c55e', label: 'AI Indexed' },
  failed: { icon: AlertCircle, color: '#ef4444', label: 'Failed' },
  Failed: { icon: AlertCircle, color: '#ef4444', label: 'Failed' },
  fetching: { icon: Loader, color: '#fbbf24', label: 'Fetching' },
  Fetching: { icon: Loader, color: '#fbbf24', label: 'Fetching' },
  pending: { icon: Clock, color: '#64748b', label: 'Pending' },
};

export function DocumentsPage() {
  const { data: documents = [] } = trpc.documents.list.useQuery({});

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-lg font-bold tracking-wider mb-1">DOCUMENT LIBRARY</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        The complete corpus of primary source documents — indexed and searchable by the Striper AI.
      </p>
      <div className="text-xs mb-6" style={{ color: 'var(--text-muted)' }}>Showing {documents.length} documents</div>

      <div className="space-y-3">
        {documents.map((doc: any) => {
          const si = statusIcons[doc.status] || statusIcons.pending;
          const Icon = si.icon;
          return (
            <div key={doc.slug} className="rounded-lg border p-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-3.5 h-3.5" style={{ color: si.color }} />
                    <span className="text-[10px] font-semibold" style={{ color: si.color }}>{si.label}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-muted)' }}>{doc.type}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{doc.jurisdiction}</span>
                    <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{doc.year}</span>
                  </div>
                  <h3 className="text-sm font-semibold mb-1">{doc.title}</h3>
                  <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>{doc.author}</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{doc.description}</p>
                  {doc.wordsIndexed > 0 && <p className="text-[10px] mt-1" style={{ color: 'var(--accent)' }}>{doc.wordsIndexed.toLocaleString()} words indexed</p>}
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
