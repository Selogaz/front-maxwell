'use client';

import React from 'react';
import Image from 'next/image';

const CharacterStatsStep: React.FC = () => {
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
        src="/create_char/characteristics/full_characteristics.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-55 top-130 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />

      <Image 
        src="/create_char/characteristics/chars_icons.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-65 top-118 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/characteristics/yellow_square.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-133 top-93 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/characteristics/empty_square.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-143 top-93 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/characteristics/empty_square.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-143 top-105 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/characteristics/empty_square.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-133 top-105 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/characteristics/empty_square.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-133 top-118 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/characteristics/yellow_square.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-143 top-118 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />

      <Image 
        src="/create_char/characteristics/empty_square.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-143 top-131 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/characteristics/empty_square.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-133 top-131 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/characteristics/yellow_square.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-133 top-143 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />
      <Image 
        src="/create_char/characteristics/empty_square.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute left-143 top-143 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />

      <Image 
        src="/create_char/race/characteristics.svg" 
        alt="" 
        width={0}
        height={0}
        className="absolute right-50 top-130 -translate-y-1/2 pointer-events-none w-auto h-auto"
        unoptimized
      />

      <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none -z-10 px-4">
        <Image 
          src="/create_char/race/теникмкыс 1.svg" 
          alt="" 
          width={1200} 
          height={275} 
          className="h-[75dvh] w-auto max-w-full object-contain"
          unoptimized
        />
      </div>
    </>
  );
};

export default CharacterStatsStep;