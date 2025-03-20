export async function generateFlashcards({
  topic,
  count = 5,
}: {
  topic: string;
  count?: number;
}) {
  try {
    const response = await fetch("/api/flashCard-gen", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ topic, count }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Failed to generate flashcards");
    }

    if (!data.flashcards || !Array.isArray(data.flashcards)) {
      throw new Error("Invalid response format");
    }

    return data.flashcards;
  } catch (error: any) {
    console.error("Error generating flashcards:", error);
    throw new Error(error?.message || "Failed to generate flashcards");
  }
}
