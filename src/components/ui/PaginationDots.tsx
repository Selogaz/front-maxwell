import React from 'react';

interface PaginationDotsProps {
  count: number;
  currentIndex: number;
  onChange?: (index: number) => void;
  className?: string;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  count,
  currentIndex,
  onChange,
  className = '',
}) => {
  return (
    <div className={`flex justify-center gap-2 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          onClick={() => onChange?.(index)}
          disabled={index === currentIndex}
          className={`w-2 h-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#66AAA5] ${
            index === currentIndex ? 'bg-[#66AAA5]' : 'bg-[#334155] hover:bg-[#475569] cursor-pointer'
          }`}
          aria-label={`Перейти к слайду ${index + 1}`}
        />
      ))}
    </div>
  );
};
