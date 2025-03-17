"use client";

import HeroSection from "@/components/(landing)/HeroSection";
import FeatureSection from "@/components/(landing)/FeatureSection";
import StatsSection from "@/components/(landing)/StatsSection";
import HowItWorks from "@/components/(landing)/howItWorks";
import Testimonials from "@/components/(landing)/Testimonials";
import FAQsSection from "@/components/(landing)/FAQsSection";
import CompatibilitySection from "@/components/(landing)/CompatibilitySection";
import CTASection from "@/components/(landing)/CTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <CompatibilitySection />
      <FeatureSection />
      <StatsSection />
      <HowItWorks />
      <Testimonials />
      <FAQsSection />
      <CTASection />
    </>
  );
}
