'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CharacterSelection, StepId } from '@/types/character';

interface CharacterNameStepMobileProps {
  selection: CharacterSelection;
  onSetName: (name: string) => void;
  onNext: () => void;
  currentStep: StepId;
  onStepChange: (step: StepId) => void;
}

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

const CharacterNameStepMobile: React.FC<CharacterNameStepMobileProps> = ({
  selection,
  onSetName,
  onNext,
  currentStep,
  onStepChange,
}) => {
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
    <div className="md:hidden flex flex-col items-center w-full">
      {/* Step dropdown — 300×37, "Имя" Jost 15px, chevron right */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          aria-label="Выбрать этап"
          className="relative w-[300px] h-[37px] flex items-center justify-between px-3 bg-white/5 border border-white/10 rounded-md cursor-pointer transition-colors hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-jost text-[15px] leading-none text-[#FCE9CE]">{currentLabel}</span>
          <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
            <path d="M0.5 0.5L4.5 5L8.5 0.5L0.5 0.5Z" fill="#FFEED5" />
          </svg>
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

      {/* Input frame — 300×144 with gradient bg + decorative outline */}
      <div className="relative mt-[17px] w-[300px] h-[144px]">
        {/* Background gradient (Rectangle 407) */}
        <div
          className="absolute inset-0 rounded-[20px]"
          style={{
            background:
              'linear-gradient(131.16deg, #121212 20.42%, #272727 47.31%, #121212 71.29%)',
          }}
        />
        {/* Decorative outline (Column.svg) */}
        <Image
          src="/create_char/name/mobile/name_menu/frame_outline.svg"
          alt=""
          fill
          className="object-fill pointer-events-none opacity-30"
          unoptimized
        />

        {/* "ВВЕДИТЕ ИМЯ" header — Firenight 22px #FFEED5, x≈29, y≈23 */}
        <div className="absolute left-[29px] top-[23px] z-10">
          <Image
            src="/create_char/name/mobile/name_menu/enter_name_label.svg"
            alt="ВВЕДИТЕ ИМЯ"
            width={112}
            height={21}
            className="block"
            unoptimized
          />
        </div>

        {/* Input bar — 258×41, x=21 (centered in 300), y=70 from frame top */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[70px] w-[258px] h-[41px]">
          <Image
            src="/create_char/name/mobile/name_menu/Special Header_without_placeholder.png"
            alt=""
            fill
            className="object-fill pointer-events-none"
            unoptimized
          />
          <input
            type="text"
            defaultValue={selection.name}
            onChange={(e) => onSetName(e.target.value)}
            placeholder="Введите имя"
            className="absolute inset-0 w-full h-full bg-transparent text-[#FCE9CE] font-jost text-[14px] pl-[22%] pr-3 outline-none placeholder:text-[#FCE9CE] placeholder:opacity-50"
          />
        </div>
      </div>

      {/* Continue button — 239×48 */}
      <button
        type="button"
        onClick={onNext}
        aria-label="Продолжить"
        className="relative mt-[27px] w-[239px] h-12 transition-all hover:opacity-90 cursor-pointer border-0 bg-transparent p-0"
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
  );
};

export default CharacterNameStepMobile;
