import { ExternalLink } from 'lucide-react';
import { trpc } from '../lib/trpc';

export function RegulationsPage() {
  const { data: regulations = [] } = trpc.regulations.list.useQuery();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-lg font-bold tracking-wider mb-1">REGULATIONS HUB</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        Current size limits, bag limits, slot limits, and seasonal closures for all 15 Atlantic coastal states.
      </p>

      <div className="rounded-lg border overflow-hidden" style={{ borderColor: 'var(--border)' }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-card)' }}>
                <th className="text-left px-4 py-3 section-header">State</th>
                <th className="text-left px-4 py-3 section-header">Size Limit</th>
                <th className="text-left px-4 py-3 section-header">Bag Limit</th>
                <th className="text-left px-4 py-3 section-header">Season</th>
                <th className="text-left px-4 py-3 section-header">Notes</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {regulations.map((reg: any) => (
                <tr key={reg.state} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{reg.state}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{reg.sizeLimit}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{reg.bagLimit}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{reg.seasonOpen}</td>
                  <td className="px-4 py-3 text-xs max-w-xs" style={{ color: 'var(--text-muted)' }}>{reg.notes}</td>
                  <td className="px-4 py-3">
                    {reg.officialUrl && <a href={reg.officialUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}><ExternalLink className="w-4 h-4" /></a>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 p-4 rounded-lg border text-xs" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)', color: 'var(--text-muted)' }}>
        <strong>Disclaimer:</strong> Regulations change frequently. Always verify current regulations with your state agency before fishing.
      </div>
    </div>
  );
}
