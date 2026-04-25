'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface CharacterRaceStepProps {
  onRandomize?: () => void;
  selectedRace?: string;
  onSelectRace?: (raceId: string) => void;
}

const UNIT = 4; // 1 tailwind unit = 4px

interface RaceCell {
  id: string;
  race: string;
  pos: { left: number; top: number };
  halfCircle: { relLeft: number; relTop: number };
  avatar: { relLeft: number; relTop: number };
  // Изображения, которые всегда используются для этой ячейки
  // (для Тифлинга это золотые, для остальных – серые)
  base: {
    frames: string[];
    halfCircle: string;
    avatar: string;
  };
  // Альтернативные (серые) изображения – только для Тифлинга
  grey?: {
    frames: string[];
    halfCircle: string;
    avatar: string;
  };
  // true – есть отдельные золотые ассеты (Тифлинг), false – золотой имитируется CSS
  hasGoldVariant: boolean;
}

const raceCells: RaceCell[] = [
  // ─── 1-й ряд ───
  {
    id: 'human-1',
    race: 'человек',
    pos: { left: 70, top: 73 },
    halfCircle: { relLeft: -4, relTop: 2 },
    avatar: { relLeft: 0, relTop: 17 },
    base: {
      frames: [
        '/create_char/race/Человек/Vector.svg',
        '/create_char/race/Человек/Vector-1.svg',
        '/create_char/race/Человек/Vector-2.svg',
      ],
      halfCircle: '/create_char/race/half_circle.svg',
      avatar: '/create_char/race/Человек/Человек.png',
    },
    hasGoldVariant: false, // золотого файла нет
  },
  {
    id: 'gnome-1',
    race: 'гном',
    pos: { left: 100, top: 73 },
    halfCircle: { relLeft: -5, relTop: 2 },
    avatar: { relLeft: 2, relTop: 17 },
    base: {
      frames: ['/create_char/race/Гном/Гном.svg'],
      halfCircle: '/create_char/race/half_circle.svg',
      avatar: '/create_char/race/Гном/Гном.png',
    },
    hasGoldVariant: false,
  },
  {
    id: 'tiefling-1',
    race: 'тифлинг',
    pos: { left: 130, top: 73 },
    halfCircle: { relLeft: -5, relTop: 2 },
    avatar: { relLeft: -2, relTop: 17 },
    base: {
      frames: ['/create_char/race/Тифлинг/Group 1321316303.svg'],
      halfCircle: '/create_char/race/Тифлинг/half_circle_light.svg',
      avatar: '/create_char/race/Тифлинг/Тифлинг.png',
    },
    grey: {
      frames: ['/create_char/race/Тифлинг/gray_tif/Group 1321316303.svg'],
      halfCircle: '/create_char/race/half_circle.svg',
      avatar: '/create_char/race/Тифлинг/grey_Тифлинг.png',
    },
    hasGoldVariant: true, // есть физические золотые изображения
  },

  // ─── 2-й ряд ───
  {
    id: 'human-2',
    race: 'человек',
    pos: { left: 70, top: 108 },
    halfCircle: { relLeft: -4, relTop: 2 },
    avatar: { relLeft: 0, relTop: 17 },
    base: {
      frames: [
        '/create_char/race/Человек/Vector.svg',
        '/create_char/race/Человек/Vector-1.svg',
        '/create_char/race/Человек/Vector-2.svg',
      ],
      halfCircle: '/create_char/race/half_circle.svg',
      avatar: '/create_char/race/Человек/Человек.png',
    },
    hasGoldVariant: false,
  },
  {
    id: 'gnome-2',
    race: 'гном',
    pos: { left: 100, top: 108 },
    halfCircle: { relLeft: -5, relTop: 2 },
    avatar: { relLeft: 2, relTop: 17 },
    base: {
      frames: ['/create_char/race/Гном/Гном.svg'],
      halfCircle: '/create_char/race/half_circle.svg',
      avatar: '/create_char/race/Гном/Гном.png',
    },
    hasGoldVariant: false,
  },
  {
    id: 'tiefling-2',
    race: 'тифлинг',
    pos: { left: 130, top: 108 },
    halfCircle: { relLeft: -5, relTop: 2 },
    avatar: { relLeft: -2, relTop: 17 },
    base: {
      frames: ['/create_char/race/Тифлинг/Group 1321316303.svg'],
      halfCircle: '/create_char/race/Тифлинг/half_circle_light.svg',
      avatar: '/create_char/race/Тифлинг/Тифлинг.png',
    },
    grey: {
      frames: ['/create_char/race/Тифлинг/gray_tif/Group 1321316303.svg'],
      halfCircle: '/create_char/race/half_circle.svg',
      avatar: '/create_char/race/Тифлинг/grey_Тифлинг.png',
    },
    hasGoldVariant: true,
  },

  // ─── 3-й ряд ───
  {
    id: 'human-3',
    race: 'человек',
    pos: { left: 70, top: 143 },
    halfCircle: { relLeft: -4, relTop: 2 },
    avatar: { relLeft: 0, relTop: 17 },
    base: {
      frames: [
        '/create_char/race/Человек/Vector.svg',
        '/create_char/race/Человек/Vector-1.svg',
        '/create_char/race/Человек/Vector-2.svg',
      ],
      halfCircle: '/create_char/race/half_circle.svg',
      avatar: '/create_char/race/Человек/Человек.png',
    },
    hasGoldVariant: false,
  },
  {
    id: 'gnome-3',
    race: 'гном',
    pos: { left: 100, top: 143 },
    halfCircle: { relLeft: -5, relTop: 2 },
    avatar: { relLeft: 2, relTop: 17 },
    base: {
      frames: ['/create_char/race/Гном/Гном.svg'],
      halfCircle: '/create_char/race/half_circle.svg',
      avatar: '/create_char/race/Гном/Гном.png',
    },
    hasGoldVariant: false,
  },
  {
    id: 'tiefling-3',
    race: 'тифлинг',
    pos: { left: 130, top: 143 },
    halfCircle: { relLeft: -5, relTop: 2 },
    avatar: { relLeft: -2, relTop: 17 },
    base: {
      frames: ['/create_char/race/Тифлинг/Group 1321316303.svg'],
      halfCircle: '/create_char/race/Тифлинг/half_circle_light.svg',
      avatar: '/create_char/race/Тифлинг/Тифлинг.png',
    },
    grey: {
      frames: ['/create_char/race/Тифлинг/gray_tif/Group 1321316303.svg'],
      halfCircle: '/create_char/race/half_circle.svg',
      avatar: '/create_char/race/Тифлинг/grey_Тифлинг.png',
    },
    hasGoldVariant: true,
  },
];

const CharacterRaceStep: React.FC<CharacterRaceStepProps> = ({
  onRandomize,
  selectedRace: controlledSelectedRace,
  onSelectRace,
}) => {
  const [internalSelected, setInternalSelected] = useState<string>('tiefling-1');
  const selected = controlledSelectedRace ?? internalSelected;

  const handleSelect = (id: string) => {
    if (onSelectRace) {
      onSelectRace(id);
    } else {
      setInternalSelected(id);
    }
  };

  return (
    <>
      {/* Фон */}
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

      <Image
        src="/create_char/race/race_without_icons.svg"
        alt=""
        width={0}
        height={0}
        className="absolute left-55 top-130 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />

      {/* Randomize */}
      {onRandomize && (
        <button
          onClick={onRandomize}
          className="absolute left-139 top-46 z-50 w-8.75 h-8.75 transition-all hover:opacity-80 cursor-pointer border-0 bg-transparent p-0"
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
            width={30}
            height={28}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            unoptimized
          />
        </button>
      )}

      {/* Ячейки рас */}
      {raceCells.map((cell) => {
        const isSelected = selected === cell.id;

        // Выбираем активный набор изображений
        let assets = cell.base;
        if (cell.hasGoldVariant && cell.grey) {
          // Тифлинг: золото при выборе, серый при невыборе
          assets = isSelected ? cell.base : cell.grey;
        }

        // Если золотой вариант имитируется CSS (человек/гном),
        // применяем фильтр только когда ячейка выбрана
        const goldFilter = !cell.hasGoldVariant && isSelected
          ? '[filter:sepia(0.8)_saturate(1.8)_hue-rotate(5deg)_brightness(1.1)]'
          : '';

        return (
          <button
            key={cell.id}
            onClick={() => handleSelect(cell.id)}
            className={`absolute z-20 cursor-pointer border-0 bg-transparent p-0 outline-none`}
            style={{
              left: `${cell.pos.left * UNIT}px`,
              top: `${cell.pos.top * UNIT}px`,
              width: '80px',
              height: '100px',
            }}
            aria-label={`Выбрать расу: ${cell.race}`}
          >
            {/* Рамка (одно или несколько изображений) */}
            {assets.frames.map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt=""
                width={0}
                height={0}
                className={`absolute left-0 top-0 -translate-y-1/2 w-auto h-auto ${goldFilter}`}
                unoptimized
              />
            ))}
            {/* Полукруг */}
            <Image
              src={assets.halfCircle}
              alt=""
              width={0}
              height={0}
              className={`absolute -translate-y-1/2 w-auto h-auto ${goldFilter}`}
              style={{
                left: `${cell.halfCircle.relLeft * UNIT}px`,
                top: `${cell.halfCircle.relTop * UNIT}px`,
              }}
              unoptimized
            />
            {/* Аватар */}
            <Image
              src={assets.avatar}
              alt=""
              width={0}
              height={0}
              className={`absolute -translate-y-1/2 w-auto h-auto ${goldFilter}`}
              style={{
                left: `${cell.avatar.relLeft * UNIT}px`,
                top: `${cell.avatar.relTop * UNIT}px`,
              }}
              unoptimized
            />
          </button>
        );
      })}

      {/* Остальной интерфейс */}
      <Image
        src="/create_char/race/characteristics.svg"
        alt=""
        width={0}
        height={0}
        className="absolute right-50 top-130 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />

      <span className="absolute left-97 top-172 w-11.75 h-8 text-center font-firenight text-[25px] leading-[130%] text-[#FFEED5]">
        гном
      </span>
      <div className="absolute left-70 top-180 text-center font-jost font-normal text-[15px] leading-none text-white">
        <p>Описание Описание Описание Описание</p>
        <p>Описание Описание Описание Описание</p>
        <p>Описание Описание Описание Описание</p>
        <p>Описание Описание Описание Описание</p>
      </div>

      <Image
        src="/create_char/race/bottom_wtf.svg"
        alt=""
        width={0}
        height={0}
        className="absolute left-85 top-200 w-auto h-auto pointer-events-none"
        unoptimized
      />

      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none -z-10">
        <Image
          src="/create_char/race/теникмкыс 1.svg"
          alt=""
          width={537}
          height={275}
          className="h-[75dvh] w-auto max-w-full object-contain"
          unoptimized
        />
      </div>
    </>
  );
};

export default CharacterRaceStep;