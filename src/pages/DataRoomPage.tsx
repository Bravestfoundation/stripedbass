import { Link } from 'wouter';
import { Download, ExternalLink } from 'lucide-react';

const items = [
  { slug: 'asmfc-amendment-7-2023', type: 'Regulatory Document', year: 2023, title: 'Amendment 7 to the Interstate Fishery Management Plan for Atlantic Striped Bass', author: 'Atlantic States Marine Fisheries Commission', description: 'The most recent major amendment to the striped bass management plan, adopted in 2023.', anglerTakeaway: 'This is the rulebook for the next several years. The one-fish bag limit and circle hook requirement are the most significant changes.', downloadUrl: 'https://asmfc.org/uploads/file/64e5b5b0StripedBassAmendment7_Aug2023.pdf' },
  { slug: 'asmfc-2022-stock-assessment-update', type: 'Stock Assessment', year: 2022, title: '2022 Striped Bass Stock Assessment Update', author: 'ASMFC', description: 'The 2022 update to the Atlantic striped bass stock assessment.', anglerTakeaway: 'The stock is in trouble. There are fewer large fish than there should be, and we are still catching too many.', downloadUrl: 'https://asmfc.org/uploads/file/63dde0e62022StripedBassStockAssessmentUpdate_webversion.pdf' },
  { slug: 'maryland-dnr-yoy-survey-2022', type: 'Data Report', year: 2022, title: 'Maryland DNR Striped Bass Young-of-Year Survey (2022 Results)', author: 'Maryland Department of Natural Resources', description: 'The annual results of Maryland\'s YOY striped bass seine survey.', anglerTakeaway: 'This is the most important number in striped bass management.', downloadUrl: 'https://dnr.maryland.gov/fisheries/Pages/striped-bass/index.aspx' },
  { slug: 'asmfc-menhaden-stock-assessment-2021', type: 'Stock Assessment', year: 2021, title: '2021 Atlantic Menhaden Benchmark Stock Assessment', author: 'ASMFC', description: 'Analysis of the ecological reference point for menhaden as forage for striped bass.', anglerTakeaway: 'Menhaden are the primary food source for adult striped bass.', downloadUrl: 'https://asmfc.org/uploads/file/61e3e5e0AtlMenhadenBenchmarkStockAssessment_2021.pdf' },
  { slug: 'asa-economic-impact-2019', type: 'Economic Study', year: 2019, title: 'Sportfishing in America: An Economic Force for Conservation (2019)', author: 'American Sportfishing Association', description: 'Comprehensive analysis of the economic impact of recreational fishing.', anglerTakeaway: 'Striped bass are worth far more to the economy as a recreational fish than as a commercial product.', downloadUrl: 'https://asafishing.org/uploads/2019_ASASportfishinginAmericaReport_January2020.pdf' },
  { slug: 'mrip-fes-redesign-2018', type: 'Data Report', year: 2018, title: 'MRIP Fishing Effort Survey Redesign and Historical Recalibration', author: 'NOAA Fisheries', description: 'Documentation of the discovery and correction of systematic MRIP errors.', anglerTakeaway: 'Recreational anglers were blamed for a larger share of the harvest than they actually took.', downloadUrl: 'https://www.fisheries.noaa.gov/recreational-fishing-data/marine-recreational-information-program' },
  { slug: 'asmfc-2018-benchmark-assessment', type: 'Stock Assessment', year: 2018, title: '2018 Striped Bass Benchmark Stock Assessment', author: 'ASMFC', description: 'The most recent full benchmark assessment providing the scientific foundation for Amendment 7.', anglerTakeaway: 'This is the foundational scientific document for current striped bass management.', downloadUrl: 'https://asmfc.org/uploads/file/5c3b9e002018StripedBassBenchmarkStockAssessment.pdf' },
  { slug: 'diodati-1996-release-mortality', type: 'Scientific Paper', year: 1996, title: 'Mortality of Striped Bass Hooked and Released in Salt Water (Diodati & Richards, 1996)', author: 'Massachusetts DMF / NOAA Fisheries', description: 'The original study that produced the widely cited 9% catch-and-release mortality figure.', anglerTakeaway: 'This study has governed management for nearly 30 years, but its methodology was deeply flawed.', downloadUrl: 'https://doi.org/10.1577/1548-8659(1996)125%3C0300:MOSBHA%3E2.3.CO;2' },
];

const typeColors: Record<string, string> = {
  'Stock Assessment': '#00d2be',
  'Regulatory Document': '#a78bfa',
  'Data Report': '#fbbf24',
  'Economic Study': '#fb923c',
  'Scientific Paper': '#f472b6',
};

export function DataRoomPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-lg font-bold tracking-wider mb-1">DATA ROOM</h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
        Key scientific documents, stock assessments, and economic studies — each with a plain-English summary and angler takeaway.
      </p>

      <div className="space-y-4">
        {items.map((item) => (
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
                <Link href={`/data-room/${item.slug}`}>
                  <h3 className="text-base font-semibold mb-1 cursor-pointer hover:underline">{item.title}</h3>
                </Link>
                <p className="text-xs mb-2" style={{ color: 'var(--text-muted)' }}>{item.author}</p>
                <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>{item.description}</p>
                <div className="rounded p-3" style={{ backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border)' }}>
                  <div className="text-[10px] font-bold tracking-wider mb-1" style={{ color: 'var(--accent)' }}>ANGLER TAKEAWAY</div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{item.anglerTakeaway}</p>
                </div>
              </div>
              <div className="flex gap-2 ml-4 shrink-0">
                {item.downloadUrl && (
                  <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-1 px-3 py-1.5 rounded text-xs border"
                    style={{ borderColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                    <Download className="w-3 h-3" /> Download
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
