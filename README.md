# 2026 신년 사주 🔥

2026년 병오년(丙午年) 신년 사주풀이 웹앱입니다.

## 🌟 주요 기능

- **사주팔자 분석**: 생년월일시를 기반으로 정확한 사주 분석
- **오행 시각화**: 목, 화, 토, 금, 수 다섯 가지 기운의 분포를 시각적으로 표현
- **쉬운 해석**: 어려운 한자 용어 대신 누구나 이해할 수 있는 쉬운 설명
- **2026년 월별 운세**: 12개월 월별 운세 제공
- **모바일 최적화**: 반응형 디자인으로 모든 기기에서 편리하게 사용

## 🛠 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Visualization**: Recharts
- **Deployment**: AWS S3 + CloudFront (Static Export)

## 🚀 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인하세요.

### 프로덕션 빌드

```bash
npm run build
```

### 정적 파일 배포

빌드 후 `out/` 폴더의 파일들을 AWS S3 또는 다른 정적 호스팅 서비스에 업로드하세요.

## 📁 프로젝트 구조

```
src/
├── app/                  # Next.js App Router 페이지
│   ├── page.tsx         # 메인 랜딩 페이지
│   ├── input/           # 생년월일 입력 페이지
│   ├── result/          # 결과 페이지
│   └── guide/           # 사주 용어 가이드
├── components/          # 재사용 컴포넌트
│   ├── ads/            # 광고 컴포넌트
│   └── ...
└── lib/
    └── saju/           # 사주 계산 로직
        ├── calculator.ts
        └── constants.ts
```

## 📝 수익화

- **쿠팡 파트너스**: 사주 결과에 맞춘 상품 추천
- **구글 애드센스**: 비침해적 광고 배치

## ⚠️ 주의사항

본 서비스는 재미로 보는 운세이며, 중요한 결정은 전문가와 상담하세요.

## 📄 라이센스

MIT License
