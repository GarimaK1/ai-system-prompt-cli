import test from "node:test";
import assert from "node:assert/strict";
import { buildPromptMessages } from "../callAIModel.ts";
import { SUMMARIZE } from "../myConstants.ts";

test("buildPromptMessages wraps developer and user content correctly", () => {
  const messages = buildPromptMessages(SUMMARIZE, "hello world");
  const [developerMessage, userMessage] = messages;

  assert.equal(messages.length, 2);

  assert.ok(developerMessage);
  assert.ok(userMessage);

  assert.equal(developerMessage.role, "developer");
  assert.equal(userMessage.role, "user");
  assert.equal(typeof developerMessage.content, "string");
  assert.equal(typeof userMessage.content, "string");
  assert.match(developerMessage.content, /untrusted data/i);
  assert.match(developerMessage.content, /Given any text/i);
  assert.match(userMessage.content, /<USER_DATA>/i);
  assert.match(userMessage.content, /hello world/);
});
