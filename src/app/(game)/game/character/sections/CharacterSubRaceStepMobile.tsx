'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import CharacterMenu from '@/components/sections/game/character/CharacterMenu';
import ClassIconInline from '@/app/(game)/game/character/sections/ClassIconInline';
import HeroBlock from '@/app/(game)/game/character/sections/HeroBlock';
import { StepId, CharacterSelection, Race, SubRace, CharacterStats } from '@/types/character';

interface CharacterSubRaceStepMobileProps {
  selection: CharacterSelection;
  onRandomize?: () => void;
  selectedSubRace?: string;
  onSelectSubRace?: (subRaceId: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: StepId;
  onStepChange: (step: StepId) => void;
  filteredSubRaces?: SubRace[];
  race?: Race | null;
  subRace?: SubRace | null;
  gender?: 'male' | 'female' | null;
  totalStats?: CharacterStats | null;
  primaryStat?: string;
}

const SUBRACE_ASSET = '/create_char/subrace/mobile-subrace';

const stepLabels: Record<string, string> = {
  name: 'Имя',
  gender: 'Пол',
  race: 'Раса',
  subrace: 'Подраса',
  class: 'Класс',
  origin: 'Происхождение',
  spells: 'Заклинания',
  stats: 'Характеристики',
};

const CharacterSubRaceStepMobile: React.FC<CharacterSubRaceStepMobileProps> = ({
  selection,
  totalStats,
  primaryStat,
  onRandomize,
  selectedSubRace: controlledSelectedSubRace,
  onSelectSubRace,
  onNext,
  onPrev,
  currentStep,
  onStepChange,
  filteredSubRaces = [],
  race,
  subRace,
  gender,
}) => {
  const [internalSelected, setInternalSelected] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [thumbTop, setThumbTop] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const selected = controlledSelectedSubRace ?? subRace?.id ?? internalSelected;

  const SCROLL_AREA_HEIGHT = 85;
  const THUMB_HEIGHT = 39;

  const handleSelect = (id: string) => {
    if (onSelectSubRace) onSelectSubRace(id);
    else setInternalSelected(id);
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

  const handleSelectStep = (step: StepId) => {
    onStepChange(step);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden flex flex-col items-center w-full pb-8 pt-2.5 bg-[#020106]">
      <div className="md:hidden flex flex-col items-center w-full gap-4 pt-2.5 bg-[#020106]">
      {/* Step dropdown — "Подраса" */}
      <div className="relative w-75" ref={dropdownRef}>
        <button
          type="button"
          aria-label="Выбрать этап"
          className="relative w-full h-9.25 flex items-center justify-between px-3 border border-white/10 rounded-md cursor-pointer transition-colors hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className=" font-jost h-4.75 text-[15px] leading-none text-[#FCE9CE]">{currentLabel}</span>
          <Image
            src={`${SUBRACE_ASSET}/Polygon 1.svg`}
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

      {/* ПОДРАСА section frame */}
      <div className="relative w-75 h-[371px] rounded-[20px] overflow-hidden"
        style={{ background: 'linear-gradient(131.16deg, #121212 20.42%, #272727 47.31%, #121212 71.29%)' }}
      >
        {/* Border frame */}
        <svg xmlns="http://www.w3.org/2000/svg" width="291" height="371" viewBox="0 0 291 371" fill="none" className="absolute inset-0 w-full h-full pointer-events-none">
          <path d="M283.299 1.99382C283.366 2.52574 283.494 3.41228 283.666 4.47613L273.537 4.47613C276.594 2.88035 280.669 1.20578 283.276 1.99382M286.273 6.93876C286.58 9.10587 287.509 14.6222 289.068 15.5678L289.068 18.8973C287.225 17.6364 285.771 11.6867 284.88 6.93876L286.273 6.93876ZM286.273 356.631L284.932 356.631C285.824 351.923 287.255 346.17 289.068 344.929L289.068 348.002C287.509 348.948 286.58 354.464 286.273 356.631M283.276 361.833C280.504 362.66 276.129 360.769 273.028 359.094L283.681 359.094C283.494 360.276 283.351 361.241 283.276 361.833M0.913988 348.042L0.913989 343.097C2.24751 349.5 4.79469 354.149 6.46534 356.631L3.74585 356.631C3.43869 354.464 2.50972 348.948 0.943955 348.002M3.74586 6.93875L6.46535 6.93875C4.7947 9.38168 2.24752 14.0705 0.936467 20.493L0.936468 15.5678C2.50223 14.6222 3.43121 9.10586 3.73837 6.93875M6.89237 8.59366C7.4093 7.80562 7.82884 7.25397 8.09105 6.93875L279.291 6.93876C276.443 7.97979 273.573 8.53261 270.698 8.59366L6.89237 8.59366ZM281.898 356.631C278.184 354.985 274.427 354.096 270.66 353.972L6.25558 353.972C4.25529 350.721 1.49834 344.909 0.936464 337.265L0.936467 26.3048C1.47587 18.6608 4.26279 12.8491 6.26307 9.57871L270.72 9.57871C274.486 9.46186 278.244 8.57923 281.958 6.93876L284.138 6.93876C285.097 12.258 286.82 19.6459 289.165 20.9265L289.165 342.9C286.857 344.161 285.149 351.332 284.183 356.691L281.898 356.631ZM8.08355 356.631C7.82883 356.297 7.4093 355.745 6.88488 354.957L270.683 354.957C273.558 355.025 276.428 355.585 279.276 356.631L8.08355 356.631ZM270.039 4.47613L3.05662 4.47613L2.99669 5.34298C2.73448 7.52979 1.77554 13.2234 0.50944 13.2234L4.18297e-06 13.2234L1.63047e-07 350.327L0.471978 350.327C1.73808 350.327 2.71949 356.021 2.95922 358.208L3.05662 359.074L269.642 359.074C271.552 360.355 279.441 365.241 283.629 363.704L283.861 363.704L283.928 363.113C283.928 363.113 284.145 361.419 284.528 359.173L286.985 359.173L287.09 358.306C287.344 356.1 288.296 350.426 289.577 350.426L290.041 350.426L290.041 13.3219L289.577 13.3219C288.303 13.3219 287.329 7.6086 287.09 5.44149L286.985 4.57464L284.483 4.57464C284.131 2.44693 283.936 0.929968 283.928 0.890566L283.861 0.29953L283.629 0.29953C279.673 -1.15834 272.473 3.09708 270.039 4.65346" fill="#595959"/>
        </svg>
        
        {/* Content */}
        <div className="relative p-4 pt-5">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-firenight text-[22px] text-[#FFEED5] leading-6 font-normal font-firenight pb-4 pl-2">ПОДРАСА</h2>
          <button
            type="button"
            onClick={onRandomize}
            aria-label="Случайная подраса"
            className="relative w-8.75 h-8.75 flex items-center justify-center  bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mr-2 mb-5"
          >
            <Image
                src="/create_char/random.svg"
                alt="Случайная подраса"
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

        {!race ? (
          <div className="flex items-center justify-center h-40 text-[#ECECEC] font-jost text-[13px]">
            Сначала выберите расу
          </div>
        ) : filteredSubRaces.length === 0 ? (
          <div className="flex items-center justify-center h-40 text-[#ECECEC] font-jost text-[13px] text-center px-4">
            У этой расы нет подрасы. Нажмите кнопку Продолжить
          </div>
        ) : (
          <>
            {/* Subrace cards grid — scrollable */}
            <div
              ref={scrollRef}
              className="overflow-y-auto"
              style={{ height: `${SCROLL_AREA_HEIGHT}px` }}
            >
              <div className="grid grid-cols-3 gap-1 -mt-2 pr-6">
                {filteredSubRaces.map((subRaceItem) => {
                  const isSelected = subRace ? subRaceItem.id === subRace.id : subRaceItem.id === selected;

                  return (
                    <button
                      key={subRaceItem.id}
                      type="button"
                      onClick={() => handleSelect(subRaceItem.id)}
                      aria-label={`Выбрать подрасу: ${subRaceItem.name}`}
                      className="flex flex-col items-center gap-1 p-1 cursor-pointer transition-transform hover:scale-105"
                    >
                      {isSelected ? (
                        <ClassIconInline
                          src={subRaceItem.imageUrl || `${SUBRACE_ASSET}/${subRaceItem.name}.svg`}
                          selected
                          className="block w-17.5 h-14.5"
                        />
                      ) : (
                        <Image
                          src={subRaceItem.imageUrl || `${SUBRACE_ASSET}/${subRaceItem.name}.svg`}
                          alt=""
                          width={70}
                          height={58}
                          className="w-17.5 h-14.5"
                          unoptimized
                        />
                      )}
                      <span
                        className={`font-jost text-[11px] leading-none ${
                          isSelected ? 'text-[#FFEED5]' : 'text-[#ECECEC]/70'
                        }`}
                      >
                        {subRaceItem.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic scroll thumb */}
            <div
              className="absolute right-2 top-[100px] pointer-events-none"
              style={{ width: '4px', height: `${SCROLL_AREA_HEIGHT}px` }}
            >
              <div
                className="absolute left-0 right-0 rounded-full bg-white"
                style={{ top: `${thumbTop}px`, height: `${THUMB_HEIGHT}px` }}
              />
            </div>

            <div className="flex justify-center mt-4">
              <span className="font-firenight text-[20px] text-[#FFEED5]">
                {subRace ? subRace.name : filteredSubRaces.find(s => s.id === selected)?.name || ''}
              </span>
            </div>
            <div className="text-[14px] font-jost text-white/80 px-2">
              <p>{subRace ? subRace.description : filteredSubRaces.find(s => s.id === selected)?.description || ''}</p>
            </div>
            <div className="flex justify-center mt-3">
              <span className="font-firenight text-[20px] text-[#FFEED5]">Особенности подрасы</span>
            </div>
            <div className="flex justify-center mt-1">
              <Image
                src="/create_char/subrace/mobile-subrace/особенности/Layer 1.svg"
                alt="Особенности"
                width={121}
                height={30}
                className="w-[121px] h-auto"
                unoptimized
              />
            </div>
          </>
        )}
      </div>
    </div>
    </div>

      {/* Hero image area — dynamic based on selection */}
      <HeroBlock race={race ?? null} subRace={subRace ?? null} gender={gender ?? null} mobile />
      <div className="md:hidden flex flex-col items-center w-full pb-8 gap-4 pt-2.5 bg-[#020106]">
        {/* Bottom controls — back arrow + ПРОДОЛЖИТЬ (copied from CharacterGenderStepMobile) */}
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

        {/* ХАРАКТЕРИСТИКИ panel — chars.svg: 301×530, 20px radius, diagonal gradient */}
        <CharacterMenu
          totalStats={totalStats}
          primaryStat={primaryStat}
          traits={[...(selection.race?.traits ?? []), ...(selection.subRace?.traits ?? [])]}
        />
      </div>
    </div>
  );
};

export default CharacterSubRaceStepMobile;