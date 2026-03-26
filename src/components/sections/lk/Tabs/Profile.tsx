'use client';

import React from 'react';
import Button from '@/components/ui/Button';

interface ProfileTabProps {
  name: string;
  email: string;
  password: string;
  onNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSave: () => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({
  name,
  email,
  password,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onSave,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-[#94A3B8] text-sm mb-2">Имя пользователя</label>
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#0F172A] text-white border border-[#475569] focus:border-[#66AAA5] focus:outline-none transition-colors"
          placeholder="Введите имя"
        />
      </div>

      <div>
        <label className="block text-[#94A3B8] text-sm mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-[#0F172A] text-white border border-[#475569] focus:border-[#66AAA5] focus:outline-none transition-colors"
          placeholder="Введите email"
        />
      </div>

      <div>
        <label className="block text-[#94A3B8] text-sm mb-2">Пароль</label>
        <div className="flex gap-3">
          <input
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg bg-[#0F172A] text-white border border-[#475569] focus:border-[#66AAA5] focus:outline-none transition-colors"
            placeholder="Введите новый пароль"
          />
          <Button variant="secondary">
            Изменить
          </Button>
        </div>
      </div>

      <div className="pt-4">
        <Button size="lg" onClick={onSave}>
          Сохранить изменения
        </Button>
      </div>
    </div>
  );
};

export default ProfileTab;