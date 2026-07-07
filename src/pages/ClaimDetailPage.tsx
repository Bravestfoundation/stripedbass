import { useParams, Link } from 'wouter';

export function ClaimDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6 text-xs" style={{ color: 'var(--text-muted)' }}>
        <Link href="/claim-records"><span className="cursor-pointer hover:underline" style={{ color: 'var(--accent)' }}>Claim Records</span></Link>
        <span>›</span>
        <span>{slug}</span>
      </div>
      <div className="rounded-lg border p-8 text-center" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Claim detail loading...</p>
      </div>
    </div>
  );
}
