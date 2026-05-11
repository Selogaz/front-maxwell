'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import CharacterMenu from '@/components/sections/game/character/CharacterMenu';
import ClassIconInline from './ClassIconInline';
import HeroBlock from '@/app/(game)/game/character/sections/HeroBlock';
import { StepId, CharacterSelection, CharacterStats, SpellChoiceGroup } from '@/types/character';

interface CharacterSpellsStepMobileProps {
  selection: CharacterSelection;
  totalStats?: CharacterStats | null;
  primaryStat?: string;
  onRandomize?: () => void;
  selectedSpells?: string[];
  selectedCantrips?: string[];
  onSelectSpells?: (spellIds: string[]) => void;
  onSelectCantrips?: (cantripIds: string[]) => void;
  onNext?: () => void;
  onPrev?: () => void;
  currentStep: StepId;
  onStepChange: (step: StepId) => void;
  cantripChoices?: SpellChoiceGroup;
  spellChoices?: SpellChoiceGroup;
}

const SPELLS_ASSET = '/create_char/spells/mobile-spells';
const RACE_ASSET = '/create_char/race/mobile-race';

const EMPTY_GROUP: SpellChoiceGroup = { choose: 0, items: [] };

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

const CharacterSpellsStepMobile: React.FC<CharacterSpellsStepMobileProps> = ({
  selection,
  totalStats,
  primaryStat,
  onRandomize,
  selectedSpells: controlledSelectedSpells,
  selectedCantrips: controlledSelectedCantrips,
  onSelectSpells,
  onSelectCantrips,
  onNext,
  onPrev,
  currentStep,
  onStepChange,
  cantripChoices = EMPTY_GROUP,
  spellChoices = EMPTY_GROUP,
}) => {
  const [internalSelectedSpells, setInternalSelectedSpells] = useState<string[]>([]);
  const [internalSelectedCantrips, setInternalSelectedCantrips] = useState<string[]>([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const selectedSpells = controlledSelectedSpells ?? internalSelectedSpells;
  const selectedCantrips = controlledSelectedCantrips ?? internalSelectedCantrips;

  const cantripsLimit = cantripChoices.choose;
  const spellsLimit = spellChoices.choose;
  const totalLimit = cantripsLimit + spellsLimit;

  const handleToggleCantrip = (id: string) => {
    const isSelected = selectedCantrips.includes(id);
    const next = isSelected
      ? selectedCantrips.filter((s) => s !== id)
      : selectedCantrips.length < cantripsLimit
        ? [...selectedCantrips, id]
        : selectedCantrips;
    if (onSelectCantrips) onSelectCantrips(next);
    else setInternalSelectedCantrips(next);
  };

  const handleToggleSpell = (id: string) => {
    const isSelected = selectedSpells.includes(id);
    const next = isSelected
      ? selectedSpells.filter((s) => s !== id)
      : selectedSpells.length < spellsLimit
        ? [...selectedSpells, id]
        : selectedSpells;
    if (onSelectSpells) onSelectSpells(next);
    else setInternalSelectedSpells(next);
  };

  const selectedCantripDetails = cantripChoices.items.filter((i) => selectedCantrips.includes(i.id));
  const selectedSpellsDetails = spellChoices.items.filter((i) => selectedSpells.includes(i.id));
  const allSelectedDetails = [...selectedCantripDetails, ...selectedSpellsDetails];

  const STAT_ID_TO_ABBR: Record<string, string> = {
    str: 'СИЛ', dex: 'ЛОВ',
    int: 'ИНТ', wis: 'МУД', cha: 'ХАР',
  };
  const statAbbr = primaryStat ? STAT_ID_TO_ABBR[primaryStat] : 'ХАР';

  const describe = (description: string | string[] | null): string => {
    if (!description) return '';
    return Array.isArray(description) ? description.join(' ') : description;
  };

  const handleScroll = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const maxScroll = scrollHeight - clientHeight;
      if (maxScroll > 0) {
        setScrollProgress(scrollTop / maxScroll);
      }
    }
  };

  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => content.removeEventListener('scroll', handleScroll);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLabel = stepLabels[currentStep] || 'Этап';

  const handleSelectStep = (step: StepId) => {
    onStepChange(step);
    setIsOpen(false);
  };

  return (
    <div className="md:hidden flex flex-col items-center w-full pb-8 pt-2.5 bg-[#020106]">
      <div className="md:hidden flex flex-col items-center w-full gap-4 pt-2.5 bg-[#020106]">
      {/* Step dropdown — "Заклинания" */}
      <div className="relative w-75" ref={dropdownRef}>
        <button
          type="button"
          aria-label="Выбрать этап"
          className="relative w-full h-9.25 flex items-center justify-between px-3 border border-white/10 rounded-md cursor-pointer transition-colors hover:bg-white/10"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="font-jost h-4.75 text-[15px] leading-none text-[#FCE9CE]">{currentLabel}</span>
          <Image
            src="/create_char/race/mobile-race/Polygon 1.svg"
            alt=""
            width={8}
            height={5}
            className="block"
            unoptimized
          />
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
      <div className="relative w-75 h-[569px] rounded-[20px] overflow-hidden"
        style={{ background: 'linear-gradient(131.16deg, #121212 20.42%, #272727 47.31%, #121212 71.29%)' }}
      >
        {/* Scroll thumb — лежит над скрол-контейнером, синхронизируется с scrollProgress */}
        <div
          className="absolute pointer-events-none"
          style={{
            borderRadius: '30px',
            background: '#FFF',
            width: '4px',
            height: '39px',
            right: '14px',
            top: `${80 + scrollProgress * (529 - 99)}px`,
            zIndex: 50,
          }}
        />
        {/* Border frame */}
        <svg xmlns="http://www.w3.org/2000/svg" width="295" height="564" viewBox="0 0 295 564" fill="none" className="absolute inset-0 w-full h-full pointer-events-none">
<path d="M287.22 3.08934C287.288 3.91354 287.417 5.28718 287.592 6.93557L277.323 6.93557C280.422 4.46298 284.554 1.86831 287.197 3.08934M290.235 10.7513C290.547 14.1091 291.489 22.6563 293.068 24.1216L293.068 29.2804C291.2 27.3268 289.726 18.108 288.823 10.7513L290.235 10.7513ZM290.235 552.583L288.876 552.583C289.78 545.287 291.23 536.374 293.068 534.451L293.068 539.213C291.489 540.678 290.547 549.225 290.235 552.583M287.197 560.642C284.387 561.924 279.951 558.993 276.807 556.399L287.607 556.399C287.417 558.23 287.273 559.726 287.197 560.642M0.926639 539.274L0.926639 531.612C2.27862 541.532 4.86106 548.737 6.55483 552.583L3.7977 552.583C3.48629 549.225 2.54446 540.678 0.95702 539.213M3.79771 10.7513L6.55484 10.7513C4.86106 14.5365 2.27863 21.8016 0.949431 31.753L0.949431 24.1216C2.53687 22.6563 3.4787 14.1091 3.79011 10.7513M6.98777 13.3155C7.51186 12.0944 7.9372 11.2397 8.20304 10.7513L283.156 10.7513C280.269 12.3643 277.359 13.2209 274.445 13.3155L6.98777 13.3155ZM285.8 552.583C282.034 550.032 278.225 548.655 274.407 548.462L6.34216 548.462C4.31419 543.425 1.51908 534.42 0.949425 522.576L0.949431 40.7581C1.4963 28.9141 4.32179 19.909 6.34976 14.8418L274.467 14.8418C278.286 14.6607 282.095 13.2931 285.86 10.7513L288.071 10.7513C289.043 18.9932 290.79 30.4404 293.167 32.4246L293.167 531.306C290.828 533.26 289.096 544.371 288.116 552.674L285.8 552.583ZM8.19544 552.583C7.93719 552.064 7.51185 551.209 6.98017 549.988L274.429 549.988C277.344 550.094 280.254 550.961 283.141 552.583L8.19544 552.583ZM273.776 6.93557L3.09893 6.93556L3.03817 8.2787C2.77233 11.6671 1.80012 20.489 0.516494 20.489L6.4813e-06 20.489L2.52634e-07 542.815L0.47851 542.815C1.76213 542.815 2.75713 551.636 3.00018 555.025L3.09892 556.368L273.374 556.368C275.31 558.352 283.308 565.923 287.554 563.542L287.79 563.542L287.858 562.626C287.858 562.626 288.078 560.001 288.466 556.521L290.957 556.521L291.063 555.177C291.322 551.759 292.286 542.967 293.585 542.967L294.056 542.967L294.056 20.6416L293.585 20.6416C292.294 20.6416 291.306 11.7892 291.063 8.43134L290.957 7.0882L288.42 7.0882C288.063 3.79143 287.866 1.44096 287.858 1.37991L287.79 0.464129L287.554 0.464129C283.544 -1.79477 276.245 4.7988 273.776 7.21033" fill="#595959"/>
</svg>
        
        {/* Content */}
        <div
          ref={contentRef}
          className="no-scrollbar relative p-4 pt-5 overflow-y-auto"
          onScroll={handleScroll}
          style={{ height: '535px' }}
        >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-firenight text-[22px] text-[#FFEED5] leading-6 font-normal font-firenight pb-4 pl-2">ЗАКЛИНАНИЯ</h2>
          <button
            type="button"
            onClick={onRandomize}
            aria-label="Случайные заклинания"
            className="relative w-8.75 h-8.75 flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 transition-colors mr-2 mb-5"
          >
            <Image
              src="/create_char/random.svg"
              alt="Случайные заклинания"
              width={32}
              height={29}
              className=""
              unoptimized
            />
          </button>
        </div>
        <div 
          className="absolute left-1/2 -translate-x-1/2 top-[58px] pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(116, 116, 116, 0.00) 0%, #A7A7A7 50.02%, rgba(218, 218, 218, 0.00) 100%)',
            width: '254.214px',
            height: '1px',
          }}
        />
        <div className="flex justify-center pb-10 gap-4.25">
        <Image
          src={`${SPELLS_ASSET}/main_char.svg`}
          alt=""
          width="70"
          height="27"
        />
        <span className="absolute top-22.75 left-14.25 text-[13px]">{statAbbr}</span>
        <Image
          src={`${SPELLS_ASSET}/def.svg`}
          alt=""
          width="70"
          height="27"
        />
        <span className="absolute top-22.75 left-37 text-[13px]">13</span>
        <Image
          src={`${SPELLS_ASSET}/cube.svg`}
          alt=""
          width="70"
          height="27"
        />
        <span className="absolute top-22.75 left-59 text-[13px]">+5</span>
        </div>
        <h2 className="font-firenight text-[20px] text-[#FFEED5] leading-6 font-normal font-firenight w-full text-center">ЗАКЛИНАНИЯ</h2>
        <h4 className="text-sm text-center w-full font-jost">Выберите заклинание из списка</h4>

        {/* Spell count indicator */}
        <div className="flex justify-center mb-3">
          <span className="font-jost text-[13px] ">
            Выбрано: {allSelectedDetails.length}/{totalLimit}
          </span>
        </div>

        {/* Selected slots — click to remove */}
        {totalLimit > 0 && (
          <div className='flex justify-center gap-3'>
            {Array.from({ length: totalLimit }).map((_, idx) => {
              const spell = allSelectedDetails[idx];
              const isCantripSlot = idx < cantripsLimit;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    spell && (isCantripSlot ? handleToggleCantrip(spell.id) : handleToggleSpell(spell.id))
                  }
                  aria-label={spell ? `Убрать ${spell.name}` : 'Слот заклинания'}
                  className={`block transition-opacity ${spell ? 'cursor-pointer hover:opacity-80' : 'opacity-40 cursor-default'}`}
                >
                  <Image
                    src={`${SPELLS_ASSET}/spell_icon.svg`}
                    alt=''
                    width={58}
                    height={59}
                    unoptimized
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* ДОСТУПНО list */}
        <div className='relative mx-auto mt-7' style={{ width: '237px', height: '211px' }}>
          <Image
            src={`${SPELLS_ASSET}/small_border.svg`}
            alt=''
            width={237}
            height={211}
            className="absolute inset-0 w-full h-full pointer-events-none"
            unoptimized
          />
          <div className="absolute inset-0 flex flex-col items-center pt-3 px-3 overflow-hidden">
            <h2 className="font-firenight text-2xl text-[#FFEED5] leading-6 font-normal">ДОСТУПНО</h2>
            <div className="mt-3 self-start ml-3 overflow-y-auto" style={{ maxHeight: '155px' }}>
              {cantripChoices.items.length > 0 && (
                <>
                  <p className="font-jost text-[10px] text-white/50 uppercase mb-0.5">Заговоры</p>
                  <ul className="flex flex-col gap-1 mb-2">
                    {cantripChoices.items.map((cell) => {
                      const isSelected = selectedCantrips.includes(cell.id);
                      const disabled = !isSelected && selectedCantrips.length >= cantripsLimit;
                      return (
                        <li key={cell.id}>
                          <button
                            type="button"
                            onClick={() => !disabled && handleToggleCantrip(cell.id)}
                            className={`flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                          >
                            <Image
                              src={`${SPELLS_ASSET}/circle_for_spell.svg`}
                              alt=''
                              width={15}
                              height={15}
                              className={isSelected ? '' : 'opacity-50'}
                              unoptimized
                            />
                            <span className={`font-jost text-[13px] leading-tight ${isSelected ? 'text-[#FFEED5]' : 'text-white'}`}>
                              {cell.name}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

              {spellChoices.items.length > 0 && (
                <>
                  <p className="font-jost text-[10px] text-white/50 uppercase mb-0.5">Заклинания</p>
                  <ul className="flex flex-col gap-1">
                    {spellChoices.items.map((cell) => {
                      const isSelected = selectedSpells.includes(cell.id);
                      const disabled = !isSelected && selectedSpells.length >= spellsLimit;
                      return (
                        <li key={cell.id}>
                          <button
                            type="button"
                            onClick={() => !disabled && handleToggleSpell(cell.id)}
                            className={`flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
                          >
                            <Image
                              src={`${SPELLS_ASSET}/circle_for_spell.svg`}
                              alt=''
                              width={15}
                              height={15}
                              className={isSelected ? '' : 'opacity-50'}
                              unoptimized
                            />
                            <span className={`font-jost text-[13px] leading-tight ${isSelected ? 'text-[#FFEED5]' : 'text-white'}`}>
                              {cell.name}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </>
              )}

              {cantripChoices.items.length === 0 && spellChoices.items.length === 0 && (
                <p className="font-jost text-[12px] text-white/60">
                  {totalLimit === 0
                    ? 'У этого класса нет выбора заклинаний'
                    : 'Загрузка заклинаний…'}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Selected spells description */}
        {allSelectedDetails.length > 0 && (
          <div className="mt-4 space-y-2">
            {allSelectedDetails.map((spell) => (
              <div key={spell.id} className="bg-white/5 border border-[#DDA852]/30 rounded-lg p-2">
                <span className="font-firenight text-[14px] text-[#FFEED5]">{spell.name}</span>
                {describe(spell.description) && (
                  <p className="font-jost text-[10px] text-[#ECECEC]/70 mt-1">
                    {describe(spell.description)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>

      {/* Hero image area — dynamic based on selection */}
      <HeroBlock race={selection.race} subRace={selection.subRace} gender={selection.gender} mobile />
      <div className="md:hidden flex flex-col items-center w-full pb-8 gap-4 pt-2.5 bg-[#020106]">
        {/* Bottom controls — back arrow + ПРОДОЛЖИТЬ */}
        <div className="w-75 flex items-center gap-3 -mt-12.5">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Назад"
            className="relative w-12 h-12 transition-all hover:opacity-90 cursor-pointer border-0 bg-transparent p-0"
          >
            <Image
              src="/create_char/gender/mobile_gender/Group 1321316369.svg"
              alt="Назад"
              fill
              className="absolute bottom-10 object-contain pointer-events-none"
              unoptimized
            />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Создать персонажа"
            className="relative w-59.75 h-12 transition-all hover:opacity-90 cursor-pointer border-0 bg-transparent p-0"
          >
            <svg
              viewBox="0 0 239 48"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="absolute inset-0 w-full h-full pointer-events-none"
              preserveAspectRatio="none"
            >
              <mask id="cspm-frame-mask" fill="white">
                <path d="M233.377 0C233.377 2.9949 235.805 5.42282 238.8 5.42285C238.867 5.42285 238.934 5.4194 239 5.41699V42.6045C238.934 42.6021 238.867 42.5996 238.8 42.5996C235.812 42.5996 233.39 45.0152 233.378 48H5.42188C5.41041 45.1088 3.13714 42.7515 0.279297 42.6064L0 42.5996V5.42285C2.90121 5.4228 5.27066 3.14439 5.41602 0.279297L5.42285 0H233.377Z" />
              </mask>
              <path d="M233.377 0C233.377 2.9949 235.805 5.42282 238.8 5.42285C238.867 5.42285 238.934 5.4194 239 5.41699V42.6045C238.934 42.6021 238.867 42.5996 238.8 42.5996C235.812 42.5996 233.39 45.0152 233.378 48H5.42188C5.41041 45.1088 3.13714 42.7515 0.279297 42.6064L0 42.5996V5.42285C2.90121 5.4228 5.27066 3.14439 5.41602 0.279297L5.42285 0H233.377Z" fill="#2F2F2F" />
              <path d="M233.377 0C233.377 2.9949 235.805 5.42282 238.8 5.42285C238.867 5.42285 238.934 5.4194 239 5.41699V42.6045C238.934 42.6021 238.867 42.5996 238.8 42.5996C235.812 42.5996 233.39 45.0152 233.378 48H5.42188C5.41041 45.1088 3.13714 42.7515 0.279297 42.6064L0 42.5996V5.42285C2.90121 5.4228 5.27066 3.14439 5.41602 0.279297L5.42285 0H233.377Z" fill="url(#cspm-grad-frame)" />
              <path d="M233.377 0C233.377 2.9949 235.805 5.42282 238.8 5.42285C238.867 5.42285 238.934 5.4194 239 5.41699V42.6045C238.934 42.6021 238.867 42.5996 238.8 42.5996C235.812 42.5996 233.39 45.0152 233.378 48H5.42188C5.41041 45.1088 3.13714 42.7515 0.279297 42.6064L0 42.5996V5.42285C2.90121 5.4228 5.27066 3.14439 5.41602 0.279297L5.42285 0H233.377Z" stroke="#00A59D" strokeWidth="2" mask="url(#cspm-frame-mask)" />
              <mask id="cspm-inner-mask" fill="white">
                <path d="M230.34 2.99985C230.414 5.47868 232.351 7.48684 234.8 7.67368V40.3475C232.358 40.5337 230.425 42.5312 230.34 44.9998H8.64941C8.57183 42.7406 6.94669 40.8745 4.7998 40.4315V7.58969C6.95366 7.14513 8.58277 5.26899 8.65039 2.99985H230.34Z" />
              </mask>
              <path d="M230.34 2.99985C230.414 5.47868 232.351 7.48684 234.8 7.67368V40.3475C232.358 40.5337 230.425 42.5312 230.34 44.9998H8.64941C8.57183 42.7406 6.94669 40.8745 4.7998 40.4315V7.58969C6.95366 7.14513 8.58277 5.26899 8.65039 2.99985H230.34Z" fill="#00A59D" />
              <path d="M230.34 2.99985C230.414 5.47868 232.351 7.48684 234.8 7.67368V40.3475C232.358 40.5337 230.425 42.5312 230.34 44.9998H8.64941C8.57183 42.7406 6.94669 40.8745 4.7998 40.4315V7.58969C6.95366 7.14513 8.58277 5.26899 8.65039 2.99985H230.34Z" fill="url(#cspm-grad-inner)" />
              <path d="M230.34 2.99985C230.414 5.47868 232.351 7.48684 234.8 7.67368V40.3475C232.358 40.5337 230.425 42.5312 230.34 44.9998H8.64941C8.57183 42.7406 6.94669 40.8745 4.7998 40.4315V7.58969C6.95366 7.14513 8.58277 5.26899 8.65039 2.99985H230.34Z" stroke="#00A59D" strokeWidth="2" mask="url(#cspm-inner-mask)" />
              <defs>
                <radialGradient id="cspm-grad-frame" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(64.7999) rotate(90) scale(19.5822 76.2442)">
                  <stop stopColor="#464646" />
                  <stop offset="1" stopColor="#C84B2F" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="cspm-grad-inner" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(64.7997 2.85317) rotate(90) scale(17.4666 68.0076)">
                  <stop stopColor="#00B9B0" />
                  <stop offset="1" stopColor="#00B9B0" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
            <span
              className="absolute inset-0 flex items-center justify-center text-white font-firenight uppercase pointer-events-none"
              style={{ fontSize: '15px', lineHeight: '130%', letterSpacing: '0' }}
            >
              Создать персонажа
            </span>
          </button>
        </div>

        {/* ХАРАКТЕРИСТИКИ panel */}
        <CharacterMenu
          totalStats={totalStats}
          primaryStat={primaryStat}
          traits={[...(selection.race?.traits ?? []), ...(selection.subRace?.traits ?? [])]}
        />

        {/* ОСОБЕННОСТИ section */}
        
      </div>
    </div>
  );
};

export default CharacterSpellsStepMobile;