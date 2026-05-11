'use client';

import React from 'react';
import Image from 'next/image';

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

const CharacterBackButton: React.FC<Props> = ({ onClick, disabled }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className="transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed relative w-16.5 h-16.5 backdrop-blur-[5px]"
  >
    <Image src="/create_char/back_button_background.svg" alt="" fill className="object-contain pointer-events-none" unoptimized />
    <Image src="/create_char/back_button.svg" alt="Назад" width={20} height={20} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" unoptimized />
  </button>
);

export default CharacterBackButton;
