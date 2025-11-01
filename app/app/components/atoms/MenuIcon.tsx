"use client";

import { useState } from "react";

const MenuIcon = ({ onClick }: { onClick?: () => void }) => {
  const [rotPos, setRotPos] = useState<number>(0);

  return (
    <svg
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      onClick={() => {
        setRotPos(rotPos + 90);
        onClick?.();
      }}
    >
      <line y1="17.5" x2="35" y2="17.5" stroke="black" strokeWidth="3" />
      <line
        x1="17.5"
        y1="-1.78873e-08"
        x2="17.5"
        y2="35"
        stroke="black"
        strokeWidth="3"
        className="origin-center duration-[0.3s] transition-transform ease-out"
        style={{ rotate: `${rotPos}deg` }}
      />
    </svg>
  );
};

export default MenuIcon;
