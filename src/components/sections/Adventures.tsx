'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Skeleton } from '@/components/ui/Skeleton';
import { ArrowButton } from '@/components/ui/ArrowButton';
import { PaginationDots } from '@/components/ui/PaginationDots';
import { useAdventures } from '@/hooks/useAdventures';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '@/components/ui/LoginModal';
import RegisterModal from '@/components/ui/RegisterModal';
import ResetPasswordModal from '@/components/ui/ResetPasswordModal';

const Adventures: React.FC = () => {
  const { data, loading, error } = useAdventures();
  const { isAuthenticated } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  const handlePlayClick = () => {
    if (isAuthenticated) {
      window.location.href = '/lk';
    } else {
      setIsLoginOpen(true);
    }
  };

  const stories = data?.adventures ?? [];

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  const getVisibleIndexes = () => {
    if (stories.length === 0) return [];
    const prevIndex = currentIndex === 0 ? stories.length - 1 : currentIndex - 1;
    const nextIndex = currentIndex === stories.length - 1 ? 0 : currentIndex + 1;
    return [prevIndex, currentIndex, nextIndex];
  };

  const visibleIndexes = getVisibleIndexes();

  if (loading) {
    return (
      <Section background="dark">
        <div className="text-center mb-12">
          <Skeleton className="mx-auto mb-4" width="192px" height="40px" />
          <Skeleton className="mx-auto" width="256px" height="24px" />
        </div>
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <Skeleton variant="circle" width="40px" height="40px" />
          <div className="flex items-center gap-2 md:gap-4">
            <Skeleton width="192px" height="256px" />
            <Skeleton width="256px" height="320px" />
            <Skeleton width="192px" height="256px" className="hidden md:block" />
          </div>
          <Skeleton variant="circle" width="40px" height="40px" />
        </div>
        <PaginationDots count={3} currentIndex={0} onChange={() => {}} className="mt-8" />
        <div className="flex justify-center mt-8">
          <Skeleton width="192px" height="48px" />
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section background="dark">
        <p className="text-center text-[#64748B]">Не удалось загрузить приключения</p>
      </Section>
    );
  }

  if (!data || !data.adventures || data.adventures.length === 0) {
    return (
      <Section background="dark">
        <p className="text-center text-[#64748B]">Приключения пока недоступны</p>
      </Section>
    );
  }

  return (
    <Section background="dark">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-firenight font-bold text-white mb-4">
          {data.title}
        </h2>
        <p className="text-lg text-[#94A3B8]">
          {data.subtitle}
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 md:gap-4">
        <ArrowButton direction="left" onClick={prev} />

        <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
          {visibleIndexes.map((index, visibleIndex) => {
            const isCenter = visibleIndex === 1;
            return (
              <div
                key={stories[index].id}
                className={`bg-[#0F172A] rounded-2xl overflow-hidden border border-[#334155] ${
                  isCenter
                    ? 'w-64 h-80 flex-shrink-0'
                    : 'w-48 h-64 flex-shrink-0 opacity-60 hidden md:block'
                }`}
              >
                <div className={`bg-[#1E293B] ${isCenter ? 'h-48' : 'h-32'} flex items-center justify-center`}>
                  <svg width={isCenter ? 48 : 32} height={isCenter ? 48 : 32} viewBox="0 0 48 48" fill="none" className="text-[#334155]">
                    <rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2"/>
                    <path d="M24 16V32M16 24H32" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="p-3 text-center">
                  <h3 className={`font-semibold text-white ${isCenter ? 'text-base' : 'text-sm'}`}>
                    {stories[index].name}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        <ArrowButton direction="right" onClick={next} />
      </div>

      <PaginationDots count={stories.length} currentIndex={currentIndex} onChange={setCurrentIndex} className="mt-8" />

      <div className="flex justify-center mt-8">
        <Button size="lg" onClick={handlePlayClick}>{data.ctaButton.text}</Button>
      </div>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenResetPassword={() => setIsResetPasswordOpen(true)}
      />
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />
      <ResetPasswordModal
        isOpen={isResetPasswordOpen}
        onClose={() => setIsResetPasswordOpen(false)}
        onOpenLogin={() => setIsLoginOpen(true)}
      />
    </Section>
  );
};

export default Adventures;