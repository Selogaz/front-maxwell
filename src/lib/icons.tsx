import React from 'react';

const iconMap: Record<string, React.ReactNode> = {
  diamond: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-[#66AAA5]">
      <path d="M20 4L8 32H32L20 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M12 24H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <circle cx="20" cy="16" r="3" stroke="currentColor" strokeWidth="2"/>
      <path d="M6 34H34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  robot: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-[#66AAA5]">
      <rect x="8" y="12" width="24" height="18" rx="3" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="14" cy="18" r="2" fill="currentColor"/>
      <circle cx="26" cy="18" r="2" fill="currentColor"/>
      <path d="M14 24H26" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20 8V12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M16 6L20 8L24 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 30V34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  rocket: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-[#66AAA5]">
      <path d="M20 6L26 14H14L20 6Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      <rect x="17" y="14" width="6" height="20" rx="1" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M12 34H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="20" cy="22" r="2" fill="currentColor"/>
    </svg>
  ),
  clock: (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-[#66AAA5]">
      <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M20 12V20L26 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="10" cy="28" r="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="20" cy="32" r="3" stroke="currentColor" strokeWidth="2"/>
      <circle cx="30" cy="28" r="3" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
};

export const getIcon = (name: string): React.ReactNode => iconMap[name] || null;