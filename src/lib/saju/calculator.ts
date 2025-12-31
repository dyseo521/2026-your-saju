import {
  HEAVENLY_STEMS,
  STEM_HANJA,
  STEM_ELEMENTS,
  EARTHLY_BRANCHES,
  BRANCH_HANJA,
  BRANCH_ELEMENTS,
  BRANCH_ANIMALS,
  BRANCH_ANIMAL_EMOJI,
  ELEMENTS,
  STEM_INTERPRETATIONS,
  YEARLY_FORTUNE_2026,
  type Element,
} from './constants'

export interface Pillar {
  stem: number
  branch: number
  stemChar: string
  stemHanja: string
  branchChar: string
  branchHanja: string
  element: Element
  animal?: string
  animalEmoji?: string
}

export interface SajuResult {
  pillars: {
    year: Pillar
    month: Pillar
    day: Pillar
    hour: Pillar | null
  }
  elements: ElementAnalysis
  interpretation: {
    dayStem: typeof STEM_INTERPRETATIONS[keyof typeof STEM_INTERPRETATIONS]
    overall: string
    personality: string
    career: string
    relationship: string
    health: string
  }
  yearlyFortune: {
    title: string
    summary: string
    description: string
    advice: string
  }
  birthInfo: {
    year: number
    month: number
    day: number
    hour: number
    isLunar: boolean
    gender: 'male' | 'female'
  }
}

export interface ElementAnalysis {
  distribution: Record<Element, number>
  dominant: Element
  weak: Element
  balance: 'balanced' | 'slightly_imbalanced' | 'imbalanced'
  description: string
}

// 절기 시작일 (대략적인 값, 정확한 계산은 만세력 데이터 필요)
const SOLAR_TERMS_START = [
  [2, 4],   // 입춘 (1월 → 인월)
  [3, 6],   // 경칩 (2월 → 묘월)
  [4, 5],   // 청명 (3월 → 진월)
  [5, 6],   // 입하 (4월 → 사월)
  [6, 6],   // 망종 (5월 → 오월)
  [7, 7],   // 소서 (6월 → 미월)
  [8, 8],   // 입추 (7월 → 신월)
  [9, 8],   // 백로 (8월 → 유월)
  [10, 8],  // 한로 (9월 → 술월)
  [11, 8],  // 입동 (10월 → 해월)
  [12, 7],  // 대설 (11월 → 자월)
  [1, 6],   // 소한 (12월 → 축월)
]

/**
 * 년주 계산 (입춘 기준)
 */
function calculateYearPillar(year: number, month: number, day: number): Pillar {
  // 입춘(약 2월 4일) 이전이면 전년도 기준
  const isBeforeLichun = month < 2 || (month === 2 && day < 4)
  const adjustedYear = isBeforeLichun ? year - 1 : year

  const stemIndex = ((adjustedYear - 4) % 10 + 10) % 10
  const branchIndex = ((adjustedYear - 4) % 12 + 12) % 12

  return {
    stem: stemIndex,
    branch: branchIndex,
    stemChar: HEAVENLY_STEMS[stemIndex],
    stemHanja: STEM_HANJA[stemIndex],
    branchChar: EARTHLY_BRANCHES[branchIndex],
    branchHanja: BRANCH_HANJA[branchIndex],
    element: STEM_ELEMENTS[stemIndex],
    animal: BRANCH_ANIMALS[branchIndex],
    animalEmoji: BRANCH_ANIMAL_EMOJI[branchIndex],
  }
}

/**
 * 월주 계산 (절기 기준)
 */
function calculateMonthPillar(year: number, month: number, day: number): Pillar {
  // 절기에 따른 월 조정
  let adjustedMonth = month
  for (let i = 0; i < 12; i++) {
    const [termMonth, termDay] = SOLAR_TERMS_START[i]
    if (month === termMonth && day < termDay) {
      adjustedMonth = (i === 0) ? 12 : i
      break
    } else if (month === termMonth) {
      adjustedMonth = i + 1
      break
    }
  }

  // 년간에 따른 월간 계산
  const yearPillar = calculateYearPillar(year, month, day)
  const yearStemBase = yearPillar.stem % 5
  const monthStemStart = (yearStemBase * 2 + 2) % 10

  // 월지는 인월(2월)부터 시작 = 인(2)
  const branchIndex = (adjustedMonth + 1) % 12
  const stemIndex = (monthStemStart + adjustedMonth - 1) % 10

  return {
    stem: stemIndex,
    branch: branchIndex,
    stemChar: HEAVENLY_STEMS[stemIndex],
    stemHanja: STEM_HANJA[stemIndex],
    branchChar: EARTHLY_BRANCHES[branchIndex],
    branchHanja: BRANCH_HANJA[branchIndex],
    element: STEM_ELEMENTS[stemIndex],
  }
}

/**
 * 일주 계산 (간략화된 버전)
 */
function calculateDayPillar(year: number, month: number, day: number): Pillar {
  // 기준일: 1900년 1월 1일 = 갑진일 (stem: 0, branch: 4)
  const baseDate = new Date(1900, 0, 1)
  const targetDate = new Date(year, month - 1, day)
  const daysDiff = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24))

  // 1900년 1월 1일은 갑자일 (stem: 0, branch: 0) 으로 가정
  const stemIndex = ((daysDiff % 10) + 10) % 10
  const branchIndex = ((daysDiff % 12) + 12) % 12

  return {
    stem: stemIndex,
    branch: branchIndex,
    stemChar: HEAVENLY_STEMS[stemIndex],
    stemHanja: STEM_HANJA[stemIndex],
    branchChar: EARTHLY_BRANCHES[branchIndex],
    branchHanja: BRANCH_HANJA[branchIndex],
    element: STEM_ELEMENTS[stemIndex],
  }
}

/**
 * 시주 계산
 */
function calculateHourPillar(hour: number, dayPillar: Pillar): Pillar {
  // 시간대별 지지 매핑 (자시: 23:00-01:00 = 0)
  const branchIndex = hour === -1 ? 0 : Math.floor((hour + 1) / 2) % 12

  // 일간 기준 시간 천간 계산
  const dayStemBase = dayPillar.stem % 5
  const hourStemStart = dayStemBase * 2
  const stemIndex = (hourStemStart + branchIndex) % 10

  return {
    stem: stemIndex,
    branch: branchIndex,
    stemChar: HEAVENLY_STEMS[stemIndex],
    stemHanja: STEM_HANJA[stemIndex],
    branchChar: EARTHLY_BRANCHES[branchIndex],
    branchHanja: BRANCH_HANJA[branchIndex],
    element: STEM_ELEMENTS[stemIndex],
  }
}

/**
 * 오행 분석
 */
function analyzeElements(pillars: Pillar[]): ElementAnalysis {
  const distribution: Record<Element, number> = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  }

  // 천간, 지지 모두 계산
  pillars.forEach((pillar) => {
    if (pillar) {
      distribution[STEM_ELEMENTS[pillar.stem]]++
      distribution[BRANCH_ELEMENTS[pillar.branch]]++
    }
  })

  // 가장 강한/약한 오행 찾기
  const entries = Object.entries(distribution) as [Element, number][]
  entries.sort((a, b) => b[1] - a[1])

  const dominant = entries[0][0]
  const weak = entries[entries.length - 1][0]

  // 균형 상태 판단
  const max = entries[0][1]
  const min = entries[entries.length - 1][1]
  const diff = max - min

  let balance: ElementAnalysis['balance']
  if (diff <= 2) {
    balance = 'balanced'
  } else if (diff <= 4) {
    balance = 'slightly_imbalanced'
  } else {
    balance = 'imbalanced'
  }

  // 설명 생성
  const descriptions = {
    balanced: '오행의 기운이 비교적 균형 잡혀 있습니다. 다양한 상황에 유연하게 대처할 수 있는 기본 바탕을 가지고 있습니다.',
    slightly_imbalanced: `${ELEMENTS[dominant].name}의 기운이 강하고 ${ELEMENTS[weak].name}의 기운이 약한 편입니다. ${ELEMENTS[weak].meaning}을 의식적으로 키워보세요.`,
    imbalanced: `${ELEMENTS[dominant].name}의 기운이 매우 강합니다. ${ELEMENTS[weak].name}의 기운을 보완하면 더 나은 균형을 이룰 수 있습니다.`,
  }

  return {
    distribution,
    dominant,
    weak,
    balance,
    description: descriptions[balance],
  }
}

/**
 * 해석 생성
 */
function generateInterpretation(dayPillar: Pillar, elements: ElementAnalysis, gender: 'male' | 'female') {
  const dayStemInfo = STEM_INTERPRETATIONS[dayPillar.stemChar as keyof typeof STEM_INTERPRETATIONS]

  const overall = `당신은 ${dayStemInfo.symbol}의 기운을 가진 ${dayStemInfo.name}일주입니다. ${dayStemInfo.personality}`

  const personality = `기본 성향: ${dayStemInfo.keywords.join(', ')}. ${
    gender === 'male' ? '남성으로서' : '여성으로서'
  } ${ELEMENTS[elements.dominant].meaning}의 특성이 두드러집니다.`

  const career = `${ELEMENTS[elements.dominant].name}의 기운이 강해 ${
    elements.dominant === 'wood' ? '창업, 교육, 의료 분야' :
    elements.dominant === 'fire' ? '예술, 미디어, 서비스업' :
    elements.dominant === 'earth' ? '부동산, 건축, 농업' :
    elements.dominant === 'metal' ? '금융, 법률, 제조업' :
    '기획, 연구, IT 분야'
  }에서 능력을 발휘할 수 있습니다.`

  const relationship = `${dayStemInfo.keywords[0]}(이)라는 성향 덕분에 주변 사람들에게 ${
    elements.dominant === 'fire' ? '따뜻하고 활기찬' :
    elements.dominant === 'water' ? '지혜롭고 포용력 있는' :
    elements.dominant === 'wood' ? '믿음직하고 성장하는' :
    elements.dominant === 'metal' ? '단단하고 신뢰할 수 있는' :
    '안정적이고 든든한'
  } 사람으로 인식됩니다.`

  const health = `${ELEMENTS[elements.weak].name}의 기운이 부족한 편이니 ${
    elements.weak === 'wood' ? '간, 눈 건강과 스트레칭' :
    elements.weak === 'fire' ? '심장, 혈압 관리와 규칙적인 운동' :
    elements.weak === 'earth' ? '소화기 건강과 규칙적인 식사' :
    elements.weak === 'metal' ? '폐, 호흡기 건강과 호흡 운동' :
    '신장, 방광 건강과 충분한 수분 섭취'
  }에 신경 쓰세요.`

  return {
    dayStem: dayStemInfo,
    overall,
    personality,
    career,
    relationship,
    health,
  }
}

/**
 * 메인 사주 계산 함수
 */
export function calculateSaju(
  year: number,
  month: number,
  day: number,
  hour: number,
  isLunar: boolean,
  gender: 'male' | 'female'
): SajuResult {
  // TODO: 음력인 경우 양력으로 변환 (korean-lunar-calendar 사용)
  // 현재는 양력 기준으로만 계산

  const yearPillar = calculateYearPillar(year, month, day)
  const monthPillar = calculateMonthPillar(year, month, day)
  const dayPillar = calculateDayPillar(year, month, day)
  const hourPillar = hour >= 0 ? calculateHourPillar(hour, dayPillar) : null

  const pillarsArray = [yearPillar, monthPillar, dayPillar]
  if (hourPillar) pillarsArray.push(hourPillar)

  const elements = analyzeElements(pillarsArray)
  const interpretation = generateInterpretation(dayPillar, elements, gender)

  // 일간 기준 2026년 운세
  const dayStemChar = dayPillar.stemChar as keyof typeof YEARLY_FORTUNE_2026
  const yearlyFortune = YEARLY_FORTUNE_2026[dayStemChar]

  return {
    pillars: {
      year: yearPillar,
      month: monthPillar,
      day: dayPillar,
      hour: hourPillar,
    },
    elements,
    interpretation,
    yearlyFortune,
    birthInfo: { year, month, day, hour, isLunar, gender },
  }
}

/**
 * 오행 퍼센티지 계산
 */
export function getElementPercentages(elements: ElementAnalysis): Record<Element, number> {
  const total = Object.values(elements.distribution).reduce((a, b) => a + b, 0)
  const percentages: Record<Element, number> = {
    wood: 0,
    fire: 0,
    earth: 0,
    metal: 0,
    water: 0,
  }

  for (const [key, value] of Object.entries(elements.distribution)) {
    percentages[key as Element] = Math.round((value / total) * 100)
  }

  return percentages
}
