export default function validateInput(input: string): boolean {
  const value = input.trim();

  // Empty input
  if (value.length === 0) {
    return false;
  }

  // Prevent excessively large prompts
  if (value.length > 5000) {
    return false;
  }

  // Control characters
  if (/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.test(value)) {
    return false;
  }

  // Prompt injection attempts
  const promptInjectionPatterns = [
    /ignore\s+(all|previous|prior)\s+instructions?/i,
    /disregard\s+previous\s+instructions?/i,
    /forget\s+(everything|all\s+instructions)/i,
    /you\s+are\s+now/i,
    /act\s+as/i,
    /pretend\s+to\s+be/i,
    /system\s*:/i,
    /assistant\s*:/i,
    /developer\s*:/i,
    /root\s*:/i,
    /<system>/i,
    /<\/system>/i,
    /begin\s+system\s+prompt/i,
    /reveal\s+(your\s+)?system\s+prompt/i,
    /repeat\s+the\s+above/i,
    /print\s+the\s+hidden\s+instructions/i,
  ];

  if (promptInjectionPatterns.some((pattern) => pattern.test(value))) {
    return false;
  }

  // Command injection
  const commandPatterns = [
    /\brm\s+-rf\b/i,
    /\bcurl\b/i,
    /\bwget\b/i,
    /\bpowershell\b/i,
    /\bcmd\.exe\b/i,
    /\bbash\b/i,
    /\bchmod\b/i,
    /\bmkfs\b/i,
    /\bshutdown\b/i,
    /\bdel\s+/i,
    /&&/,
    /\|\|/,
    /;\s*\w+/,
  ];

  if (commandPatterns.some((pattern) => pattern.test(value))) {
    return false;
  }

  // XSS
  if (
    /<script/i.test(value) ||
    /javascript:/i.test(value) ||
    /onerror=/i.test(value) ||
    /onload=/i.test(value)
  ) {
    return false;
  }

  // HTML/XML tags
  if (/<[^>]+>/.test(value)) {
    return false;
  }

  // Markdown code fences
  if (/```/.test(value)) {
    return false;
  }

  // Excessive repeated characters
  if (/(.)\1{30,}/.test(value)) {
    return false;
  }

  return true;
}
