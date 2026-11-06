import type { IChatRepository, ChatResult } from '../../domain/repositories/IChatRepository';

export class ApiChatRepository implements IChatRepository {
  private readonly apiBase: string;

  constructor() {
    const isProd = (import.meta as any).env?.MODE === 'production';
    this.apiBase = isProd ? '' : ((import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3001');
  }

  async sendMessage(message: string, lang: string): Promise<ChatResult> {
    try {
      const res = await fetch(`${this.apiBase}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, lang }),
      });
      const data = await res.json();
      if (data?.success) return { success: true, reply: data.reply || '' };
      return { success: false, reply: '', message: data?.message };
    } catch {
      throw new Error('Error al comunicarse con el chatbot');
    }
  }
}
