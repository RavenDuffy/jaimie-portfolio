import type { ReactNode } from "react";

export default async function CmsPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      {children}
      <div className="h-dvh" />
    </>
  );
}
