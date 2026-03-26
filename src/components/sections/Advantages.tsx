'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { Section } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/Skeleton';
import { useAdvantages } from '@/hooks/useAdvantages';
import { getIcon } from '@/lib/icons';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '@/components/ui/LoginModal';
import RegisterModal from '@/components/ui/RegisterModal';
import ResetPasswordModal from '@/components/ui/ResetPasswordModal';

const Advantages: React.FC = () => {
  const { data, loading, error } = useAdvantages();
  const { isAuthenticated } = useAuth();
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

  if (loading) {
    return (
      <Section background="dark">
        <Skeleton className="mx-auto mb-12" width="256px" height="40px" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <Skeleton className="mx-auto mb-5" variant="circle" width="64px" height="64px" />
              <Skeleton className="mx-auto mb-2" width="160px" height="24px" />
              <Skeleton className="mx-auto" width="192px" height="16px" />
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mt-6">
          <Skeleton height="48px" />
          <Skeleton height="48px" />
        </div>
      </Section>
    );
  }

  if (error) {
    return (
      <Section background="dark">
        <p className="text-center text-[#64748B]">Не удалось загрузить преимущества</p>
      </Section>
    );
  }

  if (!data || !data.items || data.items.length === 0) {
    return (
      <Section background="dark">
        <p className="text-center text-[#64748B]">Преимущества пока недоступны</p>
      </Section>
    );
  }

  const leftItems = data.items.slice(0, 2);
  const rightItems = data.items.slice(2, 4);

  return (
    <Section background="dark">
      <h2 className="text-3xl md:text-4xl font-firenight font-bold text-white text-center mb-12">
        {data.title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <div className="flex flex-col gap-6">
          {leftItems.map((item) => (
            <Card key={item.id} variant="bordered" className="flex-1 text-center">
              <div className="w-16 h-16 bg-[#1E293B] rounded-xl flex items-center justify-center mx-auto mb-5">
                {getIcon(item.iconName)}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-[#94A3B8] text-sm">
                {item.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {rightItems.map((item) => (
            <Card key={item.id} variant="bordered" className="flex-1 text-center">
              <div className="w-16 h-16 bg-[#1E293B] rounded-xl flex items-center justify-center mx-auto mb-5">
                {getIcon(item.iconName)}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-[#94A3B8] text-sm">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto mt-6">
        <Button size="lg" onClick={handlePlayClick}>{data.ctaButtons.primary.text}</Button>
        <Button size="lg" variant="secondary" onClick={() => setIsRegisterOpen(true)}>{data.ctaButtons.secondary.text}</Button>
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

export default Advantages;