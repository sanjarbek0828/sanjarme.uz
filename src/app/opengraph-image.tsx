import { ImageResponse } from 'next/og';

export const alt = 'Sanjarbek Otabekov — Full Stack Dasturchi | sanjarme.uz';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#000000',
          backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.15), transparent 45%), radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.15), transparent 45%)',
          padding: '80px',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 24px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '20px',
              fontWeight: 600,
              letterSpacing: '0.05em',
              color: '#38bdf8',
            }}
          >
            ● sanjarme.uz
          </div>
          <div
            style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.6)',
              fontFamily: 'monospace',
            }}
          >
            Tashkent, Uzbekistan
          </div>
        </div>

        {/* Center content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div
            style={{
              fontSize: '68px',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            Sanjarbek Otabekov
          </div>
          <div
            style={{
              fontSize: '38px',
              fontWeight: 600,
              background: 'linear-gradient(to right, #38bdf8, #818cf8)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.01em',
            }}
          >
            Full Stack Dasturchi & Web Arxitektor
          </div>
          <div
            style={{
              fontSize: '24px',
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            Next.js • TypeScript • React • Node.js • Telegram Botlar • Cloud Arxitektura
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            fontSize: '22px',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <div>Zamonaviy, tezkor va yuqori ishonchlilikka ega tizimlar</div>
          <div style={{ color: '#38bdf8', fontWeight: 600 }}>https://sanjarme.uz →</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
