"use client";

import HeroSection from "@/components/HeroSection";
import IntroSection from "@/components/IntroSection";
import QuoteGrid from "@/components/QuoteGrid";
import StatsSection from "@/components/StatsSection";
import ArticleCardsGrid from "@/components/ArticleCardsGrid";
import CaseStudy from "@/components/CaseStudy";
import ArticleSection from "@/components/ArticleSection";
import { caseStudiesData, articleSectionsData } from "@/data/content";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <IntroSection />
      <QuoteGrid />
      <StatsSection />
      <ArticleCardsGrid />

      {/* Case Studies Section */}
      {caseStudiesData.map((caseStudy, index) => (
        <CaseStudy key={caseStudy.id} {...caseStudy} imageRight={index % 2 !== 0} />
      ))}

      {/* Article Sections */}
      {articleSectionsData.map((article) => (
        <ArticleSection key={article.id} {...article} />
      ))}
    </main>
  );
}
