import * as readline from "readline/promises";
import process from "node:process";
/**
 * Collects multi-line input from the user, terminated by a line
 * containing only "END". Useful for pasting code or long text blocks.
 */
export async function getMultiLineInput(message: string): Promise<string> {
  console.log(`${message}`);
  console.log(
    `(Paste your text or code. Type END on its own line when finished.)\n`,
  );

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const lines: string[] = [];

  for await (const line of rl) {
    if (line.trim().toUpperCase() === "END") {
      break;
    }
    lines.push(line);
  }

  rl.close();
  return lines.join("\n");
}
