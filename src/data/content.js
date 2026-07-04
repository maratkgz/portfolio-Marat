const content = {
  ru: {
    meta: {
      title: 'Baktiyar uulu Marat — Frontend · Assistant · SMM',
      description: 'Frontend-разработчик, ассистент руководителя и SMM-маркетолог. 6 реализованных проектов, 2 бизнес-клиента. Москва.',
    },

    nav: {
      links: [
        { label: 'Проекты', href: '#projects' },
        { label: 'Навыки', href: '#skills' },
        { label: 'Контакты', href: '#contact' },
      ],
      resume: 'Резюме ↓',
      logoAria: 'На главную',
      menuOpen: 'Открыть меню',
      menuClose: 'Закрыть меню',
      switchLangAria: 'Переключить язык',
    },

    thread: {
      hero: '01 · ПРИВЕТ',
      stats: '02 · ЦИФРЫ',
      about: '03 · ОБО МНЕ',
      roles: '04 · РОЛИ',
      projects: '05 · ПРОЕКТЫ',
      skills: '06 · НАВЫКИ',
      languages: '07 · ЯЗЫКИ',
      process: '08 · ПРОЦЕСС',
      contact: '09 · КОНТАКТЫ',
    },

    hero: {
      kicker: 'ПРИВЕТ, Я — МАРАТ',
      titleLine1: 'Baktiyar uulu',
      titleName: 'Marat',
      subtitle: 'Frontend-разработчик · Ассистент руководителя · SMM-маркетолог',
      quoteLine1: 'Я воспринимаю мир иначе —',
      quoteLine2: 'и именно это делает мои решения нестандартными',
      ctaResume: 'Скачать резюме ↓',
      ctaProjects: 'Посмотреть проекты →',
      scroll: 'scroll',
      energyHint: 'Кликни по ядру',
      energyLabel: 'ЗАРЯД',
    },

    stats: [
      { value: 6, suffix: '+', label: 'реализованных проектов' },
      { value: 3, suffix: '', label: 'роли в одном человеке' },
      { value: 2, suffix: '', label: 'реальных бизнес-клиента' },
      { value: 10, suffix: '+', label: 'технологий в стеке' },
    ],

    about: {
      label: 'Обо мне',
      title: 'Один человек — целая команда',
      paragraphs: [
        'Мне 21 год. Я frontend-разработчик-самоучка из Кыргызстана, сейчас живу в Москве — всему, что умею, научился сам: без курсов, без наставников, только практика и реальные проекты.',
        'Я слабослышащий и с детства ношу слуховой аппарат. Воспринимаю мир через звук и жест одновременно — свободно владею жестовым языком. Это сделало моё визуальное мышление острее, а эмпатию к пользователю — глубже: я проектирую интерфейсы, которые понятны без слов.',
        'За плечами 6 реализованных проектов: от продуктивити-приложений и PWA до e-commerce платформы для бренда AIDAN cookies и системы планирования смен для ресторана White Rabbit. Два из них — для реальных бизнес-клиентов. Но код — только треть того, что я делаю: для BullBir я готовил инвесторские материалы и маркетинговую упаковку, для собственного портфолио веду трафик из Instagram с UTM-аналитикой, а инструмент «Приёмная» спроектировал, понимая изнутри работу ассистента с руководителем.',
        'Разработчик, который понимает маркетинг. Маркетолог, который умеет организовать процесс. Ассистент, который автоматизирует рутину кодом. Выбирайте любую формулировку — всё это я.',
      ],
      footNote: 'Образование: колледж, IT-направление — в процессе. Разработка: самообразование на практике.',
    },

    roles: {
      label: 'Роли',
      title: 'Три роли, один процесс',
      items: [
        {
          icon: 'code',
          title: 'Разработчик',
          text: 'Полный цикл: идея → дизайн → код → деплой. React, Vite, Firebase, Node.js. Фронтенд, бэкенд, базы данных, PWA.',
        },
        {
          icon: 'ops',
          title: 'Ассистент руководителя',
          text: 'Планирование, документы, коммуникации, контроль задач. Настолько понимаю эту работу, что написал для неё собственный софт.',
        },
        {
          icon: 'marketing',
          title: 'SMM-маркетолог',
          text: 'Контент, ведение соцсетей, позиционирование, UTM-аналитика, инвесторские материалы. Продукт мало сделать — его надо продать.',
        },
      ],
    },

    projectsUI: {
      label: 'Проекты',
      title: 'Что я строю',
      filters: [
        { key: 'all', label: 'Все' },
        { key: 'code', label: 'Код' },
        { key: 'marketing', label: 'Маркетинг' },
        { key: 'ops', label: 'Управление' },
      ],
      task: 'Задача',
      solution: 'Решение',
      result: 'Результат',
      source: 'Source',
      website: 'Website',
      moreTags: (n) => `+${n}`,
    },

    skillsUI: {
      label: 'Навыки',
      title: 'Мой стек',
      groups: [
        {
          icon: 'code',
          category: 'Разработка',
          skills: ['JavaScript (ES6+)', 'React 18', 'Vite', 'CSS3/HTML5', 'Framer Motion', 'Node.js', 'Express', 'REST API', 'Firebase (Auth, Firestore, Hosting)', 'PostgreSQL', 'Prisma ORM', 'MongoDB', 'SQLite', 'PWA', 'i18n', 'Git/GitHub', 'Vercel', 'VPS (Linux)', 'Figma', 'Адаптивная вёрстка'],
        },
        {
          icon: 'marketing',
          category: 'Маркетинг',
          skills: ['SMM и ведение соцсетей', 'Контент-план', 'Позиционирование продукта', 'UTM-аналитика', 'Инвесторские материалы', 'Маркетинговые тексты', 'Продуктовая упаковка', 'Instagram-трафик'],
        },
        {
          icon: 'ops',
          category: 'Организация',
          skills: ['Планирование и приоритизация', 'Документооборот', 'Деловая переписка', 'Организация встреч', 'Контроль задач', 'Автоматизация рутины', 'Конфиденциальность'],
        },
        {
          icon: 'people',
          category: 'Личные качества',
          skills: ['Многозадачность', 'Самообучаемость', 'Системное мышление', 'Ответственность', 'Внимание к деталям', 'Быстрая адаптация', 'Доведение до результата', 'Коммуникабельность', 'Эмпатия к пользователю', 'Визуальное мышление'],
        },
      ],
    },

    languagesUI: {
      label: 'Языки',
      title: 'На каких языках говорю',
      items: [
        { lang: 'Кыргызский', level: 'Родной' },
        { lang: 'Русский', level: 'Свободно' },
        { lang: 'Жестовый язык (КЖЯ/РЖЯ)', level: 'Свободно' },
        { lang: 'Английский', level: 'Средний' },
        { lang: 'Арабский', level: 'Начальный' },
        { lang: 'Турецкий', level: 'Начальный' },
      ],
    },

    processUI: {
      label: 'Процесс',
      title: 'Как я работаю',
      steps: [
        { title: 'Погружаюсь', text: 'Разбираюсь в задаче и бизнесе, а не просто беру ТЗ.' },
        { title: 'Делаю', text: 'Быстро собираю рабочую версию, итерации, честные сроки.' },
        { title: 'Довожу', text: 'Деплой, аналитика, упаковка. Проект закончен, когда он работает и приносит пользу, а не когда написан код.' },
      ],
    },

    contactUI: {
      label: 'Контакты',
      title: 'Давайте работать вместе',
      subtitle: 'Ищете человека, который закроет сразу несколько направлений? Напишите — отвечаю быстро.',
      location: 'Москва · офис или удалённо',
      form: {
        name: 'Имя',
        namePlaceholder: 'Ваше имя',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        message: 'Сообщение',
        messagePlaceholder: 'Расскажите о проекте или предложении...',
        send: 'Отправить →',
        sending: 'Отправляю...',
        sentTitle: 'Отправлено ✓',
        sentText: 'Спасибо! Свяжусь с вами в ближайшее время.',
        sendAnother: 'Написать ещё',
        errorNetwork: 'Не отправилось — напишите мне в Telegram: @xxxzm05',
        errorName: 'Введите имя',
        errorEmail: 'Введите email',
        errorEmailInvalid: 'Некорректный email',
        errorMessage: 'Напишите сообщение',
        offlineNotice: 'Нет сети — напишите в Telegram: @xxxzm05',
      },
    },

    footerUI: {
      builtWith: 'Сделано на React · Задеплоено на Vercel',
    },

    offline: {
      title: 'Связь пропала. Но я умею общаться и без слов',
      waiting: 'ждём сеть',
      retry: 'Проверить снова',
      backOnline: 'Снова в сети ✓',
    },

    errorBoundary: {
      title: 'Что-то сломалось. Уже чиню',
      reload: 'Перезагрузить',
    },
  },

  en: {
    meta: {
      title: 'Baktiyar uulu Marat — Frontend · Assistant · SMM',
      description: 'Frontend developer, executive assistant and SMM marketer. 6 shipped projects, 2 business clients. Moscow.',
    },

    nav: {
      links: [
        { label: 'Projects', href: '#projects' },
        { label: 'Skills', href: '#skills' },
        { label: 'Contacts', href: '#contact' },
      ],
      resume: 'Resume ↓',
      logoAria: 'Back to top',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      switchLangAria: 'Switch language',
    },

    thread: {
      hero: '01 · HELLO',
      stats: '02 · NUMBERS',
      about: '03 · ABOUT',
      roles: '04 · ROLES',
      projects: '05 · PROJECTS',
      skills: '06 · SKILLS',
      languages: '07 · LANGUAGES',
      process: '08 · PROCESS',
      contact: '09 · CONTACT',
    },

    hero: {
      kicker: "HI, I'M MARAT",
      titleLine1: 'Baktiyar uulu',
      titleName: 'Marat',
      subtitle: 'Frontend Developer · Executive Assistant · SMM Marketer',
      quoteLine1: 'I see the world differently —',
      quoteLine2: "and that's exactly what makes my solutions unconventional",
      ctaResume: 'Download CV ↓',
      ctaProjects: 'View Projects →',
      scroll: 'scroll',
      energyHint: 'Click the core',
      energyLabel: 'CHARGE',
    },

    stats: [
      { value: 6, suffix: '+', label: 'shipped projects' },
      { value: 3, suffix: '', label: 'roles in one person' },
      { value: 2, suffix: '', label: 'real business clients' },
      { value: 10, suffix: '+', label: 'technologies in stack' },
    ],

    about: {
      label: 'About',
      title: 'One person — a whole team',
      paragraphs: [
        "I'm 21. I'm a self-taught frontend developer from Kyrgyzstan, now based in Moscow — everything I know, I learned on my own: no courses, no mentors, just practice and real projects.",
        "I'm hard of hearing and have worn a hearing aid since childhood. I perceive the world through sound and sign at the same time — I'm fluent in sign language. That sharpened my visual thinking and deepened my empathy for the user: I design interfaces that make sense without words.",
        "I've shipped 6 projects: from productivity apps and PWAs to an e-commerce platform for the AIDAN cookies brand and a shift-scheduling system for the White Rabbit restaurant. Two of them were built for real business clients. But code is only a third of what I do: for BullBir I prepared investor materials and marketing packaging, for my own portfolio I drive Instagram traffic with UTM analytics, and I designed the \"Priyomnaya\" tool from an insider's understanding of how an assistant works with an executive.",
        "A developer who understands marketing. A marketer who can organize a process. An assistant who automates routine with code. Pick whichever label you like — it's all me.",
      ],
      footNote: 'Education: college, IT track — in progress. Development: self-taught through practice.',
    },

    roles: {
      label: 'Roles',
      title: 'Three roles, one process',
      items: [
        {
          icon: 'code',
          title: 'Developer',
          text: 'Full cycle: idea → design → code → deploy. React, Vite, Firebase, Node.js. Frontend, backend, databases, PWA.',
        },
        {
          icon: 'ops',
          title: 'Executive Assistant',
          text: 'Planning, documents, communication, task tracking. I understand this job well enough to have written my own software for it.',
        },
        {
          icon: 'marketing',
          title: 'SMM Marketer',
          text: "Content, social media management, positioning, UTM analytics, investor materials. Building a product isn't enough — it has to sell.",
        },
      ],
    },

    projectsUI: {
      label: 'Projects',
      title: 'What I build',
      filters: [
        { key: 'all', label: 'All' },
        { key: 'code', label: 'Code' },
        { key: 'marketing', label: 'Marketing' },
        { key: 'ops', label: 'Ops' },
      ],
      task: 'Task',
      solution: 'Solution',
      result: 'Result',
      source: 'Source',
      website: 'Website',
      moreTags: (n) => `+${n}`,
    },

    skillsUI: {
      label: 'Skills',
      title: 'My stack',
      groups: [
        {
          icon: 'code',
          category: 'Development',
          skills: ['JavaScript (ES6+)', 'React 18', 'Vite', 'CSS3/HTML5', 'Framer Motion', 'Node.js', 'Express', 'REST API', 'Firebase (Auth, Firestore, Hosting)', 'PostgreSQL', 'Prisma ORM', 'MongoDB', 'SQLite', 'PWA', 'i18n', 'Git/GitHub', 'Vercel', 'VPS (Linux)', 'Figma', 'Responsive layout'],
        },
        {
          icon: 'marketing',
          category: 'Marketing',
          skills: ['SMM & social media management', 'Content planning', 'Product positioning', 'UTM analytics', 'Investor materials', 'Marketing copy', 'Product packaging', 'Instagram traffic'],
        },
        {
          icon: 'ops',
          category: 'Operations',
          skills: ['Planning & prioritization', 'Document management', 'Business correspondence', 'Meeting organization', 'Task tracking', 'Routine automation', 'Confidentiality'],
        },
        {
          icon: 'people',
          category: 'Soft skills',
          skills: ['Multitasking', 'Self-learning', 'Systems thinking', 'Accountability', 'Attention to detail', 'Fast adaptation', 'Follow-through', 'Communication', 'User empathy', 'Visual thinking'],
        },
      ],
    },

    languagesUI: {
      label: 'Languages',
      title: 'Languages I speak',
      items: [
        { lang: 'Kyrgyz', level: 'Native' },
        { lang: 'Russian', level: 'Fluent' },
        { lang: 'Sign language (RSL)', level: 'Fluent' },
        { lang: 'English', level: 'Intermediate' },
        { lang: 'Arabic', level: 'Beginner' },
        { lang: 'Turkish', level: 'Beginner' },
      ],
    },

    processUI: {
      label: 'Process',
      title: 'How I work',
      steps: [
        { title: 'Immerse', text: 'I dig into the task and the business, not just take a spec.' },
        { title: 'Build', text: 'I quickly ship a working version, iterate, and keep timelines honest.' },
        { title: 'Deliver', text: "Deploy, analytics, packaging. A project is done when it works and delivers value — not when the code is written." },
      ],
    },

    contactUI: {
      label: 'Contact',
      title: "Let's work together",
      subtitle: 'Looking for someone who covers several roles at once? Reach out — I reply fast.',
      location: 'Moscow · on-site or remote',
      form: {
        name: 'Name',
        namePlaceholder: 'Your name',
        email: 'Email',
        emailPlaceholder: 'your@email.com',
        message: 'Message',
        messagePlaceholder: 'Tell me about the project or offer...',
        send: 'Send →',
        sending: 'Sending...',
        sentTitle: 'Sent ✓',
        sentText: "Thanks! I'll get back to you shortly.",
        sendAnother: 'Send another',
        errorNetwork: "Didn't go through — message me on Telegram: @xxxzm05",
        errorName: 'Enter your name',
        errorEmail: 'Enter your email',
        errorEmailInvalid: 'Invalid email',
        errorMessage: 'Write a message',
        offlineNotice: 'No connection — message me on Telegram: @xxxzm05',
      },
    },

    footerUI: {
      builtWith: 'Built with React · Deployed on Vercel',
    },

    offline: {
      title: "Connection lost. But I can communicate without words",
      waiting: 'waiting for network',
      retry: 'Try again',
      backOnline: 'Back online ✓',
    },

    errorBoundary: {
      title: 'Something broke. On it',
      reload: 'Reload',
    },
  },
}

export default content
