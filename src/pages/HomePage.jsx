import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CloudUpload, Eye, FileDown, FileText, GripVertical, Image, LockKeyhole, MessageSquareText, MoreHorizontal, PanelRight, Plus, RotateCw, Search, ShieldCheck, Sparkles, Split, Table2, Trash2, WandSparkles, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import AdUnit from '../components/AdUnit';

const toolIcons = {
  merge: Plus, split: Split, compress: Zap, 'pdf-word': FileText,
  watermark: WandSparkles, summary: Sparkles, rotate: RotateCw,
  delete: Trash2, reorder: GripVertical, sign: FileText,
  'pdf-excel': Table2, 'pdf-ppt': PanelRight, 'pdf-jpg': Image,
  'word-pdf': FileDown, 'excel-pdf': Table2, 'ppt-pdf': PanelRight,
  chat: MessageSquareText, ocr: Search, compare: Split,
  contract: ShieldCheck, invoice: FileDown,
};

const toolCards = [
  ['merge', 'Merge PDF', 'Combine multiple files into one'],
  ['compress', 'Compress PDF', 'Rebuild a smaller, cleaner PDF'],
  ['split', 'Split PDF', 'Extract selected pages'],
  ['pdf-word', 'PDF to Word', 'Convert PDF to structured Word document'],
  ['watermark', 'Watermark PDF', 'Stamp text on every page'],
  ['summary', 'AI Summary', "Get the document's essential points"],
];

const allTools = [
  { label: 'Organize', items: [['merge','Merge PDF'],['split','Split PDF'],['rotate','Rotate PDF'],['delete','Delete Pages'],['reorder','Reorder Pages']] },
  { label: 'Edit & Optimize', items: [['compress','Compress PDF'],['watermark','Watermark PDF'],['sign','Sign PDF']] },
  { label: 'Convert', items: [['pdf-word','PDF to Word'],['pdf-excel','PDF to Excel'],['pdf-ppt','PDF to PowerPoint'],['pdf-jpg','PDF to JPG'],['word-pdf','Word to PDF'],['excel-pdf','Excel to PDF'],['ppt-pdf','PPT to PDF']] },
  { label: 'AI Workspace', items: [['summary','AI Summary'],['chat','Chat with PDF'],['ocr','OCR PDF'],['compare','Compare Docs'],['contract','Contract Review'],['invoice','Invoice Extraction']] },
];

export default function HomePage() {
  return (
    <div>
      <SEO
        title={null}
        description="Transform PDFs, pull out insights, and keep work moving — without sending your files anywhere. Free, private, browser-based document tools."
        path="/"
      />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="eyebrow"><Sparkles size={14} /> The private AI document workspace</div>
          <h1>Make more of every<br /><em>document.</em></h1>
          <p>Transform PDFs, pull out insights, and keep work moving—without sending your files anywhere.</p>
          <div className="hero-actions">
            <Link to="/tools/merge" className="primary">Choose a file <ArrowRight size={16} /></Link>
            <a href="#tools" className="secondary" onClick={e => { e.preventDefault(); document.getElementById('tools')?.scrollIntoView({ behavior: 'smooth' }); }}>Explore all tools</a>
          </div>
          <div className="trusted"><ShieldCheck size={15} /><span>Private, browser-based processing · No account required</span></div>
        </section>

        {/* Workspace preview */}
        <section className="home-workspace">
          <div className="home-preview">
            <div className="preview-side">
              <FileText size={18} />
              <span>My documents</span>
              <button><Sparkles size={15} /> AI tools</button>
              <button><MessageSquareText size={15} /> Ask Paperly</button>
            </div>
            <div className="preview-main">
              <div>
                <span className="tiny-kicker">YOUR WORKSPACE</span>
                <h3>Ready when you are.</h3>
              </div>
              <Link to="/tools/merge"><Plus size={16} /> New document</Link>
              <div className="preview-drop">
                <CloudUpload size={27} />
                <b>Drop a PDF to get started</b>
                <span>Merge, edit, convert, or ask Paperly AI</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured tools */}
        <section id="tools" className="tools-section">
          <div className="section-intro">
            <span className="tiny-kicker">EVERYTHING YOU NEED</span>
            <h2>Powerful tools, <em>zero friction.</em></h2>
            <p>Useful document work, in a focused workspace that respects your privacy.</p>
          </div>
          <div className="tool-grid">
            {toolCards.map(([id, name, desc]) => {
              const Icon = toolIcons[id];
              return (
                <Link className="tool-card" key={id} to={`/tools/${id}`}>
                  <div className="tool-symbol"><Icon size={20} /></div>
                  <div><b>{name}</b><p>{desc}</p></div>
                  <ArrowRight size={17} />
                </Link>
              );
            })}
          </div>
        </section>

        <AdUnit slot="home-below-tools" contentReady={true} />

        {/* All tools section */}
        <section className="all-tools-section">
          <div className="section-intro">
            <span className="tiny-kicker">COMPLETE TOOLKIT</span>
            <h2>Every tool you need, <em>in one place.</em></h2>
            <p>21 document tools spanning organization, editing, conversion, and AI-powered analysis.</p>
          </div>
          <div className="all-tools-grid">
            {allTools.map(group => (
              <div className="all-tools-group" key={group.label}>
                <h3>{group.label}</h3>
                <div className="all-tools-list">
                  {group.items.map(([id, name]) => {
                    const Icon = toolIcons[id];
                    return (
                      <Link key={id} to={`/tools/${id}`} className="all-tool-item">
                        <Icon size={16} />
                        <span>{name}</span>
                        <ArrowRight size={14} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* AI band */}
        <section className="ai-band">
          <div>
            <span className="tiny-kicker">MEET PAPERLY AI</span>
            <h2>Your documents,<br /><em>now conversational.</em></h2>
            <p>Summaries, OCR, contract review, comparison, and invoice extraction—all based on your local document text.</p>
            <Link className="light-button" to="/tools/summary">Explore AI workspace <ArrowRight size={16} /></Link>
          </div>
          <div className="chat-preview">
            <div className="chat-title"><span><Sparkles size={14} /> PAPERLY AI</span><MoreHorizontal size={18} /></div>
            <div className="bubble question">What are the key risks in this contract?</div>
            <div className="bubble answer">
              <Sparkles size={14} />
              <p>I'll scan the document for risk and deadline language, then show the relevant text and dates.</p>
              <Link to="/tools/contract">Review a contract <ArrowRight size={14} /></Link>
            </div>
          </div>
        </section>

        {/* Privacy section */}
        <section className="privacy-section">
          <div className="section-intro">
            <span className="tiny-kicker">YOUR PRIVACY MATTERS</span>
            <h2>Built for <em>trust.</em></h2>
            <p>Every file you process stays on your device. Paperly uses client-side JavaScript to handle your documents — nothing is uploaded, stored, or shared with any server.</p>
          </div>
          <div className="privacy-features">
            <div className="privacy-feature">
              <ShieldCheck size={24} />
              <h3>100% Browser-Based</h3>
              <p>All document processing runs locally in your web browser using JavaScript. There are no server uploads, no cloud processing, and no data transmission.</p>
            </div>
            <div className="privacy-feature">
              <LockKeyhole size={24} />
              <h3>No Account Required</h3>
              <p>Start using Paperly immediately. No sign-ups, no email verification, no passwords. Just open the tool and get to work.</p>
            </div>
            <div className="privacy-feature">
              <Eye size={24} />
              <h3>Nothing Stored</h3>
              <p>Your files exist only in your browser's memory during processing. Once you close the tab, they are gone. We never see, access, or retain your documents.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
