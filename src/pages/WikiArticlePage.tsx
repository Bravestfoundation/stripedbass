import { useParams } from 'wouter';
import { Link } from 'wouter';
import { CategoryTag } from '../components/CategoryTag';

export function WikiArticlePage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6 text-xs" style={{ color: 'var(--text-muted)' }}>
        <Link href="/wiki"><span className="cursor-pointer hover:underline" style={{ color: 'var(--accent)' }}>Wiki</span></Link>
        <span>›</span>
        <span>{slug}</span>
      </div>
      <div className="rounded-lg border p-8 text-center" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Article content loading...</p>
        <p className="text-xs mt-2" style={{ color: 'var(--text-muted)' }}>Slug: {slug}</p>
      </div>
    </div>
  );
}
