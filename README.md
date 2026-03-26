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

### Подготовка к интеграции
Реализовано:
- API структура с типами, сервисами и хуками для каждой секции
- API Routes (greeting, header, footer, about, adventures, advantages, pricing)
- Авторизация через React Context (AuthContext)
- Глобальное состояние доступно через контекст
- Структура для интеграции Websocket-логики: **не реализована**

## Структура проекта

```
src/
├── app/                 # Next.js App Router
│   ├── api/            # API Routes
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