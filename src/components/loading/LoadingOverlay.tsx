'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, ArrowLeft, Sparkles } from 'lucide-react'

// 쿠팡 파트너스 간편 링크
const COUPANG_AFFILIATE_LINK = 'https://link.coupang.com/a/djBn85'

const LOADING_MESSAGES = [
  { text: '운명의 문을 여는 중...', subtext: 'Opening the gates of destiny' },
  { text: '사주팔자를 읽고 있습니다', subtext: 'Reading your Four Pillars' },
  { text: '오행의 기운을 분석 중...', subtext: 'Analyzing the Five Elements' },
  { text: '2026년 병오년 운세 계산 중', subtext: 'Calculating your 2026 fortune' },
  { text: '천간과 지지를 해석하는 중...', subtext: 'Interpreting heavenly stems' },
]

const BAGUA_SYMBOLS = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷']
const PILLARS = ['年', '月', '日', '時']

// Ember particle component
function Ember({ delay, duration, startX, startY }: {
  delay: number
  duration: number
  startX: number
  startY: number
}) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full"
      style={{
        left: `${startX}%`,
        bottom: `${startY}%`,
        background: 'radial-gradient(circle, #f59e0b 0%, #dc2626 50%, transparent 100%)',
        boxShadow: '0 0 6px 2px rgba(245, 158, 11, 0.6)',
      }}
      initial={{ opacity: 0, y: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 1, 0],
        y: [-20, -100, -200, -300],
        x: [0, (Math.random() - 0.5) * 100],
        scale: [0, 1, 0.5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  )
}

// Orbiting symbol component
function OrbitingSymbol({ symbol, index, total, radius }: {
  symbol: string
  index: number
  total: number
  radius: number
}) {
  const angle = (index / total) * 360

  return (
    <motion.div
      className="absolute text-2xl font-bold"
      style={{
        color: index % 2 === 0 ? '#f59e0b' : '#dc2626',
        textShadow: '0 0 20px currentColor, 0 0 40px currentColor',
        filter: 'drop-shadow(0 0 10px currentColor)',
      }}
      initial={{ opacity: 0 }}
      animate={{
        opacity: [0.4, 1, 0.4],
        rotate: [angle, angle + 360],
      }}
      transition={{
        opacity: { duration: 2, repeat: Infinity },
        rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
      }}
    >
      <motion.span
        style={{
          display: 'block',
          transform: `rotate(${-angle}deg) translateX(${radius}px) rotate(${angle}deg)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          delay: index * 0.3,
          repeat: Infinity,
        }}
      >
        {symbol}
      </motion.span>
    </motion.div>
  )
}

// Fire Horse SVG
function FireHorse() {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-32 h-32"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
    >
      <defs>
        <linearGradient id="fireGradient" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="30%" stopColor="#dc2626" />
          <stop offset="70%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#fef3c7" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Stylized Horse - Abstract flame shape */}
      <motion.path
        d="M50 10
           C60 20, 75 25, 80 35
           C85 45, 82 55, 75 60
           C80 65, 85 75, 80 85
           C75 90, 65 92, 55 90
           C50 95, 45 95, 40 90
           C30 92, 20 88, 18 80
           C15 70, 20 60, 25 55
           C18 50, 15 40, 20 30
           C25 20, 35 15, 50 10Z"
        fill="url(#fireGradient)"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{
          pathLength: 1,
          d: [
            "M50 10 C60 20, 75 25, 80 35 C85 45, 82 55, 75 60 C80 65, 85 75, 80 85 C75 90, 65 92, 55 90 C50 95, 45 95, 40 90 C30 92, 20 88, 18 80 C15 70, 20 60, 25 55 C18 50, 15 40, 20 30 C25 20, 35 15, 50 10Z",
            "M50 8 C62 18, 78 23, 82 33 C88 43, 84 53, 77 58 C82 63, 88 73, 82 83 C77 88, 67 90, 57 88 C52 93, 47 93, 42 88 C32 90, 22 86, 20 78 C17 68, 22 58, 27 53 C20 48, 17 38, 22 28 C27 18, 37 13, 50 8Z",
            "M50 10 C60 20, 75 25, 80 35 C85 45, 82 55, 75 60 C80 65, 85 75, 80 85 C75 90, 65 92, 55 90 C50 95, 45 95, 40 90 C30 92, 20 88, 18 80 C15 70, 20 60, 25 55 C18 50, 15 40, 20 30 C25 20, 35 15, 50 10Z",
          ]
        }}
        transition={{
          pathLength: { duration: 2, ease: 'easeInOut' },
          d: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
        }}
      />

      {/* Horse head silhouette */}
      <motion.path
        d="M55 25 C60 20, 68 22, 70 28 C72 32, 68 38, 62 40 C58 42, 54 38, 55 32 Z"
        fill="#1c1917"
        opacity={0.3}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* 馬 character */}
      <motion.text
        x="50"
        y="62"
        textAnchor="middle"
        fontSize="24"
        fontWeight="bold"
        fill="#1c1917"
        opacity={0.6}
        style={{ fontFamily: 'serif' }}
        animate={{
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        馬
      </motion.text>
    </motion.svg>
  )
}

export default function LoadingOverlay({
  isVisible,
  onComplete
}: {
  isVisible: boolean
  onComplete?: () => void
}) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'coupang'>('loading')

  // 쿠팡 버튼 클릭 핸들러
  const handleCoupangClick = useCallback(() => {
    // 쿠팡 새 탭으로 열기
    window.open(COUPANG_AFFILIATE_LINK, '_blank', 'noopener,noreferrer')
    // 결과 페이지로 이동
    onComplete?.()
  }, [onComplete])

  // 뒤로가기 핸들러
  const handleBack = useCallback(() => {
    window.history.back()
  }, [])

  useEffect(() => {
    if (!isVisible) {
      // Reset state when hidden
      setPhase('loading')
      setProgress(0)
      setMessageIndex(0)
      return
    }

    // Cycle through messages
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % LOADING_MESSAGES.length)
    }, 1500)

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(messageInterval)
          // 로딩 완료 후 쿠팡 인터스티셜로 전환
          setTimeout(() => setPhase('coupang'), 500)
          return 100
        }
        return prev + 2
      })
    }, 60)

    return () => {
      clearInterval(messageInterval)
      clearInterval(progressInterval)
    }
  }, [isVisible])

  // Generate embers
  const embers = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 2,
    startX: 40 + Math.random() * 20,
    startY: Math.random() * 20,
  }))

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Background layers */}
          <div className="absolute inset-0 bg-stone-950" />

          {/* Cosmic gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(ellipse at 50% 50%, rgba(124, 58, 237, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse at 30% 70%, rgba(220, 38, 38, 0.1) 0%, transparent 40%),
                radial-gradient(ellipse at 70% 30%, rgba(245, 158, 11, 0.1) 0%, transparent 40%)
              `,
            }}
          />

          {/* 쿠팡 인터스티셜 화면 */}
          {phase === 'coupang' && (
            <motion.div
              className="relative z-10 flex flex-col items-center px-6 max-w-lg mx-auto text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* 아이콘 */}
              <motion.div
                className="mb-6 p-5 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-12 h-12 text-orange-400" />
              </motion.div>

              {/* 메인 텍스트 */}
              <h2 className="text-2xl md:text-3xl font-bold text-stone-100 mb-3">
                사주 분석이 완료되었습니다!
              </h2>
              <p className="text-stone-400 mb-8">
                아래 버튼을 눌러 쿠팡을 방문하시면<br />
                결과를 확인하실 수 있습니다.
              </p>

              {/* 쿠팡 버튼 */}
              <motion.button
                onClick={handleCoupangClick}
                className="w-full py-4 px-6 rounded-2xl font-bold text-lg text-white
                  bg-gradient-to-r from-red-600 via-orange-500 to-amber-500
                  hover:from-red-500 hover:via-orange-400 hover:to-amber-400
                  shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40
                  transition-all duration-300 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>쿠팡 방문하고 결과보기</span>
                <ExternalLink className="w-5 h-5" />
              </motion.button>

              {/* 뒤로가기 안내 */}
              <button
                onClick={handleBack}
                className="mt-4 flex items-center gap-2 text-stone-500 hover:text-stone-300 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>원치 않을 경우 뒤로가기</span>
              </button>

              {/* 파트너스 고지 문구 */}
              <div className="mt-8 p-4 rounded-xl bg-stone-800/50 border border-stone-700/50">
                <p className="text-xs text-stone-500 leading-relaxed">
                  이 포스팅은 쿠팡 파트너스 활동의 일환으로,<br />
                  이에 따른 일정액의 수수료를 제공받습니다.
                </p>
              </div>

              {/* 년도 표시 */}
              <div className="mt-6 flex items-center gap-2">
                <span className="text-sm text-stone-600">丙午年</span>
                <span className="w-1 h-1 rounded-full bg-gold-500" />
                <span className="text-sm text-gold-500/80">2026</span>
              </div>
            </motion.div>
          )}

          {/* 로딩 화면 */}
          {phase === 'loading' && (
            <>
              {/* Animated noise texture */}
              <motion.div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                }}
                animate={{ opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Ember particles */}
              <div className="absolute inset-0">
                {embers.map((ember) => (
                  <Ember key={ember.id} {...ember} />
                ))}
              </div>

              {/* Central content */}
              <div className="relative flex flex-col items-center">
            {/* Outer rotating ring - Bagua symbols */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64">
                {BAGUA_SYMBOLS.map((symbol, i) => (
                  <OrbitingSymbol
                    key={symbol}
                    symbol={symbol}
                    index={i}
                    total={BAGUA_SYMBOLS.length}
                    radius={120}
                  />
                ))}
              </div>
            </div>

            {/* Inner rotating ring - Four Pillars */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="relative w-48 h-48"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              >
                {PILLARS.map((pillar, i) => (
                  <motion.div
                    key={pillar}
                    className="absolute left-1/2 top-1/2 text-xl font-bold text-gold-400"
                    style={{
                      transform: `translate(-50%, -50%) rotate(${i * 90}deg) translateY(-70px)`,
                      textShadow: '0 0 15px rgba(245, 158, 11, 0.8)',
                    }}
                    animate={{
                      opacity: [0.5, 1, 0.5],
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.5,
                      repeat: Infinity,
                    }}
                  >
                    <span style={{ display: 'inline-block', transform: `rotate(${-i * 90 + 360}deg)` }}>
                      {pillar}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Pulsing glow behind horse */}
            <motion.div
              className="absolute w-40 h-40 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(220, 38, 38, 0.4) 0%, rgba(245, 158, 11, 0.2) 40%, transparent 70%)',
                filter: 'blur(20px)',
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Fire Horse */}
            <FireHorse />

            {/* Glass message panel */}
            <motion.div
              className="mt-12 px-8 py-5 rounded-2xl backdrop-blur-xl border border-white/10"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={messageIndex}
                  className="text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-lg font-medium text-stone-100 mb-1">
                    {LOADING_MESSAGES[messageIndex].text}
                  </p>
                  <p className="text-xs text-stone-500 tracking-wide">
                    {LOADING_MESSAGES[messageIndex].subtext}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar */}
              <div className="mt-4 h-1 bg-stone-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #7c3aed, #dc2626, #f59e0b)',
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <p className="mt-2 text-xs text-stone-600 text-center">
                {progress}%
              </p>
            </motion.div>

            {/* Year indicator */}
            <motion.div
              className="mt-6 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="text-sm text-stone-600">丙午年</span>
              <span className="w-1 h-1 rounded-full bg-gold-500" />
              <span className="text-sm text-gold-500/80">2026</span>
            </motion.div>
          </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
