import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'Paperly by AmprimeDev';
const BASE_URL = 'https://www.amprimedev.xyz';
const OG_IMAGE = `${BASE_URL}/og-image.jpg`;

export default function SEO({ title, description, path = '/', ogImage }) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — The Private AI Document Workspace`;
  const canonicalUrl = `${BASE_URL}${path}`;
  const safeDescription = description || 'Transform PDFs, pull out insights, and keep work moving — without sending your files anywhere. Free, private, browser-based document tools.';
  const imageUrl = ogImage || OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={safeDescription} />
      <link rel="canonical" href={canonicalUrl} />
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={safeDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${SITE_NAME} — Free Private PDF Tools`} />
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={safeDescription} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
}

