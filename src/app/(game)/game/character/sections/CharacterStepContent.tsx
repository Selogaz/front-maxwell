'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import CharacterInfoModal from './CharacterInfoModal';
import {
  StepId,
  CharacterData,
  CharacterSelection,
  CharacterStats,
  STATS_POINTS,
  STATS_MAX,
  STATS_MIN,
} from '@/types/character';

interface CharacterStepContentProps {
  currentStep: StepId;
  data: CharacterData;
  selection: CharacterSelection;
  usedPoints: number;
  onSelectRace: (id: string) => void;
  onSelectSubRace: (id: string) => void;
  onSelectClass: (id: string) => void;
  onSelectOrigin: (id: string) => void;
  onUpdateStats: (stat: keyof CharacterStats, value: number) => void;
  onApplyRecommended: () => void;
  onResetStats: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSetName?: (name: string) => void;
  onSetGender?: (gender: 'male' | 'female') => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const RaceIcon: React.FC<{ race: string; className?: string }> = ({ race, className }) => {
  const iconPaths: Record<string, string> = {
    human: "M11.1421 0.66275C11.1421 1.10455 10.3322 2.28268 9.3013 3.38718C6.57687 6.3325 3.85244 11.4868 1.86434 17.5984C-1.59642 28.2752 -0.123754 43.2227 5.3251 52.7214C7.5341 56.4767 12.173 62.6619 13.8666 64.0609C25.5006 73.7069 34.1157 76.8731 47.3697 76.3577C56.132 76.0632 59.8137 75.1796 65.9989 72.0133C77.6329 66.1227 85.5117 56.8449 89.6351 44.3272C91.1078 39.8356 91.4023 37.3321 91.4023 30.4842C91.4023 25.9189 91.1078 22.0164 90.7396 21.7955C90.3715 21.5746 90.1506 25.2562 90.1506 30.0424C90.1506 37.3321 89.856 39.5411 88.3097 44.2536C86.7634 48.9661 82.1245 57.5812 80.431 58.9066C80.2101 59.1275 78.4429 60.8947 76.6021 62.9564C74.7612 64.9445 72.994 66.7117 72.6995 66.7117C72.405 66.7854 70.4169 68.0371 68.2079 69.4362C66.0725 70.8352 62.0963 72.5288 59.4455 73.2651C56.7211 74.0014 54.4385 74.8114 54.2912 75.0323C54.1439 75.2532 50.4623 75.4005 46.1915 75.4005C39.8591 75.2532 37.2083 74.885 32.2749 73.2651C18.1373 68.5526 8.12317 58.5385 3.33701 44.18C1.56981 38.8784 1.27528 36.8167 1.34891 30.5578C1.42254 22.4582 3.55791 14.5058 7.0923 8.83603C8.12317 7.2161 8.93313 5.74344 8.93313 5.52254C8.93313 5.30164 9.7431 4.19714 10.774 3.09264C12.7621 1.03091 13.0566 5.34058e-05 11.8785 5.34058e-05C11.5103 5.34058e-05 11.1421 0.294586 11.1421 0.66275Z",
    elf: "M11.1421 0.66275C11.1421 1.10455 10.3322 2.28268 9.3013 3.38718C6.57687 6.3325 3.85244 11.4868 1.86434 17.5984C-1.59642 28.2752 -0.123754 43.2227 5.3251 52.7214C7.5341 56.4767 12.173 62.6619 13.8666 64.0609C25.5006 73.7069 34.1157 76.8731 47.3697 76.3577C56.132 76.0632 59.8137 75.1796 65.9989 72.0133C77.6329 66.1227 85.5117 56.8449 89.6351 44.3272C91.1078 39.8356 91.4023 37.3321 91.4023 30.4842C91.4023 25.9189 91.1078 22.0164 90.7396 21.7955C90.3715 21.5746 90.1506 25.2562 90.1506 30.0424C90.1506 37.3321 89.856 39.5411 88.3097 44.2536C86.7634 48.9661 82.1245 57.5812 80.431 58.9066C80.2101 59.1275 78.4429 60.8947 76.6021 62.9564C74.7612 64.9445 72.994 66.7117 72.6995 66.7117C72.405 66.7854 70.4169 68.0371 68.2079 69.4362C66.0725 70.8352 62.0963 72.5288 59.4455 73.2651C56.7211 74.0014 54.4385 74.8114 54.2912 75.0323C54.1439 75.2532 50.4623 75.4005 46.1915 75.4005C39.8591 75.2532 37.2083 74.885 32.2749 73.2651C18.1373 68.5526 8.12317 58.5385 3.33701 44.18C1.56981 38.8784 1.27528 36.8167 1.34891 30.5578C1.42254 22.4582 3.55791 14.5058 7.0923 8.83603C8.12317 7.2161 8.93313 5.74344 8.93313 5.52254C8.93313 5.30164 9.7431 4.19714 10.774 3.09264C12.7621 1.03091 13.0566 5.34058e-05 11.8785 5.34058e-05C11.5103 5.34058e-05 11.1421 0.294586 11.1421 0.66275Z",
    dwarf: "M11.1421 0.66275C11.1421 1.10455 10.3322 2.28268 9.3013 3.38718C6.57687 6.3325 3.85244 11.4868 1.86434 17.5984C-1.59642 28.2752 -0.123754 43.2227 5.3251 52.7214C7.5341 56.4767 12.173 62.6619 13.8666 64.0609C25.5006 73.7069 34.1157 76.8731 47.3697 76.3577C56.132 76.0632 59.8137 75.1796 65.9989 72.0133C77.6329 66.1227 85.5117 56.8449 89.6351 44.3272C91.1078 39.8356 91.4023 37.3321 91.4023 30.4842C91.4023 25.9189 91.1078 22.0164 90.7396 21.7955C90.3715 21.5746 90.1506 25.2562 90.1506 30.0424C90.1506 37.3321 89.856 39.5411 88.3097 44.2536C86.7634 48.9661 82.1245 57.5812 80.431 58.9066C80.2101 59.1275 78.4429 60.8947 76.6021 62.9564C74.7612 64.9445 72.994 66.7117 72.6995 66.7117C72.405 66.7854 70.4169 68.0371 68.2079 69.4362C66.0725 70.8352 62.0963 72.5288 59.4455 73.2651C56.7211 74.0014 54.4385 74.8114 54.2912 75.0323C54.1439 75.2532 50.4623 75.4005 46.1915 75.4005C39.8591 75.2532 37.2083 74.885 32.2749 73.2651C18.1373 68.5526 8.12317 58.5385 3.33701 44.18C1.56981 38.8784 1.27528 36.8167 1.34891 30.5578C1.42254 22.4582 3.55791 14.5058 7.0923 8.83603C8.12317 7.2161 8.93313 5.74344 8.93313 5.52254C8.93313 5.30164 9.7431 4.19714 10.774 3.09264C12.7621 1.03091 13.0566 5.34058e-05 11.8785 5.34058e-05C11.5103 5.34058e-05 11.1421 0.294586 11.1421 0.66275Z",
    halfling: "M11.1421 0.66275C11.1421 1.10455 10.3322 2.28268 9.3013 3.38718C6.57687 6.3325 3.85244 11.4868 1.86434 17.5984C-1.59642 28.2752 -0.123754 43.2227 5.3251 52.7214C7.5341 56.4767 12.173 62.6619 13.8666 64.0609C25.5006 73.7069 34.1157 76.8731 47.3697 76.3577C56.132 76.0632 59.8137 75.1796 65.9989 72.0133C77.6329 66.1227 85.5117 56.8449 89.6351 44.3272C91.1078 39.8356 91.4023 37.3321 91.4023 30.4842C91.4023 25.9189 91.1078 22.0164 90.7396 21.7955C90.3715 21.5746 90.1506 25.2562 90.1506 30.0424C90.1506 37.3321 89.856 39.5411 88.3097 44.2536C86.7634 48.9661 82.1245 57.5812 80.431 58.9066C80.2101 59.1275 78.4429 60.8947 76.6021 62.9564C74.7612 64.9445 72.994 66.7117 72.6995 66.7117C72.405 66.7854 70.4169 68.0371 68.2079 69.4362C66.0725 70.8352 62.0963 72.5288 59.4455 73.2651C56.7211 74.0014 54.4385 74.8114 54.2912 75.0323C54.1439 75.2532 50.4623 75.4005 46.1915 75.4005C39.8591 75.2532 37.2083 74.885 32.2749 73.2651C18.1373 68.5526 8.12317 58.5385 3.33701 44.18C1.56981 38.8784 1.27528 36.8167 1.34891 30.5578C1.42254 22.4582 3.55791 14.5058 7.0923 8.83603C8.12317 7.2161 8.93313 5.74344 8.93313 5.52254C8.93313 5.30164 9.7431 4.19714 10.774 3.09264C12.7621 1.03091 13.0566 5.34058e-05 11.8785 5.34058e-05C11.5103 5.34058e-05 11.1421 0.294586 11.1421 0.66275Z",
    orc: "M11.1421 0.66275C11.1421 1.10455 10.3322 2.28268 9.3013 3.38718C6.57687 6.3325 3.85244 11.4868 1.86434 17.5984C-1.59642 28.2752 -0.123754 43.2227 5.3251 52.7214C7.5341 56.4767 12.173 62.6619 13.8666 64.0609C25.5006 73.7069 34.1157 76.8731 47.3697 76.3577C56.132 76.0632 59.8137 75.1796 65.9989 72.0133C77.6329 66.1227 85.5117 56.8449 89.6351 44.3272C91.1078 39.8356 91.4023 37.3321 91.4023 30.4842C91.4023 25.9189 91.1078 22.0164 90.7396 21.7955C90.3715 21.5746 90.1506 25.2562 90.1506 30.0424C90.1506 37.3321 89.856 39.5411 88.3097 44.2536C86.7634 48.9661 82.1245 57.5812 80.431 58.9066C80.2101 59.1275 78.4429 60.8947 76.6021 62.9564C74.7612 64.9445 72.994 66.7117 72.6995 66.7117C72.405 66.7854 70.4169 68.0371 68.2079 69.4362C66.0725 70.8352 62.0963 72.5288 59.4455 73.2651C56.7211 74.0014 54.4385 74.8114 54.2912 75.0323C54.1439 75.2532 50.4623 75.4005 46.1915 75.4005C39.8591 75.2532 37.2083 74.885 32.2749 73.2651C18.1373 68.5526 8.12317 58.5385 3.33701 44.18C1.56981 38.8784 1.27528 36.8167 1.34891 30.5578C1.42254 22.4582 3.55791 14.5058 7.0923 8.83603C8.12317 7.2161 8.93313 5.74344 8.93313 5.52254C8.93313 5.30164 9.7431 4.19714 10.774 3.09264C12.7621 1.03091 13.0566 5.34058e-05 11.8785 5.34058e-05C11.5103 5.34058e-05 11.1421 0.294586 11.1421 0.66275Z",
  };
  
  return (
    <svg 
      width="92" 
      height="77" 
      viewBox="0 0 92 77" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d={iconPaths[race] || iconPaths.human} fill="#ECECEC" fillOpacity="0.7"/>
    </svg>
  );
};

const CharacterStepContent: React.FC<CharacterStepContentProps> = ({
  currentStep,
  data,
  selection,
  usedPoints,
  onSelectRace,
  onSelectSubRace,
  onSelectClass,
  onSelectOrigin,
  onUpdateStats,
  onApplyRecommended,
  onResetStats,
  onNext,
  onPrev,
  onSetName,
  onSetGender,
  isFirstStep,
  isLastStep,
}) => {
  const [infoModal, setInfoModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    imageUrl?: string;
  }>({
    isOpen: false,
    title: '',
    description: '',
    imageUrl: undefined,
  });

  const openInfoModal = (title: string, description: string, imageUrl?: string) => {
    setInfoModal({ isOpen: true, title, description, imageUrl });
  };

  const closeInfoModal = () => {
    setInfoModal({ isOpen: false, title: '', description: '', imageUrl: undefined });
  };

  const getStepTitle = (): string => {
    switch (currentStep) {
      case 'name': return '';
      case 'gender': return 'Пол';
      case 'race': return 'Раса';
      case 'subrace': return 'Подраса';
      case 'class': return 'Класс';
      case 'origin': return 'Происхождение';
      case 'spells': return 'Заклинания';
      case 'stats': return 'Характеристики';
      default: return '';
    }
  };

  const renderNameStep = () => (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-[439px] h-[210px]">
        <Image src="/create_char/name/input_name_without_placeholder.svg" alt="" fill className="object-contain pointer-events-none" unoptimized />
        <input 
          type="text" 
          placeholder="Введите имя"
          className="absolute top-25 left-18 w-[357px] h-[48px] bg-transparent text-[#FCE9CE] text-[15px] font-firenight pl-12 outline-none placeholder-[#E0D0B8]"
          onChange={(e) => onSetName?.(e.target.value)}
          defaultValue={selection.name}
        />
      </div>
    </div>
  );

  const renderGenderStep = () => (
    <div className="flex items-center justify-center">
      <div className="relative w-[439px] h-[295px]">
        <Image src="/create_char/gender/modal.svg" alt="" fill className="object-contain pointer-events-none" unoptimized />
        <button
          onClick={() => onSetGender?.('male')}
          className="absolute left-23.75 top-21.25 flex flex-col items-center gap-2 transition-all z-10"
        >
          <div className="relative w-[110px] h-[125px]">
            <img 
              src={selection.gender === 'male' ? "/create_char/gender/w_gender/_AC.svg" : "/create_char/gender/w_gender/gray_AC.svg"} 
              alt="" 
              className="absolute inset-0 w-[110px] h-[125px]" 
            />
            <img 
              src="/create_char/gender/m_gender_small.svg" 
              alt="Мужской" 
              className="absolute w-[25px] h-[40px]"
              style={{ 
                left: '50%', 
                top: '50%', 
                transform: 'translate(-50%, -50%)',
                filter: selection.gender === 'male' ? 'brightness(0) saturate(100%) invert(98%) sepia(10%) saturate(200%) hue-rotate(10deg)' : 'brightness(0) saturate(100%) invert(93%) sepia(0%) saturate(0%) hue-rotate(0deg)'
              }}
            />
          </div>
          <span className={selection.gender === 'male' ? 'text-white' : 'text-[#666]'}></span>
        </button>
        <button
          onClick={() => onSetGender?.('female')}
          className="absolute left-55.75 top-21.25 flex flex-col items-center gap-2 transition-all z-10"
        >
          <div className="relative w-[110px] h-[125px]">
            <img 
              src={selection.gender === 'female' ? "/create_char/gender/w_gender/_AC.svg" : "/create_char/gender/w_gender/gray_AC.svg"} 
              alt="" 
              className="absolute inset-0 w-[110px] h-[125px]" 
            />
            <img 
              src="/create_char/gender/w_gender/LightGray.svg" 
              alt="Женский" 
              className={`absolute w-[25px] h-[40px] ${selection.gender === 'female' ? '' : ''}`}
              style={{ 
                left: '50%', 
                top: '50%', 
                transform: 'translate(-50%, -50%)',
                filter: selection.gender === 'female' ? 'brightness(0) saturate(100%) invert(98%) sepia(10%) saturate(200%) hue-rotate(10deg)' : 'brightness(0) saturate(100%) invert(93%) sepia(0%) saturate(0%) hue-rotate(0deg)'
              }}
            />
          </div>
          <span className={selection.gender === 'female' ? 'text-white' : 'text-[#666]'}></span>
        </button>
      </div>
    </div>
  );

  const renderOptionCard = (
    id: string,
    name: string,
    description: string,
    imageUrl?: string,
    isSelected?: boolean,
    onClick?: () => void,
    onInfoClick?: () => void
  ) => (
    <div
      key={id}
      onClick={onClick}
      className={`
        relative rounded-xl overflow-hidden cursor-pointer transition-all duration-200
        hover:opacity-90
        ${isSelected ? 'ring-2 ring-[#66AAA5]' : ''}
      `}
    >
      <div className="bg-[#242424] h-[77px] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#242424] via-[#1a1a1a] to-[#242424]" />
        {imageUrl ? (
            <Image src={imageUrl} alt={name} fill className="object-contain opacity-70 relative z-10" unoptimized />
          ) : (
          <RaceIcon race={id} className="relative z-10" />
        )}
        <div
          onClick={(e) => {
            e.stopPropagation();
            onInfoClick?.();
          }}
          className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] flex items-center justify-center hover:bg-[rgba(255,255,255,0.2)] transition-colors z-20 cursor-pointer"
        >
          <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="text-white">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="1" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div className="bg-[#1a1a1a] py-3">
        <h4 className="text-white font-jost text-sm text-center font-medium">{name}</h4>
      </div>
      {isSelected && (
        <div className="absolute top-1 left-1 w-5 h-5 rounded-full bg-[#66AAA5] flex items-center justify-center z-20">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );

  const getStatIcon = (stat: keyof CharacterStats) => {
    switch (stat) {
      case 'strength':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#DDA852]">
            <path d="M4 8L8 12L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 8L16 12L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'agility':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#66AAA5]">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'constitution':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#EF4444]">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'intelligence':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#3B82F6]">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'wisdom':
        return (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#A855F7]">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            <path d="M12 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 18V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
);
      default:
        return null;
    }
  };

  const renderStatsStep = () => (
    <div className="px-4">
      <div className="bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.1)] p-4 mb-6">
        <p className="text-[#999] text-center text-sm">
          Доступно очков: <span className="text-[#FFEED5] font-firenight text-lg">{STATS_POINTS - usedPoints}</span>
        </p>
      </div>

      <div className="flex gap-3 mb-6">
        <button
          onClick={onApplyRecommended}
          className="px-4 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.2)] rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors text-white text-sm"
        >
          Рекомендованные
        </button>
        <button
          onClick={onResetStats}
          className="px-4 py-2 text-[rgba(255,255,255,0.4)] hover:text-white transition-colors text-sm"
        >
          Сброс
        </button>
      </div>

      <div className="space-y-4">
        {data.statsInfo.map((statInfo) => {
          const statKey = statInfo.icon as keyof CharacterStats;
          const value = selection.stats[statKey];
          const modifier = Math.floor((value - 10) / 2);
          const canDecrease = value > STATS_MIN && usedPoints > 0;
          const canIncrease = value < STATS_MAX && usedPoints < STATS_POINTS;

          return (
            <div
              key={statKey}
              className="flex items-center justify-between py-2 border-b border-[rgba(255,255,255,0.05)]"
            >
              <div className="flex items-center gap-3">
                {getStatIcon(statKey)}
                <span className="text-white text-sm">{statInfo.name}</span>
                <span className="text-[#666] text-xs">({statInfo.shortName})</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateStats(statKey, value - 1)}
                  disabled={!canDecrease}
                  className={`
                    w-7 h-7 rounded-lg flex items-center justify-center transition-colors
                    ${canDecrease ? 'bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] text-white' : 'bg-transparent text-[#333] cursor-not-allowed'}
                  `}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12H19" />
                  </svg>
                </button>

                <div className="flex items-center gap-1 w-16 justify-center">
                  <span className="text-white font-firenight text-lg w-8 text-center">{value}</span>
                  <span className={`text-sm w-6 ${modifier >= 0 ? 'text-[#66AAA5]' : 'text-[#EF4444]'}`}>
                    {modifier >= 0 ? `+${modifier}` : modifier}
                  </span>
                </div>

                <button
                  onClick={() => onUpdateStats(statKey, value + 1)}
                  disabled={!canIncrease}
                  className={`
                    w-7 h-7 rounded-lg flex items-center justify-center transition-colors
                    ${canIncrease ? 'bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.2)] text-white' : 'bg-transparent text-[#333] cursor-not-allowed'}
                  `}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5V19M5 12H19" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentStep) {
      case 'name':
        return renderNameStep();
      case 'gender':
        return renderGenderStep();
      case 'race':
        return (
          <div className="flex items-center justify-center w-full h-full">
            <Image src="/create_char/race/background.svg" alt="" width={800} height={500} className="w-[800px] h-[500px] pointer-events-none" unoptimized />
          </div>
        );

      case 'subrace':
        if (!selection.race) {
          return (
            <div className="bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.1)] p-8 text-center mx-4">
              <p className="text-[#666]">Сначала выберите расу</p>
            </div>
          );
        }
        const availableSubRaces = data.subRaces.filter(
          (s) => s.raceId === selection.race?.id
        );
        if (availableSubRaces.length === 0) {
          return (
            <div className="bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.1)] p-8 text-center mx-4">
              <p className="text-[#666]">Нет доступных подрас</p>
            </div>
          );
        }
        return (
          <div className="grid grid-cols-3 gap-3 px-4">
            {availableSubRaces.map((subRace) =>
              renderOptionCard(
                subRace.id,
                subRace.name,
                subRace.description,
                subRace.imageUrl,
                selection.subRace?.id === subRace.id,
                () => onSelectSubRace(subRace.id),
                () => openInfoModal(subRace.name, subRace.description, subRace.imageUrl)
              )
            )}
          </div>
        );

      case 'class':
        return (
          <div className="grid grid-cols-3 gap-3 px-4">
            {data.classes.map((charClass) =>
              renderOptionCard(
                charClass.id,
                charClass.name,
                charClass.description,
                charClass.imageUrl,
                selection.characterClass?.id === charClass.id,
                () => onSelectClass(charClass.id),
                () => openInfoModal(charClass.name, charClass.description, charClass.imageUrl)
              )
            )}
          </div>
        );

      case 'origin':
        return (
          <div className="grid grid-cols-3 gap-3 px-4">
            {data.origins.map((origin) =>
              renderOptionCard(
                origin.id,
                origin.name,
                `${origin.description}\n\n${origin.bonus}`,
                origin.imageUrl,
                selection.origin?.id === origin.id,
                () => onSelectOrigin(origin.id),
                () => openInfoModal(origin.name, `${origin.description}\n\n${origin.bonus}`, origin.imageUrl)
              )
            )}
          </div>
        );

      case 'stats':
        return renderStatsStep();

      default:
        return null;
    }
  };

  return (
    <>
      {currentStep !== 'name' && (
        <div className="text-center mb-6">
          <h2 className="text-3xl font-firenight text-[#FFEED5]">
            {getStepTitle()}
          </h2>
        </div>
      )}

      {renderContent()}

      <CharacterInfoModal
        isOpen={infoModal.isOpen}
        onClose={closeInfoModal}
        title={infoModal.title}
        description={infoModal.description}
        imageUrl={infoModal.imageUrl}
      />
    </>
  );
};

export default CharacterStepContent;