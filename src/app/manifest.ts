import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sanjarbek Otabekov — Full Stack Dasturchi',
    short_name: 'sanjarme.uz',
    description: "Sanjarbek Otabekovning rasmiy portfoliosi va zamonaviy veb-muhandislik xizmatlari.",
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    lang: 'uz',
    orientation: 'portrait',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/images/personaj-sanjarbek.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
