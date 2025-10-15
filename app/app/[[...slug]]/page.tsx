import { DynamicZone } from "@components";
import { getByType, getAllByType } from "@helpers/strapi";
import { PageParams } from "@types";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const pages = await getAllByType("pages");

  const settings = await getByType("site-setting", {
    populate: {
      homePage: {
        populate: "*",
      },
    },
  });
  const homePageSlug = settings.data?.homePage?.slug;

  return pages.map((page) => {
    const isIndex =
      typeof homePageSlug === "string" && homePageSlug === page.slug;

    return {
      slug: !isIndex ? [`${page.slug}`] : undefined,
    };
  });
}

export async function generateMetadata(props: PageParams): Promise<Metadata> {
  const params = await props.params;
  let slug = params?.slug?.[0];

  if (typeof params.slug === "undefined") {
    const settings = await getByType("site-setting", {
      populate: {
        homePage: {
          populate: "*",
        },
      },
    });
    slug = settings.data?.homePage?.slug;

    if (typeof slug !== "string") {
      return {};
    }
  }

  return {
    title: slug,
  };
}

export default async function Page(props: PageParams) {
  const params = await props.params;
  let slug = params.slug?.[0];

  if (typeof slug === "undefined") {
    const settings = await getByType("site-setting", {
      populate: {
        homePage: {
          populate: "*",
        },
      },
    });
    slug = settings.data?.homePage?.slug;

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
        populate: "*",
      },
    },
  });

  if (pages.data === null || pages.data.length === 0) {
    return;
  }

  const [page] = pages.data;

  return (
    <>
      {page.title}
      {page.body?.length > 0 && <DynamicZone components={page.body} />}
    </>
  );
}
