'use client';

import React from 'react';
import { CharacterStep, StepId } from '@/types/character';

interface CharacterStepsNavProps {
  steps: CharacterStep[];
  currentStep: StepId;
  onStepChange: (step: StepId) => void;
}

const CharacterStepsNav: React.FC<CharacterStepsNavProps> = ({
  steps,
  currentStep,
  onStepChange,
}) => {
  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="flex items-center justify-center gap-2">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <button
            onClick={() => onStepChange(step.id)}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm
              transition-all duration-300
              ${
                step.id === currentStep
                  ? 'bg-[#66AAA5] text-white shadow-[0_0_20px_rgba(102,170,165,0.4)]'
                  : index < currentStepIndex
                  ? 'bg-[#337360] text-white'
                  : 'bg-[#334155] text-[#94A3B8] hover:bg-[#475569]'
              }
            `}
          >
            {step.number}
          </button>
          {index < steps.length - 1 && (
            <div
              className={`
                w-12 h-[2px] transition-colors duration-300
                ${index < currentStepIndex ? 'bg-[#337360]' : 'bg-[#334155]'}
              `}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default CharacterStepsNav;
