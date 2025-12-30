'use client'

import { useEffect, useRef } from 'react'

interface AdsenseSlotProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'horizontal' | 'vertical'
  className?: string
}

export default function AdsenseSlot({
  adSlot,
  adFormat = 'auto',
  className = '',
}: AdsenseSlotProps) {
  const adRef = useRef<HTMLModElement>(null)

  useEffect(() => {
    // 실제 환경에서만 광고 로드
    if (typeof window !== 'undefined' && adRef.current) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (e) {
        console.error('Adsense error:', e)
      }
    }
  }, [])

  return (
    <div className={`adsense-container ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // 실제 AdSense 클라이언트 ID로 교체
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  )
}

// AdSense 스크립트를 head에 삽입하기 위한 컴포넌트
export function AdsenseScript() {
  return (
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
      crossOrigin="anonymous"
    />
  )
}

// 개발 환경에서 광고 자리를 보여주는 플레이스홀더
export function AdsensePlaceholder({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-stone-800/50 border border-dashed border-stone-700 rounded-xl p-6 ${className}`}
    >
      <div className="text-center">
        <div className="text-2xl mb-2">📢</div>
        <div className="text-sm text-stone-500">광고 영역</div>
        <div className="text-xs text-stone-600">(개발 모드)</div>
      </div>
    </div>
  )
}
