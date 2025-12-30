'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Search, Flame, BookOpen, Sparkles, ChevronRight } from 'lucide-react'
import { ELEMENTS, STEM_INTERPRETATIONS, HEAVENLY_STEMS, EARTHLY_BRANCHES, BRANCH_ANIMALS } from '@/lib/saju/constants'

const categories = [
  {
    id: 'basics',
    title: '사주 기초',
    icon: BookOpen,
    items: [
      {
        term: '사주팔자 (四柱八字)',
        simple: '네 개의 기둥, 여덟 글자',
        description: '태어난 년, 월, 일, 시를 기준으로 하는 네 개의 기둥(四柱)과, 각 기둥을 이루는 두 글자(천간+지지)로 이루어진 여덟 글자(八字)입니다.',
      },
      {
        term: '천간 (天干)',
        simple: '하늘의 기운 10가지',
        description: '갑, 을, 병, 정, 무, 기, 경, 신, 임, 계의 10가지 기운입니다. 각각 오행(목, 화, 토, 금, 수)에 음양이 결합되어 있습니다.',
      },
      {
        term: '지지 (地支)',
        simple: '땅의 기운 12가지 (12띠)',
        description: '자, 축, 인, 묘, 진, 사, 오, 미, 신, 유, 술, 해의 12가지 기운입니다. 12띠 동물(쥐~돼지)과 연결됩니다.',
      },
      {
        term: '일주 (日柱)',
        simple: '나를 대표하는 기둥',
        description: '태어난 날의 천간과 지지로 이루어진 기둥입니다. 사주에서 "나"를 의미하며, 성격과 본질을 나타냅니다.',
      },
    ],
  },
  {
    id: 'elements',
    title: '오행 (五行)',
    icon: Sparkles,
    items: Object.entries(ELEMENTS).map(([key, el]) => ({
      term: `${el.name} (${el.hanja})`,
      simple: el.meaning,
      description: `방향: ${el.direction} / 계절: ${el.season}`,
      color: el.color,
    })),
  },
]

export default function GuidePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('basics')

  return (
    <main className="flex-1">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-stone-800">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-stone-400 hover:text-stone-200 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">홈으로</span>
          </Link>
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            <span className="font-bold text-stone-200">사주 가이드</span>
          </div>
          <div className="w-20" />
        </div>
      </header>

      <div className="pt-24 pb-12 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="text-fire-gradient">사주 용어</span> 쉽게 알기
            </h1>
            <p className="text-stone-400">어려운 한자 용어, 쉽게 설명해드립니다</p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative mb-8"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-500" />
            <input
              type="text"
              placeholder="용어 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-mystical pl-12"
            />
          </motion.div>

          {/* Category Tabs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex gap-2 mb-6 overflow-x-auto pb-2"
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-gold-500/20 text-gold-400 border border-gold-500/50'
                    : 'text-stone-400 hover:text-stone-300 border border-transparent'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.title}
              </button>
            ))}
          </motion.div>

          {/* Terms List */}
          <div className="space-y-4">
            {categories
              .find((c) => c.id === activeCategory)
              ?.items.filter((item) =>
                searchQuery === '' ||
                item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.simple.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((item, i) => (
                <motion.div
                  key={item.term}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="card-mystical"
                >
                  <div className="pattern-overlay" />
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {'color' in item && (
                          <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: (item as { color: string }).color }}
                          />
                        )}
                        <h3 className="font-bold text-stone-100">{item.term}</h3>
                      </div>
                      <p className="text-gold-400 text-sm mb-2">{item.simple}</p>
                      <p className="text-stone-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-stone-600 flex-shrink-0" />
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Ten Stems Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-12"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-gold-gradient">십천간</span>
              <span className="text-stone-400 text-sm font-normal">10가지 하늘의 기운</span>
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {HEAVENLY_STEMS.map((stem, i) => {
                const info = STEM_INTERPRETATIONS[stem as keyof typeof STEM_INTERPRETATIONS]
                return (
                  <div key={stem} className="p-4 rounded-xl bg-stone-800/50 border border-stone-700 text-center">
                    <div
                      className="text-2xl font-bold mb-1"
                      style={{ color: ELEMENTS[['wood', 'wood', 'fire', 'fire', 'earth', 'earth', 'metal', 'metal', 'water', 'water'][i] as keyof typeof ELEMENTS].color }}
                    >
                      {stem}
                    </div>
                    <div className="text-xs text-stone-500">{info.symbol}</div>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Twelve Branches Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-fire-gradient">십이지지</span>
              <span className="text-stone-400 text-sm font-normal">12띠와 연결된 땅의 기운</span>
            </h2>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {EARTHLY_BRANCHES.map((branch, i) => (
                <div key={branch} className="p-4 rounded-xl bg-stone-800/50 border border-stone-700 text-center">
                  <div className="text-2xl mb-1">
                    {['🐀', '🐂', '🐅', '🐇', '🐉', '🐍', '🐎', '🐑', '🐵', '🐓', '🐕', '🐗'][i]}
                  </div>
                  <div className="font-bold text-stone-200">{branch}</div>
                  <div className="text-xs text-stone-500">{BRANCH_ANIMALS[i]}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 text-center"
          >
            <Link href="/input">
              <button className="btn-fire">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  나의 사주 분석하기
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
