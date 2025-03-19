import { type NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ResumeSchemaVals } from "@/lib/FormSchema";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
  const data = await req.json();
  const resumeData = data.resumeData as ResumeSchemaVals;
  const prompt = `Create a beautiful summary from my form data: ${JSON.stringify(
    data
  )}`;
  const result = await model.generateContent(prompt);
  const generatedContent = result.response.text();
  return NextResponse.json({ summary: generatedContent });
}
