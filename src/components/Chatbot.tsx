import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 }
  }
};

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, index) => {
    const match = part.match(/^\*\*(.+)\*\*$/);
    if (match) {
      return (
        <strong key={index} className="font-semibold">
          {match[1]}
        </strong>
      );
    }
    return <React.Fragment key={index}>{part}</React.Fragment>;
  });
}

function renderMarkdown(text: string) {
  const blocks = text.split(/\n{2,}/);

  return blocks.map((block, index) => {
    const trimmed = block.trim();
    if (!trimmed) return null;

    if (trimmed.startsWith('### ')) {
      const content = trimmed.slice(4);
      return (
        <h3 key={index} className="font-semibold text-sm mb-1">
          {renderInlineMarkdown(content)}
        </h3>
      );
    }

    if (trimmed.startsWith('## ')) {
      const content = trimmed.slice(3);
      return (
        <h2 key={index} className="font-semibold text-sm mb-1">
          {renderInlineMarkdown(content)}
        </h2>
      );
    }

    if (trimmed.startsWith('# ')) {
      const content = trimmed.slice(2);
      return (
        <h1 key={index} className="font-semibold text-sm mb-1">
          {renderInlineMarkdown(content)}
        </h1>
      );
    }

    const lines = trimmed.split('\n');
    return (
      <p key={index} className="text-sm leading-relaxed mb-1">
        {lines.map((line, lineIndex) => (
          <React.Fragment key={lineIndex}>
            {renderInlineMarkdown(line)}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        ))}
      </p>
    );
  });
}

const Chatbot: React.FC = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; text: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const API_BASE = (import.meta).env?.VITE_API_BASE_URL || 'http://localhost:3001';

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });
      const data = await res.json();
      if (data?.success) {
        setMessages(prev => [...prev, { role: 'assistant', text: data.reply || '' }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: data?.message || 'El chatbot no está disponible.' }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', text: `Error al comunicarse con el servidor: ${e}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.4)' }}
        whileTap={{ scale: 0.95 }}
        aria-label="Abrir chatbot"
      >
        <MessageCircle size={24} />
      </motion.button>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-end sm:items-center justify-center z-50">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full sm:max-w-lg bg-white dark:bg-gray-800 rounded-t-2xl sm:rounded-2xl shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2">
                <MessageCircle className="text-blue-600" size={20} />
                <h3 className="font-semibold text-gray-900 dark:text-white">{t('hero.chatTitle') || 'Chat con DevPaul'}</h3>
              </div>
              <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">✕</button>
            </div>

            <div className="p-4 h-96 overflow-y-auto space-y-4">
              {messages.length === 0 && (
                <motion.div variants={itemVariants} className="text-sm text-gray-600 dark:text-gray-300">
                  {t('hero.chatIntro') || 'Pregúntame sobre proyectos, tecnologías, experiencia y si puedo ayudarte con tu idea.'}
                </motion.div>
              )}
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className={m.role === 'user' ? 'flex justify-end' : 'flex justify-start'}
                >
                  <div
                    className={
                      'inline-block max-w-[80%] px-3 py-2 text-sm ' +
                      (m.role === 'user'
                        ? 'bg-blue-600 text-white rounded-2xl rounded-br-none ml-10'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-2xl rounded-bl-none mr-10')
                    }
                  >
                    {m.role === 'assistant' ? renderMarkdown(m.text) : m.text}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div variants={itemVariants} className="text-sm text-gray-500 dark:text-gray-400">
                  Pensando...
                </motion.div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder={t('chat.inputPlaceholder') || 'Escribe tu mensaje...'}
                className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 outline-none"
              />
              <motion.button
                onClick={sendMessage}
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                whileHover={{ scale: 1.03, boxShadow: '0 8px 24px rgba(59, 130, 246, 0.35)' }}
                whileTap={{ scale: 0.97 }}
              >
                <Send size={18} />
                {t('chat.send') || 'Enviar'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
