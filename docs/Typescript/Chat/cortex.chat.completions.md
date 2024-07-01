# **Cortex ChatCompletions**

## High-Level Overview

The `cortex.chat.completions` class is part of the Cortex Node.js SDK, which provides a convenient way to interact with the Cortex AI Chat API. This class is responsible for generating model responses for chat conversations. The Cortex object is initialized as follows:

```javascript
import Cortex from "@janhq/cortexso-node";
const cortex = new Cortex({
  baseURL: "http://localhost:1337/v1",
  apiKey: "",
});
```

## Why Should I Use This Class?

The `cortex.chat.completions` class simplifies the process of generating chat responses using the Cortex AI model. It abstracts away the complexities of making API requests and handling responses, allowing you to focus on building your chat application's core functionality.

## Methods Overview and Code Examples

The `cortex.chat.completions` class provides a single method: `create()`. This method is used to generate a model response for a given chat conversation. The method has multiple overloads to accommodate different input parameters and return types.

### `create(body: ChatCompletionCreateParamsNonStreaming, options?: Core.RequestOptions): APIPromise<ChatCompletion>`

This overload is used when you want to generate a chat completion without streaming the response. It returns a `ChatCompletion` object representing the model's response.

```javascript
const body = {
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'user', content: 'Hello, how are you?' },
  ],
};

cortex.chat.completions.create(body)
  .then((response) => {
    console.log(response.choices[0].message.content);
  })
  .catch((error) => {
    console.error(error);
  });
```

### `create(body: ChatCompletionCreateParamsStreaming, options?: Core.RequestOptions): APIPromise<Stream<ChatCompletionChunk>>`

This overload is used when you want to stream the chat completion response. It returns a `Stream` of `ChatCompletionChunk` objects, which represent the model's response as it is being generated.

```javascript
const body = {
  model: 'gpt-3.5-turbo',
  messages: [
    { role: 'user', content: 'Hello, how are you?' },
  ],
  stream: true,
};

const stream = await cortex.chat.completions.create(body);
stream.on('data', (chunk) => {
  console.log(chunk.choices[0].delta?.content);
});
stream.on('error', (error) => {
  console.error(error);
});
stream.on('end', () => {
  console.log('Stream ended');
});
```

## Parameters and Arguments

The `create()` method accepts the following parameters:

- `body` (required): An object containing the parameters for the chat completion request. The structure of this object depends on whether you are using streaming or non-streaming mode.
  - For non-streaming mode (`ChatCompletionCreateParamsNonStreaming`), the `body` object should contain the following properties:
    - `model` (required): The name of the Cortex AI model to use for generating the chat completion.
    - `messages` (required): An array of message objects representing the chat conversation history.
    - `...`: Additional properties as specified in the Cortex API documentation.
  - For streaming mode (`ChatCompletionCreateParamsStreaming`), the `body` object should contain the following properties:
    - `model` (required): The name of the Cortex AI model to use for generating the chat completion.
    - `messages` (required): An array of message objects representing the chat conversation history.
    - `stream` (required): Set to `true` to enable streaming mode.
    - `...`: Additional properties as specified in the Cortex API documentation.
- `options` (optional): An object containing additional options for the API request, such as headers, timeouts, etc.

## Prerequisites

Before using the `cortex.chat.completions` class, you need to have the following prerequisites:

1. A valid Cortex API key.
2. The Cortex Node.js SDK installed in your project.

## How to Use This Class

To use the `cortex.chat.completions` class, follow these steps:

1. Import the Cortex SDK and initialize a new instance of the `Cortex` class with your API key and other configuration options.
2. Define the chat conversation history as an array of message objects, where each object has a `role` (e.g., `'user'` or `'assistant'`) and `content` properties.
3. Call the `create()` method on the `cortex.chat.completions` instance, passing the chat conversation history and other relevant parameters as the `body` argument.
4. Handle the response based on whether you are using streaming or non-streaming mode.
   - For non-streaming mode, the response will be a `ChatCompletion` object, which you can access and process as needed.
   - For streaming mode, the response will be a `Stream` of `ChatCompletionChunk` objects, which you can listen to and process as the model generates the response.

By following these steps, you can leverage the power of the Cortex AI Chat API to build sophisticated chat applications, while taking advantage of the convenience and simplicity provided by the Cortex Node.js SDK.
  
  