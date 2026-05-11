'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import CharacterMenu from '@/components/sections/game/character/CharacterMenu';
import ClassIconInline from './ClassIconInline';
import HeroBlock from '@/app/(game)/game/character/sections/HeroBlock';
import { StepId, CharacterSelection, CharacterStats, BackgroundOption } from '@/types/character';

interface CharacterOriginStepMobileProps {
  selection: CharacterSelection;
  totalStats?: CharacterStats | null;
  primaryStat?: string;
  backgroundOptions?: BackgroundOption[];
  onRandomize?: () => void;
  selectedOrigin?: string;
  onSelectOrigin?: (originId: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: StepId;
  onStepChange: (step: StepId) => void;
}

const ORIGIN_ASSET = '/create_char/origin/mobile-origin';
const RACE_ASSET = '/create_char/race/mobile-race';
const BOX_ICON = `${ORIGIN_ASSET}/_Bonus Box.svg`;

const INNER_ICON_BY_INDEX: Record<string, string> = {
  acolyte:    `${ORIGIN_ASSET}/послушник_inner.svg`,
  aristocrat: `${ORIGIN_ASSET}/аристократ_inner.svg`,
  soldier:    `${ORIGIN_ASSET}/солдат_inner.svg`,
  artist:     `${ORIGIN_ASSET}/артист_inner.svg`,
  entertainer:`${ORIGIN_ASSET}/артист_inner.svg`,
  craftsman:  `${ORIGIN_ASSET}/ремесленник_inner.svg`,
  guild:      `${ORIGIN_ASSET}/ремесленник_inner.svg`,
  charlatan:  `${ORIGIN_ASSET}/шарлатан_inner.svg`,
  wanderer:   `${ORIGIN_ASSET}/скиталец_inner.svg`,
  outlander:  `${ORIGIN_ASSET}/скиталец_inner.svg`,
  'folk-hero':`${ORIGIN_ASSET}/народный герой_inner.svg`,
  sage:       `${ORIGIN_ASSET}/мудрец_inner.svg`,
  criminal:   `${ORIGIN_ASSET}/преступник_inner.svg`,
  novice:     `${ORIGIN_ASSET}/послушник_inner.svg`,
  vagrant:    `${ORIGIN_ASSET}/бродяга_inner.svg`,
  hermit:     `${ORIGIN_ASSET}/бродяга_inner.svg`,
};

const getOriginInnerIcon = (option: BackgroundOption): string =>
  INNER_ICON_BY_INDEX[option.index] ?? `${ORIGIN_ASSET}/мудрец_inner.svg`;

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

const CharacterOriginStepMobile: React.FC<CharacterOriginStepMobileProps> = ({
  selection,
  totalStats,
  primaryStat,
  backgroundOptions = [],
  onRandomize,
  selectedOrigin: controlledSelectedOrigin,
  onSelectOrigin,
  onNext,
  onPrev,
  currentStep,
  onStepChange,
}) => {
  const [internalSelected, setInternalSelected] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [thumbTop, setThumbTop] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const THUMB_HEIGHT = 39;
  const SCROLL_AREA_HEIGHT = 210;
  const selected = controlledSelectedOrigin ?? internalSelected;

  const handleSelect = (id: string) => {
    if (onSelectOrigin) onSelectOrigin(id);
    else setInternalSelected(id);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLabel = stepLabels[currentStep] || 'Этап';

  const handleSelectStep = (step: StepId) => {
    onStepChange(step);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden flex flex-col items-center w-full pb-8 pt-2.5 bg-[#020106]">
      <div className="md:hidden flex flex-col items-center w-full gap-4 pt-2.5 bg-[#020106]">
      {/* Step dropdown — "Происхождение" */}
      <div className="relative w-75" ref={dropdownRef}>
        <button
          type="button"
          aria-label="Выбрать этап"
          className="relative w-full h-9.25 flex items-center justify-between px-3 border border-white/10 rounded-md cursor-pointer transition-colors hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className=" font-jost h-4.75 text-[15px] leading-none text-[#FCE9CE]">{currentLabel}</span>
          <Image
            src="/create_char/race/mobile-race/Polygon 1.svg"
            alt=""
          width={8}
          height={5}
          className="block"
          unoptimized
        />
        </button>

        {/* Dropdown menu */}
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
      <div className="relative w-75 h-[409px] rounded-[20px] overflow-hidden"
        style={{ background: 'linear-gradient(131.16deg, #121212 20.42%, #272727 47.31%, #121212 71.29%)' }}
      >
        {/* Border frame */}
        <svg xmlns="http://www.w3.org/2000/svg" width="291" height="409" viewBox="0 0 291 409" fill="none" className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M283.299 2.24031C283.366 2.838 283.494 3.83413 283.666 5.02951L273.537 5.02951C276.594 3.23645 280.669 1.35485 283.276 2.24031M286.273 7.79658C286.58 10.2316 287.509 16.4298 289.068 17.4924L289.068 21.2335C287.225 19.8167 285.771 13.1315 284.88 7.79658L286.273 7.79658ZM286.273 400.72L284.932 400.72C285.824 395.43 287.255 388.966 289.068 387.571L289.068 391.025C287.509 392.087 286.58 398.285 286.273 400.72M283.276 406.565C280.504 407.494 276.129 405.369 273.028 403.488L283.681 403.488C283.494 404.816 283.351 405.9 283.276 406.565M0.913989 391.069L0.913989 385.513C2.24751 392.707 4.79469 397.931 6.46534 400.72L3.74585 400.72C3.43869 398.285 2.50972 392.087 0.943955 391.025M3.74586 7.79657L6.46535 7.79657C4.7947 10.5415 2.24752 15.81 0.936468 23.0265L0.936468 17.4924C2.50223 16.4298 3.43121 10.2316 3.73837 7.79657M6.89238 9.65607C7.4093 8.77061 7.82884 8.15076 8.09105 7.79657L279.291 7.79658C276.443 8.96631 273.573 9.58747 270.698 9.65607L6.89238 9.65607ZM281.898 400.72C278.184 398.871 274.427 397.872 270.66 397.732L6.25558 397.732C4.25529 394.08 1.49834 387.549 0.936464 378.96L0.936468 29.5568C1.47587 20.9678 4.26279 14.4376 6.26307 10.7629L270.72 10.7629C274.486 10.6316 278.244 9.63985 281.958 7.79658L284.138 7.79658C285.097 13.7734 286.82 22.0747 289.165 23.5135L289.165 385.291C286.857 386.708 285.149 394.766 284.183 400.787L281.898 400.72ZM8.08355 400.72C7.82883 400.344 7.4093 399.724 6.88488 398.839L270.683 398.839C273.558 398.916 276.428 399.544 279.276 400.72L8.08355 400.72ZM270.039 5.02951L3.05662 5.0295L2.99669 6.00352C2.73448 8.46067 1.77554 14.8581 0.509441 14.8581L4.70009e-06 14.8581L1.83204e-07 393.637L0.471978 393.637C1.73808 393.637 2.71949 400.034 2.95922 402.491L3.05662 403.465L269.642 403.465C271.552 404.904 279.441 410.394 283.629 408.667L283.861 408.667L283.928 408.003C283.928 408.003 284.145 406.1 284.528 403.576L286.985 403.576L287.09 402.602C287.344 400.123 288.296 393.747 289.577 393.747L290.041 393.747L290.041 14.9688L289.577 14.9688C288.303 14.9688 287.329 8.54923 287.09 6.11421L286.985 5.1402L284.483 5.1402C284.131 2.74945 283.936 1.04494 283.928 1.00067L283.861 0.336567L283.629 0.336567C279.673 -1.30154 272.473 3.47997 270.039 5.22876" fill="#595959"/>
        </svg>
        
        {/* Content */}
        <div className="relative p-4 pt-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-firenight text-[22px] text-[#FFEED5] leading-6 font-normal font-firenight pb-4 pl-2">ПРОИСХОЖДЕНИЕ</h2>
          <button
            type="button"
            onClick={onRandomize}
            aria-label="Случайное происхождение"
            className="relative w-8.75 h-8.75 flex items-center justify-center  bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mr-2 mb-5"
          >
            <Image
                src="/create_char/random.svg"
                alt="Случайное происхождение"
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

        {/* Origin cards grid — scrollable */}
        <div
          ref={scrollRef}
          className="no-scrollbar overflow-y-auto"
          style={{ height: `${SCROLL_AREA_HEIGHT}px` }}
        >
          {backgroundOptions.length === 0 ? (
            <div className="flex items-center justify-center py-8 text-[#ECECEC]/70 font-jost text-[12px]">
              Загрузка происхождений…
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1 pr-6">
              {backgroundOptions.map((option) => {
                const isSelected = selected === option.id;
                const innerIcon = getOriginInnerIcon(option);

                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleSelect(option.id)}
                    aria-label={option.name}
                    className="flex flex-col items-center gap-1 p-1 cursor-pointer transition-transform hover:scale-105"
                  >
                    <div className="relative w-17.5 h-14.5">
                      {isSelected ? (
                        <ClassIconInline
                          src={BOX_ICON}
                          selected
                          className="absolute inset-0 w-full h-full object-contain"
                        />
                      ) : (
                        <Image
                          src={BOX_ICON}
                          alt=""
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      )}
                      {isSelected ? (
                        <ClassIconInline
                          src={innerIcon}
                          selected
                          className="absolute w-[40px] h-[40px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                        />
                      ) : (
                        <Image
                          src={innerIcon}
                          alt=""
                          width={40}
                          height={40}
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
                          unoptimized
                        />
                      )}
                    </div>
                    <span
                      className={`font-jost text-[11px] leading-none ${
                        isSelected ? 'text-[#FCE9CE]' : 'text-[#ECECEC]/70'
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

        {/* Selected origin info */}
        <div className="flex flex-col items-center text-center mt-4 gap-1 px-3">
          <span className="font-firenight text-[20px] text-[#FFEED5]">
            {backgroundOptions.find((b) => b.id === selected)?.name ?? 'Выберите происхождение'}
          </span>
          {backgroundOptions.find((b) => b.id === selected)?.description && (
            <p className="font-jost text-[12px] leading-tight text-white/70 line-clamp-3">
              {backgroundOptions.find((b) => b.id === selected)?.description}
            </p>
          )}
        </div>

        {/* Scroll thumb */}
        <div
          className="absolute right-2 top-[100px] pointer-events-none"
          style={{ width: '4px', height: `${SCROLL_AREA_HEIGHT}px` }}
        >
          <div
            className="absolute left-0 right-0 rounded-full bg-white"
            style={{ top: `${thumbTop}px`, height: `${THUMB_HEIGHT}px` }}
          />
        </div>
      </div>
    </div>
    </div>

      {/* Hero image area — dynamic based on selection */}
      <HeroBlock race={selection.race} subRace={selection.subRace} gender={selection.gender} mobile />
      <div className="md:hidden flex flex-col items-center w-full pb-8 gap-4 pt-2.5 bg-[#020106]">
        {/* Bottom controls — back arrow + ПРОДОЛЖИТЬ */}
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

        {/* ХАРАКТЕРИСТИКИ panel */}
        <CharacterMenu
          totalStats={totalStats}
          primaryStat={primaryStat}
          traits={[...(selection.race?.traits ?? []), ...(selection.subRace?.traits ?? [])]}
        />

        {/* ОСОБЕННОСТИ section */}

      </div>
    </div>
  );
};

export default CharacterOriginStepMobile;