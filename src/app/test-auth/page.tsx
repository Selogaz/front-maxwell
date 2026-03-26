'use client';

import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';

export default function AuthTestPage() {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleLogin = () => {
    login({ id: '1', email: 'test@test.com', name: 'Тест Пользователь' });
  };

  return (
    <div className="min-h-screen bg-[#0F172A] p-8">
      <h1 className="text-3xl font-firenight text-white mb-8">Тест авторизации</h1>
      
      <div className="bg-[#1E293B] p-6 rounded-2xl max-w-md">
        <p className="text-[#94A3B8] mb-4">
          Статус: {isAuthenticated ? 'Авторизован' : 'Не авторизован'}
        </p>
        
        {user && (
          <div className="mb-4 p-4 bg-[#0F172A] rounded-lg">
            <p className="text-white">Имя: {user.name}</p>
            <p className="text-[#94A3B8]">Email: {user.email}</p>
          </div>
        )}

        {isAuthenticated ? (
          <Button onClick={logout}>Выйти</Button>
        ) : (
          <Button onClick={handleLogin}>Войти</Button>
        )}
      </div>
    </div>
  );
}