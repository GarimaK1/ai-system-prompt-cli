To createa node.js project:

```
npm init
```

To initiate TypeScript in project:

```
tsc init
```

Install dependenciea and dev-dependencies:

```
npm install
```

To run application and start interacting with the CLI:

```
npm run start
```

#### Using OpenRouter API Gateway with OpenAI SDK

- The application is built against the OpenAI SDK for learning OpenAI API.
- By configuring the SDK's baseURL to point to OpenRouter, the application can interact with any model supported by OpenRouter through a standardized API.
- This reduces vendor lock-in and makes changing models or providers a configuration change instead of a code change.
