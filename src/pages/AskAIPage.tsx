import { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';

export function AskAIPage() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([]);

  const handleSubmit = (q: string) => {
    if (!q.trim()) return;
    setMessages([...messages, { role: 'user', content: q }]);
    setQuery('');
    // TODO: integrate with tRPC aiChat.chat mutation
    setTimeout(() => {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'AI chat is being configured. This feature will query the 835-chunk document corpus using RAG (Retrieval-Augmented Generation) to provide sourced answers about striped bass management, stock assessments, and regulations.'
      }]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 pb-0">
        <h1 className="text-lg font-bold tracking-wider mb-1">ASK THE AI</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Query the striped bass research corpus — 835 chunks, 527K+ words from ASMFC documents, stock assessments, and scientific literature.
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="text-6xl mb-4 opacity-20">🐟</div>
            <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
              Ask a question about striped bass management, science, or regulations
            </p>
            <div className="flex flex-wrap gap-2 max-w-lg justify-center">
              {[
                'What did the 2018 benchmark assessment find?',
                'How does Amendment 7 define overfishing?',
                'What is the MRIP FES telescoping error?',
              ].map((q) => (
                <button key={q} onClick={() => handleSubmit(q)}
                  className="px-3 py-1.5 rounded-full text-xs border cursor-pointer"
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
                <div className="rounded-lg px-4 py-3 max-w-[80%]"
                  style={{
                    backgroundColor: msg.role === 'user' ? 'var(--accent)' : 'var(--bg-card)',
                    color: msg.role === 'user' ? '#000' : 'var(--text-primary)',
                    border: msg.role === 'assistant' ? '1px solid var(--border)' : 'none',
                  }}>
                  <p className="text-sm">{msg.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-6 pt-0">
        <div className="flex items-center rounded-lg border px-4 py-3 max-w-3xl mx-auto"
          style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--bg-card)' }}>
          <span className="text-xs mr-3 font-mono" style={{ color: 'var(--accent)' }}>query://</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit(query)}
            placeholder="Ask about striped bass..."
            className="flex-1 bg-transparent border-none outline-none text-sm"
            style={{ color: 'var(--text-primary)' }}
          />
          <button onClick={() => handleSubmit(query)}
            className="flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold cursor-pointer"
            style={{ backgroundColor: query ? 'var(--accent)' : 'var(--bg-card)', color: query ? '#000' : 'var(--text-muted)' }}>
            Ask AI <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
