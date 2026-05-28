import { useState, useEffect, useRef } from 'react';
import { SendChatMessageUseCase } from '../../application/use-cases/SendChatMessageUseCase';
import { ApiChatRepository } from '../../infrastructure/repositories/ApiChatRepository';

const chatUseCase = new SendChatMessageUseCase(new ApiChatRepository());

export type ChatMessage = { role: 'user' | 'assistant'; text: string };

export function useChat(lang: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');
    setLoading(true);
    try {
      const result = await chatUseCase.execute(text, lang);
      if (result.success) {
        setMessages(prev => [...prev, { role: 'assistant', text: result.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', text: result.message || 'Error del chatbot.' }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Error al comunicarse con el chatbot. Intenta de nuevo.' }]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, input, setInput, loading, sendMessage, containerRef };
}
