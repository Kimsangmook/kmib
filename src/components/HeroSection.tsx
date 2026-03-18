"use client";

import styled from "styled-components";
import { heroData } from "@/data/content";

const HeroContainer = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #ffffff;
  text-align: center;
`;

const HeroBg = styled.div`
  position: absolute;
  inset: 0;
  background: url(${heroData.backgroundImage}) center/cover no-repeat;
  z-index: 0;
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 18%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media (max-width: 768px) {
    bottom: 12%;
  }
`;

const CreditsLine1 = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 4px;
  letter-spacing: 0.04em;
`;

const CreditsLine2 = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 16px;
  letter-spacing: 0.02em;
`;

const DateText = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.04em;
`;

export default function HeroSection() {
  return (
    <HeroContainer>
      <HeroBg />
      <HeroContent>
        <CreditsLine1>{heroData.creditsLine1}</CreditsLine1>
        <CreditsLine2>{heroData.creditsLine2}</CreditsLine2>
        <DateText>{heroData.date}</DateText>
      </HeroContent>
    </HeroContainer>
  );
}
