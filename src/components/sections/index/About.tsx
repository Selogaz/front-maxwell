'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Skeleton } from '@/components/ui/Skeleton';
import { ArrowButton } from '@/components/ui/ArrowButton';
import { PaginationDots } from '@/components/ui/PaginationDots';
import { useAbout } from '@/hooks/useAbout';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '@/components/ui/LoginModal';
import RegisterModal from '@/components/ui/RegisterModal';
import ResetPasswordModal from '@/components/ui/ResetPasswordModal';

const About: React.FC = () => {
  const { data, loading, error } = useAbout();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  const handlePlayClick = () => {
    if (isAuthenticated) {
      router.push('/lk');
    } else {
      setIsLoginOpen(true);
    }
  };

  const videos = data?.videos ?? [];

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  const next = () => {
    setCurrentIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <Section background="light" id="about">
        <Skeleton className="mx-auto mb-12" width="256px" height="40px" />
        <div className="flex flex-col items-center gap-8">
          <div className="flex items-center gap-4 w-full max-w-3xl">
            <Skeleton variant="circle" width="40px" height="40px" />
            <div className="flex-1 aspect-video bg-[#1E293B] rounded-xl border border-[#334155]" />
            <Skeleton variant="circle" width="40px" height="40px" />
          </div>
          <PaginationDots count={3} currentIndex={0} onChange={() => {}} />
          <Skeleton width="192px" height="48px" />
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section background="light" id="about">
        <p className="text-center text-[#64748B]">Не удалось загрузить информацию</p>
      </Section>
    );
  }

  if (!data || !data.videos || data.videos.length === 0) {
    return (
      <Section background="light" id="about">
        <p className="text-center text-[#64748B]">Видео пока недоступны</p>
      </Section>
    );
  }

  return (
    <Section background="light" id="about">
      <h2 className="text-3xl md:text-4xl font-firenight font-bold text-white text-center mb-12">
        {data.title}
      </h2>

      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center gap-4 w-full max-w-3xl">
          <ArrowButton direction="left" onClick={prev} />

          <div className="flex-1 aspect-video bg-[#1E293B] rounded-xl flex items-center justify-center border border-[#334155]">
            <div className="w-12 h-12 bg-[#334155] rounded-full flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2">
                <polygon points="5 3 19 12 5 21 5 3" fill="#94A3B8" />
              </svg>
            </div>
          </div>

          <ArrowButton direction="right" onClick={next} />
        </div>

          <PaginationDots count={videos.length} currentIndex={currentIndex} onChange={setCurrentIndex} />

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

export default About;