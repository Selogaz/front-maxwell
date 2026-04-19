'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const CreateCharHeader: React.FC = () => {
  const router = useRouter();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#020106]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img src="/full_logo.svg" alt="Подземелья Максвелла" className="h-10 w-auto" />
              </div>
            </Link>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 h-[66px] flex items-center rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#334155] transition-all"
            >
              Главная
            </button>
          </div>

<nav className="hidden md:flex items-center gap-1">
            <button
              onClick={() => router.push('/lk')}
              className="flex items-center gap-1 p-1.5 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#334155] transition-all"
            >
              <div className="relative w-[66px] h-[66px] flex items-center justify-center">
                <svg width="66" height="66" viewBox="0 0 66 66" fill="none" className="absolute inset-0">
                  <rect width="66" height="66" fill="white" fillOpacity="0.1"/>
                  <rect x="0.5" y="0.5" width="65" height="65" stroke="white" strokeOpacity="0.2"/>
                </svg>
                <svg width="23" height="26" viewBox="0 0 23 26" fill="none" className="w-[22.5px] h-[25.75px]">
                  <path d="M9.41327 0.262199C6.92401 1.011 5.93236 2.5086 5.6895 5.82762C5.60855 6.87999 5.46688 7.83117 5.38593 7.9526C4.83951 8.7014 5.12284 10.543 5.99307 11.818C6.31688 12.324 6.78235 13.174 7.0252 13.7204C7.26806 14.2668 7.57162 14.8335 7.73353 14.9549C7.89543 15.0763 8.01686 15.2585 8.01686 15.3394C8.01686 15.4406 7.22758 15.8858 6.25616 16.3513C2.02644 18.3751 1.62168 18.6584 0.751455 20.3584C0.285983 21.2691 -0.139012 23.4346 0.0431288 23.9203C0.12408 24.1227 0.407411 24.3655 0.710979 24.4667C1.64192 24.831 5.2645 25.4988 5.83117 25.4179C6.13473 25.3572 6.41806 25.4179 6.45854 25.5393C6.53949 25.7822 13.6632 25.8429 15.8894 25.6C17.5894 25.4381 21.0096 24.7905 21.7989 24.4667C22.5274 24.2036 22.6286 23.7989 22.3655 22.3013C22.1429 21.006 21.1108 19.0025 20.4024 18.4561C20.0786 18.193 19.3096 17.8084 15.7882 16.1287L14.5537 15.5418L15.2823 14.0644C15.687 13.2752 16.2942 12.2228 16.5977 11.7371C17.3465 10.6442 17.6299 9.04544 17.2453 8.17521C17.0834 7.83117 16.9013 6.75856 16.8406 5.78714C16.6382 2.54908 15.4846 0.909811 12.874 0.181248C11.8823 -0.0818443 10.4859 -0.0616074 9.41327 0.262199Z" fill="#ECECEC"/>
                </svg>
              </div>
            </button>
            <button
              onClick={() => router.push('/lk')}
              className="flex items-center justify-center pt-9 transition-all hover:opacity-90"
            >
              <img src="/create_char/fast_game.svg" alt="Быстрая игра" className="h-auto w-auto" />
            </button>
            <button
              onClick={() => router.push('/lk')}
              className="flex items-center justify-center transition-all hover:opacity-90"
              aria-label="Быстрая игра"
            >
            </button>
            
          </nav>

          <button 
            className="md:hidden text-white p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6H20M4 12H20M4 18H20" />
            </svg>
          </button>
        </div>
      </div>
      <button className="absolute right-5 top-1/2 -translate-y-1/2 flex items-center justify-center hover:opacity-90" type="button">
        <img src="/create_char/name/LightGraySettings.svg" alt="Настройки" className="h-auto w-auto" />
      </button>
    </header>
  );
};

export default CreateCharHeader;