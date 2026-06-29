import OpenAI from "openai";
import "dotenv/config";
import { systemPrompts } from "./systemPrompts.ts";
import type { SelectAnswer } from "./myConstants.ts";

// Using OpenAI SDK pointed at OpenRouter as a drop-in replacement.
// This is done to learn OpenAI API with the help of OpenRouter.
// Additionally, changing the model is as simple as changing the model field.
export const aiClient = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function callAIModel(
  selectAnswer: SelectAnswer,
  userPrompt: string,
) {
  const response = await aiClient.responses.create({
    model: "openrouter/free",
    input: [
      {
        role: "developer",
        content: systemPrompts[selectAnswer],
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
  });

  return response;
}
