'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import CharacterMenu from '@/components/sections/game/character/CharacterMenu';
import ClassIconInline from '@/app/(game)/game/character/sections/ClassIconInline';
import HeroBlock from '@/app/(game)/game/character/sections/HeroBlock';
import { StepId, CharacterSelection, RaceOption, CharacterStats } from '@/types/character';

interface CharacterRaceStepMobileProps {
  selection: CharacterSelection;
  raceOptions?: RaceOption[];
  totalStats?: CharacterStats | null;
  primaryStat?: string;
  onRandomize?: () => void;
  onSelectRace?: (race: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: StepId;
  onStepChange: (step: StepId) => void;
}

const ASSET = '/create_char/race/mobile-race';

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

// Fallback-иконки по slug'ам, пока бэк не присылает свои.
const ICON_BY_INDEX: Record<string, string> = {
  human:      `${ASSET}/Group 1321316371.svg`,
  elf:        `${ASSET}/Group 1321316371.svg`,
  dwarf:      `${ASSET}/Group 1321316371.svg`,
  gnome:      `${ASSET}/Group 1321316372.svg`,
  halfling:   `${ASSET}/Group 1321316372.svg`,
  dragonborn: `${ASSET}/Group 1321316372.svg`,
  tiefling:   `${ASSET}/Group 1321316376.svg`,
  orc:        `${ASSET}/Group 1321316376.svg`,
  'half-orc': `${ASSET}/Group 1321316376.svg`,
};
const DEFAULT_ICON = `${ASSET}/Group 1321316371.svg`;

const getRaceIcon = (option: RaceOption): string =>
  option.images.thumb ?? ICON_BY_INDEX[option.index] ?? DEFAULT_ICON;

const CharacterRaceStepMobile = ({
  selection,
  raceOptions = [],
  totalStats,
  primaryStat,
  onRandomize,
  onSelectRace,
  onNext,
  onPrev,
  currentStep,
  onStepChange,
}: CharacterRaceStepMobileProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [thumbTop, setThumbTop] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const SCROLL_AREA_HEIGHT = 150;
  const THUMB_HEIGHT = 39;

  const handleSelect = (id: string) => {
    if (onSelectRace) onSelectRace(id);
  };

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

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
  
    const update = () => {
      const max = el.scrollHeight - el.clientHeight;
      const ratio = max > 0 ? el.scrollTop / max : 0;
      const trackSpace = el.clientHeight - THUMB_HEIGHT;
      setThumbTop(ratio * trackSpace);
    };
  
    update();
    el.addEventListener('scroll', update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
  
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="md:hidden flex flex-col items-center w-full pb-8 pt-2.5 bg-[#020106]">
      {/* Step dropdown */}
      <div className="relative w-75 pb-4" ref={dropdownRef}>
        <button
          type="button"
          aria-label="Выбрать этап"
          className="relative w-full h-9.25 flex items-center justify-between px-3 border border-white/10 rounded-md cursor-pointer transition-colors hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-jost h-4.75 text-[15px] leading-none text-[#FCE9CE]">{currentLabel}</span>
          <Image
            src={`${ASSET}/Polygon 1.svg`}
            alt=""
            width={8}
            height={5}
            className="block"
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

      {/* РАСА section frame */}
      <div className="relative w-75 rounded-[20px] overflow-hidden"
        style={{ background: 'linear-gradient(131.16deg, #121212 20.42%, #272727 47.31%, #121212 71.29%)' }}
      >
        {/* Border frame */}
        <svg xmlns="http://www.w3.org/2000/svg" width="291" height="242" viewBox="0 0 291 242" fill="none" className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M283.299 1.32557C283.366 1.67921 283.494 2.26861 283.666 2.9759L273.537 2.9759C276.594 1.91496 280.669 0.801649 283.276 1.32557M286.273 4.61313C286.58 6.05391 287.509 9.72133 289.068 10.35L289.068 12.5636C287.225 11.7253 285.771 7.76973 284.88 4.61313L286.273 4.61313ZM286.273 237.101L284.932 237.101C285.824 233.971 287.255 230.146 289.068 229.321L289.068 231.364C287.509 231.993 286.58 235.66 286.273 237.101M283.276 240.559C280.504 241.109 276.129 239.852 273.028 238.738L283.681 238.738C283.494 239.524 283.351 240.166 283.276 240.559M0.913988 231.39L0.913988 228.103C2.24751 232.36 4.79469 235.451 6.46534 237.101L3.74585 237.101C3.43869 235.66 2.50972 231.993 0.943955 231.364M3.74586 4.61313L6.46535 4.61313C4.7947 6.23727 2.24751 9.35458 0.936466 13.6245L0.936466 10.35C2.50223 9.72132 3.4312 6.0539 3.73836 4.61313M6.89237 5.71337C7.4093 5.18945 7.82884 4.8227 8.09105 4.61313L279.291 4.61313C276.443 5.30525 273.573 5.67279 270.698 5.71337L6.89237 5.71337ZM281.898 237.101C278.184 236.007 274.427 235.416 270.66 235.333L6.25558 235.333C4.25529 233.172 1.49834 229.308 0.936464 224.226L0.936466 17.4884C1.47587 12.4064 4.26278 8.54252 6.26307 6.36827L270.72 6.36827C274.486 6.29058 278.244 5.70378 281.958 4.61313L284.138 4.61313C285.097 8.14957 286.82 13.0613 289.165 13.9127L289.165 227.972C286.857 228.81 285.149 233.578 284.183 237.14L281.898 237.101ZM8.08355 237.101C7.82883 236.878 7.4093 236.512 6.88488 235.988L270.683 235.988C273.558 236.033 276.428 236.405 279.276 237.101L8.08355 237.101ZM270.039 2.9759L3.05662 2.97589L2.99669 3.5522C2.73448 5.00607 1.77554 8.79137 0.509439 8.79137L2.78099e-06 8.79137L1.084e-07 232.91L0.471978 232.91C1.73808 232.91 2.71949 236.695 2.95922 238.149L3.05662 238.725L269.642 238.725C271.552 239.577 279.441 242.825 283.629 241.803L283.861 241.803L283.928 241.41C283.928 241.41 284.145 240.284 284.528 238.791L286.985 238.791L287.09 238.214C287.344 236.747 288.296 232.975 289.577 232.975L290.041 232.975L290.041 8.85687L289.577 8.79137C289.077 8.79137 288.577 8.79137 288.077 8.79137C287.577 8.79137 287.077 8.79137 286.577 8.79137L286.577 4.61313C287.077 4.61313 287.577 4.61313 288.077 4.61313C288.577 4.61313 289.077 4.61313 289.577 4.61313L289.577 8.79137C289.077 8.79137 288.577 8.79137 288.077 8.79137C287.577 8.79137 287.077 8.79137 286.577 8.79137L286.577 4.61313C287.077 4.61313 287.577 4.61313 288.077 4.61313C288.577 4.61313 289.077 4.61313 289.577 4.61313L289.577 8.79137C289.077 8.79137 288.577 8.79137 288.077 8.79137C287.577 8.79137 287.077 8.79137 286.577 8.79137L286.577 4.61313C287.077 4.61313 287.577 4.61313 288.077 4.61313C288.577 4.61313 289.077 4.61313 289.577 4.61313L289.577 8.79137z" fill="#595959" />
        </svg>

        {/* Content */}
        <div className="relative p-4 pt-5">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-firenight text-[22px] text-[#FFEED5] leading-6 font-normal pb-4 pl-2">РАСА</h2>
            <button
              type="button"
              onClick={onRandomize}
              aria-label="Случайная раса"
              className="relative w-8.75 h-8.75 flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mr-2 mb-5"
            >
              <Image
                src="/create_char/random.svg"
                alt="Случайная раса"
                width={32}
                height={29}
                className=""
                unoptimized
              />
            </button>
          </div>

          <div 
            className="absolute left-1/2 -translate-x-1/2 top-[58px] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, rgba(116, 116, 116, 0.00) 0%, #A7A7A7 50.02%, rgba(218, 218, 218, 0.00) 100%)',
              width: '254.214px',
              height: '1px',
            }}
          />

          {/* Scrollable container with ref */}
          <div
            ref={scrollRef}
            className="overflow-y-auto"
            style={{ height: `${SCROLL_AREA_HEIGHT}px` }}
          >
            {raceOptions.length === 0 ? (
              <div className="flex items-center justify-center h-full text-[#ECECEC] font-jost text-[12px]">
                Загрузка рас…
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2 pr-6">
                {raceOptions.map((option) => {
                  const isSelected = selection.race?.id === option.id;
                  const icon = getRaceIcon(option);

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => handleSelect(option.id)}
                      aria-label={option.name}
                      className="flex flex-col items-center gap-1 p-1 cursor-pointer transition-transform hover:scale-105"
                    >
                      {isSelected ? (
                        <ClassIconInline src={icon} selected className="block w-14 h-12" />
                      ) : (
                        <Image
                          src={icon}
                          alt=""
                          width={56}
                          height={48}
                          className="w-14 h-12"
                          unoptimized
                        />
                      )}
                      <span
                        className={`font-jost text-[10px] leading-none text-center ${
                          isSelected ? 'text-[#FFEED5]' : 'text-[#ECECEC]/70'
                        }`}
                      >
                        {option.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Dynamic scroll thumb (4x39) */}
          <div 
            className="absolute right-2 top-[100px] pointer-events-none"
            style={{
              width: '4px',
              height: `${SCROLL_AREA_HEIGHT}px`,
            }}
          >
            <div
              className="absolute left-0 right-0 rounded-full bg-white"
              style={{ 
                top: `${thumbTop}px`, 
                height: `${THUMB_HEIGHT}px` 
              }}
            />
          </div>
        </div>
      </div>

      {/* Hero image area */}
      <HeroBlock race={selection.race} subRace={selection.subRace} gender={selection.gender} mobile />

      <div className="md:hidden flex flex-col items-center w-full pb-8 gap-4 pt-2.5 bg-[#020106]">
        {/* Bottom controls */}
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
        />
      </div>
    </div>
  );
};

export default CharacterRaceStepMobile;
