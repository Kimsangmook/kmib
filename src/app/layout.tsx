import type { Metadata } from "next";
import StyledComponentsRegistry from "@/lib/registry";
import GlobalStyle from "@/styles/GlobalStyle";

export const metadata: Metadata = {
  title: "국민일보 인터렉티브",
  description: "국민일보 인터렉티브 기사",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyle />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
