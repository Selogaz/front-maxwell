'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useHeader } from '@/hooks/useHeader';
import { useAuth } from '@/context/AuthContext';
import LoginModal from '@/components/ui/LoginModal';
import RegisterModal from '@/components/ui/RegisterModal';
import ResetPasswordModal from '@/components/ui/ResetPasswordModal';

const Header: React.FC = () => {
  const { data, loading, error } = useHeader();
  const { isAuthenticated } = useAuth();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);

  if (loading) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1E293B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-[#334155] rounded animate-pulse" />
            </div>
            <div className="hidden md:flex items-center gap-1">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-20 h-8 bg-[#334155] rounded-lg animate-pulse" />
              ))}
            </div>
            <div className="w-32 h-8 bg-[#334155] rounded-lg animate-pulse" />
          </div>
        </div>
      </header>
    );
  }

  if (error || !data) {
    return null;
  }

  const navLinks = data.navLinks;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1E293B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image src={data.logo.src} alt={data.logo.alt} width={data.logo.width} height={data.logo.height} className="h-10 w-auto cursor-pointer" />
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isPlayButton = link.label === 'Играть';
              const isHowItWorks = link.label === 'Как это работает?';
              const isPricing = link.label === 'Цены';
              const isAdventures = link.label === 'Приключения';
              
              return (
                <button
                  key={link.label}
                  onClick={() => {
                    if (isPlayButton) {
                      if (isAuthenticated) {
                        window.location.href = '/lk';
                      } else {
                        setIsLoginOpen(true);
                      }
                    } else if (isHowItWorks) {
                      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                    } else if (isPricing) {
                      document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                    } else if (isAdventures) {
                      document.getElementById('adventures')?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isPlayButton
                      ? 'bg-[#66AAA5] text-white hover:bg-[#337360] shadow-[0_0_15px_rgba(102,170,165,0.3)] hover:shadow-[0_0_25px_rgba(102,170,165,0.5)]'
                      : link.isActive
                        ? 'bg-[#66AAA5] text-white'
                        : 'text-[#94A3B8] hover:text-white hover:bg-[#334155] hover:shadow-[0_0_10px_rgba(102,170,165,0.2)]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {isAuthenticated ? (
            <Link
              href="/lk"
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#334155] transition-colors hover:shadow-[0_0_10px_rgba(102,170,165,0.2)]"
            >
              {data.userMenu.label}
            </Link>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#94A3B8] hover:text-white hover:bg-[#334155] transition-colors hover:shadow-[0_0_10px_rgba(102,170,165,0.2)]"
            >
              {data.userMenu.label}
            </button>
          )}

          <button className="md:hidden text-white p-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6H20M4 12H20M4 18H20" />
            </svg>
          </button>
        </div>
      </div>

<nav className="md:hidden border-t border-[#334155]">
        <div className="flex flex-col px-4 py-2 gap-1">
          {navLinks.map((link) => {
            const isPlayButton = link.label === 'Играть';
            const isHowItWorks = link.label === 'Как это работает?';
            const isPricing = link.label === 'Цены';
            const isAdventures = link.label === 'Приключения';
            
            return (
              <button
                key={link.label}
                onClick={() => {
                  if (isPlayButton) {
                    if (isAuthenticated) {
                      window.location.href = '/lk';
                    } else {
                      setIsLoginOpen(true);
                    }
                  } else if (isHowItWorks) {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  } else if (isPricing) {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                  } else if (isAdventures) {
                    document.getElementById('adventures')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium text-left ${
                  isPlayButton
                    ? 'bg-[#66AAA5] text-white'
                    : link.isActive
                      ? 'bg-[#66AAA5] text-white'
                      : 'text-[#94A3B8] hover:text-white hover:bg-[#334155]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      </nav>

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
    </header>
  );
};

export default Header;
