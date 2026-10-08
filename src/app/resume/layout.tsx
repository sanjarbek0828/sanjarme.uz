import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sanjarbek Otabekov — Professional Resume & CV | Full Stack Software Engineer',
  description:
    'Professional CV / Resume of Sanjarbek Otabekov — Full Stack Software Engineer specializing in Next.js 16, React 19, TypeScript, Node.js, and AI integrations.',
  openGraph: {
    title: 'Sanjarbek Otabekov — Professional Resume & CV',
    description:
      'Explore Sanjarbek Otabekov’s professional experience, technical skills, production projects, and Meta/Google certifications.',
    url: 'https://sanjarme.uz/resume',
    siteName: 'Sanjarbek Otabekov — Portfolio',
    images: [
      {
        url: '/images/personaj-sanjarbek.webp',
        width: 1200,
        height: 630,
        alt: 'Sanjarbek Otabekov Resume / CV',
      },
    ],
  },
  alternates: {
    canonical: 'https://sanjarme.uz/resume',
  },
};

export default function ResumeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
