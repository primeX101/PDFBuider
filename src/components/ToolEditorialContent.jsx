import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown, FileDown, FileText, GripVertical, Image, LockKeyhole, MessageSquareText, Plus, RotateCw, Search, ShieldCheck, Sparkles, Split, Table2, PanelRight, Trash2, WandSparkles, Zap } from 'lucide-react';

const toolIcons = {
  merge: Plus, split: Split, rotate: RotateCw, delete: Trash2,
  reorder: GripVertical, compress: Zap, watermark: WandSparkles,
  sign: FileText, 'pdf-word': FileText, 'pdf-excel': Table2,
  'pdf-ppt': PanelRight, 'pdf-jpg': Image, 'word-pdf': FileDown,
  'excel-pdf': Table2, 'ppt-pdf': PanelRight, summary: Sparkles,
  chat: MessageSquareText, ocr: Search, compare: Split,
  contract: ShieldCheck, invoice: FileDown,
};

const relatedMap = {
  merge:     ['split', 'compress', 'reorder'],
  split:     ['merge', 'delete', 'pdf-word'],
  rotate:    ['delete', 'reorder', 'split'],
  delete:    ['split', 'rotate', 'reorder'],
  reorder:   ['merge', 'split', 'delete'],
  compress:  ['merge', 'pdf-jpg', 'watermark'],
  watermark: ['compress', 'sign', 'merge'],
  sign:      ['watermark', 'contract', 'pdf-word'],
  'pdf-word':  ['pdf-excel', 'pdf-ppt', 'ocr'],
  'pdf-excel': ['pdf-word', 'invoice', 'pdf-ppt'],
  'pdf-ppt':   ['pdf-word', 'pdf-jpg', 'pdf-excel'],
  'pdf-jpg':   ['pdf-word', 'compress', 'split'],
  'word-pdf':  ['excel-pdf', 'ppt-pdf', 'compress'],
  'excel-pdf': ['word-pdf', 'ppt-pdf', 'invoice'],
  'ppt-pdf':   ['word-pdf', 'excel-pdf', 'pdf-jpg'],
  summary:   ['chat', 'ocr', 'contract'],
  chat:      ['summary', 'ocr', 'compare'],
  ocr:       ['summary', 'chat', 'pdf-word'],
  compare:   ['chat', 'contract', 'summary'],
  contract:  ['compare', 'sign', 'summary'],
  invoice:   ['contract', 'pdf-excel', 'compare'],
};

const toolNames = {
  merge: 'Merge PDF', split: 'Split PDF', rotate: 'Rotate PDF',
  delete: 'Delete Pages', reorder: 'Reorder Pages', compress: 'Compress PDF',
  watermark: 'Watermark PDF', sign: 'Sign PDF', 'pdf-word': 'PDF to Word',
  'pdf-excel': 'PDF to Excel', 'pdf-ppt': 'PDF to PowerPoint', 'pdf-jpg': 'PDF to JPG',
  'word-pdf': 'Word to PDF', 'excel-pdf': 'Excel to PDF', 'ppt-pdf': 'PPT to PDF',
  summary: 'AI Summary', chat: 'Chat with PDF', ocr: 'OCR PDF',
  compare: 'Compare Docs', contract: 'Contract Review', invoice: 'Invoice Extraction',
};

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`tool-faq-item ${open ? 'open' : ''}`} onClick={() => setOpen(o => !o)}>
      <div className="tool-faq-q">
        <span>{faq.q}</span>
        <ChevronDown size={17} className="tool-faq-chevron" />
      </div>
      {open && <p className="tool-faq-a">{faq.a}</p>}
    </div>
  );
}

export default function ToolEditorialContent({ toolId, content }) {
  if (!content) return null;
  const related = (relatedMap[toolId] || []).filter(id => toolNames[id]);
  const name = toolNames[toolId] || 'This Tool';

  return (
    <section className="tool-editorial" aria-label="About this tool">
      {content.longDescription && (
        <div className="tool-editorial-desc">
          <h2>About {name}</h2>
          {content.longDescription.split('\n\n').map((para, i) => (
            <p key={i}>{para.trim()}</p>
          ))}
        </div>
      )}

      {content.howTo && content.howTo.length > 0 && (
        <div className="tool-editorial-howto">
          <h2>How to Use {name}</h2>
          <ol className="tool-howto-steps">
            {content.howTo.map((step, i) => (
              <li key={i} className="tool-howto-step">
                <span className="step-num">{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="tool-editorial-trust">
        <div className="trust-item">
          <LockKeyhole size={20} />
          <div>
            <strong>100% Private</strong>
            <p>All processing runs locally in your browser. Your files never leave your device or touch any server.</p>
          </div>
        </div>
        <div className="trust-item">
          <Zap size={20} />
          <div>
            <strong>No Account Required</strong>
            <p>Start instantly — no sign-up, no email, no subscription. Free with no file limits.</p>
          </div>
        </div>
        <div className="trust-item">
          <ShieldCheck size={20} />
          <div>
            <strong>No Watermarks</strong>
            <p>Download clean output files — no Paperly branding, logos, or watermarks added to your documents.</p>
          </div>
        </div>
      </div>

      {content.faqs && content.faqs.length > 0 && (
        <div className="tool-editorial-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="tool-faq-list">
            {content.faqs.map((faq, i) => (
              <FaqItem key={i} faq={faq} />
            ))}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="tool-editorial-related">
          <h2>Related Tools</h2>
          <div className="tool-related-grid">
            {related.map(id => {
              const Icon = toolIcons[id] || FileText;
              return (
                <Link key={id} to={`/tools/${id}`} className="tool-related-card">
                  <Icon size={18} />
                  <span>{toolNames[id]}</span>
                  <ArrowRight size={14} />
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
