"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, Download, Rocket } from "lucide-react";

import { useState } from "react";
import { ResumeSchemaVals } from "@/lib/FormSchema";

interface EditorFormProps {
  resumeData: ResumeSchemaVals;
  setResumeData: (data: ResumeSchemaVals) => void;
}

export default function SubmitForm({
  resumeData,
  setResumeData,
}: EditorFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Send the resume data to your API route
      const response = await fetch("/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ resumeData }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to generate resume");
      }

      // If your API returns the PDF directly as a blob
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);

      // Automatically trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = `${resumeData.firstName || "resume"}_${
        resumeData.lastName || ""
      }.pdf`.replace(/\s+/g, "_");
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error generating resume:", error);
      setError(
        (error as Error).message ||
          "There was an error generating your resume. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8 dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle className="text-center plus-jakarta-sans-400 text-2xl font-bold dark:text-white">
          Final Submission
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert
          variant="destructive"
          className="mb-4 dark:bg-red-900 dark:border-red-800"
        >
          <AlertDescription className="text-center dark:text-gray-200">
            This is the last page where all of the data is sent to AI and will
            be processed further. Please make sure everything is OK.
          </AlertDescription>
        </Alert>

        {error && (
          <Alert
            variant="destructive"
            className="mb-4 dark:bg-red-900 dark:border-red-800"
          >
            <AlertTriangle className="h-5 w-5 mr-2" />
            <AlertDescription className="dark:text-gray-200">
              {error}
            </AlertDescription>
          </Alert>
        )}

        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 text-xl font-medium dark:text-white">
            <Rocket className="h-5 w-5" />
            <span>Get ready to release it in AI&apos;s hands!</span>
          </div>

          <Button
            size="lg"
            className="w-full max-w-xs dark:hover:bg-primary/90"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              "Processing..."
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Generate & Download Resume
              </>
            )}
          </Button>

          {downloadUrl && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2 dark:border-gray-600 dark:hover:bg-gray-700"
              onClick={() => {
                const a = document.createElement("a");
                a.href = downloadUrl;
                a.download = `${resumeData.firstName || "resume"}_${
                  resumeData.lastName || ""
                }.pdf`.replace(/\s+/g, "_");
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
              }}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Again
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
