import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'bordered';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
}) => {
  const variantClass = variant === 'bordered' 
    ? 'border border-[#334155]' 
    : '';

  return (
    <div className={`bg-[#0F172A] rounded-2xl p-6 ${variantClass} ${className}`}>
      {children}
    </div>
  );
};
