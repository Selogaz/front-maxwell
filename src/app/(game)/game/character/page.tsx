'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Skeleton } from '@/components/ui/Skeleton';
import CharacterContinueButton from '@/components/ui/CharacterContinueButton';
import CharacterBackButton from '@/components/ui/CharacterBackButton';
import { useCharacter } from '@/hooks/useCharacter';
import { useToast } from '@/context/ToastContext';
import { buildCreateCharacterPayload } from '@/lib/characterDraft';
import CharacterStepsNav from './sections/CharacterStepsNav';
import CharacterStepsMenu from './sections/CharacterStepsMenu';
import CharacterStepContent from './sections/CharacterStepContent';
import CharacterNameStep from './sections/CharacterNameStep';
import CharacterNameStepMobile from './sections/CharacterNameStepMobile';
import CharacterGenderStepMobile from './sections/CharacterGenderStepMobile';
import CharacterRaceStepMobile from './sections/CharacterRaceStepMobile';
import CharacterSubRaceStepMobile from './sections/CharacterSubRaceStepMobile';
import CharacterClassStepMobile from './sections/CharacterClassStepMobile';
import CharacterSubClassStepMobile from './sections/CharacterSubClassStepMobile';
import CharacterOriginStepMobile from './sections/CharacterOriginStepMobile';
import CharacterAlignmentStepMobile from './sections/CharacterAlignmentStepMobile';
import CharacterStatsStepMobile from './sections/CharacterStatsStepMobile';
import CharacterSpellsStepMobile from './sections/CharacterSpellsStepMobile';
import CharacterGenderStep from './sections/CharacterGenderStep';
import CharacterRaceStep from './sections/CharacterRaceStep';
import CharacterSubRaceStep from './sections/CharacterSubRaceStep';
import CharacterClassStep from './sections/CharacterClassStep';
import CharacterSubClassStep from './sections/CharacterSubClassStep';
import CharacterOriginStep from './sections/CharacterOriginStep';
import CharacterAlignmentStep from './sections/CharacterAlignmentStep';
import CharacterStatsStep from './sections/CharacterStatsStep';
import CharacterSpellsStep from './sections/CharacterSpellsStep';
import HeroBlock from './sections/HeroBlock';
import { createCharacter } from '@/services/character-create';

const CreateCharacterPage: React.FC = () => {
  const router = useRouter();
  const { showToast } = useToast();
  const {
    data,
    raceOptions,
    classOptions,
    subclassOptions,
    backgroundOptions,
    alignmentOptions,
    cantripChoices,
    spellChoices,
    selection,
    loading,
    error,
    currentStep,
    usedPoints,
    totalStats,
    filteredSubRaces,
    setCurrentStep,
    selectRace,
    selectSubRace,
    selectClass,
    selectSubClass,
    selectOrigin,
    selectAlignment,
    selectSpells,
    selectCantrips,
    selectPrimaryStat,
    primaryStat,
    raceBonuses,
    updateStats,
    setGender,
    setName,
    applyRecommendedStats,
    resetStats,
    randomizeStats,
    randomizeRace,
    randomizeSubRace,
    randomizeClass,
    randomizeSubClass,
    randomizeOrigin,
    randomizeAlignment,
    randomizeSpells,
    canCreateCharacter,
    classSkills,
    selectSkills,
  } = useCharacter();

  if (loading) {
    return (
      <div className="h-[calc(100vh-64px)] overflow-hidden flex flex-col relative bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
        <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-b from-neutral-950 to-transparent pointer-events-none -z-10 hidden md:block" />
        <div className="absolute top-28 left-0 w-56 h-[calc(100%-7rem)] bg-gradient-to-r from-neutral-950 to-transparent pointer-events-none -z-10 hidden md:block" />
        <div className="absolute top-28 right-0 w-56 h-[calc(100%-7rem)] bg-gradient-to-l from-neutral-950 to-transparent pointer-events-none -z-10 hidden md:block" />
        <div className="bg-[url('/bg-pattern.png')] opacity-5 absolute inset-0 hidden md:block" />
        <div className="px-[100px] pt-28 pb-8">
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

  // Динамически добавляем шаг «Подкласс» сразу после шага «Класс»,
  // если у выбранного класса подкласс выбирается на 1 уровне.
  const showSubclassStep = selection.characterClass?.subclassSelectionLevel === 1;
  const dataSteps = (() => {
    if (!showSubclassStep) return data.steps;
    const idx = data.steps.findIndex((s) => s.id === 'class');
    if (idx === -1) return data.steps;
    const subclassStep = {
      id: 'subclass' as const,
      number: data.steps[idx].number + 0.5,
      title: 'Подкласс',
      icon: 'sword',
    };
    return [...data.steps.slice(0, idx + 1), subclassStep, ...data.steps.slice(idx + 1)];
  })();

  const allSteps = [
    { id: 'name' as const, number: 1, title: 'Имя', icon: 'user' },
    { id: 'gender' as const, number: 2, title: 'Пол', icon: 'user' },
    ...dataSteps,
  ];

  const currentStepIndex = allSteps.findIndex((s) => s.id === currentStep);

  const handleCreateCharacter = async () => {
    const payload = buildCreateCharacterPayload(selection, totalStats);
    if (!payload) {
      showToast('Заполните все обязательные поля персонажа', 'error');
      return;
    }
    try {
      await createCharacter(payload);
      showToast('Персонаж создан', 'success');
      router.push('/lk');
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Не удалось создать персонажа';
      showToast(message, 'error');
    }
  };

  const handleNext = () => {
    if (currentStep === 'spells') {
      handleCreateCharacter();
      return;
    }
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

  const isNameStep = currentStep === 'name';
  const canContinue = isNameStep ? selection.name : canCreateCharacter;

return (
<div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden relative bg-[#181818] md:bg-transparent">
   
      <div className="hidden md:block flex-none">
        <CharacterStepsNav
          steps={allSteps}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      </div>

      {currentStep === 'name' && (
        <div className="hidden md:block absolute inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-[#1a1a1a]" />
          <div className="absolute left-0 top-0 h-full w-1/3 bg-linear-to-r from-black to-transparent" />
          <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-black to-transparent" />
          <div className="absolute left-0 right-0 top-16 h-28 bg-linear-to-b from-black to-transparent" />
        </div>
      )}
      {currentStep === 'gender' && (
        <div className="hidden md:block">
          <div className="h-28 w-full bg-linear-to-b from-black to-[#1a1a1a]" />
          <div className="absolute top-28 left-0 right-0 h-[calc(100%-7rem)] bg-[#1a1a1a] pointer-events-none -z-10" />
        </div>
      )}

      {(currentStep === 'race' || currentStep === 'subrace' || currentStep === 'class' || currentStep === 'subclass' || currentStep === 'origin' || currentStep === 'alignment' || currentStep === 'stats' || currentStep === 'spells') && (
        <div className="hidden md:block">
          <div className="absolute top-16 left-0 right-0 h-32 bg-gradient-to-b from-[#020106] via-[#020106]/40 to-transparent pointer-events-none z-[5]" />
          <div className="absolute top-32 left-0 w-56 h-[calc(100%-8rem)] bg-gradient-to-r from-[#020106] to-transparent pointer-events-none -z-10" />
          <div className="absolute top-32 right-0 w-56 h-[calc(100%-8rem)] bg-gradient-to-l from-[#020106] to-transparent pointer-events-none -z-10" />
        </div>
      )}

      {/* Mobile rendering for the Name step */}
      {isNameStep && (
        <CharacterNameStepMobile
          selection={selection}
          onSetName={setName}
          onNext={handleNext}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      )}

      {/* Mobile rendering for the Gender step */}
      {currentStep === 'gender' && (
        <CharacterGenderStepMobile
          selection={selection}
          onSetGender={setGender}
          onNext={handleNext}
          onBack={handlePrev}
          currentStep={currentStep}
          onStepChange={setCurrentStep}
        />
      )}

      {/* Mobile rendering for the Race step */}
      {currentStep === 'race' && (
        <div className="md:hidden flex-1 overflow-y-auto">
          <CharacterRaceStepMobile
            selection={selection}
            raceOptions={raceOptions}
            totalStats={totalStats}
            primaryStat={primaryStat}
            onSelectRace={selectRace}
            onRandomize={randomizeRace}
            onNext={handleNext}
            onPrev={handlePrev}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>
      )}

      {/* Mobile rendering for the SubRace step */}
      {currentStep === 'subrace' && (
        <div className="md:hidden flex-1 overflow-y-auto">
          <CharacterSubRaceStepMobile
            selection={selection}
            totalStats={totalStats}
            primaryStat={primaryStat}
            filteredSubRaces={filteredSubRaces}
            race={selection.race}
            subRace={selection.subRace}
            gender={selection.gender}
            onRandomize={randomizeSubRace}
            onSelectSubRace={selectSubRace}
            onNext={handleNext}
            onPrev={handlePrev}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>
      )}

      {/* Mobile rendering for the Class step */}
      {currentStep === 'class' && (
        <div className="md:hidden flex-1 overflow-y-auto">
          <CharacterClassStepMobile
            selection={selection}
            totalStats={totalStats}
            primaryStat={primaryStat}
            classOptions={classOptions}
            selectedClass={selection.characterClass?.id}
            onRandomize={randomizeClass}
            onSelectClass={selectClass}
            onNext={handleNext}
            onPrev={handlePrev}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>
      )}

      {/* Mobile rendering for the Subclass step */}
      {currentStep === 'subclass' && (
        <div className="md:hidden flex-1 overflow-y-auto">
          <CharacterSubClassStepMobile
            selection={selection}
            totalStats={totalStats}
            primaryStat={primaryStat}
            subclassOptions={subclassOptions}
            selectedSubClass={selection.subClass?.id}
            onSelectSubClass={selectSubClass}
            onRandomize={randomizeSubClass}
            onNext={handleNext}
            onPrev={handlePrev}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>
      )}

      {/* Mobile rendering for the Origin step */}
      {currentStep === 'origin' && (
        <div className="md:hidden flex-1 overflow-y-auto">
          <CharacterOriginStepMobile
            selection={selection}
            totalStats={totalStats}
            primaryStat={primaryStat}
            backgroundOptions={backgroundOptions}
            selectedOrigin={selection.origin?.id}
            onRandomize={randomizeOrigin}
            onSelectOrigin={selectOrigin}
            onNext={handleNext}
            onPrev={handlePrev}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>
      )}

      {/* Mobile rendering for the Alignment step */}
      {currentStep === 'alignment' && (
        <div className="md:hidden flex-1 overflow-y-auto">
          <CharacterAlignmentStepMobile
            selection={selection}
            totalStats={totalStats}
            primaryStat={primaryStat}
            alignmentOptions={alignmentOptions}
            selectedAlignment={selection.alignment?.id}
            onRandomize={randomizeAlignment}
            onSelectAlignment={selectAlignment}
            onNext={handleNext}
            onPrev={handlePrev}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>
      )}

      {/* Mobile rendering for the Stats step */}
      {currentStep === 'stats' && (
        <div className="md:hidden flex-1 overflow-y-auto">
          <CharacterStatsStepMobile
            selection={selection}
            totalStats={totalStats}
            primaryStat={primaryStat}
            onPrimaryStatChange={selectPrimaryStat}
            onNext={handleNext}
            onPrev={handlePrev}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            stats={selection.stats}
            raceBonuses={raceBonuses}
            onUpdateStats={updateStats}
            onResetStats={resetStats}
            classSkills={classSkills}
            selectedSkills={selection.selectedSkills}
            onSelectSkills={selectSkills}
          />
        </div>
      )}

      {/* Mobile rendering for the Spells step */}
      {currentStep === 'spells' && (
        <div className="md:hidden flex-1 overflow-y-auto">
          <CharacterSpellsStepMobile
            selection={selection}
            totalStats={totalStats}
            primaryStat={primaryStat}
            cantripChoices={cantripChoices}
            spellChoices={spellChoices}
            selectedSpells={selection.spells}
            selectedCantrips={selection.cantrips}
            onSelectSpells={selectSpells}
            onSelectCantrips={selectCantrips}
            onRandomize={randomizeSpells}
            onNext={handleNext}
            onPrev={handlePrev}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>
      )}

      <div className="hidden md:flex flex-1 items-center justify-center overflow-hidden mb-50">
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
          <CharacterRaceStep onRandomize={randomizeRace} onSelectRace={selectRace} race={selection.race} subRace={selection.subRace} gender={selection.gender} totalStats={totalStats} primaryStat={primaryStat} raceOptions={raceOptions} />
        ) : currentStep === 'subrace' ? (
          <CharacterSubRaceStep
            onRandomize={randomizeSubRace}
            onSelectSubRace={selectSubRace}
            race={selection.race}
            subRace={selection.subRace}
            gender={selection.gender}
            filteredSubRaces={filteredSubRaces}
            totalStats={totalStats}
            primaryStat={primaryStat}
          />
        ) : currentStep === 'class' ? (
          <CharacterClassStep
            onRandomize={randomizeClass}
            selectedClass={selection.characterClass?.id}
            onSelectClass={selectClass}
            race={selection.race}
            subRace={selection.subRace}
            gender={selection.gender}
            totalStats={totalStats}
            primaryStat={primaryStat}
            classOptions={classOptions}
          />
        ) : currentStep === 'subclass' ? (
          <CharacterSubClassStep
            onRandomize={randomizeSubClass}
            selectedSubClass={selection.subClass?.id}
            onSelectSubClass={selectSubClass}
            characterClass={selection.characterClass}
            race={selection.race}
            subRace={selection.subRace}
            gender={selection.gender}
            totalStats={totalStats}
            primaryStat={primaryStat}
            subclassOptions={subclassOptions}
          />
        ) : currentStep === 'origin' ? (
          <CharacterOriginStep
            selectedOrigin={selection.origin?.id}
            onRandomize={randomizeOrigin}
            onSelectOrigin={selectOrigin}
            race={selection.race}
            subRace={selection.subRace}
            gender={selection.gender}
            totalStats={totalStats}
            primaryStat={primaryStat}
            backgroundOptions={backgroundOptions}
          />
        ) : currentStep === 'alignment' ? (
          <CharacterAlignmentStep
            selectedAlignment={selection.alignment?.id}
            onRandomize={randomizeAlignment}
            onSelectAlignment={selectAlignment}
            race={selection.race}
            subRace={selection.subRace}
            gender={selection.gender}
            totalStats={totalStats}
            primaryStat={primaryStat}
            alignmentOptions={alignmentOptions}
          />
        ) : currentStep === 'stats' ? (
          <CharacterStatsStep 
            race={selection.race}
            subRace={selection.subRace}
            gender={selection.gender}
            totalStats={totalStats}
            primaryStat={primaryStat}
            onPrimaryStatChange={selectPrimaryStat}
            stats={selection.stats}
            raceBonuses={raceBonuses}
            onUpdateStats={updateStats}
            onResetStats={resetStats}
            onRandomizeStats={randomizeStats}
            classSkills={classSkills}
            selectedSkills={selection.selectedSkills}
            onSelectSkills={selectSkills}
          />
        ) : currentStep === 'spells' ? (
          <CharacterSpellsStep
            onRandomize={randomizeSpells}
            selectedSpells={selection.spells}
            selectedCantrips={selection.cantrips}
            onSelectSpells={selectSpells}
            onSelectCantrips={selectCantrips}
            race={selection.race}
            subRace={selection.subRace}
            gender={selection.gender}
            totalStats={totalStats}
            primaryStat={primaryStat}
            cantripChoices={cantripChoices}
            spellChoices={spellChoices}
          />
        ) : (
            <div className="w-full px-[100px] flex flex-col overflow-hidden">
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
                onSelectAlignment={selectAlignment}
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
                alignmentOptions={alignmentOptions}
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
                        onSelectAlignment={selectAlignment}
                        onUpdateStats={updateStats}
                        onApplyRecommended={applyRecommendedStats}
                        onResetStats={resetStats}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        onSetName={setName}
                        onSetGender={setGender}
                        isFirstStep={currentStepIndex === 0}
                        isLastStep={currentStepIndex === allSteps.length - 1}
                        alignmentOptions={alignmentOptions}
                        classSkills={classSkills}
                        selectedSkills={selection.selectedSkills}
                        onSelectSkills={selectSkills}
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-3 overflow-hidden">
                  <div className="space-y-4 h-full overflow-hidden">
                    <div className="bg-[linear-gradient(131.16deg,#121212_20.42%,#272727_47.31%,#121212_71.29%)] rounded-2xl border border-[#333] p-4 overflow-hidden">
                      <h2 className="text-lg font-firenight text-[#FFEED5] mb-4 text-center">Характеристики</h2>
                      <div className="overflow-hidden">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="hidden md:flex h-20 justify-center items-center absolute bottom-10 w-full z-100 gap-4">
        {currentStep !== 'name' && (
          <CharacterBackButton
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
          />
        )}
        <CharacterContinueButton
          onClick={handleNext}
          disabled={currentStep === 'spells' ? !canCreateCharacter : false}
          label={currentStep === 'spells' ? 'Создать персонажа' : undefined}
        />
      </div>
    </div>
  );
};

export default CreateCharacterPage;