import validateInput from "./validatorFunction.ts";
import { input, select, confirm, Separator } from "@inquirer/prompts";
import {
  SUMMARIZE,
  EXPLAIN,
  GENERATE_TESTS,
  CHANGE_TONE,
  EXIT,
} from "./myConstants.ts";

// Function to display the system prompt options
export async function optionSelection() {
  const answer = await select({
    message: "Select a menu option",
    choices: [
      {
        name: "1. Summarize text",
        value: SUMMARIZE,
        short: "Summarize text",
        description: "Generates a concise summary of the provided text.",
      },
      {
        name: "2. Explain code",
        value: EXPLAIN,
        short: "Explain code",
        description: "Provides a detailed explanation of the provided code.",
      },
      // new Separator(),
      {
        name: "3. Generate test cases for a function",
        value: GENERATE_TESTS,
        short: "Generate test-cases",
        description: "Creates test-cases for the provided function.",
      },
      {
        name: "4. Rewrite the provided text in a different tone",
        value: CHANGE_TONE,
        short: "Change tone",
        description: "Change the tone and rewrite the provided text.",
      },
      {
        name: "5. Exit CLI",
        value: EXIT,
        short: "Exit CLI",
        description: "Exit the CLI.",
      },
    ],
  });

  return answer;
}

// Function to get input for user prompt
export async function inputPrompt() {
  const inputAnswer = await input({
    message: `Enter user prompt.`,
    required: true,
    validate: (value) =>
      validateInput(value) ||
      "Input contains potentially unsafe content. Update input and try again.",
    // theme: {
    //   validationFailureMode: "clear",
    // },
  });
  return inputAnswer;
}

// Function to get confirmation from the user
export async function getConfirmation() {
  const answer = await confirm({
    message: "Do you want to continue?",
  });
  return answer;
}
