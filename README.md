# Baktiyar uulu Marat — Portfolio

React + Vite портфолио. RU/EN, тема «нить пути», офлайн-режим, форма на EmailJS.

## Запуск

```bash
npm install
npm run dev       # http://localhost:5173
npm run build      # сборка в dist/
npm run preview    # локальный просмотр сборки
```

## Настройка EmailJS

Форма в разделе «Контакты» отправляет письма через [EmailJS](https://www.emailjs.com/).

1. Создай аккаунт на emailjs.com, добавь Email Service и шаблон с полями `from_name`, `from_email`, `message`.
2. Скопируй `.env.local.example` в `.env.local` и заполни:

```
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

Без этих переменных форма покажет ошибку отправки (и подскажет написать в Telegram) — сайт при этом не падает.

## Деплой на Vercel

Preset: **Vite**, Root Directory: `/`. Добавь те же три переменные окружения в настройках проекта Vercel (Production + Preview).

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
