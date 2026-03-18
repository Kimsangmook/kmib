"use client";

import styled from "styled-components";
import { statsData } from "@/data/content";

const StatsContainer = styled.section`
  position: relative;
  width: 100%;
  background-color: #222222;
  color: #ffffff;
`;

const BgImage = styled.div`
  position: absolute;
  inset: 0;
  background: url(${statsData.backgroundImage}) center/cover no-repeat;
  z-index: 0;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 1;
`;

const StatsInner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 680px;
  margin: 0 auto;
  padding: 78px 24px;
`;

const TextBlock = styled.div`
  margin-bottom: 80px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const BlockTitle = styled.h2`
  font-size: clamp(1.8rem, 2.86vw, 2.44rem);
  font-weight: 400;
  font-family: "Noto Sans KR", Lato, sans-serif;
  line-height: 1.2;
  margin-bottom: 30px;
  white-space: pre-line;
  text-align: left;
`;

const TitleSpan = styled.span<{ $highlight?: boolean }>`
  color: ${(props) => (props.$highlight ? "#d5a052" : "#ffffff")};
`;

const BodyText = styled.div``;

const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.53;
  color: #ffffff;
  margin-bottom: 16px;
  word-break: keep-all;
  font-family: "Noto Sans KR", Lato, sans-serif;

  &:last-child {
    margin-bottom: 0;
  }
`;

export default function StatsSection() {
  return (
    <StatsContainer>
      <BgImage />
      <Overlay />
      <StatsInner>
        {statsData.blocks.map((block, blockIndex) => (
          <TextBlock key={blockIndex}>
            <BlockTitle>
              {block.titleParts.map((part, i) => (
                <TitleSpan key={i} $highlight={part.highlight}>
                  {part.text}
                </TitleSpan>
              ))}
            </BlockTitle>
            <BodyText>
              {block.paragraphs.map((para, i) => (
                <Paragraph key={i}>{para}</Paragraph>
              ))}
            </BodyText>
          </TextBlock>
        ))}
      </StatsInner>
    </StatsContainer>
  );
}
