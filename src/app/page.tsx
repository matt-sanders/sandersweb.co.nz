"use client";
import { Container } from "@/components/Container/Container";
import clsx from "clsx";
import { useEffect, useState } from "react";

export default function Home() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <main>
      <Container>
        <h1 className="text-900 mt-48px md:mt-72px mb-72px md:mb-124px">
          <span className="block">
            <RevealText text="Freelance" reveal={ready} idx={1} />{" "}
          </span>
          <span className="block">
            <RevealText text="full" reveal={ready} idx={2} />{" "}
            <RevealText text="stack" reveal={ready} idx={3} />{" "}
          </span>
          <span className="block">
            <RevealText text="developer." reveal={ready} idx={4} />
          </span>
        </h1>
        <p className="text-700 max-w-2xl">
          Hi, I&apos;m Matt. I make cool stuff and have been doing so for the
          last 12 years. From APIs and integrations to spiffy front end
          animations, I do it all. Check out some of the things I&apos;ve worked
          on below.
        </p>
      </Container>
    </main>
  );
}

interface RevealTextProps {
  text: string;
  reveal: boolean;
  idx: number;
}
function RevealText({ text, reveal, idx }: RevealTextProps) {
  const offset = 100;
  const delayBase = 300;
  const delayMs = delayBase + offset * idx;
  return (
    <span className="overflow-hidden inline-block">
      <span
        className={clsx("transform transition inline-block", {
          "translate-y-full": !reveal,
        })}
        style={{
          transitionDelay: `${delayMs}ms`,
        }}
      >
        <span
          aria-hidden
          className={clsx(
            "text-secondary-900 absolute top-0 left-0 transition transform ease-bounce delay-1000",
            {
              "translate-y-shadow-offset -translate-x-shadow-offset": reveal,
            }
          )}
        >
          {text}
        </span>
        <span className="relative">{text}</span>
      </span>
    </span>
  );
}
