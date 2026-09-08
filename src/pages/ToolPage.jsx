import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import SEO from '../components/SEO';
import ToolWorkbench, { toolsById } from '../components/ToolWorkbench';
import { toolContent } from '../data/toolContent';

export default function ToolPage() {
  const { toolId } = useParams();
  const tool = toolsById[toolId];
  const content = toolContent[toolId];

  if (!tool) return <Navigate to="/" replace />;

  return (
    <div className="tool-page">
      <SEO
        title={content?.title || tool.name}
        description={content?.metaDescription || tool.description}
        path={`/tools/${toolId}`}
      />

      {/* Functional workbench with integrated feature guide, FAQ & activity sidebar */}
      <ToolWorkbench toolId={toolId} />
    </div>
  );
}
