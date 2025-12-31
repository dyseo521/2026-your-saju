'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  ArrowLeft,
  Share2,
  Calendar,
  Sparkles,
  ChevronDown,
  Heart,
  Briefcase,
  Users,
  Activity,
  Flame,
  RotateCcw,
  Check,
  Copy,
  Quote,
  Star
} from 'lucide-react'
import { calculateSaju, getElementPercentages, type SajuResult } from '@/lib/saju/calculator'
import { ELEMENTS, MONTHLY_FORTUNE_2026 } from '@/lib/saju/constants'

// Five Elements Chart Component
function FiveElementsChart({ elements }: { elements: SajuResult['elements'] }) {
  const percentages = getElementPercentages(elements)
  const elementList = Object.entries(ELEMENTS) as [keyof typeof ELEMENTS, typeof ELEMENTS[keyof typeof ELEMENTS]][]

  return (
    <div className="card-mystical">
      <div className="pattern-overlay" />
      <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-gold-500" />
        오행 분석
      </h3>

      {/* Circular Elements Display */}
      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48">
          {elementList.map(([ key, el ], i) => {
            const angle = (i * 72 - 90) * (Math.PI / 180)
            const x = 50 + 40 * Math.cos(angle)
            const y = 50 + 40 * Math.sin(angle)
            const size = 20 + (percentages[key] / 100) * 30

            return (
              <motion.div
                key={key}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className="absolute flex items-center justify-center"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div
                  className="rounded-full flex items-center justify-center font-bold shadow-lg"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: el.color,
                    boxShadow: `0 0 20px ${el.color}40`,
                  }}
                >
                  <span className="text-white text-sm">{el.hanja}</span>
                </div>
              </motion.div>
            )
          })}

          {/* Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <span className="text-3xl font-bold text-fire-gradient" style={{ fontFamily: 'var(--font-display)' }}>
              五行
            </span>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="space-y-3">
        {elementList.map(([ key, el ], i) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="flex items-center gap-3"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
              style={{ backgroundColor: el.color }}
            >
              {el.hanja}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-stone-300">{el.name} ({el.meaning.split(',')[0]})</span>
                <span className="text-sm text-stone-400">{percentages[key]}%</span>
              </div>
              <div className="h-2 bg-stone-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentages[key]}%` }}
                  transition={{ delay: 0.7 + i * 0.1, duration: 0.8 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: el.color }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Balance Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 p-4 rounded-xl bg-stone-800/50 border border-stone-700"
      >
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-2 h-2 rounded-full ${
            elements.balance === 'balanced' ? 'bg-green-500' :
            elements.balance === 'slightly_imbalanced' ? 'bg-yellow-500' : 'bg-red-500'
          }`} />
          <span className="text-sm font-medium text-stone-300">
            {elements.balance === 'balanced' ? '균형 잡힌 오행' :
             elements.balance === 'slightly_imbalanced' ? '약간의 불균형' : '불균형한 오행'}
          </span>
        </div>
        <p className="text-sm text-stone-400">{elements.description}</p>
      </motion.div>
    </div>
  )
}

// Pillar Card Component
function PillarCard({ title, pillar, delay = 0 }: {
  title: string
  pillar: SajuResult['pillars']['year'] | null
  delay?: number
}) {
  if (!pillar) return null

  const element = ELEMENTS[pillar.element]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="pillar-card hover-lift"
    >
      <span className="pillar-title">{title}</span>
      <div
        className="pillar-stem"
        style={{ color: element.color }}
      >
        {pillar.stemHanja}
      </div>
      <div className="text-sm text-stone-400 mb-2">{pillar.stemChar}</div>
      <div className="w-8 h-px bg-stone-600 mb-2" />
      <div
        className="pillar-branch"
        style={{ color: element.color }}
      >
        {pillar.branchHanja}
      </div>
      <div className="text-sm text-stone-400">{pillar.branchChar}</div>
      {pillar.animal && (
        <div className="mt-3 text-2xl">{pillar.animalEmoji}</div>
      )}
    </motion.div>
  )
}

// 2026 Fortune Summary Component
function FortuneSummary({ fortune }: { fortune: SajuResult['yearlyFortune'] }) {
  const [isExpanded, setIsExpanded] = useState(false)

  // 설명 텍스트를 문단으로 분리
  const paragraphs = fortune.description.split('\n\n').filter(p => p.trim())

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative overflow-hidden"
    >
      {/* 메인 카드 */}
      <div className="card-mystical glow-fire">
        <div className="pattern-overlay" />

        {/* 헤더: 타이틀 + 요약 */}
        <div className="relative z-10">
          {/* 상단 배지 */}
          <div className="flex items-center justify-center mb-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30">
              <Star className="w-4 h-4 text-gold-400" />
              <span className="text-sm text-gold-400 font-medium">2026년 병오년 운세</span>
              <Star className="w-4 h-4 text-gold-400" />
            </span>
          </div>

          {/* 타이틀 */}
          <h2
            className="text-2xl sm:text-3xl font-bold text-center mb-3"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="text-fire-gradient">{fortune.title}</span>
          </h2>

          {/* 요약 키워드 */}
          <p className="text-center text-stone-300 text-lg mb-6">
            {fortune.summary}
          </p>

          {/* 구분선 */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/50" />
            <Flame className="w-5 h-5 text-orange-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/50" />
          </div>

          {/* 본문 - 첫 번째 문단은 항상 표시 */}
          <div className="space-y-4">
            <p className="text-stone-300 leading-relaxed text-base">
              {paragraphs[0]}
            </p>

            {/* 나머지 문단 - 펼치기/접기 */}
            {paragraphs.length > 1 && (
              <>
                <motion.div
                  initial={false}
                  animate={{
                    height: isExpanded ? 'auto' : 0,
                    opacity: isExpanded ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {paragraphs.slice(1).map((paragraph, i) => (
                    <p key={i} className="text-stone-300 leading-relaxed text-base mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ))}
                </motion.div>

                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="w-full flex items-center justify-center gap-2 py-2 text-sm text-stone-400 hover:text-stone-200 transition-colors"
                >
                  <span>{isExpanded ? '접기' : '자세히 보기'}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </button>
              </>
            )}
          </div>

          {/* 조언 카드 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 p-4 rounded-xl bg-gradient-to-r from-gold-500/10 to-orange-500/10 border border-gold-500/20"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gold-500/20 flex-shrink-0">
                <Quote className="w-4 h-4 text-gold-400" />
              </div>
              <p className="text-gold-200 text-sm leading-relaxed italic">
                &ldquo;{fortune.advice}&rdquo;
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// Monthly Fortune Component
function MonthlyFortune() {
  const [expanded, setExpanded] = useState(false)
  const months = Object.entries(MONTHLY_FORTUNE_2026)

  return (
    <div className="card-mystical">
      <div className="pattern-overlay" />
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between"
      >
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-gold-500" />
          2026년 월별 운세
        </h3>
        <ChevronDown className={`w-5 h-5 text-stone-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
          {months.map(([month, fortune]) => (
            <div
              key={month}
              className="p-3 rounded-xl bg-stone-800/50 border border-stone-700"
            >
              <div className="text-gold-500 font-bold mb-1">{month}월</div>
              <div className="text-sm font-medium text-stone-200">{fortune.keyword}</div>
              <p className="text-xs text-stone-500 mt-1">{fortune.advice}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

// Interpretation Card
function InterpretationCard({ icon: Icon, title, content, color, delay = 0 }: {
  icon: React.ElementType
  title: string
  content: string
  color: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="p-4 rounded-xl bg-stone-800/50 border border-stone-700"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-4 h-4" />
        </div>
        <span className="font-semibold text-stone-200">{title}</span>
      </div>
      <p className="text-sm text-stone-400 leading-relaxed">{content}</p>
    </motion.div>
  )
}

export default function ResultPage() {
  const [result, setResult] = useState<SajuResult | null>(null)
  const [loading, setLoading] = useState(true)
  const [shareStatus, setShareStatus] = useState<'idle' | 'copied' | 'shared'>('idle')

  useEffect(() => {
    const stored = sessionStorage.getItem('sajuInput')
    if (stored) {
      const data = JSON.parse(stored)
      const sajuResult = calculateSaju(
        data.year,
        data.month,
        data.day,
        data.hour,
        data.isLunar,
        data.gender
      )
      setResult(sajuResult)
    }
    setLoading(false)
  }, [])

  // execCommand 폴백 (레거시 브라우저용)
  const execCommandFallback = useCallback((text: string) => {
    const textarea = document.createElement('textarea')
    textarea.value = text
    textarea.style.position = 'fixed'
    textarea.style.left = '-9999px'
    textarea.style.top = '-9999px'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()

    try {
      const success = document.execCommand('copy')
      if (success) {
        setShareStatus('copied')
        setTimeout(() => setShareStatus('idle'), 2000)
      } else {
        alert('공유 링크를 복사하지 못했습니다. URL을 직접 복사해주세요: ' + window.location.origin)
      }
    } catch {
      alert('공유 링크를 복사하지 못했습니다. URL을 직접 복사해주세요: ' + window.location.origin)
    } finally {
      document.body.removeChild(textarea)
    }
  }, [])

  // 클립보드 복사 (Clipboard API + execCommand 폴백)
  const copyToClipboard = useCallback((text: string) => {
    // Clipboard API 지원 여부 및 보안 컨텍스트 확인
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text)
        .then(() => {
          setShareStatus('copied')
          setTimeout(() => setShareStatus('idle'), 2000)
        })
        .catch(() => {
          execCommandFallback(text)
        })
    } else {
      // 폴백: execCommand
      execCommandFallback(text)
    }
  }, [execCommandFallback])

  // 공유하기 기능
  const handleShare = useCallback(async () => {
    if (!result) return

    const shareData = {
      title: '2026 신년 사주 - 나의 사주팔자',
      text: `🐴 2026 병오년, 나의 사주 결과\n\n` +
        `"${result.yearlyFortune.advice}"\n\n` +
        `📅 ${result.birthInfo.year}년생 ${result.pillars.year.animal}띠\n` +
        `✨ 올해 키워드: ${result.yearlyFortune.title}\n\n` +
        `무료로 내 사주 보러가기 ⬇️`,
      url: 'https://saju.uzu.kr',
    }

    // Web Share API 지원 확인 (주로 모바일)
    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData)
        setShareStatus('shared')
      } catch (err) {
        // 사용자가 취소한 경우
        if ((err as Error).name !== 'AbortError') {
          copyToClipboard(shareData.text + '\n' + shareData.url)
        }
      }
    } else {
      // 폴백: 클립보드에 복사
      copyToClipboard(shareData.text + '\n' + shareData.url)
    }
  }, [result, copyToClipboard])

  if (loading) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        >
          <Flame className="w-12 h-12 text-orange-500" />
        </motion.div>
      </main>
    )
  }

  if (!result) {
    return (
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-stone-400 mb-4">사주 정보를 찾을 수 없습니다</p>
          <Link href="/input" className="btn-fire">
            <span>다시 입력하기</span>
          </Link>
        </div>
      </main>
    )
  }

  const { pillars, elements, interpretation, yearlyFortune, birthInfo } = result

  return (
    <main className="flex-1">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-stone-800">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/input" className="flex items-center gap-2 text-stone-400 hover:text-stone-200 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">다시 입력</span>
          </Link>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-stone-200">분석 결과</span>
          </div>
          <button
            onClick={handleShare}
            className="p-2 rounded-full hover:bg-stone-800 transition-colors"
          >
            {shareStatus === 'copied' ? (
              <Check className="w-5 h-5 text-green-400" />
            ) : (
              <Share2 className="w-5 h-5 text-stone-400" />
            )}
          </button>
        </div>
      </header>

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Birth Info Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="text-sm text-stone-500 mb-2">
              {birthInfo.year}년 {birthInfo.month}월 {birthInfo.day}일
              {birthInfo.hour >= 0 && ` ${birthInfo.hour}시`}
              {birthInfo.isLunar ? ' (음력)' : ' (양력)'}
              {' · '}
              {birthInfo.gender === 'male' ? '남성' : '여성'}
            </div>
            <h1 className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="text-fire-gradient">나의 사주팔자</span>
            </h1>
          </motion.div>

          {/* 2026 Fortune Summary - 가장 먼저 표시 */}
          <FortuneSummary fortune={yearlyFortune} />

          {/* Four Pillars */}
          <div className="card-mystical">
            <div className="pattern-overlay" />
            <h3 className="text-lg font-bold mb-6 text-center">
              사주 네 기둥
            </h3>
            <div className="flex justify-center gap-4 flex-wrap">
              <PillarCard title="시주" pillar={pillars.hour} delay={0.4} />
              <PillarCard title="일주" pillar={pillars.day} delay={0.3} />
              <PillarCard title="월주" pillar={pillars.month} delay={0.2} />
              <PillarCard title="년주" pillar={pillars.year} delay={0.1} />
            </div>
            {pillars.year.animal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 text-center"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/30">
                  <span className="text-2xl">{pillars.year.animalEmoji}</span>
                  <span className="text-gold-400">{pillars.year.animal}띠</span>
                </span>
              </motion.div>
            )}
          </div>

          {/* Five Elements Chart */}
          <FiveElementsChart elements={elements} />

          {/* Overall Interpretation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="card-mystical glow-fire"
          >
            <div className="pattern-overlay" />
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-orange-500/20">
                <Sparkles className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-stone-100">
                  {interpretation.dayStem.name} - {interpretation.dayStem.symbol}
                </h3>
                <div className="flex gap-2 mt-1">
                  {interpretation.dayStem.keywords.map((keyword) => (
                    <span key={keyword} className="text-xs px-2 py-1 rounded-full bg-orange-500/20 text-orange-300">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-stone-300 leading-relaxed">{interpretation.overall}</p>
          </motion.div>

          {/* Detailed Interpretations */}
          <div className="grid sm:grid-cols-2 gap-4">
            <InterpretationCard
              icon={Users}
              title="성격"
              content={interpretation.personality}
              color="bg-purple-500/20 text-purple-400"
              delay={0.9}
            />
            <InterpretationCard
              icon={Briefcase}
              title="직업/재물"
              content={interpretation.career}
              color="bg-emerald-500/20 text-emerald-400"
              delay={1.0}
            />
            <InterpretationCard
              icon={Heart}
              title="대인관계"
              content={interpretation.relationship}
              color="bg-pink-500/20 text-pink-400"
              delay={1.1}
            />
            <InterpretationCard
              icon={Activity}
              title="건강"
              content={interpretation.health}
              color="bg-blue-500/20 text-blue-400"
              delay={1.2}
            />
          </div>

          {/* Monthly Fortune */}
          <MonthlyFortune />

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={handleShare}
              className="flex-1 btn-fire"
            >
              <span className="flex items-center justify-center gap-2">
                {shareStatus === 'copied' ? (
                  <>
                    <Check className="w-5 h-5" />
                    복사됨!
                  </>
                ) : shareStatus === 'shared' ? (
                  <>
                    <Check className="w-5 h-5" />
                    공유됨!
                  </>
                ) : (
                  <>
                    <Share2 className="w-5 h-5" />
                    결과 공유하기
                  </>
                )}
              </span>
            </button>
            <Link href="/input" className="flex-1">
              <button className="w-full py-4 px-6 rounded-full border border-stone-600 text-stone-300 hover:border-stone-500 hover:text-stone-100 transition-colors">
                <span className="flex items-center justify-center gap-2">
                  <RotateCcw className="w-5 h-5" />
                  다시 분석하기
                </span>
              </button>
            </Link>
          </motion.div>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-center text-xs text-stone-600 mt-8"
          >
            본 서비스는 재미로 보는 운세이며, 중요한 결정은 전문가와 상담하세요.
          </motion.p>
        </div>
      </div>
    </main>
  )
}
