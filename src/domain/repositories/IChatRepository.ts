export interface ChatResult {
  success: boolean;
  reply: string;
  message?: string;
}

export interface IChatRepository {
  sendMessage(message: string, lang: string): Promise<ChatResult>;
}
