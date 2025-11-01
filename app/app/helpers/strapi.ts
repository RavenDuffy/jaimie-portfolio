import { Page } from "@types";
import { stringify } from "qs";
import dns from "node:dns";

dns.setDefaultResultOrder("ipv4first");

const apiUrl = `${process.env.STRAPI_URL}/api`;

const defaultHeaders = {
  Authorization: `Bearer ${process.env.TOKEN}`,
};

const request = async (path: string, options: { [key: string]: any } = {}) => {
  const fetchOptions = {
    next: { tags: ["strapi"] },
    headers: {
      ...defaultHeaders,
      ...(options.headers ?? {}),
    },
    ...options,
  };

  const response = await fetch(`${apiUrl}/${path}`, fetchOptions)
    .then((res) => res.json())
    .catch((err) => console.error(err));

  return await response;
};

export const get = async (path: string, params: object) => {
  const query = params ? `?${stringify(params)}` : "";
  return await request(`${path}${query}`, params);
};

export const getByType = async (contentType: string, params = {}) => {
  return await get(contentType, params);
};

export const getAllByType = async (contentType: string, params = {}) => {
  const entries: Page[] = [];
  const maxPages = 10;

  let currentPage = 1;
  let morePages = true;

  while (morePages === true && currentPage <= maxPages) {
    const query = await get(contentType, {
      ...params,
      pagination: {
        page: currentPage,
        pageSize: 10,
      },
    });

    if (query && query?.data?.length > 0) {
      query.data.forEach((entry: Page) => entries.push(entry));

      if (
        typeof query.meta.pagination === `undefined` ||
        currentPage === query.meta.pagination.total
      ) {
        morePages = false;
      } else {
        currentPage++;
      }
    } else {
      morePages = false;
    }
  }

  return entries;
};
