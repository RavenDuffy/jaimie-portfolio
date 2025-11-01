import { DynamicZone } from "@components";
import { getByType, getAllByType } from "@helpers/strapi";
import { PageMetadata, PageParams } from "@types";
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

  return <>{page.body?.length > 0 && <DynamicZone components={page.body} />}</>;
}
