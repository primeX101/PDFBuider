import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import SEO from '../components/SEO';
import AdUnit from '../components/AdUnit';
import ToolWorkbench, { toolsById, toolIcons } from '../components/ToolWorkbench';
import { toolContent } from '../data/toolContent';

export default function ToolPage() {
  const { toolId } = useParams();
  const tool = toolsById[toolId];
  const content = toolContent[toolId];

  if (!tool) return <Navigate to="/" replace />;

  const hasContent = !!content;

  return (
    <div className="tool-page">
      <SEO
        title={content?.title || tool.name}
        description={content?.metaDescription || tool.description}
        path={`/tools/${toolId}`}
      />

      {/* Functional workbench with integrated feature guide sidebar */}
      <ToolWorkbench toolId={toolId} />

      {/* Ad unit after workbench — only if content is present */}
      <AdUnit slot="tool-below-workbench" contentReady={hasContent} />

      {/* FAQ section BELOW the workbench */}
      {hasContent && content.faqs?.length > 0 && (
        <section className="tool-faq-section" id="tool-faqs">
          <div className="tool-faq-inner">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-list">
              {content.faqs.map((faq, i) => (
                <details key={i} className="faq-item">
                  <summary>
                    <span>{faq.q}</span>
                    <ChevronDown size={18} />
                  </summary>
                  <p>{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related tools */}
      {hasContent && (
        <section className="related-tools-section">
          <div className="related-tools-inner">
            <h2>More Paperly Tools</h2>
            <div className="related-tools-grid">
              {Object.entries(toolsById)
                .filter(([id]) => id !== toolId)
                .slice(0, 6)
                .map(([id, t]) => {
                  const RelIcon = toolIcons[id];
                  return (
                    <Link key={id} to={`/tools/${id}`} className="related-tool-card">
                      <RelIcon size={18} />
                      <div>
                        <b>{t.name}</b>
                        <span>{t.description}</span>
                      </div>
                      <ArrowRight size={15} />
                    </Link>
                  );
                })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
