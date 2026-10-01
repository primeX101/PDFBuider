import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import ToolWorkbench, { toolsById } from '../components/ToolWorkbench';
import ToolEditorialContent from '../components/ToolEditorialContent';
import AdUnit from '../components/AdUnit';
import { toolContent } from '../data/toolContent';

const BASE_URL = 'https://www.amprimedev.xyz';

export default function ToolPage() {
  const { toolId } = useParams();
  const tool = toolsById[toolId];
  const content = toolContent[toolId];

  if (!tool) return <Navigate to="/" replace />;

  const pageTitle = content?.title || `${tool.name} — Free Online Tool`;
  const pageDesc = content?.metaDescription || tool.description;

  return (
    <div className="tool-page">
      <SEO
        title={pageTitle}
        description={pageDesc}
        path={`/tools/${toolId}`}
      />

      {/* SoftwareApplication structured data — enables Google rich results */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: pageTitle,
            description: pageDesc,
            url: `${BASE_URL}/tools/${toolId}`,
            applicationCategory: 'UtilitiesApplication',
            operatingSystem: 'Web Browser',
            browserRequirements: 'Requires JavaScript. Works in Chrome, Firefox, Edge, Safari.',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'No file upload required',
              'Browser-based processing',
              'No account required',
              'No watermarks',
              '100% private and secure',
            ],
            publisher: {
              '@type': 'Organization',
              name: 'Paperly by AmprimeDev',
              url: BASE_URL,
            },
          })}
        </script>
      </Helmet>

      {/* Functional workbench with integrated feature guide, FAQ & activity sidebar */}
      <ToolWorkbench toolId={toolId} />

      {/* Rich editorial content — satisfies AdSense publisher content requirement */}
      <ToolEditorialContent toolId={toolId} content={content} />

      {/* Gated ad — only renders after substantial content is present */}
      <AdUnit slot="tool-editorial-bottom" contentReady={!!content} />
    </div>
  );
}

