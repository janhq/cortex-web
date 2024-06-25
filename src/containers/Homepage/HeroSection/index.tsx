import { Button } from "@site/src/components/Button";
import ThemedImage from "@theme/ThemedImage";

import { isMacOs, isWindows } from "react-device-detect";
import Link from "@docusaurus/Link";
import DropdownDownload from "@site/src/components/DropdownDownload";
import { usePluginData } from "@docusaurus/useGlobalData";

const installationScript = () => {
  if (isWindows) {
    return (
      <p className="mb-0">
        <span className="text-green-600">winget&nbsp;</span>
        <span className="text-white">install&nbsp;</span>
        <span className="text-cyan-600">cortexso</span>
      </p>
    );
  }
  return (
    <>
      <p className="mb-0">
        <span className="text-green-600">brew&nbsp;</span>
        <span className="text-white">tap&nbsp;</span>
        <span className="text-cyan-600">janhq/cortexso</span>
      </p>
      <p className="mb-0">
        <span className="text-green-600">brew&nbsp;</span>
        <span className="text-white">install&nbsp;</span>
        <span className="text-cyan-600">cortexso</span>
      </p>
    </>
  );
};

const HeroSection = () => {
  const latestRelease = usePluginData("latest-release");

  return (
    <div className="container">
      <div className="text-center">
        <h1 className="text-6xl font-grotesk">Run AI Easily</h1>
        <p className="text-xl text-black/60 dark:text-white/60">
          OpenAI Compatible. Multi-engine. For Production
        </p>
        <div className="mt-8 flex flex-col md:flex-row gap-8 justify-center items-center">
          <DropdownDownload lastRelease={latestRelease} />
          <Link href="/docs/quickstart" target="_blank">
            <Button theme="secondary">Quick Start</Button>
          </Link>
        </div>
      </div>

      <div className="relative w-full lg:w-1/2 mx-auto mt-1 py-14 pb-20">
        <ThemedImage
          alt="Illustration Element"
          className="absolute -left-60 -top-20 -z-[1]"
          sources={{
            light: "/img/homepage/terminal-element.svg",
            dark: "/img/homepage/terminal-element-dark.svg",
          }}
        />
        <ThemedImage
          alt="Illustration Element Stars"
          className="absolute -right-32 top-32"
          sources={{
            light: "/img/homepage/terminal-stars.svg",
            dark: "/img/homepage/terminal-stars-dark.svg",
          }}
        />
        <div
          className="rounded-lg border-neutral-800 border border-solid w-full bg-neutral-900 overflow-hidden flex flex-col"
          style={{
            boxShadow:
              "0px 0px 0px 0.5px rgba(255, 255, 255, 0.20), 0px 5px 12px 0px rgba(0, 0, 0, 0.50), 0px 16px 40px 0px rgba(0, 0, 0, 0.46)",
          }}
        >
          <div className="flex border-b border-neutral-700 bg-neutral-800 gap-2 py-3 w-full">
            <div className="rounded-full w-3 h-3 bg-red-500 ml-3" />
            <div className="rounded-full w-3 h-3 bg-yellow-500" />
            <div className="rounded-full w-3 h-3 bg-green-500" />
          </div>
          <div className="w-full">
            <div className="p-4 text-left">
              <code className="bg-transparent border-none inline-block">
                {installationScript()}
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HeroSection;
