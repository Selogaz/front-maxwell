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
- Сложные страницы разбиты на секции в `components/sections/<page>/`

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

### Градиенты фона (game/character)
- Имя (name): h-28 + боковые градиенты + центр
- Пол (gender): только h-28 + фон #1a1a1a
- Раса (race): сплошной фон #020106 с картинками race.svg, characteristics.svg, теникмкыс 1.svg
- Подраса (subrace): аналогично Раса
- Класс (class): full_class.svg
- Происхождение (origin): full_origin.svg
- Характеристики (stats): full_characteristics.svg
- Заклинания (spells): full_spells.svg

### Компоненты создания персонажа
- CharacterStepsNav — навигация по этапам (кружочки 36x36)
- CharacterStepsMenu — левое меню
- CharacterStepContent — контент этапа
- CharacterRaceStep — экран выбора расы с фоновыми картинками и random кнопкой
- CharacterSubRaceStep — экран выбора подрасы
- CharacterClassStep — экран выбора класса
- CharacterOriginStep — экран выбора происхождения
- CharacterStatsStep — экран характеристик
- CharacterSpellsStep — экран заклинаний
- CharacterGenderStep — экран выбора пола с модальным окном
- CharacterNameStep — экран ввода имени

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
│   ├── (game)/game/    # Группа для игровых страниц
│   │   ├── character/ # Создание персонажа
│   │   │   └── sections/  # Секции создания персонажа
│   │   │       ├── CharacterStepsNav.tsx
│   │   │       ├── CharacterStepsMenu.tsx
│   │   │       ├── CharacterStepContent.tsx
│   │   │       ├── CharacterInfoModal.tsx
│   │   │       ├── CharacterStatsPanel.tsx
│   │   │       ├── CharacterPreviewCard.tsx
│   │   │       ├── CharacterNameStep.tsx
│   │   │       ├── CharacterGenderStep.tsx
│   │   │       ├── CharacterRaceStep.tsx
│   │   │       ├── CharacterSubRaceStep.tsx
│   │   │       ├── CharacterClassStep.tsx
│   │   │       ├── CharacterOriginStep.tsx
│   │   │       ├── CharacterStatsStep.tsx
│   │   │       ├── CharacterSpellsStep.tsx
│   │   │       └── CharacterCreationHeader.tsx
│   │   ├── create/page.tsx
│   │   ├── character/page.tsx
│   │   ├── join/page.tsx
│   │   └── continue/page.tsx
│   ├── lk/page.tsx
│   ├── test-auth/page.tsx
│   └── page.tsx
├── components/
│   ├── layouts/        # Header, Footer
│   ├── sections/       # Секции страниц
│   │   ├── index/     # Главная страница
│   │   │   ├── Greeting.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Adventures.tsx
│   │   │   ├── Advantages.tsx
│   │   │   └── Pricing.tsx
│   │   ├── lk/       # Личный кабинет
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Tabs/
│   │   │   │   ├── Profile.tsx
│   │   │   │   └── Settings.tsx
│   │   │   └── modals/
│   │   │       ├── LogoutModal.tsx
│   │   │       └── PlayGameModal.tsx
│   └── ui/             # Переиспользуемые компоненты
├── context/            # AuthContext для авторизации
├── hooks/              # Кастомные хуки для работы с API
├── lib/                # Утилиты (icons)
├── services/           # API сервисы
└── types/             # TypeScript типы
```

## Разбивка страниц на секции

Каждая сложная страница разбита на логические секции в `components/sections/<page>/`:

- **Главная страница** (`index/`) — Greeting, About, Adventures, Advantages, Pricing
- **Личный кабинет** (`lk/`) — Sidebar, Tabs, Modals
- **Создание персонажа** (`game/`) — StepsNav, StepsMenu, StepContent, StatsPanel, PreviewCard

Это обеспечивает:
- Чистоту кода и разделение ответственности
- Переиспользуемость компонентов
- Легкость поддержки и тестирования

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
- `/game/create` — Создание игры
- `/game/character` — Создание персонажа (8 этапов: Имя, Пол, Раса, Подраса, Класс, Происхождение, Характеристики, Заклинания)
- `/game/join` — Присоединение к игре (заглушка)
- `/game/continue` — Продолжить игру (заглушка)
- `/test-auth` — Тест авторизации

### Этапы создания персонажа
1. **Имя** — ввод имени персонажа
2. **Пол** — выбор пола (male/female)
3. **Раса** — выбор расы (CharacterRaceStep)
4. **Подраса** — выбор подрасы (CharacterSubRaceStep)
5. **Класс** — выбор класса (CharacterClassStep)
6. **Происхождение** — выбор происхождения (CharacterOriginStep)
7. **Характеристики** — распределение очков (CharacterStatsStep)
8. **Заклинания** — выбор заклинаний (CharacterSpellsStep)

Примечание: проект готов к подключению backend API. Для перехода на реальный API нужно заменить хардкод в сервисах на axios-запросы.
