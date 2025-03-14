"use client";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import GeneralInfoForm from "./(resume)/GeneralInfoForm";
import PersonalInfoForm from "./(resume)/PersonalInfoForm";
const ResumeForm = () => {
  return (
    <>
      <div className="flex grow flex-col">
        {/* Starting Section */}
        <div className="flex flex-col justify-center items-center my-8 gap-2">
          <h1 className="plus-jakarta-sans-800 text-4xl font-bold">
            Design your Resume
          </h1>
          <p className="plus-jakarta-sans-400 text-xl font-semibold ">
            Follow the steps below to create your resume.Your progress will be
            saved automatically!
          </p>
        </div>
        {/* Main Section */}
        <main className="min-h-screen grow ">
          <div className=" w-full flex">
            <div className="w-full md:w-1/2 p-3 overflow-y-auto">
              <PersonalInfoForm />
            </div>
            <div className="grow md:border-r " />
            <div className="hidden w-1/2 md:flex">right</div>
          </div>
        </main>
        {/* Footer Section */}
        <footer className="border-t w-full px-3 py-5">
          <div className="max-w-7xl flex flex-wrap justify-between gap-4">
            <div className="flex items-center gap-3">
              <Button variant={"secondary"}>Previous Step</Button>
              <Button>Next Step</Button>
            </div>
            <div className="flex items-center gap-3">
              <Button variant={"secondary"}>
                <Link href="#">Close</Link>
              </Button>
              <p className="text-muted-foreground opacity-0">Saving...</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default ResumeForm;
