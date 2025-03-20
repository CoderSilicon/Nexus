import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: Request) {
  try {
    const { topic, count = 5 } = await req.json();

    const prompt = `Generate ${count} flashcards for technical interview preparation about ${topic}.
    Return the response in this exact JSON format:
    {
      "flashcards": [
        {
          "question": "Clear, concise question...",
          "answer": "Detailed but concise answer..."
        }
      ]
    }
    
    Requirements:
    1. Questions should be 10-20 words maximum
    2. Answers should be 70-150 words maximum
    3. Make questions clear and specific
    4. Answers should be educational but easy to understand
    5. Focus on key concepts and practical applications
    6. No code snippets in answers
    7. Return ONLY valid JSON, no markdown or additional text`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      // Clean up the response text
      const cleanedText = text
        .replace(/```json\n?|```/g, "")
        .replace(/^\s*\n/gm, "")
        .trim();

      // Parse the JSON
      const parsedResponse = JSON.parse(cleanedText);

      // Validate the response structure
      if (
        !parsedResponse.flashcards ||
        !Array.isArray(parsedResponse.flashcards)
      ) {
        throw new Error("Invalid response structure");
      }

      // Validate each flashcard
      const validatedFlashcards = parsedResponse.flashcards.map((card: any) => {
        if (
          !card.question ||
          !card.answer ||
          typeof card.question !== "string" ||
          typeof card.answer !== "string"
        ) {
          throw new Error("Invalid flashcard structure");
        }
        return {
          question: card.question.trim(),
          answer: card.answer.trim(),
        };
      });

      return NextResponse.json({ flashcards: validatedFlashcards });
    } catch (error: any) {
      console.error("Error parsing JSON:", error);
      console.error("Raw response:", text);
      return NextResponse.json(
        {
          error: "Failed to parse flashcards response",
          details: error?.message || "Unknown parsing error",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error("Error in Gemini API:", error);
    return NextResponse.json(
      {
        error: "Failed to generate flashcards",
        details: error?.message || "Unknown error",
      },
      { status: 500 }
    );
  }
}
