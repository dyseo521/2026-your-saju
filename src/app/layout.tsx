import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#dc2626',
}

export const metadata: Metadata = {
  title: {
    default: '2026 신년 사주 | 병오년 무료 사주풀이',
    template: '%s | 2026 신년 사주'
  },
  description: '2026년 병오년 신년 사주를 무료로 확인하세요. 사주팔자, 오행 분석, 월별 운세까지 쉽고 정확하게 알려드립니다.',
  keywords: ['2026 사주', '신년 운세', '병오년', '사주풀이', '무료 사주', '오행', '사주팔자', '운세'],
  authors: [{ name: '2026 신년 사주' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://2026-your-saju.com',
    siteName: '2026 신년 사주',
    title: '2026 신년 사주 - 나의 병오년 운세는?',
    description: '2026년 병오년, 당신의 사주를 무료로 확인하세요. 불의 해, 새로운 시작을 위한 운세 가이드.',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: '2026 신년 사주 - 병오년 무료 사주풀이'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: '2026 신년 사주 - 병오년 무료 사주풀이',
    description: '2026년 병오년 신년 사주를 무료로 확인하세요',
    images: ['/og-image.png']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: '2026 신년 사주',
              description: '2026년 병오년 무료 사주풀이 서비스',
              applicationCategory: 'LifestyleApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'KRW'
              }
            })
          }}
        />
      </head>
      <body>
        {/* Cosmic Background */}
        <div className="cosmic-bg" />

        {/* Animated Stars */}
        <div className="stars" aria-hidden="true">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="relative min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}
