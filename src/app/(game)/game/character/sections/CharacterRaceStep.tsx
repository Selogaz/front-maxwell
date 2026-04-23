'use client';

import React from 'react';
import Image from 'next/image';

interface CharacterRaceStepProps {
  onRandomize?: () => void;
}

const CharacterRaceStep: React.FC<CharacterRaceStepProps> = ({ onRandomize }) => {
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
      
      <Image 
        src="/create_char/race/race_without_icons.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-80 top-150 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      
      {onRandomize && (
        <button
          onClick={onRandomize}
          className="absolute left-163 top-65 z-50 w-10 h-10 transition-all hover:opacity-80 cursor-pointer"
        >
          <Image src="/create_char/random_background.svg" alt="" fill className="object-contain pointer-events-none" unoptimized />
          <Image src="/create_char/random.svg" alt="Случайная раса" width={24} height={24} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" unoptimized />
        </button>
      )}
      <Image 
        src="/create_char/race/Тифлинг/Group 1321316303.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-155 top-93 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Тифлинг/half_circle_light.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-149 top-95 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Тифлинг/Тифлинг.png" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-153 top-110 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Гном/Гном.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-125 top-93 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/half_circle.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-119 top-95 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Гном/Гном.png" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-127 top-110 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Человек/Vector.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-95 top-93 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Человек/Vector-1.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-95 top-93 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Человек/Vector-2.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-95 top-93 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/half_circle.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-90 top-95 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Человек/Человек.png" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-95 top-110 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />

      <Image 
        src="/create_char/race/Человек/Vector.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-95 top-128 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Человек/Vector-1.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-95 top-128 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Человек/Vector-2.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-95 top-128 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/half_circle.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-90 top-130 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Человек/Человек.png" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-95 top-145 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />

      <Image 
        src="/create_char/race/Гном/Гном.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-125 top-128 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/half_circle.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-119 top-130 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Гном/Гном.png" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-127 top-145 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />

      <Image 
        src="/create_char/race/Тифлинг/gray_tif/Group 1321316303.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-155 top-128 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/half_circle.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-149 top-130 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Тифлинг/grey_Тифлинг.png" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-153 top-145 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />


      <Image 
        src="/create_char/race/Человек/Vector.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-95 top-163 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Человек/Vector-1.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-95 top-163 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Человек/Vector-2.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-95 top-163 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/half_circle.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-90 top-165 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Человек/Человек.png" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-95 top-180 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />

      <Image 
        src="/create_char/race/Гном/Гном.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-125 top-163 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/half_circle.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-119 top-165 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Гном/Гном.png" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-127 top-180 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />

      <Image 
        src="/create_char/race/Тифлинг/gray_tif/Group 1321316303.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-155 top-163 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/half_circle.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-149 top-165 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/race/Тифлинг/grey_Тифлинг.png" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-153 top-180 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />


      <Image 
        src="/create_char/race/characteristics.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute right-80 top-152 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />

      <span 
        className="absolute left-122 top-192 w-11.75 h-8 text-center font-firenight text-[25px] leading-[130%] text-[#FFEED5]"
      >
        гном
      </span>
      <div className="absolute left-95 top-200 text-center font-jost font-normal text-[15px] leading-none text-white">
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
        className="absolute left-110 top-220 w-auto h-auto pointer-events-none"
        unoptimized
      />

      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none -z-10 px-4">
        <Image 
          src="/create_char/race/теникмкыс 1.svg" 
          alt="" 
          width={1200} 
          height={275} 
          className="h-[80dvh] w-auto max-w-full object-contain"
          unoptimized
        />
      </div>
    </>
  );
};

export default CharacterRaceStep;