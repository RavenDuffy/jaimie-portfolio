"use client";

import { Prata } from "next/font/google";
import { useRef, useState } from "react";
import type { LinkType } from "@types";
import Link from "@atoms/Link";
import MenuIcon from "@atoms/MenuIcon";
import { useResize, useScroll } from "@hooks";
import { sizes } from "@hooks/useResize";

const prata = Prata({ weight: "400" });

const Header = ({
  title,
  links,
  landingNavTitle = false,
}: {
  title: string;
  links: LinkType[];
  landingNavTitle?: boolean;
}) => {
  const [active, toggleActive] = useState<boolean>(false);

  const { nearest } = useResize();

  const mainLinkRef = useRef<HTMLDivElement>(null);
  const bodyPos = useScroll("body");
  const bodyBreakpoint =
    bodyPos.fromTop >=
    bodyPos.height / 2 - (mainLinkRef.current?.offsetHeight || 0) / 2;

  return (
    <>
      <nav
        className={`${prata.className} top-0 sticky -mb-[5rem] md:-mb-[7rem] lg:-mb=[9rem] w-fit mx-auto`}
      >
        <div
          ref={mainLinkRef}
          className={`h-[5rem] md:h-[7rem] lg:h-[8rem] max-h-28 text-header-sm md:text-header-md lg:text-header-lg text-[#9F0A44] text-center ${landingNavTitle && !bodyBreakpoint ? "opacity-0 pointer-events-none" : ""}`}
        >
          <Link
            href="/"
            className={`transition-opacity h-max ${nearest <= sizes["3xl"] && active ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            style={{ transitionDelay: `${links.length / 2 / 10}s` }}
          >
            {title}
          </Link>
        </div>
      </nav>
      <div
        className={`${prata.className} fixed top-0 right-0 text-white mix-blend-exclusion h-[5rem] md:h-[7rem] lg:h-[8rem] w-fit`}
      >
        <div className="flex flex-row-reverse justify-around gap-x-8 items-center h-full w-fit ml-auto -mt-0.5">
          <button className="mr-8 lg:mr-12 w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6 cursor-pointer">
            <MenuIcon onClick={() => toggleActive(!active)} />
          </button>
          {links.reverse().map((l, index) => (
            <Link
              {...l}
              key={l.internal?.slug ?? l.external}
              suppressHydrationWarning
              className={`text-2xl lg:text-3xl xl:text-4xl duration-[0.2s] transition-opacity ${active ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              style={{
                transitionDelay: active
                  ? `${(index + 1) / 10}s`
                  : `${(links.length - index - 1) / 10}s`,
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
