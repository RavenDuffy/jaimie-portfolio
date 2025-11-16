import { RefObject, useLayoutEffect, useState } from "react";

const baseElement = ["body"] as const;
type baseElements = (typeof baseElement)[number];

const useResize = (element: baseElements | RefObject<HTMLElement | null>) => {
  const [position, setPosition] = useState<{
    fromTop: number;
    height: number;
  }>({ fromTop: 0, height: 0 });

  useLayoutEffect(() => {
    const updateSize = () => {
      if (typeof element === "string") {
        setPosition({
          fromTop: window.pageYOffset,
          height: window.visualViewport?.height || 0,
        });
        return;
      } else if (element?.current === null) return;
      setPosition({
        fromTop: element.current.offsetTop,
        height: element.current.offsetHeight,
      });
    };
    addEventListener("scroll", updateSize);
    updateSize();
    return () => removeEventListener("scroll", updateSize);
  }, []);
  return position;
};

export default useResize;
