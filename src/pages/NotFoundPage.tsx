import { Link } from 'wouter';

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <h1 className="text-6xl font-bold mb-4" style={{ color: 'var(--accent)' }}>404</h1>
      <h2 className="text-xl mb-6" style={{ color: 'var(--text-secondary)' }}>Page Not Found</h2>
      <Link href="/">
        <button className="px-4 py-2 rounded text-sm font-semibold cursor-pointer"
          style={{ backgroundColor: 'var(--accent)', color: '#000' }}>
          Go Home
        </button>
      </Link>
    </div>
  );
}
