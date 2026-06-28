import { input, select, confirm, Separator } from "@inquirer/prompts";
import { styleText } from "node:util";
import "dotenv/config";
import OpenAI from "openai";

// const successMessage = styleText("green", "Success!");
// console.log(successMessage);

// console.log(styleText(["underline", "italic"], "My italic underlined message"));

// Using OpenAI SDK pointed at OpenRouter as a drop-in replacement.
// This is done to learn OpenAI API with the help of OpenRouter.
// Additionally, changing the model is as simple as changing the model field.
// const aiClient = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENROUTER_API_KEY,
// });

// const response = await aiClient.responses.create({
//   model: "openrouter/free",
//   input: [
//     {
//       role: "developer",
//       content:
//         "You are a helpful assistant that doesn't give verbose answers. If the response doesn't require long explanations, keep it short.",
//     },
//     {
//       role: "user",
//       content: "Are semicolons optional in JavaScript?",
//     },
//   ],
// });

// console.log("Output Text:\n", response.output_text, "\n");
// console.log("Model Used:\n", response.model, "\n");
// console.log("Status:\n", response.status, "\n");
// console.log("Usage:\n", response.usage, "\n");

async function optionSelection() {
  const answer = await select({
    message: "Select a menu option",
    choices: [
      {
        name: "1. Summarize text",
        value: "summarize",
        short: "Summarize text",
        description: "Generates a concise summary of the provided text.",
      },
      {
        name: "2. Explain code",
        value: "explain",
        short: "Explain code",
        description: "Provides a detailed explanation of the provided code.",
      },
      // new Separator(),
      {
        name: "3. Generate test cases for a function",
        value: "generate-tests",
        short: "Generate test-cases",
        description: "Creates test-cases for the provided function.",
      },
      {
        name: "4. Rewrite the provided text in a different tone",
        value: "change-tone",
        short: "Change tone",
        description: "Change the tone and rewrite the provided text.",
      },
      {
        name: "5. Exit CLI",
        value: "exit",
        short: "Exit CLI",
        description: "Exit the CLI.",
      },
    ],
  });

  return answer;
}

async function inputPrompt() {
  const inputAnswer = await input({
    message: `Enter user prompt.`,
    required: true,
    validate: (value) => value.trim() !== "" || "Name cannot be empty",
  });
  return inputAnswer;
}

try {
  console.log(
    styleText(
      "green",
      "\nCrafting Good System Prompts for AI Assistants:\nThis is a simple CLI tool that uses different system prompts to process inputs.",
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

    if (selectAnswer === "exit") {
      break; // Exit the loop if the user selects "Exit CLI"
    }

    const userPrompt = await inputPrompt();
    console.log(`Your answer: ${userPrompt}`);

    // Confirmation question.
    const confirmAnswer = await confirm({
      message: "Do you want to continue?",
    });
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
