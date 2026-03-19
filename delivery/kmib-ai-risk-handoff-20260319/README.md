# kmib

## 개요

shorthand로 개발된 페이지를 참고해서 Next.js로 개발했고 정적 파일로 전달합니다.

- `index.html`
- `assets/`
- `static/`

현재 HTML 내부 자원 경로가 `./assets`, `./static` 상대경로입니다 참고 부탁드립니다.

## 메타 데이터

현재 패키지에 들어 있는 기본 메타는 아래와 같습니다.

- `title`
- `description`
- `og:type`
- `og:locale`
- `og:site_name`
- `og:title`
- `og:description`
- `og:image` (현재 상대경로)
- `twitter:card`
- `twitter:title`
- `twitter:description`
- `twitter:image` (현재 상대경로)
- `robots`

아래 항목은 2026년 3월 19일에 확인한 실제 국민일보 기사 헤드
[`https://www.kmib.co.kr/article/view.asp?arcid=0029550520&code=61131111&sid1=int`](https://www.kmib.co.kr/article/view.asp?arcid=0029550520&code=61131111&sid1=int)
기준으로 정리했습니다.

- canonical 태그 필요하다면 추가해주세요
- `meta property="og:url"` 추가
- `og:image`와 `twitter:image`를 확인해주세요
- 가능하면 `og:image:width`, `og:image:height` 확인해 주세요
- 필요 시 `article:section`, `article:published_time`, `og:article:author` 확인해 주세요
- `meta name="title"`도 확인해주세요

### GA/GTM 및 데이터레이어

GA/GTM 추가해주세요

### 구조화 데이터

구조화 데이터가 포함되어 있었습니다.
SEO를 맞추려면 아래 값으로 JSON-LD를 추가하는 것이 좋습니다.

### KMIB 공통 운영 요소

- favicon 적용 여부 확인
- 필요하면 KMIB 공통 header/footer 또는 공유 스크립트 연결해야 합니다
