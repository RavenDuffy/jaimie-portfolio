import { useLayoutEffect, useState } from "react";

export const sizes = {
  "3xs": 256,
  "2xs": 288,
  xs: 320,
  sm: 384,
  md: 448,
  lg: 512,
  xl: 576,
  "2xl": 672,
  "3xl": 768,
  "4xl": 896,
  "5xl": 1024,
  "6xl": 1152,
  "7xl": 1280,
};

const useResize = () => {
  const [size, setSize] = useState<{
    width: number;
    height: number;
    size: string;
    nearest: number;
  }>({ width: 0, height: 0, size: "3xs", nearest: 0 });
  useLayoutEffect(() => {
    const updateSize = () => {
      let nearest;
      const size = Object.keys(sizes).at(
        Object.values(sizes).findIndex((s) => {
          nearest = s;
          return window.innerWidth < s;
        })
      )!;
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
        size,
        nearest: nearest!,
      });
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

export default useResize;
