import { useParams, Link } from 'wouter';
import Markdown from 'react-markdown';
import { trpc } from '../lib/trpc';

export function ClaimDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: claim, isLoading } = trpc.claims.getBySlug.useQuery({ slug: slug! });

  if (isLoading) return <div className="p-6 text-center" style={{ color: 'var(--text-muted)' }}>Loading...</div>;
  if (!claim) return <div className="p-6 text-center" style={{ color: 'var(--text-muted)' }}>Claim not found</div>;

  const citations = (claim.citations as any[]) || [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-4 text-xs" style={{ color: 'var(--text-muted)' }}>
        <Link href="/claim-records"><span className="cursor-pointer hover:underline" style={{ color: 'var(--accent)' }}>Claim Records</span></Link>
        <span>›</span>
        <span className="truncate">{claim.claimText?.slice(0, 60)}...</span>
      </div>

      {/* Claim header */}
      <div className="rounded-lg border p-5 mb-6" style={{ borderColor: 'var(--accent)33', backgroundColor: 'var(--bg-card)' }}>
        <span className="text-[10px] font-bold tracking-wider px-2 py-1 rounded" style={{ backgroundColor: 'var(--accent)20', color: 'var(--accent)' }}>CLAIM</span>
        <h1 className="text-xl font-bold mt-3 mb-2">"{claim.claimText}"</h1>
        <div className="flex gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span>{claim.category}</span>
          <span>·</span>
          <span>{claim.domain}</span>
          {citations.length > 0 && <><span>·</span><span>{citations.length} citations</span></>}
        </div>
      </div>

      {/* Summary box */}
      <div className="rounded-lg border p-4 mb-6" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
        <div className="text-[10px] font-bold tracking-wider mb-1" style={{ color: 'var(--accent)' }}>SUMMARY</div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{claim.summary}</p>
      </div>

      {/* Full analysis */}
      <div className="prose prose-invert prose-sm max-w-none
        [&_h1]:text-lg [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-3 [&_h1]:text-[var(--text-primary)]
        [&_h2]:text-base [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:text-[var(--text-primary)]
        [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-[var(--text-primary)]
        [&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-3 [&_p]:text-[var(--text-secondary)]
        [&_ul]:text-sm [&_ul]:text-[var(--text-secondary)] [&_ul]:mb-3 [&_ul]:pl-5
        [&_ol]:text-sm [&_ol]:text-[var(--text-secondary)] [&_ol]:mb-3 [&_ol]:pl-5
        [&_a]:text-[var(--accent)] [&_a]:underline
        [&_strong]:text-[var(--text-primary)]
      ">
        <Markdown>{claim.content}</Markdown>
      </div>

      {/* Citations */}
      {citations.length > 0 && (
        <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <h2 className="section-header mb-4">SOURCES</h2>
          <div className="space-y-2">
            {citations.map((c: any, i: number) => (
              <div key={i} className="flex gap-3 text-xs rounded-lg border p-3" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
                <span className="font-mono shrink-0" style={{ color: 'var(--accent)' }}>{c.label || i + 1}</span>
                <div>
                  <span style={{ color: 'var(--text-secondary)' }}>{c.text}</span>
                  {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer" className="ml-2" style={{ color: 'var(--accent)' }}>[Source]</a>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <Link href="/claim-records"><span className="text-xs cursor-pointer" style={{ color: 'var(--accent)' }}>← Back to Claims</span></Link>
      </div>
    </div>
  );
}
