# Shorthand 섹션 HTML 수집 가이드

VM 환경에서는 shorthandstories.com 접속이 차단돼 있어서,
브라우저에서 직접 HTML을 수집해야 합니다.

## 방법 1: 브라우저 DevTools 콘솔 (권장)

1. https://kmibissue1.shorthandstories.com/ 열기
2. F12 → Console 탭
3. 아래 코드 붙여넣고 실행:

```javascript
// 전체 페이지 HTML 저장
const html = document.documentElement.outerHTML;
const blob = new Blob([html], {type: 'text/html'});
const a = document.createElement('a');
a.href = URL.createObjectURL(blob);
a.download = 'shorthand_full.html';
a.click();
```

4. `shorthand_full.html` 파일이 다운로드됨
5. 이 파일을 `reference_html/` 폴더에 넣기

## 방법 2: 섹션별 HTML 추출

F12 → Console에서 실행:

```javascript
// Article 섹션들만 추출
const sections = document.querySelectorAll('.Theme-TextOverMediaSection');
sections.forEach((sec, i) => {
  const blob = new Blob([sec.outerHTML], {type: 'text/html'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `article_section_${String(i+1).padStart(2,'0')}.html`;
  a.click();
});

// Hero 섹션
const hero = document.querySelector('.Theme-TitleSection, .Hero, [class*="Hero"]');
if (hero) {
  const blob = new Blob([hero.outerHTML], {type: 'text/html'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'hero_section.html';
  a.click();
}
```

## 방법 3: wget으로 전체 사이트 미러링 (로컬 터미널)

```bash
wget --mirror --convert-links --adjust-extension --page-requisites \
  --no-parent -P reference_site \
  https://kmibissue1.shorthandstories.com/
```

---

수집된 HTML을 `reference_html/` 폴더에 저장하면
각 섹션을 1:1로 비교하며 구현을 개선할 수 있습니다.
