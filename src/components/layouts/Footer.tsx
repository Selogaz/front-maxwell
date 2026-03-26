'use client';

import React from 'react';
import Image from 'next/image';
import { useFooter } from '@/hooks/useFooter';

const Footer: React.FC = () => {
  const { data, loading, error } = useFooter();

  if (loading) {
    return (
      <footer className="bg-[#0F172A] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden flex gap-4 mb-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-1/3 h-16 bg-[#334155] rounded-lg animate-pulse" />
            ))}
          </div>
          <div className="flex items-center justify-center">
            <div className="h-10 w-48 bg-[#334155] rounded animate-pulse" />
          </div>
        </div>
      </footer>
    );
  }

  if (error || !data) {
    return null;
  }

  return (
    <footer className="bg-[#0F172A] py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden flex gap-4 mb-6">
          {data.images.map((image) => (
            <div key={image.id} className="w-1/3 h-16 bg-[#1E293B] rounded-lg flex items-center justify-center">
              {image.src ? (
                <Image src={image.src} alt={image.label} width={100} height={40} className="h-full w-auto object-contain" />
              ) : (
                <span className="text-[#64748B] text-sm">{image.label}</span>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center">
          <Image src={data.logo.src} alt={data.logo.alt} width={data.logo.width} height={data.logo.height} className="h-10 w-auto" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
