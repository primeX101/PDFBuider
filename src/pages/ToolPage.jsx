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

  const Icon = toolIcons[toolId];
  const hasContent = !!content;

  return (
    <div className="tool-page">
      <SEO
        title={content?.title || tool.name}
        description={content?.metaDescription || tool.description}
        path={`/tools/${toolId}`}
      />

      {/* Rich content section ABOVE the workbench */}
      {hasContent && (
        <section className="tool-content-section">
          <div className="tool-content-inner">
            <div className="tool-content-header">
              <div className="tool-content-icon"><Icon size={28} /></div>
              <div>
                <span className="tiny-kicker">{tool.group}</span>
                <h1>{tool.name}</h1>
                <p className="tool-content-tagline">{tool.description}. Your files stay in your browser — nothing is uploaded to any server.</p>
              </div>
            </div>

            <div className="tool-content-body">
              {content.longDescription.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            <div className="tool-howto">
              <h2>How to {tool.name.toLowerCase().replace('pdf', 'PDF')}</h2>
              <ol>
                {content.howTo.map((step, i) => (
                  <li key={i}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      )}

      {/* The actual functional workbench */}
      <ToolWorkbench toolId={toolId} />

      {/* Ad unit after workbench — only if content is present */}
      <AdUnit slot="tool-below-workbench" contentReady={hasContent} />

      {/* FAQ section BELOW the workbench */}
      {hasContent && content.faqs?.length > 0 && (
        <section className="tool-faq-section">
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
