"use client";
import React, { MouseEvent, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { steps } from "./(resume)/links";
import Breadcrumbs from "./(resume)/Breadcrumbs";
import { ResumeSchemaVals } from "@/lib/FormSchema";

const ResumeForm = (props: any) => {
  const [resumeData, setresumeData] = useState<ResumeSchemaVals>({});
  const searchParams = useSearchParams();
  const currentStep = searchParams.get("step") || steps[0].key;

  const setStep = (key: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  };

  const FormComponent = steps.find(
    (step) => step.key === currentStep
  )?.component;

  return (
    <>
      <div className="flex flex-col lexend-400 dark:bg-gray-950 dark:backdrop-blur-md p-16 justify-between transition-all duration-300">
        {/* Main Section */}
        <main className="grow px-3 sm:px-6 py-4 w-full">
          <div className="w-full">
            {/* Breadcrumbs - hidden on mobile, visible on lg screens */}
            <div className="hidden lg:flex justify-center items-center mb-4">
              <Breadcrumbs
                steps={steps}
                currentstep={currentStep}
                onClick={(e) =>
                  setStep((e.target as HTMLElement).dataset.key || "")
                }
                setCurrentStep={setStep}
              />
            </div>

            {/* Step indicator for mobile */}
            <div className="lg:hidden text-center mb-3">
              <p className="text-sm font-medium dark:text-gray-300/90">
                Step {steps.findIndex((step) => step.key === currentStep) + 1}
                of {steps.length}
              </p>
              <h3 className="text-base font-bold dark:text-white/90">
                {steps.find((step) => step.key === currentStep)?.title}
              </h3>
            </div>

            <div className="overflow-y-auto h-[50vh] sm:h-[55vh] md:h-[60vh] dark:bg-gray-800/70 dark:backdrop-blur-sm bg-white rounded-lg shadow-md p-4 border dark:border-gray-700/50 w-full sm:w-4/5 md:w-3/4 lg:w-3/5 mx-auto transition-all duration-300">
              {FormComponent && (
                <FormComponent
                  resumeData={resumeData}
                  setResumeData={setresumeData}
                />
              )}
            </div>
          </div>
        </main>

        {/* Footer Section */}
        <footer className="border-t dark:border-gray-700 w-full p-3 sm:p-4 mt-auto">
          <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-2 w-full">
                <Button
                  variant={"secondary"}
                  className="w-1/2 sm:w-auto text-xs sm:text-sm dark:bg-gray-700/80 dark:hover:bg-gray-600/80 transition-colors duration-300"
                  onClick={() => {
                    const currentIndex = steps.findIndex(
                      (step) => step.key === currentStep
                    );
                    if (currentIndex > 0) {
                      setStep(steps[currentIndex - 1].key);
                    }
                  }}
                  disabled={
                    steps.findIndex((step) => step.key === currentStep) === 0
                  }
                >
                  Previous
                </Button>
                <Button
                  className="w-1/2 sm:w-auto text-xs sm:text-sm"
                  onClick={() => {
                    const currentIndex = steps.findIndex(
                      (step) => step.key === currentStep
                    );
                    if (currentIndex < steps.length - 1) {
                      setStep(steps[currentIndex + 1].key);
                    }
                  }}
                  disabled={
                    steps.findIndex((step) => step.key === currentStep) ===
                    steps.length - 1
                  }
                >
                  Next Step
                </Button>
              </div>
              <div className="flex justify-start sm:justify-end w-full">
                <Button
                  onClick={() => {
                    props.setEditor(!props.Editor);
                  }}
                  variant={"secondary"}
                  className="w-full sm:w-auto text-xs sm:text-sm dark:bg-gray-700/80 dark:hover:bg-gray-600/80 transition-colors duration-300"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ResumeForm;
