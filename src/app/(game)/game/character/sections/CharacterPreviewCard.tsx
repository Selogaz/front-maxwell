'use client';

import React from 'react';
import { CharacterSelection, CharacterStats } from '@/types/character';

interface CharacterPreviewCardProps {
  selection: CharacterSelection;
  stats: CharacterStats;
}

const CharacterPreviewCard: React.FC<CharacterPreviewCardProps> = ({
  selection,
  stats,
}) => {
  const calculateModifier = (value: number): number => {
    return Math.floor((value - 10) / 2);
  };

  const imageUrl = selection.race?.imageUrl || null;

  return (
    <div className="bg-[linear-gradient(131.16deg,#121212_20.42%,#272727_47.31%,#121212_71.29%)] rounded-2xl border border-[#333] p-4">
      <h2 className="text-lg font-firenight text-[#FFEED5] mb-4 text-center">
        Параметры персонажа
      </h2>

      <div className="bg-[#1a1a1a] rounded-xl p-3 mb-4">
        <div className="aspect-square rounded-lg bg-[#242424] flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt="Character" className="w-full h-full object-cover opacity-70" />
          ) : (
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              className="text-[rgba(236,236,236,0.5)]"
            >
              <circle cx="40" cy="30" r="20" stroke="currentColor" strokeWidth="2" />
              <path d="M15 70C15 52 26 45 40 45C54 45 65 52 65 70" stroke="currentColor" strokeWidth="2" />
              <text x="40" y="38" textAnchor="middle" fill="currentColor" fontSize="14" fontFamily="Firenight">D20</text>
            </svg>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#666]">Имя</span>
          <span className="text-white">{selection.name || '—'}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#666]">Пол</span>
          <span className="text-white">{selection.gender === 'male' ? 'М' : selection.gender === 'female' ? 'Ж' : '—'}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#666]">Раса</span>
          <span className="text-white">{selection.race?.name || '—'}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#666]">Подраса</span>
          <span className="text-white">{selection.subRace?.name || '—'}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#666]">Класс</span>
          <span className="text-white">{selection.characterClass?.name || '—'}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#666]">Подкласс</span>
          <span className="text-white">{selection.subClass?.name || '—'}</span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#666]">Происхождение</span>
          <span className="text-white">{selection.origin?.name || '—'}</span>
        </div>
      </div>
    </div>
  );
};

export default CharacterPreviewCard;