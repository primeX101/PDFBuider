import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, X, ShieldCheck, Zap, LockKeyhole, Globe, DollarSign, Users } from 'lucide-react';
import SEO from '../components/SEO';

const COMPARISONS = [
  {
    feature: 'File upload required',
    paperly: { val: 'Never', good: true },
    smallpdf: { val: 'Always', good: false },
    ilovepdf: { val: 'Always', good: false },
  },
  {
    feature: 'Account required',
    paperly: { val: 'No', good: true },
    smallpdf: { val: 'For most features', good: false },
    ilovepdf: { val: 'No (limited free tier)', good: true },
  },
  {
    feature: 'Cost',
    paperly: { val: '100% Free', good: true },
    smallpdf: { val: 'Free (2 tasks/day) or $9+/mo', good: false },
    ilovepdf: { val: 'Free (file-size limits) or $4+/mo', good: false },
  },
  {
    feature: 'Files stored on server',
    paperly: { val: 'Never', good: true },
    smallpdf: { val: 'Yes (auto-deleted after 1hr)', good: false },
    ilovepdf: { val: 'Yes (auto-deleted after 2hrs)', good: false },
  },
  {
    feature: 'Works offline',
    paperly: { val: 'Yes (after first load)', good: true },
    smallpdf: { val: 'No', good: false },
    ilovepdf: { val: 'No', good: false },
  },
  {
    feature: 'AI document tools',
    paperly: { val: 'Yes (6 AI tools)', good: true },
    smallpdf: { val: 'Yes (limited)', good: true },
    ilovepdf: { val: 'Limited', good: false },
  },
  {
    feature: 'PDF to Word',
    paperly: { val: 'Yes, free', good: true },
    smallpdf: { val: 'Yes (limited free)', good: true },
    ilovepdf: { val: 'Yes, free', good: true },
  },
  {
    feature: 'Merge PDF',
    paperly: { val: 'Yes, free, unlimited', good: true },
    smallpdf: { val: 'Yes (2/day free)', good: false },
    ilovepdf: { val: 'Yes, free', good: true },
  },
  {
    feature: 'Compress PDF',
    paperly: { val: 'Yes, free, unlimited', good: true },
    smallpdf: { val: 'Yes (2/day free)', good: false },
    ilovepdf: { val: 'Yes, free', good: true },
  },
  {
    feature: 'OCR (scanned PDFs)',
    paperly: { val: 'Yes, free', good: true },
    smallpdf: { val: 'Pro only', good: false },
    ilovepdf: { val: 'Yes, free', good: true },
  },
  {
    feature: 'Ads shown',
    paperly: { val: 'Yes (contextual)', good: false },
    smallpdf: { val: 'Yes', good: false },
    ilovepdf: { val: 'Yes', good: false },
  },
  {
    feature: 'Mobile-friendly',
    paperly: { val: 'Yes', good: true },
    smallpdf: { val: 'Yes', good: true },
    ilovepdf: { val: 'Yes', good: true },
  },
];

const pros = [
  { icon: ShieldCheck, text: '100% private — your files never leave your device' },
  { icon: LockKeyhole, text: 'No account, no sign-up, no email required' },
  { icon: DollarSign, text: 'Completely free — all 21 tools, no daily limits' },
  { icon: Zap, text: 'Faster than cloud tools — no upload/download round-trip' },
  { icon: Globe, text: 'Works in any browser on any device' },
  { icon: Users, text: '6 AI-powered tools: Summary, Chat, OCR, Compare, Contract, Invoice' },
];

export default function ComparisonPage() {
  return (
    <div className="content-page">
      <SEO
        title="Paperly vs Smallpdf vs iLovePDF — Best Free PDF Tool 2025"
        description="Compare Paperly, Smallpdf, and iLovePDF side by side. See which free PDF tool offers the best privacy, most features, and fewest restrictions — no bias, just facts."
        path="/compare/paperly-vs-smallpdf-vs-ilovepdf"
      />

      <section className="content-hero">
        <span className="tiny-kicker">TOOL COMPARISON 2025</span>
        <h1>Paperly vs Smallpdf vs iLovePDF — <em>Which is Best?</em></h1>
        <p>An honest feature-by-feature comparison of the three most popular free PDF tools. We focus on privacy, cost, and actual free-tier limits.</p>
      </section>

      {/* Summary verdict */}
      <section className="compare-verdict-section">
        <div className="compare-verdict">
          <h2>Our Verdict</h2>
          <p>
            <strong>For privacy:</strong> Paperly is the clear winner — files never leave your browser.
            <strong> For breadth of features:</strong> iLovePDF offers the widest free toolset with the fewest daily limits.
            <strong> For polished UX:</strong> Smallpdf has the smoothest interface but the strictest free tier (2 tasks/day).
          </p>
          <p>If you regularly handle sensitive documents — contracts, medical records, financial statements — Paperly is the only choice that guarantees your data stays private, because there is no server to breach.</p>
        </div>
      </section>

      {/* Comparison table */}
      <section className="compare-table-section">
        <h2>Feature Comparison</h2>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th className="col-paperly">Paperly <span className="col-badge">This site</span></th>
                <th>Smallpdf</th>
                <th>iLovePDF</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISONS.map(row => (
                <tr key={row.feature}>
                  <td className="feature-name">{row.feature}</td>
                  <td className={`col-paperly ${row.paperly.good ? 'good' : 'neutral'}`}>
                    {row.paperly.good ? <Check size={14} /> : <X size={14} />}
                    {row.paperly.val}
                  </td>
                  <td className={row.smallpdf.good ? 'good' : 'neutral'}>
                    {row.smallpdf.good ? <Check size={14} /> : <X size={14} />}
                    {row.smallpdf.val}
                  </td>
                  <td className={row.ilovepdf.good ? 'good' : 'neutral'}>
                    {row.ilovepdf.good ? <Check size={14} /> : <X size={14} />}
                    {row.ilovepdf.val}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Why Paperly */}
      <section className="compare-why-section">
        <h2>Why Choose Paperly?</h2>
        <div className="compare-pros-grid">
          {pros.map(({ icon: Icon, text }) => (
            <div key={text} className="compare-pro-item">
              <Icon size={20} className="compare-pro-icon" />
              <span>{text}</span>
            </div>
          ))}
        </div>
        <div className="compare-cta">
          <Link to="/tools/merge" className="primary">
            Try Paperly Free <ArrowRight size={16} />
          </Link>
          <Link to="/tools/compress" className="secondary">
            Compress a PDF
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="compare-faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="compare-faq-list">
          {[
            { q: 'Is Paperly really free?', a: 'Yes. All 21 tools on Paperly are free to use with no daily limits, no account required, and no watermarks on output files. The site is supported by contextual advertising.' },
            { q: 'How is Paperly different from Smallpdf?', a: 'The biggest difference is privacy and cost. Paperly processes all files locally in your browser — nothing is ever uploaded. Smallpdf requires file uploads to their servers and limits free users to 2 tasks per day.' },
            { q: 'Does Paperly have any file size limits?', a: 'There are no server-enforced limits because no server is involved. Practical limits depend on your device\'s RAM. Modern computers handle files up to several hundred megabytes without difficulty.' },
            { q: 'Can I use Paperly on mobile?', a: 'Yes. Paperly works in any modern mobile browser on Android and iOS. All tools are fully responsive and function without any app download.' },
          ].map(({ q, a }) => (
            <div key={q} className="compare-faq-item">
              <h3>{q}</h3>
              <p>{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
