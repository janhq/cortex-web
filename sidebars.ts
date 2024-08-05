import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  sidebar: [
    {
      type: "html",
      value: "GET STARTED",
      className: "sidebar-divider",
    },
    "overview",
    "quickstart",
    {
      type: "category",
      label: "Installation",
      link: {
        type: "doc",
        id: "installation",
      },
      collapsed: true,
      items: [
        { type: "doc", id: "installation/windows", label: "Windows" },
        { type: "doc", id: "installation/mac", label: "Mac" },
        { type: "doc", id: "installation/linux", label: "Linux" },
        { type: "doc", id: "installation/docker", label: "Docker" },
        {
          type: "doc",
          id: "installation/gpu-acceleration",
          label: "GPU Acceleration",
        },
      ],
    },
    {
      type: "category",
      label: "Basic Usage",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [
        { type: "doc", id: "basic-usage/command-line", label: "CLI" },
        { type: "doc", id: "basic-usage/server", label: "API" },
        { type: "doc", id: "basic-usage/js-library", label: "cortex.js" },
        { type: "doc", id: "basic-usage/py-library", label: "cortex.py" },
      ],
    },
    { type: "doc", id: "telemetry", label: "Telemetry" },
    // MODELs
    {
      type: "html",
      value: "MODELS",
      className: "sidebar-divider",
    },
    { type: "doc", id: "model-overview", label: "Overview" },
    {
      type: "category",
      label: "Using Models",
      link: { type: "doc", id: "using-models" },
      collapsed: true,
      items: [
        { type: "doc", id: "model-yaml", label: "model.yaml" },
        { type: "doc", id: "model-presets", label: "Model Presets" },
        { type: "doc", id: "built-in-models", label: "Built-in Models" },
      ],
    },
    {
      type: "category",
      label: "Model Formats",
      link: { type: "doc", id: "formats/index" },
      collapsed: true,
      items: [
        { type: "doc", id: "formats/gguf", label: "GGUF" },
        { type: "doc", id: "formats/tensorrt-llm", label: "TensorRT-LLM" },
        { type: "doc", id: "formats/onnx", label: "ONNX" },
      ],
    },
    {
      type: "category",
      label: "Model Repositories",
      link: { type: "doc", id: "hub/index" },
      collapsed: true,
      items: [
        { type: "doc", id: "hub/cortex-hub", label: "Cortex Model Repos" },
        { type: "doc", id: "hub/hugging-face", label: "HuggingFace Repos" },
        {
          type: "doc",
          id: "hub/nvidia-ngc",
          label: "Nvidia Catalog (Coming Soon)",
        },
      ],
    },
    // BASIC USAGE
    // {
    //   type: "html",
    //   value: "BASIC USAGE",
    //   className: "sidebar-divider",
    // },
    // { type: "doc", id: "command-line", label: "CLI" },
    // { type: "doc", id: "ts-library", label: "Typescript Library" },
    // { type: "doc", id: "py-library", label: "Python Library" },
    // { type: "doc", id: "server", label: "Server Endpoint" },
    // CAPABILITIES
    {
      type: "html",
      value: "ENDPOINTS",
      className: "sidebar-divider",
    },
    { type: "doc", id: "chat-completions", label: "Chat Completions" },
    { type: "doc", id: "embeddings", label: "Embeddings" },
    { type: "doc", id: "benchmarking", label: "Benchmarking" },
    // ARCHITECTURE
    {
      type: "html",
      value: "ARCHITECTURE",
      className: "sidebar-divider",
    },
    { type: "doc", id: "architecture", label: "Cortex" },
    {
      type: "category",
      label: "Engines",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [
        { type: "doc", id: "cortex-llamacpp", label: "llama.cpp" },
        { type: "doc", id: "cortex-tensorrt-llm", label: "TensorRT-LLM" },
        { type: "doc", id: "cortex-onnx", label: "ONNX" },
      ],
    },
    {
      type: "category",
      label: "Infrastructure",
      link: {
        type: "generated-index",
      },
      collapsed: true,
      items: [
        { type: "doc", id: "telemetry-architecture", label: "Telemetry Infra" },
        {
          type: "doc",
          id: "benchmarking-architecture",
          label: "Benchmarking Infra",
        },
      ],
    },
  ],
  cli: [
    {
      type: "html",
      value: "Usage",
      className: "sidebar-divider",
    },
    { type: "doc", id: "cli/cortex", label: "cortex" },
    { type: "doc", id: "cli/chat", label: "cortex chat" },
    { type: "doc", id: "cli/embeddings", label: "cortex embeddings" },
    { type: "doc", id: "cli/presets", label: "cortex presets" },
    {
      type: "html",
      value: "Model Operations",
      className: "sidebar-divider",
    },
    { type: "doc", id: "cli/pull", label: "cortex pull" },
    { type: "doc", id: "cli/run", label: "cortex run" },
    { type: "doc", id: "cli/models/index", label: "cortex models" },
    { type: "doc", id: "cli/engines/index", label: "cortex engines" },
    {
      type: "html",
      value: "System",
      className: "sidebar-divider",
    },
    { type: "doc", id: "cli/stop", label: "cortex stop" },
    { type: "doc", id: "cli/ps", label: "cortex ps" },
    { type: "doc", id: "cli/telemetry", label: "cortex telemetry" },
    {
      type: "html",
      value: "Benchmarking",
      className: "sidebar-divider",
    },
    { type: "doc", id: "cli/benchmark", label: "cortex benchmark" },
  ],
};

export default sidebars;
