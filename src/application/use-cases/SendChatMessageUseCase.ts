import type { IChatRepository, ChatResult } from '../../domain/repositories/IChatRepository';

export class SendChatMessageUseCase {
  constructor(private readonly chatRepository: IChatRepository) {}

  execute(message: string, lang: string): Promise<ChatResult> {
    return this.chatRepository.sendMessage(message, lang);
  }
}
