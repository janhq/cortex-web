---
title: Cortex Models Update
description: Cortex models subcommands.
---

:::warning
🚧 Cortex is under construction.
:::

# `cortex models update`

This command updates a model configuration defined by a `model_id`.

:::info
This command is compatible with all OpenAI and OpenAI-compatible endpoints.
:::

## Usage

```bash
cortex models update [options] <model_id>
```

## Options

| Option                      | Description                                                                                           | Required | Default value        | Example                                                   |
|-----------------------------|-------------------------------------------------------------------------------------------------------|----------|----------------------|-----------------------------------------------------------|
| `model_id`                  | The identifier of the model you want to update.                                                       | Yes      | -                    | `tinyllama`                                          |
| `-c`, `--options <options...>` | Specify the options to update the model. Syntax: `-c option1=value1 option2=value2`.  | Yes      | -                    | `-c max_tokens=100 temperature=0.5`                        |
| `-h`, `--help`              | Display help information for the command.                                                             | No       | -                    | `-h`                                                  |



