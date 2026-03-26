'use client';

import React from 'react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/70" 
        onClick={onClose}
      />
      <h3 className="relative z-10 text-xl font-bold text-white mb-4">
        Выход из аккаунта
      </h3>
      <div className="relative bg-[#1E293B] rounded-2xl p-6 max-w-sm mx-4 shadow-2xl border border-[#334155]">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#64748B] hover:text-white p-1 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
        <p className="text-[#94A3B8] text-center mb-6 pr-6">
          Вы уверены, что хотите выйти из аккаунта?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 py-3 px-4 rounded-lg bg-[#66AAA5] text-white font-medium hover:bg-[#337360] hover:shadow-[0_0_15px_rgba(102,170,165,0.3)] transition-all"
          >
            Да
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-lg border border-[#475569] text-white font-medium hover:bg-[#334155] hover:shadow-[0_0_10px_rgba(102,170,165,0.2)] transition-all"
          >
            Нет
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;