'use client';

import React from 'react';
import { CharacterStep, StepId, CharacterSelection } from '@/types/character';

interface CharacterStepsMenuProps {
  steps: CharacterStep[];
  currentStep: StepId;
  onStepChange: (step: StepId) => void;
  selection: CharacterSelection;
}

const CharacterStepsMenu: React.FC<CharacterStepsMenuProps> = ({
  steps,
  currentStep,
  onStepChange,
  selection,
}) => {
  const isStepCompleted = (stepId: StepId): boolean => {
    switch (stepId) {
      case 'race':
        return selection.race !== null;
      case 'subrace':
        return selection.subRace !== null;
      case 'class':
        return selection.characterClass !== null;
      case 'subclass':
        return selection.subClass !== null;
      case 'origin':
        return selection.origin !== null;
      case 'stats':
        return true;
      default:
        return false;
    }
  };

  const getIcon = (icon: string, isActive: boolean) => {
    const colorClass = isActive ? 'text-white' : 'text-[#66AAA5]';
    const bgClass = isActive ? 'bg-[#66AAA5]' : 'bg-[rgba(255,255,255,0.05)]';

    switch (icon) {
      case 'user':
        return (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bgClass} ${isActive ? '' : 'border border-[rgba(255,255,255,0.1)]'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={colorClass}>
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
              <path d="M4 20C4 16 7.5 13 12 13C16.5 13 20 16 20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        );
      case 'star':
        return (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bgClass} ${isActive ? '' : 'border border-[rgba(255,255,255,0.1)]'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={colorClass}>
              <path d="M12 3L14 9H20L15 13L17 20L12 16L7 20L9 13L4 9H10L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
        );
      case 'sword':
        return (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bgClass} ${isActive ? '' : 'border border-[rgba(255,255,255,0.1)]'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={colorClass}>
              <path d="M14.5 17.5L3 6V3H6L17.5 14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13 19L19 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M16 16L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M19 21L21 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        );
      case 'shield':
        return (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bgClass} ${isActive ? '' : 'border border-[rgba(255,255,255,0.1)]'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={colorClass}>
              <path d="M12 3L4 7V12C4 16.4 7.3 20.5 12 21.5C16.7 20.5 20 16.4 20 12V7L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
            </svg>
          </div>
        );
      case 'compass':
        return (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bgClass} ${isActive ? '' : 'border border-[rgba(255,255,255,0.1)]'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={colorClass}>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
              <path d="M12 3V12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );
      case 'chart':
        return (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bgClass} ${isActive ? '' : 'border border-[rgba(255,255,255,0.1)]'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={colorClass}>
              <path d="M4 18L8 14L12 16L16 10L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        );
      default:
        return (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bgClass} ${isActive ? '' : 'border border-[rgba(255,255,255,0.1)]'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={colorClass}>
              <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="bg-[#0F172A] rounded-2xl border border-[#334155] p-4">
      <div className="space-y-3">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = isStepCompleted(step.id);

          return (
            <button
              key={step.id}
              onClick={() => onStepChange(step.id)}
              className={`
                w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? 'bg-[rgba(255,255,255,0.05)]'
                    : 'hover:bg-[rgba(255,255,255,0.03)]'
                }
              `}
            >
              <div className="relative">
                {getIcon(step.icon, isActive)}
                {isCompleted && !isActive && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#337360] rounded-full flex items-center justify-center">
                    <svg width="8" height="8" viewBox="0 0 24 24" fill="none" className="text-white">
                      <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
              </div>
              <span
                className={`
                  font-jost text-sm
                  ${isActive ? 'text-white' : 'text-[rgba(255,255,255,0.4)]'}
                `}
              >
                {step.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CharacterStepsMenu;