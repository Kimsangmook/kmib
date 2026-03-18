"use client";

import React from "react";
import styled from "styled-components";
import type { ArticleSectionData, ArticleContentBlock } from "@/data/content";

const SectionContainer = styled.section<{ $bgImage?: string }>`
  position: relative;
  background-color: #ffffff;
  color: #333333;
  width: 100%;
  overflow: hidden;
`;

const BgLayer = styled.div<{ $bgImage: string }>`
  position: absolute;
  inset: 0;
  background: url(${(p) => p.$bgImage}) center / cover no-repeat;
  z-index: 0;
`;

const BgOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.85);
  z-index: 1;
`;

const ArticleInner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 680px;
  margin: 0 auto;
  padding: 60px 24px 80px;

  @media (max-width: 768px) {
    padding: 40px 20px 60px;
  }
`;

const ArticleTitle = styled.h2<{ $fontSize?: string; $fontWeight?: string }>`
  font-size: ${(p) => p.$fontSize ?? "clamp(2rem, 4vw, 3.3rem)"};
  font-family: "PT Serif", serif;
  font-weight: ${(p) => p.$fontWeight ?? "400"};
  color: #333333;
  line-height: 1.2;
  text-align: center;
  margin-bottom: 24px;
  word-break: keep-all;
  white-space: pre-line;
`;

const TitleDivider = styled.div`
  width: 150px;
  height: 2px;
  background-color: #777777;
  margin: 0 auto 33.6px;
`;

const HeroImageWrapper = styled.figure`
  margin: 0 0 32px;
  text-align: center;
`;

const HeroImg = styled.img`
  max-width: min(448px, 100%);
  height: auto;
  display: block;
  margin: 0 auto;
`;

const HeroCaption = styled.figcaption`
  font-size: 16px;
  color: #777777;
  margin-top: 8px;
  line-height: 19.2px;
  text-align: center;
  font-family: Lato, "Noto Sans KR", sans-serif;
`;

const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.53;
  margin-bottom: 20px;
  color: #333333;
  word-break: keep-all;
  font-family: Lato, "Noto Sans KR", sans-serif;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SubHeading = styled.h3`
  font-size: clamp(1.3rem, 2.17vw, 1.84rem);
  font-weight: 700;
  font-family: "PT Serif", serif;
  color: #1a1a1a;
  line-height: 1.2;
  margin-top: 40px;
  margin-bottom: 16px;
  text-align: center;
  white-space: pre-line;
`;

const InlineImage = styled.figure`
  margin: 24px 0;
  text-align: center;
`;

const InlineImg = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
`;

const InlineCaption = styled.figcaption`
  font-size: 16px;
  color: #777777;
  margin-top: 8px;
  line-height: 19.2px;
  text-align: center;
  font-family: Lato, "Noto Sans KR", sans-serif;
`;

const QuoteBlock = styled.blockquote`
  text-align: center;
  padding: 24px 20px;
  margin: 28px 0;
  border-top: 1px solid #d5a052;
  border-bottom: 1px solid #d5a052;
  background-color: transparent;
`;

const QuoteSpeaker = styled.span`
  font-size: 0.85rem;
  color: #d5a052;
  font-weight: 700;
  display: block;
  margin-bottom: 10px;
`;

const QuoteText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #333333;
  font-style: italic;
`;

function renderHighlighted(
  text: string,
  highlights?: { text: string; color: string }[]
) {
  if (!highlights || highlights.length === 0) return text;

  const result: (string | React.ReactElement)[] = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
    let earliest = -1;
    let earliestH: { text: string; color: string } | null = null;

    for (const h of highlights) {
      const idx = remaining.indexOf(h.text);
      if (idx !== -1 && (earliest === -1 || idx < earliest)) {
        earliest = idx;
        earliestH = h;
      }
    }

    if (earliest === -1 || !earliestH) {
      result.push(remaining);
      break;
    }
    if (earliest > 0) result.push(remaining.substring(0, earliest));
    result.push(
      <span key={keyIdx++} style={{ color: earliestH.color }}>
        {earliestH.text}
      </span>
    );
    remaining = remaining.substring(earliest + earliestH.text.length);
  }

  return result;
}

function renderBlock(block: ArticleContentBlock, index: number) {
  switch (block.type) {
    case "paragraph":
      return <Paragraph key={index}>{block.text}</Paragraph>;
    case "subheading":
      return <SubHeading key={index}>{block.text}</SubHeading>;
    case "image":
      return (
        <InlineImage key={index}>
          <InlineImg src={block.url} alt={block.caption} loading="lazy" />
          {block.caption && <InlineCaption>{block.caption}</InlineCaption>}
        </InlineImage>
      );
    case "quote":
      return (
        <QuoteBlock key={index}>
          {block.speaker && <QuoteSpeaker>{block.speaker}</QuoteSpeaker>}
          <QuoteText>&ldquo;{block.text}&rdquo;</QuoteText>
        </QuoteBlock>
      );
    default:
      return null;
  }
}

export default function ArticleSection({
  title,
  titleHighlights,
  titleFontSize,
  titleFontWeight,
  heroImage,
  heroCaption,
  backgroundImage,
  content,
}: ArticleSectionData) {
  return (
    <SectionContainer>
      {backgroundImage && (
        <>
          <BgLayer $bgImage={backgroundImage} />
          <BgOverlay />
        </>
      )}
      <ArticleInner>
        <ArticleTitle $fontSize={titleFontSize} $fontWeight={titleFontWeight}>
          {renderHighlighted(title, titleHighlights)}
        </ArticleTitle>
        <TitleDivider />

        {heroImage && (
          <HeroImageWrapper>
            <HeroImg src={heroImage} alt={title} loading="lazy" />
            {heroCaption && <HeroCaption>{heroCaption}</HeroCaption>}
          </HeroImageWrapper>
        )}

        {content.map((block, index) => renderBlock(block, index))}
      </ArticleInner>
    </SectionContainer>
  );
}
