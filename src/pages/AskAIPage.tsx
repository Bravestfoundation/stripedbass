import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import Markdown from 'react-markdown';
import { trpc } from '../lib/trpc';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: Array<{ title: string; slug: string; type: 'wiki' | 'claim' }>;
}

const suggestions = [
  'What did the 2018 benchmark assessment find?',
  'How does Amendment 7 define overfishing?',
  'What is the MRIP FES telescoping error?',
  'What are the current striped bass regulations in New York?',
  'What is the Chesapeake Bay juvenile index?',
  'How much is recreational striped bass fishing worth economically?',
];

export function AskAIPage() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const chatMutation = trpc.aiChat.chat.useMutation();

  const handleSubmit = async (q: string) => {
    if (!q.trim() || chatMutation.isPending) return;
    const userMsg: Message = { role: 'user', content: q };
    setMessages(prev => [...prev, userMsg]);
    setQuery('');

    try {
      const result = await chatMutation.mutateAsync({ message: q });
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: result.response,
        sources: result.sources,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.',
      }]);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-6 pb-0">
        <h1 className="text-lg font-bold tracking-wider mb-1">ASK THE AI</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Query the striped bass research corpus — 15 wiki articles, 25 claim records, and 562K+ words from ASMFC documents.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-6xl mb-4 opacity-20">🐟</div>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              Ask a question about striped bass management, science, or regulations
            </p>
            <div className="flex flex-wrap gap-2 max-w-2xl justify-center">
              {suggestions.map((q) => (
                <button key={q} onClick={() => handleSubmit(q)}
                  className="px-3 py-1.5 rounded-full text-xs border cursor-pointer hover:border-[var(--accent)]"
                  style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)', color: 'var(--text-secondary)' }}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-4 py-3 max-w-[85%] ${msg.role === 'user' ? '' : 'w-full'}`}
                  style={{
                    backgroundColor: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-card)',
                    color: msg.role === 'user' ? '#000' : 'var(--text-primary)',
                    border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
                  }}>
                  {msg.role === 'assistant' ? (
                    <div className="prose prose-invert prose-sm max-w-none
                      [&_h1]:text-base [&_h1]:font-bold [&_h1]:mt-4 [&_h1]:mb-2
                      [&_h2]:text-sm [&_h2]:font-bold [&_h2]:mt-3 [&_h2]:mb-1
                      [&_p]:text-sm [&_p]:leading-relaxed [&_p]:mb-2 [&_p]:text-[var(--text-secondary)]
                      [&_ul]:text-sm [&_ul]:text-[var(--text-secondary)] [&_ul]:pl-5
                      [&_ol]:text-sm [&_ol]:text-[var(--text-secondary)] [&_ol]:pl-5
                      [&_a]:text-[var(--accent)]
                      [&_strong]:text-[var(--text-primary)]
                      [&_code]:text-[var(--accent)] [&_code]:bg-[var(--bg-primary)] [&_code]:px-1 [&_code]:rounded
                    ">
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  ) : (
                    <p className="text-sm">{msg.content}</p>
                  )}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="mt-3 pt-2 border-t" style={{ borderColor: 'var(--border)' }}>
                      <div className="text-[10px] font-bold tracking-wider mb-1" style={{ color: 'var(--accent)' }}>SOURCES</div>
                      <div className="flex flex-wrap gap-2">
                        {msg.sources.map((s, j) => (
                          <Link key={j} href={s.type === 'wiki' ? `/wiki/${s.slug}` : `/claim/${s.slug}`}>
                            <span className="text-xs px-2 py-0.5 rounded cursor-pointer"
                              style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--accent)', border: '1px solid var(--border)' }}>
                              {s.title.slice(0, 50)}{s.title.length > 50 ? '...' : ''}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {chatMutation.isPending && (
              <div className="flex justify-start">
                <div className="rounded-lg px-4 py-3 border" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-card)' }}>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--accent)', animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--accent)', animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--accent)', animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-6 pt-0">
        <div className="flex items-center rounded-lg border px-4 py-3 max-w-3xl mx-auto"
          style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-card)' }}>
          <span className="text-xs mr-3 font-mono" style={{ color: 'var(--accent)' }}>query://</span>
          <input type="text" value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(query)}
            placeholder="Ask about striped bass..."
            className="flex-1 bg-transparent border-none outline-none text-sm"
            style={{ color: 'var(--text-primary)' }} />
          <button onClick={() => handleSubmit(query)}
            disabled={chatMutation.isPending}
            className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold cursor-pointer"
            style={{ backgroundColor: query ? 'var(--accent)' : 'var(--bg-card)', color: query ? '#000' : 'var(--text-muted)' }}>
            Ask AI <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
