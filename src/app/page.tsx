"use client";

import styled from "styled-components";

const Container = styled.main`
  max-width: 720px;
  margin: 0 auto;
  padding: 60px 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 16px;
`;

const Description = styled.p`
  font-size: 1.1rem;
  color: #666;
`;

export default function Home() {
  return (
    <Container>
      <Title>국민일보 인터렉티브</Title>
      <Description>인터렉티브 기사 프로젝트</Description>
    </Container>
  );
}
