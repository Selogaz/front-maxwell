import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  background?: 'dark' | 'light';
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  background = 'dark',
  className = '',
  id,
}) => {
  const bgClass = background === 'dark' ? 'bg-[#1E293B]' : 'bg-[#0F172A]';

  return (
    <section id={id} className={`${bgClass} py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};
