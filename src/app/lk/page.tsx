'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import LKSidebar from '@/components/sections/lk/Sidebar';
import ProfileTab from '@/components/sections/lk/Tabs/Profile';
import SettingsTab from '@/components/sections/lk/Tabs/Settings';
import LogoutModal from '@/components/sections/lk/modals/LogoutModal';
import Button from '@/components/ui/Button';

interface Tab {
  id: string;
  label: string;
  icon: 'play' | 'user' | 'settings' | 'shop' | 'support';
}

const tabs: Tab[] = [
  { id: 'play', label: 'Играть', icon: 'play' },
  { id: 'profile', label: 'Мой профиль', icon: 'user' },
  { id: 'shop', label: 'Магазин', icon: 'shop' },
  { id: 'support', label: 'Техподдержка', icon: 'support' },
  { id: 'settings', label: 'Настройки', icon: 'settings' },
];

const LKPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('play');
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [balance] = useState(1000);

  const userName = user?.name || 'Тест Пользователь';

  const handleSave = () => {
    console.log('Save changes:', { name, email, password });
  };

  const handleLogout = () => {
    logout();
    setShowLogoutModal(false);
    window.location.href = '/';
  };

  const handleTabChange = (tabId: string) => {
    if (tabId === 'shop') {
      window.location.href = '/shop';
    } else {
      setActiveTab(tabId);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'play':
        return (
          <div className="text-center py-12">
            <h3 className="text-2xl font-firenight text-white mb-4">Начать игру</h3>
            <p className="text-[#94A3B8] mb-6">Выберите приключение и погрузитесь в мир Подземелий Максвелла</p>
            <Button size="lg">Начать приключение</Button>
          </div>
        );
      case 'profile':
        return (
          <ProfileTab
            name={name}
            email={email}
            password={password}
            onNameChange={setName}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSave={handleSave}
          />
        );
      case 'settings':
        return <SettingsTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-[#1E293B] rounded-2xl p-6 mb-6 relative overflow-hidden border border-[#66AAA5]/30 shadow-[0_0_40px_rgba(102,170,165,0.15)]">
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#66AAA5] to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#66AAA5]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#66AAA5]/3 to-transparent pointer-events-none" />
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex-shrink-0">
                <Image 
                  src="/logo.svg" 
                  alt="Логотип" 
                  width={40} 
                  height={40}
                  className="w-10 h-10"
                />
              </Link>
              <h1 className="text-2xl font-firenight font-bold text-white">
                Личный кабинет
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.location.href = '/shop'}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#0F172A] border border-[#475569] hover:border-[#66AAA5] hover:shadow-[0_0_15px_rgba(102,170,165,0.2)] transition-all"
              >
                <div className="flex items-center gap-1.5">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-[#FFD700]">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <text x="12" y="16" textAnchor="middle" fill="currentColor" fontSize="10" fontWeight="bold">M</text>
                  </svg>
                  <span className="text-white font-medium">{balance}</span>
                </div>
                <div className="flex items-center gap-1 text-[#66AAA5]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  <span className="text-sm">Пополнить</span>
                </div>
              </button>

              <button
                onClick={() => setShowLogoutModal(true)}
                className="px-4 py-2 rounded-lg bg-[#0F172A] border border-[#475569] text-[#94A3B8] hover:text-white hover:border-[#EF4444] hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all"
              >
                Выйти
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6 mb-6">
          <div className="flex gap-6">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-xl overflow-hidden bg-[#0F172A] flex items-center justify-center border border-[#334155]">
                <Image 
                  src="/logo.svg" 
                  alt="Аватар" 
                  width={64} 
                  height={64}
                  className="w-16 h-16"
                />
              </div>
              <p className="mt-3 text-lg font-semibold text-[#66AAA5]">{userName}</p>
            </div>

            <LKSidebar 
              tabs={tabs} 
              activeTab={activeTab} 
              onTabChange={handleTabChange}
            />
          </div>
        </div>

        <div className="bg-[#1E293B] rounded-2xl p-6">
          {renderTabContent()}
        </div>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
};

export default LKPage;