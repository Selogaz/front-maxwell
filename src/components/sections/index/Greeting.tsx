'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Skeleton } from '@/components/ui/Skeleton';
import { VideoPlaceholder } from '@/components/ui/VideoPlaceholder';
import { useGreeting } from '@/hooks/useGreeting';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '@/components/ui/LoginModal';
import RegisterModal from '@/components/ui/RegisterModal';
import ResetPasswordModal from '@/components/ui/ResetPasswordModal';

const Greeting: React.FC = () => {
  const { data, loading, error } = useGreeting();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
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

  if (loading) {
    return (
      <Section background="dark">
        <div className="text-center max-w-2xl mx-auto">
          <Skeleton className="mx-auto mb-6" width="256px" height="48px" />
          <Skeleton className="mx-auto mb-8" width="384px" height="24px" />
          <VideoPlaceholder className="mb-8" />
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Skeleton width="128px" height="48px" />
            <Skeleton width="192px" height="48px" />
          </div>
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section background="dark">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[#64748B]">Не удалось загрузить приветствие</p>
        </div>
      </Section>
    );
  }

  if (!data || !data.title) {
    return (
      <Section background="dark">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-[#64748B]">Приветствие временно недоступно</p>
        </div>
      </Section>
    );
  }

  return (
    <Section background="dark">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-firenight font-bold text-white mb-6 leading-tight">
          {data.title}
        </h1>
        <p className="text-lg md:text-xl text-[#94A3B8] mb-8">
          {data.description}
        </p>
        <VideoPlaceholder label={data.videoPlaceholder.label} className="mb-8" />
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={handlePlayClick}>{data.ctaButtons.primary.text}</Button>
          <Button size="lg" variant="secondary" onClick={() => setIsRegisterOpen(true)}>{data.ctaButtons.secondary.text}</Button>
        </div>
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

export default Greeting;