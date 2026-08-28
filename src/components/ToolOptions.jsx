import React from 'react';
import { Sparkles, ShieldCheck, FileText, Check } from 'lucide-react';

function Field({ label, children }) {
  return <label className="option-field"><span>{label}</span>{children}</label>;
}

export default function ToolOptions({ active, options, setOptions, pageCount }) {
  const update = e => setOptions(v => ({ ...v, [e.target.name]: e.target.value }));

  if (active === 'split') return (
    <div className="tool-options">
      <Field label="Page range">
        <input name="range" value={options.range} onChange={update} placeholder="e.g. 1-3, 5, 8-10" />
        <span className="option-help">Total pages: {pageCount || 'Unknown'}</span>
      </Field>
    </div>
  );

  if (active === 'rotate') return (
    <div className="tool-options">
      <Field label="Rotation angle">
        <select name="angle" value={options.angle} onChange={update}>
          <option value="90">90° clockwise</option>
          <option value="180">180° turn</option>
          <option value="270">270° clockwise</option>
        </select>
      </Field>
    </div>
  );

  if (active === 'delete') return (
    <div className="tool-options">
      <Field label="Pages to delete">
        <input name="range" value={options.range} onChange={update} placeholder="e.g. 2, 4-6" />
      </Field>
    </div>
  );

  if (active === 'reorder') return (
    <div className="tool-options">
      <Field label="New page order">
        <input name="order" value={options.order} onChange={update} placeholder="e.g. 3, 1, 2, 4" />
        <span className="option-help">Total pages: {pageCount || 'Unknown'}</span>
      </Field>
    </div>
  );

  if (active === 'watermark') return (
    <div className="tool-options">
      <Field label="Watermark text">
        <input name="text" value={options.text} onChange={update} placeholder="e.g. CONFIDENTIAL" />
      </Field>
    </div>
  );

  if (active === 'sign') return (
    <div className="tool-options two">
      <Field label="Signature name">
        <input name="signature" value={options.signature} onChange={update} placeholder="Your name" />
      </Field>
      <Field label="Page number">
        <input name="page" value={options.page} onChange={update} placeholder="1" />
      </Field>
      <Field label="X position (pt)">
        <input name="x" value={options.x} onChange={update} placeholder="48" />
      </Field>
      <Field label="Y position (pt)">
        <input name="y" value={options.y} onChange={update} placeholder="48" />
      </Field>
    </div>
  );

  if (active === 'chat') return (
    <div className="tool-options">
      <Field label="Ask a question about this document">
        <input name="question" value={options.question} onChange={update} placeholder="Ask anything about the text inside this document…" />
      </Field>
    </div>
  );

  if (active === 'summary') return (
    <div className="tool-options">
      <div className="option-note">
        <Sparkles size={16} />
        <span>Paperly AI will generate an executive summary, key points, and keyword terms from your document text.</span>
      </div>
    </div>
  );

  if (active === 'contract') return (
    <div className="tool-options">
      <div className="option-note">
        <ShieldCheck size={16} />
        <span>Contract review extracts terms, dates, and potential risk/obligation clauses.</span>
      </div>
    </div>
  );

  if (active === 'invoice') return (
    <div className="tool-options">
      <div className="option-note">
        <FileText size={16} />
        <span>Invoice extraction pulls out total amounts, vendor name, invoice numbers, and dates.</span>
      </div>
    </div>
  );

  if (active === 'compare') return (
    <div className="tool-options">
      <div className="option-note">
        <Sparkles size={16} />
        <span>Document comparison compares words between two PDFs to find differences.</span>
      </div>
    </div>
  );

  if (active === 'compress') return (
    <div className="tool-options">
      <div className="option-note">
        <Check size={16} />
        <span>Compress optimizes PDF objects to reduce file size while maintaining text quality.</span>
      </div>
    </div>
  );

  return null;
}
