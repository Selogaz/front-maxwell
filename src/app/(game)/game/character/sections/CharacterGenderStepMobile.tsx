'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CharacterSelection, StepId } from '@/types/character';

interface CharacterGenderStepMobileProps {
  selection: CharacterSelection;
  onSetGender: (gender: 'male' | 'female') => void;
  onNext: () => void;
  onBack: () => void;
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
  stats: 'Характеристики',
  spells: 'Заклинания',
};

const CharacterGenderStepMobile: React.FC<CharacterGenderStepMobileProps> = ({
  selection,
  onSetGender,
  onNext,
  onBack,
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
    <div className="md:hidden flex flex-col items-center w-full overflow-visible">

      {/* 2. Выпадающий список этапа */}
      <div className="w-[300px] relative z-[100]" ref={dropdownRef}>
        <button
          type="button"
          className="relative w-full h-9.25 flex items-center justify-between px-3 bg-white/5 border border-white/10 rounded-md cursor-pointer transition-colors hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-jost text-[15px] leading-none text-[#FCE9CE]">{currentLabel}</span>
          <svg width="9" height="6" viewBox="0 0 9 6" fill="none" aria-hidden="true">
            <path d="M0.5 0.5L4.5 5L8.5 0.5L0.5 0.5Z" fill="#FFEED5" />
          </svg>
        </button>

        {/* Dropdown menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full mt-1 bg-[#1a1a1a] border border-white/10 rounded-md overflow-hidden z-[100]">
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

      {/* 3. Основная карточка выбора */}
      <div className="mt-6 w-[300px] relative">
        {/* Фон карточки с градиентом */}
        <div
            className="w-full h-[220px] rounded-[20px] relative overflow-hidden flex flex-col items-center justify-start pt-6"
            style={{
                background: 'linear-gradient(131.16deg, #121212 20.42%, #272727 47.31%, #121212 71.29%)',
            }}
        >
          {/* Декоративная рамка */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="224"
            height="290"
            viewBox="0 0 291 224"
            fill="none"
            className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
          >
            <path d="M283.299 1.22697C283.366 1.55431 283.494 2.09986 283.666 2.75454L273.537 2.75454C276.594 1.77252 280.669 0.742018 283.276 1.22697M286.273 4.27001C286.58 5.60361 287.509 8.99825 289.068 9.58019L289.068 11.6291C287.225 10.8532 285.771 7.19181 284.88 4.27001L286.273 4.27001ZM286.273 219.466L284.932 219.466C285.824 216.568 287.255 213.028 289.068 212.264L289.068 214.155C287.509 214.737 286.58 218.132 286.273 219.466M283.276 222.666C280.504 223.175 276.129 222.011 273.028 220.981L283.681 220.981C283.494 221.708 283.351 222.302 283.276 222.666M0.913988 214.18L0.913988 211.137C2.24751 215.077 4.79469 217.938 6.46534 219.465L3.74585 219.465C3.43869 218.132 2.50972 214.737 0.943955 214.155M3.74586 4.27L6.46535 4.27C4.7947 5.77334 2.24751 8.65878 0.936466 12.6111L0.936466 9.58018C2.50223 8.99825 3.4312 5.60361 3.73836 4.27M6.89237 5.28841C7.4093 4.80346 7.82884 4.46398 8.09105 4.27L279.291 4.27C276.443 4.91064 273.573 5.25084 270.698 5.28841L6.89237 5.28841ZM281.898 219.466C278.184 218.453 274.427 217.905 270.66 217.829L6.25558 217.829C4.25529 215.828 1.49834 212.252 0.936464 207.548L0.936466 16.1876C1.47587 11.4836 4.26278 7.90712 6.26307 5.89459L270.72 5.89459C274.486 5.82268 278.244 5.27952 281.958 4.27L284.138 4.27C285.097 7.5434 286.82 12.0898 289.165 12.8778L289.165 211.015C286.857 211.791 285.149 216.204 284.183 219.502L281.898 219.466ZM8.08355 219.465C7.82883 219.259 7.4093 218.92 6.88488 218.435L270.683 218.435C273.558 218.477 276.428 218.821 279.276 219.466L8.08355 219.465ZM270.039 2.75454L3.05662 2.75454L2.99669 3.28799C2.73448 4.63372 1.77554 8.13746 0.509439 8.13746L2.57414e-06 8.13746L1.00337e-07 215.586L0.471978 215.586C1.73808 215.586 2.71949 219.09 2.95922 220.435L3.05662 220.969L269.642 220.969C271.552 221.757 279.441 224.764 283.629 223.818L283.861 223.818L283.928 223.454C283.928 223.454 284.145 222.412 284.528 221.029L286.985 221.029L287.09 220.496C287.344 219.138 288.296 215.647 289.577 215.647L290.041 215.647L290.041 8.19809L289.577 8.19809C288.303 8.19809 287.329 4.68222 287.09 3.34861L286.985 2.81517L284.483 2.81517C284.13 1.50581 283.936 0.572289 283.928 0.548042L283.861 0.184327L283.629 0.184327C279.673 -0.712826 272.473 1.9059 270.039 2.86367" fill="white"/>
          </svg>
{/* Заголовок с обводкой */}
          <h2 
            className="text-[22px] font-bold uppercase leading-none"
            style={{
                color: '#FFEED5',
                fontFamily: "'Firenight', sans-serif"
            }}
          >
            Выберите пол персонажа
          </h2>

          <div 
            className="w-[254.214px] h-px mb-10 mt-2"
            style={{
              background: 'linear-gradient(90deg, rgba(116, 116, 116, 0.00) 0%, #A7A7A7 50.02%, rgba(218, 218, 218, 0.00) 100%)'
            }}
          />

          {/* Область с иконками */}
          <div className="flex items-center justify-center gap-6 relative z-10">
            
            {/* Мужской щит */}
            <div 
                onClick={() => onSetGender('male')}
                className={`relative cursor-pointer transition-all duration-300 ${selection.gender === 'male' ? 'scale-105' : 'opacity-40 grayscale hover:opacity-60'}`}
            >
              <Image
                src="/create_char/gender/mobile_gender/_AC.svg"
                alt="Мужской"
                width={82}
                height={94}
                className="object-contain"
                unoptimized
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/create_char/gender/mobile_gender/Group 1321316336.svg"
                  alt="Мужской"
                  width={28}
                  height={28}
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            {/* Женский щит */}
            <div 
                onClick={() => onSetGender('female')}
                className={`relative cursor-pointer transition-all duration-300 ${selection.gender === 'female' ? 'scale-105' : 'opacity-40 grayscale hover:opacity-60'}`}
            >
              <Image
                src="/create_char/gender/mobile_gender/_AC.svg"
                alt="Женский"
                width={82}
                height={94}
                className="object-contain"
                unoptimized
              />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <Image
                  src="/create_char/gender/mobile_gender/LightGray.svg"
                  alt="Женский"
                  width={20}
                  height={30}
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

          </div>
        </div>
        
        {/* Декоративная рамка вокруг карточки (если нужно) */}
        <div className="absolute inset-0 border border-white/10 rounded-[12px] pointer-events-none" />
      </div>

      {/* 4. Кнопки навигации внизу */}
      <div className="w-[300px] mt-8 flex items-center gap-3">
        <button
            type="button"
            onClick={onBack}
            aria-label="Назад"
            className="relative mt-6.75 w-12 h-12 transition-all hover:opacity-90 cursor-pointer border-0 bg-transparent p-0"
        >
          <Image
            src="/create_char/gender/mobile_gender/Group 1321316369.svg"
            alt="Назад"
            fill
            className="object-contain pointer-events-none"
            unoptimized
          />
        </button>

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

    </div>
  );
};

export default CharacterGenderStepMobile;