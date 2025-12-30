'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Flame, Sparkles, Star, ArrowRight, Calendar, Share2, BookOpen } from 'lucide-react'

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden">
        {/* Fire Particles */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="fire-particle"
              style={{
                left: `${10 + Math.random() * 80}%`,
                bottom: '10%',
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>

        {/* Glowing Orb */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-radial from-red-600/20 via-orange-500/10 to-transparent blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-warm"
          >
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-medium text-orange-200">2026 병오년 丙午年</span>
            <span className="text-orange-400">•</span>
            <span className="text-sm text-orange-300/80">붉은 말의 해</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mb-6"
          >
            <span className="block text-4xl md:text-6xl lg:text-7xl font-bold text-fire-gradient" style={{ fontFamily: 'var(--font-display)' }}>
              2026 신년 사주
            </span>
            <span className="block mt-4 text-xl md:text-2xl lg:text-3xl text-stone-300 font-light">
              나의 사주팔자로 보는 새해 운세
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl mx-auto mb-10 text-lg text-stone-400 leading-relaxed"
          >
            생년월일시를 입력하면 당신의 <span className="text-gold-400">사주팔자</span>와{' '}
            <span className="text-gold-400">오행 분석</span>을 바탕으로
            <br className="hidden md:block" />
            2026년 한 해의 운세를 알려드립니다
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Link href="/input" className="inline-block">
              <button className="btn-fire group">
                <span className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  무료로 사주 보기
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
              </button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-stone-500"
          >
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-gold-500" />
              <span>정통 만세력 기반</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gold-500" />
              <span>음력/양력 지원</span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="w-4 h-4 text-gold-500" />
              <span>결과 카드 공유</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-stone-600 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1.5 h-1.5 rounded-full bg-gold-500"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="text-gold-gradient">쉽고 정확한</span> 사주풀이
            </h2>
            <p className="text-stone-400 text-lg">
              어려운 한자 대신 누구나 이해할 수 있는 쉬운 설명
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="card-mystical hover-lift"
              >
                <div className="pattern-overlay" />
                <div className={`inline-flex p-3 rounded-xl mb-4 ${feature.bgClass}`}>
                  <feature.icon className={`w-6 h-6 ${feature.iconClass}`} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-stone-100">{feature.title}</h3>
                <p className="text-stone-400 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Five Elements Preview */}
      <section className="relative py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="text-fire-gradient">오행</span> 분석
            </h2>
            <p className="text-stone-400 text-lg">
              목, 화, 토, 금, 수 다섯 가지 기운의 균형을 확인하세요
            </p>
          </motion.div>

          {/* Elements Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {elements.map((el, i) => (
              <motion.div
                key={el.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`element-badge element-${el.key}`}
              >
                <span className="text-xl">{el.hanja}</span>
                <span>{el.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Sample Chart */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-12 card-mystical"
          >
            <div className="pattern-overlay" />
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-stone-200">오행 분포 예시</h3>
              <span className="text-sm text-stone-500">Sample</span>
            </div>
            <div className="space-y-4">
              {elements.map((el) => (
                <div key={el.key} className="flex items-center gap-4">
                  <span className="w-8 text-center text-lg">{el.hanja}</span>
                  <div className="flex-1 h-3 rounded-full bg-stone-800 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${el.sample}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: el.color }}
                    />
                  </div>
                  <span className="w-12 text-right text-sm text-stone-400">{el.sample}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="card-mystical glow-fire"
          >
            <div className="pattern-overlay" />
            <Flame className="w-12 h-12 mx-auto mb-6 text-orange-400" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              2026년, 당신의 운명을 확인하세요
            </h2>
            <p className="text-stone-400 mb-8">
              병오년 붉은 말의 해, 새로운 시작을 위한 첫 걸음
            </p>
            <Link href="/input">
              <button className="btn-fire">
                <span className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5" />
                  지금 시작하기
                  <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-stone-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-stone-300">2026 신년 사주</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-stone-500">
              <Link href="/guide" className="hover:text-gold-500 transition-colors">사주 가이드</Link>
              <span>•</span>
              <span>© 2025 All rights reserved</span>
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-stone-600">
            본 서비스는 재미로 보는 운세이며, 중요한 결정은 전문가와 상담하세요.
          </p>
        </div>
      </footer>
    </main>
  )
}

const features = [
  {
    icon: BookOpen,
    title: '쉬운 해석',
    description: '어려운 사주 용어를 누구나 이해할 수 있는 쉬운 말로 풀어드립니다.',
    bgClass: 'bg-emerald-500/20',
    iconClass: 'text-emerald-400',
  },
  {
    icon: Sparkles,
    title: '오행 분석',
    description: '목, 화, 토, 금, 수 다섯 기운의 균형과 특성을 시각적으로 보여드립니다.',
    bgClass: 'bg-orange-500/20',
    iconClass: 'text-orange-400',
  },
  {
    icon: Calendar,
    title: '월별 운세',
    description: '2026년 12개월, 매월의 운세와 주의할 점을 한눈에 확인하세요.',
    bgClass: 'bg-blue-500/20',
    iconClass: 'text-blue-400',
  },
]

const elements = [
  { key: 'wood', name: '목', hanja: '木', color: '#22c55e', sample: 25 },
  { key: 'fire', name: '화', hanja: '火', color: '#ef4444', sample: 35 },
  { key: 'earth', name: '토', hanja: '土', color: '#eab308', sample: 15 },
  { key: 'metal', name: '금', hanja: '金', color: '#9ca3af', sample: 15 },
  { key: 'water', name: '수', hanja: '水', color: '#3b82f6', sample: 10 },
]
