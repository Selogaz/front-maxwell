'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import { useCharacter } from '@/hooks/useCharacter';
import CharacterStepsNav from '@/components/sections/game/CharacterStepsNav';
import CharacterStepsMenu from '@/components/sections/game/CharacterStepsMenu';
import CharacterStepContent from '@/components/sections/game/CharacterStepContent';
import CharacterStatsPanel from '@/components/sections/game/CharacterStatsPanel';
import CharacterPreviewCard from '@/components/sections/game/CharacterPreviewCard';
import { StepId } from '@/types/character';

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
    selectSubClass,
    selectOrigin,
    updateStats,
    setGender,
    setName,
    applyRecommendedStats,
    resetStats,
    randomizeCharacter,
    canCreateCharacter,
  } = useCharacter();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#1E293B] rounded-2xl p-6 mb-6 border border-[#66AAA5]/30">
            <Skeleton width="100%" height="40px" className="mb-4" />
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} variant="circle" width="40px" height="40px" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <Skeleton width="100%" height="400px" />
            </div>
            <div className="col-span-6">
              <Skeleton width="100%" height="500px" />
            </div>
            <div className="col-span-3">
              <Skeleton width="100%" height="400px" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#0F172A] pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155] text-center">
            <p className="text-[#EF4444]">Не удалось загрузить данные персонажа</p>
            <Button variant="primary" onClick={() => router.push('/game/create')} className="mt-4">
              Вернуться к созданию игры
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const currentStepIndex = data.steps.findIndex((s) => s.id === currentStep);

  const handleNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < data.steps.length) {
      setCurrentStep(data.steps[nextIndex].id);
    }
  };

  const handlePrev = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(data.steps[prevIndex].id);
    }
  };

  const handleCreateCharacter = () => {
    if (canCreateCharacter) {
      router.push('/game/continue');
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-[#1E293B] rounded-2xl p-6 mb-6 relative overflow-hidden border border-[#66AAA5]/30 shadow-[0_0_40px_rgba(102,170,165,0.15)]">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#66AAA5] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#66AAA5]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#66AAA5]/3 to-transparent pointer-events-none" />
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => router.back()}
                  className="flex-shrink-0 p-2 rounded-lg hover:bg-[#334155] transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                    <path d="M19 12H5" />
                    <path d="M12 19l-7-7 7-7" />
                  </svg>
                </button>
                <h1 className="text-2xl font-firenight font-bold text-white">
                  Создание персонажа
                </h1>
              </div>
              <Button variant="ghost" size="sm" onClick={randomizeCharacter}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mr-2">
                  <path d="M16 3H21V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 20L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M21 16V21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M15 15L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M4 4L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                Случайная генерация
              </Button>
            </div>

            <CharacterStepsNav
              steps={data.steps}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-3">
            <CharacterStepsMenu
              steps={data.steps}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              selection={selection}
            />
          </div>

          <div className="col-span-12 lg:col-span-6">
            <div className="bg-[#1E293B] rounded-2xl p-8 border border-[#334155] min-h-[600px]">
              <CharacterStepContent
                currentStep={currentStep}
                data={data}
                selection={selection}
                usedPoints={usedPoints}
                onSelectRace={selectRace}
                onSelectSubRace={selectSubRace}
                onSelectClass={selectClass}
                onSelectSubClass={selectSubClass}
                onSelectOrigin={selectOrigin}
                onUpdateStats={updateStats}
                onApplyRecommended={applyRecommendedStats}
                onResetStats={resetStats}
                onNext={handleNext}
                onPrev={handlePrev}
                isFirstStep={currentStepIndex === 0}
                isLastStep={currentStepIndex === data.steps.length - 1}
              />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-3">
            <div className="space-y-4">
              <div className="bg-[#1E293B] rounded-2xl p-4 border border-[#334155]">
                <h2 className="text-lg font-firenight font-bold text-white mb-4">
                  Характеристики
                </h2>
                <CharacterStatsPanel stats={selection.stats} />
              </div>

              <CharacterPreviewCard
                selection={selection}
                stats={selection.stats}
                onSetGender={setGender}
                onSetName={setName}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={handleCreateCharacter}
            disabled={!canCreateCharacter}
            className={canCreateCharacter ? 'shadow-[0_0_30px_rgba(102,170,165,0.4)]' : ''}
          >
            Создать персонажа
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateCharacterPage;
