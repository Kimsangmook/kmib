"use client";

import React, { useRef, useEffect, useState, useMemo, useCallback } from "react";
import styled from "styled-components";
import type { CaseStudyData } from "@/data/content";

const CaseStudyContainer = styled.section`
  background-color: #222222;
  color: #ffffff;
  min-height: 100vh;
`;

const ContentGrid = styled.div<{ $imageRight?: boolean }>`
  display: grid;
  grid-template-columns: ${(p) => (p.$imageRight ? "5fr 7fr" : "7fr 5fr")};
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ImageSection = styled.div<{ $imageRight?: boolean }>`
  grid-column: ${(p) => (p.$imageRight ? "2" : "1")};
  grid-row: 1;
  position: sticky;
  top: 0;
  height: 62vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  overflow: hidden;
  padding: 0 40px;

  @media (max-width: 1024px) {
    grid-column: 1;
    position: static;
    height: auto;
    padding: 0 24px;
  }
`;

/* Stack all images on top of each other, crossfade via opacity */
const ImageStack = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
  min-height: 0;
`;

const ImageCaption = styled.p`
  text-align: center;
  font-size: 16px;
  color: #ffffff;
  padding: 0;
  margin: 0;
  flex-shrink: 0;
  font-family: Lato, sans-serif;
  line-height: 19.2px;
`;

const StackedImage = styled.img<{ $active: boolean }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  opacity: ${(p) => (p.$active ? 1 : 0)};
  transition: opacity 0.55s ease;
`;

const ContentSection = styled.div<{ $imageRight?: boolean }>`
  grid-column: ${(p) => (p.$imageRight ? "1" : "2")};
  grid-row: 1;
  padding: 48px 40px 60px 40px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    grid-column: 1;
    padding: 40px 24px;
  }
`;

const CaseName = styled.h2`
  font-size: 3rem;
  font-family: "PT Serif", serif;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 8px;
  line-height: 1.2;
`;

const CaseInfo = styled.p`
  font-size: 20px;
  font-family: "PT Serif", serif;
  color: #ffffff;
  margin-bottom: 30px;
  font-weight: 400;
  line-height: 34px;
  white-space: pre-line;
`;

const CaseDescription = styled.div`
  font-size: 15px;
  line-height: 22.95px;
  color: #ffffff;

  p {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const QuoteBlock = styled.blockquote<{ $align?: "center" | "left" }>`
  text-align: ${(p) => p.$align ?? "center"};
  padding: 24px 0;
  margin: 24px 0;
  border-top: 2px solid rgba(204, 204, 204, 0.3);
  border-bottom: 2px solid rgba(204, 204, 204, 0.3);
  background-color: transparent;
  border-radius: 0;
`;

const QuoteSpeaker = styled.span`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 400;
  font-family: "PT Serif", serif;
  display: block;
  margin-bottom: 10px;
`;

const QuoteText = styled.p`
  font-size: 20px;
  line-height: 34px;
  color: #ffffff;
  font-style: italic;
  font-family: "PT Serif", serif;
`;

const BackButton = styled.button`
  background-color: #d5a052;
  border: none;
  color: #ffffff;
  padding: 13px 28px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  align-self: flex-start;
  margin-top: 40px;

  &:hover {
    background-color: #e6b86a;
  }
`;


interface CaseStudyProps extends CaseStudyData {
  imageRight?: boolean;
}

export default function CaseStudy({
  name,
  age,
  location,
  aiPlatform = "",
  usageDuration = "",
  paragraphs,
  aiQuotes,
  images,
  imageRight,
}: CaseStudyProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const contentSectionRef = useRef<HTMLDivElement>(null);

  const numImages = images.length;

  /* Use scroll-percentage based triggers to match original's 25%/50%/75% behaviour.
     We track how much of the content section has scrolled past the viewport midpoint
     and map that to [0, numImages-1]. */
  const calcActiveIndex = useCallback(() => {
    if (numImages <= 1 || !contentSectionRef.current) return;
    const rect = contentSectionRef.current.getBoundingClientRect();
    // Use viewport height as the trigger range so all images rotate
    // within the first viewport-height of scrolling (matching original behaviour
    // where transitions happen quickly and the last image holds for the rest).
    // Using half-viewport as trigger range matches the original's behaviour
    // where all image transitions happen within ~350-400px of scroll (≈ vph/2).
    const totalHeight = window.innerHeight / 2;
    const scrolledPast = Math.max(0, -rect.top);
    const progress = Math.min(1, scrolledPast / totalHeight);
    const newIdx = Math.min(numImages - 1, Math.floor(progress * numImages));
    setActiveIndex(newIdx);
  }, [numImages]);

  useEffect(() => {
    calcActiveIndex(); // Run once on mount to set correct initial state
    window.addEventListener("scroll", calcActiveIndex, { passive: true });
    return () => window.removeEventListener("scroll", calcActiveIndex);
  }, [calcActiveIndex]);

  const platformInfo =
    aiPlatform && usageDuration
      ? `${aiPlatform} ${usageDuration} 사용`
      : aiPlatform
      ? `${aiPlatform} 사용`
      : usageDuration || null;

  const mainInfo = [location, platformInfo].filter(Boolean).join(", ");
  const ageInfo = age ? `사망 당시 ${age}` : null;
  // 원본처럼 나이는 새 줄에 표시 (white-space: pre-line 적용)
  const infoText = ageInfo ? `${mainInfo},\n${ageInfo}` : mainInfo;

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* Build a lookup: afterParagraph value → array of quotes to render there.
     afterParagraph === -1 means "before paragraph 0" (we use key -1).
     afterParagraph === undefined means "after last paragraph" (we use key Infinity). */
  const quotesByPosition = useMemo(() => {
    const map: Record<number, typeof aiQuotes> = {};
    aiQuotes.forEach((q) => {
      const pos = q.afterParagraph ?? Infinity;
      if (!map[pos]) map[pos] = [];
      map[pos].push(q);
    });
    return map;
  }, [aiQuotes]);

  const renderQuotes = (pos: number) =>
    (quotesByPosition[pos] ?? []).map((quote, i) => (
      <QuoteBlock key={`q-${pos}-${i}`} $align={quote.textAlign}>
        <QuoteText style={{ whiteSpace: "pre-line" }}>
          <em>{`\u201c${quote.text}\u201d`}</em>
        </QuoteText>
        {quote.speaker && <QuoteSpeaker>- {quote.speaker}</QuoteSpeaker>}
      </QuoteBlock>
    ));

  return (
    <CaseStudyContainer>
      <ContentGrid $imageRight={imageRight}>
        <ImageSection $imageRight={imageRight}>
          <ImageStack>
            {images.map((img, idx) => (
              <StackedImage
                key={idx}
                src={img.url}
                alt={img.caption || name}
                loading={idx === 0 ? "eager" : "lazy"}
                $active={idx === activeIndex}
              />
            ))}
          </ImageStack>
          {images[activeIndex]?.caption && (
            <ImageCaption>{images[activeIndex].caption}</ImageCaption>
          )}
        </ImageSection>

        <ContentSection $imageRight={imageRight} ref={contentSectionRef}>
          <CaseName>{name}</CaseName>
          {infoText && <CaseInfo>{infoText}</CaseInfo>}

          {/* Quotes with afterParagraph === -1 appear before all paragraphs */}
          {renderQuotes(-1)}

          <CaseDescription>
            {paragraphs.map((para, pIdx) => (
              <React.Fragment key={pIdx}>
                <p>{para}</p>
                {/* Inline quotes after this paragraph */}
                {renderQuotes(pIdx)}
              </React.Fragment>
            ))}
          </CaseDescription>

          {/* Quotes with no afterParagraph appear after all paragraphs */}
          {renderQuotes(Infinity)}

          <BackButton onClick={handleBackToTop}>처음으로 돌아가기</BackButton>
        </ContentSection>
      </ContentGrid>
    </CaseStudyContainer>
  );
}
