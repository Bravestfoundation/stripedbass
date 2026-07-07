import { useParams, Link } from 'wouter';
import Markdown from 'react-markdown';
import { CategoryTag } from '../components/CategoryTag';
import { trpc } from '../lib/trpc';

export function WikiArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading } = trpc.wiki.getBySlug.useQuery({ slug: slug! });

  if (isLoading) return <div className="p-6 text-center" style={{ color: 'var(--text-muted)' }}>Loading...</div>;
  if (!article) return <div className="p-6 text-center" style={{ color: 'var(--text-muted)' }}>Article not found</div>;

  const citations = (article.citations as any[]) || [];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-xs" style={{ color: 'var(--text-muted)' }}>
        <Link href="/wiki"><span className="cursor-pointer hover:underline" style={{ color: 'var(--accent)' }}>Wiki</span></Link>
        <span>›</span>
        <CategoryTag code={article.category} />
        <span className="truncate">{article.title}</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <CategoryTag code={article.category} size="md" />
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{article.categoryLabel}</span>
        {citations.length > 0 && <span className="text-xs" style={{ color: 'var(--text-muted)' }}>· {citations.length} citations</span>}
      </div>

      <h1 className="text-2xl font-bold mb-4">{article.title}</h1>

      {/* Overview box */}
      <div className="rounded-lg border p-4 mb-4" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
        <div className="text-[10px] font-bold tracking-wider mb-1" style={{ color: 'var(--accent)' }}>TL;DR</div>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{article.summary}</p>
      </div>

      {/* Article body */}
      <div className="prose prose-invert prose-sm max-w-none
        [&_h1]:text-lg [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-3 [&_h1]:text-[var(--text-primary)]
        [&_h2]:text-base [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-2 [&_h2]:text-[var(--text-primary)]
        [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2 [&_h3]:text-[var(--text-primary)]
        [&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-3 [&_p]:text-[var(--text-secondary)]
        [&_ul]:text-sm [&_ul]:text-[var(--text-secondary)] [&_ul]:mb-3 [&_ul]:pl-5
        [&_ol]:text-sm [&_ol]:text-[var(--text-secondary)] [&_ol]:mb-3 [&_ol]:pl-5
        [&_li]:mb-1
        [&_a]:text-[var(--accent)] [&_a]:underline
        [&_strong]:text-[var(--text-primary)]
        [&_em]:text-[var(--text-secondary)]
        [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--accent)] [&_blockquote]:pl-4 [&_blockquote]:italic
      ">
        <Markdown>{article.content}</Markdown>
      </div>

      {/* Citations */}
      {citations.length > 0 && (
        <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border)' }}>
          <h2 className="section-header mb-4">PRIMARY SOURCES</h2>
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

      {/* Footer links */}
      <div className="flex gap-4 mt-8">
        <Link href="/wiki"><span className="text-xs cursor-pointer" style={{ color: 'var(--accent)' }}>← Back to Wiki</span></Link>
        <Link href={`/ask?q=Tell me more about: ${article.title}`}>
          <span className="text-xs cursor-pointer" style={{ color: 'var(--accent)' }}>Ask the AI about this →</span>
        </Link>
      </div>
    </div>
  );
}
