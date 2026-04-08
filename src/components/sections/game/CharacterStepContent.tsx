'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import CharacterInfoModal from './CharacterInfoModal';
import {
  StepId,
  CharacterData,
  CharacterSelection,
  CharacterStats,
  CharacterStatsInfo,
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
  onSelectSubClass: (id: string) => void;
  onSelectOrigin: (id: string) => void;
  onUpdateStats: (stat: keyof CharacterStats, value: number) => void;
  onApplyRecommended: () => void;
  onResetStats: () => void;
  onNext: () => void;
  onPrev: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const CharacterStepContent: React.FC<CharacterStepContentProps> = ({
  currentStep,
  data,
  selection,
  usedPoints,
  onSelectRace,
  onSelectSubRace,
  onSelectClass,
  onSelectSubClass,
  onSelectOrigin,
  onUpdateStats,
  onApplyRecommended,
  onResetStats,
  onNext,
  onPrev,
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
      case 'race': return 'Выберите расу';
      case 'subrace': return 'Выберите подрасу';
      case 'class': return 'Выберите класс';
      case 'subclass': return 'Выберите подкласс';
      case 'origin': return 'Выберите происхождение';
      case 'stats': return 'Распределите характеристики';
      default: return '';
    }
  };

  const getStepDescription = (): string => {
    switch (currentStep) {
      case 'race': return 'Раса определяет базовые характеристики и способности вашего персонажа.';
      case 'subrace': return 'Подраса добавляет уникальные черты к выбранной расе.';
      case 'class': return 'Класс определяет боевой стиль и магические способности.';
      case 'subclass': return 'Подкласс углубляет специализацию вашего персонажа.';
      case 'origin': return 'Происхождение влияет на историю и бонусные черты.';
      case 'stats': return 'Распределите очки между характеристиками персонажа. У вас есть 27 очков для распределения.';
      default: return '';
    }
  };

  const getStatIcon = (stat: keyof CharacterStats) => {
    switch (stat) {
      case 'strength':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#DDA852]">
            <path d="M4 8L8 12L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 8L16 12L12 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'agility':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#66AAA5]">
            <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'constitution':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#EF4444]">
            <path d="M20.84 4.61C20.3292 4.09924 19.7228 3.69398 19.0554 3.41708C18.3879 3.14019 17.6725 2.99756 16.95 2.99756C16.2275 2.99756 15.5121 3.14019 14.8446 3.41708C14.1772 3.69398 13.5708 4.09924 13.06 4.61L12 5.67L10.94 4.61C9.9083 3.57831 8.50903 2.99771 7.05 2.99771C5.59096 2.99771 4.19169 3.57831 3.16 4.61C2.1283 5.64169 1.54771 7.04097 1.54771 8.5C1.54771 9.95903 2.1283 11.3583 3.16 12.39L4.22 13.45L12 21.23L19.78 13.45L20.84 12.39C21.3508 11.8792 21.756 11.2728 22.0329 10.6054C22.3098 9.93791 22.4524 9.22249 22.4524 8.5C22.4524 7.77751 22.3098 7.0621 22.0329 6.39464C21.756 5.72718 21.3508 5.12075 20.84 4.61Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        );
      case 'intelligence':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#3B82F6]">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'wisdom':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#A855F7]">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
            <path d="M12 3V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M12 18V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M3 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M18 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        );
      case 'charisma':
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#EC4899]">
            <path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        );
      default:
        return null;
    }
  };

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
        relative bg-[#0F172A] rounded-xl border-2 overflow-hidden transition-all duration-200 cursor-pointer
        hover:border-[#66AAA5]/50 hover:shadow-[0_0_20px_rgba(102,170,165,0.2)]
        ${isSelected ? 'border-[#66AAA5] shadow-[0_0_20px_rgba(102,170,165,0.3)]' : 'border-[#475569]'}
      `}
    >
      <div className="bg-[#1E293B] h-32 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#334155]">
            <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M8 40C8 32 15 26 24 26C33 26 40 32 40 40" stroke="currentColor" strokeWidth="2" />
          </svg>
        )}
      </div>
      <div className="p-3">
        <h4 className="text-white font-semibold text-center mb-1">{name}</h4>
      </div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onInfoClick?.();
        }}
        className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#334155]/80 hover:bg-[#475569] flex items-center justify-center transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="16" r="1" fill="currentColor" />
        </svg>
      </div>
      {isSelected && (
        <div className="absolute top-2 left-2 w-6 h-6 rounded-full bg-[#66AAA5] flex items-center justify-center">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}
    </div>
  );

  const renderStatsStep = () => (
    <div>
      <div className="bg-[#0F172A] rounded-xl border border-[#475569] p-4 mb-6">
        <p className="text-[#94A3B8] text-center">
          У вас есть <span className="text-[#DDA852] font-bold">{STATS_POINTS - usedPoints}</span> очков для распределения.
          Нажмите &quot;Рекомендованные характеристики&quot; для автоматической настройки.
        </p>
      </div>

      <div className="flex gap-3 mb-6">
        <Button variant="secondary" size="sm" onClick={onApplyRecommended}>
          Рекомендованные
        </Button>
        <Button variant="ghost" size="sm" onClick={onResetStats}>
          Сброс
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {data.statsInfo.map((statInfo) => {
          const statKey = statInfo.icon as keyof CharacterStats;
          const value = selection.stats[statKey];
          const modifier = Math.floor((value - 10) / 2);
          const canDecrease = value > STATS_MIN && usedPoints > 0;
          const canIncrease = value < STATS_MAX && usedPoints < STATS_POINTS;

          return (
            <div
              key={statKey}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onUpdateStats(statKey, value - 1)}
                    disabled={!canDecrease}
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                      ${canDecrease ? 'bg-[#334155] hover:bg-[#475569] text-white' : 'bg-[#334155]/50 text-[#64748B] cursor-not-allowed'}
                    `}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12H19" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-1 w-14 justify-center">
                    <span className="text-lg font-bold text-white w-6 text-right">{value}</span>
                    <span className={`text-sm w-6 ${modifier >= 0 ? 'text-[#337360]' : 'text-[#EF4444]'}`}>
                      {modifier >= 0 ? `+${modifier}` : modifier}
                    </span>
                  </div>

                  <button
                    onClick={() => onUpdateStats(statKey, value + 1)}
                    disabled={!canIncrease}
                    className={`
                      w-8 h-8 rounded-lg flex items-center justify-center transition-colors
                      ${canIncrease ? 'bg-[#334155] hover:bg-[#475569] text-white' : 'bg-[#334155]/50 text-[#64748B] cursor-not-allowed'}
                    `}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5V19M5 12H19" />
                    </svg>
                  </button>
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{statInfo.name}</span>
                    <button
                      className="relative group"
                      onMouseEnter={() => {}}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-[#94A3B8] hover:text-white transition-colors">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                        <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <circle cx="12" cy="16" r="1" fill="currentColor" />
                      </svg>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[#1E293B] border border-[#475569] rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        <p className="text-sm text-[#94A3B8]">{statInfo.description}</p>
                      </div>
                    </button>
                  </div>
                  <span className="text-xs text-[#64748B]">{statInfo.shortName}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentStep) {
      case 'race':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {data.races.map((race) =>
              renderOptionCard(
                race.id,
                race.name,
                race.description,
                race.imageUrl,
                selection.race?.id === race.id,
                () => onSelectRace(race.id),
                () => openInfoModal(race.name, race.description, race.imageUrl)
              )
            )}
          </div>
        );

      case 'subrace':
        if (!selection.race) {
          return (
            <div className="bg-[#0F172A] rounded-xl border border-[#475569] p-8 text-center">
              <p className="text-[#94A3B8]">Сначала выберите расу</p>
            </div>
          );
        }
        const availableSubRaces = data.subRaces.filter(
          (s) => s.raceId === selection.race?.id
        );
        if (availableSubRaces.length === 0) {
          return (
            <div className="bg-[#0F172A] rounded-xl border border-[#475569] p-8 text-center">
              <p className="text-[#94A3B8]">Нет доступных подрас для выбранной расы</p>
            </div>
          );
        }
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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

      case 'subclass':
        if (!selection.characterClass) {
          return (
            <div className="bg-[#0F172A] rounded-xl border border-[#475569] p-8 text-center">
              <p className="text-[#94A3B8]">Сначала выберите класс</p>
            </div>
          );
        }
        const availableSubClasses = data.subClasses.filter(
          (s) => s.classId === selection.characterClass?.id
        );
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {availableSubClasses.map((subClass) =>
              renderOptionCard(
                subClass.id,
                subClass.name,
                subClass.description,
                subClass.imageUrl,
                selection.subClass?.id === subClass.id,
                () => onSelectSubClass(subClass.id),
                () => openInfoModal(subClass.name, subClass.description, subClass.imageUrl)
              )
            )}
          </div>
        );

      case 'origin':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
      <div className="text-center mb-8">
        <h2 className="text-3xl font-firenight font-bold text-white mb-2">
          {getStepTitle()}
        </h2>
        <p className="text-[#94A3B8]">
          {getStepDescription()}
        </p>
      </div>

      {renderContent()}

      <div className="flex justify-between mt-8">
        <Button
          variant="secondary"
          onClick={onPrev}
          disabled={isFirstStep}
        >
          Назад
        </Button>
        <Button variant="primary" onClick={onNext}>
          {isLastStep ? 'Завершить' : 'Далее'}
        </Button>
      </div>

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
