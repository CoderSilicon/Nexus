import React from "react";

import {
  SiGooglechrome,
  SiFirefox,
  SiSafari,
  SiOpera,
  SiBrave,
  SiVivaldi,
} from "react-icons/si";
import { FaEdge, FaInternetExplorer } from "react-icons/fa";

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
const CompatibilitySection = () => {
  return (
    <div className="bg-gradient-to-br from-sky-600 to-sky-800 dark:from-sky-900 dark:to-sky-950 text-white p-8 min-h-full">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-6xl text-center font-bold mb-6 plus-jakarta-sans-800 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200 dark:to-blue-300">
          Works Anywhere?
        </h1>
        <p className="text-lg md:text-xl mb-8 lexend-300 text-gray-100 dark:text-gray-200 text-center mx-auto">
          Experience Nexus effortlessly on any major browser or platform—no
          downloads required! Just click the button below and dive right in
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 justify-items-center items-center mb-8">
          {apps.map((app, index) => (
            <div
              key={index}
              className="group flex flex-col items-center p-4 rounded-lg transition-all duration-300 hover:bg-white/10 hover:scale-105"
            >
              <app.icon className="w-10 h-10 mb-2 text-gray-100 group-hover:text-blue-200 transition-colors" />
              <span className="text-sm font-medium text-gray-200 group-hover:text-white">
                {app.name}
              </span>
            </div>
          ))}
        </div>
        <p className="text-md text-gray-300 dark:text-gray-400 text-center lexend-400">
          And{" "}
          <span className="text-blue-200 dark:text-blue-300 font-semibold">
            many more
          </span>{" "}
          —too many to list them all here!
        </p>
      </div>
    </div>
  );
};

export default CompatibilitySection;
