"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangleIcon, Rocket } from "lucide-react";

export default function SubmitForm() {
  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center">Final Submission</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant={"warning"} className="mb-4">
          <AlertTriangleIcon className="h-10 w-10" />
          <AlertDescription>
            This is the last page where all of the data is sent to AI and will
            be processed further. Please make sure everything is OK.
          </AlertDescription>
        </Alert>

        <div className="text-center space-y-6">
          <div className="flex items-center justify-center space-x-2 text-xl font-medium">
            <Rocket className="h-5 w-5" />
            <span>Get ready to release it in AI&apos;s hands!</span>
          </div>

          <Button
            size="lg"
            className="w-full max-w-xs"
            onClick={() => {
              // Handle submission logic here
              console.log("Submitting to AI...");
            }}
          >
            Submit to AI
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
