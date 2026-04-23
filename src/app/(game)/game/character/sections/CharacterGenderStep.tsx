'use client';

import React from 'react';
import Image from 'next/image';
import { CharacterData, CharacterSelection, CharacterStats, StepId } from '@/types/character';

interface CharacterGenderStepProps {
  data: CharacterData;
  selection: CharacterSelection;
  usedPoints: number;
  onSelectRace: (race: string) => void;
  onSelectSubRace: (subrace: string) => void;
  onSelectClass: (charClass: string) => void;
  onSelectOrigin: (origin: string) => void;
  onUpdateStats: (stat: keyof CharacterStats, value: number) => void;
  onApplyRecommended: () => void;
  onResetStats: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSetName: (name: string) => void;
  onSetGender: (gender: 'male' | 'female') => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const CharacterGenderStep: React.FC<CharacterGenderStepProps> = ({
  selection,
  onSetGender,
}) => {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-[439px] h-[295px]">
        <Image src="/create_char/gender/modal.svg" alt="" fill className="object-contain pointer-events-none" unoptimized />
        <button
          onClick={() => onSetGender?.('male')}
          className="absolute left-23.75 top-25.25 flex flex-col items-center gap-2 transition-all z-10"
        >
          <div className="relative w-[110px] h-[125px]">
            <Image 
              src={selection.gender === 'male' ? "/create_char/gender/w_gender/_AC.svg" : "/create_char/gender/w_gender/gray_AC.svg"} 
              alt="" 
              fill
              className="object-contain"
              unoptimized
            />
            <Image 
              src="/create_char/gender/m_gender_small.svg" 
              alt="Мужской" 
              width={25}
              height={40}
              className="absolute"
              style={{ 
                left: '50%', 
                top: '50%', 
                transform: 'translate(-50%, -50%)',
                filter: selection.gender === 'male' ? 'brightness(0) saturate(100%) invert(98%) sepia(10%) saturate(200%) hue-rotate(10deg)' : 'brightness(0) saturate(100%) invert(93%) sepia(0%) saturate(0%) hue-rotate(0deg)'
              }}
              unoptimized
            />
          </div>
          <span className={selection.gender === 'male' ? 'text-white' : 'text-[#666]'}></span>
        </button>
        <button
          onClick={() => onSetGender?.('female')}
          className="absolute left-58.75 top-25.25 flex flex-col items-center gap-2 transition-all z-10"
        >
          <div className="relative w-[110px] h-[125px]">
            <Image 
              src={selection.gender === 'female' ? "/create_char/gender/w_gender/_AC.svg" : "/create_char/gender/w_gender/gray_AC.svg"} 
              alt="" 
              fill
              className="object-contain"
              unoptimized
            />
            <Image 
              src="/create_char/gender/w_gender/LightGray.svg" 
              alt="Женский" 
              width={25}
              height={40}
              className="absolute"
              style={{ 
                left: '50%', 
                top: '50%', 
                transform: 'translate(-50%, -50%)',
                filter: selection.gender === 'female' ? 'brightness(0) saturate(100%) invert(98%) sepia(10%) saturate(200%) hue-rotate(10deg)' : 'brightness(0) saturate(100%) invert(93%) sepia(0%) saturate(0%) hue-rotate(0deg)'
              }}
              unoptimized
            />
          </div>
          <span className={selection.gender === 'female' ? 'text-white' : 'text-[#666]'}></span>
        </button>
      </div>
    </div>
  );
};

export default CharacterGenderStep;