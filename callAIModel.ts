import OpenAI from "openai";
import "dotenv/config";

// Using OpenAI SDK pointed at OpenRouter as a drop-in replacement.
// This is done to learn OpenAI API with the help of OpenRouter.
// Additionally, changing the model is as simple as changing the model field.
export const aiClient = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function callAIModel(selectAnswer: string, userPrompt: string) {
  const response = await aiClient.responses.create({
    model: "openrouter/free",
    input: [
      {
        role: "developer",
        content:
          "You are a helpful assistant that doesn't give verbose answers. If the response doesn't require long explanations, keep it short.",
      },
      {
        role: "user",
        content: "Are semicolons optional in JavaScript?",
      },
    ],
  });

  return response;
}
