import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ThemeProvider } from "@/lib/theme-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sanjarme.uz"),
  title: {
    default: "Sanjarbek Otabekov — Full Stack Dasturchi & Web Muhandis | sanjarme.uz",
    template: "%s | Sanjarbek Otabekov — sanjarme.uz",
  },
  description:
    "Sanjarbek Otabekov — zamonaviy, tezkor va xavfsiz veb-saytlar, Next.js ilovalar hamda professional Telegram botlar yaratuvchi tajribali Full Stack dasturchi. Portfolio, loyihalar va xizmatlar.",
  keywords: [
    "Sanjarbek Otabekov",
    "sanjarme.uz",
    "sanjarme",
    "Sanjarbek",
    "Full Stack Dasturchi",
    "Full Stack Developer Uzbekistan",
    "Next.js dasturchi",
    "React dasturchi",
    "Veb dasturchi O'zbekiston",
    "Sayt yaratish Toshkent",
    "Sayt buyurtma qilish",
    "Telegram bot yaratish",
    "Telegram bot buyurtma",
    "Veb-sayt buyurtma berish",
    "TypeScript Engineer",
    "Node.js Developer",
    "Frontend Dasturchi",
    "Backend Dasturchi",
    "Software Engineer Tashkent",
    "Web Development Portfolio",
    "Tailwind CSS",
    "Firebase Dasturchi",
    "PostgreSQL",
    "Python Developer",
  ],
  authors: [{ name: "Sanjarbek Otabekov", url: "https://sanjarme.uz" }],
  creator: "Sanjarbek Otabekov",
  publisher: "Sanjarbek Otabekov",
  category: "technology",
  classification: "Portfolio & Web Development Services",
  alternates: {
    canonical: "https://sanjarme.uz",
  },
  openGraph: {
    type: "website",
    locale: "uz_UZ",
    alternateLocale: ["en_US", "ru_RU"],
    url: "https://sanjarme.uz",
    title: "Sanjarbek Otabekov — Full Stack Dasturchi & Web Muhandis | sanjarme.uz",
    description:
      "Zamonaviy veb-saytlar, Next.js ilovalar va professional Telegram botlar yaratuvchi tajribali Full Stack muhandis portfoliosi.",
    siteName: "Sanjarbek Otabekov — sanjarme.uz",
    images: [
      {
        url: "/images/personaj-sanjarbek.png",
        width: 1200,
        height: 630,
        alt: "Sanjarbek Otabekov — Full Stack Dasturchi (sanjarme.uz)",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanjarbek Otabekov — Full Stack Dasturchi | sanjarme.uz",
    description:
      "Zamonaviy veb-saytlar, Next.js ilovalar va professional Telegram botlar yaratuvchi Full Stack dasturchi portfoliosi.",
    images: ["/images/personaj-sanjarbek.webp"],
    creator: "@sanjarbekdev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://sanjarme.uz/#person",
      "name": "Sanjarbek Otabekov",
      "alternateName": ["Sanjarbek", "sanjarme", "sanjarme.uz", "Sanjarbek Developer"],
      "jobTitle": "Full Stack Dasturchi & Dasturiy Ta'minot Muhandisi",
      "description": "Next.js, React, TypeScript, Node.js, Telegram botlar va bulutli tizimlar bo'yicha ixtisoslashgan Full Stack muhandis.",
      "url": "https://sanjarme.uz",
      "image": "https://sanjarme.uz/images/personaj-sanjarbek.webp",
      "email": "sanjarbekotabekov010@gmail.com",
      "nationality": {
        "@type": "Country",
        "name": "Uzbekistan"
      },
      "homeLocation": {
        "@type": "Place",
        "name": "Tashkent, Uzbekistan"
      },
      "sameAs": [
        "https://github.com/sanjarbek0828",
        "https://www.linkedin.com/in/sanjarbek-otabekov-0600733bb/",
        "https://t.me/sanjarbekdev"
      ],
      "knowsAbout": [
        "Web Development",
        "Full Stack Development",
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Python",
        "Tailwind CSS",
        "Firebase",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Docker",
        "Git",
        "Telegram Bot Development",
        "REST API",
        "Cloud Architecture"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://sanjarme.uz/#website",
      "url": "https://sanjarme.uz",
      "name": "Sanjarbek Otabekov — Full Stack Dasturchi | sanjarme.uz",
      "alternateName": "sanjarme.uz",
      "description": "Sanjarbek Otabekovning rasmiy veb-sayti va portfoliosi: loyihalar, texnologiyalar, xizmatlar.",
      "inLanguage": ["uz", "en"],
      "publisher": {
        "@id": "https://sanjarme.uz/#person"
      }
    },
    {
      "@type": "ProfilePage",
      "@id": "https://sanjarme.uz/#profilepage",
      "url": "https://sanjarme.uz",
      "name": "Sanjarbek Otabekov — Portfolio",
      "mainEntity": {
        "@id": "https://sanjarme.uz/#person"
      }
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://sanjarme.uz/#service",
      "name": "Sanjarbek Otabekov — Web & Bot Development",
      "image": "https://sanjarme.uz/images/personaj-sanjarbek.png",
      "url": "https://sanjarme.uz",
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Tashkent",
        "addressCountry": "UZ"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Dasturlash xizmatlari",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Telegram Bot yaratish",
              "description": "To'lov tizimlari va biznes logikasini avtomatlashtiruvchi Telegram botlar."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Landing Page va Veb-saytlar",
              "description": "Yuqori tezlikdagi, qulay va konversiyali veb-saytlar."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Full Stack Veb Ilovalar",
              "description": "Next.js va zamonaviy backend texnologiyalari bilan yaratilgan to'liq tizimlar."
            }
          }
        ]
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`dark ${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var t = localStorage.getItem('theme');
                if (t === 'light' || (!t && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                } else {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                }
              } catch (e) {}
              try {
                // Safeguard against browser extensions injecting attributes (e.g. bis_skin_checked) before React hydration
                if (typeof MutationObserver !== 'undefined') {
                  var obs = new MutationObserver(function(mutations) {
                    for (var i = 0; i < mutations.length; i++) {
                      if (mutations[i].attributeName === 'bis_skin_checked' && mutations[i].target && mutations[i].target.removeAttribute) {
                        mutations[i].target.removeAttribute('bis_skin_checked');
                      }
                    }
                  });
                  obs.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['bis_skin_checked'] });
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body 
        suppressHydrationWarning 
        className="min-h-screen bg-white dark:bg-black text-neutral-900 dark:text-neutral-100 font-sans antialiased selection:bg-neutral-200 dark:selection:bg-neutral-800 transition-colors duration-300"
      >
        <AuthProvider>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
