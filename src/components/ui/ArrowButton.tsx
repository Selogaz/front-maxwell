import React from 'react';

interface ArrowButtonProps {
  direction: 'left' | 'right';
  onClick: () => void;
  className?: string;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction,
  onClick,
  className = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 w-10 h-10 bg-[#0F172A] hover:bg-[#334155] focus:outline-none focus:ring-2 focus:ring-[#66AAA5] rounded-full flex items-center justify-center transition-colors ${className}`}
    >
      <svg 
        width="20" 
        height="20" 
        viewBox="0 0 20 20" 
        fill="none" 
        stroke="#94A3B8" 
        strokeWidth="2"
      >
        {direction === 'left' ? (
          <path d="M12 15L7 10L12 5" />
        ) : (
          <path d="M8 5L13 10L8 15" />
        )}
      </svg>
    </button>
  );
};
