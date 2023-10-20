"use client";
import clsx from "clsx";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface ShadowProps {
  children: React.ReactNode;
  className?: string;
}
export function Shadow({ children, className }: ShadowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  return (
    <div className={clsx("relative inline-block", className)} ref={ref}>
      <div
        className={clsx(
          "h-full w-full top-0 left-0 border-2 rounded bg-secondary-900 absolute transition transform ease-bounce duration-300",
          {
            "-translate-x-shadow-offset translate-y-shadow-offset": isInView,
          }
        )}
      />
      <div className="border-2 border-dark-900 rounded py-6px px-12px bg-light-900 relative">
        {children}
      </div>
    </div>
  );
}
