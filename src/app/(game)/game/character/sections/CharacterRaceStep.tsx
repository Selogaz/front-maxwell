'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ClassIconInline from '@/app/(game)/game/character/sections/ClassIconInline';
import HeroBlock from '@/app/(game)/game/character/sections/HeroBlock';
import CharacterRightPanel from '@/app/(game)/game/character/sections/CharacterRightPanel';
import { Race, SubRace, CharacterStats, RaceOption } from '@/types/character';

interface CharacterRaceStepProps {
  onRandomize?: () => void;
  selectedRace?: string;
  onSelectRace?: (raceId: string) => void;
  race?: Race | null;
  subRace?: SubRace | null;
  gender?: 'male' | 'female' | null;
  totalStats?: CharacterStats | null;
  primaryStat?: string;
  raceOptions?: RaceOption[];
}

const ASSET = '/create_char/race/mobile-race';

// Fallback-иконки по slug'ам, пока бэк не присылает свои.
const ICON_BY_INDEX: Record<string, string> = {
  human:      `${ASSET}/Group 1321316371.svg`,
  elf:        `${ASSET}/Group 1321316371.svg`,
  dwarf:      `${ASSET}/Group 1321316371.svg`,
  gnome:      `${ASSET}/Group 1321316372.svg`,
  halfling:   `${ASSET}/Group 1321316372.svg`,
  dragonborn: `${ASSET}/Group 1321316372.svg`,
  tiefling:   `${ASSET}/Group 1321316376.svg`,
  orc:        `${ASSET}/Group 1321316376.svg`,
};
const DEFAULT_ICON = `${ASSET}/Group 1321316371.svg`;

const getRaceIcon = (option: RaceOption): string =>
  option.images.thumb ?? ICON_BY_INDEX[option.index] ?? DEFAULT_ICON;

const SCROLL_AREA_HEIGHT = 432;
const THUMB_HEIGHT = 71;

const CharacterRaceStep: React.FC<CharacterRaceStepProps> = ({
  onRandomize,
  onSelectRace,
  race,
  subRace,
  gender,
  totalStats,
  primaryStat,
  raceOptions = [],
}) => {
  const [internalSelected, setInternalSelected] = useState<string>('');

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

  const handleSelect = (id: string) => {
    if (onSelectRace) {
      onSelectRace(id);
    } else {
      setInternalSelected(id);
    }
  };

  const selectedId = race?.id ?? internalSelected;
  const selectedOption = raceOptions.find((o) => o.id === selectedId) ?? null;
  const raceLabel = race?.name ?? selectedOption?.name ?? 'Выберите расу';
  const raceDescription = selectedOption?.summary ?? race?.description ?? '';

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
          РАСА
        </div>
        <div
          className="absolute left-10 top-18 h-px pointer-events-none"
          style={{
            width: 'calc(100% - 80px)',
            background: 'linear-gradient(90deg, rgba(116, 116, 116, 0.00) 0%, #A7A7A7 50.02%, rgba(218, 218, 218, 0.00) 100%)',
          }}
        />
        <div
          className="absolute left-10 top-128 h-px pointer-events-none"
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
              alt="Случайная раса"
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
          {raceOptions.length === 0 ? (
            <div className="flex items-center justify-center h-full text-[#ECECEC] font-jost text-[15px]">
              Загрузка рас…
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-x-2 gap-y-6 pr-2 pt-5">
              {raceOptions.map((option) => {
                const isSelected = selectedId === option.id;
                const icon = getRaceIcon(option);
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    className="cursor-pointer border-0 bg-transparent p-0 transition-all hover:scale-105 flex flex-col items-center"
                    aria-label={`Выбрать расу: ${option.name}`}
                  >
                    <span className="w-23 h-19 block">
                      {isSelected ? (
                        <ClassIconInline src={icon} selected className="w-full h-full" />
                      ) : (
                        <Image
                          src={icon}
                          alt=""
                          width={80}
                          height={64}
                          className="w-full h-full"
                          unoptimized
                        />
                      )}
                    </span>
                    <span
                      className={`font-jost text-[15px] leading-none mt-3 ${
                        isSelected ? 'text-[#FFEED5]' : 'text-[#ECECEC]'
                      }`}
                    >
                      {option.name}
                    </span>
                  </button>
                );
              })}
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

        <span className="absolute left-1/2 -translate-x-1/2 top-131 text-center font-firenight text-[25px] leading-[130%] text-[#FFEED5]">
        {raceLabel}
      </span>
      <div className="absolute left-1/2 -translate-x-1/2 top-140 text-center font-jost font-normal text-[15px] leading-none text-white">
        <p>{raceDescription}</p>
        
      </div>
      </div>

      <CharacterRightPanel totalStats={totalStats} primaryStat={primaryStat} traits={[...(race?.traits ?? []), ...(subRace?.traits ?? [])]} />

      <Image
        src="/create_char/race/bottom_wtf.svg"
        alt=""
        width={0}
        height={0}
        className="absolute left-[240px] top-198 w-auto h-auto pointer-events-none"
        unoptimized
      />

      <HeroBlock race={race ?? null} subRace={subRace ?? null} gender={gender ?? null} />
    </>
  );
};

export default CharacterRaceStep;
