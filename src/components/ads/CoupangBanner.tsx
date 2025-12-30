'use client'

import { ExternalLink } from 'lucide-react'

interface CoupangBannerProps {
  type: 'book' | 'lucky' | 'planner'
  className?: string
}

const bannerContent = {
  book: {
    title: '2026 운세 도서 추천',
    description: '사주명리학 입문서부터 운세 가이드까지',
    emoji: '📚',
    bgClass: 'from-emerald-900/30 to-emerald-800/20',
    borderClass: 'border-emerald-700/30',
  },
  lucky: {
    title: '행운을 부르는 아이템',
    description: '파워스톤, 행운 팔찌, 부적',
    emoji: '🍀',
    bgClass: 'from-amber-900/30 to-amber-800/20',
    borderClass: 'border-amber-700/30',
  },
  planner: {
    title: '2026 신년 다이어리',
    description: '새해 계획을 위한 플래너 & 다이어리',
    emoji: '📅',
    bgClass: 'from-blue-900/30 to-blue-800/20',
    borderClass: 'border-blue-700/30',
  },
}

export default function CoupangBanner({ type, className = '' }: CoupangBannerProps) {
  const content = bannerContent[type]

  return (
    <div
      className={`relative overflow-hidden rounded-xl border p-4 ${content.bgClass} ${content.borderClass} ${className}`}
      style={{ background: `linear-gradient(135deg, var(--tw-gradient-stops))` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{content.emoji}</span>
          <div>
            <div className="font-semibold text-stone-200">{content.title}</div>
            <div className="text-sm text-stone-400">{content.description}</div>
          </div>
        </div>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="flex items-center gap-1 px-4 py-2 rounded-full bg-gold-500/20 border border-gold-500/40 text-gold-400 text-sm font-medium hover:bg-gold-500/30 transition-colors"
        >
          보러가기
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      <p className="mt-2 text-xs text-stone-600">
        * 이 포스팅은 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.
      </p>
    </div>
  )
}

// 쿠팡 파트너스 스크립트 삽입을 위한 컴포넌트 (실제 연동 시 사용)
export function CoupangPartnerScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          // 쿠팡 파트너스 트래킹 코드
          // 실제 쿠팡 파트너스 가입 후 발급받은 코드로 교체하세요
        `,
      }}
    />
  )
}
