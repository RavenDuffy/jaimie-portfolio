"use client";

import { Prata } from "next/font/google";
import { useState } from "react";
import type { Link as LinkType } from "@types";
import Link from "@atoms/Link";
import MenuIcon from "@atoms/MenuIcon";
import { useResize } from "@hooks";
import { sizes } from "@hooks/useResize";

const prata = Prata({ weight: "400" });

const Header = ({ title, links }: { title: string; links: LinkType[] }) => {
  const [active, toggleActive] = useState<boolean>(false);

  const { nearest } = useResize();

  return (
    <>
      <nav className={`${prata.className} sticky top-0`}>
        <div className="w-full h-[5rem] md:h-[6rem] lg:h-[8rem] max-h-28 text-header-sm md:text-header-md lg:text-header-lg text-[#9F0A44] text-center">
          <Link
            href="/"
            className={`transition-opacity ${nearest <= sizes["3xl"] && active ? "opacity-0" : "opacity-100"}`}
            style={{
              transitionDelay: `${links.length / 2 / 10}s`,
            }}
          >
            {title}
          </Link>
        </div>
        <div className="flex absolute right-0 top-1/2 -translate-y-[calc(50%-6px)] h-[3rem] -mt-0.5 lg:mt-0">
          <div className="flex flex-row-reverse justify-around gap-x-8 items-center">
            {links.reverse().map((l, index) => (
              <Link
                {...l}
                key={l.internal?.slug ?? l.external}
                suppressHydrationWarning
                className={`text-2xl lg:text-3xl xl:text-4xl duration-[0.2s] transition-opacity ${active ? "opacity-100" : "opacity-0"}`}
                style={{
                  transitionDelay: active
                    ? `${(index + 1) / 10}s`
                    : `${(links.length - index) / 10}s`,
                }}
              />
            ))}
          </div>
          <div className="relative right-0 mx-8 lg:mx-12 my-auto h-full flex items-center">
            <button className="w-4 md:w-5 lg:w-6 h-4 md:h-5 lg:h-6 cursor-pointer">
              <MenuIcon onClick={() => toggleActive(!active)} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
