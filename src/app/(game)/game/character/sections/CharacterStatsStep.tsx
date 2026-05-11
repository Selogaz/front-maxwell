'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import HeroBlock from './HeroBlock';
import CharacterRightPanel from './CharacterRightPanel';
import { Race, SubRace, CharacterStats, STATS_TOTAL_MAX, STATS_POINTS, STATS_BASE, ClassSkillItem } from '@/types/character';

interface CharacterStatsStepProps {
  race?: Race | null;
  subRace?: SubRace | null;
  gender?: 'male' | 'female' | null;
  totalStats?: CharacterStats | null;
  primaryStat?: string;
  onPrimaryStatChange?: (stat: string) => void;
  stats: CharacterStats;
  raceBonuses: Record<string, number>;
  onUpdateStats: (stat: keyof CharacterStats, value: number) => void;
  onResetStats: () => void;
  onRandomizeStats: () => void;
  classSkills?: { choose: number; from: ClassSkillItem[] } | null;
  selectedSkills?: string[];
  onSelectSkills?: (skillRefs: string[]) => void;
}

const STATS = [
  { id: 'str', label: 'Сила',      icon: '/create_char/race/mobile-race/LightGray.svg',       iconW: 15, iconH: 21 },
  { id: 'dex', label: 'Ловкость',  icon: '/create_char/race/mobile-race/LightGray-1.svg',     iconW: 24, iconH: 23 },
  { id: 'int', label: 'Интеллект', icon: '/create_char/race/mobile-race/LightGray-2.svg',     iconW: 14, iconH: 13 },
  { id: 'wis', label: 'Мудрость',  icon: '/create_char/race/mobile-race/Group 1321316321.svg', iconW: 20, iconH: 16 },
  { id: 'cha', label: 'Харизма',   icon: '/create_char/race/mobile-race/Group 1321316320.svg', iconW: 13, iconH: 15 },
] as const;

const keyMap: Record<string, keyof CharacterStats> = {
  str: 'strength', dex: 'agility', int: 'intelligence', wis: 'wisdom', cha: 'charisma',
};


const CharacterStatsStep: React.FC<CharacterStatsStepProps> = ({
  race, subRace, gender, totalStats, primaryStat, onPrimaryStatChange,
  stats, raceBonuses, onUpdateStats, onResetStats, onRandomizeStats,
  classSkills, selectedSkills = [], onSelectSkills,
}) => {
  const [activeStat, setActiveStat] = React.useState<string>(primaryStat ?? 'str');

  const usedPoints = useMemo(() => {
    return Object.values(stats).reduce((sum, v) => sum + v, 0) - STATS_BASE * 6;
  }, [stats]);

  const remainingPoints = STATS_POINTS - usedPoints;

  const getDisplayValue = (statId: string): number => {
    const statKey = keyMap[statId];
    if (!statKey) return 0;
    return Math.min(stats[statKey] + (raceBonuses[statId] ?? 0), STATS_TOTAL_MAX);
  };

  const handleIncrement = (statId: string) => {
    const statKey = keyMap[statId];
    if (!statKey) return;
    const currentBase = stats[statKey];
    onUpdateStats(statKey, currentBase + 1);
  };

  const handleDecrement = (statId: string) => {
    const statKey = keyMap[statId];
    if (!statKey) return;
    const currentBase = stats[statKey];
    if (currentBase <= 0) return;
    onUpdateStats(statKey, currentBase - 1);
  };

  return (
    <>
      <Image 
        src="/create_char/race/image 8.png" 
        alt="" 
        fill
        className="object-cover pointer-events-none -z-10"
        unoptimized
      />
       
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-black" />
      </div>

      <div
        className="absolute left-[100px] top-128 -translate-y-1/2"
        style={{ width: '421px', height: '722px' }}
      >
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none"
          style={{ background: 'linear-gradient(131.16deg, #121212 20.42%, #272727 47.31%, #121212 71.29%)' }}
        />

        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <svg
            viewBox="0 0 421 722"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
          >
            <g transform="translate(2.5, 6.5)">
              <path
                d="M413.721 692.073C413.113 692.237 412.1 692.549 410.884 692.97V668.226C412.708 675.693 414.622 685.649 413.721 692.018M408.07 699.339C405.593 700.089 399.289 702.358 398.208 706.165H394.403C395.844 701.663 402.644 698.112 408.07 695.934V699.339ZM8.42122 699.339V696.062C13.8024 698.24 20.3769 701.736 21.7954 706.165H18.283C17.2022 702.358 10.8979 700.089 8.42122 699.339ZM2.47714 692.018C1.5315 685.246 3.69298 674.558 5.60679 666.981V693.006C4.25586 692.549 3.15261 692.201 2.47714 692.018ZM18.2379 2.23279H23.8893C16.5718 5.49046 11.2582 11.713 8.42122 15.7942V9.15077C10.8979 8.40041 17.2022 6.13102 18.283 2.30599M408.07 9.15077V15.7942C405.278 11.713 399.919 5.49046 392.579 2.28769H398.208C399.289 6.11271 405.593 8.38211 408.07 9.13247M406.179 16.8374C407.079 18.1002 407.71 19.1251 408.07 19.7657V682.281C406.88 675.325 406.248 668.313 406.179 661.29V16.8374ZM8.42122 688.65C10.3024 679.577 11.3186 670.399 11.4608 661.198V15.2818C15.1758 10.3953 21.8179 3.66031 30.5539 2.28769H385.937C394.673 3.6054 401.315 10.4136 405.053 15.3001V661.344C405.186 670.545 406.195 679.723 408.07 688.797V694.123C401.991 696.465 393.548 700.675 392.084 706.403H24.1145C22.6735 700.766 14.4779 696.593 8.35367 694.232L8.42122 688.65ZM8.42122 19.7474C8.80398 19.1251 9.43441 18.1002 10.335 16.8191V661.253C10.2569 668.277 9.61762 675.289 8.42122 682.245V19.7474ZM410.884 659.679V7.46703L409.894 7.32062C407.395 6.68006 400.888 4.33747 400.888 1.2445V0H15.6262V1.153C15.6262 4.24596 9.11919 6.64346 6.61998 7.22911L5.6293 7.46703V658.709C4.1658 663.376 -1.41802 682.648 0.338179 692.878V693.445L1.01364 693.61C1.01364 693.61 2.94997 694.141 5.51673 695.074V701.077L6.50741 701.333C9.02913 701.956 15.5136 704.28 15.5136 707.409V708.544H400.775V707.409C400.775 704.298 407.304 701.919 409.781 701.333L410.772 701.077V694.964C413.203 694.104 414.937 693.628 414.982 693.61L415.658 693.445V692.878C417.324 683.215 412.46 665.627 410.682 659.679"
                fill="white"
              />
            </g>
          </svg>
        </div>

        <div className="absolute left-13.25 top-6 text-center text-[#FFEED5] text-3xl font-normal font-firenight leading-10 pointer-events-none">
          ХАРАКТЕРИСТИКИ
        </div>

        <button
          onClick={onRandomizeStats}
          className="absolute right-12 top-6 z-30 w-8.75 h-8.75 transition-all hover:opacity-80 cursor-pointer border-0 bg-transparent p-0"
        >
          <Image
            src="/create_char/random_background.svg"
            alt=""
            fill
            className="object-contain pointer-events-none"
            unoptimized
          />
          <Image
            src="/create_char/random.svg"
            alt="Случайные характеристики"
            width={32}
            height={29}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            unoptimized
          />
        </button>

        <div
          className="absolute left-10 top-18 h-px pointer-events-none"
          style={{
            width: 'calc(100% - 80px)',
            background: 'linear-gradient(90deg, rgba(116, 116, 116, 0.00) 0%, #A7A7A7 50.02%, rgba(218, 218, 218, 0.00) 100%)',
          }}
        />
        <div
          className="absolute left-10 top-34 h-px pointer-events-none"
          style={{
            width: 'calc(100% - 80px)',
            background: 'linear-gradient(90deg, rgba(116, 116, 116, 0.00) 0%, #A7A7A7 50.02%, rgba(218, 218, 218, 0.00) 100%)',
          }}
        />

        <div
          className="absolute left-10 top-20 flex flex-col items-center"
          style={{ width: 'calc(100% - 80px)' }}
        >
          <span className="font-jost text-[13px] text-[#ECECEC]">Очки умений</span>
          <span className="font-firenight text-[20px] text-white">+{remainingPoints}</span>
        </div>

        <div className="absolute left-5.5 top-42 flex justify-end gap-6" style={{ width: 'calc(100% - 80px)' }}>
          <span className="font-jost text-[13px] text-[#FCE9CE] w-3 text-center">+2</span>
          <span className="font-jost text-[13px] text-[#FCE9CE] w-3 text-center">+1</span>
        </div>

        <div className="absolute left-12 top-47 flex flex-col gap-3" style={{ width: 'calc(100% - 80px)' }}>
          {STATS.map((stat) => {
            const isActive = activeStat === stat.id;
            const statKey = keyMap[stat.id];
            const baseValue = statKey ? stats[statKey] : 0;
            const displayValue = getDisplayValue(stat.id);
            const value = String(displayValue).padStart(2, '0');
            const canDec = baseValue > 0;
            const canInc = remainingPoints > 0 && displayValue < STATS_TOTAL_MAX;

            return (
              <div
                key={stat.id}
                className={`grid grid-cols-[28px_1fr_155px_25px_25px] items-center gap-2 py-1.5 cursor-pointer ${
                  isActive ? 'bg-white/2' : ''
                }`}
                onClick={() => { setActiveStat(stat.id); onPrimaryStatChange?.(stat.id); }}
              >
                <span className="flex justify-center">
                  <Image
                    src={stat.icon}
                    alt={stat.label}
                    width={stat.iconW}
                    height={stat.iconH}
                    unoptimized
                  />
                </span>

                <span className="font-jost text-[13px] text-[#ECECEC] flex items-center gap-1">
                  {isActive && <span className="text-[#FCE9CE] text-[22px] leading-none">★</span>}
                  {stat.label}
                </span>

                <span className="grid grid-cols-[19px_28px_19px] items-center justify-items-center gap-1.5 mx-auto">
                  {isActive ? (
                    <button
                      type="button"
                      aria-label="Уменьшить"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDecrement(stat.id);
                      }}
                      disabled={!canDec}
                      className="relative w-4.75 h-4.75 disabled:opacity-30"
                    >
                      <Image
                        src="/create_char/characteristics/mobile-chars/minus.svg"
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
                        handleIncrement(stat.id);
                      }}
                      disabled={!canInc}
                      className="relative w-4.75 h-4.75 disabled:opacity-30"
                    >
                      <Image
                        src="/create_char/characteristics/mobile-chars/plus.svg"
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

                <span className="flex items-center justify-start -translate-x-3.5 pointer-events-none">
                  <Image
                    src={raceBonuses[stat.id] >= 2
                      ? "/create_char/characteristics/yellow_square.svg"
                      : "/create_char/characteristics/empty_square.svg"
                    }
                    alt=""
                    width={12}
                    height={12}
                    unoptimized
                  />
                </span>

                <span className="flex items-center justify-start -translate-x-3 pointer-events-none">
                  <Image
                    src={raceBonuses[stat.id] >= 1
                      ? "/create_char/characteristics/yellow_square.svg"
                      : "/create_char/characteristics/empty_square.svg"
                    }
                    alt=""
                    width={12}
                    height={12}
                    unoptimized
                  />
                </span>
              </div>
            );
          })}
        </div>

        <div 
          className="absolute opacity-20 bg-black w-8 h-60"
          style={{ left: '306px', top: '162px' }}
        />
        <div 
          className="absolute opacity-20 bg-black w-8 h-60"
          style={{ left: '342px', top: '162px' }}
        />

        <button
          onClick={onResetStats}
          className="absolute bottom-64 left-40 flex items-center justify-center"
          style={{ width: '105px', height: '30px' }}
        >
          <div className="absolute inset-0 rounded-[5px] bg-white/10 border border-white/20" />
          <span className="relative font-jost text-xs text-white/70">Очистить</span>
        </button>
        <span className="absolute left-1/2 -translate-x-1/2 top-145 text-center font-firenight text-[25px] leading-[130%] text-[#FFEED5]">
        Навыки с умением
      </span>
      <div className="absolute left-1/2 -translate-x-1/2 top-153 w-[calc(100%-80px)] text-center font-jost font-normal text-[15px] leading-none text-white">
        {!classSkills ? (
          <p className="text-[#94A3B8] text-[13px]">Сначала выберите класс</p>
        ) : classSkills.from.length === 0 ? (
          <p className="text-[#94A3B8] text-[13px]">Нет навыков для выбора</p>
        ) : (
          <>
            <p className="text-[#DDA852] text-[13px] mb-2">
              Выберите {classSkills.choose} из {classSkills.from.length}
            </p>
            <div className="flex flex-wrap justify-center gap-2 max-h-[120px] overflow-y-auto">
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
                    className={`px-2.5 py-1 rounded-[5px] text-[12px] transition-colors cursor-pointer border ${
                      isSelected
                        ? 'bg-[#66AAA5]/20 border-[#66AAA5] text-white'
                        : canSelect
                          ? 'bg-white/5 border-white/10 text-[#94A3B8] hover:bg-white/10 hover:border-white/20'
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

      <CharacterRightPanel totalStats={totalStats} primaryStat={primaryStat} traits={[...(race?.traits ?? []), ...(subRace?.traits ?? [])]} />

      <HeroBlock race={race ?? null} subRace={subRace ?? null} gender={gender ?? null} />
    </>
  );
};

export default CharacterStatsStep;
