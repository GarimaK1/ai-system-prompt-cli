import OpenAI from "openai";
import "dotenv/config";
import { SECURITY_PROMPT, TASK_PROMPTS } from "./systemPrompts.ts";
import type { SelectAnswer } from "./myConstants.ts";

// Using OpenAI SDK pointed at OpenRouter as a drop-in replacement.
// This is done to learn OpenAI API with the help of OpenRouter.
// Additionally, changing the model is as simple as changing the model field.
export const aiClient = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export function buildPromptMessages(
  selectAnswer: SelectAnswer,
  userPrompt: string,
) {
  return [
    {
      role: "developer" as const,
      content: `
        ${SECURITY_PROMPT}
        
        ${TASK_PROMPTS[selectAnswer]}`,
    },
    {
      role: "user" as const,
      content: `
        <USER_DATA>
        ----------
        ${userPrompt}
        ----------
        </USER_DATA>`,
    },
  ];
}

export async function callAIModel(
  selectAnswer: SelectAnswer,
  userPrompt: string,
) {
  const messages = buildPromptMessages(selectAnswer, userPrompt);

  // console.log(
  //   "Final System/Developer Prompt:",
  //   `
  //   ${SECURITY_PROMPT}

  //   ${TASK_PROMPTS[selectAnswer]}
  //   `,
  // );

  // console.log(
  //   "Final User Prompt: ",
  //   `<USER_DATA>

  //   ${userPrompt}

  //   </USER_DATA>`,
  // );

  const response = await aiClient.responses.create({
    model: "openrouter/free",
    input: messages,
  });

  return response;
}
