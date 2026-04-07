'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';

const CreateGamePage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0F172A] pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-[#1E293B] rounded-2xl p-6 mb-6 relative overflow-hidden border border-[#66AAA5]/30 shadow-[0_0_40px_rgba(102,170,165,0.15)]">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#66AAA5] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#66AAA5]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#66AAA5]/3 to-transparent pointer-events-none" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => router.back()}
                className="flex-shrink-0 p-2 rounded-lg hover:bg-[#334155] transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                  <path d="M19 12H5" />
                  <path d="M12 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-2xl font-firenight font-bold text-white">
                Создание игры
              </h1>
            </div>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 mb-6 border border-[#334155]">
          <h2 className="text-xl font-firenight text-white mb-4">Создать игру</h2>
          <div className="h-32 bg-[#0F172A] rounded-xl border border-[#475569] flex items-center justify-center mb-4">
            <span className="text-[#64748B]">Заглушка: форма создания игры</span>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => router.push('/game/character')}>Создать</Button>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 mb-6 border border-[#334155]">
          <h2 className="text-xl font-firenight text-white mb-4">Выбор сложности</h2>
          <div className="h-32 bg-[#0F172A] rounded-xl border border-[#475569] flex items-center justify-center">
            <span className="text-[#64748B]">Заглушка: выбор сложности</span>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 mb-6 border border-[#334155]">
          <h2 className="text-xl font-firenight text-white mb-4">Фильтры</h2>
          <div className="h-32 bg-[#0F172A] rounded-xl border border-[#475569] flex items-center justify-center">
            <span className="text-[#64748B]">Заглушка: фильтры</span>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 border border-[#334155]">
          <h2 className="text-xl font-firenight text-white mb-4">Истории</h2>
          <div className="h-32 bg-[#0F172A] rounded-xl border border-[#475569] flex items-center justify-center">
            <span className="text-[#64748B]">Заглушка: истории</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGamePage;