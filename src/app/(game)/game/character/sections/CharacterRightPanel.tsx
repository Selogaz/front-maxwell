'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { CharacterStats, RaceTraitInfo } from '@/types/character';

const RACE_ASSET = '/create_char/race/mobile-race';

interface CharacterRightPanelProps {
  totalStats?: CharacterStats | null;
  traits?: RaceTraitInfo[];
  primaryStat?: string;
}

const CharacterRightPanel: React.FC<CharacterRightPanelProps> = ({ totalStats, traits = [], primaryStat }) => {
  const GAP = 4;
  const THUMB_HEIGHT = 45;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [thumbTop, setThumbTop] = useState(0);

  const traitsHeight = Math.max(20, traits.length * 22 + 8);
  const wrapperHeight = Math.max(718, 616 + traitsHeight + 30);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollHeight - el.clientHeight;
      const ratio = max > 0 ? el.scrollTop / max : 0;
      const trackSpace = el.clientHeight - THUMB_HEIGHT - GAP * 2;
      setThumbTop(GAP + ratio * trackSpace);
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
  }, [traits]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (!scrollRef.current) return;
      if (scrollRef.current.contains(e.target as Node)) return;
      scrollRef.current.scrollTop += e.deltaY;
      e.preventDefault();
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute right-[100px] max-[1600px]:right-[100px] top-128 -translate-y-1/2 overflow-hidden rounded-[20px]"
      style={{ width: '315px', height: '718px' }}
    >
      {/* Background gradient (Rectangle 406): 320x718 from left */}
      <div
        className="absolute left-0 top-0 rounded-[20px] pointer-events-none"
        style={{
          width: '315px',
          height: '718px',
          background: 'linear-gradient(131.16deg, #121212 20.42%, #272727 47.31%, #121212 71.29%)',
        }}
      />

      {/* Decorative border (Column / Vector) */}
      <div
        className="absolute left-1.75 top-2 pointer-events-none"
        style={{ width: '288px', height: '702px' }}
      >
        <svg width="302" height="705" viewBox="0 0 302 705" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M300.346 16.3781C299.904 16.2143 299.169 15.9049 298.286 15.4864V40.0899C299.61 32.6652 301 22.7655 300.346 16.4327M296.243 9.15353C294.445 8.40742 289.868 6.15087 289.084 2.36572H286.321C287.368 6.84239 292.304 10.3728 296.243 12.5383V9.15353ZM6.11348 9.15353V12.411C10.02 10.2454 14.7929 6.7696 15.8226 2.36572H13.2727C12.4882 6.15087 7.91147 8.40742 6.11348 9.15353M1.79831 16.4327C1.11181 23.1659 2.68096 33.7934 4.07031 41.3273V15.45C3.08959 15.9049 2.28867 16.2507 1.79831 16.4327M13.24 702.31H17.3427C12.0305 699.07 8.17299 692.883 6.11348 688.825V695.431C7.91147 696.177 12.4882 698.433 13.2727 702.237M296.243 695.431V688.825C294.216 692.883 290.326 699.07 284.998 702.255H289.084C289.868 698.452 294.445 696.195 296.243 695.449M294.87 687.788C295.524 686.532 295.982 685.513 296.243 684.876V26.1139C295.379 33.0311 294.921 40.0034 294.87 46.9869V687.788ZM6.11348 19.7811C7.47916 28.8032 8.2169 37.9292 8.3201 47.0778V689.335C11.0171 694.193 15.839 700.89 22.1809 702.255H280.176C286.518 700.945 291.34 694.175 294.053 689.316V46.9323C294.15 37.7841 294.882 28.658 296.243 19.6355V14.3399C291.83 12.0106 285.7 7.82506 284.638 2.12914H17.5062C16.4601 7.73407 10.5104 11.8832 6.06444 14.2308L6.11348 19.7811ZM6.11348 684.894C6.39135 685.513 6.84902 686.532 7.50283 687.806V47.0233C7.44612 40.0395 6.98202 33.0671 6.11348 26.1503V684.894ZM298.286 48.5882V697.105L297.567 697.251C295.753 697.888 291.029 700.217 291.029 703.292V704.53H11.344V703.383C11.344 700.308 6.62018 697.924 4.80585 697.342L4.08666 697.105V49.5527C3.02421 44.9123 -1.02943 25.75 0.245505 15.5774V15.0132L0.735865 14.8495C0.735865 14.8495 2.14156 14.3217 4.00493 13.3936V7.42472L4.72413 7.16998C6.5548 6.55125 11.2623 4.24011 11.2623 1.12828V1.90583e-05H290.947V1.12828C290.947 4.22191 295.687 6.58764 297.485 7.16998L298.205 7.42472V13.5028C299.97 14.3581 301.228 14.8313 301.261 14.8495L301.751 15.0132V15.5774C302.961 25.1858 299.43 42.6739 298.139 48.5882" fill="#666666"/>
        </svg>
      </div>

      <div ref={scrollRef} className="overflow-y-auto no-scrollbar" style={{ width: '315px', height: '718px' }}>
        <div className="relative" style={{ height: `${wrapperHeight}px` }}>

      {/* Stat Block frame (96x128 at 108,19) */}
      <div className="absolute" style={{ width: '128px', height: '131px', left: '90px', top: '19px' }}>
        <Image
          src={`${RACE_ASSET}/stat-block.svg`}
          alt=""
          width={96}
          height={131}
          className="absolute inset-0 w-full h-full"
          unoptimized
        />
        <Image
          src="/create_char/characteristics/нтерикпмуа 1.png"
          alt="Character"
          width={128}
          height={118}
          className="absolute"
          style={{ left: '4px', top: '16px' }}
          unoptimized
        />
      </div>

      {/* Heading: Характеристики */}
      <div
        className="absolute text-center text-[#FFEED5] font-firenight text-2xl font-normal leading-8"
        style={{ left: '73px', top: '171px' }}
      >
        Характеристики
      </div>

      {/* Stat dividers */}
      {[226, 274, 324, 374, 424, 474].map((y) => (
        <div
          key={y}
          className="absolute opacity-10 bg-white"
          style={{ left: '29px', top: `${y}px`, width: '256px', height: '1px' }}
        />
      ))}

      {/* Stat: Сила */}
      <Image
        src={`${RACE_ASSET}/LightGray.svg`}
        alt=""
        width={18}
        height={26}
        className="absolute"
        style={{ left: '42px', top: '238px' }}
        unoptimized
      />
      <span
        className="absolute text-white font-firenight text-xl font-normal"
        style={{ left: '147px', top: '238px' }}
      >
        {totalStats ? totalStats.strength : '00'}
      </span>
      {primaryStat === 'str' && (
        <Image
          src={`${RACE_ASSET}/Star 1.svg`}
          alt=""
          width={10}
          height={10}
          className="absolute"
          style={{ left: '234px', top: '246px' }}
          unoptimized
        />
      )}
      <span
        className="absolute text-white font-jost text-sm font-normal"
        style={{ left: '250px', top: '241px' }}
      >
        Сила
      </span>

      {/* Stat: Ловкость */}
      <Image
        src={`${RACE_ASSET}/LightGray-1.svg`}
        alt=""
        width={24}
        height={22}
        className="absolute"
        style={{ left: '40px', top: '290px' }}
        unoptimized
      />
      <span
        className="absolute text-white font-firenight text-xl font-normal"
        style={{ left: '147px', top: '288px' }}
      >
        {totalStats ? totalStats.agility : '00'}
      </span>
      {primaryStat === 'dex' && (
        <Image
          src={`${RACE_ASSET}/Star 1.svg`}
          alt=""
          width={10}
          height={10}
          className="absolute"
          style={{ left: '212px', top: '296px' }}
          unoptimized
        />
      )}
      <span
        className="absolute text-white font-jost text-sm font-normal"
        style={{ left: '228px', top: '291px' }}
      >
        Ловкость
      </span>

      {/* Stat: Интеллект */}
      <Image
        src={`${RACE_ASSET}/LightGray-2.svg`}
        alt=""
        width={17}
        height={24}
        className="absolute"
        style={{ left: '43px', top: '339px' }}
        unoptimized
      />
      <span
        className="absolute text-white font-firenight text-xl font-normal"
        style={{ left: '147px', top: '338px' }}
      >
        {totalStats ? totalStats.intelligence : '00'}
      </span>
      {primaryStat === 'int' && (
        <Image
          src={`${RACE_ASSET}/Star 1.svg`}
          alt=""
          width={10}
          height={10}
          className="absolute"
          style={{ left: '204px', top: '346px' }}
          unoptimized
        />
      )}
      <span
        className="absolute text-white font-jost text-sm font-normal"
        style={{ left: '220px', top: '341px' }}
      >
        Интеллект
      </span>

      {/* Stat: Мудрость */}
      <Image
        src={`${RACE_ASSET}/Group 1321316321.svg`}
        alt=""
        width={25}
        height={20}
        className="absolute"
        style={{ left: '39px', top: '391px' }}
        unoptimized
      />
      <span
        className="absolute text-white font-firenight text-xl font-normal"
        style={{ left: '147px', top: '388px' }}
      >
        {totalStats ? totalStats.wisdom : '00'}
      </span>
      {primaryStat === 'wis' && (
        <Image
          src={`${RACE_ASSET}/Star 1.svg`}
          alt=""
          width={10}
          height={10}
          className="absolute"
          style={{ left: '208px', top: '396px' }}
          unoptimized
        />
      )}
      <span
        className="absolute text-white font-jost text-sm font-normal"
        style={{ left: '224px', top: '391px' }}
      >
        Мудрость
      </span>

      {/* Stat: Харизма */}
      <Image
        src={`${RACE_ASSET}/Group 1321316320.svg`}
        alt=""
        width={18}
        height={25}
        className="absolute"
        style={{ left: '42px', top: '438px' }}
        unoptimized
      />
      <span
        className="absolute text-white font-firenight text-xl font-normal"
        style={{ left: '147px', top: '438px' }}
      >
        {totalStats ? totalStats.charisma : '00'}
      </span>
      {primaryStat === 'cha' && (
        <Image
          src={`${RACE_ASSET}/Star 1.svg`}
          alt=""
          width={10}
          height={10}
          className="absolute"
          style={{ left: '214px', top: '446px' }}
          unoptimized
        />
      )}
      <span
        className="absolute text-white font-jost text-sm font-normal"
        style={{ left: '230px', top: '441px' }}
      >
        Харизма
      </span>

      {/* Section: Особенности */}
      <div
        className="absolute text-center text-[#FFEED5] font-firenight text-2xl font-normal leading-8"
        style={{ left: '43px', top: '572px' }}
      >
        Особенности
      </div>

      {/* Расовые черты (traits с бэка) */}
      <div
        className="absolute font-jost pr-3 pb-1"
        style={{ left: '43px', top: '616px', width: '252px' }}
      >
        {traits.length === 0 ? (
          <span className="text-white/50 text-[14px] leading-4 font-normal">
            Особенностей нет
          </span>
        ) : (
          traits.map((trait) => (
            <div key={trait.ref} className="mb-6 last:mb-0">
              <span className="text-white text-[14px] font-bold leading-4">{trait.name}</span>
              <span className="text-white text-[14px] font-normal leading-4"> — {trait.summary}</span>
            </div>
          ))
        )}
      </div>
        </div>
      </div>

      <div
        className="absolute pointer-events-none"
        style={{ right: '4px', top: 0, width: '4px', height: '718px' }}
      >
        <div
          className="absolute w-full rounded-full bg-white"
          style={{ top: `${thumbTop}px`, height: '45px' }}
        />
      </div>

    </div>
  );
};

export default CharacterRightPanel;
