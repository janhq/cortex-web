import { useState } from "react";
import { twMerge } from "tailwind-merge";

const EngineCompability = () => {
  const [compability, setCompability] = useState({
    os: "",
    cpu: "",
    accelerator: "",
    engine: "",
    format: "",
  });

  const levels = [
    {
      name: "OS",
      child: [
        {
          name: "Windows",
          value: "win",
        },
        {
          name: "Mac",
          value: "mac",
        },
        {
          name: "Linux",
          value: "linux",
        },
      ],
    },
    {
      name: "CPU",
      child: [
        {
          name: "Intel, AMD (x86)",
          value: "x86",
        },
        {
          name: "Arm64",
          value: "arm64",
        },
      ],
    },
    {
      name: "Accelerator",
      child: [
        {
          name: "Nvdia GPU",
          value: "nvdia",
          disabled: compability.os === "mac",
        },
        {
          name: "AMD GPU",
          value: "amd",
          disabled: compability.os === "mac",
        },
        {
          name: "Intel GPU",
          value: "intel",
          disabled: compability.os === "mac",
        },
        {
          name: "Apple Metal",
          value: "apple",
          disabled: compability.os !== "mac",
        },
        {
          name: "Snapdragon NPU",
          value: "snapdragon",
          disabled: compability.os !== "win",
        },
      ],
    },
    {
      name: "Engine",
      child: [
        {
          name: "ONNX Runtime",
          value: "onnx",
          disabled: compability.os === "mac",
        },
        {
          name: "Llama.cpp",
          value: "llama",
          disabled: compability.accelerator === "snapdragon",
        },
        {
          name: "TensorRT-LLM",
          value: "tensorRT-LLM",
          disabled:
            compability.os === "mac" ||
            compability.accelerator === "amd" ||
            compability.accelerator === "intel" ||
            compability.accelerator === "snapdragon",
        },
        {
          name: "CoreML",
          value: "coreML",
          disabled: true,
        },
      ],
    },
    {
      name: "Model Format",
      child: [
        {
          name: "ONNX",
          value: "onnx-model",
          disabled:
            compability.engine === "llama" ||
            compability.engine === "tensorRT-LLM",
        },
        {
          name: "GGUF",
          value: "gguf",
          disabled:
            compability.engine === "onnx" ||
            compability.engine === "tensorRT-LLM",
        },
        {
          name: "TensorRT-LLM",
          value: "tensorRT-LLM",
          disabled:
            compability.engine === "onnx" || compability.engine === "llama",
        },
      ],
    },
  ];

  const handleClick = (level: string, value: string, disabled: boolean) => {
    if (disabled) return;
    setCompability((prev) => {
      const updatedCompability = {
        ...prev,
        [level]: prev[level] === value && level === "accelerator" ? "" : value,
      };

      const levelIndex = levels.findIndex(
        (l) => l.name.toLowerCase() === level
      );

      // Reset subsequent levels
      for (let i = levelIndex + 1; i < levels.length; i++) {
        updatedCompability[levels[i].name.toLowerCase()] = "";
      }

      return updatedCompability;
    });
  };

  const isPreviousLevelSelected = (index: number) => {
    if (index === 0) return true; // The first level (OS) is always enabled
    if (index === 3) return !!compability.cpu; // Enable Engine if CPU is selected
    const previousLevelName = levels[index - 1].name.toLowerCase();
    return !!compability[previousLevelName]; // Enable other levels based on previous selection
  };

  const renderCortexResult = () => {
    if (compability.os === "") return "-";
    if (compability.engine === "onnx") return "cortex run  llama3:onnx";
    if (compability.engine === "tensorRT-LLM")
      return "cortex run  llama3:tensorrt-llm";
    if (compability.engine === "llama") return "cortex run llama3 (gguf)";

    return "cortex run llama3:onnx / llama3:tensorrt-llm / llama3 (gguf)";
  };

  return (
    <div>
      {levels.map((level, i) => (
        <div key={i} className="flex justify-between items-center gap-4">
          <h5 className="mb-0">{level.name}</h5>
          <div className="flex w-3/4 gap-4">
            {level.child.map((c) => (
              <div
                key={c.value}
                className={twMerge(
                  `border border-neutral-200 border-solid text-black p-4 my-2 rounded-lg cursor-pointer`,
                  compability[level.name.toLowerCase()] === c.value
                    ? "bg-neutral-900 text-white"
                    : isPreviousLevelSelected(i)
                    ? ""
                    : "opacity-50 bg-neutral-100 cursor-not-allowed",
                  c?.disabled && "bg-neutral-100 cursor-not-allowed"
                )}
                onClick={() =>
                  isPreviousLevelSelected(i) &&
                  handleClick(level.name.toLowerCase(), c.value, c.disabled)
                }
              >
                {c.name}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center gap-4">
        <h5 className="mb-0">Cortex API</h5>
        <div className="flex w-3/4 gap-4">
          <div
            className={twMerge(
              `border border-neutral-200 border-solid text-black p-4 my-2 rounded-lg cursor-pointer w-full`
            )}
          >
            <code className="bg-transparent border-none">
              {renderCortexResult()}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineCompability;
