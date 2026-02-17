import { ContactFormData } from '../types';

interface EmailResponse {
  success: boolean;
  message: string;
}

export const sendEmail = async (formData: ContactFormData): Promise<EmailResponse> => {
  try {
    const isProd = (import.meta as any).env?.MODE === 'production';
    const apiBase = isProd ? '' : ((import.meta as any).env?.VITE_API_BASE_URL || 'http://localhost:3001');

    const response = await fetch(`${apiBase}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Error al enviar el correo');
    }

    return {
      success: true,
      message: result.message || 'Correo enviado exitosamente'
    };
  } catch (error) {
    console.error('Error sending email:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Error desconocido al enviar el correo'
    };
  }
};
