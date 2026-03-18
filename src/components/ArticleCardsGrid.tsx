"use client";

import React from "react";
import styled from "styled-components";
import { articleCardsData } from "@/data/content";

const ArticleCardsContainer = styled.section`
  background-color: #222222;
  padding: 0 40px;
  color: #ffffff;

  @media (max-width: 768px) {
    padding: 0 16px;
  }
`;

const CardsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const ArticleCard = styled.article<{ $imageLeft?: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.$imageLeft ? "row-reverse" : "row")};
  overflow: hidden;
  background-color: #171717;
  border-radius: 16px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

/* Image side – height is driven by the content column, not the image */
const CardImageWrapper = styled.div`
  flex: 1;
  position: relative;
  min-height: 200px;
  overflow: hidden;
`;

const CardImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

/* Content side – its natural height sets the row height */
const CardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
`;

const CardTitleWrapper = styled.div`
  padding: 40px 40px 0;
`;

const CardTitle = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.4;
  color: #ffffff;
  white-space: pre-line;
  word-break: keep-all;
  text-align: center;
  margin: 0;
`;

const CardButtonWrapper = styled.div`
  padding: 0 40px 40px;
  text-align: right;
`;

const CardButton = styled.button`
  background-color: #000000;
  border: none;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #222222;
  }
`;

const BottomCard = styled.div`
  display: flex;
  flex-direction: row;
  overflow: hidden;
  background-color: #171717;
  border-radius: 16px;

  @media (max-width: 768px) {
    flex-direction: column-reverse;
  }
`;

const BottomButtonsPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 40px 50px;
  gap: 12px;

  @media (max-width: 768px) {
    padding: 32px 24px;
  }
`;

const BottomImagePanel = styled.div`
  flex: 1;
  position: relative;
  min-height: 200px;
  overflow: hidden;
`;

const BottomImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

interface BottomButtonProps {
  $bgColor?: string;
}

const BottomButton = styled.button<BottomButtonProps>`
  background-color: ${(props) => props.$bgColor || "#d5a052"};
  border: none;
  color: #ffffff;
  padding: 10px 24px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 5px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.88;
  }
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

export default function ArticleCardsGrid() {
  const getButtonColor = (index: number): string => {
    if (index === 0) return "#d5a052";
    if (index === 1) return "#3ba67b";
    return "#424242";
  };

  return (
    <ArticleCardsContainer>
      <CardsGrid>
        {articleCardsData.cards.map((card, index) => (
          /* odd index → image LEFT; even index → image RIGHT */
          <ArticleCard key={index} $imageLeft={index % 2 !== 0}>
            <CardContent>
              <CardTitleWrapper>
                <CardTitle>
                  {renderHighlighted(card.titleText, card.highlights)}
                </CardTitle>
              </CardTitleWrapper>
              <CardButtonWrapper>
                <CardButton>기사 읽기</CardButton>
              </CardButtonWrapper>
            </CardContent>
            <CardImageWrapper>
              <CardImage src={card.image} alt={`card-${index}`} loading="lazy" />
            </CardImageWrapper>
          </ArticleCard>
        ))}
      </CardsGrid>

      <BottomCard>
        <BottomButtonsPanel>
          {articleCardsData.bottomButtons.map((btn, index) => (
            <BottomButton key={index} $bgColor={getButtonColor(index)}>
              {btn.text}
            </BottomButton>
          ))}
        </BottomButtonsPanel>
        <BottomImagePanel>
          <BottomImage
            src={articleCardsData.bottomImage}
            alt="AI"
            loading="lazy"
          />
        </BottomImagePanel>
      </BottomCard>
    </ArticleCardsContainer>
  );
}
