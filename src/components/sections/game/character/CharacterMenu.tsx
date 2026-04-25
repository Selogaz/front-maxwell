'use client';

import React from 'react';
import Image from 'next/image';

const ASSET = '/create_char/race/mobile-race';

interface CharacterMenuProps {
  strength?: number;
  dexterity?: number;
  intelligence?: number;
  wisdom?: number;
  charisma?: number;
  weapon?: string;
  armor?: string;
  skills?: string;
  characterImage?: string;
}

interface StatRow {
  name: string;
  value: string;
  icon: string;
  iconWidth: number;
  iconHeight: number;
  showStar?: boolean;
}

const stats: StatRow[] = [
  { name: 'Сила',      value: '00', icon: `${ASSET}/LightGray.svg`,     iconWidth: 14, iconHeight: 20, showStar: true },
  { name: 'Ловкость',  value: '00', icon: `${ASSET}/LightGray-1.svg`,       iconWidth: 18, iconHeight: 16 },
  { name: 'Интеллект', value: '00', icon: `${ASSET}/LightGray-2.svg`,           iconWidth: 13, iconHeight: 18 },
  { name: 'Мудрость',  value: '00', icon: `${ASSET}/Group 1321316321.svg`, iconWidth: 19, iconHeight: 15 },
  { name: 'Харизма',   value: '00', icon: `${ASSET}/Group 1321316320.svg`, iconWidth: 14, iconHeight: 19 },
];

const CharacterMenu: React.FC<CharacterMenuProps> = ({
  strength = 0,
  dexterity = 0,
  intelligence = 0,
  wisdom = 0,
  charisma = 0,
  weapon = 'Кинжал, Посох',
  armor = 'Без брони',
  skills = 'ПРОИСХОЖДЕНИЕ ЧАРОДЕЯ',
  characterImage,
}) => {
  return (
    <div className="relative w-[301px] h-[530px] bg-[#242424] rounded-[20px] overflow-hidden">
      <Image
        src={`${ASSET}/frame-border.svg`}
        alt=""
        width={288}
        height={518}
        className="absolute inset-0 w-full h-full z-10 pointer-events-none"
        unoptimized
      />
      <div 
        className="absolute inset-0 rounded-[20px]"
        style={{
          background: 'linear-gradient(131.16deg, #121212 20.42%, #272727 47.31%, #121212 71.29%)'
        }}
      />

      <div className="relative z-10 h-full flex flex-col">
        <div className="h-[110px] flex items-center justify-center">
          <div className="relative w-24 h-20 flex items-center justify-center">
            <Image
              src={`${ASSET}/stat-block.svg`}
              alt=""
              width={50}
              height={66}
              className="absolute top-0 w-12.5 h-16.5"
              unoptimized
            />
            <Image
              src={`${ASSET}/нтерикпмуа 1.png`}
              alt="Character"
              width={64}
              height={59}
              className="relative z-10 w-16 h-14.75"
              unoptimized
            />
          </div>
        </div>
        <h3 className="flex justify-center text-[#FFEED5] text-xl font-normal leading-6 font-firenight -mt-2 mb-4">Характеристики</h3>
        <div className="px-7 space-y-3">
          {stats.map((stat, index) => (
            <React.Fragment key={stat.name}>
              <div className="w-60 h-0.25 opacity-10 bg-white" />
              <div className="grid grid-cols-[32px_1fr_18px_1fr] items-center gap-3">
                <span className="flex justify-center">
                  <Image
                    src={stat.icon}
                    alt=""
                    width={stat.iconWidth}
                    height={stat.iconHeight}
                    unoptimized
                  />
                </span>
                <span className="font-firenight text-[20px] text-white leading-none text-center">
                  {stat.name === 'Сила' ? String(strength).padStart(2, '0') :
                   stat.name === 'Ловкость' ? String(dexterity).padStart(2, '0') :
                   stat.name === 'Интеллект' ? String(intelligence).padStart(2, '0') :
                   stat.name === 'Мудрость' ? String(wisdom).padStart(2, '0') :
                   String(charisma).padStart(2, '0')}
                </span>
                <span className="flex justify-center">
                  {stat.showStar && (
                    <Image
                      src={`${ASSET}/Star 1.svg`}
                      alt=""
                      width={10}
                      height={9}
                      unoptimized
                    />
                  )}
                </span>
                <span className="font-jost text-[13px] text-white/80 text-left">
                  {stat.name}
                </span>
              </div>
            </React.Fragment>
            
          ))}
          <div className="w-60 h-0.25 opacity-10 bg-white" />
        </div>

        <div className="px-7 pt-6">
          <h3 className="text-[#FFEED5] text-xl font-normal leading-6 mb-3 font-firenight">
            Особенности
          </h3>
          
          <div className="space-y-2.5">
            <div className="text-sm leading-4 font-jost">
              <span className="text-white font-bold">Оружие</span>
              <span className="text-white"> — {weapon}</span>
            </div>
            
            <div className="text-sm leading-4 font-jost">
              <span className="text-white font-bold">Броня</span>
              <span className="text-white"> — {armor}</span>
            </div>
            
            <div className="text-sm leading-4 font-jost">
              <span className="text-white font-bold">Навыки</span>
              <span className="text-white"> — </span>
              <span className="text-white lowercase">{skills}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-[15.48px] top-[437px] w-[3.82px] h-[42.94px] bg-white rounded-full opacity-30" />
      <div className="absolute inset-0 rounded-[20px] border border-white/5 pointer-events-none" />
    </div>
  );
};

export default CharacterMenu;