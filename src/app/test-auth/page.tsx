'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

export default function TestAuthPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastError, setLastError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsLoggedIn(params.get('loggedin') === '1');
  }, []);

  const handleLogin = async () => {
    setError('');
    setIsLoading(true);
    setLastError(null);

    try {
      await fetch('/api/auth/login?test=true', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      window.location.href = '/test-auth?loggedin=1';
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка входа';
      setError(message);
      setLastError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setError('');
    setIsLoading(true);
    setLastError(null);

    try {
      await fetch('/api/auth/register?test=true', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      window.location.href = '/test-auth?loggedin=1';
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка регистрации';
      setError(message);
      setLastError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const testError = (errorCode: string) => {
    setError('');
    setIsLoading(true);
    setLastError(null);

    let promise: Promise<Response>;

    switch (errorCode) {
      case '401':
        promise = fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'invalid@invalid.invalid', password: 'invalid' }),
        }).then(r => { throw new Error('Неверные учетные данные'); return r; });
        break;
      case '400':
        promise = fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: '', password: '' }),
        }).catch(() => { throw new Error('Ошибка валидации'); return new Response('', { status: 400 }); });
        break;
      case '409':
        promise = fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: 'test@test.com', password: 'password' }),
        }).catch(() => { throw new Error('email_already_used'); return new Response('', { status: 400 }); });
        break;
      case '500':
        promise = fetch('/api/nonexistent').then(r => { throw new Error('Внутренняя ошибка сервера'); return r; });
        break;
      default:
        setIsLoading(false);
        return;
    }

    promise
      .catch((err) => {
        setError(err.message);
        setLastError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0F172A] p-8">
        <h1 className="text-3xl font-firenight text-white mb-8">Тест авторизации</h1>
        <div className="bg-[#1E293B] p-6 rounded-2xl max-w-md">
          <p className="text-green-400 text-xl mb-4">✓ Вход выполнен успешно!</p>
          <p className="text-[#94A3B8]">Сессия установлена, cookie работает.</p>
          <a href="/test-auth" className="text-[#66AAA5] hover:underline mt-4 block">Назад</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F172A] p-8">
      <h1 className="text-3xl font-firenight text-white mb-8">Тест авторизации</h1>
      
      <div className="bg-[#1E293B] p-6 rounded-2xl max-w-md mb-6">
        <p className="text-[#94A3B8] mb-4">
          Тестовый режим API — принимает любые данные
        </p>
        
        <div className="space-y-4 mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-[#0F172A] text-white border border-[#475569]"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
            className="w-full px-4 py-2 rounded-lg bg-[#0F172A] text-white border border-[#475569]"
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        <div className="flex gap-2">
          <Button onClick={handleLogin} disabled={isLoading}>
            {isLoading ? 'Загрузка...' : 'Войти'}
          </Button>
          <Button onClick={handleRegister} disabled={isLoading} variant="secondary">
            Регистрация
          </Button>
        </div>
      </div>

      <div className="bg-[#1E293B] p-6 rounded-2xl max-w-md">
        <h2 className="text-xl font-firenight text-white mb-4">Тестирование ошибок</h2>
        <p className="text-[#94A3B8] text-sm mb-4">
          Нажми кнопку, чтобы эмулировать ошибку:
        </p>
        <div className="flex flex-wrap gap-2">
          <Button 
            onClick={() => testError('401')} 
            variant="ghost" 
            size="sm"
            disabled={isLoading}
          >
            401 Неверные данные
          </Button>
          <Button 
            onClick={() => testError('409')} 
            variant="ghost" 
            size="sm"
            disabled={isLoading}
          >
            409 Email занят
          </Button>
          <Button 
            onClick={() => testError('400')} 
            variant="ghost" 
            size="sm"
            disabled={isLoading}
          >
            400 Валидация
          </Button>
          <Button 
            onClick={() => testError('500')} 
            variant="ghost" 
            size="sm"
            disabled={isLoading}
          >
            500 Ошибка сервера
          </Button>
        </div>
        {lastError && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm">Последняя ошибка: {lastError}</p>
          </div>
        )}
      </div>
    </div>
  );
}
