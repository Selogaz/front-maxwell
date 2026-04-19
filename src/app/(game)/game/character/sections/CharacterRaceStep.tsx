'use client';

import React from 'react';

const CharacterRaceStep: React.FC = () => {
  return (
    <>
      <img 
        src="/create_char/race/background.svg" 
        alt="" 
        className="absolute inset-0 w-full h-full object-cover pointer-events-none -z-10" 
      />
      <img 
        src="/create_char/race/race.svg" 
        alt="" 
        className="absolute left-100 top-150 -translate-y-1/2 pointer-events-none" 
      />
      <img 
        src="/create_char/race/characteristics.svg" 
        alt="" 
        className="absolute right-100 top-152 -translate-y-1/2 pointer-events-none" 
      />
      <img 
        src="/create_char/race/теникмкыс 1.svg" 
        alt="" 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none -z-10" 
      />
    </>
  );
};

export default CharacterRaceStep;