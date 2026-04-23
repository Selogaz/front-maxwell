'use client';

import React from 'react';
import Image from 'next/image';

const CharacterSubRaceStep: React.FC = () => {
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
        src="/create_char/subrace/full_subrace.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-80 top-150 -translate-y-1/2 pointer-events-none w-auto h-auto"
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

export default CharacterSubRaceStep;