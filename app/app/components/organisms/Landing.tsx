"use client";

import { useScroll } from "@/hooks";
import type { Image } from "@types";
import { Prata } from "next/font/google";
import { useRef } from "react";

const prata = Prata({ weight: "400" });

const Landing = ({
  title,
  color,
  splash,
}: {
  title?: string;
  color?: string;
  splash?: Image;
}) => {
  const titleRef = useRef<HTMLDivElement>(null);
  const bodyPos = useScroll("body");
  const bodyBreakpoint =
    bodyPos.fromTop >=
    bodyPos.height / 2 - (titleRef.current?.offsetHeight || 0) / 2;

  return (
    <div
      className={`${prata.className} h-dvh w-full flex justify-center items-center text-header-sm md:text-header-md lg:text-header-lg text-[#9F0A44]`}
      style={{ backgroundColor: color }}
    >
      <h1
        ref={titleRef}
        className={`${bodyBreakpoint ? "opacity-0" : ""} select-none`}
      >
        {title}
      </h1>
    </div>
  );
};

export default Landing;
