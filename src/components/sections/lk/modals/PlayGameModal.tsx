'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface PlayGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PlayGameModal: React.FC<PlayGameModalProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  if (!isOpen) return null;

  const handleCreateGame = () => {
    onClose();
    router.push('/game/create');
  };

  const handleJoinGame = () => {
    onClose();
    router.push('/game/join');
  };

  const handleContinueGame = () => {
    onClose();
    router.push('/game/continue');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-[#1E293B] rounded-2xl p-6 w-full max-w-sm border border-[#475569] shadow-[0_0_40px_rgba(0,0,0,0.5)]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#64748B] hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <h2 className="text-xl font-firenight text-white mb-6 text-center">Играть</h2>

        <div className="space-y-3">
          <button
            onClick={handleCreateGame}
            className="w-full flex items-center gap-3 px-5 py-4 rounded-xl bg-[#0F172A] border border-[#475569] hover:border-[#66AAA5] hover:shadow-[0_0_20px_rgba(102,170,165,0.2)] transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#66AAA5]/10 flex items-center justify-center group-hover:bg-[#66AAA5]/20 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#66AAA5" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <span className="text-white font-medium">Создать игру</span>
          </button>

          <button
            onClick={handleJoinGame}
            className="w-full flex items-center gap-3 px-5 py-4 rounded-xl bg-[#0F172A] border border-[#475569] hover:border-[#66AAA5] hover:shadow-[0_0_20px_rgba(102,170,165,0.2)] transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#66AAA5]/10 flex items-center justify-center group-hover:bg-[#66AAA5]/20 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#66AAA5" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <span className="text-white font-medium">Присоединиться к игре</span>
          </button>

          <button
            onClick={handleContinueGame}
            className="w-full flex items-center gap-3 px-5 py-4 rounded-xl bg-[#0F172A] border border-[#475569] hover:border-[#66AAA5] hover:shadow-[0_0_20px_rgba(102,170,165,0.2)] transition-all group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#66AAA5]/10 flex items-center justify-center group-hover:bg-[#66AAA5]/20 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#66AAA5" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <span className="text-white font-medium">Продолжить игру</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayGameModal;