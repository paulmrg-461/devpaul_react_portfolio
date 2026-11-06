import type { IEmailRepository, EmailResult } from '../../domain/repositories/IEmailRepository';
import type { ContactFormData } from '../../domain/entities';

export class ApiEmailRepository implements IEmailRepository {
  private readonly apiBase: string;

  constructor() {
    const isProd = (import.meta as any).env?.MODE === 'production';
    this.apiBase = isProd ? '' : ((import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3001');
  }

  async send(data: ContactFormData): Promise<EmailResult> {
    try {
      const response = await fetch(`${this.apiBase}/api/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Error al enviar el correo');
      return { success: true, message: result.message || 'Correo enviado exitosamente' };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Error desconocido',
      };
    }
  }
}
