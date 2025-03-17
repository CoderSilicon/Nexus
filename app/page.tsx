"use client";

import {
  SiGooglechrome,
  SiFirefox,
  SiSafari,
  SiOpera,
  SiBrave,
  SiVivaldi,
} from "react-icons/si";
import { FaEdge, FaInternetExplorer } from "react-icons/fa";
import HeroSection from "@/components/(landing)/HeroSection";
import FeatureSection from "@/components/(landing)/FeatureSection";
import StatsSection from "@/components/(landing)/StatsSection";
import HowItWorks from "@/components/(landing)/howItWorks";
import Testimonials from "@/components/(landing)/Testimonials";
import FAQsSection from "@/components/(landing)/FAQsSection";

const apps = [
  { name: "Chrome", icon: SiGooglechrome },
  { name: "Firefox", icon: SiFirefox },
  { name: "Safari", icon: SiSafari },
  { name: "Opera", icon: SiOpera },
  { name: "Edge", icon: FaEdge },
  { name: "Brave", icon: SiBrave },
  { name: "Vivaldi", icon: SiVivaldi },
  { name: "Internet Explorer", icon: FaInternetExplorer },
];
export default function Home() {
  return (
    <>
      <HeroSection />
      <FeatureSection />
      <StatsSection />
      <HowItWorks />
      <Testimonials />
      <FAQsSection />
      {/* <div className="bg-sky-600 text-white text-center p-6 min-h-full flex flex-col items-center">
        <div className="max-w-3xl">
          <h1 className="text-6xl font-bold mb-4 plus-jakarta-sans-800 mt-4">
            Works Anywhere?
          </h1>
          <p className="text-lg mb-6 lexend-300">
            Experience Nexus effortlessly on any major browser or platform—no
            downloads required! Just click the button below and dive right in
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 justify-center items-center mb-6">
            {apps.map((app, index) => (
              <div
                key={index}
                className="flex flex-col items-center mt-4 mb-4 m-2.5 p-2"
              >
                <app.icon className="w-12 h-12 mb-2" />
                <span className="text-sm">{app.name}</span>
              </div>
            ))}
          </div>
          <p className="text-md text-slate-300 text-center lexend-400">
            And <span className="text-blue-200"> Many more</span>—too many to
            list them all here!
          </p>
        </div>
      </div> */}
    </>
  );
}
