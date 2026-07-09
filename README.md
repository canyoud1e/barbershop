# NOIR Barbershop — Сайт

Современный сайт премиального барбершопа.

## Стек

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS v3**
- **Jest + React Testing Library** (unit-тесты)

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Скрипты

```bash
npm run dev          # Дев-сервер
npm run build        # Продакшн сборка
npm run type-check   # Проверка TypeScript
npm run test         # Запуск тестов
npm run test:watch   # Тесты в watch-режиме
npm run test:coverage # Тесты с покрытием
```

## Структура проекта

```
app/
├── layout.tsx       — корневой layout + SEO
├── page.tsx         — главная страница
└── globals.css      — стили + Tailwind

components/
├── ui/              — Button, SectionTitle, Badge
├── layout/          — Header, Footer
└── sections/        — Hero, Services, Masters, Gallery, Booking, Contacts

lib/
├── types.ts         — TypeScript интерфейсы
├── constants.ts     — статические данные
└── utils.ts         — утилиты (форматирование, валидация)

hooks/
├── useBookingForm.ts
└── useScrollPosition.ts

__tests__/
├── utils.test.ts
├── useBookingForm.test.ts
└── constants.test.ts
```

## Цветовая палитра

| Цвет | Значение |
|------|----------|
| Фон | `#080808` |
| Поверхность | `#101010` |
| Карточки | `#181818` |
| Акцент | `#E8E8E8` (off-white/silver) |
| Текст | `#F2F2F2` |
| Текст secondary | `#AAAAAA` |
| Текст muted | `#666666` |
| Граница | `#282828` |
