import NextLink from "next/link";
import type { LinkType } from "@types";

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
}: LinkType) => {
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
