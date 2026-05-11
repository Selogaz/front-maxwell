'use client';

import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import CharacterMenu from '@/components/sections/game/character/CharacterMenu';
import HeroBlock from '@/app/(game)/game/character/sections/HeroBlock';
import { StepId, CharacterSelection, CharacterStats, STATS_TOTAL_MAX, STATS_POINTS, STATS_BASE, ClassSkillItem } from '@/types/character';

const RACE_ASSET = '/create_char/race/mobile-race';
const CHARS_ASSET = '/create_char/characteristics/mobile-chars';

const stepLabels: Record<string, string> = {
  name: 'Имя',
  gender: 'Пол',
  race: 'Раса',
  subrace: 'Подраса',
  class: 'Класс',
  origin: 'Происхождение',
  stats: 'Характеристики',
  spells: 'Заклинания',
};

interface CharacterStatsStepMobileProps {
  selection: CharacterSelection;
  totalStats?: CharacterStats | null;
  primaryStat?: string;
  onPrimaryStatChange?: (stat: string) => void;
  stats: CharacterStats;
  raceBonuses: Record<string, number>;
  onUpdateStats: (stat: keyof CharacterStats, value: number) => void;
  onResetStats: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: StepId;
  onStepChange: (step: StepId) => void;
  classSkills?: { choose: number; from: ClassSkillItem[] } | null;
  selectedSkills?: string[];
  onSelectSkills?: (skillRefs: string[]) => void;
}

interface StatRow {
  id: string;
  label: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
}

const STATS: StatRow[] = [
  { id: 'str', label: 'Сила',      icon: `${RACE_ASSET}/LightGray-1.svg`,     iconWidth: 24, iconHeight: 23 },
  { id: 'dex', label: 'Ловкость',  icon: `${RACE_ASSET}/LightGray.svg`,       iconWidth: 15, iconHeight: 21 },
  { id: 'int', label: 'Интеллект', icon: `${RACE_ASSET}/LightGray-2.svg`,           iconWidth: 14, iconHeight: 13 },
  { id: 'wis', label: 'Мудрость',  icon: `${RACE_ASSET}/Group 1321316321.svg`, iconWidth: 20, iconHeight: 16 },
  { id: 'cha', label: 'Харизма',   icon: `${RACE_ASSET}/Group 1321316320.svg`, iconWidth: 13, iconHeight: 15 },
];

const keyMap: Record<string, keyof CharacterStats> = {
  str: 'strength', dex: 'agility', int: 'intelligence', wis: 'wisdom', cha: 'charisma',
};

interface StatsPanelProps {
  stats: CharacterStats;
  raceBonuses: Record<string, number>;
  activeStat: string;
  onSetActive: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onReset: () => void;
  classSkills?: { choose: number; from: ClassSkillItem[] } | null;
  selectedSkills?: string[];
  onSelectSkills?: (skillRefs: string[]) => void;
}

const StatsPanel: React.FC<StatsPanelProps> = ({
  stats,
  raceBonuses,
  activeStat,
  onSetActive,
  onIncrement,
  onDecrement,
  onReset,
  classSkills,
  selectedSkills = [],
  onSelectSkills,
}) => {
  const usedPoints = Object.values(stats).reduce((sum, v) => sum + v, 0) - STATS_BASE * 6;
  const remainingPoints = STATS_POINTS - usedPoints;

  return (
    <div
      className="relative w-75.25 h-132.5 rounded-[20px] overflow-hidden"
      style={{
        background: '#242424',
        backgroundImage:
          'linear-gradient(116deg, #121212 0%, #272727 52.87%, #121212 100%)',
      }}
    
    >
      <Image
        src={`/create_char/race/mobile-race/frame-border.svg`}
        alt=""
        width={288}
        height={518}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        unoptimized
      />
      <div className="relative h-full flex flex-col px-4 pt-4 pb-4 z-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="font-firenight text-[22px] text-[#FCE9CE] tracking-wide leading-none">
            ХАРАКТЕРИСТИКИ
          </h2>
        </div>
        <div 
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(116, 116, 116, 0.00) 0%, #A7A7A7 50.02%, rgba(218, 218, 218, 0.00) 100%)',
            width: '254.214px',
            height: '1px',
            top: '55px',
          }}
        />

        <div className="flex items-center justify-between pb-2 mb-2 mt-0.75">
          <span className="font-jost text-[13px] text-[#ECECEC]">Очки умений</span>
          
          <span className="font-firenight text-[20px] text-white leading-none">
            +{remainingPoints}
          </span>
        </div>
        <div 
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(116, 116, 116, 0.00) 0%, #A7A7A7 50.02%, rgba(218, 218, 218, 0.00) 100%)',
            width: '254.214px',
            height: '1px',
            top: '92px',
          }}
        />

        <div className="flex justify-end gap-2 pr-1 mb-1">
          <span className="font-jost text-[11px] text-[#FCE9CE]/70 w-3 text-center">+2</span>
          <span className="font-jost text-[11px] text-[#FCE9CE]/70 w-3 text-center">+1</span>
        </div>

        <div className="flex flex-col gap-px">
          {STATS.map((stat) => {
            const isActive = activeStat === stat.id;
            const statKey = keyMap[stat.id];
            const baseValue = statKey ? stats[statKey] : 0;
            const displayValue = statKey
              ? Math.min(stats[statKey] + (raceBonuses[stat.id] ?? 0), STATS_TOTAL_MAX)
              : 0;
            const value = String(displayValue).padStart(2, '0');
            const canDec = baseValue > 0;
            const canInc = remainingPoints > 0 && displayValue < STATS_TOTAL_MAX;

            return (
              <div
                key={stat.id}
                className={`grid grid-cols-[28px_1fr_72px_50px] items-center gap-2 py-1.5 border-b border-white/10 cursor-pointer ${
                  isActive ? 'bg-white/2' : ''
                }`}
                onClick={() => onSetActive(stat.id)}
              >
                <span className="flex justify-center">
                  <Image
                    src={stat.icon}
                    alt=""
                    width={stat.iconWidth}
                    height={stat.iconHeight}
                    unoptimized
                  />
                </span>

                <span className="font-jost text-[13px] text-[#ECECEC] flex items-center gap-1">
                  {isActive && <span className="text-[#FCE9CE] text-[12px] leading-none">★</span>}
                  {stat.label}
                </span>

                <span className="grid grid-cols-[19px_28px_19px] items-center justify-items-center gap-1.5 mx-auto">
                  {isActive ? (
                    <button
                      type="button"
                      aria-label="Уменьшить"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDecrement(stat.id);
                      }}
                      disabled={!canDec}
                      className="relative w-4.75 h-4.75 disabled:opacity-30"
                    >
                      <Image
                        src={`${CHARS_ASSET}/minus.svg`}
                        alt=""
                        width={19}
                        height={19}
                        className="block"
                        unoptimized
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-[#FCE9CE] text-[16px] leading-none font-jost pointer-events-none select-none mb-0.75">
                        −
                      </span>
                    </button>
                  ) : (
                    <span />
                  )}
                  <span className="font-firenight text-[20px] text-white text-center leading-none">
                    {value}
                  </span>
                  {isActive ? (
                    <button
                      type="button"
                      aria-label="Увеличить"
                      onClick={(e) => {
                        e.stopPropagation();
                        onIncrement(stat.id);
                      }}
                      disabled={!canInc}
                      className="relative w-4.75 h-4.75 disabled:opacity-30"
                    >
                      <Image
                        src={`${CHARS_ASSET}/plus.svg`}
                        alt=""
                        width={19}
                        height={19}
                        className="block"
                        unoptimized
                      />
                      <span className="absolute inset-0 flex items-center justify-center text-[#FCE9CE] text-[14px] leading-none font-jost pointer-events-none select-none mb-0.5">
                        +
                      </span>
                    </button>
                  ) : (
                    <span />
                  )}
                </span>

                <span className="flex items-center gap-2 pl-4">
                  <span className="pointer-events-none">
                    <Image
                      src={raceBonuses[stat.id] >= 2 ? `${CHARS_ASSET}/yellow.svg` : `${CHARS_ASSET}/empty.svg`}
                      alt=""
                      width={12}
                      height={12}
                      unoptimized
                    />
                  </span>
                  <span className="pointer-events-none">
                    <Image
                      src={raceBonuses[stat.id] >= 1 ? `${CHARS_ASSET}/yellow.svg` : `${CHARS_ASSET}/empty.svg`}
                      alt=""
                      width={12}
                      height={12}
                      unoptimized
                    />
                  </span>
                </span>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-3 mb-3">
          <button
            type="button"
            onClick={onReset}
            className="w-[105px] h-[30px] bg-white/10 border border-white/20 rounded-md hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <span className="font-jost text-xs text-white leading-[1.3] opacity-50 text-center">Очистить</span>
          </button>
        </div>

        <div className="text-center mt-auto">
          <h3 className="font-firenight text-[16px] text-[#FCE9CE] tracking-wide mb-1 leading-none">
            НАВЫКИ С УМЕНИЕМ
          </h3>
          {!classSkills ? (
            <p className="font-jost text-[11px] text-[#94A3B8] leading-snug">Сначала выберите класс</p>
          ) : classSkills.from.length === 0 ? (
            <p className="font-jost text-[11px] text-[#94A3B8] leading-snug">Нет навыков для выбора</p>
          ) : (
            <>
              <p className="font-jost text-[11px] text-[#DDA852] mb-1">
                Выберите {classSkills.choose} из {classSkills.from.length}
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 max-h-[90px] overflow-y-auto">
                {classSkills.from.map((skill) => {
                  const isSelected = selectedSkills.includes(skill.ref);
                  const canSelect = isSelected || selectedSkills.length < classSkills.choose;
                  return (
                    <button
                      key={skill.ref}
                      type="button"
                      disabled={!canSelect && !isSelected}
                      onClick={() => {
                        if (isSelected) {
                          onSelectSkills?.(selectedSkills.filter((r) => r !== skill.ref));
                        } else if (selectedSkills.length < classSkills.choose) {
                          onSelectSkills?.([...selectedSkills, skill.ref]);
                        }
                      }}
                      className={`px-2 py-0.5 rounded-[5px] text-[10px] transition-colors cursor-pointer border ${
                        isSelected
                          ? 'bg-[#66AAA5]/20 border-[#66AAA5] text-white'
                          : canSelect
                            ? 'bg-white/5 border-white/10 text-[#94A3B8] hover:bg-white/10'
                            : 'bg-white/5 border-white/10 text-[#64748B] opacity-40 cursor-not-allowed'
                      }`}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const CharacterStatsStepMobile: React.FC<CharacterStatsStepMobileProps> = ({
  selection,
  totalStats,
  primaryStat,
  onPrimaryStatChange,
  stats,
  raceBonuses,
  onUpdateStats,
  onResetStats,
  onNext,
  onPrev,
  currentStep,
  onStepChange,
  classSkills,
  selectedSkills = [],
  onSelectSkills,
}) => {
  const [activeStat, setActiveStat] = useState<string>(primaryStat ?? 'str');

  const handleIncrement = (id: string) => {
    const statKey = keyMap[id];
    if (!statKey) return;
    const currentBase = stats[statKey];
    onUpdateStats(statKey, currentBase + 1);
  };

  const handleDecrement = (id: string) => {
    const statKey = keyMap[id];
    if (!statKey) return;
    const currentBase = stats[statKey];
    if (currentBase <= 0) return;
    onUpdateStats(statKey, currentBase - 1);
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLabel = stepLabels[currentStep] || 'Этап';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectStep = (step: StepId) => {
    onStepChange(step);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden flex flex-col items-center w-full pb-8 pt-2.5 bg-[#020106]">
      <div className="md:hidden flex flex-col items-center w-full gap-4 pt-2.5 bg-[#020106] mb-5">
        <div className="relative w-75" ref={dropdownRef}>
          <button
            type="button"
            aria-label="Выбрать этап"
            className="relative w-full h-9.25 flex items-center justify-between px-3 border border-white/10 rounded-md cursor-pointer transition-colors hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="font-jost h-4.75 text-[15px] leading-none text-[#FCE9CE]">{currentLabel}</span>
            <Image
              src="/create_char/race/mobile-race/Polygon 1.svg"
              alt=""
              width={8}
              height={8}
              className="w-2 h-2"
              unoptimized
            />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 w-full mt-1 bg-[#1a1a1a] border border-white/10 rounded-md overflow-hidden z-50">
              {Object.entries(stepLabels).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  className="w-full px-3 py-2 text-left font-jost text-[15px] text-[#FCE9CE] hover:bg-white/10 transition-colors"
                  onClick={() => handleSelectStep(key as StepId)}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-[58px] pointer-events-none" style={{ background: 'linear-gradient(90deg, rgba(116, 116, 116, 0.00) 0%, #A7A7A7 50.02%, rgba(218, 218, 218, 0.00) 100%)', width: '254.214px', height: '1px' }} />
      </div>

      <StatsPanel
        stats={stats}
        raceBonuses={raceBonuses}
        activeStat={activeStat}
        onSetActive={(id) => { setActiveStat(id); onPrimaryStatChange?.(id); }}
        onIncrement={handleIncrement}
        onDecrement={handleDecrement}
        onReset={onResetStats}
        classSkills={classSkills}
        selectedSkills={selectedSkills}
        onSelectSkills={onSelectSkills}
      />

      <HeroBlock race={selection.race} subRace={selection.subRace} gender={selection.gender} mobile />

      <div className="md:hidden flex flex-col items-center w-full pb-8 gap-4 pt-2.5 bg-[#020106]">
        <div className="w-75 flex items-center gap-3 -mt-12.5">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Назад"
            className="relative w-12 h-12 transition-all hover:opacity-90 cursor-pointer border-0 bg-transparent p-0"
          >
            <Image
              src="/create_char/gender/mobile_gender/Group 1321316369.svg"
              alt="Назад"
              fill
              className="absolute bottom-10 object-contain pointer-events-none"
              unoptimized
            />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Продолжить"
            className="relative w-59.75 h-12 transition-all hover:opacity-90 cursor-pointer border-0 bg-transparent p-0"
          >
            <Image
              src="/create_char/name/mobile/continue_button.svg"
              alt="Продолжить"
              fill
              className="object-contain pointer-events-none"
              unoptimized
            />
          </button>
        </div>

        <CharacterMenu
          totalStats={totalStats}
          primaryStat={primaryStat}
          traits={[...(selection.race?.traits ?? []), ...(selection.subRace?.traits ?? [])]}
          classSkills={classSkills}
          selectedSkills={selectedSkills}
        />
      </div>
    </div>
  );
};

export default CharacterStatsStepMobile;
