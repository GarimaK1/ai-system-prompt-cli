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
      "magentaBright",
      "\nAI System Prompt CLI\nExperiment with task-specific system prompts in a simple terminal workflow.",
    ),
  );

  console.log(`
    ==================================================
                     Usage Instructions
    ==================================================
    1. Use the arrow keys to select an option.
    2. Press Enter to confirm your selection.
    3. Press Ctrl+C or Cmd+C to exit at any time.
    --------------------------------------------------
  `);

  while (true) {
    const selectAnswer = await getOptionSelection();

    if (selectAnswer === EXIT) {
      break; // Exit the loop if the user selects "Exit CLI"
    }

    const userPrompt = await getInputPrompt();

    // Loading message to indicate that API call is in progress
    const mySpinner = spinner("Fetching response from AI model...");
    const response = await callAIModel(selectAnswer, userPrompt);
    mySpinner.stop("✓ Done!");

    console.log(styleText(["underline", "bold", "magenta"], "\nResponse:\n"));
    console.log(styleText("magenta", "Output text:"));
    console.log(response.output_text, "\n");
    console.log(styleText("magenta", "Model:"));
    console.log(response.model, "\n");
    console.log(styleText("magenta", "Status:"));
    console.log(response.status, "\n");
    console.log(styleText("magenta", "Usage:"));
    console.log(response.usage, "\n");

    const confirmAnswer = await getConfirmation();

    if (!confirmAnswer) {
      break; // Exit the loop if the user does not want to continue
    }
  }

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
