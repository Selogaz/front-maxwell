'use client';

import React from 'react';
import { CharacterData, CharacterSelection, StepId, CharacterStats } from '@/types/character';
import CharacterStepContent from './CharacterStepContent';

interface CharacterNameStepProps {
  currentStep: StepId;
  data: CharacterData;
  selection: CharacterSelection;
  usedPoints: number;
  onSelectRace: (race: string) => void;
  onSelectSubRace: (subrace: string) => void;
  onSelectClass: (charClass: string) => void;
  onSelectSubClass: (subclass: string) => void;
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
  currentStepIndex: number;
}

const CharacterNameStep: React.FC<CharacterNameStepProps> = ({
  currentStep,
  data,
  selection,
  usedPoints,
  onSelectRace,
  onSelectSubRace,
  onSelectClass,
  onSelectSubClass,
  onSelectOrigin,
  onUpdateStats,
  onApplyRecommended,
  onResetStats,
  onNext,
  onPrev,
  onSetName,
  onSetGender,
  isFirstStep,
  isLastStep,
}) => {
  return (
    <div className="flex-1 flex items-center justify-center overflow-hidden">
      <CharacterStepContent
        currentStep={currentStep}
        data={data}
        selection={selection}
        usedPoints={usedPoints}
        onSelectRace={onSelectRace}
        onSelectSubRace={onSelectSubRace}
        onSelectClass={onSelectClass}
        onSelectSubClass={onSelectSubClass}
        onSelectOrigin={onSelectOrigin}
        onUpdateStats={onUpdateStats}
        onApplyRecommended={onApplyRecommended}
        onResetStats={onResetStats}
        onNext={onNext}
        onPrev={onPrev}
        onSetName={onSetName}
        onSetGender={onSetGender}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </div>
  );
};

export default CharacterNameStep;