import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Sparkles, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AIConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content: 'Selamat datang di Proptera. Saya Clara, AI Concierge Anda hari ini. Ada wilayah atau unit impian yang menarik minat Anda untuk dibahas, atau apakah saya dapat menghitung estimasi KPR properti pilihan Anda?',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || loading) return;

    const userMessageText = inputVal.trim();
    setInputVal('');

    const userMsgObj: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: userMessageText,
    };

    setMessages((prev) => [...prev, userMsgObj]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsgObj].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error('Server connection issue');
      }

      const resData = await response.json();
      
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: resData.text || 'Maaf, saya mengalami kendala teknis sementara. Bisakah Anda mengulangi pertanyaannya?',
        },
      ]);
    } catch (err) {
      console.error('AI chat failed:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'Maaf, sambungan terputus. Mohon pastikan koneksi internet Anda stabil atau hubungi nomor WhatsApp kantor pemasaran kami.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    { label: 'Tentang Amarta Stone 🌴', text: 'Ceritakan detail tentang Amarta Stone Reserve di Uluwatu.' },
    { label: 'Nirvana Canggu ✨', text: 'Apa keunggulan utama Nirvana Waterfront di Canggu Bali?' },
    { label: 'KPR & Tenor 📊', text: 'Bagaimana cara mensimulasikan cicilan KPR rumah seharga 12,8 Miliar dengan tenor 15 tahun?' },
  ];

  const handleQuickPromptClick = (text: string) => {
    setInputVal(text);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans select-none">
      
      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-slate-950 text-white dark:bg-slate-50 dark:text-slate-950 flex items-center justify-center shadow-2xl hover:opacity-90 transition cursor-pointer relative"
        aria-label="Tanya Clara AI"
        id="ai-toggle-floating-btn"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" className="relative flex items-center justify-center" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
              <MessageSquare className="w-6 h-6" />
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-brand-500 border-2 border-slate-950 animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Floating Chat Panel Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="absolute bottom-18 right-0 w-[350px] sm:w-[400px] h-[520px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200/50 dark:border-slate-800"
          >
            {/* Chat Box Header banner */}
            <div className="bg-slate-950 dark:bg-slate-999 px-5 py-4 flex items-center justify-between border-b border-slate-900">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-500/10 flex items-center justify-center border border-brand-500/20">
                  <Sparkles className="w-5 h-5 text-brand-400" />
                </div>
                <div className="text-left">
                  <span className="text-white text-sm font-semibold flex items-center gap-1.5 leading-none mb-1">
                    Clara AI Concierge
                  </span>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    ONLINE & SIAP MELAYANI
                  </span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat messages stream section */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar bg-slate-50/50 dark:bg-slate-950/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {/* Left avatar for AI */}
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-slate-950 text-white dark:bg-slate-50 dark:text-slate-950 flex items-center justify-center text-[10px] shrink-0 font-bold border border-slate-200 dark:border-slate-800">
                      CL
                    </div>
                  )}

                  {/* Message bubble */}
                  <div className="text-left">
                    <div
                      className={`rounded-2xl px-4 py-2.5 text-xs sm:text-xs leading-relaxed max-w-[260px] sm:max-w-[290px] ${
                        msg.role === 'user'
                          ? 'bg-slate-900 text-white dark:bg-slate-50 dark:text-slate-950 rounded-tr-none shadow-sm'
                          : 'bg-white dark:bg-slate-850 text-slate-850 dark:text-slate-100 rounded-tl-none border border-slate-200/40 dark:border-slate-800/60 shadow-sm'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                </div>
              ))}

              {/* Waiting Loading state indicator */}
              {loading && (
                <div className="flex gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-full bg-slate-950 text-white dark:bg-slate-50 dark:text-slate-950 flex items-center justify-center text-[10px] shrink-0 font-bold">
                    CL
                  </div>
                  <div className="bg-white dark:bg-slate-850 rounded-2xl rounded-tl-none px-4 py-3 border border-slate-200/40 dark:border-slate-800/60 shadow-sm flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Quick Helper prompts on bottom panel */}
            {messages.length === 1 && (
              <div className="px-4 py-2.5 flex flex-wrap gap-1.5 bg-slate-100/50 dark:bg-slate-950 border-t border-slate-200/50 dark:border-slate-850/80">
                {quickPrompts.map((p, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPromptClick(p.text)}
                    className="text-[10px] px-2.5 py-1.5 bg-white dark:bg-slate-800 text-slate-650 dark:text-slate-350 rounded-full border border-slate-200/40 dark:border-slate-755 hover:border-brand-500 hover:text-brand-600 transition cursor-pointer font-medium"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            )}

            {/* Send form keyboard area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200/50 dark:border-slate-800/80 flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Tanya Clara mengenai detail properti..."
                className="w-full text-xs bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2.5 px-3 focus:ring-1 focus:ring-brand-500 outline-none text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 font-sans"
              />
              <button
                type="submit"
                disabled={loading || !inputVal.trim()}
                className="bg-slate-900 hover:bg-brand-600 dark:bg-slate-50 dark:text-slate-900 p-2.5 rounded-lg text-white transition disabled:opacity-50 cursor-pointer flex items-center justify-center shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
