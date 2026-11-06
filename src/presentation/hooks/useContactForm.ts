import { useState } from 'react';
import type { ContactFormData } from '../../domain/entities';
import { SendEmailUseCase } from '../../application/use-cases/SendEmailUseCase';
import { ApiEmailRepository } from '../../infrastructure/repositories/ApiEmailRepository';

const emailUseCase = new SendEmailUseCase(new ApiEmailRepository());

export interface SubmitStatus {
  type: 'success' | 'error' | null;
  message: string;
}

export function useContactForm(successMsg: string, errorMsg: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<SubmitStatus>({ type: null, message: '' });

  const submit = async (data: ContactFormData, reset: () => void) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });
    try {
      const result = await emailUseCase.execute(data);
      if (result.success) {
        setSubmitStatus({ type: 'success', message: successMsg });
        reset();
      } else {
        setSubmitStatus({ type: 'error', message: result.message });
      }
    } catch {
      setSubmitStatus({ type: 'error', message: errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitStatus, submit };
}
