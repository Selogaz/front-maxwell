'use client';

import React from 'react';
import { CharacterStep, StepId } from '@/types/character';

interface CharacterStepsNavProps {
  steps: CharacterStep[];
  currentStep: StepId;
  onStepChange: (step: StepId) => void;
  className?: string;
}

const stepLabels: Record<string, string> = {
  name: 'Имя',
  gender: 'Пол',
  race: 'Раса',
  subrace: 'Подраса',
  class: 'Класс',
  subclass: 'Подкласс',
  origin: 'Происхождение',
  stats: 'Заклинания',
};


const CharacterStepsNav: React.FC<CharacterStepsNavProps> = ({
  steps,
  currentStep,
  onStepChange,
  className = '',
}) => {
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  const getStepLabel = (id: string): string => {
    return stepLabels[id] || id;
  };

  return (
    <div className={`flex items-center justify-center gap-1 bg-[#020106] px-4 py-2 ${className}`}>
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <button
            onClick={() => onStepChange(step.id as StepId)}
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all duration-200
              ${step.id === currentStep 
                ? 'bg-[rgba(255,255,255,0.05]' 
                : 'hover:bg-[rgba(255,255,255,0.02)]'}
            `}
          >
            <div
              className={`
                w-6 h-6 rounded-full flex items-center justify-center font-firenight text-sm
                transition-all duration-200 border-2 bg-transparent
                ${
                  step.id === currentStep
                    ? 'text-[#FFEED5] border-[#FFEED5]'
                    : index < currentStepIndex
                    ? 'text-[#66AAA5] border-[#66AAA5]'
                    : 'text-[#64748B] border-[#64748B]'
                }
              `}
            >
              {index < currentStepIndex ? (
                <img src="/create_char/checkmark.svg" alt="" className="w-4 h-4" />
              ) : null}
            </div>
            <span
              className={`
                font-jost text-sm whitespace-nowrap
                ${step.id === currentStep ? 'text-white' : 'text-[#94A3B8]'}
              `}
            >
              {getStepLabel(step.id)}
            </span>
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CharacterStepsNav;