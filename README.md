# Подземелья Максвелла

Проект представляет собой онлайн-платформу для игры в «Подземелья и драконы» (Dungeons & Dragons, версия 5e), где роль Мастера выполняет искусственный интеллект

## Технологии

- **Frontend**: Next.js 16, React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Fonts**: Firenight (заголовки), Jost (текст)

## Соответствие ТЗ

### Компонентная верстка
Выполнено:
- Все повторяющиеся элементы вынесены в переиспользуемые React-компоненты (Button, Section, Card, Skeleton, ArrowButton, PaginationDots, VideoPlaceholder)
- Проект собирается через layouts, pages, sections, UI-components

### Адаптивность
Выполнено:
- Desktop-first подход
- Mobile-адаптация реализована для всех блоков
- Сложные блоки (карусели, сетки) перестраиваются на узких экранах

### Состояния интерфейса
Реализованы:
- hover (Button, ArrowButton, PaginationDots)
- focus (Button, ArrowButton, PaginationDots)
- active (Button)
- disabled (Button)
- error (все секции)
- loading (skeleton во всех секциях)
- empty states (Greeting, About, Advantages, Adventures, Pricing)
- success states **пока не применяется**

### Авторизация
Реализовано:
- API Routes для auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/refresh`, `/api/auth/logout`, `/api/me`
- AuthService с методами: register, login, logout, refresh, getMe
- AuthContext с login, logout, fetchUser, user, isAuthenticated
- LoginModal и RegisterModal с валидацией
- HttpOnly cookies для авторизации (credentials: 'include')
- Тестовая страница `/test-auth`

## Структура проекта

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API Routes
│   │   ├── auth/       # Auth API
│   │   │   ├── register/route.ts
│   │   │   ├── login/route.ts
│   │   │   ├── refresh/route.ts
│   │   │   └── logout/route.ts
│   │   └── me/route.ts
│   ├── lk/             # Страница личного кабинета
│   ├── test-auth/      # Тестовая страница авторизации
│   └── page.tsx        # Главная страница
├── components/
│   ├── layouts/        # Header, Footer
│   ├── sections/       # Секции страниц
│   │   ├── index/      # Главная страница
│   │   │   ├── Greeting.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Adventures.tsx
│   │   │   ├── Advantages.tsx
│   │   │   └── Pricing.tsx
│   │   └── lk/         # Личный кабинет
│   │       ├── Sidebar.tsx
│   │       ├── Tabs/
│   │       │   ├── Profile.tsx
│   │       │   └── Settings.tsx
│   │       └── modals/
│   │           └── LogoutModal.tsx
│   └── ui/             # Переиспользуемые компоненты
├── context/            # AuthContext для авторизации
├── hooks/              # Кастомные хуки для работы с API
├── lib/                # Утилиты (icons)
├── services/           # API сервисы
└── types/              # TypeScript типы
```

## API Авторизации

### Endpoints
- `POST /api/auth/register` — регистрация
- `POST /api/auth/login` — вход
- `POST /api/auth/refresh` — обновление сессии
- `POST /api/auth/logout` — выход
- `GET /api/me` — получение текущего пользователя

### Auth Service
```typescript
authService.register({ email, password, refCode? })
authService.login({ email, password })
authService.logout()
authService.refresh()
authService.getMe()
```

### Тестирование
1. Запустить `npm run dev`
2. Открыть `/test-auth` для тестирования авторизации
3. Использовать `?test=true` для тестового режима (при TEST_MODE = true)

### TEST_MODE
Для локального тестирования без реальной БД используется TEST_MODE:
- `TEST_MODE = false` — боевой режим (проверка users в БД)
- `TEST_MODE = true` — тестовый режим (принимает любые данные)

**Файлы:** register/route.ts, login/route.ts, me/route.ts

**Перед продакшеном:**
1. Переключить TEST_MODE = false
2. Удалить блоки `if (TEST_MODE)`
3. Убрать `?test=true` из test-auth

## Цветовая схема

- Primary: #66AAA5
- Primary Hover: #337360
- Background: #0F172A
- Surface: #1E293B
- Surface Light: #334155
- Text Primary: #FFFFFF
- Text Secondary: #94A3B8

## Страницы

- `/` — Главная страница
- `/lk` — Личный кабинет
- `/test-auth` — Тест авторизации

Примечание: проект готов к подключению backend API. Для перехода на реальный API нужно заменить хардкод в сервисах на axios-запросы.