"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&family=Noto+Serif+KR:wght@400;700;900&display=swap');

  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    scroll-behavior: smooth;
  }

  body {
    font-family: "Noto Sans KR", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
    line-height: 1.6;
    color: #ffffff;
    background-color: #0d0d0d;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  button {
    font-family: inherit;
  }
`;

export default GlobalStyle;
