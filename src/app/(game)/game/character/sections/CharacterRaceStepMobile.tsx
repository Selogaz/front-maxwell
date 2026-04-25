'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import CharacterMenu from '@/components/sections/game/character/CharacterMenu';

interface CharacterRaceStepMobileProps {
  onRandomize?: () => void;
  selectedRace?: string;
  onSelectRace?: (raceId: string) => void;
  onNext?: () => void;
  onPrev?: () => void;
}

const ASSET = '/create_char/race/mobile-race';

interface MobileRaceCell {
  id: string;
  race: 'human' | 'gnome' | 'tiefling';
  label?: string;
  unselected: string;
  // Optional dedicated golden variant (only Тифлинг ships one)
  selected?: string;
}

const cells: MobileRaceCell[] = [
  { id: 'human-1',    race: 'human',    label: 'Человек',  unselected: `${ASSET}/Group 1321316371.svg` },
  { id: 'gnome-1',    race: 'gnome',    label: 'Гном',     unselected: `${ASSET}/Group 1321316372.svg` },
  { id: 'tiefling-1', race: 'tiefling', label: 'Тифлинг',  unselected: `${ASSET}/Group 1321316376.svg`, selected: `${ASSET}/Group 1321316373.svg` },
  { id: 'human-2',    race: 'human',    unselected: `${ASSET}/Group 1321316371.svg` },
  { id: 'gnome-2',    race: 'gnome',    unselected: `${ASSET}/Group 1321316372.svg` },
  { id: 'tiefling-2', race: 'tiefling', unselected: `${ASSET}/Group 1321316376.svg`, selected: `${ASSET}/Group 1321316373.svg` },
];

interface StatRow {
  name: string;
  value: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
  showStar?: boolean;
}

const stats: StatRow[] = [
  { name: 'Сила',      value: '00', icon: `${ASSET}/LightGray-1.svg`,     iconWidth: 24, iconHeight: 23, showStar: true },
  { name: 'Ловкость',  value: '00', icon: `${ASSET}/LightGray.svg`,       iconWidth: 15, iconHeight: 21 },
  { name: 'Интеллект', value: '00', icon: `${ASSET}/Group.svg`,           iconWidth: 14, iconHeight: 13 },
  { name: 'Мудрость',  value: '00', icon: `${ASSET}/Group 1321316321.svg`, iconWidth: 20, iconHeight: 16 },
  { name: 'Харизма',   value: '00', icon: `${ASSET}/Group 1321316297.svg`, iconWidth: 13, iconHeight: 15 },
];

const CharacterRaceStepMobile: React.FC<CharacterRaceStepMobileProps> = ({
  onRandomize,
  selectedRace: controlledSelectedRace,
  onSelectRace,
  onNext,
  onPrev,
}) => {
  const [internalSelected, setInternalSelected] = useState('tiefling-1');
  const selected = controlledSelectedRace ?? internalSelected;

  const handleSelect = (id: string) => {
    if (onSelectRace) onSelectRace(id);
    else setInternalSelected(id);
  };

  return (
    <div className="md:hidden flex flex-col items-center w-full pb-8 gap-4 pt-2.5 bg-[#020106]">
      {/* Step dropdown — "Раса" */}
      <button
        type="button"
        aria-label="Выбрать этап"
        className="relative w-75 h-9.25 flex items-center justify-between px-3 bg-white/5 border border-white/10 rounded-md cursor-pointer transition-colors hover:bg-white/10"
      >
        <span className="font-jost text-[15px] leading-none text-[#FCE9CE]">Раса</span>
        <Image
          src={`${ASSET}/Polygon 1.svg`}
          alt=""
          width={8}
          height={5}
          className="block"
          unoptimized
        />
      </button>

      {/* РАСА section frame */}
      <div className="relative w-75 rounded-[20px] overflow-hidden p-4"
        style={{ background: 'linear-gradient(131.16deg, #121212 20.42%, #272727 47.31%, #121212 71.29%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-firenight text-[18px] leading-none text-[#FFEED5] tracking-wider">РАСА</h2>
          <button
            type="button"
            onClick={onRandomize}
            aria-label="Случайная раса"
            className="w-8 h-8 flex items-center justify-center rounded-md bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <Image src={`${ASSET}/Group 1321316369.svg`} alt="" width={20} height={20} unoptimized />
          </button>
        </div>

        {/* Race cards grid 2×3 */}
        <div className="grid grid-cols-3 gap-2">
          {cells.map((cell) => {
            const isSelected = selected === cell.id;
            const hasGoldVariant = Boolean(cell.selected);

            // Tiefling ships a real golden file → just swap the image.
            // Human/Gnome have no golden file → use the SVG as a CSS mask
            // so we can paint the whole shape in #FFEED5 when selected.
            const showAsImage = !isSelected || hasGoldVariant;

            return (
              <button
                key={cell.id}
                type="button"
                onClick={() => handleSelect(cell.id)}
                aria-label={cell.label ?? cell.race}
                className="flex flex-col items-center gap-1 p-1 cursor-pointer transition-transform hover:scale-105"
              >
                {showAsImage ? (
                  <Image
                    src={isSelected && hasGoldVariant ? cell.selected! : cell.unselected}
                    alt=""
                    width={70}
                    height={58}
                    className="w-17.5 h-14.5"
                    unoptimized
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="block w-17.5 h-14.5 bg-[#FFEED5]"
                    style={{
                      WebkitMaskImage: `url('${encodeURI(cell.unselected)}')`,
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center',
                      WebkitMaskSize: 'contain',
                      maskImage: `url('${encodeURI(cell.unselected)}')`,
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      maskSize: 'contain',
                    }}
                  />
                )}
                {cell.label && (
                  <span
                    className={`font-jost text-[11px] leading-none ${
                      isSelected ? 'text-[#FFEED5]' : 'text-[#ECECEC]/70'
                    }`}
                  >
                    {cell.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero image area — image 8 background + Tiefling character + top/bottom shadows */}
      <div className="relative w-full h-[350px] overflow-hidden">
        {/* Background forest image */}
        <Image
          src={`${ASSET}/image 8.png`}
          alt=""
          fill
          className="object-cover pointer-events-none"
          unoptimized
        />
        {/* Character */}
        <Image
          src={`${ASSET}/теникмкыс 1.png`}
          alt="Тифлинг"
          width={217}
          height={320}
          className="h-[40dvh] absolute left-1/2 -translate-x-1/2 bottom-0 w-auto pointer-events-none"
          unoptimized
        />
        {/* Top gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#020106] via-[#020106]/40 to-transparent pointer-events-none z-[5]" />
          <div className="absolute top-0 left-0 w-56 h-[calc(100%-8rem)] bg-gradient-to-r from-[#020106] to-transparent pointer-events-none -z-10" />
          <div className="absolute top-0 right-0 w-56 h-[calc(100%-8rem)] bg-gradient-to-l from-[#020106] to-transparent pointer-events-none -z-10" />
        
        {/* Bottom gradient overlay */}
        <div
          className="absolute bottom-10 left-0 right-0 h-22 pointer-events-none"
          style={{ background: 'linear-gradient(360deg, #020106 0%, rgba(2, 1, 6, 0.00) 100%)' }}
        />
        
      </div>

      {/* Bottom controls — back arrow + ПРОДОЛЖИТЬ (copied from CharacterGenderStepMobile) */}
      <div className="w-75 flex items-center gap-3 -mt-15">
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
          aria-label="Продолжить"
          className="relative w-59.75 h-12 transition-all hover:opacity-90 cursor-pointer border-0 bg-transparent p-0"
        >
          <Image
            src="/create_char/name/mobile/continue_button.svg"
            alt="Продолжить"
            fill
            className="object-contain pointer-events-none"
            unoptimized
          />
        </button>
      </div>

      {/* ХАРАКТЕРИСТИКИ panel — chars.svg: 301×530, 20px radius, diagonal gradient */}
      <CharacterMenu />

      {/* ОСОБЕННОСТИ section */}
      
    </div>
  );
};

export default CharacterRaceStepMobile;
