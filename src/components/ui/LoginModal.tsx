'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/auth';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
  onOpenResetPassword: () => void;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const MAX_EMAIL_LENGTH = 255;
const MAX_PASSWORD_LENGTH = 128;
const MIN_PASSWORD_LENGTH = 6;

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onOpenRegister,
  onOpenResetPassword,
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const emailInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBlur = () => {
    if (!emailTouched) {
      setEmailTouched(true);
      const emailError = validateEmail(email);
      setErrors((prev) => ({ ...prev, email: emailError }));
    }
    if (!passwordTouched) {
      setPasswordTouched(true);
      if (!password.trim()) {
        setErrors((prev) => ({ ...prev, password: 'Введите пароль' }));
      } else {
        const passwordError = validatePassword(password);
        setErrors((prev) => ({ ...prev, password: passwordError }));
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        handleBlur();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, emailTouched, passwordTouched]);

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

  const validatePassword = (value: string): string | undefined => {
    const invalidChars = /[<>()[\]\\:;]/;
    if (invalidChars.test(value)) {
      return 'Используются недопустимые символы';
    }
    if (value.length > MAX_PASSWORD_LENGTH) {
      return 'Превышено максимальное количество символов';
    }
    if (value.length > 0 && value.length < MIN_PASSWORD_LENGTH) {
      return 'Вы ввели слишком короткий пароль';
    }
    return undefined;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailTouched) {
      const error = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: error }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (passwordTouched) {
      const error = validatePassword(value);
      setErrors((prev) => ({ ...prev, password: error }));
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    const error = validateEmail(email);
    setErrors((prev) => ({ ...prev, email: error }));
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    if (!password.trim()) {
      setErrors((prev) => ({ ...prev, password: 'Введите пароль' }));
    } else {
      const error = validatePassword(password);
      setErrors((prev) => ({ ...prev, password: error }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setEmailTouched(true);
    setPasswordTouched(true);

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    if (emailError || passwordError) {
      setErrors({ email: emailError, password: passwordError });
      return;
    }

    if (!email.trim() || !password.trim()) {
      setErrors({ general: 'Неверный email или пароль' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await authService.login({ email, password });
      const meResponse = await authService.getMe();
      login(meResponse.user);

      onClose();
      setEmail('');
      setPassword('');
      setEmailTouched(false);
      setPasswordTouched(false);
    } catch {
      setErrors({ general: 'Неверный email или пароль' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    onClose();
    onOpenResetPassword();
  };

  const handleRegister = () => {
    onClose();
    onOpenRegister();
  };

  if (!isOpen) return null;

  const emailError = errors.email;
  const passwordError = errors.password;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      <div
        ref={modalRef}
        className="relative bg-[#1E293B] rounded-2xl w-full max-w-md mx-4 p-6 sm:p-8 shadow-2xl border border-[#334155]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#64748B] hover:text-white transition-colors p-1"
          aria-label="Закрыть"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl sm:text-3xl font-firenight text-white text-center mb-6">Вход</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.general && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-2 rounded-lg text-sm text-center">
              {errors.general}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-[#94A3B8] text-sm mb-2">Email</label>
            <input
              ref={emailInputRef}
              type="text"
              id="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              placeholder="Введите email адрес"
              maxLength={MAX_EMAIL_LENGTH}
              className={`w-full px-4 py-3 rounded-lg bg-[#0F172A] text-white placeholder-[#64748B]/50 border transition-colors outline-none ${
                emailError
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-[#475569] focus:border-[#66AAA5]'
              }`}
            />
            {emailError && (
              <p className="text-red-400 text-xs mt-1">{emailError}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-[#94A3B8] text-sm mb-2">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              placeholder="Введите свой пароль"
              maxLength={MAX_PASSWORD_LENGTH}
              className={`w-full px-4 py-3 rounded-lg bg-[#0F172A] text-white placeholder-[#64748B]/50 border transition-colors outline-none ${
                passwordError
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-[#475569] focus:border-[#66AAA5]'
              }`}
            />
            {passwordError && (
              <p className="text-red-400 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-[#94A3B8] hover:text-[#66AAA5] transition-colors text-sm underline-offset-4 hover:underline"
            >
              Не помню пароль
            </button>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-full bg-[#66AAA5] text-white font-medium hover:bg-[#337360] active:bg-[#295F59] transition-all hover:shadow-[0_0_20px_rgba(102,170,165,0.4)] disabled:bg-[#94A3B8] disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Вход...' : 'Войти'}
            </button>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={handleRegister}
              className="text-[#94A3B8] hover:text-[#66AAA5] transition-colors text-sm"
            >
              У меня нет аккаунта, зарегистрироваться!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
