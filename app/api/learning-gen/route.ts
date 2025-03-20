import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Google Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

type Resource = {
  title: string;
  type: string;
  description: string;
  link: string;
  difficulty: string;
  duration: string;
  provider: string;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, topic, description, skillLevel } = body;

    // Create a prompt based on the form data
    const prompt = `As an AI learning assistant, generate personalized learning resources and a learning path for the following request:

Topic: ${topic}
Resource Type: ${type}
Description: ${description}
Skill Level: ${skillLevel || "beginner"}

You must ONLY recommend resources of type "${type}". For example, if type is "books", only recommend books, not courses or other types of resources.

Return ONLY a valid JSON object in the following format (no markdown, no code blocks, no additional text):
{
  "recommendations": {
    "resources": [
      {
        "title": "string (title of the ${type})",
        "type": "${type}",
        "description": "string (brief description)",
        "link": "string (where to find/buy/access the ${type})",
        "difficulty": "string (beginner/intermediate/advanced)",
        "duration": "string (estimated time to complete)",
        "provider": "string (publisher/platform/author)"
      }
    ],
    "learning_path": {
      "steps": [
        {
          "step": 1,
          "title": "string",
          "description": "string",
          "estimated_duration": "string",
          "resources": [
            {
              "title": "string (title of a specific ${type} for this step)",
              "link": "string (direct link to the ${type})"
            }
          ]
        }
      ],
      "total_duration": "string"
    }
  }
}

Requirements:
1. Provide 3-5 high-quality ${type} specific to the topic and skill level
2. Include only real, accessible ${type} with valid links
3. Create a practical step-by-step learning path using only ${type}
4. Estimate realistic durations for reading/completing each ${type}
5. Return ONLY valid JSON without any markdown or text formatting
6. IMPORTANT: Every resource MUST be of type "${type}" - do not include any other types of resources
7. IMPORTANT: The link MUST be
`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // Clean the response text to handle potential markdown formatting
    text = text.replace(/```json\s*|\s*```/g, "").trim();

    // Parse the response as JSON
    try {
      const jsonResponse = JSON.parse(text);

      // Validate that all resources are of the correct type
      const resources = jsonResponse.recommendations.resources as Resource[];
      const validResources = resources.map((resource: Resource) => ({
        ...resource,
        type: type, // Ensure type is correct
      }));

      jsonResponse.recommendations.resources = validResources;

      return NextResponse.json(jsonResponse);
    } catch (error) {
      console.error("Failed to parse Gemini response as JSON:", error);

      // Attempt to extract JSON from the response if it contains markdown
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        try {
          const extractedJson = JSON.parse(jsonMatch[0]);
          return NextResponse.json(extractedJson);
        } catch {
          // If extraction fails, return error
          return NextResponse.json(
            { error: "Failed to generate valid learning path" },
            { status: 500 }
          );
        }
      }

      return NextResponse.json(
        { error: "Failed to generate valid learning path" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error in learning-gen route:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
