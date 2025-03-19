"use client";

import React, { type MouseEvent } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbsProps {
  steps: { key: string; title: string; component: React.ComponentType<any> }[];
  currentstep: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  setCurrentStep: (step: string) => void;
}

const ResumeBreadcrumb: React.FC<BreadcrumbsProps> = ({
  steps,
  currentstep,
  setCurrentStep,
}) => {
  return (
    <Breadcrumb className="">
      <BreadcrumbList className="dark:text-gray-200">
        {steps.map((step, index) => (
          <React.Fragment key={step.key}>
            <BreadcrumbItem>
              {step.key === currentstep ? (
                <BreadcrumbPage className="dark:text-white">
                  {step.title}
                </BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <button
                    className="dark:text-gray-300 dark:hover:text-white"
                    onClick={() => {
                      setCurrentStep(step.key);
                    }}
                  >
                    {step.title}
                  </button>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < steps.length - 1 && (
              <BreadcrumbSeparator className="dark:text-gray-400" />
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ResumeBreadcrumb;
