import type { ContactFormData } from '../entities';

export interface EmailResult {
  success: boolean;
  message: string;
}

export interface IEmailRepository {
  send(data: ContactFormData): Promise<EmailResult>;
}
