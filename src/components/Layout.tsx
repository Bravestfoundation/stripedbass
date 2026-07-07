import { useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import {
  MessageCircle, BookOpen, FileCheck, Library, Database,
  Scale, PlusCircle, ChevronLeft, ChevronRight, Fish
} from 'lucide-react';

const navItems = [
  { section: 'QUERY', items: [
    { href: '/ask', label: 'Ask the AI', icon: MessageCircle },
  ]},
  { section: 'KNOWLEDGE', items: [
    { href: '/wiki', label: 'Wiki', icon: BookOpen },
    { href: '/claim-records', label: 'Claim Records', icon: FileCheck },
    { href: '/documents', label: 'Document Library', icon: Library },
    { href: '/data-room', label: 'Data Room', icon: Database },
  ]},
  { section: 'REFERENCE', items: [
    { href: '/regulations', label: 'Regulations', icon: Scale },
  ]},
  { section: 'TOOLS', items: [
    { href: '/submit', label: 'Submit a Claim', icon: PlusCircle },
  ]},
];

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [location] = useLocation();

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`flex flex-col border-r transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        }`}
        style={{
          backgroundColor: 'var(--bg-sidebar)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Logo */}
        <div className="p-4 flex items-center gap-3">
          <Fish className="w-8 h-8 shrink-0" style={{ color: 'var(--accent)' }} />
          {!collapsed && (
            <div>
              <div className="font-bold text-sm" style={{ color: 'var(--accent)' }}>
                Stripedbass.org
              </div>
              <div className="text-[10px] tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                THE AUTHORITY
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-2">
          {navItems.map((group) => (
            <div key={group.section} className="mb-4">
              {!collapsed && (
                <div className="section-header px-3 py-1">{group.section}</div>
              )}
              {group.items.map((item) => {
                const isActive = location === item.href || location.startsWith(item.href + '/');
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm cursor-pointer transition-colors ${
                        collapsed ? 'justify-center' : ''
                      }`}
                      style={{
                        backgroundColor: isActive ? 'var(--accent)15' : 'transparent',
                        color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
                      }}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Corpus stats */}
        {!collapsed && (
          <div className="px-4 py-3 border-t" style={{ borderColor: 'var(--border)' }}>
            <div className="section-header mb-2">CORPUS</div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Documents</span>
                <span style={{ color: 'var(--text-secondary)' }}>835 chunks</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Words indexed</span>
                <span style={{ color: 'var(--text-secondary)' }}>527K+</span>
              </div>
              <div className="flex justify-between">
                <span style={{ color: 'var(--text-muted)' }}>Wiki articles</span>
                <span style={{ color: 'var(--text-secondary)' }}>15</span>
              </div>
            </div>
          </div>
        )}

        {/* Collapse button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 px-4 py-3 text-xs border-t cursor-pointer"
          style={{
            borderColor: 'var(--border)',
            color: 'var(--text-muted)',
            backgroundColor: 'transparent',
          }}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span>Collapse sidebar</span>}
        </button>
      </aside>

      {/* Main content */}
      <main
        className="flex-1 overflow-y-auto"
        style={{ backgroundColor: 'var(--bg-primary)' }}
      >
        {children}
      </main>
    </div>
  );
}
