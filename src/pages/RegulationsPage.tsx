import { Link } from 'wouter';
import { ExternalLink } from 'lucide-react';

const regulations = [
  { state: 'Connecticut', sizeLimit: '28–31 inches (slot)', bagLimit: '1 fish per day', slotLimit: '28 inch min, 31 inch max', seasonOpen: 'Year-round', seasonClosed: '—', notes: 'Inline circle hook required when fishing with bait.', officialUrl: 'https://portal.ct.gov/DEEP/Fishing/Marine/Striped-Bass' },
  { state: 'Delaware', sizeLimit: '28–31 inches (slot); 20–24 inches Jul 1–Aug 31 in DE Bay/River', bagLimit: '1 fish per day', slotLimit: '28 inch min, 31 inch max', seasonOpen: 'Year-round', seasonClosed: 'Spawning grounds: closed Apr 1–May 31', notes: 'Special summer slot. Inline circle hooks required.', officialUrl: 'https://dnrec.delaware.gov/fish-wildlife/fishing/saltwater/striped-bass/' },
  { state: 'Maine', sizeLimit: '28–31 inches (slot)', bagLimit: '1 fish per day', slotLimit: '28 inch min, 31 inch max', seasonOpen: 'Year-round (except Kennebec)', seasonClosed: 'Kennebec: Dec 1–Jun 30', notes: 'Non-offset circle hook required. No gaffing.', officialUrl: 'https://www.maine.gov/ifw/fishing/species/striped-bass.html' },
  { state: 'Maryland', sizeLimit: 'Bay: 19–24 in; Ocean: 28–31 in', bagLimit: '1 fish per day', slotLimit: 'Bay: 19–24; Ocean: 28–31', seasonOpen: 'Varies by area', seasonClosed: 'Apr 1–May 15, Jul 16–Jul 31', notes: 'Circle hooks required. No eels, no gaffing.', officialUrl: 'https://dnr.maryland.gov/fisheries/Pages/striped-bass/index.aspx' },
  { state: 'Massachusetts', sizeLimit: '28–31 inches (slot)', bagLimit: '1 fish per day', slotLimit: '28 inch min, 31 inch max', seasonOpen: 'Year-round', seasonClosed: '—', notes: 'Circle hooks required with bait. No high-grading.', officialUrl: 'https://www.mass.gov/striped-bass' },
  { state: 'New Hampshire', sizeLimit: '28–31 inches (slot)', bagLimit: '1 fish per day', slotLimit: '28 inch min, 31 inch max', seasonOpen: 'Year-round', seasonClosed: '—', notes: 'Non-offset circle hook required. No netting/gaffing.', officialUrl: 'https://www.wildlife.nh.gov/fishing/saltwater-fishing.html' },
  { state: 'New Jersey', sizeLimit: '28–31 inches (slot)', bagLimit: '1 fish per day', slotLimit: '28 inch min, 31 inch max', seasonOpen: 'Mar 1–Dec 31', seasonClosed: 'Jan 1–Feb 28', notes: 'Circle hooks required. Gaff prohibited.', officialUrl: 'https://www.nj.gov/dep/fgw/striped_bass.htm' },
  { state: 'New York', sizeLimit: '28–31 inches (slot)', bagLimit: '1 fish per day', slotLimit: '28 inch min, 31 inch max', seasonOpen: 'Apr 15–Dec 15', seasonClosed: 'Dec 16–Apr 14', notes: 'Inline circle hooks required with bait.', officialUrl: 'https://www.dec.ny.gov/outdoor/7894.html' },
  { state: 'North Carolina', sizeLimit: '28–31 inches (slot) — ocean', bagLimit: '1 fish per day', slotLimit: '28–31 coastal; 18–22 Roanoke', seasonOpen: 'Year-round (coastal)', seasonClosed: 'Various areas closed', notes: 'Multiple management areas with different rules.', officialUrl: 'https://www.ncwildlife.org/Fishing/Species/Striped-Bass' },
  { state: 'Pennsylvania', sizeLimit: '28–31 inches (slot)', bagLimit: '1 fish per day', slotLimit: '28 inch min, 31 inch max', seasonOpen: 'Jan–Mar, Jun–Dec', seasonClosed: 'Apr 1–May 31: C&R only', notes: 'Circle hooks required in tidal Delaware.', officialUrl: 'https://www.pa.gov/agencies/fishandboat/fishing/regulations/seasons-sizes-and-creel-limits' },
  { state: 'Rhode Island', sizeLimit: '28–31 inches (slot)', bagLimit: '1 fish per day', slotLimit: '28 inch min, 31 inch max', seasonOpen: 'Year-round', seasonClosed: '—', notes: 'Circle hook required with bait.', officialUrl: 'https://dem.ri.gov/programs/fish-wildlife/marine-fisheries' },
  { state: 'Virginia', sizeLimit: '28–31 inches (slot)', bagLimit: '1 fish per day', slotLimit: '28 inch min, 31 inch max', seasonOpen: 'Jan–Mar, May 16–Dec', seasonClosed: 'Apr 1–May 15', notes: 'Circle hooks required. Gaffing prohibited.', officialUrl: 'https://dwr.virginia.gov/fishing/striped-bass/' },
  { state: 'DC / Potomac River', sizeLimit: '19–24 inches (slot)', bagLimit: '1 fish per day', slotLimit: '19 inch min, 24 inch max', seasonOpen: 'May 16–Jul 6, Aug 21–Dec 31', seasonClosed: 'Jul 7–Aug 20', notes: 'PRFC rules. Circle hooks required. No live eel.', officialUrl: 'https://prfc.us/pdfs/BLUE-SHEET.pdf' },
];

export function RegulationsPage() {
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
              {regulations.map((reg, i) => (
                <tr key={reg.state} className="border-t" style={{ borderColor: 'var(--border)' }}>
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{reg.state}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{reg.sizeLimit}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{reg.bagLimit}</td>
                  <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>{reg.seasonOpen}</td>
                  <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)' }}>{reg.notes}</td>
                  <td className="px-4 py-3">
                    <a href={reg.officialUrl} target="_blank" rel="noopener noreferrer"
                      style={{ color: 'var(--accent)' }}>
                      <ExternalLink className="w-4 h-4" />
                    </a>
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
