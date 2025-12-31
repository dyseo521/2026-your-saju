'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Sparkles,
  Moon,
  Sun,
  HelpCircle,
  Flame
} from 'lucide-react'
import LoadingOverlay from '@/components/loading/LoadingOverlay'

export default function InputPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    year: new Date().getFullYear() - 25,
    month: 1,
    day: 1,
    hour: -1, // -1 means "unknown"
    isLunar: false,
    gender: '' as 'male' | 'female' | '',
  })

  const handleSubmit = useCallback(() => {
    // Store in sessionStorage for the result page
    sessionStorage.setItem('sajuInput', JSON.stringify(formData))

    // Show loading overlay
    setIsLoading(true)
  }, [formData])

  const handleLoadingComplete = useCallback(() => {
    router.push('/result')
  }, [router])

  const canProceed = () => {
    switch (step) {
      case 1: return formData.gender !== ''
      case 2: return formData.year && formData.month && formData.day
      case 3: return true // Hour is optional
      default: return false
    }
  }

  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)
  const months = Array.from({ length: 12 }, (_, i) => i + 1)
  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const hours = [
    { value: -1, label: '모름', time: '' },
    { value: 0, label: '자시', time: '23:30~01:30' },
    { value: 1, label: '축시', time: '01:30~03:30' },
    { value: 2, label: '인시', time: '03:30~05:30' },
    { value: 3, label: '묘시', time: '05:30~07:30' },
    { value: 4, label: '진시', time: '07:30~09:30' },
    { value: 5, label: '사시', time: '09:30~11:30' },
    { value: 6, label: '오시', time: '11:30~13:30' },
    { value: 7, label: '미시', time: '13:30~15:30' },
    { value: 8, label: '신시', time: '15:30~17:30' },
    { value: 9, label: '유시', time: '17:30~19:30' },
    { value: 10, label: '술시', time: '19:30~21:30' },
    { value: 11, label: '해시', time: '21:30~23:30' },
  ]

  return (
    <>
      {/* Loading Overlay */}
      <LoadingOverlay isVisible={isLoading} onComplete={handleLoadingComplete} />

      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-stone-800">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-stone-200 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">처음으로</span>
          </Link>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-stone-200">2026 사주</span>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-16 left-0 right-0 z-40 bg-stone-900/80 backdrop-blur">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-stone-400">정보 입력</span>
            <span className="text-sm text-gold-500">{step}/3</span>
          </div>
          <div className="h-1 bg-stone-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / 3) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-32 pb-32 px-4">
        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Gender */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-purple-500/20 mb-6">
                    <User className="w-8 h-8 text-purple-400" />
                  </div>
                  <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    성별을 선택해주세요
                  </h1>
                  <p className="text-stone-400">
                    사주 분석에 필요한 기본 정보입니다
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setFormData({ ...formData, gender: 'male' })}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      formData.gender === 'male'
                        ? 'border-gold-500 bg-gold-500/10 glow-gold'
                        : 'border-stone-700 hover:border-stone-600'
                    }`}
                  >
                    <span className="block text-4xl mb-2">👨</span>
                    <span className="text-lg font-semibold">남성</span>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, gender: 'female' })}
                    className={`p-6 rounded-2xl border-2 transition-all ${
                      formData.gender === 'female'
                        ? 'border-gold-500 bg-gold-500/10 glow-gold'
                        : 'border-stone-700 hover:border-stone-600'
                    }`}
                  >
                    <span className="block text-4xl mb-2">👩</span>
                    <span className="text-lg font-semibold">여성</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Birth Date */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-orange-500/20 mb-6">
                    <Calendar className="w-8 h-8 text-orange-400" />
                  </div>
                  <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    생년월일을 입력해주세요
                  </h1>
                  <p className="text-stone-400">
                    정확한 사주 분석을 위해 필요합니다
                  </p>
                </div>

                {/* Calendar Type Toggle */}
                <div className="flex items-center justify-center gap-4">
                  <button
                    onClick={() => setFormData({ ...formData, isLunar: false })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      !formData.isLunar
                        ? 'bg-gold-500/20 text-gold-400 border border-gold-500/50'
                        : 'text-stone-400 hover:text-stone-300'
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    <span>양력</span>
                  </button>
                  <button
                    onClick={() => setFormData({ ...formData, isLunar: true })}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                      formData.isLunar
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                        : 'text-stone-400 hover:text-stone-300'
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    <span>음력</span>
                  </button>
                </div>

                {/* Date Selectors */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Year */}
                  <div>
                    <label className="block text-sm text-stone-400 mb-2">년</label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      className="input-mystical text-center"
                    >
                      {years.map((y) => (
                        <option key={y} value={y}>{y}</option>
                      ))}
                    </select>
                  </div>
                  {/* Month */}
                  <div>
                    <label className="block text-sm text-stone-400 mb-2">월</label>
                    <select
                      value={formData.month}
                      onChange={(e) => setFormData({ ...formData, month: parseInt(e.target.value) })}
                      className="input-mystical text-center"
                    >
                      {months.map((m) => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  {/* Day */}
                  <div>
                    <label className="block text-sm text-stone-400 mb-2">일</label>
                    <select
                      value={formData.day}
                      onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) })}
                      className="input-mystical text-center"
                    >
                      {days.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Birth Hour */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-8"
              >
                <div className="text-center">
                  <div className="inline-flex p-4 rounded-full bg-blue-500/20 mb-6">
                    <Clock className="w-8 h-8 text-blue-400" />
                  </div>
                  <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    태어난 시간을 선택해주세요
                  </h1>
                  <p className="text-stone-400">
                    시간을 모르면 &apos;모름&apos;을 선택하세요
                  </p>
                </div>

                {/* Hour Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {hours.map((h) => (
                    <button
                      key={h.value}
                      onClick={() => setFormData({ ...formData, hour: h.value })}
                      className={`p-3 rounded-xl border transition-all text-left ${
                        formData.hour === h.value
                          ? 'border-gold-500 bg-gold-500/10'
                          : 'border-stone-700 hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{h.label}</span>
                        {h.value === -1 && <HelpCircle className="w-4 h-4 text-stone-500" />}
                      </div>
                      {h.time && (
                        <span className="text-xs text-stone-500">{h.time}</span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-stone-800/50 border border-stone-700">
                  <p className="text-sm text-stone-400">
                    💡 <span className="text-stone-300">시간을 모르면</span> 년주, 월주, 일주만으로 분석합니다.
                    시주를 포함하면 더 정확한 분석이 가능해요.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="fixed bottom-0 left-0 right-0 glass border-t border-stone-800">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-stone-600 text-stone-400 hover:text-stone-200 hover:border-stone-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
            disabled={!canProceed()}
            className={`flex-1 btn-fire ${!canProceed() ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="flex items-center justify-center gap-2">
              {step < 3 ? (
                <>
                  다음
                  <ArrowRight className="w-5 h-5" />
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  사주 분석하기
                </>
              )}
            </span>
          </button>
        </div>
      </div>
      </main>
    </>
  )
}
