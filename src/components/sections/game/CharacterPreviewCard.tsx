'use client';

import React from 'react';
import { CharacterSelection, CharacterStats } from '@/types/character';

interface CharacterPreviewCardProps {
  selection: CharacterSelection;
  stats: CharacterStats;
  onSetGender: (gender: 'male' | 'female') => void;
  onSetName: (name: string) => void;
}

const CharacterPreviewCard: React.FC<CharacterPreviewCardProps> = ({
  selection,
  stats,
  onSetGender,
  onSetName,
}) => {
  const calculateModifier = (value: number): number => {
    return Math.floor((value - 10) / 2);
  };

  const getModifierDisplay = (value: number): string => {
    const mod = calculateModifier(value);
    return mod >= 0 ? `+${mod}` : `${mod}`;
  };

  const getCharacterImage = () => {
    const race = selection.race?.id || 'human';
    const gender = selection.gender || 'male';
    
    if (selection.race?.imageUrl) {
      return selection.race.imageUrl;
    }
    
    return null;
  };

  const imageUrl = getCharacterImage();

  const statsWithModifiers = [
    { name: 'Сила', value: stats.strength, raceMod: selection.race?.modifier.strength || 0, subRaceMod: selection.subRace?.modifier.strength || 0 },
    { name: 'Ловкость', value: stats.agility, raceMod: selection.race?.modifier.agility || 0, subRaceMod: selection.subRace?.modifier.agility || 0 },
    { name: 'Телосложение', value: stats.constitution, raceMod: selection.race?.modifier.constitution || 0, subRaceMod: selection.subRace?.modifier.constitution || 0 },
    { name: 'Интеллект', value: stats.intelligence, raceMod: selection.race?.modifier.intelligence || 0, subRaceMod: selection.subRace?.modifier.intelligence || 0 },
    { name: 'Мудрость', value: stats.wisdom, raceMod: selection.race?.modifier.wisdom || 0, subRaceMod: selection.subRace?.modifier.wisdom || 0 },
    { name: 'Харизма', value: stats.charisma, raceMod: selection.race?.modifier.charisma || 0, subRaceMod: selection.subRace?.modifier.charisma || 0 },
  ];

  const getTotalMod = (raceMod: number, subRaceMod: number) => raceMod + subRaceMod;

  return (
    <div className="bg-[#1E293B] rounded-2xl p-4 border border-[#334155] sticky top-24">
      <h2 className="text-lg font-firenight font-bold text-white mb-4">
        Параметры персонажа
      </h2>

      <div className="bg-[#0F172A] rounded-xl border border-[#475569] p-4 mb-4">
        <div className="aspect-square rounded-lg bg-[#1E293B] flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt="Character" className="w-full h-full object-cover" />
          ) : (
            <svg
              width="80"
              height="80"
              viewBox="0 0 80 80"
              fill="none"
              className="text-[#475569]"
            >
              <circle cx="40" cy="25" r="15" stroke="currentColor" strokeWidth="2" />
              <path d="M15 70C15 55 26 45 40 45C54 45 65 55 65 70" stroke="currentColor" strokeWidth="2" />
              <circle cx="35" cy="23" r="2" fill="currentColor" />
              <circle cx="45" cy="23" r="2" fill="currentColor" />
              <path d="M37 30C37 30 40 33 43 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#64748B]">Раса</span>
          <span className="text-white">{selection.race?.name || '—'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#64748B]">Под раса</span>
          <span className="text-white">{selection.subRace?.name || '—'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#64748B]">Класс</span>
          <span className="text-white">{selection.characterClass?.name || '—'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#64748B]">Подкласс</span>
          <span className="text-white">{selection.subClass?.name || '—'}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#64748B]">Происхождение</span>
          <span className="text-white">{selection.origin?.name || '—'}</span>
        </div>
      </div>

      <div className="border-t border-[#475569] pt-4 mb-4">
        <h3 className="text-sm font-medium text-[#94A3B8] mb-3">Характеристики</h3>
        <div className="space-y-2">
          {statsWithModifiers.map((stat) => {
            const totalMod = getTotalMod(stat.raceMod, stat.subRaceMod);
            if (totalMod === 0) return null;
            
            return (
              <div key={stat.name} className="flex items-center justify-between text-sm">
                <span className="text-[#64748B]">{stat.name}</span>
                <span className={totalMod >= 0 ? 'text-[#337360]' : 'text-[#EF4444]'}>
                  {totalMod >= 0 ? `+${totalMod}` : totalMod}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-[#475569] pt-4 mb-4">
        <h3 className="text-sm font-medium text-[#94A3B8] mb-3">Пол</h3>
        <div className="flex gap-4">
          <button
            onClick={() => onSetGender('male')}
            className={`
              flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all
              ${selection.gender === 'male' 
                ? 'border-[#66AAA5] bg-[#66AAA5]/20 text-white' 
                : 'border-[#475569] hover:border-[#66AAA5]/50 text-[#94A3B8]'}
            `}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={selection.gender === 'male' ? 'text-[#66AAA5]' : 'text-[#64748B]'}>
              <circle cx="10" cy="14" r="5" stroke="currentColor" strokeWidth="2" />
              <path d="M19 5L5 19M19 5H10M19 5V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="text-sm">Мужской</span>
          </button>
          <button
            onClick={() => onSetGender('female')}
            className={`
              flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border transition-all
              ${selection.gender === 'female' 
                ? 'border-[#66AAA5] bg-[#66AAA5]/20 text-white' 
                : 'border-[#475569] hover:border-[#66AAA5]/50 text-[#94A3B8]'}
            `}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className={selection.gender === 'female' ? 'text-[#66AAA5]' : 'text-[#64748B]'}>
              <circle cx="12" cy="9" r="5" stroke="currentColor" strokeWidth="2" />
              <path d="M12 14V21M9 18H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-sm">Женский</span>
          </button>
        </div>
      </div>

      <div className="border-t border-[#475569] pt-4">
        <h3 className="text-sm font-medium text-[#94A3B8] mb-3">Имя персонажа</h3>
        <input
          type="text"
          value={selection.name}
          onChange={(e) => onSetName(e.target.value)}
          placeholder="Введите имя..."
          required
          className="
            w-full bg-[#0F172A] border border-[#475569] rounded-xl px-4 py-3 
            text-white placeholder-[#64748B] 
            focus:outline-none focus:border-[#66AAA5] focus:ring-1 focus:ring-[#66AAA5]
            transition-colors
          "
        />
      </div>
    </div>
  );
};

export default CharacterPreviewCard;
