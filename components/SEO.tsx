import ApiSEO from "../types/SEO";
import { GlobalContext } from "../pages/_app";
import Head from "next/head";
import React from "react";
import { getMedia } from "../lib/getMedia";
import { useContext } from "react";

interface SEOProps {
  seo: ApiSEO | null;
}

const SEO = ({ seo }: SEOProps) => {
  const global = useContext(GlobalContext);

  const seoWithDefaults = {
    ...global?.attributes.defaultSEO,
    ...seo,
  };

  const fullSeo = {
    ...seoWithDefaults,
    // Add title suffix
    metaTitle: `${seoWithDefaults.metaTitle} | ${
      global?.attributes.siteName
        ? global.attributes.siteName
        : "lukescanlan.com"
    }`,
    // Get full image URL
    shareImage: seoWithDefaults?.shareImage
      ? getMedia(seoWithDefaults.shareImage.data, "m").url
      : undefined,
  };

  return (
    <Head>
      {fullSeo.metaTitle && (
        <>
          <title>{fullSeo.metaTitle}</title>
          <meta property="og:title" content={fullSeo.metaTitle} />
          <meta name="twitter:title" content={fullSeo.metaTitle} />
        </>
      )}
      {fullSeo.metaDescription && (
        <>
          <meta name="description" content={fullSeo.metaDescription} />
          <meta property="og:description" content={fullSeo.metaDescription} />
          <meta name="twitter:description" content={fullSeo.metaDescription} />
        </>
      )}
      {fullSeo.shareImage && (
        <>
          <meta property="og:image" content={fullSeo.shareImage} />
          <meta name="twitter:image" content={fullSeo.shareImage} />
          <meta name="image" content={fullSeo.shareImage} />
        </>
      )}
      {fullSeo.article && <meta property="og:type" content="article" />}
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default SEO;
