import type { IEmailRepository, EmailResult } from '../../domain/repositories/IEmailRepository';
import type { ContactFormData } from '../../domain/entities';

export class SendEmailUseCase {
  constructor(private readonly emailRepository: IEmailRepository) {}

  execute(data: ContactFormData): Promise<EmailResult> {
    return this.emailRepository.send(data);
  }
}
