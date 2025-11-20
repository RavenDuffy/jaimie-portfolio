import type { ReactNode, CSSProperties } from "react";

export interface BasicComponent {
  __component: string;
  data: {
    [key: string]: any;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    documentId: string;
    id: number;
  };
  meta: object;
}

export type PageParams = {
  slug: string[] | undefined;
  id: number;
};
export type PageMetadata = {
  params: Promise<PageParams>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export interface Page {
  id: number;
  documentId: string;
  slug: string;
  body: unknown;
}

type ImageFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
};
export type Image = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  width: number;
  height: number;
  previewUrl: string | null;
  url: string;
  provider: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  formats: {
    large: ImageFormat;
    medium: ImageFormat;
    small: ImageFormat;
    thumbnail: ImageFormat;
  };
};

interface baseLink {
  className?: string;
  style?: CSSProperties;
  suppressHydrationWarning?: boolean;
  scroll?: boolean;
}
interface internalLink extends baseLink {
  href: string;
  children?: ReactNode;
  text?: never;
  relative?: never;
  external?: never;
  internal?: never;
}
interface cmsLink extends baseLink {
  text: string;
  relative: boolean;
  external?: string;
  internal?: { slug: string };
  href?: never;
  children?: never;
}
export type LinkType = internalLink | cmsLink;

export type PageContextType = {
  children?: ReactNode;
  firstElement?: BasicComponent;
};
