"use client";

import React from "react";
import styled from "styled-components";
import { useEffect, useRef } from "react";

const IntroWrapper = styled.section`
  position: relative;
`;

const StickyBgContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const SCROLLPOINTS_BG = "/assets/oGeieQl5yN/gemini_generated_image_9tgrul9tgrul9tgr.jpg";

const BgFixed = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  background: url(${SCROLLPOINTS_BG}) center/cover no-repeat;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.72);
  }
`;

const ScrollPointItem = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  z-index: 2;
`;

/* 첫번째 scrollpoint: Lato 20px bold, lineHeight 1.7 */
const DisclaimerBlock = styled.h2`
  max-width: 680px;
  text-align: center;
  font-size: 20px;
  line-height: 34px;
  font-family: Lato, "Noto Sans KR", sans-serif;
  font-weight: 700;
  color: #ffffff;
  white-space: pre-line;
  word-break: keep-all;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

const GoldSpan = styled.span`
  color: #d5a052;
`;

/* 두번째 scrollpoint: PT Serif 28px normal, lineHeight 1.2 */
const FinalBlock = styled.p`
  max-width: 680px;
  text-align: center;
  font-size: 28px;
  line-height: 33.6px;
  font-family: "PT Serif", serif;
  font-weight: 400;
  color: #ffffff;
  white-space: pre-line;
  word-break: keep-all;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.7s ease, transform 0.7s ease;

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;

export default function IntroSection() {
  const disclaimerRef = useRef<HTMLHeadingElement | null>(null);
  const finalRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          } else {
            entry.target.classList.remove("visible");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (disclaimerRef.current) observer.observe(disclaimerRef.current);
    if (finalRef.current) observer.observe(finalRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <IntroWrapper>
      <StickyBgContainer>
        <BgFixed />
      </StickyBgContainer>

      {/* 원본의 Scrollpoints__media: 배경만 보이는 빈 스크롤 구간 */}
      <ScrollPointItem />

      {/* 첫번째 scrollpoint: 심층분석 + 우울감 + 본기사 */}
      <ScrollPointItem>
        <DisclaimerBlock ref={disclaimerRef}>
          {"이 기사는 "}
          <GoldSpan>{"'AI 대화 후 자살' 사건"}</GoldSpan>
          {"에\n관한 심층 분석입니다.\n생성형 AI는 기술적으로 '동조' 경향이 강해\n우울감이나 망상을 강화할 수 있다는\n국내외 전문가들의 경고가 이어지고 있습니다.\n\n우울감 등 말하기 어려운 고민이 있거나,\n주변에 어려움을 겪는 가족·지인이 있을 경우\n자살예방 상담전화 (☎ 109) 또는\nSNS상담 마들랜(마음을 들어주는 랜선친구)에서\n24시간 전문가의 상담을 받을 수 있습니다.\n\n본 기사는 자살예방 보도준칙 4.0과\n정신건강보도 권고기준을 준수했습니다."}
        </DisclaimerBlock>
      </ScrollPointItem>

      {/* 두번째 scrollpoint: 아래는 AI와... (원본은 1.5×viewport 높이) */}
      <ScrollPointItem style={{ minHeight: "155vh" }}>
        <FinalBlock ref={finalRef}>
          {"아래는 AI와 대화를 나눈 후\n사망한 사람들의\n실제 대화 내용입니다."}
        </FinalBlock>
      </ScrollPointItem>
    </IntroWrapper>
  );
}
