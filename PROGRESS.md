# 국민일보 인터렉티브 - 개발 진행 현황

## 프로젝트 개요
**원본**: https://kmibissue1.shorthandstories.com/
**목표**: Next.js 16 + TypeScript + styled-components로 픽셀 퍼펙트 재현
**스택**: Next.js 16 (App Router), TypeScript, styled-components

---

## 구현 완료 섹션

### 1. HeroSection
- 배경 이미지(스마트폰) + parallax 효과
- 타이틀 이미지("AI와의 위험한 대화")
- 크레딧 / 발행일 텍스트

### 2. IntroSection
- Sticky 배경(히어로 이미지 그대로 유지) 위에 3개 scroll-point
  - 빈 스크롤포인트 (100vh)
  - 면책/안내 텍스트 (100vh)
  - "아래는 AI와..." 마지막 텍스트 (155vh)
- IntersectionObserver 기반 fade-in 애니메이션

### 3. QuoteGrid
- 12개 AI 대화 인용문 버튼 그리드
- 각 케이스 스터디로 앵커 링크

### 4. StatsSection
- 세계 지도 배경 이미지
- "최근 3년간..." / "국민일보는..." 통계 텍스트 블록

### 5. ArticleCardsGrid
- 5개 기사 카드 (2열 그리드, 마지막 카드 전폭)
- sketch/연필화 스타일 일러스트 이미지
- 원본과 동일한 흑/청/베이지 배경 조합

### 6. CaseStudy (6개)
- 줄리아나 페랄타 / 슈얼 세저 3세 / 애덤 레인 / 소피 로튼버그 / 제인 샘블린 / 오스틴 고든
- **핵심 기능**: 스크롤 기반 이미지 crossfade (sticky 이미지 패널)
- 좌/우 이미지 패널 교대 배치 (`imageRight` 플래그)

### 7. ArticleSection (5개)
- 흰 배경 장문 기사 레이아웃
- 헤더 이미지 + 본문 텍스트 + 인용문 + "처음으로" 버튼

---

## 핵심 수정 이력: CaseStudy 이미지 전환 로직

### 문제
원본 Shorthand의 `CardCanvas` 컴포넌트는 스크롤에 따라 이미지를 전환함.
우리 구현의 `calcActiveIndex` 함수가 잘못된 기준점을 사용해 첫 이미지가 틀리게 표시되던 문제.

### 최종 구현 (`src/components/CaseStudy.tsx`)

```tsx
const calcActiveIndex = useCallback(() => {
  if (numImages <= 1 || !contentSectionRef.current) return;
  const rect = contentSectionRef.current.getBoundingClientRect();
  // window.innerHeight / 2 를 트리거 범위로 사용 →
  // 원본의 ~356px 전환 패턴과 근접 (우리: ~208px 간격)
  const totalHeight = window.innerHeight / 2;
  const scrolledPast = Math.max(0, -rect.top);
  const progress = Math.min(1, scrolledPast / totalHeight);
  const newIdx = Math.min(numImages - 1, Math.floor(progress * numImages));
  setActiveIndex(newIdx);
}, [numImages]);
```

**포인트**:
- `scrolledPast = Math.max(0, -rect.top)`: 섹션 상단이 뷰포트 상단에 닿는 순간부터 카운트
- `totalHeight = window.innerHeight / 2` (~416px): 원본의 밀집 전환 패턴 근사
- 섹션 시작 시 항상 image[0]부터 표시

### 이미지 높이
`ImageSection` height: `62vh` (기존 80vh에서 수정)

---

## 검증 완료 항목

| 항목 | 상태 | 비고 |
|------|------|------|
| 전체 케이스 스터디 첫 이미지 | ✅ | 6개 모두 activeIndex 0 |
| 이미지 크기 | ✅ | 62vh |
| 카드 그리드 레이아웃 | ✅ | 원본 동일 |
| IntroSection 페이드인 | ✅ | IntersectionObserver 정상 |
| ArticleSection 표시 | ✅ | 흰 배경 텍스트 정상 |

---

## TODO / 추후 개선사항

- [ ] CaseStudy 이미지 전환 트리거 위치 미세 조정 (원본: 106/231/356px, 현재: 104/208/312px)
- [ ] 어모리 레이시, 피에르, etc. 추가 케이스 검증
- [ ] 모바일 반응형 레이아웃 검토
- [ ] 기사 외부 링크 연결
- [ ] 배포 환경 설정

---

## 파일 구조

```
src/
├── app/
│   ├── page.tsx          # 메인 페이지 조합
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── HeroSection.tsx
│   ├── IntroSection.tsx
│   ├── QuoteGrid.tsx
│   ├── StatsSection.tsx
│   ├── ArticleCardsGrid.tsx
│   ├── CaseStudy.tsx      ← 핵심 수정 파일
│   └── ArticleSection.tsx
├── data/
│   └── content.ts         # 모든 콘텐츠 데이터
└── styles/
    └── GlobalStyle.ts
```
