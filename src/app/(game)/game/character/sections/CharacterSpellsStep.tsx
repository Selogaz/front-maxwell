'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import HeroBlock from '@/app/(game)/game/character/sections/HeroBlock';
import CharacterRightPanel from '@/app/(game)/game/character/sections/CharacterRightPanel';
import { Race, SubRace, CharacterStats, SpellChoiceGroup } from '@/types/character';

const SPELLS_ASSET = '/create_char/spells/mobile-spells';
const RACE_ASSET = '/create_char/race/mobile-race';

const EMPTY_GROUP: SpellChoiceGroup = { choose: 0, items: [] };

const SCROLL_AREA_HEIGHT = 482;
const THUMB_HEIGHT = 71;

interface CharacterSpellsStepProps {
  onRandomize?: () => void;
  selectedSpells?: string[];
  selectedCantrips?: string[];
  onSelectSpells?: (spellIds: string[]) => void;
  onSelectCantrips?: (cantripIds: string[]) => void;
  race?: Race | null;
  subRace?: SubRace | null;
  gender?: 'male' | 'female' | null;
  totalStats?: CharacterStats | null;
  primaryStat?: string;
  cantripChoices?: SpellChoiceGroup;
  spellChoices?: SpellChoiceGroup;
}

const CharacterSpellsStep: React.FC<CharacterSpellsStepProps> = ({
  onRandomize,
  selectedSpells: controlledSelectedSpells,
  selectedCantrips: controlledSelectedCantrips,
  onSelectSpells,
  onSelectCantrips,
  race,
  subRace,
  gender,
  totalStats,
  primaryStat,
  cantripChoices = EMPTY_GROUP,
  spellChoices = EMPTY_GROUP,
}) => {
  const [internalSelectedSpells, setInternalSelectedSpells] = useState<string[]>([]);
  const [internalSelectedCantrips, setInternalSelectedCantrips] = useState<string[]>([]);
  const selectedSpells = controlledSelectedSpells ?? internalSelectedSpells;
  const selectedCantrips = controlledSelectedCantrips ?? internalSelectedCantrips;

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [thumbTop, setThumbTop] = useState(0);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const update = () => {
      const max = el.scrollHeight - el.clientHeight;
      const ratio = max > 0 ? el.scrollTop / max : 0;
      const trackSpace = el.clientHeight - THUMB_HEIGHT;
      setThumbTop(ratio * trackSpace);
    };
    update();
    el.addEventListener('scroll', update);
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (el.firstElementChild) ro.observe(el.firstElementChild);
    return () => {
      el.removeEventListener('scroll', update);
      ro.disconnect();
    };
  }, []);

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

  // Объединённые «детали выбранного» — для слотов сверху и блока описаний внизу.
  const selectedCantripDetails = cantripChoices.items.filter((item) =>
    selectedCantrips.includes(item.id)
  );
  const selectedSpellsDetails = spellChoices.items.filter((item) =>
    selectedSpells.includes(item.id)
  );
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

  return (
    <>
      <Image 
        src="/create_char/race/image 8.png" 
        alt="" 
        fill
        className="object-cover pointer-events-none -z-10"
        unoptimized
      />
      
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-black" />
      </div>
      
      <div
        className="absolute left-[100px] top-128 -translate-y-1/2"
        style={{ width: '421px', height: '722px' }}
      >
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none"
          style={{ background: 'linear-gradient(131.16deg, #121212 20.42%, #272727 47.31%, #121212 71.29%)' }}
        />
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <svg
            viewBox="0 0 421 722"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 w-full h-full"
          >
            <g transform="translate(2.5, 6.5)">
              <path
                d="M413.721 692.073C413.113 692.237 412.1 692.549 410.884 692.97V668.226C412.708 675.693 414.622 685.649 413.721 692.018M408.07 699.339C405.593 700.089 399.289 702.358 398.208 706.165H394.403C395.844 701.663 402.644 698.112 408.07 695.934V699.339ZM8.42122 699.339V696.062C13.8024 698.24 20.3769 701.736 21.7954 706.165H18.283C17.2022 702.358 10.8979 700.089 8.42122 699.339ZM2.47714 692.018C1.5315 685.246 3.69298 674.558 5.60679 666.981V693.006C4.25586 692.549 3.15261 692.201 2.47714 692.018ZM18.2379 2.23279H23.8893C16.5718 5.49046 11.2582 11.713 8.42122 15.7942V9.15077C10.8979 8.40041 17.2022 6.13102 18.283 2.30599M408.07 9.15077V15.7942C405.278 11.713 399.919 5.49046 392.579 2.28769H398.208C399.289 6.11271 405.593 8.38211 408.07 9.13247M406.179 16.8374C407.079 18.1002 407.71 19.1251 408.07 19.7657V682.281C406.88 675.325 406.248 668.313 406.179 661.29V16.8374ZM8.42122 688.65C10.3024 679.577 11.3186 670.399 11.4608 661.198V15.2818C15.1758 10.3953 21.8179 3.66031 30.5539 2.28769H385.937C394.673 3.6054 401.315 10.4136 405.053 15.3001V661.344C405.186 670.545 406.195 679.723 408.07 688.797V694.123C401.991 696.465 393.548 700.675 392.084 706.403H24.1145C22.6735 700.766 14.4779 696.593 8.35367 694.232L8.42122 688.65ZM8.42122 19.7474C8.80398 19.1251 9.43441 18.1002 10.335 16.8191V661.253C10.2569 668.277 9.61762 675.289 8.42122 682.245V19.7474ZM410.884 659.679V7.46703L409.894 7.32062C407.395 6.68006 400.888 4.33747 400.888 1.2445V0H15.6262V1.153C15.6262 4.24596 9.11919 6.64346 6.61998 7.22911L5.6293 7.46703V658.709C4.1658 663.376 -1.41802 682.648 0.338179 692.878V693.445L1.01364 693.61C1.01364 693.61 2.94997 694.141 5.51673 695.074V701.077L6.50741 701.333C9.02913 701.956 15.5136 704.28 15.5136 707.409V708.544H400.775V707.409C400.775 704.298 407.304 701.919 409.781 701.333L410.772 701.077V694.964C413.203 694.104 414.937 693.628 414.982 693.61L415.658 693.445V692.878C417.324 683.215 412.46 665.627 410.682 659.679"
                fill="white"
              />
            </g>
          </svg>
        </div>
        <div className="absolute left-13.25 top-6 text-center text-[#FFEED5] text-3xl font-normal font-firenight leading-10 pointer-events-none">
          ЗАКЛИНАНИЯ
        </div>
        <div
          className="absolute left-10 top-18 h-px pointer-events-none"
          style={{
            width: 'calc(100% - 80px)',
            background: 'linear-gradient(90deg, rgba(116, 116, 116, 0.00) 0%, #A7A7A7 50.02%, rgba(218, 218, 218, 0.00) 100%)',
          }}
        />

        {onRandomize && (
          <button
            onClick={onRandomize}
            className="absolute right-12 top-6 z-30 w-8.75 h-8.75 transition-all hover:opacity-80 cursor-pointer border-0 bg-transparent p-0"
          >
            <Image
              src="/create_char/random_background.svg"
              alt=""
              fill
              className="object-contain pointer-events-none"
              unoptimized
            />
            <Image
              src="/create_char/random.svg"
              alt="Случайные заклинания"
              width={32}
              height={29}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              unoptimized
            />
          </button>
        )}

        <div
          ref={scrollRef}
          className="no-scrollbar absolute left-10 top-19 overflow-y-auto pt-3"
          style={{ height: `${SCROLL_AREA_HEIGHT}px`, right: '28px' }}
        >
          {/* Stats row — ХАР / Защита / Бонус */}
          <div className="flex flex-row justify-center items-start pt-3 pb-6" style={{ gap: '30px' }}>
            <div className="relative w-23 h-9">
              <Image
                src={`${SPELLS_ASSET}/main_char.svg`}
                alt=""
                width={92}
                height={36}
                className="absolute inset-0"
                unoptimized
              />
              <span className="absolute left-1/2 -translate-x-2 top-1/2 -translate-y-1/2 text-[18px] text-white font-jost">{statAbbr}</span>
            </div>
            <div className="relative w-23 h-9">
              <Image
                src={`${SPELLS_ASSET}/def.svg`}
                alt=""
                width={92}
                height={36}
                className="absolute inset-0"
                unoptimized
              />
              <span className="absolute left-1/2 -translate-x-1 top-1/2 -translate-y-1/2 text-[18px] text-white font-jost">13</span>
            </div>
            <div className="relative w-23 h-9">
              <Image
                src={`${SPELLS_ASSET}/cube.svg`}
                alt=""
                width={92}
                height={36}
                className="absolute inset-0"
                unoptimized
              />
              <span className="absolute left-1/2 -translate-x-1 top-1/2 -translate-y-1/2 text-[18px] text-white font-jost">+5</span>
            </div>
          </div>

          {/* Section heading */}
          <h2 className="font-firenight text-[20px] text-[#FFEED5] leading-6 font-normal w-full text-center">ЗАКЛИНАНИЯ</h2>
          <h4 className="text-sm text-center w-full font-jost text-white/70 mt-1">Выберите заклинание из списка</h4>

          {/* Selected count */}
          <div className="flex justify-center mt-4 mb-3">
            <span className="font-jost text-[13px] text-white">
              Выбрано: {allSelectedDetails.length}/{totalLimit}
            </span>
          </div>

          {/* Selected slots — сначала cantrips, потом spells */}
          {totalLimit > 0 && (
            <div className="flex justify-center gap-3 mb-7">
              {Array.from({ length: totalLimit }).map((_, idx) => {
                const spell = allSelectedDetails[idx];
                const isCantrip = idx < selectedCantripDetails.length || (
                  !spell && idx < cantripsLimit
                );
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      spell && (isCantrip ? handleToggleCantrip(spell.id) : handleToggleSpell(spell.id))
                    }
                    aria-label={spell ? `Убрать ${spell.name}` : 'Слот заклинания'}
                    className={`block transition-opacity ${
                      spell ? 'cursor-pointer hover:opacity-80' : 'opacity-40 cursor-default'
                    }`}
                  >
                    <Image
                      src={`${SPELLS_ASSET}/spell_icon.svg`}
                      alt=""
                      width={58}
                      height={59}
                      unoptimized
                    />
                  </button>
                );
              })}
            </div>
          )}

          {/* ДОСТУПНО block with rounded border */}
          <div className="relative mx-auto" style={{ width: '237px', height: '211px' }}>
            <Image
              src={`${SPELLS_ASSET}/small_border.svg`}
              alt=""
              width={237}
              height={211}
              className="absolute inset-0 w-full h-full pointer-events-none"
              unoptimized
            />
            <div className="absolute inset-0 flex flex-col items-center pt-3 px-3 overflow-hidden">
              <h2 className="font-firenight text-[20px] text-[#FFEED5] leading-6 font-normal">ДОСТУПНО</h2>

              <div className="mt-2 self-start ml-3 overflow-y-auto" style={{ maxHeight: '160px' }}>
                {cantripChoices.items.length > 0 && (
                  <>
                    <p className="font-jost text-[10px] text-white/50 uppercase mb-0.5">Заговоры</p>
                    <ul className="flex flex-col gap-0.5 mb-2">
                      {cantripChoices.items.map((cell) => {
                        const isSelected = selectedCantrips.includes(cell.id);
                        const disabled = !isSelected && selectedCantrips.length >= cantripsLimit;
                        return (
                          <li key={cell.id}>
                            <button
                              type="button"
                              onClick={() => !disabled && handleToggleCantrip(cell.id)}
                              className={`flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity ${
                                disabled ? 'opacity-40 cursor-not-allowed' : ''
                              }`}
                            >
                              <Image
                                src={`${SPELLS_ASSET}/circle_for_spell.svg`}
                                alt=""
                                width={12}
                                height={12}
                                className={isSelected ? '' : 'opacity-50'}
                                unoptimized
                              />
                              <span
                                className={`font-jost text-[12px] leading-tight ${
                                  isSelected ? 'text-[#FFEED5]' : 'text-white'
                                }`}
                              >
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
                    <ul className="flex flex-col gap-0.5">
                      {spellChoices.items.map((cell) => {
                        const isSelected = selectedSpells.includes(cell.id);
                        const disabled = !isSelected && selectedSpells.length >= spellsLimit;
                        return (
                          <li key={cell.id}>
                            <button
                              type="button"
                              onClick={() => !disabled && handleToggleSpell(cell.id)}
                              className={`flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity ${
                                disabled ? 'opacity-40 cursor-not-allowed' : ''
                              }`}
                            >
                              <Image
                                src={`${SPELLS_ASSET}/circle_for_spell.svg`}
                                alt=""
                                width={12}
                                height={12}
                                className={isSelected ? '' : 'opacity-50'}
                                unoptimized
                              />
                              <span
                                className={`font-jost text-[12px] leading-tight ${
                                  isSelected ? 'text-[#FFEED5]' : 'text-white'
                                }`}
                              >
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
            <div className="mt-4 mb-2 space-y-2">
              {allSelectedDetails.map((spell) => (
                <div
                  key={spell.id}
                  className="bg-white/5 border border-[#DDA852]/30 rounded-lg p-2 mx-3"
                >
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

        <div
          className="absolute pointer-events-none z-30"
          style={{
            right: '14px',
            top: '76px',
            width: '6px',
            height: `${SCROLL_AREA_HEIGHT}px`,
          }}
        >
          <div
            className="absolute left-0 right-0 rounded-full bg-white"
            style={{ top: `${thumbTop}px`, height: `${THUMB_HEIGHT}px` }}
          />
        </div>

      </div>

      <CharacterRightPanel totalStats={totalStats} primaryStat={primaryStat} traits={[...(race?.traits ?? []), ...(subRace?.traits ?? [])]} />

      <HeroBlock race={race ?? null} subRace={subRace ?? null} gender={gender ?? null} />
    </>
  );
};

export default CharacterSpellsStep;
