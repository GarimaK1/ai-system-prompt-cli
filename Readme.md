## AI System Prompt CLI

A small TypeScript CLI for experimenting with system prompts, prompt-injection boundaries, and task-specific prompt templates.

## Setup

To create a Node.js project:

```
npm init
```

To initialize TypeScript in the project:

```
tsc init
```

Install dependencies and dev dependencies:

```
npm install
```

To run the application and start interacting with the CLI:

```
npm run start
```

To run the test suite:

```
npm test
```

## What It Does

- Prompts the user to choose one of the built-in system prompt flows.
- Wraps user input in a `USER_DATA` boundary before sending it to the model.
- Uses a shared security prompt to reduce prompt injection risk.
- Sends requests through the OpenAI SDK configured for OpenRouter.

### Protection Against Prompt Injection Attacks

Refer OWASP Cheatsheet:
https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html

### Using OpenRouter API Gateway with OpenAI SDK

- The application is built against the OpenAI SDK for learning OpenAI API.
- By configuring the SDK's baseURL to point to OpenRouter, the application can interact with any model supported by OpenRouter through a standardized API.
- This reduces vendor lock-in and makes changing models or providers a configuration change instead of a code change.

### Disadvantage/Drawback of using "openrouter/free"

- Some models are weaker than others
- Some are more easily jailbroken
- Some follow role hierarchy less reliably

The system is only as strong as the least reliable model it may route to.

### TODO:

- Add output validation to AI response? E.g. for the test cases prompt.

- Multi-line input handling (the "paste code/text" problem)

- Refactor index.ts file.
