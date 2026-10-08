  export type Language = 'uz' | 'ru' | 'en';

  export interface TranslationDictionary {
    nav: {
      about: string;
      skills: string;
      experience: string;
      services: string;
      projects: string;
      certificates: string;
      contact: string;
      resume: string;
      search: string;
      searchShortcut: string;
      connect: string;
      adminPanel: string;
      fullStack: string;
    };
    hero: {
      statusBadge: string;
      greeting: string;
      name: string;
      titlePart1: string;
      titlePart2: string;
      titlePart3: string;
      description: string;
      viewProjects: string;
      calcPrice: string;
      downloadCv: string;
      stats: {
        exp: string;
        projects: string;
        satisfaction: string;
        support: string;
      };
      terminalBadge: string;
      personajBadge: string;
    };
    about: {
      badge: string;
      heading: string;
      quote: string;
      p1: string;
      p2: string;
      p3: string;
      cards: {
        education: string;
        educationDesc: string;
        philosophy: string;
        philosophyDesc: string;
        vibe: string;
        vibeDesc: string;
        location: string;
        locationVal: string;
      };
    };
    skills: {
      badge: string;
      headingPart1: string;
      headingPart2: string;
    sub: string;
    categories: {
      all: string;
      frontend: string;
      backend: string;
      database: string;
      bot: string;
      tools: string;
    };
    levelLabel: string;
  };
  experience: {
    badge: string;
    headingPart1: string;
    headingPart2: string;
    sub: string;
    filterAll: string;
    filterWork: string;
    filterEdu: string;
    present: string;
  };
  services: {
    badge: string;
    headingPart1: string;
    headingPart2: string;
    sub: string;
    estimatorBtn: string;
    orderBtn: string;
    fromPrice: string;
  };
  projects: {
    badge: string;
    headingPart1: string;
    headingPart2: string;
    sub: string;
    filterAll: string;
    filterWeb: string;
    filterBot: string;
    filterEcommerce: string;
    filterAi: string;
    viewLive: string;
    details: string;
    featured: string;
  };
  certificates: {
    badge: string;
    headingPart1: string;
    headingPart2: string;
    sub: string;
    issuedBy: string;
    issueDate: string;
    credentialId: string;
    verify: string;
    clickToEnlarge: string;
    lightboxTitle: string;
    close: string;
  };
  contact: {
    badge: string;
    headingPart1: string;
    headingPart2: string;
    sub: string;
    directContact: string;
    directDesc: string;
    officialEmail: string;
    quickTelegram: string;
    telegramSub: string;
    write: string;
    instagramTitle: string;
    instagramSub: string;
    follow: string;
    responseTime: string;
    socials: string;
    chooseTopic: string;
    formName: string;
    namePlaceholder: string;
    formEmail: string;
    emailPlaceholder: string;
    formSubject: string;
    subjectPlaceholder: string;
    formMessage: string;
    messagePlaceholder: string;
    submitBtn: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    copiedEmail: string;
    templates: {
      label: string;
      subject: string;
      placeholder: string;
    }[];
  };
  footer: {
    bio: string;
    navigation: string;
    systemStatus: string;
    adminPanel: string;
    available: string;
    location: string;
    rights: string;
    backToTop: string;
  };
  projectModal: {
    featuredBadge: string;
    liveDemo: string;
    githubRepo: string;
    overview: string;
    challenges: string;
    outcomes: string;
    technologies: string;
    close: string;
  };
  estimatorModal: {
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    calcResult: string;
    rangeNote: string;
    duration: string;
    days: string;
    nameLabel: string;
    namePlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    disclaimer: string;
    sendTelegram: string;
    types: {
      id: string;
      name: string;
      desc: string;
    }[];
    features: {
      id: string;
      name: string;
    }[];
  };
  terminal: {
    online: string;
    quickCommands: string;
    placeholder: string;
    copySuccess: string;
    commands: {
      whoamiTitle: string;
      whoamiDesc: string;
      helpTitle: string;
      helpAbout: string;
      helpSkills: string;
      helpProjects: string;
      helpContact: string;
      helpWhoami: string;
      helpClear: string;
      aboutText: string;
    };
  };
  commandPalette: {
    placeholder: string;
    noResults: string;
    navCategory: string;
    actionsCategory: string;
    socialCategory: string;
    systemCategory: string;
    switchTheme: string;
    copyEmail: string;
    emailCopied: string;
    openAdmin: string;
    adminDesc: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  uz: {
    nav: {
      about: 'Haqimda',
      skills: "Ko'nikmalar",
      experience: 'Tajriba',
      services: 'Xizmatlar',
      projects: 'Loyihalar',
      certificates: 'Sertifikatlar',
      contact: 'Aloqa',
      resume: 'Rezyume',
      search: 'Qidiruv',
      searchShortcut: 'Tezkor Qidiruv (⌘K)',
      connect: "Bog'lanish",
      adminPanel: 'Admin Boshqaruv Paneli',
      fullStack: '/ Full Stack',
    },
    hero: {
      statusBadge: '● Yangi loyihalar uchun ochiq',
      greeting: 'Assalomu alaykum, men',
      name: 'Sanjarbek Otabekov',
      titlePart1: 'Zamonaviy, Tezkor va ',
      titlePart2: 'Yuqori Natijali ',
      titlePart3: 'Raqamli Tizimlar Arxitektori',
      description: "Next.js 16, React 19, TypeScript, Node.js va Telegram botlar bo'yicha ixtisoslashgan Full Stack muhandis. Har bir loyihada tezlik, toza arxitektura va yuqori ishonchlilik ustuvor hisoblanadi.",
      viewProjects: "Loyihalarni ko'rish",
      calcPrice: 'Narxni hisoblash',
      downloadCv: 'CV / Rezyume',
      stats: {
        exp: '4+ Yil Tajriba',
        projects: '11+ Tugallangan Loyiha',
        satisfaction: '100% Mijozlar Mamnuniyati',
        support: "24/7 Doimiy Qo'llab-quvvatlash",
      },
      terminalBadge: 'Terminal & Tizim Holati',
      personajBadge: 'Frontend & Backend & Botlar',
    },
    about: {
      badge: 'Falsafa & Yondashuv',
      heading: 'Men haqimda',
      quote: "Dasturlash — bu shunchaki kod emas, balki muammolarga eng toza va go'zal yechim topish san'atidir.",
      p1: "Salom! Men Sanjarbek Otabekov — zamonaviy veb-texnologiyalar, sun'iy intellekt va avtomatlashtirilgan tizimlar yaratishga ishtiyoqmand Full Stack dasturchiman. 4 yildan ortiq vaqt davomida yuqori yuklamali veb-platformalar, startaplar va biznes jarayonlarini osonlashtiruvchi Telegram botlar ustida muvaffaqiyatli ish olib boryapman.",
      p2: "Mening asosiy mutaxassisligim — Next.js, React, Node.js va zamonaviy bulutli ma'lumotlar bazalariga asoslangan ekotizimlarni arxitektura qilish. Har bir loyihada foydalanuvchi tajribasi (UX), sahifalar yuklanish tezligi va xavfsizlikni oliy darajada ta'minlashga e'tibor qarataman.",
      p3: "O'zbekiston, MDH va xalqaro bozorlardagi mijozlar bilan ishlagan holda, mahsulotni g'oyadan boshlab to'liq ishga tushirishgacha bo'lgan barcha bosqichlarni mas'uliyat bilan amalga oshiraman.",
      cards: {
        education: "Ta'lim & Akkreditatsiya",
        educationDesc: "Meta, Pearson xalqaro IT sertifikatlari va doimiy mustaqil chuqurlashtirilgan o'rganish.",
        philosophy: 'Ishlash Falsafasi',
        philosophyDesc: 'Toza kod, avtomatlashtirilgan testlar va yuqori tezlik (Lighthouse 95+ ball).',
        vibe: 'Spotify / Coding Vibe',
        vibeDesc: "Fokus va ilhom bag'ishlovchi ohanglar ostida kod yozish.",
        location: 'Joylashuv & Vaqt zonasi',
        locationVal: "Toshkent, O'zbekiston (UTC+5)",
      },
    },
    skills: {
      badge: 'Texnik Stack',
      headingPart1: "Kuchli Ko'nikmalar & ",
      headingPart2: 'Texnologiyalar',
      sub: "Zamonaviy raqamli mahsulotlar yaratishda foydalanadigan asosiy dasturlash tillari va vositalarim",
      categories: {
        all: 'Barchasi',
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Baza & Cloud',
        bot: 'Bot & AI',
        tools: 'Vositalar',
      },
      levelLabel: "O'zlashtirish darajasi",
    },
    experience: {
      badge: 'Bosqichma-bosqich',
      headingPart1: 'Tajriba & ',
      headingPart2: "Rivojlanish Yo'li",
      sub: "Amaliy loyihalar, xalqaro sertifikatlar va muhandislik bosqichlarim",
      filterAll: 'Barchasi',
      filterWork: 'Ish tajribasi',
      filterEdu: "Ta'lim & Sertifikatlar",
      present: 'Hozirgi vaqtgacha',
    },
    services: {
      badge: 'Nima taklif qilaman',
      headingPart1: 'Professional Xizmatlar & ',
      headingPart2: 'Yechimlar',
      sub: 'Biznesingizni rivojlantirish va jarayonlarni avtomatlashtirish uchun tayyor texnik yechimlar',
      estimatorBtn: 'Narxni hisoblash',
      orderBtn: 'Buyurtma berish',
      fromPrice: 'boshlab',
    },
    projects: {
      badge: 'Saralangan ishlar',
      headingPart1: 'Mening ',
      headingPart2: 'Loyihalarim',
      sub: "Real biznes muammolariga yechim bo'lgan va ishlab turgan yirik loyihalar",
      filterAll: 'Barchasi',
      filterWeb: 'Veb Ilovalar',
      filterBot: 'Telegram Botlar',
      filterEcommerce: 'E-Commerce',
      filterAi: 'AI & Vositalar',
      viewLive: 'Jonli Sayt',
      details: 'Batafsil',
      featured: 'Tanlangan',
    },
    certificates: {
      badge: 'Akkreditatsiyalar',
      headingPart1: 'Xalqaro Sertifikatlar & ',
      headingPart2: 'Yutuqlar',
      sub: 'Texnik bilim va malakamni tasdiqlovchi rasmiy xalqaro hujjatlar',
      issuedBy: 'Tashkilot',
      issueDate: 'Berilgan sana',
      credentialId: 'Sertifikat ID',
      verify: 'Tekshirish',
      clickToEnlarge: 'Kattalashtirish uchun bosing',
      lightboxTitle: 'Sertifikat Tasviri',
      close: 'Yopish',
    },
    contact: {
      badge: 'Aloqa & Hamkorlik',
      headingPart1: 'Birgalikda loyiha ',
      headingPart2: 'boshlaymizmi?',
      sub: "Yangi loyihalar, veb-sayt, Telegram bot yaratish yoki maslahat olish uchun istalgan vaqtda bog'lanishingiz mumkin.",
      directContact: "To'g'ridan-to'g'ri aloqa",
      directDesc: "Shoshilinch loyihalar yoki ish takliflari bo'yicha quyidagi rasmiy kanallar orqali tezkor javob olishingiz mumkin.",
      officialEmail: 'Rasmiy Email',
      quickTelegram: 'Tezkor Muloqot',
      telegramSub: 'Telegramda 5 daqiqada javob oling',
      write: 'Yozish',
      instagramTitle: 'Instagram Sahifa',
      instagramSub: '@sanjarbek_dev • Loyihalar & Jarayon',
      follow: 'Kuzatish',
      responseTime: "O'rtacha javob berish vaqti: 2 soat ichida",
      socials: 'Ijtimoiy Tarmoqlar',
      chooseTopic: 'Tezkor mavzuni tanlang:',
      formName: 'Ism-familiyangiz',
      namePlaceholder: 'Ali Valiyev',
      formEmail: 'Email manzilingiz',
      emailPlaceholder: 'ali@misol.uz',
      formSubject: 'Mavzu (Ixtiyoriy)',
      subjectPlaceholder: 'Loyiha taklifi / Telegram bot / Hamkorlik',
      formMessage: 'Xabar matni',
      messagePlaceholder: 'Loyihangiz maqsadi, talablari yoki savollaringiz haqida yozing...',
      submitBtn: 'Xabarni Yuborish',
      submitting: 'Yuborilmoqda...',
      successTitle: 'Xabaringiz muvaffaqiyatli yuborildi!',
      successDesc: "Rahmat, xabaringiz to'g'ridan-to'g'ri qabul qilindi. Tez orada siz bilan bog'lanaman.",
      copiedEmail: 'Nusxa olindi!',
      templates: [
        { label: 'Telegram Bot', subject: 'Telegram Bot yaratish', placeholder: 'Biznesimiz uchun Telegram bot yaratmoqchiman. Talablar: ' },
        { label: 'Veb-sayt / Landing', subject: 'Veb-sayt buyurtma qilish', placeholder: 'Kompaniyamiz uchun zamonaviy veb-sayt kerak. Asosiy maqsad: ' },
        { label: 'Full Stack Ilova', subject: 'Full Stack Web Ilova ishlab chiqish', placeholder: "Next.js va ma'lumotlar bazasi asosida yangi tizim yaratish bo'yicha: " },
        { label: 'Maslahat / Konsultatsiya', subject: "Dasturlash bo'yicha maslahat", placeholder: "Loyihamiz arxitekturasi va texnologiyalari bo'yicha maslahat olmoqchi edim: " },
      ],
    },
    footer: {
      bio: "Full Stack muhandis — Next.js, React, Node.js, Telegram botlar va bulutli infratuzilmalar bo'yicha ixtisoslashgan. Har bir loyihada tezlik, toza arxitektura va yuqori ishonchlilik ustuvor hisoblanadi.",
      navigation: 'Navigatsiya',
      systemStatus: 'Tizim & Status',
      adminPanel: 'Admin Boshqaruv',
      available: '● Yangi loyihalar uchun ochiq',
      location: "Toshkent, O'zbekiston · UTC+5",
      rights: 'Barcha huquqlar himoyalangan.',
      backToTop: 'Yuqoriga',
    },
    projectModal: {
      featuredBadge: 'Tanlangan Loyiha',
      liveDemo: 'Jonli Sayt / Demo',
      githubRepo: 'GitHub Repozitoriya',
      overview: 'Tizim Umumiy Ko\'rinishi & Arxitektura',
      challenges: 'Texnik Qiyinchiliklar & Yechimlar',
      outcomes: 'Asosiy Natijalar & Metrikalar',
      technologies: 'Qo\'llanilgan Texnologiyalar',
      close: 'Yopish',
    },
    estimatorModal: {
      title: 'Loyiha Narxini Hisoblash & Buyurtma',
      subtitle: 'Kerakli opsiyalarni tanlang va taxminiy narx hamda muddatni ko\'ring',
      step1: '1. Loyiha turini tanlang:',
      step2: '2. Kerakli qo\'shimcha imkoniyatlar:',
      calcResult: 'Taxminiy hisob-kitob natijasi:',
      rangeNote: '(oraliq narx)',
      duration: 'Muddat:',
      days: 'kun',
      nameLabel: 'Ismingiz (ixtiyoriy):',
      namePlaceholder: 'Masalan: Sardor',
      phoneLabel: 'Telegram yoki Telefon (ixtiyoriy):',
      phonePlaceholder: '@foydalanuvchi yoki +998...',
      disclaimer: '* Aniq narx texnik topshiriqqa (TZ) qarab kelishiladi',
      sendTelegram: 'Telegram orqali jo\'natish',
      types: [
        { id: 'telegram_bot', name: 'Telegram Bot', desc: 'Avtomatlashtirish, CRM & Savdo boti' },
        { id: 'landing_page', name: 'Landing Page', desc: 'Zamonaviy promo & sotuv sahifasi' },
        { id: 'fullstack_web', name: 'Full Stack Veb Ilova', desc: 'Next.js, Ma\'lumotlar bazasi va Auth' },
        { id: 'ecommerce', name: 'E-Commerce Do\'kon', desc: 'Onlayn katalog, savat va buyurtma' },
      ],
      features: [
        { id: 'api_integration', name: 'Tashqi API va CRM integratsiyasi' },
        { id: 'admin_panel', name: 'Qulay Admin boshqaruv paneli' },
        { id: 'multilang', name: 'Ko\'p tillilik (UZ / RU / EN)' },
        { id: 'pwa', name: 'PWA (Telefonga ilova kabi o\'rnatish)' },
        { id: 'seo_opt', name: 'Professional SEO & Tezlik (Lighthouse 95+)' },
        { id: 'cloud_db', name: 'Firebase / PostgreSQL bulutli baza' },
      ],
    },
    terminal: {
      online: 'ONLINE',
      quickCommands: 'Tezkor buyruqlar:',
      placeholder: 'buyruq... (help)',
      copySuccess: 'Tarix nusxalandi!',
      commands: {
        whoamiTitle: 'Sanjarbek Otabekov — Full Stack Dasturchi & Muhandis',
        whoamiDesc: 'Next.js 16, TypeScript, Three.js va Telegram botlar arxitektori.',
        helpTitle: 'Mavjud buyruqlar ro\'yxati:',
        helpAbout: 'Sanjarbek haqida qisqacha ma\'lumot',
        helpSkills: 'Asosiy texnologik stek',
        helpProjects: 'Saralangan loyihalar ro\'yxati',
        helpContact: 'Rasmiy aloqa vositalari',
        helpWhoami: 'Tizim egasi profili',
        helpClear: 'Terminal ekranini tozalash',
        aboutText: 'Zamonaviy veb-arxitektura va yuqori tezlikdagi raqamli mahsulotlar yaratuvchi Full Stack muhandis. Meta va Pearson xalqaro sertifikatlari sohibi.',
      },
    },
    commandPalette: {
      placeholder: 'Qidirish yoki buyruq kiritish...',
      noResults: 'Mos buyruq topilmadi',
      navCategory: 'Navigatsiya',
      actionsCategory: 'Harakatlar',
      socialCategory: 'Ijtimoiy Tarmoqlar',
      systemCategory: 'Tizim',
      switchTheme: 'Mavzuni almashtirish (Yorug\' / Qorong\'u)',
      copyEmail: 'Email manzilidan nusxa olish',
      emailCopied: 'Email nusxalandi!',
      openAdmin: 'Admin Boshqaruv Panelini ochish',
      adminDesc: 'Loyihalar, sertifikatlar, xizmatlar va xabarlarni boshqarish',
    },
  },

  ru: {
    nav: {
      about: 'Обо мне',
      skills: 'Навыки',
      experience: 'Опыт',
      services: 'Услуги',
      projects: 'Проекты',
      certificates: 'Сертификаты',
      contact: 'Контакты',
      resume: 'Резюме',
      search: 'Поиск',
      searchShortcut: 'Быстрый Поиск (⌘K)',
      connect: 'Связаться',
      adminPanel: 'Панель Администратора',
      fullStack: '/ Full Stack',
    },
    hero: {
      statusBadge: '● Открыт для новых проектов',
      greeting: 'Привет, я',
      name: 'Санжарбек Отабеков',
      titlePart1: 'Архитектор современных, ',
      titlePart2: 'быстрых и надежных ',
      titlePart3: 'цифровых веб-систем',
      description: 'Full Stack инженер, специализирующийся на Next.js 16, React 19, TypeScript, Node.js и Telegram-ботах. В каждом проекте приоритет отдается высокой скорости, чистой архитектуре и максимальной надежности.',
      viewProjects: 'Смотреть проекты',
      calcPrice: 'Рассчитать стоимость',
      downloadCv: 'Резюме / CV',
      stats: {
        exp: '4+ Года Опыта',
        projects: '11+ Завершенных Проектов',
        satisfaction: '100% Довольных Клиентов',
        support: '24/7 Постоянная Поддержка',
      },
      terminalBadge: 'Терминал и Статус Системы',
      personajBadge: 'Frontend & Backend & Боты',
    },
    about: {
      badge: 'Философия и Подход',
      heading: 'Обо мне',
      quote: 'Программирование — это не просто код, это искусство находить самые чистые и элегантные решения реальных проблем.',
      p1: 'Здравствуйте! Я Санжарбек Отабеков — Full Stack разработчик, увлеченный созданием передовых веб-технологий, искусственного интеллекта и автоматизированных систем. Более 4 лет я успешно разрабатываю высоконагруженные веб-платформы, стартапы и Telegram-ботов, автоматизирующих бизнес-процессы.',
      p2: 'Моя ключевая специализация — проектирование масштабируемых систем на базе Next.js, React, Node.js и современных облачных баз данных. В каждом проекте я уделяю повышенное внимание пользовательскому опыту (UX), мгновенной скорости загрузки страниц и абсолютной безопасности.',
      p3: 'Работая с клиентами из Узбекистана, стран СНГ и международных рынков, я ответственно сопровождаю продукт от этапа идеи и архитектуры до полного запуска в продакшн.',
      cards: {
        education: 'Образование и Аккредитация',
        educationDesc: 'Международные IT-сертификаты от Meta, Pearson и постоянное углубленное самообразование.',
        philosophy: 'Философия Разработки',
        philosophyDesc: 'Чистый модульный код, автоматизированные тесты и максимальная скорость (Lighthouse 95+).',
        vibe: 'Spotify / Музыка для кода',
        vibeDesc: 'Написание чистого кода под вдохновляющие и фокусирующие ритмы.',
        location: 'Локация и Часовой пояс',
        locationVal: 'Ташкент, Узбекистан (UTC+5)',
      },
    },
    skills: {
      badge: 'Технический Стек',
      headingPart1: 'Ключевые Навыки & ',
      headingPart2: 'Технологии',
      sub: 'Основные языки программирования, фреймворки и инструменты, которые я использую в работе',
      categories: {
        all: 'Все',
        frontend: 'Фронтенд',
        backend: 'Бэкенд',
        database: 'Базы & Облако',
        bot: 'Боты & ИИ',
        tools: 'Инструменты',
      },
      levelLabel: 'Уровень владения',
    },
    experience: {
      badge: 'Этапы Развития',
      headingPart1: 'Опыт Работы & ',
      headingPart2: 'Карьерный Путь',
      sub: 'Практические проекты, международные сертификации и вехи инженерной деятельности',
      filterAll: 'Все',
      filterWork: 'Опыт работы',
      filterEdu: 'Образование & Сертификаты',
      present: 'По настоящее время',
    },
    services: {
      badge: 'Что я предлагаю',
      headingPart1: 'Профессиональные Услуги & ',
      headingPart2: 'Решения',
      sub: 'Готовые технические решения для масштабирования бизнеса и комплексной автоматизации процессов',
      estimatorBtn: 'Рассчитать стоимость',
      orderBtn: 'Заказать проект',
      fromPrice: 'от',
    },
    projects: {
      badge: 'Избранные работы',
      headingPart1: 'Мои Реализованные ',
      headingPart2: 'Проекты',
      sub: 'Действующие масштабные проекты, решающие реальные задачи бизнеса и пользователей',
      filterAll: 'Все',
      filterWeb: 'Веб-приложения',
      filterBot: 'Telegram-боты',
      filterEcommerce: 'E-Commerce',
      filterAi: 'ИИ & Утилиты',
      viewLive: 'Живой Сайт',
      details: 'Подробнее',
      featured: 'Избранный',
    },
    certificates: {
      badge: 'Аккредитации',
      headingPart1: 'Международные Сертификаты & ',
      headingPart2: 'Достижения',
      sub: 'Официальные международные сертификаты, подтверждающие мою квалификацию и экспертизу',
      issuedBy: 'Организация',
      issueDate: 'Дата выдачи',
      credentialId: 'ID Сертификата',
      verify: 'Проверить',
      clickToEnlarge: 'Нажмите для увеличения',
      lightboxTitle: 'Просмотр Сертификата',
      close: 'Закрыть',
    },
    contact: {
      badge: 'Связь и Сотрудничество',
      headingPart1: 'Начнем совместный ',
      headingPart2: 'проект?',
      sub: 'Вы можете связаться со мной в любое время для новых проектов, создания сайтов, Telegram-ботов или консультации.',
      directContact: 'Прямая связь',
      directDesc: 'По срочным проектам или предложениям о работе вы можете быстро связаться по официальным каналам ниже.',
      officialEmail: 'Официальный Email',
      quickTelegram: 'Быстрая Связь',
      telegramSub: 'Ответ в Telegram в течение 5 минут',
      write: 'Написать',
      instagramTitle: 'Instagram Профиль',
      instagramSub: '@sanjarbek_dev • Проекты и Процесс',
      follow: 'Подписаться',
      responseTime: 'Среднее время ответа: в течение 2 часов',
      socials: 'Социальные Сети',
      chooseTopic: 'Выберите тему обращения:',
      formName: 'Ваше имя и фамилия',
      namePlaceholder: 'Алексей Иванов',
      formEmail: 'Ваш Email адрес',
      emailPlaceholder: 'alex@example.com',
      formSubject: 'Тема (Необязательно)',
      subjectPlaceholder: 'Предложение проекта / Telegram-бот / Сотрудничество',
      formMessage: 'Текст сообщения',
      messagePlaceholder: 'Опишите цели, требования вашего проекта или ваши вопросы...',
      submitBtn: 'Отправить Сообщение',
      submitting: 'Отправка...',
      successTitle: 'Ваше сообщение успешно отправлено!',
      successDesc: 'Спасибо, ваше сообщение получено. Я свяжусь с вами в ближайшее время.',
      copiedEmail: 'Email скопирован!',
      templates: [
        { label: 'Telegram-бот', subject: 'Создание Telegram-бота', placeholder: 'Хочу заказать Telegram-бота для бизнеса. Требования: ' },
        { label: 'Веб-сайт / Landing', subject: 'Заказ веб-сайта', placeholder: 'Нужен современный веб-сайт для компании. Основная цель: ' },
        { label: 'Full Stack Проект', subject: 'Разработка Full Stack веб-приложения', placeholder: 'Разработка новой платформы на Next.js с базой данных: ' },
        { label: 'Консультация', subject: 'Техническая консультация по IT', placeholder: 'Хочу проконсультироваться по архитектуре и технологиям проекта: ' },
      ],
    },
    footer: {
      bio: 'Full Stack инженер — специалист по Next.js, React, Node.js, Telegram-ботам и облачной инфраструктуре. В каждом проекте приоритет отдается высокой скорости, чистой архитектуре и максимальной надежности.',
      navigation: 'Навигация',
      systemStatus: 'Система & Статус',
      adminPanel: 'Панель Управления',
      available: '● Открыт для новых проектов',
      location: 'Ташкент, Узбекистан · UTC+5',
      rights: 'Все права защищены.',
      backToTop: 'Наверх',
    },
    projectModal: {
      featuredBadge: 'Избранный Кейс',
      liveDemo: 'Живой Сайт / Демо',
      githubRepo: 'GitHub Репозиторий',
      overview: 'Обзор Системы & Архитектура',
      challenges: 'Технические Сложности & Решения',
      outcomes: 'Ключевые Результаты & Метрики',
      technologies: 'Использованный Стек',
      close: 'Закрыть',
    },
    estimatorModal: {
      title: 'Расчет Стоимости Проекта & Заказ',
      subtitle: 'Выберите нужные параметры, чтобы узнать примерную стоимость и срок разработки',
      step1: '1. Выберите тип проекта:',
      step2: '2. Необходимые возможности:',
      calcResult: 'Результат предварительного расчета:',
      rangeNote: '(ориентировочный диапазон)',
      duration: 'Срок:',
      days: 'дней',
      nameLabel: 'Ваше имя (необязательно):',
      namePlaceholder: 'Например: Сардор',
      phoneLabel: 'Telegram или Телефон (необязательно):',
      phonePlaceholder: '@username или +998...',
      disclaimer: '* Точная стоимость согласуется после составления технического задания (ТЗ)',
      sendTelegram: 'Отправить заявку в Telegram',
      types: [
        { id: 'telegram_bot', name: 'Telegram Бот', desc: 'Автоматизация, CRM и торговый бот' },
        { id: 'landing_page', name: 'Landing Page', desc: 'Современная продающая промо-страница' },
        { id: 'fullstack_web', name: 'Full Stack Веб-сервис', desc: 'Next.js, База данных и Авторизация' },
        { id: 'ecommerce', name: 'E-Commerce Магазин', desc: 'Онлайн-каталог, корзина и заказы' },
      ],
      features: [
        { id: 'api_integration', name: 'Интеграция с внешними API и CRM' },
        { id: 'admin_panel', name: 'Удобная панель управления (Админка)' },
        { id: 'multilang', name: 'Мультиязычность (UZ / RU / EN)' },
        { id: 'pwa', name: 'PWA (Установка как мобильное приложение)' },
        { id: 'seo_opt', name: 'Профессиональное SEO & Скорость (Lighthouse 95+)' },
        { id: 'cloud_db', name: 'Облачная база Firebase / PostgreSQL' },
      ],
    },
    terminal: {
      online: 'ONLINE',
      quickCommands: 'Быстрые команды:',
      placeholder: 'команда... (help)',
      copySuccess: 'История скопирована!',
      commands: {
        whoamiTitle: 'Санжарбек Отабеков — Full Stack Разработчик & Инженер',
        whoamiDesc: 'Архитектор Next.js 16, TypeScript, Three.js и Telegram-ботов.',
        helpTitle: 'Список доступных команд:',
        helpAbout: 'Краткая информация о Санжарбеке',
        helpSkills: 'Основной технологический стек',
        helpProjects: 'Список избранных проектов',
        helpContact: 'Официальные каналы связи',
        helpWhoami: 'Профиль владельца системы',
        helpClear: 'Очистить экран терминала',
        aboutText: 'Full Stack инженер, создающий современную веб-архитектуру и скоростные цифровые продукты. Обладатель международных сертификатов Meta и Pearson.',
      },
    },
    commandPalette: {
      placeholder: 'Поиск или ввод команды...',
      noResults: 'Команд не найдено',
      navCategory: 'Навигация',
      actionsCategory: 'Действия',
      socialCategory: 'Социальные Сети',
      systemCategory: 'Система',
      switchTheme: 'Переключить тему (Светлая / Темная)',
      copyEmail: 'Скопировать официальный Email',
      emailCopied: 'Email скопирован!',
      openAdmin: 'Открыть Панель Администратора',
      adminDesc: 'Управление проектами, сертификатами, услугами и сообщениями',
    },
  },

  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      services: 'Services',
      projects: 'Projects',
      certificates: 'Certifications',
      contact: 'Contact',
      resume: 'Resume',
      search: 'Search',
      searchShortcut: 'Quick Search (⌘K)',
      connect: 'Get in Touch',
      adminPanel: 'Admin Management Portal',
      fullStack: '/ Full Stack',
    },
    hero: {
      statusBadge: '● Available for new projects',
      greeting: "Hello, I'm",
      name: 'Sanjarbek Otabekov',
      titlePart1: 'Architect of Modern, ',
      titlePart2: 'High-Performance & ',
      titlePart3: 'Scalable Web Systems',
      description: 'Full Stack Engineer specializing in Next.js 16, React 19, TypeScript, Node.js, and Telegram bots. Prioritizing speed, clean architecture, and rock-solid reliability across every digital product.',
      viewProjects: 'View Projects',
      calcPrice: 'Estimate Project',
      downloadCv: 'Resume / CV',
      stats: {
        exp: '4+ Years Experience',
        projects: '11+ Completed Projects',
        satisfaction: '100% Client Satisfaction',
        support: '24/7 Dedicated Support',
      },
      terminalBadge: 'Terminal & System Status',
      personajBadge: 'Frontend & Backend & Bots',
    },
    about: {
      badge: 'Philosophy & Approach',
      heading: 'About Me',
      quote: "Programming isn't just writing code; it's the art of engineering the cleanest and most elegant solutions to real-world problems.",
      p1: "Hi! I am Sanjarbek Otabekov — a passionate Full Stack Software Engineer committed to building modern web architectures, artificial intelligence integrations, and automated digital ecosystems. For over 4 years, I have successfully delivered high-traffic web applications, startup platforms, and commercial Telegram bots.",
      p2: "My core expertise lies in architecting scalable systems using Next.js, React, Node.js, and modern cloud database solutions. In every project, I place paramount emphasis on intuitive user experience (UX), lightning-fast loading speeds, and robust security standards.",
      p3: "Partnering with clients across Uzbekistan, the CIS region, and global markets, I take full ownership of products from ideation and technical architecture to production deployment and maintenance.",
      cards: {
        education: 'Education & Accreditation',
        educationDesc: 'International professional certifications from Meta, Pearson, and continuous advanced self-study.',
        philosophy: 'Engineering Philosophy',
        philosophyDesc: 'Clean modular code, automated tests, and peak performance (Lighthouse 95+ rating).',
        vibe: 'Spotify / Coding Vibe',
        vibeDesc: 'Writing focused code backed by immersive and uplifting electronic melodies.',
        location: 'Location & Timezone',
        locationVal: 'Tashkent, Uzbekistan (UTC+5)',
      },
    },
    skills: {
      badge: 'Tech Stack',
      headingPart1: 'Core Skills & ',
      headingPart2: 'Technologies',
      sub: 'Key programming languages, frameworks, and engineering tools leveraged to build state-of-the-art products',
      categories: {
        all: 'All',
        frontend: 'Frontend',
        backend: 'Backend',
        database: 'Database & Cloud',
        bot: 'Bots & AI',
        tools: 'Tools & DevOps',
      },
      levelLabel: 'Proficiency Level',
    },
    experience: {
      badge: 'Journey & Growth',
      headingPart1: 'Experience & ',
      headingPart2: 'Career Journey',
      sub: 'Practical engineering milestones, international credentials, and production track record',
      filterAll: 'All',
      filterWork: 'Work Experience',
      filterEdu: 'Education & Certs',
      present: 'Present',
    },
    services: {
      badge: 'What I Offer',
      headingPart1: 'Professional Services & ',
      headingPart2: 'Solutions',
      sub: 'Tailor-made technical solutions designed to scale your business and automate routine workflows',
      estimatorBtn: 'Calculate Price',
      orderBtn: 'Order Service',
      fromPrice: 'from',
    },
    projects: {
      badge: 'Selected Works',
      headingPart1: 'Featured ',
      headingPart2: 'Projects',
      sub: 'Production-ready, high-impact digital systems built to solve genuine business challenges',
      filterAll: 'All',
      filterWeb: 'Web Apps',
      filterBot: 'Telegram Bots',
      filterEcommerce: 'E-Commerce',
      filterAi: 'AI & Tools',
      viewLive: 'Live Demo',
      details: 'Details',
      featured: 'Featured',
    },
    certificates: {
      badge: 'Accreditations',
      headingPart1: 'International Certifications & ',
      headingPart2: 'Badges',
      sub: 'Official global accreditations verifying technical mastery and software excellence',
      issuedBy: 'Issuing Organization',
      issueDate: 'Issue Date',
      credentialId: 'Credential ID',
      verify: 'Verify Credential',
      clickToEnlarge: 'Click to expand view',
      lightboxTitle: 'Certificate Preview',
      close: 'Close',
    },
    contact: {
      badge: 'Contact & Collaboration',
      headingPart1: "Let's Build Something ",
      headingPart2: 'Together',
      sub: 'Reach out anytime for new projects, modern web applications, Telegram bots, or technical consulting.',
      directContact: 'Direct Contact',
      directDesc: 'For urgent project inquiries or career opportunities, receive an immediate response via the official channels below.',
      officialEmail: 'Official Email',
      quickTelegram: 'Instant Chat',
      telegramSub: 'Get a response on Telegram within 5 mins',
      write: 'Message',
      instagramTitle: 'Instagram Profile',
      instagramSub: '@sanjarbek_dev • Projects & Behind the Scenes',
      follow: 'Follow',
      responseTime: 'Average response time: within 2 hours',
      socials: 'Social Networks',
      chooseTopic: 'Choose a quick topic:',
      formName: 'Your Full Name',
      namePlaceholder: 'John Doe',
      formEmail: 'Your Email Address',
      emailPlaceholder: 'john@example.com',
      formSubject: 'Subject (Optional)',
      subjectPlaceholder: 'Project Inquiry / Telegram Bot / Collaboration',
      formMessage: 'Message Content',
      messagePlaceholder: 'Describe your project scope, technical requirements, or questions...',
      submitBtn: 'Send Message',
      submitting: 'Sending...',
      successTitle: 'Message Sent Successfully!',
      successDesc: 'Thank you! Your message has been received. I will be in touch with you shortly.',
      copiedEmail: 'Copied to clipboard!',
      templates: [
        { label: 'Telegram Bot', subject: 'Telegram Bot Development', placeholder: 'We need an automated Telegram bot for our business. Requirements: ' },
        { label: 'Website / Landing', subject: 'Custom Website Inquiry', placeholder: 'We need a modern, high-converting website for our company. Key goal: ' },
        { label: 'Full Stack App', subject: 'Full Stack Web App Development', placeholder: 'Developing a new cloud web application with Next.js and database: ' },
        { label: 'Consultation', subject: 'Technical Software Consultation', placeholder: 'I would like to consult on software architecture and stack options: ' },
      ],
    },
    footer: {
      bio: 'Full Stack Engineer specializing in Next.js, React, Node.js, Telegram bots, and cloud infrastructure. Prioritizing speed, clean architecture, and rock-solid reliability across every digital product.',
      navigation: 'Navigation',
      systemStatus: 'System & Status',
      adminPanel: 'Admin Portal',
      available: '● Open for new projects',
      location: 'Tashkent, Uzbekistan · UTC+5',
      rights: 'All rights reserved.',
      backToTop: 'Back to Top',
    },
    projectModal: {
      featuredBadge: 'Featured Case Study',
      liveDemo: 'Live Site / Demo',
      githubRepo: 'GitHub Repository',
      overview: 'System Overview & Architecture',
      challenges: 'Technical Challenges & Solutions',
      outcomes: 'Key Metrics & Results',
      technologies: 'Technologies Leveraged',
      close: 'Close',
    },
    estimatorModal: {
      title: 'Project Cost Estimator & Order',
      subtitle: 'Select desired features to estimate investment range and delivery timeline',
      step1: '1. Select Project Type:',
      step2: '2. Additional Desired Capabilities:',
      calcResult: 'Estimated Cost Range:',
      rangeNote: '(estimated range)',
      duration: 'Timeline:',
      days: 'days',
      nameLabel: 'Your Name (optional):',
      namePlaceholder: 'e.g. Alex',
      phoneLabel: 'Telegram or Phone (optional):',
      phonePlaceholder: '@username or +1...',
      disclaimer: '* Final quotation is formalized based on the detailed technical specification (SRS)',
      sendTelegram: 'Send Inquiry via Telegram',
      types: [
        { id: 'telegram_bot', name: 'Telegram Bot', desc: 'Automation, CRM & E-Commerce bot' },
        { id: 'landing_page', name: 'Landing Page', desc: 'High-converting modern promo page' },
        { id: 'fullstack_web', name: 'Full Stack Web App', desc: 'Next.js, Cloud DB and Authentication' },
        { id: 'ecommerce', name: 'E-Commerce Store', desc: 'Online catalog, shopping cart and orders' },
      ],
      features: [
        { id: 'api_integration', name: 'External API & CRM Integrations' },
        { id: 'admin_panel', name: 'Custom Admin Dashboard Portal' },
        { id: 'multilang', name: 'Multi-language (UZ / RU / EN)' },
        { id: 'pwa', name: 'PWA (Installable mobile web app)' },
        { id: 'seo_opt', name: 'Professional SEO & Speed (Lighthouse 95+)' },
        { id: 'cloud_db', name: 'Firebase / PostgreSQL Cloud Database' },
      ],
    },
    terminal: {
      online: 'ONLINE',
      quickCommands: 'Quick commands:',
      placeholder: 'command... (help)',
      copySuccess: 'History copied!',
      commands: {
        whoamiTitle: 'Sanjarbek Otabekov — Full Stack Developer & Engineer',
        whoamiDesc: 'Architect of Next.js 16, TypeScript, Three.js, and Telegram bots.',
        helpTitle: 'Available commands list:',
        helpAbout: 'Short bio about Sanjarbek',
        helpSkills: 'Core technology stack',
        helpProjects: 'Featured projects list',
        helpContact: 'Official contact channels',
        helpWhoami: 'System owner profile',
        helpClear: 'Clear terminal screen',
        aboutText: 'Full Stack Engineer designing modern web architecture and high-velocity digital products. Holder of international credentials from Meta and Pearson.',
      },
    },
    commandPalette: {
      placeholder: 'Search or type a command...',
      noResults: 'No commands matching',
      navCategory: 'Navigation',
      actionsCategory: 'Actions',
      socialCategory: 'Social Networks',
      systemCategory: 'System',
      switchTheme: 'Toggle Theme (Light / Dark)',
      copyEmail: 'Copy Official Email Address',
      emailCopied: 'Email copied to clipboard!',
      openAdmin: 'Open Admin Management Portal',
      adminDesc: 'Manage projects, certificates, services, and incoming inquiries',
    },
  },
};

/**
 * Translations for dynamic Project items
 */
export const projectTranslations: Record<
  string,
  Record<
    Language,
    {
      title: string;
      description: string;
      longDescription?: string;
      role?: string;
      category?: string;
      challenges?: string[];
      outcomes?: string[];
    }
  >
> = {
  'filmx-cinema-portal': {
    uz: {
      title: 'FilmX — Kinolar va Seriallar Portali',
      description: "1,700+ dan ortiq tarjima kinolar, ko'p qismli seriallar, real-time tomoshabinlar statistikasi va Tas-ix 1080p Full HD video oqimli ulkan kinoportal.",
      longDescription: "FilmX — bu O'zbekistondagi eng ilg'or, tezyurar va keng qamrovli bepul onlayn kinoteatr platformasi. Saytda 1,700+ dan ortiq jahon durdonalari, yangi premyera filmlar, ko'p qismli seriallar, koreys doramalari va multfilmlar 1080p Full HD va 4K sifatda taqdim etiladi. Platforma real-time IP foydalanuvchilar monitoringi, Tas-ix tezyurar CDN, tezkor klaviatura qidiruvi (⌘K / Ctrl+K), sevimlilar ro'yxati, premyeralar slayderi va rasmiy Android APK ilovasi integratsiyasiga ega.",
      role: 'Bosh Arxitektor & Full Stack Muhandis',
      category: 'Full Stack & Streaming',
      challenges: [
        "Katta hajmdagi video oqimlari va 6,450+ qismlar katalogini Tas-ix tarmog'ida buferlanishsiz, ultra-tezkor yuklanishini ta'minlash.",
        "Real-time IP asoslangan onlayn tomoshabinlar hisoblagichi va interaktiv premyeralar slayderini yuqori unumdorlik bilan integratsiya qilish.",
        "Klaviatura yordamida (⌘K / Ctrl+K) bir lahzada ishlovchi global debounced kinolar qidiruv tizimini ishlab chiqish.",
      ],
      outcomes: [
        "Vercel va tezyurar CDN arxitekturasi orqali sahifa yuklanish tezligi 98+ PageSpeed ko'rsatkichiga erishildi.",
        "1,700+ kino va seriallar to'plami bilan foydalanuvchilar uchun qulay, reklamasiz va zamonaviy kinotomosha tajribasi yaratildi.",
      ],
    },
    ru: {
      title: 'FilmX — Кинопортал и Сериалы',
      description: 'Масштабный кинопортал с каталогом 1,700+ фильмов и сериалов, статистикой онлайн в реальном времени и стримингом 1080p Full HD в Tas-ix.',
      longDescription: 'FilmX — передовая, сверхбыстрая бесплатная платформа онлайн-кинотеатра в Узбекистане. На сайте представлены свыше 1,700 мировых шедевров, кинопремьер, сериалов, дорам и мультфильмов в качестве 1080p Full HD и 4K. Включает мониторинг пользователей по IP, CDN Tas-ix, мгновенный поиск (⌘K), избранное и официальное APK приложение.',
      role: 'Главный Архитектор & Full Stack Разработчик',
      category: 'Full Stack & Стриминг',
      challenges: [
        'Обеспечение сверхбыстрой загрузки каталога из 6,450+ серий без буферизации в сети Tas-ix.',
        'Интеграция счетчика онлайн-зрителей в реальном времени и слайдера премьер с высокой производительностью.',
        'Разработка мгновенного debounced поиска по всей базе фильмов с клавиатурной навигацией (⌘K / Ctrl+K).',
      ],
      outcomes: [
        'Достигнут показатель PageSpeed 98+ благодаря архитектуре Next.js и высокоскоростному CDN.',
        'Создан удобный, современный интерфейс просмотра без навязчивой рекламы для сотен тысяч пользователей.',
      ],
    },
    en: {
      title: 'FilmX — Cinema & Streaming Portal',
      description: 'Major online cinema platform featuring 1,700+ movies, multi-episode series, real-time viewer analytics, and Tas-ix 1080p Full HD streaming.',
      longDescription: 'FilmX is an advanced, ultra-fast online streaming platform in Uzbekistan offering over 1,700 movies, series, dramas, and animated features in 1080p Full HD and 4K. Features real-time IP viewer monitoring, high-speed CDN, instant keyboard search (⌘K / Ctrl+K), favorites list, and official Android APK integration.',
      role: 'Lead Architect & Full Stack Engineer',
      category: 'Full Stack & Streaming',
      challenges: [
        'Delivering buffer-free streaming of 6,450+ episodes over high-speed regional CDN infrastructure.',
        'High-performance integration of real-time online spectator counting and premiere showcase sliders.',
        'Engineering an instant global debounced search engine with keyboard shortcut navigation (⌘K / Ctrl+K).',
      ],
      outcomes: [
        'Achieved 98+ Google PageSpeed score using Next.js 15, edge caching, and optimized media delivery.',
        'Engineered an ad-free, intuitive streaming experience loved by thousands of active movie enthusiasts.',
      ],
    },
  },

  'R3GilTqRbXxxo3cY1rIY': {
    uz: {
      title: 'mebelmashhura.uz',
      description: "Mebel do'koni uchun yaratilgan zamonaviy elektron tijorat katalogi va buyurtma platformasi.",
      longDescription: "mebelmashhura.uz — zamonaviy mebel do'koni uchun yaratilgan qulay, chiroyli va yuqori tezlikda ishlovchi elektron tijorat katalog veb-sayti. Foydalanuvchilar mahsulotlarni qidirish, filtrlar bo'yicha saralash va buyurtma berish imkoniyatiga ega.",
      role: 'Full Stack Dasturchi',
      category: 'E-Commerce',
      challenges: [
        "Mebel kataloglarining yuqori aniqlikdagi rasmlarini tezkor yuklanishini ta'minlash.",
        "Mobil qurilmalar uchun mukammal moslashuvchan (responsive) qulay interfeys yaratish.",
      ],
      outcomes: [
        "Sayt yuklanish tezligi 1 soniyadan kam vaqtni tashkil etdi.",
        "Mijozlarning mahsulot tanlash va buyurtma berish jarayoni 40% ga tezlashdi.",
      ],
    },
    ru: {
      title: 'mebelmashhura.uz',
      description: 'Современный интернет-каталог и платформа заказов для мебельного салона.',
      longDescription: 'mebelmashhura.uz — быстрый, удобный и эстетичный сайт электронной коммерции для мебельного магазина. Пользователи могут мгновенно искать товары, фильтровать по категориям и оформлять заказы с мобильных устройств.',
      role: 'Full Stack Разработчик',
      category: 'E-Commerce',
      challenges: [
        'Оптимизация изображений высокого разрешения мебельного каталога для мгновенной загрузки.',
        'Создание идеального адаптивного интерфейса под все типы смартфонов и планшетов.',
      ],
      outcomes: [
        'Время полной загрузки сайта составило менее 1 секунды.',
        'Процесс выбора товаров и оформления заказов клиентами ускорился на 40%.',
      ],
    },
    en: {
      title: 'mebelmashhura.uz',
      description: 'Modern e-commerce showcase catalog and online ordering platform for a furniture brand.',
      longDescription: 'mebelmashhura.uz is a high-speed, intuitive e-commerce showcase catalog engineered for a prominent furniture retailer. Customers enjoy seamless search, multi-attribute filtering, and streamlined order requests.',
      role: 'Full Stack Developer',
      category: 'E-Commerce',
      challenges: [
        'Optimizing high-resolution gallery photography for instantaneous loading speeds.',
        'Delivering a flawless mobile-first shopping experience across all device form factors.',
      ],
      outcomes: [
        'Reduced initial page load time to under 1 second flat.',
        'Streamlined customer product discovery and order completion speed by 40%.',
      ],
    },
  },

  'finalytix-ai': {
    uz: {
      title: 'FINALYTIX AI — Moliyaviy Tahlil Platformasi',
      description: "Google Gemini 2.5 Pro sun'iy intellekti bilan ishlovchi avtonom moliyaviy tahlil va investitsiya hisobotlari tizimi.",
      longDescription: "FINALYTIX AI — bu korxonalar va investorlar uchun moliyaviy hisobotlarni bir necha soniyada chuqur tahlil qilib beruvchi professional veb-platforma. Platforma PDF va Excel hisobotlarni avtomatik o'qib, xavflar, rentabellik va investitsiya imkoniyatlarini diagrammalar orqali taqdim etadi.",
      role: 'AI Engineer & Full Stack Lead',
      category: 'AI & FinTech',
    },
    ru: {
      title: 'FINALYTIX AI — Платформа Финансового Анализа',
      description: 'Автономная система финансового анализа и инвестиционных отчетов на базе искусственного интеллекта Google Gemini 2.5 Pro.',
      longDescription: 'FINALYTIX AI — профессиональная веб-платформа для мгновенного анализа финансовой отчетности компаний и инвесторов. Система парсит PDF и Excel файлы, строит интерактивные графики рентабельности и оценивает финансовые риски.',
      role: 'AI Engineer & Full Stack Lead',
      category: 'AI & FinTech',
    },
    en: {
      title: 'FINALYTIX AI — Financial Intelligence Platform',
      description: 'Autonomous financial analysis and investment audit engine powered by Google Gemini 2.5 Pro AI.',
      longDescription: 'FINALYTIX AI is a cutting-edge analytics web platform for investors and corporate teams. It parses balance sheets, computes solvency and profitability ratios, and visualizes financial forecasts via interactive dashboards in seconds.',
      role: 'AI Engineer & Full Stack Lead',
      category: 'AI & FinTech',
    },
  },

  'moviemind': {
    uz: {
      title: 'MovieMind — AI Kinotavsiya Platformasi',
      description: "Foydalanuvchi kayfiyati va xohishiga qarab eng mos kinolarni tavsiya qiluvchi aqlli neyrotarmoq platformasi.",
      role: 'Full Stack Developer',
      category: 'AI & Web App',
    },
    ru: {
      title: 'MovieMind — Платформа Рекомендации Фильмов на ИИ',
      description: 'Интеллектуальная нейросетевая платформа, подбирающая идеальные фильмы по настроению и предпочтениям зрителя.',
      role: 'Full Stack Разработчик',
      category: 'AI & Веб-приложение',
    },
    en: {
      title: 'MovieMind — AI Movie Recommendation Platform',
      description: 'Intelligent neural recommendation engine curated to discover perfect cinema matching user mood and nuanced taste.',
      role: 'Full Stack Developer',
      category: 'AI & Web App',
    },
  },

  'taskflow-board': {
    uz: {
      title: 'TaskFlow Board — Jamoaviy Loyiha Boshqaruvi',
      description: "Trello va Jira uslubidagi, real-time WebSockets orqali sinxronlanuvchi vazifalar boshqaruv tizimi.",
      role: 'Frontend & Full Stack Dev',
      category: 'Productivity & SaaS',
    },
    ru: {
      title: 'TaskFlow Board — Управление Командными Проектами',
      description: 'Современный Kanban-сервис в стиле Trello и Jira с синхронизацией задач в реальном времени через WebSockets.',
      role: 'Frontend & Full Stack Dev',
      category: 'SaaS & Продуктивность',
    },
    en: {
      title: 'TaskFlow Board — Collaborative Kanban SaaS',
      description: 'Agile task management and Kanban orchestration software featuring real-time WebSockets synchronization.',
      role: 'Frontend & Full Stack Dev',
      category: 'Productivity & SaaS',
    },
  },

  '3d-earth-threejs': {
    uz: {
      title: '3D Earth Three.js — Interaktiv Sayyora Maketi',
      description: "Three.js va WebGL orqali yaratilgan, 60 FPS silliqlikda ishlovchi interaktiv 3D Yer sayyorasi vizualizatsiyasi.",
      role: 'WebGL & Creative Developer',
      category: 'Creative WebGL & 3D',
    },
    ru: {
      title: '3D Earth Three.js — Интерактивная 3D Планета',
      description: 'Интерактивная 3D-визуализация планеты Земля на Three.js и WebGL с идеальной плавностью 60 кадров в секунду.',
      role: 'WebGL & Creative Разработчик',
      category: 'Креативный WebGL & 3D',
    },
    en: {
      title: '3D Earth Three.js — Interactive Planet Model',
      description: 'Hardware-accelerated 3D planetary rendering engine running at silky 60 FPS via Three.js and custom GLSL shaders.',
      role: 'WebGL & Creative Developer',
      category: 'Creative WebGL & 3D',
    },
  },

  'palitra-pro': {
    uz: {
      title: 'Palitra Pro — Dizaynerlar Uchun Ranglar Generatori',
      description: "Zamonaviy UI dizayn uchun uyg'un ranglar palitralari, gradientlar va kontrast tekshiruvi vositasi.",
      role: 'UI/UX & Frontend Developer',
      category: 'Tools & Design',
    },
    ru: {
      title: 'Palitra Pro — Генератор Цветовых Палитр',
      description: 'Профессиональный генератор гармоничных цветовых палитр, градиентов и проверки контрастности для UI/UX дизайнеров.',
      role: 'UI/UX & Frontend Разработчик',
      category: 'Инструменты & Дизайн',
    },
    en: {
      title: 'Palitra Pro — Harmonic Color Suite',
      description: 'Intelligent color harmony generator, gradient studio, and WCAG accessibility contrast tester for designers.',
      role: 'UI/UX & Frontend Developer',
      category: 'Tools & Design',
    },
  },

  'protasker': {
    uz: {
      title: 'ProTasker — Shaxsiy Hosildorlik Ilovasi',
      description: "Pomodoro taymeri, kunlik odatlar nazorati va ma'lumotlar tahliliga ega kuchli shaxsiy rejalashtiruvchi.",
      role: 'Full Stack Developer',
      category: 'Productivity',
    },
    ru: {
      title: 'ProTasker — Приложение Личной Продуктивности',
      description: 'Мощный личный планировщик с таймером Pomodoro, трекером привычек и подробной аналитикой продуктивности.',
      role: 'Full Stack Разработчик',
      category: 'Продуктивность',
    },
    en: {
      title: 'ProTasker — Personal Productivity Ecosystem',
      description: 'Holistic personal organizer with built-in Pomodoro cycles, habit tracker, and productivity analytics.',
      role: 'Full Stack Developer',
      category: 'Productivity',
    },
  },
};

/**
 * Translations for Milestones
 */
export const milestoneTranslations: Record<
  string,
  Record<
    Language,
    {
      title: string;
      organization: string;
      description: string;
      highlights?: string[];
      badge?: string;
    }
  >
> = {
  'mile-1': {
    uz: {
      title: 'Full Stack Muhandis & Veb Konsultant',
      organization: 'Mustaqil Frilans & Loyihalar',
      description: "Next.js 15, TypeScript va zamonaviy bulutli arxitektura orqali bizneslar uchun tezkor, xavfsiz va yuqori konversiyali raqamli tizimlar yaratish.",
      highlights: [
        "mebelmashhura.uz e-tijorat katalogini ishlab chiqib, 1 soniyadan tez yuklanishga erishildi",
        "Three.js va WebGL orqali 60 FPS silliq 3D Yer sayyorasi vizualizatsiyasi yaratildi",
        "Telegram savdo botlari, CRM tizimlari va PWA ilovalari ishlab chiqildi",
      ],
      badge: 'Faol amaliyot',
    },
    ru: {
      title: 'Full Stack Инженер & Веб-Консультант',
      organization: 'Независимый Фриланс & Проекты',
      description: 'Разработка быстрых, безопасных и конверсионных цифровых систем для бизнеса с использованием Next.js 15, TypeScript и облачных решений.',
      highlights: [
        'Создан e-commerce каталог mebelmashhura.uz со скоростью загрузки менее 1 секунды',
        'Разработана плавная 3D визуализация Земли на Three.js и WebGL со стабильными 60 FPS',
        'Реализованы торговые Telegram-боты, CRM-интеграции и PWA-приложения',
      ],
      badge: 'Активная практика',
    },
    en: {
      title: 'Full Stack Engineer & Web Consultant',
      organization: 'Independent Freelance & Client Projects',
      description: 'Architecting ultra-fast, secure, and high-conversion web platforms leveraging Next.js 15, TypeScript, and modern cloud architectures.',
      highlights: [
        'Engineered mebelmashhura.uz e-commerce showcase achieving sub-1s load times',
        'Constructed 60 FPS interactive 3D Earth planetary model using Three.js & WebGL',
        'Delivered commercial Telegram bots, tailored CRM systems, and responsive PWA apps',
      ],
      badge: 'Active Practice',
    },
  },
  'mile-2': {
    uz: {
      title: 'Meta Certified Full Stack & Frontend Muhandisligi',
      organization: 'Meta & Coursera Xalqaro Dasturi',
      description: "Meta tomonidan taqdim etilgan jahon andozalaridagi intensiv professional ixtisoslik. Chuqur frontend va backend tizimlari, xavfsiz RESTful APIlar va toza arxitektura.",
      highlights: [
        "Meta Full Stack Developer va Frontend Developer xalqaro maxsus sertifikatlariga ega bo'ldi",
        "Murakkab ma'lumotlar bazasi (PostgreSQL, MySQL) arxitekturasi va Django backend loyihalari",
        "Test-Driven Development (TDD) va CI/CD GitHub Actions avtomatlashtirish amaliyoti",
      ],
      badge: 'Meta Akkreditatsiya',
    },
    ru: {
      title: 'Meta Certified Full Stack & Frontend Инженерия',
      organization: 'Международная Программа Meta & Coursera',
      description: 'Интенсивная профессиональная программа мирового уровня от компании Meta. Глубокое изучение фронтенд и бэкенд систем, безопасных REST API и чистой архитектуры.',
      highlights: [
        'Получены официальные международные сертификаты Meta Full Stack и Frontend Developer',
        'Проектирование сложных баз данных (PostgreSQL, MySQL) и серверная разработка на Django',
        'Практика разработки через тестирование (TDD) и автоматизация CI/CD через GitHub Actions',
      ],
      badge: 'Аккредитация Meta',
    },
    en: {
      title: 'Meta Certified Full Stack & Frontend Engineering',
      organization: 'Meta & Coursera Global Credential',
      description: 'World-class professional specialization engineered by Meta. In-depth mastery of modern frontend frameworks, scalable backends, and robust REST APIs.',
      highlights: [
        'Awarded Meta Full Stack Developer & Meta Frontend Developer global credentials',
        'Complex database modeling (PostgreSQL, MySQL) and production Django server architectures',
        'Rigorous Test-Driven Development (TDD with Jest) and CI/CD GitHub Actions pipelines',
      ],
      badge: 'Meta Accredited',
    },
  },
  'mile-3': {
    uz: {
      title: 'Kiberxavfsizlik & Axborot Xavfsizligi Amaliyoti',
      organization: 'Pearson & Coursera',
      description: "Veb ilovalar va tarmoq infratuzilmasining xavfsizligini ta'minlash, penetratsion testlar o'tkazish hamda xakerlik tahdidlaridan himoyalanish metodologiyasi.",
      highlights: [
        "Certified Ethical Hacker (Pearson) va Cyber Security Leadership sertifikatlari",
        "OWASP Top 10 zaifliklarini bartaraf etish va mustahkam xavfsizlik qatlamlarini qurish",
        "Google Prompting Essentials va generativ AI vositalarini ishlab chiqish jarayoniga tatbiq etish",
      ],
      badge: 'Certified Ethical Hacker',
    },
    ru: {
      title: 'Кибербезопасность & Информационная Безопасность',
      organization: 'Pearson & Coursera',
      description: 'Методология защиты веб-приложений и сетевой инфраструктуры, проведение тестов на проникновение и противодействие киберугрозам.',
      highlights: [
        'Сертификаты Certified Ethical Hacker (Pearson) и Cyber Security Leadership',
        'Устранение уязвимостей OWASP Top 10 и построение эшелонированной защиты',
        'Внедрение инструментов Google Prompting Essentials и Generative AI в процесс разработки',
      ],
      badge: 'Certified Ethical Hacker',
    },
    en: {
      title: 'Cybersecurity & Ethical Hacking Practice',
      organization: 'Pearson & Coursera',
      description: 'Securing web applications and cloud network infrastructures, vulnerability scanning, penetration testing, and counteracting zero-day exploits.',
      highlights: [
        'Earned Certified Ethical Hacker (Pearson) & Cybersecurity Leadership accreditations',
        'Mitigating OWASP Top 10 vulnerabilities and enforcing defense-in-depth security layers',
        'Leveraging Google Prompting Essentials and generative AI pipelines in engineering workflows',
      ],
      badge: 'Certified Ethical Hacker',
    },
  },
  'mile-4': {
    uz: {
      title: 'Dasturiy Ta\'minot Asoslari & Algoritmlar',
      organization: 'Amaliy Tadqiqot & Texnik Loyihalar',
      description: "Zamonaviy JavaScript (ES6+), ob'ektga yo'naltirilgan dasturlash (OOP), ma'lumotlar tuzilmalari va algoritmlar bo'yicha chuqur amaliy tajriba.",
      highlights: [
        "Git & GitHub Master Class (Packt) sertifikati va jamoaviy versiyalar boshqaruvi",
        "110+ dan ortiq real commitlar va open-source dasturiy ta'minot yaratish",
        "Algoritmik samaradorlik (Big-O) va brauzer render tezligini optimallashtirish",
      ],
      badge: 'Poydevor',
    },
    ru: {
      title: 'Основы Программной Инженерии & Алгоритмы',
      organization: 'Практические Исследования & Проекты',
      description: 'Глубокое практическое освоение современного JavaScript (ES6+), объектно-ориентированного программирования (ООП), структур данных и алгоритмов.',
      highlights: [
        'Сертификат Git & GitHub Master Class (Packt) и навыки командного версионирования',
        'Более 110+ коммитов в реальных проектах и создание open-source библиотек',
        'Алгоритмическая оптимизация (Big-O) и ускорение рендеринга в веб-браузерах',
      ],
      badge: 'Фундамент',
    },
    en: {
      title: 'Software Engineering Foundations & Algorithms',
      organization: 'Applied Technical Research & Projects',
      description: 'Rigorous foundation in modern JavaScript (ES6+), Object-Oriented Design (OOP), core data structures, and computational algorithmic complexity.',
      highlights: [
        'Awarded Git & GitHub Master Class (Packt) and enterprise branch management proficiency',
        '110+ open-source commits and structured code repository management',
        'Algorithmic optimization (Big-O analysis) and browser render performance tuning',
      ],
      badge: 'Foundations',
    },
  },
};

/**
 * Translations for Services
 */
export const serviceTranslations: Record<
  string,
  Record<
    Language,
    {
      title: string;
      desc: string;
      priceRange: string;
      features: string[];
    }
  >
> = {
  'srv-1': {
    uz: {
      title: 'Telegram Bot & Avtomatlashtirish',
      desc: "Biznes jarayonlarini to'liq avtomatlashtiruvchi, mijozlar bilan muloqot va buyurtmalarni boshqaruvchi aqlli botlar.",
      priceRange: '150$ – 1500$',
      features: [
        "Tashqi API, CRM va ma'lumotlar bazasi integratsiyasi",
        "Foydalanuvchilar bazasi va CRM boshqaruv paneli",
        "Xabarnomalar (mailing) va avtomatlashtirilgan javoblar",
        "24/7 serverda barqaror uzluksiz ishlash kafolati",
      ],
    },
    ru: {
      title: 'Telegram-Боты & Автоматизация',
      desc: 'Умные боты для полной автоматизации бизнес-процессов, общения с клиентами, приема платежей и управления заказами.',
      priceRange: '150$ – 1500$',
      features: [
        'Интеграция с внешними API, CRM и базами данных',
        'База пользователей и удобная панель управления (CRM)',
        'Массовые рассылки и автоматические цепочки ответов',
        'Гарантия бесперебойной работы на сервере 24/7',
      ],
    },
    en: {
      title: 'Telegram Bots & Automation',
      desc: 'Intelligent automated bots designed to streamline business workflows, customer onboarding, payments, and order tracking.',
      priceRange: '$150 – $1500',
      features: [
        'Integration with third-party APIs, CRM platforms, and databases',
        'User management database and custom admin control dashboard',
        'Automated notification workflows, broadcast campaigns, and triggers',
        '24/7 rock-solid cloud server uptime guarantee',
      ],
    },
  },
  'srv-2': {
    uz: {
      title: 'Landing Page & Promo Saytlar',
      desc: "Mahsulot yoki xizmatlaringiz uchun yuqori konversiyali, chaqqon va brendingizni mukammal namoyon etuvchi sahifalar.",
      priceRange: '50$ – 300$',
      features: [
        "Mukammal mobil va planshet moslashuvchanligi (Responsive)",
        "Lighthouse 95+ balldan yuqori tezkor yuklanish",
        "Zamonaviy Apple-style interfeys va mikro-animatsiyalar",
        "SEO optimizatsiya va qidiruv tizimlariga indekslash",
      ],
    },
    ru: {
      title: 'Landing Page & Промо-Сайты',
      desc: 'Высококонверсионные, быстрые и презентабельные промо-страницы, идеально представляющие ваши товары и услуги.',
      priceRange: '50$ – 300$',
      features: [
        'Идеальная адаптивность под смартфоны и планшеты (Responsive)',
        'Мгновенная скорость загрузки по Google Lighthouse 95+',
        'Современный дизайн в стиле Apple и микро-анимации',
        'Полная SEO-оптимизация и индексация в поисковых системах',
      ],
    },
    en: {
      title: 'Landing Pages & Promo Sites',
      desc: 'High-converting, ultra-fast, and visually captivating showcase pages engineered to represent your brand with perfection.',
      priceRange: '$50 – $300',
      features: [
        'Flawless responsive behavior across mobile, tablet, and desktop',
        'Google Lighthouse 95+ ultra-fast performance score',
        'Modern Apple-inspired aesthetics with interactive micro-animations',
        'Full SEO architecture and instant search engine indexation',
      ],
    },
  },
  'srv-3': {
    uz: {
      title: 'Full Stack Veb Ilovalar & SaaS',
      desc: "Next.js 15, React va mustahkam ma'lumotlar bazasi bilan qurilgan to'liq avtonom boshqaruv tizimlari.",
      priceRange: '350$ – 2000$',
      features: [
        "Next.js 15 App Router & Server Components arxitekturasi",
        "Xavfsiz autentifikatsiya va foydalanuvchilar rollari",
        "PostgreSQL, MySQL yoki Firebase ma'lumotlar bazasi",
        "RESTful va GraphQL API integratsiyalari",
      ],
    },
    ru: {
      title: 'Full Stack Веб-Сервисы & SaaS',
      desc: 'Полнофункциональные автономные системы управления на базе Next.js 15, React и масштабируемых баз данных.',
      priceRange: '350$ – 2000$',
      features: [
        'Архитектура Next.js 15 App Router и React Server Components',
        'Безопасная аутентификация и разграничение ролей пользователей',
        'Масштабируемые базы данных PostgreSQL, MySQL или Firebase',
        'Интеграция надежных RESTful и GraphQL API',
      ],
    },
    en: {
      title: 'Full Stack Web Apps & SaaS',
      desc: 'Fully autonomous cloud web applications engineered with Next.js 15, React, and bulletproof database architectures.',
      priceRange: '$350 – $2000',
      features: [
        'Cutting-edge Next.js 15 App Router & React Server Components',
        'Enterprise-grade authentication and Role-Based Access Control',
        'PostgreSQL, MySQL, or Firebase cloud database infrastructure',
        'Robust RESTful and GraphQL API integrations',
      ],
    },
  },
  'srv-4': {
    uz: {
      title: 'E-Commerce & Onlayn Do\'konlar',
      desc: "Mebel, kiyim-kechak yoki xizmatlar uchun interaktiv katalog, savat va buyurtma tizimiga ega elektron do'konlar (masalan: mebelmashhura.uz).",
      priceRange: '250$ – 1200$',
      features: [
        "Mahsulotlar katalogi, qidiruv va ko'p bosqichli filtrlar",
        "Xarid savati va buyurtmalarni boshqarish tizimi",
        "Katalog boshqaruvi uchun qulay admin panel",
        "Tezkor yuklanish va mobil ilovadek qulay interfeys (PWA)",
      ],
    },
    ru: {
      title: 'E-Commerce & Интернет-Магазины',
      desc: 'Электронные магазины с интерактивным каталогом, корзиной и приемом заказов для мебели, одежды или услуг (например, mebelmashhura.uz).',
      priceRange: '250$ – 1200$',
      features: [
        'Каталог товаров с мгновенным поиском и многоуровневыми фильтрами',
        'Удобная корзина покупателя и система управления заказами',
        'Интуитивная панель администратора для обновления каталога',
        'Мгновенная скорость и удобство мобильного приложения (PWA)',
      ],
    },
    en: {
      title: 'E-Commerce & Online Stores',
      desc: 'Modern online stores featuring interactive product showcases, dynamic shopping cart, and order pipeline (e.g. mebelmashhura.uz).',
      priceRange: '$250 – $1200',
      features: [
        'Comprehensive product catalog with debounced search and faceted filtering',
        'Seamless shopping bag and streamlined checkout pipeline',
        'Intuitive custom administrative dashboard for store management',
        'Ultra-fast PWA architecture delivering app-like mobile performance',
      ],
    },
  },
};
