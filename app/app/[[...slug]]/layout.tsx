import { getByType } from "@/helpers/strapi";
import { Nav } from "@components";
import type { ReactNode } from "react";

export default async function CmsPageLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headerData = await getByType("navigation", {
    populate: {
      header: {
        populate: {
          links: {
            populate: {
              internal: {
                fields: ["slug"],
              },
            },
          },
        },
      },
    },
  });
  const header = headerData.data.header;

  return (
    <>
      <Nav {...header} />
      {children}
      <div className="delete h-dvh" />
    </>
  );
}
