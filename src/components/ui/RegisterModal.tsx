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
  nickname?: string;
  confirmPassword?: string;
}

const MAX_NAME_LENGTH = 50;

const RegisterModal: React.FC<RegisterModalProps> = ({
  isOpen,
  onClose,
  onOpenLogin,
}) => {
  const { login } = useAuth();
  const [nickname, setNickname] = useState('');
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

  const validateConfirmPassword = (value: string): string | undefined => {
    if (!value.trim()) {
      return 'Подтвердите пароль';
    }
    if (value !== password) {
      return 'Пароли не совпадают';
    }
    return undefined;
  };

   const validateNickname = (value: string): string | undefined => {
     if (!value.trim()) {
       return 'Введите никнейм';
     }
     if (value.length > MAX_NAME_LENGTH) {
       return 'Превышено максимальное количество символов';
     }
     const invalidChars = /[<>()[\]\\:;]/;
     if (invalidChars.test(value)) {
       return 'Используются недопустимые символы';
     }
     return undefined;
   };

  const handleChange = (field: string, value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(value);
    if (touched[field]) {
      let error: string | undefined;
      switch (field) {
        case 'nickname': error = validateNickname(value); break;
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
      case 'nickname': value = nickname; error = validateNickname(value); break;
      case 'confirmPassword': value = confirmPassword; error = validateConfirmPassword(value); break;
      default: return;
    }
    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  const validateAll = () => {
    const nicknameError = validateNickname(nickname);
    const confirmError = validateConfirmPassword(confirmPassword);

    setTouched({
      nickname: true,
      confirmPassword: true,
    });

    setErrors({
      nickname: nicknameError,
      confirmPassword: confirmError,
    });

    return !nicknameError && !confirmError;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const registerResponse = await authService.register({
        email,
        password,
        nickname,
      });

      await authService.login({ email, password });
      const meResponse = await authService.getMe();
      login({ ...meResponse.user, nickname: registerResponse.nickname });

      onClose();
      setNickname('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTouched({});
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка при регистрации';
      console.error('Registration error:', message);
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
            <label htmlFor="reg-nickname" className="block text-[#94A3B8] text-sm mb-2">Никнейм</label>
            <input
              type="text"
              id="reg-nickname"
              value={nickname}
              onChange={(e) => handleChange('nickname', e.target.value, setNickname)}
              onBlur={() => handleBlur('nickname')}
              placeholder="Введите ваш никнейм"
              maxLength={MAX_NAME_LENGTH}
              className={`w-full px-4 py-3 rounded-lg bg-[#0F172A] text-white placeholder-[#64748B]/50 border transition-colors outline-none ${
                errors.nickname
                  ? 'border-red-500 focus:border-red-400'
                  : 'border-[#475569] focus:border-[#66AAA5]'
              }`}
            />
            {errors.nickname && (
              <p className="text-red-400 text-xs mt-1">{errors.nickname}</p>
            )}
          </div>

          <div>
            <label htmlFor="reg-email" className="block text-[#94A3B8] text-sm mb-2">Email</label>
            <input
              type="text"
              id="reg-email"
              value={email}
              onChange={(e) => handleChange('email', e.target.value, setEmail)}
              placeholder="Введите email адрес"
              className="w-full px-4 py-3 rounded-lg bg-[#0F172A] text-white placeholder-[#64748B]/50 border border-[#475569] focus:border-[#66AAA5] transition-colors outline-none"
            />
          </div>

          <div>
            <label htmlFor="reg-password" className="block text-[#94A3B8] text-sm mb-2">Пароль</label>
            <input
              type="password"
              id="reg-password"
              value={password}
              onChange={(e) => handleChange('password', e.target.value, setPassword)}
              placeholder="Введите пароль"
              className="w-full px-4 py-3 rounded-lg bg-[#0F172A] text-white placeholder-[#64748B]/50 border border-[#475569] focus:border-[#66AAA5] transition-colors outline-none"
            />
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
