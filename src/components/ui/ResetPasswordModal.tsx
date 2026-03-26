'use client';

import React, { useState, useEffect, useRef } from 'react';

interface ResetPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

const MAX_EMAIL_LENGTH = 255;

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({
  isOpen,
  onClose,
  onOpenLogin,
}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [touched, setTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      emailInputRef.current?.focus();
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        if (touched && !email.trim()) {
          setError('Введите email адрес');
        }
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, touched]);

  const validateEmail = (value: string): string | undefined => {
    if (!value.trim()) {
      return 'Введите email адрес';
    }
    const invalidChars = /[<>()[\]\\:;]/;
    if (invalidChars.test(value)) {
      return 'Используются недопустимые символы';
    }
    if (value.length > MAX_EMAIL_LENGTH) {
      return 'Превышено максимальное количество символов';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Введите корректный email адрес';
    }
    return undefined;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (touched) {
      setError(validateEmail(value));
    }
  };

  const handleEmailBlur = () => {
    setTouched(true);
    setError(validateEmail(email));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setTouched(true);
    const emailError = validateEmail(email);

    if (emailError) {
      setError(emailError);
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
    } catch {
      setError('Ошибка при отправке запроса');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    onClose();
    onOpenLogin();
  };

  const handleClose = () => {
    setEmail('');
    setError(undefined);
    setTouched(false);
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
        
        <div
          ref={modalRef}
          className="relative bg-[#1E293B] rounded-2xl w-full max-w-md mx-4 p-6 sm:p-8 shadow-2xl border border-[#334155]"
        >
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-[#64748B] hover:text-white transition-colors p-1"
            aria-label="Закрыть"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#66AAA5]/20 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#66AAA5" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-firenight text-white mb-4">Проверьте почту</h2>
            
            <p className="text-[#94A3B8] mb-6">
              Мы отправили инструкции по восстановлению пароля на адрес <span className="text-white">{email}</span>
            </p>

            <button
              onClick={handleLogin}
              className="text-[#66AAA5] hover:text-[#337360] transition-colors text-sm underline"
            >
              Вернуться ко входу
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      <div
        ref={modalRef}
        className="relative bg-[#1E293B] rounded-2xl w-full max-w-md mx-4 p-6 sm:p-8 shadow-2xl border border-[#334155]"
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-[#64748B] hover:text-white transition-colors p-1"
          aria-label="Закрыть"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl sm:text-3xl font-firenight text-white text-center mb-2">Восстановление пароля</h2>
        
        <p className="text-[#94A3B8] text-sm text-center mb-6">
          Введите email, указанный при регистрации
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reset-email" className="block text-[#94A3B8] text-sm mb-2">Email</label>
            <input
              ref={emailInputRef}
              type="text"
              id="reset-email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              placeholder="Введите email адрес"
              maxLength={MAX_EMAIL_LENGTH}
              className={`w-full px-4 py-3 rounded-lg bg-[#0F172A] text-white placeholder-[#64748B]/50 border transition-colors outline-none ${
                error
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-[#475569] focus:border-[#66AAA5]'
              }`}
            />
            {error && (
              <p className="text-red-400 text-xs mt-1">{error}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-full bg-[#66AAA5] text-white font-medium hover:bg-[#337360] active:bg-[#295F59] transition-all hover:shadow-[0_0_20px_rgba(102,170,165,0.4)] disabled:bg-[#94A3B8] disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Отправка...' : 'Отправить инструкции'}
            </button>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleLogin}
              className="text-[#94A3B8] hover:text-[#66AAA5] transition-colors text-sm"
            >
              У меня уже есть аккаунт, войти!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
