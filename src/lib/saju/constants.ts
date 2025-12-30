// 천간 (Heavenly Stems) - 10개
export const HEAVENLY_STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'] as const
export const STEM_HANJA = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const
export const STEM_ELEMENTS = ['wood', 'wood', 'fire', 'fire', 'earth', 'earth', 'metal', 'metal', 'water', 'water'] as const

// 지지 (Earthly Branches) - 12개
export const EARTHLY_BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'] as const
export const BRANCH_HANJA = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const
export const BRANCH_ELEMENTS = ['water', 'earth', 'wood', 'wood', 'earth', 'fire', 'fire', 'earth', 'metal', 'metal', 'earth', 'water'] as const

// 12지지 동물띠
export const BRANCH_ANIMALS = ['쥐', '소', '호랑이', '토끼', '용', '뱀', '말', '양', '원숭이', '닭', '개', '돼지'] as const
export const BRANCH_ANIMAL_EMOJI = ['🐀', '🐂', '🐅', '🐇', '🐉', '🐍', '🐎', '🐑', '🐵', '🐓', '🐕', '🐗'] as const

// 오행 (Five Elements)
export const ELEMENTS = {
  wood: { name: '목', hanja: '木', color: '#22c55e', meaning: '성장, 시작, 인자함', direction: '동', season: '봄' },
  fire: { name: '화', hanja: '火', color: '#ef4444', meaning: '열정, 예의, 활동', direction: '남', season: '여름' },
  earth: { name: '토', hanja: '土', color: '#eab308', meaning: '중심, 신뢰, 안정', direction: '중앙', season: '환절기' },
  metal: { name: '금', hanja: '金', color: '#9ca3af', meaning: '결단, 의리, 정의', direction: '서', season: '가을' },
  water: { name: '수', hanja: '水', color: '#3b82f6', meaning: '지혜, 유연함, 적응', direction: '북', season: '겨울' },
} as const

export type Element = keyof typeof ELEMENTS
export type HeavenlyStem = typeof HEAVENLY_STEMS[number]
export type EarthlyBranch = typeof EARTHLY_BRANCHES[number]

// 천간별 성격 해석 (쉬운 버전)
export const STEM_INTERPRETATIONS = {
  갑: {
    name: '갑목',
    symbol: '큰 나무',
    personality: '리더십이 강하고 곧은 성격입니다. 정의감이 넘치며 책임감이 강합니다.',
    keywords: ['리더십', '정직', '책임감'],
  },
  을: {
    name: '을목',
    symbol: '풀과 덩굴',
    personality: '유연하고 적응력이 뛰어납니다. 부드러우면서도 끈기가 있습니다.',
    keywords: ['유연함', '적응력', '끈기'],
  },
  병: {
    name: '병화',
    symbol: '태양',
    personality: '밝고 활발한 성격입니다. 사교성이 좋고 표현력이 뛰어납니다.',
    keywords: ['밝음', '활발함', '표현력'],
  },
  정: {
    name: '정화',
    symbol: '촛불',
    personality: '섬세하고 따뜻한 성격입니다. 배려심이 깊고 예술적 감각이 있습니다.',
    keywords: ['섬세함', '따뜻함', '예술성'],
  },
  무: {
    name: '무토',
    symbol: '산과 대지',
    personality: '듬직하고 신뢰감 있는 성격입니다. 안정적이고 포용력이 넓습니다.',
    keywords: ['신뢰', '안정', '포용력'],
  },
  기: {
    name: '기토',
    symbol: '논밭',
    personality: '현실적이고 실용적입니다. 꼼꼼하며 성실한 성격입니다.',
    keywords: ['현실적', '실용적', '성실함'],
  },
  경: {
    name: '경금',
    symbol: '바위와 쇠',
    personality: '의지가 강하고 결단력이 있습니다. 원칙을 중시합니다.',
    keywords: ['결단력', '의지', '원칙'],
  },
  신: {
    name: '신금',
    symbol: '보석',
    personality: '세련되고 예리합니다. 완벽을 추구하며 미적 감각이 뛰어납니다.',
    keywords: ['세련됨', '예리함', '완벽주의'],
  },
  임: {
    name: '임수',
    symbol: '바다와 강',
    personality: '지혜롭고 포용력이 넓습니다. 깊이 있는 사고를 합니다.',
    keywords: ['지혜', '포용', '깊이'],
  },
  계: {
    name: '계수',
    symbol: '비와 이슬',
    personality: '감성적이고 직관력이 뛰어납니다. 창의적인 사고를 합니다.',
    keywords: ['감성', '직관', '창의성'],
  },
}

// 2026년 월별 운세 키워드
export const MONTHLY_FORTUNE_2026 = {
  1: { keyword: '새로운 시작', advice: '새해 목표를 세우고 첫 발을 내딛기 좋은 달입니다.' },
  2: { keyword: '준비와 계획', advice: '차분히 계획을 다듬고 내실을 다지세요.' },
  3: { keyword: '활동적인 시기', advice: '적극적으로 움직이면 좋은 결과가 있습니다.' },
  4: { keyword: '인연의 달', advice: '새로운 만남이나 협력 관계가 형성됩니다.' },
  5: { keyword: '도전의 시기', advice: '새로운 도전을 시작하기 좋은 때입니다.' },
  6: { keyword: '조심과 신중', advice: '큰 결정은 신중하게, 건강 관리에 유의하세요.' },
  7: { keyword: '성장의 기회', advice: '배움과 성장의 기회가 찾아옵니다.' },
  8: { keyword: '풍요의 시기', advice: '노력한 만큼 결실을 맺는 달입니다.' },
  9: { keyword: '변화의 바람', advice: '환경이나 관계에서 변화가 있을 수 있습니다.' },
  10: { keyword: '정리와 마무리', advice: '해왔던 일들을 정리하고 마무리하세요.' },
  11: { keyword: '안정과 휴식', advice: '충분한 휴식으로 에너지를 충전하세요.' },
  12: { keyword: '한 해 마무리', advice: '한 해를 돌아보고 감사하는 마음으로 마무리하세요.' },
}
