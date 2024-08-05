import { useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { FaWindows, FaApple, FaLinux } from "react-icons/fa";
import { useClipboard } from "@site/src/hooks/useClipboard";
import { CopyIcon, CheckIcon } from "lucide-react";

const EngineCompatibility = () => {
  const [Compatibility, setCompatibility] = useState({
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
          logo: FaWindows,
        },
        {
          name: "Mac",
          value: "mac",
          logo: FaApple,
        },
        {
          name: "Linux",
          value: "linux",
          logo: FaLinux,
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
          disabled: Compatibility.os === "mac",
        },
        {
          name: "AMD GPU",
          value: "amd",
          disabled:
            Compatibility.os === "mac" ||
            (Compatibility.os === "win" && Compatibility.cpu === "arm64") ||
            (Compatibility.os === "linux" && Compatibility.cpu === "arm64"),
        },
        {
          name: "Intel GPU",
          value: "intel",
          disabled: Compatibility.os === "mac",
        },
        {
          name: "Apple Metal",
          value: "apple",
          disabled: Compatibility.os !== "mac" || Compatibility.cpu === "x86",
        },
        {
          name: "Snapdragon NPU",
          value: "snapdragon",
          disabled:
            Compatibility.os === "mac" ||
            Compatibility.os === "linux" ||
            Compatibility.cpu === "x86",
        },
      ],
    },
    {
      name: "Engine",
      child: [
        {
          name: "ONNX Runtime",
          value: "onnx",
          disabled: Compatibility.os === "mac",
        },
        {
          name: "Llama.cpp",
          value: "llama",
          disabled: Compatibility.accelerator === "snapdragon",
        },
        {
          name: "TensorRT-LLM",
          value: "tensorRT-LLM",
          disabled:
            Compatibility.os === "mac" ||
            Compatibility.accelerator === "amd" ||
            Compatibility.accelerator === "intel" ||
            Compatibility.accelerator === "snapdragon",
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
            Compatibility.engine === "llama" ||
            Compatibility.engine === "tensorRT-LLM",
        },
        {
          name: "GGUF",
          value: "gguf",
          disabled:
            Compatibility.engine === "onnx" ||
            Compatibility.engine === "tensorRT-LLM",
        },
        {
          name: "TensorRT-LLM",
          value: "tensorRT-LLM-model",
          disabled:
            Compatibility.engine === "onnx" || Compatibility.engine === "llama",
        },
      ],
    },
  ];

  const isPreviousLevelSelected = (index: number) => {
    if (index === 0) return true; // The first level (OS) is always enabled
    if (index === 3) return !!Compatibility.cpu; // Enable Engine if CPU is selected
    const previousLevelName = levels[index - 1].name.toLowerCase();
    return !!Compatibility[previousLevelName]; // Enable other levels based on previous selection
  };

  const renderCortexResult = () => {
    if (Compatibility.os === "") return "-";
    if (Compatibility.engine === "onnx") return "cortex run  llama3:onnx";
    if (Compatibility.engine === "tensorRT-LLM")
      return "cortex run  llama3:tensorrt-llm";
    if (Compatibility.engine === "llama") return "cortex run llama3:gguf";

    return "cortex run llama3:onnx / llama3:tensorrt-llm / llama3:gguf";
  };

  useEffect(() => {
    if (Compatibility.os === "mac" && Compatibility.cpu === "arm64") {
      setCompatibility((prev) => ({
        ...prev,
        accelerator: "apple",
        engine: "llama",
        model_format: "gguf",
      }));
    }
    if (Compatibility.os === "mac" && Compatibility.cpu === "x86") {
      setCompatibility((prev) => ({
        ...prev,
        engine: "llama",
        model_format: "gguf",
      }));
    }
    if (Compatibility.engine === "onnx") {
      setCompatibility((prev) => ({
        ...prev,
        model_format: "onnx-model",
      }));
    }
    if (Compatibility.engine === "llama") {
      setCompatibility((prev) => ({
        ...prev,
        model_format: "gguf",
      }));
    }
    if (Compatibility.engine === "llama") {
      setCompatibility((prev) => ({
        ...prev,
        model_format: "gguf",
      }));
    }
    if (Compatibility.engine === "tensorRT-LLM") {
      setCompatibility((prev) => ({
        ...prev,
        model_format: "tensorRT-LLM-model",
      }));
    }
  }, [Compatibility.os, Compatibility.cpu, Compatibility.engine]);

  const handleClick = useCallback(
    (level: string, value: string, disabled: boolean) => {
      if (!disabled) {
        setCompatibility((prev) => {
          const updatedCompatibility = {
            ...prev,
            [level]:
              prev[level] === value && level === "accelerator" ? "" : value,
          };

          const levelIndex = levels.findIndex(
            (l) => l.name.toLowerCase().replace(" ", "_") === level
          );

          // Reset subsequent levels
          for (let i = levelIndex + 1; i < levels.length; i++) {
            updatedCompatibility[
              levels[i].name.toLowerCase().replace(" ", "_")
            ] = "";
          }

          return updatedCompatibility;
        });
      }
    },
    [Compatibility]
  );

  const clipboard = useClipboard({ timeout: 1000 });

  return (
    <div>
      {levels.map((level, i) => (
        <div key={i} className="flex justify-between items-center gap-4">
          <h5 className="mb-0">{level.name}</h5>
          <div className="flex w-3/4 gap-4">
            {level.child.map((c) => {
              return (
                <div
                  key={c.value}
                  className={twMerge(
                    `border border-neutral-200 dark:border-neutral-700 dark:text-white border-solid text-black p-4 my-2 rounded-lg cursor-pointer flex items-center`,
                    Compatibility[
                      level.name.toLowerCase().replace(" ", "_")
                    ] === c.value
                      ? "bg-neutral-900 dark:bg-neutral-100 dark:text-black text-white"
                      : isPreviousLevelSelected(i)
                      ? ""
                      : "opacity-50 dark:opacity-20 bg-neutral-100 dark:bg-neutral-900 cursor-not-allowed",
                    c?.disabled &&
                      "bg-neutral-100 dark:bg-neutral-900 cursor-not-allowed"
                  )}
                  onClick={() =>
                    isPreviousLevelSelected(i) &&
                    handleClick(
                      level.name.toLowerCase().replace(" ", "_"),
                      c.value,
                      c.disabled
                    )
                  }
                >
                  {c.logo && <c.logo className="h-4 mr-2" />}
                  {c.name}
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="flex justify-between items-center gap-4">
        <h5 className="mb-0">Cortex API</h5>
        <div className="flex w-3/4 gap-4">
          <div
            className={twMerge(
              `border border-neutral-200 dark:border-neutral-700 border-solid text-black p-4 my-2 rounded-lg cursor-pointer w-full relative`
            )}
          >
            <code className="bg-transparent border-none text-black dark:text-white">
              {renderCortexResult()}
            </code>
            <div
              className="absolute top-1/2 -translate-y-1/2 right-3 flex h-10 w-10 items-center justify-center border border-neutral-200 dark:border-neutral-700 rounded-lg cursor-pointer"
              onClick={() => {
                clipboard.copy(renderCortexResult());
              }}
            >
              {clipboard.copied ? (
                <>
                  <CheckIcon size={14} className="text-green-600" />
                </>
              ) : (
                <>
                  <CopyIcon size={18} className="text-black dark:text-white" />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngineCompatibility;
