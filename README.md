# Baktiyar uulu Marat — Portfolio

React + Vite портфолио. RU/EN, тема «нить пути», офлайн-режим, форма отправляет сообщения в Telegram через собственного бота.

## Запуск

```bash
npm install
npm run dev       # http://localhost:5173 — фронтенд; /api/contact работает только через vercel dev или на деплое
npm run build      # сборка в dist/
npm run preview    # локальный просмотр сборки
```

## Настройка формы обратной связи (Telegram)

Форма в разделе «Контакты» шлёт сообщения через serverless-функцию `api/contact.js` (Vercel Node function) в Telegram-бота — никакого стороннего email-сервиса, токен бота никогда не попадает в клиентский код.

1. В Telegram напиши **@BotFather** → `/newbot`, придумай имя и юзернейм (заканчивается на `bot`). Он пришлёт токен вида `123456789:AAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`.
2. Напиши что-нибудь новому боту (чтобы у него появился чат с тобой).
3. Забери свой `chat_id`: открой в браузере `https://api.telegram.org/bot<ТВОЙ_ТОКЕН>/getUpdates` — в JSON будет `"chat":{"id":ЧИСЛО, ...}`.
4. Скопируй `.env.local.example` в `.env.local` и заполни:

```
TELEGRAM_BOT_TOKEN=123456789:AAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TELEGRAM_CHAT_ID=123456789
```

Эти переменные — **без префикса `VITE_`**, специально: Vite встраивает `VITE_*` переменные в клиентский бандл, а токен бота должен остаться только на сервере (доступен исключительно внутри `api/contact.js`).

Без этих переменных форма покажет ошибку отправки (и подскажет написать в Telegram напрямую) — сайт при этом не падает.

## Деплой на Vercel

Preset: **Vite**, Root Directory: `/`. Vercel сам подхватит `api/contact.js` как serverless-функцию — ничего дополнительно настраивать не нужно. Добавь те же две переменные окружения в настройках проекта Vercel (Production + Preview + Development).

## Файлы, которые нужно положить вручную

Эти файлы не входят в репозиторий по смыслу (реальные личные данные) — без них соответствующие ссылки/изображения будут падать в плейсхолдер, но сайт не сломается:

- `public/cv-marat.pdf` — резюме для кнопки «Скачать резюме».
- `public/images/*.png` — скриншоты проектов (пути заданы в `src/data/projects.js`; при отсутствии файла карточка проекта показывает моно-плейсхолдер с названием).

## Как добавить проект

Открой `src/data/projects.js` и добавь объект в массив:

```js
{
  id: 8,
  title: 'Название',
  image: '/images/project-slug.png',
  featured: false,
  tags: ['code'], // 'code' | 'marketing' | 'ops' — управляет фильтром на странице
  techStack: ['React', 'Vite'],
  githubUrl: '',
  liveUrl: '',
  ru: { task: '...', solution: '...', result: '...' },
  en: { task: '...', solution: '...', result: '...' },
}
```

## Как добавить/изменить перевод

Все тексты интерфейса (кроме описаний проектов) лежат в `src/data/content.js` — объект `{ ru, en }`. Меняешь текст в обоих языках по одному и тому же пути (например, `hero.subtitle`).

Переключатель RU/EN в навбаре хранит выбор в `sessionStorage` (сбрасывается с закрытием вкладки) — это `src/context/LangContext.jsx`.

## Регенерация og-cover.png

`public/og-cover.png` сгенерирован скриптом `scripts/generate-og.mjs` через `sharp` (не входит в зависимости проекта, чтобы не раздувать `node_modules`). Чтобы перегенерировать:

```bash
npm install --no-save sharp
node scripts/generate-og.mjs
npm uninstall --no-save sharp
```

## Обложки проектов без публичного адреса

Для проектов, у которых нет `liveUrl` (AIDAN cookies, White Rabbit, Приёмная, Бирге, Квиз ГАК), в `public/images/` лежат не скриншоты (их неоткуда снять), а сгенерированные брендированные обложки — тот же стиль сайта (forest/ember, точечная сетка, нить), название и иконка проекта. Генерируются скриптом `scripts/generate-covers.mjs` (тоже через `sharp`, тем же способом, что и выше). Как только появится реальный скриншот — просто замени PNG-файл с тем же именем.
