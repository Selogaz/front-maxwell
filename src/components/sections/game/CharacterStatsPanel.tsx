'use client';

import React from 'react';
import { CharacterStats } from '@/types/character';

interface CharacterStatsPanelProps {
  stats: CharacterStats;
}

const CharacterStatsPanel: React.FC<CharacterStatsPanelProps> = ({ stats }) => {
  const statList = [
    { key: 'strength' as const, name: 'Сила', icon: '💪' },
    { key: 'agility' as const, name: 'Ловкость', icon: '🏃' },
    { key: 'constitution' as const, name: 'Телосложение', icon: '❤️' },
    { key: 'intelligence' as const, name: 'Интеллект', icon: '🧠' },
    { key: 'wisdom' as const, name: 'Мудрость', icon: '👁️' },
    { key: 'charisma' as const, name: 'Харизма', icon: '✨' },
  ];

  return (
    <div className="space-y-3">
      {statList.map((stat) => {
        const value = stats[stat.key];
        const modifier = Math.floor((value - 10) / 2);

        return (
          <div
            key={stat.key}
            className="flex items-center justify-between p-3 bg-[#0F172A] rounded-xl border border-[#475569]"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{stat.icon}</span>
              <span className="text-[#94A3B8] text-sm">{stat.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-sm ${modifier >= 0 ? 'text-[#337360]' : 'text-[#EF4444]'}`}>
                {modifier >= 0 ? `+${modifier}` : modifier}
              </span>
              <span className="text-white font-bold text-lg w-8 text-right">
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
