import NextLink from "next/link";
import type { Link } from "@types";

const Link = ({
  text,
  relative,
  external,
  internal,
  href,
  children,
  className,
  style,
  suppressHydrationWarning = false,
}: Link) => {
  const link = relative ? `/${internal?.slug}` : external;

  return (
    <NextLink
      href={href ?? link!}
      className={className ? `${className}` : undefined}
      style={style}
      suppressHydrationWarning={suppressHydrationWarning}
    >
      {children ?? text}
    </NextLink>
  );
};

export default Link;
