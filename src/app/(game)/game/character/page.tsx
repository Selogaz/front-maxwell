'use client';

import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useCharacter } from '@/hooks/useCharacter';
import CharacterStepsNav from './sections/CharacterStepsNav';
import CharacterStepsMenu from './sections/CharacterStepsMenu';
import CharacterStepContent from './sections/CharacterStepContent';
import CharacterStatsPanel from './sections/CharacterStatsPanel';
import CharacterPreviewCard from './sections/CharacterPreviewCard';
import CharacterNameStep from './sections/CharacterNameStep';
import CharacterGenderStep from './sections/CharacterGenderStep';
import CharacterRaceStep from './sections/CharacterRaceStep';
import CharacterSubRaceStep from './sections/CharacterSubRaceStep';
import CharacterClassStep from './sections/CharacterClassStep';
import CharacterOriginStep from './sections/CharacterOriginStep';
import CharacterStatsStep from './sections/CharacterStatsStep';
import CharacterSpellsStep from './sections/CharacterSpellsStep';

const ContinueButton: React.FC<{ onClick: () => void; disabled?: boolean }> = ({ onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer relative w-48 h-12"
  >
    <Image src="/create_char/Continue_svg.svg" alt="Продолжить" fill className="object-contain pointer-events-none" unoptimized />
  </button>
);

const BackButton: React.FC<{ onClick: () => void; disabled?: boolean }> = ({ onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer relative w-12 h-12"
  >
    <Image src="/create_char/back_button_background.svg" alt="" fill className="object-contain pointer-events-none" unoptimized />
    <Image src="/create_char/back_button.svg" alt="Назад" width={20} height={20} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" unoptimized />
  </button>
);

const CreateCharacterPage: React.FC = () => {
  const router = useRouter();
  const {
    data,
    selection,
    loading,
    error,
    currentStep,
    usedPoints,
    setCurrentStep,
    selectRace,
    selectSubRace,
    selectClass,
    selectOrigin,
    updateStats,
    applyRecommendedStats,
    resetStats,
    randomizeCharacter,
    setName,
    setGender,
    canCreateCharacter,
  } = useCharacter();

  if (loading) {
    return (
      <div className="h-[calc(100vh-64px)] overflow-hidden flex flex-col relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
        <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-neutral-950 to-transparent pointer-events-none -z-10" />
        <div className="absolute top-28 left-0 w-56 h-[calc(100%-7rem)] bg-gradient-to-r from-neutral-950 to-transparent pointer-events-none -z-10" />
        <div className="absolute top-28 right-0 w-56 h-[calc(100%-7rem)] bg-gradient-to-l from-neutral-950 to-transparent pointer-events-none -z-10" />
        <div className="bg-[url('/bg-pattern.png')] opacity-5 absolute inset-0" />
        <div className="max-w-7xl mx-auto px-6 pt-28 pb-8">
          <Skeleton width="100%" height="60px" className="mb-6 rounded-xl" />
          <div className="flex justify-center gap-3 mb-8">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Skeleton key={i} variant="circle" width="32px" height="32px" />
            ))}
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3"><Skeleton width="100%" height="500px" /></div>
            <div className="col-span-6"><Skeleton width="100%" height="600px" /></div>
            <div className="col-span-3"><Skeleton width="100%" height="500px" /></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-[calc(100vh-64px)] flex items-center justify-center relative bg-gradient-to-b to-[#1a1a1a]">
        <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-[#020106] to-[#1a1a1a] pointer-events-none -z-10" />
        <div className="absolute top-28 left-0 w-56 h-[calc(100%-7rem)] bg-gradient-to-r from-[#020106] to-[#1a1a1a] pointer-events-none -z-10" />
        <div className="absolute top-28 right-0 w-56 h-[calc(100%-7rem)] bg-gradient-to-l from-[#020106] to-[#1a1a1a] pointer-events-none -z-10" />
        <div className="bg-[#242424] rounded-2xl p-8 border border-[#333] text-center max-w-md z-10">
          <p className="text-[#EF4444] mb-4">Не удалось загрузить данные персонажа</p>
          <Button variant="primary" onClick={() => router.push('/game/create')}>
            Вернуться к созданию игры
          </Button>
        </div>
      </div>
    );
  }

  const allSteps = [
    { id: 'name' as const, number: 1, title: 'Имя', icon: 'user' },
    { id: 'gender' as const, number: 2, title: 'Пол', icon: 'user' },
    ...data.steps,
  ];

  const currentStepIndex = allSteps.findIndex((s) => s.id === currentStep);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < allSteps.length) {
      setCurrentStep(allSteps[nextIndex].id);
    }
  };

  const handlePrev = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(allSteps[prevIndex].id);
    }
  };

  const handleCreateCharacter = () => {
    if (canCreateCharacter) {
      router.push('/game/continue');
    }
  };

  const isNameStep = currentStep === 'name';
  const canContinue = isNameStep ? selection.name : canCreateCharacter;

return (
<div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden relative">
   
      <CharacterStepsNav
        className="flex-none"
        steps={allSteps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      {currentStep === 'name' && (
        <>
          <div className="h-28 w-full bg-gradient-to-b from-[#020106] to-[#1a1a1a]" />
          <div className="absolute left-0 top-28 w-[54rem] h-[calc(100%-7rem)] bg-gradient-to-r from-[#020106] to-[#1a1a1a] pointer-events-none -z-10" />
          <div className="absolute right-0 top-28 w-[50rem] h-[calc(100%-7rem)] bg-gradient-to-l from-[#020106] to-[#1a1a1a] pointer-events-none -z-10" />
          <div className="absolute top-28 left-[54rem] right-[50rem] h-[calc(100%-7rem)] bg-[#1a1a1a] pointer-events-none -z-10" />
        </>
      )}
      {currentStep === 'gender' && (
        <>
          <div className="h-28 w-full bg-gradient-to-b from-[#020106] to-[#1a1a1a]" />
          <div className="absolute top-28 left-0 right-0 h-[calc(100%-7rem)] bg-[#1a1a1a] pointer-events-none -z-10" />
        </>
      )}

      <div className="flex-1 flex items-center justify-center overflow-hidden mb-50">
        {currentStep === 'gender' ? (
          <CharacterGenderStep
            data={data}
            selection={selection}
            usedPoints={usedPoints}
            onSelectRace={selectRace}
            onSelectSubRace={selectSubRace}
            onSelectClass={selectClass}
            onSelectOrigin={selectOrigin}
            onUpdateStats={updateStats}
            onApplyRecommended={applyRecommendedStats}
            onResetStats={resetStats}
            onNext={handleNext}
            onPrev={handlePrev}
            onSetName={setName}
            onSetGender={setGender}
            isFirstStep={currentStepIndex === 0}
            isLastStep={currentStepIndex === allSteps.length - 1}
          />
        ) : currentStep === 'race' ? (
          <CharacterRaceStep onRandomize={randomizeCharacter} />
        ) : currentStep === 'subrace' ? (
          <CharacterSubRaceStep />
        ) : currentStep === 'class' ? (
          <CharacterClassStep />
        ) : currentStep === 'origin' ? (
          <CharacterOriginStep />
        ) : currentStep === 'stats' ? (
          <CharacterStatsStep />
        ) : currentStep === 'spells' ? (
          <CharacterSpellsStep />
        ) : (
          <div className="max-w-7xl w-full px-6 flex flex-col overflow-hidden">
            {isNameStep ? (
              <CharacterNameStep
                currentStep={currentStep}
                data={data}
                selection={selection}
                usedPoints={usedPoints}
                onSelectRace={selectRace}
                onSelectSubRace={selectSubRace}
                onSelectClass={selectClass}
                onSelectOrigin={selectOrigin}
                onUpdateStats={updateStats}
                onApplyRecommended={applyRecommendedStats}
                onResetStats={resetStats}
                onNext={handleNext}
                onPrev={handlePrev}
                onSetName={setName}
                onSetGender={setGender}
                isFirstStep={currentStepIndex === 0}
                isLastStep={currentStepIndex === allSteps.length - 1}
                currentStepIndex={currentStepIndex}
              />
            ) : (
              <div className="grid grid-cols-12 gap-4 overflow-hidden">
                <div className="col-span-3 overflow-hidden">
                  <CharacterStepsMenu
                    steps={allSteps}
                    currentStep={currentStep}
                    onStepChange={setCurrentStep}
                    selection={selection}
                  />
                </div>

                <div className="col-span-6 overflow-hidden">
                  <div className="bg-[linear-gradient(131.16deg,#1a1a1a_20.42%,#2a2a2a_47.31%,#1a1a1a_71.29%)] rounded-2xl border border-[#333] p-6 h-full overflow-hidden">
                    <div className="h-full overflow-hidden">
                      <CharacterStepContent
                        currentStep={currentStep}
                        data={data}
                        selection={selection}
                        usedPoints={usedPoints}
                        onSelectRace={selectRace}
                        onSelectSubRace={selectSubRace}
                        onSelectClass={selectClass}
                        onSelectOrigin={selectOrigin}
                        onUpdateStats={updateStats}
                        onApplyRecommended={applyRecommendedStats}
                        onResetStats={resetStats}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        onSetName={setName}
                        onSetGender={setGender}
                        isFirstStep={currentStepIndex === 0}
                        isLastStep={currentStepIndex === allSteps.length - 1}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-3 overflow-hidden">
                  <div className="space-y-4 h-full overflow-hidden">
                    <div className="bg-[linear-gradient(131.16deg,#121212_20.42%,#272727_47.31%,#121212_71.29%)] rounded-2xl border border-[#333] p-4 overflow-hidden">
                      <h2 className="text-lg font-firenight text-[#FFEED5] mb-4 text-center">Характеристики</h2>
                      <div className="overflow-hidden">
                        <CharacterStatsPanel stats={selection.stats} />
                      </div>
                    </div>
                    <CharacterPreviewCard selection={selection} stats={selection.stats} />
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="h-[80px] flex justify-center items-center absolute bottom-10 w-full z-[100] gap-8">
        {currentStep !== 'name' && (
          <BackButton 
            onClick={handlePrev} 
            disabled={currentStepIndex === 0}
          />
        )}
        <ContinueButton 
          onClick={handleNext} 
          disabled={false}
        />
      </div>
    </div>
  );
};

export default CreateCharacterPage;