import type { Metadata } from "next";
import { siteConfig, siteRoutes, type SiteRoute } from "@/config/site";
import { absoluteUrl, normalizePath } from "@/utils/url";

type CreateMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
  noIndex?: boolean;
};

export function getPageSeo(path = "/"): SiteRoute {
  const normalizedPath = normalizePath(path);
  return (
    siteRoutes.find((route) => route.path === normalizedPath) ?? {
      path: normalizedPath,
      title: siteConfig.name,
      description: siteConfig.description,
      priority: 0.5,
      label: siteConfig.name,
    }
  );
}

export function createMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  keywords = siteConfig.keywords,
  type = "website",
  noIndex = false,
}: CreateMetadataOptions = {}): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const pageTitle = title || siteConfig.name;

  return {
    metadataBase: new URL(siteConfig.url),
    title: pageTitle,
    description,
    keywords,
    authors: [{ name: siteConfig.name }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-image-preview": "large",
      },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: pageTitle,
      description,
      url,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
    },
    icons: {
      icon: "/favicon/favicon.png",
      shortcut: "/favicon/favicon.png",
    },
    other: {
      image_src: imageUrl,
    },
  };
}

export function createRootMetadata(): Metadata {
  return {
    ...createMetadata(),
    title: {
      default: siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
  };
}

export function createPageMetadata(path: string): Metadata {
  const page = getPageSeo(path);

  return createMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
  });
}
