# **Cortex Node.js SDK: Managing Models**

## High Level

The `cortex.models` class is part of the Cortex Node.js SDK, which provides a convenient interface for interacting with the Cortex API. This class deals with managing machine learning models within the Cortex platform. The `cortex` object is initialized as follows:

```javascript
import Cortex from "@janhq/cortexso-node";
const cortex = new Cortex({
  baseURL: "http://localhost:1337/v1",
  apiKey: "",
});
```

## Why should I use this class?

The `cortex.models` class simplifies the process of managing machine learning models within the Cortex platform. It provides a clean and intuitive interface for retrieving model information, listing available models, deleting fine-tuned models, starting and stopping model instances, downloading models, and updating model configurations.

## Methods Overview and Code Examples

### Retrieve a Model

```javascript
cortex.models.retrieve(modelId, options?)
```

Retrieves basic information about a specific model, such as the owner and permissions.

**Example:**

```javascript
const modelInfo = await cortex.models.retrieve('tinyllama');
console.log(modelInfo);
```

### List Available Models

```javascript
cortex.models.list(options?)
```

Lists all currently available models and provides basic information about each one, such as the owner and availability.

**Example:**

```javascript
const modelsList = await cortex.models.list();
console.log(modelsList);
```

### Delete a Fine-tuned Model

```javascript
cortex.models.del(modelId, options?)
```

Deletes a fine-tuned model. You must have the Owner role in your organization to delete a model.

**Example:**

```javascript
const deleteResult = await cortex.models.del('tinyllama');
console.log(deleteResult);
```

### Start a Model Instance

```javascript
cortex.models.start(modelId, options?)
```

Starts a model instance and returns basic information about the model.

**Example:**

```javascript
const startedModel = await cortex.models.start("tinyllama");
console.log(startedModel);
```

### Stop a Model Instance

```javascript
cortex.models.stop(modelId, options?)
```

Stops a running model instance and returns basic information about the model.

**Example:**

```javascript
const stoppedModel = await cortex.models.stop('tinyllama');
console.log(stoppedModel);
```

### Download a Model

```javascript
cortex.models.download(modelId)
```

Initiates a download of the specified model.

**Example:**

```javascript
const downloadStream = cortex.models.download('tinyllama');
downloadStream.on('data', (chunk) => {
  // Handle downloaded data
});
```

### Abort a Model Download

```javascript
cortex.models.abortDownload(downloadId)
```

Aborts an ongoing model download operation.

**Example:**

```javascript
const abortResult = await cortex.models.abortDownload('download-id-456');
console.log(abortResult);
```

### Update a Model Configuration

```javascript
cortex.models.update(modelId, body, options?)
```

Updates the configuration of a specific model.

**Example:**

```javascript
const updateBody = { /* Model configuration updates */ };
const updatedModel = await cortex.models.update('tinyllama', updateBody);
console.log(updatedModel);
```

## Prerequisites

Before using the `cortex.models` class, you need to have the Cortex Node.js SDK installed and configured with your API key and base URL.

## How do I use this class?

To use the `cortex.models` class, follow these steps:

1. Import the Cortex SDK and create an instance of the `Cortex` class, providing your API key and base URL.
2. Access the `models` property of the `cortex` instance to interact with the available methods.
3. Call the desired method with the required parameters and options (if applicable).
4. Handle the response or await the Promise returned by the method.

Here's an example of retrieving a model's information:

```javascript
import Cortex from "@janhq/cortexso-node";

const cortex = new Cortex({
  baseURL: "http://localhost:1337/v1",
  apiKey: "",
});

async function getModelInfo() {
  try {
    const modelInfo = await cortex.models.retrieve('tinyllama');
    console.log(modelInfo);
  } catch (error) {
    console.error('Error retrieving model:', error);
  }
}

getModelInfo();
```

Make sure to replace `'tinyllama'` with the actual ID of the model you want to retrieve.
  
  