'use client';

import React from 'react';
import Image from 'next/image';

interface CharacterInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageUrl?: string;
  description: string;
}

const CharacterInfoModal: React.FC<CharacterInfoModalProps> = ({
  isOpen,
  onClose,
  title,
  imageUrl,
  description,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      
      <div
        className="relative bg-[#1E293B] rounded-2xl border border-[#334155] max-w-lg w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#334155] hover:bg-[#475569] transition-colors flex items-center justify-center z-10"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="bg-[#0F172A] p-8 flex items-center justify-center">
          {imageUrl ? (
            <Image src={imageUrl} alt={title} width={128} height={128} className="w-32 h-32 object-cover rounded-xl" unoptimized />
          ) : (
            <div className="w-32 h-32 bg-[#334155] rounded-xl flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-[#475569]">
                <circle cx="24" cy="16" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="M8 40C8 32 15 26 24 26C33 26 40 32 40 40" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
          )}
        </div>

        <div className="p-6">
          <h3 className="text-2xl font-firenight font-bold text-white mb-4 text-center">
            {title}
          </h3>
          <p className="text-[#94A3B8] leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterInfoModal;
