"use client";

import styled from "styled-components";
import { quoteGridData } from "@/data/content";
import { useState } from "react";

const QuoteGridContainer = styled.section`
  background-color: #222222;
  padding: 50px 40px;
  color: #ffffff;
`;

const QuoteGridInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TitleImage = styled.img`
  width: min(700px, 80vw);
  height: auto;
  display: block;
  margin: 0 auto 20px;
`;


const SectionSubtitle = styled.p`
  font-size: 15px;
  font-family: "PT Serif", serif;
  text-align: center;
  color: #ffffff;
  margin-bottom: 40px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 40px;

  /* 901~1400px: 2컬럼 */
  @media (min-width: 901px) and (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  /* ≤900px: 1컬럼 */
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const QuoteCard = styled.div`
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(rgb(0, 0, 0) 5%, rgba(0, 0, 0, 0) 100%);
    opacity: 0.1;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
  }
`;

const QuoteText = styled.div`
  padding: 16px 16px 0;
`;

const Quote = styled.p`
  font-size: 15px;
  line-height: 22.95px;
  color: #ffffff;
  margin-bottom: 0;
  font-weight: 400;
  font-family: "PT Serif", serif;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  padding: 0 16px 16px;
  text-align: center;
`;

const Button = styled.button`
  background-color: #304753;
  border: none;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;
  align-self: flex-start;

  &:hover {
    background-color: #3a5563;
  }
`;

const Modal = styled.div<{ $isOpen: boolean }>`
  display: ${(props) => (props.$isOpen ? "flex" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: #2a2a2a;
  padding: 40px;
  border-radius: 8px;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  color: #ffffff;
`;

const ModalClose = styled.button`
  background-color: transparent;
  border: none;
  color: #d5a052;
  font-size: 1.5rem;
  cursor: pointer;
  float: right;
  padding: 0;
  margin-bottom: 20px;

  &:hover {
    color: #e6b86a;
  }
`;

const ModalText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #e0e0e0;
`;

export default function QuoteGrid() {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

  const handleQuoteClick = (quote: string) => {
    setSelectedQuote(quote);
  };

  const handleCloseModal = () => {
    setSelectedQuote(null);
  };

  return (
    <QuoteGridContainer>
      <QuoteGridInner>
        <TitleImage
          src="/assets/PVXNLwIJBh/4-4096x604.png"
          alt="AI와의 위험한 대화"
        />
        <SectionSubtitle>{quoteGridData.subtitle}</SectionSubtitle>

        <Grid>
          {quoteGridData.quotes.map((quote, index) => (
            <QuoteCard key={index}>
              <QuoteText>
                <Quote>{quote}</Quote>
              </QuoteText>
              <ButtonWrapper>
                <Button onClick={() => handleQuoteClick(quote)}>전문 보기</Button>
              </ButtonWrapper>
            </QuoteCard>
          ))}
        </Grid>
      </QuoteGridInner>

      <Modal $isOpen={!!selectedQuote} onClick={handleCloseModal}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalClose onClick={handleCloseModal}>&times;</ModalClose>
          <ModalText>
            이 인용문은 실제 AI와의 대화에서 나온 것입니다. 해당 개인의 사건에 대한
            전체 내용은 아래의 개별 사건 섹션에서 확인하실 수 있습니다.
          </ModalText>
        </ModalContent>
      </Modal>
    </QuoteGridContainer>
  );
}
