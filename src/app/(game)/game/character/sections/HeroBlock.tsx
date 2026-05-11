'use client';

import Image from 'next/image';
import { Race, SubRace } from '@/types/character';
import { getHeroImagePath } from '@/lib/heroImageMap';

interface HeroBlockProps {
  race: Race | null;
  subRace: SubRace | null;
  gender: 'male' | 'female' | null;
  mobile?: boolean;
}

const HeroBlock: React.FC<HeroBlockProps> = ({ race, subRace, gender, mobile }) => {
  const imagePath = getHeroImagePath(race, subRace, gender);

  if (!imagePath) return null;

  if (mobile) {
    return (
      <div className="relative w-full h-[350px] overflow-hidden">
        {/* Background forest image */}
        <Image
          src="/create_char/race/mobile-race/image 8.png"
          alt=""
          fill
          className="object-cover pointer-events-none"
          unoptimized
        />
        {/* Character */}
        <Image
          src={imagePath}
          alt=""
          width={217}
          height={320}
          className="h-80 absolute left-1/2 -translate-x-1/2 bottom-0 w-auto pointer-events-none"
          unoptimized
        />
        {/* Top gradient overlay */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#020106] via-[#020106]/40 to-transparent pointer-events-none z-[5]" />
        <div className="absolute top-0 left-0 w-10 h-[calc(100%-8rem)] bg-gradient-to-r from-[#020106] to-transparent pointer-events-none -z-10" />
        <div className="absolute top-0 right-0 w-10 h-[calc(100%-8rem)] bg-gradient-to-l from-[#020106] to-transparent pointer-events-none -z-10" />

        {/* Bottom gradient overlay */}
        <div
          className="absolute bottom-8 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(360deg, #020106 0%, rgba(2, 1, 6, 0.00) 100%)' }}
        />
      </div>
    );
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 flex justify-center pointer-events-none -z-10">
      <Image
        src={imagePath}
        alt=""
        width={1200}
        height={275}
        className="h-[75dvh] w-auto max-w-full object-contain"
        unoptimized
      />
    </div>
  );
};

export default HeroBlock;
