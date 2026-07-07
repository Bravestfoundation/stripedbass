import { Link } from 'wouter';
import { Download } from 'lucide-react';
import { trpc } from '../lib/trpc';

const typeColors: Record<string, string> = {
  'Stock Assessment': '#00d2be', 'Regulatory Document': '#a78bfa', 'Data Report': '#fbbf24',
  'Economic Study': '#fb923c', 'Scientific Paper': '#f472b6', 'Amendment': '#a78bfa',
  'Addendum': '#8b5cf6', 'Special Report': '#22d3ee',
};

export function DataRoomPage() {
  const { data: items = [] } = trpc.dataRoom.list.useQuery();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-lg font-bold tracking-wider mb-1">DATA ROOM</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        Key scientific documents, stock assessments, and economic studies — each with a plain-English summary and angler takeaway.
      </p>

      <div className="space-y-4">
        {items.map((item: any) => (
          <div key={item.slug} className="rounded-lg border p-5" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${typeColors[item.type] || 'var(--accent)'}20`, color: typeColors[item.type] || 'var(--accent)' }}>
                    {item.type}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{item.year}</span>
                </div>
                <h3 className="text-base font-semibold mb-1">{item.title}</h3>
                <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{item.author}</p>
                <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                <div className="rounded p-3" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                  <div className="text-[10px] font-bold tracking-wider mb-1" style={{ color: 'var(--accent)' }}>ANGLER TAKEAWAY</div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.anglerTakeaway}</p>
                </div>
              </div>
              {item.downloadUrl && (
                <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 rounded text-xs border ml-4 shrink-0"
                  style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                  <Download className="w-3 h-3" /> Download
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
