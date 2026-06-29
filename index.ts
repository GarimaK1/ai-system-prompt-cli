import { styleText } from "node:util";
import { callAIModel } from "./callAIModel.ts";
import { EXIT } from "./myConstants.ts";
import {
  getConfirmation,
  getInputPrompt,
  getOptionSelection,
} from "./inquirerQuestions.ts";
import spinner from "./spinner.ts";

try {
  console.log(
    styleText(
      "green",
      "\nCrafting Good System Prompts for AI Assistants:\nThis is a simple CLI tool that uses different system prompts to process user input.",
    ),
  );

  console.log(`
    ==================================================
                    USAGE INSTRUCTIONS
    ==================================================
    1. Use up/down arrow keys to select an option.
    2. Use Enter key to confirm your selection.
    3. Use 'Ctrl + C' or 'Cmd + C' to exit anytime.
    --------------------------------------------------
  `);

  while (true) {
    const selectAnswer = await getOptionSelection();

    if (selectAnswer === EXIT) {
      break; // Exit the loop if the user selects "Exit CLI"
    }

    const userPrompt = await getInputPrompt();
    // console.log(`Your answer: ${userPrompt}`);

    // Loading message to indicate that API call is in progress
    const mySpinner = spinner("Fetching response from AI model...");
    const response = await callAIModel(selectAnswer, userPrompt);
    mySpinner.stop("✓ Done!");

    console.log("\nOutput Text:\n", response.output_text, "\n");
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
