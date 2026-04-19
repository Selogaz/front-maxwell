'use client';

import React from 'react';

interface CharacterCreationHeaderProps {
  onRandomize: () => void;
  onBack: () => void;
}

const CharacterCreationHeader: React.FC<CharacterCreationHeaderProps> = ({
  onRandomize,
  onBack,
}) => {
  return (
    <div className="bg-[#020106] border-b border-[rgba(255,255,255,0.05)]">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-[rgba(255,255,255,0.1)] transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d="M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <h1 className="text-3xl font-firenight text-[#FFEED5]">
              Создание персонажа
            </h1>
          </div>

          <button
            onClick={onRandomize}
            className="
              flex items-center gap-2 px-4 py-2 
              bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] 
              rounded-lg hover:bg-[rgba(102,170,165,0.2)] hover:border-[#66AAA5]/50 
              transition-all
            "
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#66AAA5]">
              <path d="M16 3H21V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 20L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M21 16V21H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M15 15L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 4L9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-white font-jost">Случайная</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterCreationHeader;