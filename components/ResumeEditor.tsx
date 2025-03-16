"use client";
import React, { MouseEvent, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { steps } from "./(resume)/links";
import Breadcrumbs from "./(resume)/Breadcrumbs";
import { ResumeSchemaVals } from "@/lib/FormSchema";

const ResumeForm = () => {
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
      <div className="flex grow flex-col lexend-400 min-h-screen">
        {/* Starting Section */}
        <div className="flex flex-col justify-center items-center p-4 md:my-8 gap-2">
          <h1 className="plus-jakarta-sans-800 text-2xl md:text-4xl font-bold text-center">
            Design your Resume
          </h1>
          <p className="plus-jakarta-sans-400 text-base md:text-xl font-semibold text-center px-4">
            Follow the steps below to create your resume. Your progress will be
            saved automatically!
          </p>
        </div>
        {/* Main Section */}
        <main className="grow px-4">
          <div className="w-full flex items-center justify-center">
            <div className="w-full md:w-3/4 lg:w-1/2 p-3 overflow-y-auto flex flex-col gap-4">
              <div className="flex justify-center items-center my-3">
                <Breadcrumbs
                  steps={steps}
                  currentstep={currentStep}
                  onClick={(e) =>
                    setStep((e.target as HTMLElement).dataset.key || "")
                  }
                  setCurrentStep={setStep}
                />
              </div>
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
        <footer className="border-t w-full p-4 md:px-12 md:py-5">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                variant={"secondary"}
                className="w-full sm:w-auto"
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
                Previous Step
              </Button>
              <Button
                className="w-full sm:w-auto"
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
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button variant={"secondary"} className="w-full sm:w-auto">
                <Link href="#">Close</Link>
              </Button>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ResumeForm;
