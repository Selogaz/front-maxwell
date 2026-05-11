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
- CharacterRaceStep — экран выбора расы с динамическим названием и описанием
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
│   │   │   ├── register/route.ts     # POST: Регистрация пользователя
│   │   │   ├── login/route.ts       # POST/GET: Вход/проверка сессии
│   │   │   ├── refresh/route.ts      # POST: Обновление сессии
│   │   │   └── logout/route.ts      # POST: Выход из аккаунта
│   │   ├── me/route.ts              # GET: Получить текущего пользователя
│   │   ├── header/route.ts          # GET: Данные для шапки
│   │   ├── greeting/route.ts        # GET: Приветственный блок
│   │   ├── about/route.ts         # GET: Блок "О проекте"
│   │   ├── adventures/route.ts     # GET: Приключения (карусель)
│   │   ├── advantages/route.ts     # GET: Преимущества
│   │   ├── pricing/route.ts         # GET: Тарифы
│   │   └── footer/route.ts         # GET: Подвал
│   ├── (index)/        # Группа главной страницы
│   │   ├── layout.tsx                # Layout главной страницы
│   │   └── page.tsx                 # Главная страница
│   ├── (lk)/          # Группа ЛК
│   │   ├── layout.tsx                # Layout для ЛК
│   │   └── lk/page.tsx            # Страница личного кабинета
│   ├── (game)/game/    # Группа игровых страниц
│   │   ├── layout.tsx           # Layout для игровых страниц
│   │   ├── create/page.tsx       # Создание игры (выбор параметров)
│   │   ├── character/
│   │   │   ├── layout.tsx       # Layout для создания персонажа
│   │   │   ├── page.tsx         # Главная страница создания персонажа
│   │   │   └── sections/
│   │   │       ├── CharacterStepsNav.tsx              # Навигация по этапам (кружочки 1-8)
│   │   │       ├── CharacterStepsMenu.tsx             # Левое меню с этапами
│   │   │       ├── CharacterStepContent.tsx           # Контент текущего этапа
│   │   │       ├── CharacterStatsPanel.tsx           # Правая панель с характеристиками
│   │   │       ├── CharacterPreviewCard.tsx          # Карточка превью персонажа
│   │   │       ├── CharacterNameStep.tsx            # Этап: Имя персонажа
│   │   │       ├── CharacterGenderStep.tsx             # Этап: Пол персонажа
│   │   │       ├── CharacterRaceStep.tsx               # Этап: Выбор расы (desktop)
│   │   │       ├── CharacterRaceStepMobile.tsx        # Этап: Выбор расы (mobile)
│   │   │       ├── CharacterSubRaceStep.tsx          # Этап: Выбор подрасы (desktop)
│   │   │       ├── CharacterSubRaceStepMobile.tsx   # Этап: Выбор подрасы (mobile)
│   │   │       ├── CharacterClassStep.tsx            # Этап: Выбор класса (desktop)
│   │   │       ├── CharacterClassStepMobile.tsx       # Этап: Выбор класса (mobile)
│   │   │       ├── CharacterOriginStep.tsx          # Этап: Выбор происхождения (desktop)
│   │   │       ├── CharacterOriginStepMobile.tsx     # Этап: Выбор происхождения (mobile)
│   │   │       ├── CharacterStatsStep.tsx             # Этап: Характеристики (desktop)
│   │   │       ├── CharacterStatsStepMobile.tsx        # Этап: Характеристики (mobile)
│   │   │       ├── CharacterSpellsStep.tsx            # Этап: Заклинания (desktop)
│   │   │       ├── CharacterSpellsStepMobile.tsx     # Этап: Заклинания (mobile)
│   │   │       ├── CharacterCreationHeader.tsx        # Шапка "Создание персонажа"
│   │   │       └── ClassIconInline.tsx               # Иконка класса (inline)
│   │   ├── join/page.tsx            # Присоединение к игре
│   │   └── continue/page.tsx      # Продолжить игру
│   ├── test-auth/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── providers.tsx
│   ├── fonts.ts
│   └── globals.css
├── components/
│   ├── layouts/        # Layout компоненты
│   │   ├── Header.tsx              # Шапка с навигацией и модальными окнами
│   │   ├── Footer.tsx               # Подвал с логотипом и ссылками
│   │   ├── CreateCharHeader.tsx         # Шапка создания персонажа
│   │   └── DefaultLayout.tsx          # Дефолтный layout (заготовка)
│   ├── sections/       # Секции страниц
│   │   ├── index/     # Главная страница
│   │   │   ├── Greeting.tsx           # Приветственный блок с видео
│   │   │   ├── About.tsx              # "Как это работает?" с видео
│   │   │   ├── Adventures.tsx          # Карусель приключений
│   │   │   ├── Advantages.tsx          # Преимущества в 2 столбика
│   │   │   └── Pricing.tsx             # Тарифы (3 плана)
│   │   ├── lk/       # Личный кабинет
│   │   │   ├── Sidebar.tsx             # Боковое меню навигации
│   │   │   ├── Tabs/
│   │   │   │   ├── Profile.tsx            # Вкладка профиля
│   │   │   │   └── Settings.tsx      # Вкладка настроек
│   │   │   └── modals/
│   │   │       ├── LogoutModal.tsx      # Модальное окно выхода
│   │   │       └── PlayGameModal.tsx   # Модальное окно "Играть"
│   │   └── game/
│   │       └── CharacterMenu.tsx         # Меню персонажа
│   └── ui/             # Переиспользуемые UI компоненты
│       ├── Button.tsx                 # Кнопка (primary/secondary/ghost)
│       ├── Card.tsx                  # Карточка
│       ├── Input.tsx                  # Поле ввода
│       ├── Modal.tsx                  # Модальное окно
│       ├── Section.tsx                # Секция контента
│       ├── Skeleton.tsx               # Загрузочный скелетон
│       ├── VideoPlaceholder.tsx         # Заглушка видео
│       ├── ArrowButton.tsx             # Кнопка со стрелкой
│       ├── PaginationDots.tsx          # Точки пагинации
│       ├── LoginModal.tsx             # Модальное окно входа
│       ├── RegisterModal.tsx          # Модальное окно регистрации
│       └── ResetPasswordModal.tsx      # Модальное окно сброса пароля
├── context/            # React Context
│   └── AuthContext.tsx
├── hooks/              # Кастомные хуки
│   ├── useHeader.ts
│   ├── useGreeting.ts
│   ├── useAbout.ts
│   ├── useAdventures.ts
│   ├── useAdvantages.ts
│   ├── usePricing.ts
│   ├── useFooter.ts
│   └── useCharacter.ts
├── lib/                # Утилиты
│   └── icons.tsx
├── services/           # API сервисы
│   ├── auth.ts
│   ├── header.ts
│   ├── greeting.ts
│   ├── about.ts
│   ├── adventures.ts
│   ├── advantages.ts
│   ├── pricing.ts
│   ├── footer.ts
│   └── character.ts
└── types/             # TypeScript типы
    ├── auth.ts
    ├── header.ts
    ├── greeting.ts
    ├── about.ts
    ├── adventures.ts
    ├── advantages.ts
    ├── pricing.ts
    ├── footer.ts
    └── character.ts
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
