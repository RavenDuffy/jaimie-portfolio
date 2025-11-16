import { DynamicZone, Nav } from "@components";
import { getByType, getAllByType } from "@helpers/strapi";
import { PageMetadata } from "@types";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const pages = await getAllByType("pages");

  const settings = await getByType("site-setting", {
    populate: {
      home: {
        populate: true,
      },
    },
  });
  const homePageSlug = settings.data?.home?.slug;

  return pages.map((page) => {
    const isIndex =
      typeof homePageSlug === "string" && homePageSlug === page.slug;

    return {
      slug: !isIndex ? [`${page.slug}`] : undefined,
    };
  });
}

export async function generateMetadata(props: PageMetadata): Promise<Metadata> {
  const params = await props.params;

  let slug = params?.slug?.[0];

  if (typeof params.slug === "undefined") {
    const settings = await getByType("site-setting", {
      populate: {
        home: {
          populate: true,
        },
      },
    });
    slug = settings.data?.home?.slug;

    if (typeof slug !== "string") {
      return {};
    }
  }

  return {
    title: slug,
  };
}

export default async function Page(props: PageMetadata) {
  const params = await props.params;

  let slug = params.slug?.[0];

  if (typeof slug === "undefined") {
    const settings = await getByType("site-setting", {
      populate: {
        home: {
          populate: true,
        },
      },
    });
    slug = settings.data?.home?.slug;

    if (typeof slug !== "string") {
      return;
    }
  }

  const pages = await getByType("pages", {
    filters: {
      slug: {
        $eq: slug,
      },
    },
    populate: {
      body: {
        populate: "*", // * if polymorphic
      },
    },
  });

  if (pages.data === null || pages.data.length === 0) {
    return;
  }

  const [page] = pages.data;

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

  const landingFirst = page.body[0].__component === "blocks.landing";
  const landingNavTitle = landingFirst && page.body[0].title === header.title;

  return (
    page.body?.length > 0 && (
      <>
        <Nav {...header} landingNavTitle={landingNavTitle} />
        <DynamicZone components={page.body} />
      </>
    )
  );
}
