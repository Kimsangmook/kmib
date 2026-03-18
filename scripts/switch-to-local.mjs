#!/usr/bin/env node
/**
 * content.ts의 Shorthand CDN URL을 로컬 /assets/ 경로로 교체
 * download_images.sh 실행 후 이 스크립트를 실행하세요:
 *   node scripts/switch-to-local.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const CONTENT_TS = resolve("src/data/content.ts");
const CDN_BASE = "https://kmibissue1.shorthandstories.com";

let content = readFileSync(CONTENT_TS, "utf-8");
const original = content;

// 1. BASE 상수를 로컬 경로로 변경
// const BASE = "https://..." → const BASE = ""
content = content.replace(
  /const BASE = "https:\/\/kmibissue1\.shorthandstories\.com";/,
  `const BASE = ""; // 로컬 서빙 (이미지는 /public/assets/ 에 위치)`
);

// 변경 확인
if (content === original) {
  console.error("❌ BASE 상수를 찾지 못했습니다. content.ts 형식을 확인하세요.");
  process.exit(1);
}

writeFileSync(CONTENT_TS, content, "utf-8");
console.log("✅ content.ts 업데이트 완료!");
console.log('   BASE = "" 로 변경됨 (모든 /assets/... 경로가 로컬 참조로 전환)');
console.log("");
console.log("📁 이미지 위치: public/assets/[폴더ID]/[파일명]");
console.log("🌐 URL 형식: /assets/[폴더ID]/[파일명]");
