export default function createSpinner(message: string) {
  const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
  let i = 0;

  const interval = setInterval(() => {
    process.stdout.write(`\r${frames[i++ % frames.length]}  ${message}`);
  }, 100);

  return {
    stop: (finalMessage?: string) => {
      clearInterval(interval);
      process.stdout.write(`\n${finalMessage ?? ""}\n`);
    },
  };
}
