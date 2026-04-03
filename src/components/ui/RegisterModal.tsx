'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/services/auth';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const MAX_EMAIL_LENGTH = 255;
const MAX_PASSWORD_LENGTH = 128;
const MIN_PASSWORD_LENGTH = 6;

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onOpenLogin,
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        validateAll();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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

  const validateConfirmPassword = (value: string): string | undefined => {
    if (!value.trim()) {
      return 'Подтвердите пароль';
    }
    if (value !== password) {
      return 'Пароли не совпадают';
    }
    return undefined;
  };

  const handleChange = (field: string, value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(value);
    if (touched[field]) {
      let error: string | undefined;
      switch (field) {
        case 'email': error = validateEmail(value); break;
        case 'password': error = validatePassword(value); break;
        case 'confirmPassword': error = validateConfirmPassword(value); break;
      }
      setErrors((prev) => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    let value: string;
    let error: string | undefined;
    switch (field) {
      case 'email': value = email; error = validateEmail(value); break;
      case 'password': value = password; error = validatePassword(value); break;
      case 'confirmPassword': value = confirmPassword; error = validateConfirmPassword(value); break;
      default: return;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateAll = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const confirmError = validateConfirmPassword(confirmPassword);

    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
    });

    setErrors({
      email: emailError,
      password: passwordError,
      confirmPassword: confirmError,
    });

    return !emailError && !passwordError && !confirmError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await authService.register({
        email,
        password,
      });

      await authService.login({ email, password });
      const meResponse = await authService.getMe();
      login(meResponse.user);

      onClose();
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTouched({});
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка при регистрации';
      setErrors({ email: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    onClose();
    onOpenLogin();
  };

  if (!isOpen) return null;

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

        <h2 className="text-2xl sm:text-3xl font-firenight text-white text-center mb-6">Регистрация</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="reg-email" className="block text-[#94A3B8] text-sm mb-2">Email</label>
            <input
              type="text"
              id="reg-email"
              value={email}
              onChange={(e) => handleChange('email', e.target.value, setEmail)}
              onBlur={() => handleBlur('email')}
              placeholder="Введите email адрес"
              maxLength={MAX_EMAIL_LENGTH}
              className={`w-full px-4 py-3 rounded-lg bg-[#0F172A] text-white placeholder-[#64748B]/50 border transition-colors outline-none ${
                errors.email
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-[#475569] focus:border-[#66AAA5]'
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="reg-password" className="block text-[#94A3B8] text-sm mb-2">Пароль</label>
            <input
              type="password"
              id="reg-password"
              value={password}
              onChange={(e) => handleChange('password', e.target.value, setPassword)}
              onBlur={() => handleBlur('password')}
              placeholder="Введите пароль"
              maxLength={MAX_PASSWORD_LENGTH}
              className={`w-full px-4 py-3 rounded-lg bg-[#0F172A] text-white placeholder-[#64748B]/50 border transition-colors outline-none ${
                errors.password
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-[#475569] focus:border-[#66AAA5]'
              }`}
            />
            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-[#94A3B8] text-sm mb-2">Подтвердите пароль</label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => handleChange('confirmPassword', e.target.value, setConfirmPassword)}
              onBlur={() => handleBlur('confirmPassword')}
              placeholder="Подтвердите пароль"
              maxLength={MAX_PASSWORD_LENGTH}
              className={`w-full px-4 py-3 rounded-lg bg-[#0F172A] text-white placeholder-[#64748B]/50 border transition-colors outline-none ${
                errors.confirmPassword
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-[#475569] focus:border-[#66AAA5]'
              }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 rounded-full bg-[#66AAA5] text-white font-medium hover:bg-[#337360] active:bg-[#295F59] transition-all hover:shadow-[0_0_20px_rgba(102,170,165,0.4)] disabled:bg-[#94A3B8] disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
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

export default RegisterModal;
