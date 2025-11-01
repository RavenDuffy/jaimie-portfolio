import type { ReactNode } from "react";

const Wrapper = ({
  children,
  className,
  flex = false,
  grid = false,
}: {
  children: ReactNode;
  className?: string;
  flex?: boolean;
  grid?: boolean;
}) => {
  return (
    <div
      className={`px-4 ${flex ? "flex" : ""} ${grid ? "grid" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
