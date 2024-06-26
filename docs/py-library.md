---
title: Python Library
description: Cortex Python Library.
slug: "py-library"
---

:::warning
🚧 Cortex is under construction.
:::

Cortex also provides a Python client library that is a **direct substitute for OpenAI's** [Python library](https://github.com/openai/openai-python), enabling easy integration and streamlined workflows.

## Installation

Use the following pip command to install the Cortex library in your project:

```py
pip install @janhq/cortex-python
```

## Usage

Switching to the Cortex Client Library from the OpenAI Python Library involves simple updates.

1. Replace the OpenAI import with Cortex in your application:

```diff
- from openai import OpenAI
+ from @janhq/cortex-python import Cortex
```

2. Modify the initialization of the client to use Cortex:

```diff
- client = OpenAI(api_key='your-api-key')
+ client = Cortex(base_url="BASE_URL", api_key="API_KEY")  # This can be omitted if using the default

```

### Example Usage

```py
from @janhq/cortex-python import Cortex

client = OpenAI(base_url="http://localhost:1337", api_key="cortex")

model = "TheBloke/TinyLlama-1.1B-Chat-v1.0-GGUF"
client.models.start(model=model)

completion = client.chat.completions.create(
    model=model,
    messages=[
        {
            "role": "user",
            "content": "Say this is a test",
        },
    ],
)
print(completion.choices[0].message.content)
```
