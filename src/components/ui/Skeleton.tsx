import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'box' | 'circle' | 'rect';
  width?: string;
  height?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'box',
  width,
  height,
}) => {
  const baseClass = 'animate-pulse bg-[#334155]';
  
  const variantClass = {
    text: 'rounded',
    box: 'rounded-lg',
    circle: 'rounded-full',
    rect: 'rounded-lg',
  }[variant];

  const style: React.CSSProperties = {
    width: width || (variant === 'circle' ? '40px' : '100%'),
    height: height || (variant === 'text' ? '24px' : variant === 'circle' ? '40px' : '100%'),
  };

  return (
    <div 
      className={`${baseClass} ${variantClass} ${className}`}
      style={style}
    />
  );
};

export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({ 
  lines = 1, 
  className = '' 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          variant="text" 
          width={i === lines - 1 ? '60%' : '100%'} 
          height="20px"
        />
      ))}
    </div>
  );
};
