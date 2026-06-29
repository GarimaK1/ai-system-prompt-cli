import { input, select, confirm, Separator } from "@inquirer/prompts";
import { styleText } from "node:util";
import validateInput from "./validatorFunction.ts";
import {
  SUMMARIZE,
  EXPLAIN,
  GENERATE_TESTS,
  CHANGE_TONE,
  EXIT,
} from "./myConstants.ts";
import { callAIModel } from "./callAIModel.ts";

// const successMessage = styleText("green", "Success!");
// console.log(successMessage);

// console.log(styleText(["underline", "italic"], "My italic underlined message"));

// Function to display the system prompt options
async function optionSelection() {
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

// Getting input for user prompt
async function inputPrompt() {
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

// Confirmation question
async function getConfirmation() {
  const answer = await confirm({
    message: "Do you want to continue?",
  });
  return answer;
}

try {
  console.log(
    styleText(
      "green",
      "\nCrafting Good System Prompts for AI Assistants:\nThis is a simple CLI tool that uses different system prompts to process user input.",
    ),
  );

  console.log(`
    =================================================
                    USAGE INSTRUCTIONS
    =================================================
    1. Use up/down arrow keys to select an option.
    2. Use Enter key to confirm your selection.
    3. Use 'Ctrl + C' or 'Cmd + C' to exit anytime.
    -------------------------------------------------
  `);

  while (true) {
    const selectAnswer = await optionSelection();

    if (selectAnswer === EXIT) {
      break; // Exit the loop if the user selects "Exit CLI"
    }

    const userPrompt = await inputPrompt();
    console.log(`Your answer: ${userPrompt}`);

    // Make an API call to OpenAI with the selected option and user prompt
    const response = await callAIModel(selectAnswer, userPrompt);
    console.log("Output Text:\n", response.output_text, "\n");
    console.log("Model Used:\n", response.model, "\n");
    console.log("Status:\n", response.status, "\n");
    console.log("Usage:\n", response.usage, "\n");

    const confirmAnswer = await getConfirmation();
    console.log(`Confirmation answer: ${confirmAnswer}`);

    if (!confirmAnswer) {
      break; // Exit the loop if the user does not want to continue
    }
  }

  // Here, the user is exiting the CLI.
  console.log("\nExiting the CLI. 👋 until next time!\n");
} catch (error) {
  if (error instanceof Error && error.name === "ExitPromptError") {
    console.log("\nExiting the CLI. 👋 until next time!\n");
  } else {
    // Handle other unexpected errors
    console.error("An unexpected error occurred:", error);
  }
} finally {
  // close network connections
  // clean up temporary files
  process.exit(0);
}
