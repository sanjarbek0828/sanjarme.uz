export interface ResumeProject {
  title: string;
  role: string;
  category: string;
  techStack: string[];
  description: string;
  highlights: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface ResumeExperience {
  period: string;
  role: string;
  company: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface ResumeCertification {
  title: string;
  issuer: string;
  year: string;
  skills: string[];
  url?: string;
}

export interface ResumeData {
  personal: {
    fullName: string;
    title: string;
    tagline: string;
    location: string;
    email: string;
    telegram: string;
    telegramHandle: string;
    linkedin: string;
    linkedinHandle: string;
    github: string;
    githubHandle: string;
    website: string;
    availability: string;
  };
  summary: string;
  skills: {
    category: string;
    items: string[];
  }[];
  experience: ResumeExperience[];
  projects: ResumeProject[];
  certifications: ResumeCertification[];
  education: {
    degree: string;
    institution: string;
    period: string;
    description: string;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
  ui: {
    backToPortfolio: string;
    downloadPdf: string;
    printResume: string;
    copyLink: string;
    linkCopied: string;
    directPdfDownload: string;
    summaryTitle: string;
    skillsTitle: string;
    experienceTitle: string;
    projectsTitle: string;
    certificationsTitle: string;
    educationTitle: string;
    languagesTitle: string;
    liveDemo: string;
    sourceCode: string;
    verifiedCredential: string;
    atsNote: string;
  };
}

export const resumeDataByLang: Record<'uz' | 'en' | 'ru', ResumeData> = {
  uz: {
    personal: {
      fullName: 'Sanjarbek Otabekov',
      title: 'Full Stack Dasturchi & Veb Muhandis',
      tagline: 'Tezkor, xavfsiz va zamonaviy raqamli tizimlar arxitektori',
      location: 'Toshkent, O‘zbekiston (Masofaviy ishlashga tayyor)',
      email: 'sanjarbekotabekov010@gmail.com',
      telegram: 'https://t.me/sanjarbekdev',
      telegramHandle: '@sanjarbekdev',
      linkedin: 'https://www.linkedin.com/in/sanjarbek-otabekov-0600733bb/',
      linkedinHandle: 'in/sanjarbek-otabekov',
      github: 'https://github.com/sanjarbek0828',
      githubHandle: 'github.com/sanjarbek0828',
      website: 'https://sanjarme.uz',
      availability: 'Yangi loyihalar va to‘liq bandlik uchun ochiq',
    },
    summary:
      'Next.js 15/16, React 19, TypeScript va zamonaviy bulutli arxitektura bo‘yicha ixtisoslashgan Full Stack muhandis. Meta Certified dasturchi. Yuqori yuklanishga bardoshli elektron tijorat platformalari, sun‘iy intellekt (Google Gemini NLP) integratsiyalari, 3D WebGL interfeyslari hamda xavfsiz REST API larni noldan arxitektura qilish va ishlab chiqish bo‘yicha amaliy tajribaga ega. Katta hajmdagi ma‘lumotlar oqimida 98+ PageSpeed unumdorligi va OWASP xavfsizlik standartlarini ta‘minlashga yo‘naltirilgan.',
    skills: [
      {
        category: 'Frontend & UI Muhandisligi',
        items: [
          'TypeScript',
          'JavaScript (ES6+)',
          'Next.js 15/16 (App Router, SSR, SSG)',
          'React 19',
          'Tailwind CSS v4',
          'HTML5 & CSS3',
          'Three.js & WebGL (3D)',
          'Framer Motion',
          'PWA (Progressive Web Apps)',
          'Responsive & Adaptive UI',
        ],
      },
      {
        category: 'Backend & Ma‘lumotlar Bazasi',
        items: [
          'Node.js',
          'Express.js',
          'Python',
          'Django',
          'Firebase (Firestore, Auth, Storage)',
          'PostgreSQL',
          'MySQL',
          'MongoDB',
          'RESTful APIs',
          'Telegram Bot API',
        ],
      },
      {
        category: 'Arxitektura, DevOps & Asboblar',
        items: [
          'Git & GitHub',
          'GitHub Actions (CI/CD)',
          'Vercel & Cloudflare',
          'Vite & Turbopack',
          'Web Audio API & Canvas API',
          '@dnd-kit (Drag & Drop)',
          'Linux & Shell',
          'npm / pnpm / yarn',
        ],
      },
      {
        category: 'Sun‘iy Intellekt & Xavfsizlik',
        items: [
          'Google Gemini API (NLP)',
          'Prompt Engineering',
          'OWASP Top 10 Security',
          'Xavfsizlik Auditi & Pen-testing',
          'Test-Driven Development (TDD / Jest)',
          'Web Performance & SEO',
        ],
      },
    ],
    experience: [
      {
        period: '2026 — Hozir',
        role: 'Full Stack Muhandis & Veb Konsultant',
        company: 'Mustaqil Frilans & Ishlab Chiqarish Loyihalari',
        location: 'Toshkent, O‘zbekiston (Masofaviy)',
        type: 'To‘liq bandlik / Shartnoma',
        description:
          'Mijozlar va bizneslar uchun Next.js 15, TypeScript, bulutli xizmatlar hamda sun‘iy intellekt asosida yuqori unumdorlikdagi raqamli mahsulotlarni arxitektura qilish va ishlab chiqish.',
        achievements: [
          'mebelmashhura.uz elektron tijorat katalogini ishlab chiqib, sahifa yuklanish tezligini 1 soniyadan kam vaqtga tushirdi va mijozlarning buyurtma berish siklini 40% ga tezlashtirdi.',
          'FilmX kinoportalini yaratdi: 1,700+ kino va seriallar katalogi, Tas-ix CDN video oqimi, debounced tezkor qidiruv (⌘K) va 98+ PageSpeed natijasiga erishildi.',
          'Google Gemini API integratsiyalangan FINALYTIX moliya panelini qurib, 99% aniqlikdagi tabiiy til orqali xarajatlarni avtomatik hisoblash tizimini yaratdi.',
          'Telegram savdo botlari, CRM integratsiyalari va 100% oflayn ishlovchi PWA ilovalarni ishlab chiqdi.',
        ],
        techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Gemini API', 'Tas-ix CDN'],
      },
      {
        period: '2025 — 2026',
        role: 'Meta Certified Full Stack & Frontend Dasturchi',
        company: 'Meta & Coursera Xalqaro Ixtisoslashuv Dasturi',
        location: 'Xalqaro (Masofaviy)',
        type: 'Professional Akkreditatsiya',
        description:
          'Meta muhandislari tomonidan ishlab chiqilgan ilg‘or Full Stack va Frontend dasturlash standartlari bo‘yicha intensiv amaliy dastur.',
        achievements: [
          'Meta Full Stack Developer va Frontend Developer xalqaro maxsus sertifikatlarini muvaffaqiyatli himoya qildi.',
          'Django, Python, PostgreSQL va React asosida to‘liq xavfsiz RESTful arxitekturali backend tizimlarini ishlab chiqdi.',
          'Test-Driven Development (TDD), Jest testlari va avtomatlashtirilgan CI/CD quvurlarini loyihalarda qo‘lladi.',
        ],
        techStack: ['React', 'Node.js', 'Python', 'Django', 'PostgreSQL', 'MySQL', 'Jest', 'Git'],
      },
      {
        period: '2025',
        role: 'Kiberxavfsizlik & Tizim Himoyasi Amaliyotchi',
        company: 'Pearson & Coursera Professional Dasturlari',
        location: 'Xalqaro (Masofaviy)',
        type: 'Xavfsizlik Amaliyoti',
        description:
          'Veb-ilovalar va tarmoq infratuzilmasi xavfsizligini ta‘minlash, OWASP zaifliklarini audit qilish va xavfsiz kod yozish metodologiyalari.',
        achievements: [
          'Certified Ethical Hacker (Pearson) va Cyber Security Leadership akkreditatsiyalariga ega bo‘ldi.',
          'Veb-loyihalarda XSS, CSRF, SQL Injection kabi OWASP Top 10 zaifliklarini bartaraf etish bo‘yicha amaliy himoya qatlamlarini joriy qildi.',
          'Google Prompting Essentials kursi orqali sun‘iy intellekt yordamida dasturlash va kod samaradorligini 2 barobar oshirish usullarini o‘zlashtirdi.',
        ],
        techStack: ['Ethical Hacking', 'OWASP Top 10', 'Penetration Testing', 'Network Security', 'Prompt Engineering'],
      },
    ],
    projects: [
      {
        title: 'FilmX — Kinolar va Seriallar Portali',
        role: 'Lead Architect & Full Stack Developer',
        category: 'Full Stack & Streaming',
        techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Tas-ix CDN', 'Real-time Stats', 'PWA'],
        description:
          '1,700+ dan ortiq tarjima kinolar va seriallar, Tas-ix 1080p Full HD video oqimi, real-time tomoshabinlar monitoringi va ⌘K tezkor qidiruviga ega yirik kinoportal.',
        highlights: [
          'Tas-ix tarmog‘ida katta video fayllarni kechikishsiz oqimlash (streaming) arxitekturasi.',
          '98+ PageSpeed ko‘rsatkichi va Android APK / PWA integratsiyasi.',
        ],
        liveUrl: 'https://filmx-series.vercel.app/',
        githubUrl: 'https://github.com/sanjarbek0828',
      },
      {
        title: 'mebelmashhura.uz — E-Commerce Katalogi',
        role: 'Full Stack Dasturchi',
        category: 'Elektron Tijorat',
        techStack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Responsive Design'],
        description:
          'Zamonaviy mebel do‘koni uchun yaratilgan yuqori tezlikdagi elektron katalog va to‘g‘ridan-to‘g‘ri buyurtma platformasi.',
        highlights: [
          'Sayt yuklanish vaqti 1 soniyadan kam darajada optimallashtirildi.',
          'Mijozlarning mahsulot saralash va buyurtma berish jarayoni 40% ga tezlashdi.',
        ],
        liveUrl: 'https://mebelmashhura.uz',
        githubUrl: 'https://github.com/sanjarbek0828/mebelmashhura.uz',
      },
      {
        title: 'FINALYTIX — AI Expense Analyzer',
        role: 'AI & Frontend Engineer',
        category: 'Sun‘iy Intellekt / AI',
        techStack: ['React 19', 'TypeScript', 'Google Gemini API', 'Tailwind CSS', 'Recharts', 'Vite'],
        description:
          'Google Gemini API NLP integratsiyalangan aqlli moliya va xarajatlar tahlili boshqaruv paneli.',
        highlights: [
          'Foydalanuvchi tabiiy tilda kiritgan xarajatlarini 99% aniqlikda kategoriyalash.',
          'Xarajat kiritish vaqtini 10 soniyadan 2 soniyaga qisqartirdi.',
        ],
        liveUrl: 'https://sanjarbek404.github.io/FINALYTIX-Dashboard/',
        githubUrl: 'https://github.com/sanjarbek404/FINALYTIX-Dashboard',
      },
      {
        title: 'TaskFlow Board — Kanban Tizimi',
        role: 'Lead Frontend Dasturchi',
        category: 'SaaS / Unumdorlik',
        techStack: ['React 19', 'TypeScript', '@dnd-kit/core', 'Tailwind CSS v4', 'Vite'],
        description:
          'Interaktiv drag-and-drop Kanban vazifalar boshqaruv taxtasi va sprint boshqaruv platformasi.',
        highlights: [
          'dnd-kit sensorlari yordamida 60 FPS darajasida silliq harakatlanish.',
          '100% oflayn ishlash qobiliyati va LocalStorage sinxronizatsiyasi.',
        ],
        liveUrl: 'https://sanjarbek404.github.io/TaskFlow-Board/',
        githubUrl: 'https://github.com/sanjarbek404/TaskFlow-Board',
      },
      {
        title: '3D Earth WebGL',
        role: '3D Grafika & Frontend Muhandisi',
        category: '3D Web Ilova',
        techStack: ['Three.js', 'WebGL', 'JavaScript', 'HTML5 Canvas', 'CSS3'],
        description:
          'Yer sayyorasining Three.js va WebGL texnologiyalari asosidagi 60 FPS silliq interaktiv 3D maketi.',
        highlights: [
          'GPU apparat tezlanishi bilan kadr yo‘qotishlarsiz 60 FPS aylanish.',
          'Sub-megabayt teksturalar orqali ultra-tezkor yuklanish.',
        ],
        liveUrl: 'https://sanjarbek404.github.io/3d-earth/',
        githubUrl: 'https://github.com/sanjarbek0828/3d-earth',
      },
    ],
    certifications: [
      {
        title: 'Meta Frontend Developer Specialization',
        issuer: 'Meta (Coursera)',
        year: '2026',
        skills: ['React', 'JavaScript', 'HTML5 & CSS3', 'UI/UX', 'Version Control'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/C54O8ZTSKJIQ',
      },
      {
        title: 'Meta Full Stack Developer: Front-End & Back-End',
        issuer: 'Meta (Coursera)',
        year: '2026',
        skills: ['React', 'Node.js', 'Python', 'Django', 'RESTful APIs', 'Databases'],
        url: 'https://coursera.org/verify/specialization/HMSLCW4X6WZ7',
      },
      {
        title: 'Google AI Professional Certificate',
        issuer: 'Google (Coursera)',
        year: '2026',
        skills: ['Artificial Intelligence', 'Generative AI', 'Prompt Engineering', 'Machine Learning'],
        url: 'https://coursera.org/verify/professional-cert/FLHNOQPCAX7V',
      },
      {
        title: 'Certified Ethical Hacker',
        issuer: 'Pearson (Coursera)',
        year: '2025',
        skills: ['Network Security', 'Penetration Testing', 'Security Assessment', 'OWASP'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/9IMPH143RVW1',
      },
      {
        title: 'Google Prompting Essentials',
        issuer: 'Google (Coursera)',
        year: '2025',
        skills: ['Prompt Engineering', 'Generative AI', 'LLM Workflow Optimization'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/1U0E3OMLWJWR',
      },
      {
        title: 'Git & GitHub Complete Master Class',
        issuer: 'Packt (Coursera)',
        year: '2025',
        skills: ['Git', 'GitHub Actions', 'CI/CD Pipelines', 'Branching Strategies'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/3B0CS1JKDHU2',
      },
      {
        title: 'JavaScript from Beginner to Expert 2.0',
        issuer: 'Packt (Coursera)',
        year: '2025',
        skills: ['Modern JavaScript', 'ES6+', 'Asynchronous Programming', 'DOM API'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/KQ31TMD7P02Q',
      },
      {
        title: 'Cybersecurity in Modern Organizations & Leadership',
        issuer: 'Coursera',
        year: '2025',
        skills: ['Organizational Security', 'Threat Analysis', 'Cyber Defense'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/XS5P97I39JMV',
      },
    ],
    education: [
      {
        degree: 'Axborot Texnologiyalari va Dasturiy Ta‘minot Muhandisligi',
        institution: 'Amaliy Tadqiqot & Meta/Google Xalqaro Akademiyasi',
        period: '2024 — Hozir',
        description:
          'Dasturiy injiniring, ma‘lumotlar tuzilmalari, tarmoq protokollari, veb-arxitektura va zamonaviy xalqaro ixtisosliklar.',
      },
    ],
    languages: [
      { name: 'O‘zbek tili', level: 'Ona tili (Native)' },
      { name: 'Ingliz tili', level: 'Texnik / B2 (Kasbiy muloqot va hujjatlar)' },
      { name: 'Rus tili', level: 'Erkin muloqot (Conversational)' },
    ],
    ui: {
      backToPortfolio: 'Portfolioga qaytish',
      downloadPdf: 'PDF Yuklab Olish',
      printResume: 'Chop Etish / PDF',
      copyLink: 'Rezyume Havolasini Nusxalash',
      linkCopied: 'Havola nusxalandi!',
      directPdfDownload: 'To‘g‘ridan-to‘g‘ri .PDF fayl',
      summaryTitle: 'Kasbiy Xulosa & Profil',
      skillsTitle: 'Texnik Ko‘nikmalar & Texnologiyalar',
      experienceTitle: 'Amaliy Ish Tajribasi',
      projectsTitle: 'Asosiy Loyihalar & Yechimlar',
      certificationsTitle: 'Xalqaro Sertifikatlar & Akkreditatsiyalar',
      educationTitle: 'Ta‘lim & Mutaxassislik',
      languagesTitle: 'Tillar',
      liveDemo: 'Jonli Sayt',
      sourceCode: 'Manba Kodi',
      verifiedCredential: 'Tekshirish',
      atsNote: 'ATS-moslashtirilgan professional rezyume formati',
    },
  },

  en: {
    personal: {
      fullName: 'Sanjarbek Otabekov',
      title: 'Full Stack Software Engineer',
      tagline: 'Architecting fast, secure, and modern digital platforms',
      location: 'Tashkent, Uzbekistan (Open to Remote Worldwide)',
      email: 'sanjarbekotabekov010@gmail.com',
      telegram: 'https://t.me/sanjarbekdev',
      telegramHandle: '@sanjarbekdev',
      linkedin: 'https://www.linkedin.com/in/sanjarbek-otabekov-0600733bb/',
      linkedinHandle: 'in/sanjarbek-otabekov',
      github: 'https://github.com/sanjarbek0828',
      githubHandle: 'github.com/sanjarbek0828',
      website: 'https://sanjarme.uz',
      availability: 'Available for full-time roles & high-impact contracts',
    },
    summary:
      'Meta-certified Full Stack Software Engineer specialized in Next.js 15/16, React 19, TypeScript, and modern cloud architecture. Proven expertise in building production-grade e-commerce applications, artificial intelligence integrations (Google Gemini NLP), interactive 3D WebGL interfaces, and resilient backend services. Passionate about engineering high-velocity web experiences with sub-second page loads, 98+ PageSpeed scores, and strict adherence to OWASP security standards.',
    skills: [
      {
        category: 'Frontend & UI Engineering',
        items: [
          'TypeScript',
          'JavaScript (ES6+)',
          'Next.js 15/16 (App Router, SSR, SSG)',
          'React 19',
          'Tailwind CSS v4',
          'HTML5 & CSS3',
          'Three.js & WebGL (3D)',
          'Framer Motion',
          'PWA (Progressive Web Apps)',
          'Responsive Design & Accessibility',
        ],
      },
      {
        category: 'Backend & Databases',
        items: [
          'Node.js',
          'Express.js',
          'Python',
          'Django',
          'Firebase (Firestore, Auth, Storage)',
          'PostgreSQL',
          'MySQL',
          'MongoDB',
          'RESTful APIs',
          'Telegram Bot API',
        ],
      },
      {
        category: 'Architecture, DevOps & Tools',
        items: [
          'Git & GitHub',
          'GitHub Actions (CI/CD)',
          'Vercel & Cloudflare',
          'Vite & Turbopack',
          'Web Audio API & Canvas API',
          '@dnd-kit (Drag & Drop)',
          'Linux & Bash',
          'npm / pnpm / yarn',
        ],
      },
      {
        category: 'AI & Application Security',
        items: [
          'Google Gemini API (NLP & Structuring)',
          'Prompt Engineering',
          'OWASP Top 10 Security',
          'Security Audits & Pen-testing',
          'Test-Driven Development (TDD / Jest)',
          'Web Performance & Core Web Vitals',
        ],
      },
    ],
    experience: [
      {
        period: '2026 — Present',
        role: 'Full Stack Software Engineer & Web Consultant',
        company: 'Independent Freelance & Production Engagements',
        location: 'Tashkent, Uzbekistan (Remote)',
        type: 'Full-time / Contract',
        description:
          'Engineering and deploying high-performance digital platforms and web applications using Next.js 15, TypeScript, cloud services, and AI APIs for international and local clients.',
        achievements: [
          'Engineered mebelmashhura.uz e-commerce platform, achieving sub-second page loads (<1s) and accelerating customer order cycles by 40%.',
          'Architected FilmX cinema platform featuring 1,700+ films and series, Tas-ix CDN streaming, instant debounced search (⌘K), and a 98+ PageSpeed rating.',
          'Developed FINALYTIX AI financial dashboard integrated with Google Gemini API NLP, categorizing natural language transactions with 99% accuracy.',
          'Engineered robust Telegram e-commerce bots, CRM workflows, and offline-capable PWA applications.',
        ],
        techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Gemini API', 'Tas-ix CDN'],
      },
      {
        period: '2025 — 2026',
        role: 'Meta Certified Full Stack & Frontend Engineer',
        company: 'Meta & Coursera International Specialization',
        location: 'Global (Remote)',
        type: 'Professional Credential',
        description:
          'Rigorous training and practical software development in frontend and backend engineering following Meta software engineering standards.',
        achievements: [
          'Earned Meta Full Stack Developer and Meta Frontend Developer professional credentials.',
          'Built secure RESTful services and relational database schemas with Django, Python, PostgreSQL, and React.',
          'Implemented Test-Driven Development (TDD) with Jest and automated CI/CD deployment pipelines on GitHub Actions.',
        ],
        techStack: ['React', 'Node.js', 'Python', 'Django', 'PostgreSQL', 'MySQL', 'Jest', 'Git'],
      },
      {
        period: '2025',
        role: 'Cybersecurity & Systems Practitioner',
        company: 'Pearson & Coursera Professional Programs',
        location: 'Global (Remote)',
        type: 'Security Practicum',
        description:
          'Securing modern web infrastructures, conducting vulnerability assessments, mitigating OWASP threats, and defensive engineering.',
        achievements: [
          'Earned Certified Ethical Hacker (Pearson) and Cybersecurity Leadership credentials.',
          'Hardened web applications against OWASP Top 10 vulnerabilities (XSS, CSRF, Injection, Auth flaws).',
          'Completed Google Prompting Essentials, leveraging generative AI to increase development throughput by 2x.',
        ],
        techStack: ['Ethical Hacking', 'OWASP Top 10', 'Penetration Testing', 'Network Security', 'Prompt Engineering'],
      },
    ],
    projects: [
      {
        title: 'FilmX — Cinema & Series Platform',
        role: 'Lead Architect & Full Stack Developer',
        category: 'Full Stack & Streaming',
        techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Tas-ix CDN', 'Real-time Stats', 'PWA'],
        description:
          'High-performance online streaming portal with 1,700+ titles, Tas-ix 1080p Full HD video pipelines, real-time viewer counters, and ⌘K instant search.',
        highlights: [
          'Buffer-free video delivery across regional CDN networks.',
          'Scored 98+ on Google PageSpeed with PWA and native Android integration.',
        ],
        liveUrl: 'https://filmx-series.vercel.app/',
        githubUrl: 'https://github.com/sanjarbek0828',
      },
      {
        title: 'mebelmashhura.uz — E-Commerce Platform',
        role: 'Full Stack Developer',
        category: 'E-Commerce',
        techStack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Responsive Design'],
        description:
          'Modern furniture store catalog and online ordering system optimized for speed and conversion.',
        highlights: [
          'Reduced initial page load to under 1 second.',
          'Accelerated user product selection and order placement by 40%.',
        ],
        liveUrl: 'https://mebelmashhura.uz',
        githubUrl: 'https://github.com/sanjarbek0828/mebelmashhura.uz',
      },
      {
        title: 'FINALYTIX — AI Expense Analyzer',
        role: 'AI & Frontend Engineer',
        category: 'Artificial Intelligence',
        techStack: ['React 19', 'TypeScript', 'Google Gemini API', 'Tailwind CSS', 'Recharts', 'Vite'],
        description:
          'Intelligent personal finance and expense dashboard powered by Google Gemini NLP.',
        highlights: [
          '99% accurate natural language expense categorization (multilingual).',
          'Reduced expense entry overhead from 10s to 2s.',
        ],
        liveUrl: 'https://sanjarbek404.github.io/FINALYTIX-Dashboard/',
        githubUrl: 'https://github.com/sanjarbek404/FINALYTIX-Dashboard',
      },
      {
        title: 'TaskFlow Board — Kanban Platform',
        role: 'Lead Frontend Developer',
        category: 'SaaS / Productivity',
        techStack: ['React 19', 'TypeScript', '@dnd-kit/core', 'Tailwind CSS v4', 'Vite'],
        description:
          'Fluid drag-and-drop task and sprint management system with zero-delay interactions.',
        highlights: [
          'Silky 60 FPS drag-and-drop powered by @dnd-kit sensors.',
          '100% offline capability with atomic LocalStorage sync.',
        ],
        liveUrl: 'https://sanjarbek404.github.io/TaskFlow-Board/',
        githubUrl: 'https://github.com/sanjarbek404/TaskFlow-Board',
      },
      {
        title: '3D Earth WebGL',
        role: '3D Graphics & Frontend Engineer',
        category: 'Interactive 3D',
        techStack: ['Three.js', 'WebGL', 'JavaScript', 'HTML5 Canvas', 'CSS3'],
        description:
          'High-performance 60 FPS 3D globe visualization built with Three.js and raw WebGL shaders.',
        highlights: [
          'Consistent 60 FPS rendering using GPU hardware acceleration.',
          'Sub-megabyte asset loading ensuring near-instant page boot.',
        ],
        liveUrl: 'https://sanjarbek404.github.io/3d-earth/',
        githubUrl: 'https://github.com/sanjarbek0828/3d-earth',
      },
    ],
    certifications: [
      {
        title: 'Meta Frontend Developer Specialization',
        issuer: 'Meta (Coursera)',
        year: '2026',
        skills: ['React', 'JavaScript', 'HTML5 & CSS3', 'UI/UX', 'Version Control'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/C54O8ZTSKJIQ',
      },
      {
        title: 'Meta Full Stack Developer: Front-End & Back-End',
        issuer: 'Meta (Coursera)',
        year: '2026',
        skills: ['React', 'Node.js', 'Python', 'Django', 'RESTful APIs', 'Databases'],
        url: 'https://coursera.org/verify/specialization/HMSLCW4X6WZ7',
      },
      {
        title: 'Google AI Professional Certificate',
        issuer: 'Google (Coursera)',
        year: '2026',
        skills: ['Artificial Intelligence', 'Generative AI', 'Prompt Engineering', 'Machine Learning'],
        url: 'https://coursera.org/verify/professional-cert/FLHNOQPCAX7V',
      },
      {
        title: 'Certified Ethical Hacker',
        issuer: 'Pearson (Coursera)',
        year: '2025',
        skills: ['Network Security', 'Penetration Testing', 'Security Assessment', 'OWASP'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/9IMPH143RVW1',
      },
      {
        title: 'Google Prompting Essentials',
        issuer: 'Google (Coursera)',
        year: '2025',
        skills: ['Prompt Engineering', 'Generative AI', 'LLM Workflow Optimization'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/1U0E3OMLWJWR',
      },
      {
        title: 'Git & GitHub Complete Master Class',
        issuer: 'Packt (Coursera)',
        year: '2025',
        skills: ['Git', 'GitHub Actions', 'CI/CD Pipelines', 'Branching Strategies'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/3B0CS1JKDHU2',
      },
      {
        title: 'JavaScript from Beginner to Expert 2.0',
        issuer: 'Packt (Coursera)',
        year: '2025',
        skills: ['Modern JavaScript', 'ES6+', 'Asynchronous Programming', 'DOM API'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/KQ31TMD7P02Q',
      },
      {
        title: 'Cybersecurity in Modern Organizations & Leadership',
        issuer: 'Coursera',
        year: '2025',
        skills: ['Organizational Security', 'Threat Analysis', 'Cyber Defense'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/XS5P97I39JMV',
      },
    ],
    education: [
      {
        degree: 'Software Engineering & Computer Science Foundations',
        institution: 'Independent Research & Meta/Google International Academy',
        period: '2024 — Present',
        description:
          'Software engineering, data structures, network protocols, web systems, and modern global accreditations.',
      },
    ],
    languages: [
      { name: 'Uzbek', level: 'Native' },
      { name: 'English', level: 'Professional Working / B2 (Technical docs & collaboration)' },
      { name: 'Russian', level: 'Conversational' },
    ],
    ui: {
      backToPortfolio: 'Back to Portfolio',
      downloadPdf: 'Download PDF',
      printResume: 'Print / Save as PDF',
      copyLink: 'Copy Resume Link',
      linkCopied: 'Link copied!',
      directPdfDownload: 'Direct .PDF file',
      summaryTitle: 'Professional Summary',
      skillsTitle: 'Technical Skills & Proficiencies',
      experienceTitle: 'Professional Experience',
      projectsTitle: 'Featured Production Projects',
      certificationsTitle: 'Certifications & Accreditations',
      educationTitle: 'Education & Academics',
      languagesTitle: 'Languages',
      liveDemo: 'Live Demo',
      sourceCode: 'Source Code',
      verifiedCredential: 'Verify',
      atsNote: 'ATS-compatible professional resume format',
    },
  },

  ru: {
    personal: {
      fullName: 'Санжарбек Отабеков',
      title: 'Full Stack Инженер-Разработчик',
      tagline: 'Архитектура быстрых, защищённых и современных цифровых систем',
      location: 'Ташкент, Узбекистан (Готов к удалённой работе)',
      email: 'sanjarbekotabekov010@gmail.com',
      telegram: 'https://t.me/sanjarbekdev',
      telegramHandle: '@sanjarbekdev',
      linkedin: 'https://www.linkedin.com/in/sanjarbek-otabekov-0600733bb/',
      linkedinHandle: 'in/sanjarbek-otabekov',
      github: 'https://github.com/sanjarbek0828',
      githubHandle: 'github.com/sanjarbek0828',
      website: 'https://sanjarme.uz',
      availability: 'Открыт для предложений и full-time позиций',
    },
    summary:
      'Full Stack инженер с глубокой экспертизой в Next.js 15/16, React 19, TypeScript и облачных архитектурах. Обладатель международных квалификаций Meta и Google. Опыт проектирования коммерческих e-commerce сервисов, внедрения решений на базе искусственного интеллекта (Google Gemini NLP), интерактивных 3D WebGL платформ и надежных RESTful API. Фокус на достижении максимальной скорости загрузки (<1 сек, 98+ PageSpeed) и строгом соблюдении стандартов безопасности OWASP.',
    skills: [
      {
        category: 'Frontend & UI Инженерия',
        items: [
          'TypeScript',
          'JavaScript (ES6+)',
          'Next.js 15/16 (App Router, SSR, SSG)',
          'React 19',
          'Tailwind CSS v4',
          'HTML5 & CSS3',
          'Three.js & WebGL (3D)',
          'Framer Motion',
          'PWA (Progressive Web Apps)',
          'Адаптивный и отзывчивый UI',
        ],
      },
      {
        category: 'Backend & Базы Данных',
        items: [
          'Node.js',
          'Express.js',
          'Python',
          'Django',
          'Firebase (Firestore, Auth, Storage)',
          'PostgreSQL',
          'MySQL',
          'MongoDB',
          'RESTful APIs',
          'Telegram Bot API',
        ],
      },
      {
        category: 'Архитектура, DevOps & Инструменты',
        items: [
          'Git & GitHub',
          'GitHub Actions (CI/CD)',
          'Vercel & Cloudflare',
          'Vite & Turbopack',
          'Web Audio API & Canvas API',
          '@dnd-kit (Drag & Drop)',
          'Linux & Bash',
          'npm / pnpm / yarn',
        ],
      },
      {
        category: 'ИИ & Безопасность Приложений',
        items: [
          'Google Gemini API (NLP)',
          'Prompt Engineering',
          'OWASP Top 10 Security',
          'Аудит безопасности & Pen-testing',
          'Test-Driven Development (TDD / Jest)',
          'Оптимизация производительности & SEO',
        ],
      },
    ],
    experience: [
      {
        period: '2026 — Настоящее время',
        role: 'Full Stack Инженер & Веб-Консультант',
        company: 'Независимая Разработка & Production Проекты',
        location: 'Ташкент, Узбекистан (Удаленно)',
        type: 'Полная занятость / Контракт',
        description:
          'Проектирование и разработка современных масштабируемых веб-систем, e-commerce платформ и Telegram-сервисов с использованием Next.js 15, TypeScript и ИИ.',
        achievements: [
          'Разработал коммерческий каталог mebelmashhura.uz со временем загрузки менее 1 секунды, сократив цикл оформления заказа на 40%.',
          'Спроектировал платформу FilmX: 1,700+ фильмов, стриминг через Tas-ix CDN, мгновенный клавиатурный поиск (⌘K) и оценка PageSpeed 98+.',
          'Интегрировал Google Gemini API NLP в аналитический дашборд FINALYTIX с точностью парсинга финансовых данных 99%.',
          'Создал Telegram боты для автоматизации продаж и автономные PWA веб-приложения.',
        ],
        techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Firebase', 'Gemini API', 'Tas-ix CDN'],
      },
      {
        period: '2025 — 2026',
        role: 'Meta Certified Full Stack & Frontend Разработчик',
        company: 'Международная программа Meta & Coursera',
        location: 'Международный (Удаленно)',
        type: 'Профессиональная Квалификация',
        description:
          'Интенсивная практическая программа подготовки под руководством инженеров Meta, охватывающая полный стек разработки веб-приложений.',
        achievements: [
          'Получил международные сертификаты Meta Full Stack Developer и Meta Frontend Developer.',
          'Реализовал защищенные REST API на Django, Python, PostgreSQL и фронтенд на React.',
          'Внедрил практики Test-Driven Development (TDD) с Jest и автоматические пайплайны CI/CD на GitHub Actions.',
        ],
        techStack: ['React', 'Node.js', 'Python', 'Django', 'PostgreSQL', 'MySQL', 'Jest', 'Git'],
      },
      {
        period: '2025',
        role: 'Специалист по Кибербезопасности & Защите Систем',
        company: 'Pearson & Coursera Professional Programs',
        location: 'Международный (Удаленно)',
        type: 'Практикум Безопасности',
        description:
          'Обеспечение безопасности веб-инфраструктуры, аудит уязвимостей, предотвращение угроз OWASP и защищенное программирование.',
        achievements: [
          'Аттестован по направлениям Certified Ethical Hacker (Pearson) и Cyber Security Leadership.',
          'Реализовал комплексную защиту от угроз OWASP Top 10 (XSS, CSRF, Injection, утечки аутентификации).',
          'Освоил Google Prompting Essentials для двукратного ускорения процессов проектирования и тестирования с помощью ИИ.',
        ],
        techStack: ['Ethical Hacking', 'OWASP Top 10', 'Penetration Testing', 'Network Security', 'Prompt Engineering'],
      },
    ],
    projects: [
      {
        title: 'FilmX — Портал Фильмов и Сериалов',
        role: 'Lead Architect & Full Stack Developer',
        category: 'Full Stack & Streaming',
        techStack: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Tas-ix CDN', 'Real-time Stats', 'PWA'],
        description:
          'Масштабный стриминговый портал: 1,700+ фильмов, Tas-ix 1080p Full HD видеопотоки, мониторинг зрителей в реальном времени и быстрый поиск ⌘K.',
        highlights: [
          'Бесперебойный видеостриминг через региональные CDN-сети.',
          '98+ баллов по Google PageSpeed, интеграция с PWA и Android APK.',
        ],
        liveUrl: 'https://filmx-series.vercel.app/',
        githubUrl: 'https://github.com/sanjarbek0828',
      },
      {
        title: 'mebelmashhura.uz — E-Commerce Каталог',
        role: 'Full Stack Разработчик',
        category: 'Электронная Коммерция',
        techStack: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Responsive Design'],
        description:
          'Каталог мебели и быстрая система онлайн-заказа, ориентированная на максимальную конверсию.',
        highlights: [
          'Скорость первичной загрузки снижена до менее 1 секунды.',
          'Процесс оформления заказа клиентами ускорился на 40%.',
        ],
        liveUrl: 'https://mebelmashhura.uz',
        githubUrl: 'https://github.com/sanjarbek0828/mebelmashhura.uz',
      },
      {
        title: 'FINALYTIX — AI Expense Analyzer',
        role: 'AI & Frontend Инженер',
        category: 'Искусственный Интеллект',
        techStack: ['React 19', 'TypeScript', 'Google Gemini API', 'Tailwind CSS', 'Recharts', 'Vite'],
        description:
          'Умный финансовый дашборд на базе Google Gemini API NLP для мгновенного анализа расходов.',
        highlights: [
          '99% точность автоматической классификации расходов на естественном языке.',
          'Время внесения записи сокращено с 10 до 2 секунд.',
        ],
        liveUrl: 'https://sanjarbek404.github.io/FINALYTIX-Dashboard/',
        githubUrl: 'https://github.com/sanjarbek404/FINALYTIX-Dashboard',
      },
      {
        title: 'TaskFlow Board — Kanban Система',
        role: 'Lead Frontend Разработчик',
        category: 'SaaS / Продуктивность',
        techStack: ['React 19', 'TypeScript', '@dnd-kit/core', 'Tailwind CSS v4', 'Vite'],
        description:
          'Интерактивная доска задач с поддержкой drag-and-drop и гибким управлением спринтами.',
        highlights: [
          'Плавный drag-and-drop с частотой 60 FPS на базе @dnd-kit.',
          '100% автономная работа офлайн с синхронизацией в LocalStorage.',
        ],
        liveUrl: 'https://sanjarbek404.github.io/TaskFlow-Board/',
        githubUrl: 'https://github.com/sanjarbek404/TaskFlow-Board',
      },
      {
        title: '3D Earth WebGL',
        role: '3D Графика & Frontend Инженер',
        category: 'Интерактивное 3D',
        techStack: ['Three.js', 'WebGL', 'JavaScript', 'HTML5 Canvas', 'CSS3'],
        description:
          'Интерактивная 3D-модель Земли на Three.js и WebGL с атмосферным освещением.',
        highlights: [
          'Стабильные 60 FPS за счет аппаратного ускорения GPU.',
          'Оптимизированные текстуры менее 1 МБ для мгновенного старта.',
        ],
        liveUrl: 'https://sanjarbek404.github.io/3d-earth/',
        githubUrl: 'https://github.com/sanjarbek0828/3d-earth',
      },
    ],
    certifications: [
      {
        title: 'Meta Frontend Developer Specialization',
        issuer: 'Meta (Coursera)',
        year: '2026',
        skills: ['React', 'JavaScript', 'HTML5 & CSS3', 'UI/UX', 'Version Control'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/C54O8ZTSKJIQ',
      },
      {
        title: 'Meta Full Stack Developer: Front-End & Back-End',
        issuer: 'Meta (Coursera)',
        year: '2026',
        skills: ['React', 'Node.js', 'Python', 'Django', 'RESTful APIs', 'Databases'],
        url: 'https://coursera.org/verify/specialization/HMSLCW4X6WZ7',
      },
      {
        title: 'Google AI Professional Certificate',
        issuer: 'Google (Coursera)',
        year: '2026',
        skills: ['Artificial Intelligence', 'Generative AI', 'Prompt Engineering', 'Machine Learning'],
        url: 'https://coursera.org/verify/professional-cert/FLHNOQPCAX7V',
      },
      {
        title: 'Certified Ethical Hacker',
        issuer: 'Pearson (Coursera)',
        year: '2025',
        skills: ['Network Security', 'Penetration Testing', 'Security Assessment', 'OWASP'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/9IMPH143RVW1',
      },
      {
        title: 'Google Prompting Essentials',
        issuer: 'Google (Coursera)',
        year: '2025',
        skills: ['Prompt Engineering', 'Generative AI', 'LLM Workflow Optimization'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/1U0E3OMLWJWR',
      },
      {
        title: 'Git & GitHub Complete Master Class',
        issuer: 'Packt (Coursera)',
        year: '2025',
        skills: ['Git', 'GitHub Actions', 'CI/CD Pipelines', 'Branching Strategies'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/3B0CS1JKDHU2',
      },
      {
        title: 'JavaScript from Beginner to Expert 2.0',
        issuer: 'Packt (Coursera)',
        year: '2025',
        skills: ['Modern JavaScript', 'ES6+', 'Asynchronous Programming', 'DOM API'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/KQ31TMD7P02Q',
      },
      {
        title: 'Cybersecurity in Modern Organizations & Leadership',
        issuer: 'Coursera',
        year: '2025',
        skills: ['Organizational Security', 'Threat Analysis', 'Cyber Defense'],
        url: 'https://www.coursera.org/account/accomplishments/specialization/XS5P97I39JMV',
      },
    ],
    education: [
      {
        degree: 'Программная Инженерия и Компьютерные Науки',
        institution: 'Практические исследования & Международная Академия Meta/Google',
        period: '2024 — Настоящее время',
        description:
          'Архитектура ПО, структуры данных, сетевые протоколы, веб-системы и международные квалификации.',
      },
    ],
    languages: [
      { name: 'Узбекский', level: 'Родной (Native)' },
      { name: 'Английский', level: 'Технический / B2 (Профессиональная документация и общение)' },
      { name: 'Русский', level: 'Разговорный (Свободное владение)' },
    ],
    ui: {
      backToPortfolio: 'Вернуться в портфолио',
      downloadPdf: 'Скачать PDF',
      printResume: 'Печать / Сохранить в PDF',
      copyLink: 'Скопировать ссылку',
      linkCopied: 'Ссылка скопирована!',
      directPdfDownload: 'Прямой файл .PDF',
      summaryTitle: 'Профессиональный Профиль',
      skillsTitle: 'Технические Навыки & Стек',
      experienceTitle: 'Опыт Работы & Практика',
      projectsTitle: 'Ключевые Production Проекты',
      certificationsTitle: 'Сертификаты & Квалификации',
      educationTitle: 'Образование & Академия',
      languagesTitle: 'Языки',
      liveDemo: 'Демо онлайн',
      sourceCode: 'Исходный код',
      verifiedCredential: 'Проверить',
      atsNote: 'ATS-оптимизированный формат профессионального резюме',
    },
  },
};
