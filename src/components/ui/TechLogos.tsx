import React from 'react';

interface LogoProps {
  className?: string;
  glow?: boolean;
}

// 1. React
export const ReactLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2"/>
      <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
      <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
    </g>
  </svg>
);

// 2. Next.js
export const NextjsLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 180 180" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <mask id="nextjs-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180" style={{ maskType: 'alpha' }}>
      <circle cx="90" cy="90" r="90" fill="black"/>
    </mask>
    <g mask="url(#nextjs-mask)">
      <circle cx="90" cy="90" r="90" fill="currentColor" className="text-black dark:text-white"/>
      <path d="M149.508 157.438L69.1478 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.136 149.508 157.438Z" fill="currentColor" className="text-white dark:text-black"/>
      <rect x="115" y="54" width="12" height="72" fill="currentColor" className="text-white dark:text-black"/>
    </g>
  </svg>
);

// 3. TypeScript
export const TypescriptLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="128" height="128" rx="24" fill="#3178C6"/>
    <path d="M72.9 61.3h-16v45.2H43.7V61.3h-16V50h45.2v11.3zm13.6 34.6c2.8 2.2 6.5 3.5 10.9 3.5 6.4 0 10.4-3.3 10.4-8.3 0-5.1-3.6-7.3-10.7-10.4-9.8-4.2-14.9-8.7-14.9-17.7 0-9.6 7.7-16.7 20-16.7 6.1 0 11.2 1.6 15 4.7l-4.5 9.4c-3.1-2.1-6.8-3.2-10.7-3.2-5.7 0-9 3.1-9 7.2 0 4.7 3.3 6.7 10.6 9.8 10.5 4.5 15.2 9.3 15.2 18.3 0 10.6-8.2 17.8-21.4 17.8-7.3 0-13.6-2.1-18.4-5.9l4.5-8.5z" fill="#ffffff"/>
  </svg>
);

// 4. Tailwind CSS
export const TailwindLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#38BDF8"/>
  </svg>
);

// 5. Framer Motion
export const FramerMotionLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#0055FF"/>
  </svg>
);

// 6. HTML5 / Modern CSS
export const Html5Logo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0z" fill="#E34F26"/>
    <path d="M12 22.006l6.842-1.948 1.571-17.702H12V22.006z" fill="#EF652A"/>
    <path d="M12 9.68h-3.48l-.24-2.72H12V4.544H5.795l.722 8.16H12V9.68zm0 6.643l-.014.004-2.908-.786-.186-2.081H6.467l.366 4.103 5.153 1.431.014-.004V16.323z" fill="#EBEBEB"/>
    <path d="M12 9.68h3.48l-.328 3.68H12v2.416h2.825l-.268 3.01-2.557.69V22l5.153-1.43.722-8.16H12V9.68zm0-5.136v2.416h5.928l.215-2.416H12z" fill="#FFFFFF"/>
  </svg>
);

// 7. State Management (Redux / Zustand)
export const ReduxLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.424 13.693c-.707 1.225-1.745 2.16-2.955 2.722a4.346 4.346 0 01-1.895.425c-.718 0-1.402-.19-2.005-.538a4.912 4.912 0 01-1.637-1.603 6.944 6.944 0 01-.892-2.399 9.387 9.387 0 01-.07-2.585 10.323 10.323 0 01.76-2.533 8.784 8.784 0 011.539-2.31 6.551 6.551 0 012.22-1.572c.866-.37 1.802-.55 2.736-.513.934.037 1.834.3 2.632.77a6.67 6.67 0 012.152 2.06c.582.89.96 1.905 1.11 2.966a9.584 9.584 0 01-.274 3.078 11.833 11.833 0 01-1.481 3.255l-.76-.719a10.87 10.87 0 001.328-2.915 8.647 8.647 0 00.245-2.732 6.786 6.786 0 00-.974-2.617 5.753 5.753 0 00-1.854-1.758 5.618 5.618 0 00-2.274-.658 5.602 5.602 0 00-2.37.438 5.748 5.748 0 00-1.928 1.365 7.763 7.763 0 00-1.348 2.023 9.215 9.215 0 00-.671 2.22 8.358 8.358 0 00.06 2.288 6.113 6.113 0 00.781 2.1 4.29 4.29 0 001.42 1.385c.52.298 1.11.458 1.724.458a3.792 3.792 0 001.637-.367c1.037-.48 1.93-1.285 2.544-2.34l.79.438z" fill="#764ABC"/>
    <circle cx="12" cy="12" r="2" fill="#764ABC"/>
  </svg>
);

// 8. Node.js & Express
export const NodejsLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2.5L3.5 9.7v14.6L16 31.5l12.5-7.2V9.7L16 2.5z" fill="#5FA04E"/>
    <path d="M16 4.3l10.9 6.3v12.8L16 29.7 5.1 23.4V10.6L16 4.3z" fill="#333333"/>
    <path d="M16 11.2c-3.1 0-4.8 1.5-4.8 3.8 0 3.7 5.4 2.9 5.4 4.8 0 .8-.7 1.3-1.8 1.3-1.5 0-2.6-.7-3.4-1.6l-1.3 1.5c1.1 1.3 2.7 2.1 4.7 2.1 3.2 0 4.9-1.6 4.9-3.9 0-3.8-5.5-3-5.5-4.8 0-.7.6-1.2 1.6-1.2 1.2 0 2.2.5 3 1.3l1.3-1.5c-1.1-1.1-2.5-1.8-4.1-1.8z" fill="#5FA04E"/>
  </svg>
);

// 9. Nest.js
export const NestjsLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 256 256" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M228.6 30.6c-4.9-2.2-31.5-4.6-59.5 15.6-21.7 15.7-27.1 35.8-21.6 46.2 5.5 10.4 22.3 9.4 34.6 4 12.3-5.4 19.3-13.8 23.9-20.9 4.6-7.1 22.6-44.9 22.6-44.9z" fill="#E0234E"/>
    <path d="M208.6 71.5c-5.5-3.3-25.7-1.1-47.5 14.8-21.8 15.9-26.6 34.7-20.7 44.9 5.9 10.2 21.6 9.1 33.6 4 12-5.1 18.7-13.1 23.2-20 4.5-6.9 11.4-43.7 11.4-43.7z" fill="#DF234F"/>
    <path d="M129.5 86.8c-1.6-3.8-11.8-19.1-34.9-20.1-23.1-1-45.7 11.9-57.9 33.8-12.2 21.9-9.1 48.7 7.7 67.2 16.8 18.5 43.1 25.1 66.8 16.7 23.7-8.4 38.8-29.3 38.3-52.9-.5-23.6-20-44.7-20-44.7z" fill="#E0234E"/>
    <path d="M72.2 147.6c-13.2-14.5-15.6-35.6-6-52.8 9.6-17.2 27.3-27.3 45.4-26.5 18.1.8 26.1 12.8 27.4 15.8 1.3 3 16.6 19.5 17 38.1.4 18.6-11.5 35-30.1 41.6-18.6 6.6-39.3 1.5-53.7-16.2z" fill="#E0234E"/>
  </svg>
);

// 10. Python / FastAPI
export const PythonLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 128 128" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M63.2 0C32.7 0 34.6 13.2 34.6 13.2l.1 13.7h29.2v4.1H23.5S3.3 28.7 3.3 59.3s17.6 29.5 17.6 29.5h10.5v-14.8s-.6-17.6 17.3-17.6h28.1s16.7.3 16.7-16.2V16.2S95.6 0 63.2 0zm-15.9 9.1c3.1 0 5.6 2.5 5.6 5.6 0 3.1-2.5 5.6-5.6 5.6-3.1 0-5.6-2.5-5.6-5.6 0-3.1 2.5-5.6 5.6-5.6z" fill="#3776AB"/>
    <path d="M64.8 128c30.5 0 28.6-13.2 28.6-13.2l-.1-13.7H64.1V97h40.4s20.2 2.3 20.2-28.3-17.6-29.5-17.6-29.5h-10.5v14.8s.6 17.6-17.3 17.6H51.2s-16.7-.3-16.7 16.2v24s-2.1 16.2 30.3 16.2zm15.9-9.1c-3.1 0-5.6-2.5-5.6-5.6 0-3.1 2.5-5.6 5.6-5.6 3.1 0 5.6 2.5 5.6 5.6 0 3.1-2.5 5.6-5.6 5.6z" fill="#FFD438"/>
  </svg>
);

// 11. REST & GraphQL
export const GraphqlLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l8.66 5v10L12 22 3.34 17V7L12 2z" stroke="#E10098" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="2" r="1.5" fill="#E10098"/>
    <circle cx="20.66" cy="7" r="1.5" fill="#E10098"/>
    <circle cx="20.66" cy="17" r="1.5" fill="#E10098"/>
    <circle cx="12" cy="22" r="1.5" fill="#E10098"/>
    <circle cx="3.34" cy="17" r="1.5" fill="#E10098"/>
    <circle cx="3.34" cy="7" r="1.5" fill="#E10098"/>
    <path d="M3.34 7l17.32 10M20.66 7L3.34 17M12 2v20" stroke="#E10098" strokeWidth="1"/>
  </svg>
);

// 12. WebSockets & SSE
export const WebsocketLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" fill="#00D8FF"/>
  </svg>
);

// 13. Server Actions / Cloud Functions
export const ServerActionsLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="7" rx="2" stroke="currentColor" className="text-neutral-700 dark:text-neutral-300" strokeWidth="1.5"/>
    <rect x="2" y="14" width="20" height="7" rx="2" stroke="currentColor" className="text-neutral-700 dark:text-neutral-300" strokeWidth="1.5"/>
    <circle cx="6" cy="6.5" r="1" fill="#10B981"/>
    <circle cx="6" cy="17.5" r="1" fill="#10B981"/>
    <path d="M15 6.5h3M15 17.5h3" stroke="currentColor" className="text-neutral-500" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

// 14. PostgreSQL
export const PostgresqlLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 3.31 1.61 6.24 4.09 8.04.16-.7.42-1.57.81-2.48.71-1.66 1.76-3.21 2.87-4.14-1.34-.69-2.27-2.08-2.27-3.7 0-2.32 1.88-4.2 4.2-4.2 2.32 0 4.2 1.88 4.2 4.2 0 1.62-.93 3.01-2.27 3.7 1.11.93 2.16 2.48 2.87 4.14.39.91.65 1.78.81 2.48C20.39 18.24 22 15.31 22 12c0-5.52-4.48-10-10-10z" fill="#336791"/>
    <circle cx="10" cy="9.5" r="1" fill="#ffffff"/>
    <circle cx="14" cy="9.5" r="1" fill="#ffffff"/>
  </svg>
);

// 15. Firebase / Firestore
export const FirebaseLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.89 15.672L6.155 1.543a.526.526 0 01.99-.12l3.228 6.075-6.483 8.174z" fill="#FFA000"/>
    <path d="M3.89 15.672L1.812 11.75a.527.527 0 01.886-.543l7.675 4.465-6.483 8.174z" fill="#F57C00"/>
    <path d="M12.015 22.502l8.095-4.544-2.583-15.91a.526.526 0 00-.946-.226l-4.566 20.68z" fill="#FFCA28"/>
  </svg>
);

// 16. MongoDB
export const MongodbLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.023 0C11.667 0 8.01 4.542 8.01 12.028c0 5.487 3.322 9.773 4.013 10.972.691-1.199 4.013-5.485 4.013-10.972C16.036 4.542 12.38 0 12.023 0z" fill="#47A248"/>
    <path d="M12.023 23c-.15 0-.3-.02-.45-.06-.11-.03-.21-.08-.3-.14-.07-.05-3.263-2.453-3.263-10.772 0-6.732 3.12-10.985 3.563-11.58.12-.17.31-.27.52-.28.21.01.4.11.52.28.443.595 3.563 4.848 3.563 11.58 0 8.319-3.193 10.722-3.263 10.772-.09.06-.19.11-.3.14-.15.04-.3.06-.45.06h-.09z" fill="#499D4A"/>
    <path d="M11.968 1.15c-.06.07-3.038 4.06-3.038 10.878 0 6.896 2.455 9.49 2.983 9.94V1.15h.055z" fill="#3FA037"/>
  </svg>
);

// 17. Redis Caching
export const RedisLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#DC382D"/>
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#DC382D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 18. Prisma ORM
export const PrismaLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.38 18.66l8.83-17.1a1 1 0 011.78 0l8.63 17.1a1 1 0 01-.89 1.45H3.27a1 1 0 01-.89-1.45z" stroke="#5A67D8" strokeWidth="1.5" fill="#5A67D8" fillOpacity="0.15"/>
    <path d="M12 3.5l6.5 14H5.5L12 3.5z" fill="#5A67D8"/>
  </svg>
);

// 19. Docker & Containers
export const DockerLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.5 11.5c-.3-.2-1.3-.7-2.6-.4-.2-.5-.5-1-1-1.3-.1 0-.3-.1-.4-.1-.1-.3-.3-.7-.6-.9-.3-.3-.7-.5-1.2-.5-.2 0-.4 0-.6.1-.5-1.2-1.7-1.8-1.8-1.9l-.4-.2-.3.3c-.5.6-.7 1.4-.7 2.2 0 .2 0 .5.1.7-.5.3-.9.7-1.2 1.2-.2 0-.4-.1-.6-.1-1.5 0-2.8.9-3.2 2.3H1c-.3 0-.6.1-.8.4-.2.2-.2.6-.2.8.7 4.1 4.1 6.8 8.6 6.8 6.1 0 10.9-4 12.3-7.5.9.1 1.7-.1 2.3-.5.2-.2.3-.4.3-.7 0-.2 0-.4 0-.6zm-17-1h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-6-3h2v2h-2v-2zm3 0h2v2h-2v-2zm3 0h2v2h-2v-2zm-3-3h2v2h-2v-2z" fill="#2496ED"/>
  </svg>
);

// 20. Git & GitHub Actions
export const GitLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.62 10.45L13.55 2.38a1.64 1.64 0 00-2.32 0L9.08 4.54l3.18 3.18a2.14 2.14 0 012.7 2.7l3.07 3.07a2.13 2.13 0 011.95 3.39 2.13 2.13 0 01-3.39-1.95l-2.87-2.87v5.33a2.13 2.13 0 11-1.5-.13v-5.5a2.13 2.13 0 01-1.14-2.8l-3.1-3.1L2.38 11.23a1.64 1.64 0 000 2.32l8.07 8.07a1.64 1.64 0 002.32 0l8.85-8.85a1.64 1.64 0 000-2.32z" fill="#F05032"/>
  </svg>
);

// 21. Linux & Bash
export const LinuxLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="3" width="20" height="18" rx="4" fill="currentColor" className="text-neutral-900 dark:text-neutral-100"/>
    <path d="M7 8l4 4-4 4M13 16h4" stroke="currentColor" className="text-white dark:text-black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// 22. Vercel & Cloudflare
export const VercelLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L24 22H0L12 2z"/>
  </svg>
);

// 23. AWS Essentials
export const AwsLogo: React.FC<LogoProps> = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.2 12.3c-.6 0-1.1.2-1.5.5-.4.3-.6.8-.6 1.4 0 .6.2 1.1.6 1.4.4.3.9.5 1.5.5.6 0 1.2-.2 1.6-.6.5-.4.7-.9.7-1.5v-1.7H6.2zm2.8 5.6h-1v-.8c-.4.3-.8.6-1.3.8-.5.2-1.1.3-1.7.3-.9 0-1.7-.3-2.2-.8-.6-.5-.9-1.3-.9-2.2 0-.9.3-1.6.9-2.1.6-.5 1.4-.8 2.4-.8h2v-1c0-.6-.1-1-.4-1.3-.3-.3-.8-.4-1.4-.4-.5 0-1 .1-1.3.4-.4.2-.6.5-.7.9h-1c.1-.6.4-1.1.9-1.5.5-.4 1.2-.6 2.1-.6.9 0 1.6.2 2.1.7.5.5.8 1.2.8 2.1v6.4zm4.4-6.3h1.1l1.5 5.5 1.6-5.5h1.1l1.6 5.5 1.5-5.5h1.1l-2.1 7.2h-1.1l-1.6-5.4-1.6 5.4h-1.1l-2.1-7.2zm-10.8 7.3c4.7 2.4 10.3 2.4 15 0 .4-.2.8.2.5.5-4.8 3.5-11.2 3.5-16 0-.3-.3.1-.7.5-.5z" fill="#FF9900"/>
  </svg>
);

// Master resolver by skill name
export const getAuthenticSkillLogo = (skillName: string, iconClass: string = "w-5 h-5") => {
  const lower = skillName.toLowerCase();

  if (lower.includes('react')) return <ReactLogo className={iconClass} />;
  if (lower.includes('next')) return <NextjsLogo className={iconClass} />;
  if (lower.includes('typescript') || lower.includes('ts')) return <TypescriptLogo className={iconClass} />;
  if (lower.includes('tailwind')) return <TailwindLogo className={iconClass} />;
  if (lower.includes('framer') || lower.includes('motion')) return <FramerMotionLogo className={iconClass} />;
  if (lower.includes('html') || lower.includes('css')) return <Html5Logo className={iconClass} />;
  if (lower.includes('redux') || lower.includes('zustand') || lower.includes('state')) return <ReduxLogo className={iconClass} />;
  if (lower.includes('node') || lower.includes('express')) return <NodejsLogo className={iconClass} />;
  if (lower.includes('nest')) return <NestjsLogo className={iconClass} />;
  if (lower.includes('python') || lower.includes('fastapi')) return <PythonLogo className={iconClass} />;
  if (lower.includes('graphql') || lower.includes('rest')) return <GraphqlLogo className={iconClass} />;
  if (lower.includes('websocket') || lower.includes('sse')) return <WebsocketLogo className={iconClass} />;
  if (lower.includes('server action')) return <ServerActionsLogo className={iconClass} />;
  if (lower.includes('postgres') || lower.includes('sql')) return <PostgresqlLogo className={iconClass} />;
  if (lower.includes('firebase') || lower.includes('firestore')) return <FirebaseLogo className={iconClass} />;
  if (lower.includes('mongo')) return <MongodbLogo className={iconClass} />;
  if (lower.includes('redis')) return <RedisLogo className={iconClass} />;
  if (lower.includes('prisma')) return <PrismaLogo className={iconClass} />;
  if (lower.includes('docker') || lower.includes('container')) return <DockerLogo className={iconClass} />;
  if (lower.includes('git')) return <GitLogo className={iconClass} />;
  if (lower.includes('linux') || lower.includes('bash')) return <LinuxLogo className={iconClass} />;
  if (lower.includes('vercel') || lower.includes('cloudflare')) return <VercelLogo className={iconClass} />;
  if (lower.includes('aws')) return <AwsLogo className={iconClass} />;

  // Default fallback to Next.js or React logo
  return <ReactLogo className={iconClass} />;
};
