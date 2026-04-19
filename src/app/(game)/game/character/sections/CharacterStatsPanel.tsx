'use client';

import React from 'react';
import { CharacterStats } from '@/types/character';

interface CharacterStatsPanelProps {
  stats: CharacterStats;
}

const CharacterStatsPanel: React.FC<CharacterStatsPanelProps> = ({ stats }) => {
  const statIconMap: Record<keyof CharacterStats, React.ReactNode> = {
    strength: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#DDA852]">
        <path d="M4 8L8 12L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 8L16 12L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    agility: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#66AAA5]">
        <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    constitution: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#EF4444]">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    intelligence: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#3B82F6]">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    wisdom: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#A855F7]">
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
    charisma: (
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-[#EC4899]">
        <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  };

  const statList: { key: keyof CharacterStats; name: string }[] = [
    { key: 'strength', name: 'СИЛ' },
    { key: 'agility', name: 'ЛОВ' },
    { key: 'constitution', name: 'ТЕЛ' },
    { key: 'intelligence', name: 'ИНТ' },
    { key: 'wisdom', name: 'МУД' },
    { key: 'charisma', name: 'ХАР' },
  ];

  return (
    <div className="space-y-1">
      {statList.map((stat) => {
        const value = stats[stat.key];
        const modifier = Math.floor((value - 10) / 2);

        return (
          <div
            key={stat.key}
            className="flex items-center justify-between py-1"
          >
            <div className="flex items-center gap-2">
              {statIconMap[stat.key]}
              <span className="text-white text-xs">{stat.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs ${modifier >= 0 ? 'text-[#66AAA5]' : 'text-[#EF4444]'}`}>
                {modifier >= 0 ? `+${modifier}` : modifier}
              </span>
              <span className="text-white font-firenight text-sm w-5 text-right">
                {value}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CharacterStatsPanel;