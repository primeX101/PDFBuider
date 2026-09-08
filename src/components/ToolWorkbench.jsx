import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Check, ChevronDown, ChevronRight, Clock, FileDown, FileText, GripVertical, HelpCircle, Image, LayoutDashboard, LoaderCircle, LockKeyhole, MessageSquareText, MoreHorizontal, PanelRight, Plus, RotateCw, Search, ShieldCheck, Sparkles, Split, Table2, Trash2, Upload, WandSparkles, Zap } from 'lucide-react';
import * as engine from '../pdfEngine';
import FilePicker from './FilePicker';
import ToolOptions from './ToolOptions';
import UploadModal from './UploadModal';
import ResultCard from './ResultCard';
import { toolContent } from '../data/toolContent';

const groups = [
  { label: 'Organize', items: [['merge','Merge PDF','Combine multiple files into one'],['split','Split PDF','Extract selected pages'],['rotate','Rotate PDF','Turn pages in any direction'],['delete','Delete pages','Remove pages from a document'],['reorder','Reorder pages','Arrange pages your way']] },
  { label: 'Edit & optimize', items: [['compress','Compress PDF','Rebuild a smaller, cleaner PDF'],['watermark','Watermark PDF','Stamp text on every page'],['sign','Sign PDF','Add a typed signature']] },
  { label: 'Convert', items: [['pdf-word','PDF to Word','Convert PDF to structured Word document with headings & formatting'],['pdf-excel','PDF to Excel','Export text rows to a workbook'],['pdf-ppt','PDF to PowerPoint','Turn PDF pages into slides'],['pdf-jpg','PDF to JPG','Render each page as an image'],['word-pdf','Word to PDF','Create a readable PDF'],['excel-pdf','Excel to PDF','Export a spreadsheet to PDF'],['ppt-pdf','PPT to PDF','Export slide text to PDF']] },
  { label: 'AI workspace', items: [['summary','AI summary','Get the document\'s essential points'],['chat','Chat with PDF','Ask about the selected document'],['ocr','OCR PDF','Read text from scanned pages'],['compare','Compare documents','Find what changed'],['contract','Contract review','Find risks and deadlines'],['invoice','Invoice extraction','Pull key invoice data']] }
];

export const toolsById = Object.fromEntries(groups.flatMap(group => group.items.map(([id,name,description]) => [id,{id,name,description,group:group.label}])));
const pdfOnly = new Set(['merge','split','rotate','delete','reorder','compress','watermark','sign','pdf-word','pdf-excel','pdf-ppt','pdf-jpg','summary','chat','ocr','compare','contract','invoice']);
const multiple = new Set(['merge','compare']);

export const toolIcons = {
  merge: Plus, split: Split, rotate: RotateCw, delete: Trash2,
  reorder: GripVertical, compress: Zap, watermark: WandSparkles,
  sign: FileText, 'pdf-word': FileText, 'pdf-excel': Table2,
  'pdf-ppt': PanelRight, 'pdf-jpg': Image, 'word-pdf': FileDown,
  'excel-pdf': Table2, 'ppt-pdf': PanelRight, summary: Sparkles,
  chat: MessageSquareText, ocr: Search, compare: Split,
  contract: ShieldCheck, invoice: FileDown,
};

export default function ToolWorkbench({ toolId }) {
  const active = toolId;
  const [docs, setDocs] = useState([]);
  const [chosen, setChosen] = useState([]);
  const [modal, setModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState('');
  const [toast, setToast] = useState('');
  const [history, setHistory] = useState([]);
  const [result, setResult] = useState(null);
  const [sideTab, setSideTab] = useState('guide');
  const [options, setOptions] = useState({
    range: '1-3', angle: '90', order: '', text: 'CONFIDENTIAL',
    signature: 'Aria Shah', page: '1', x: '48', y: '48',
    question: 'What are the key points and deadlines?'
  });

  const current = toolsById[active] || { id: active, name: active, description: '', group: '' };
  const CurrentIcon = toolIcons[active] || FileText;
  const allowedLabel = pdfOnly.has(active) ? 'PDF files' : active === 'word-pdf' ? 'DOCX files' : active === 'excel-pdf' ? 'XLSX or CSV files' : 'PPTX files';
  const accept = pdfOnly.has(active) ? '.pdf,application/pdf' : active === 'word-pdf' ? '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document' : active === 'excel-pdf' ? '.xlsx,.xls,.csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv' : '.pptx,application/vnd.openxmlformats-officedocument.presentationml.presentation';

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(''), 3600);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    setResult(null);
    setChosen([]);
    setSideTab('guide');
  }, [active]);

  const addFiles = async list => {
    const newFiles = [...list].filter(Boolean);
    if (!newFiles.length) return;
    const valid = newFiles.filter(f => pdfOnly.has(active) ? engine.isPdf(f) : active === 'word-pdf' ? /\.docx$/i.test(f.name) : active === 'excel-pdf' ? /\.(xlsx|xls|csv)$/i.test(f.name) : /\.pptx$/i.test(f.name));
    if (!valid.length) { setToast(`Choose ${allowedLabel} for ${current.name}.`); return; }
    const enriched = await Promise.all(valid.map(async file => ({
      id: crypto.randomUUID(), file, name: file.name, size: file.size,
      pages: engine.isPdf(file) ? await engine.pageCount(file).catch(() => null) : null
    })));
    setDocs(old => [...old, ...enriched]);
    setChosen(old => [...old, ...enriched.map(x => x.id)]);
    setModal(false);
    setToast(`${enriched.length} file${enriched.length > 1 ? 's' : ''} ready in your workspace.`);
  };

  const selectedDocs = useMemo(() => docs.filter(d => chosen.includes(d.id)), [docs, chosen]);
  const requireSelection = () => {
    const need = multiple.has(active) ? 2 : 1;
    if (selectedDocs.length < need) { setToast(`Select ${need === 2 ? 'two' : 'a'} ${allowedLabel.replace(' files', '')} ${need === 2 ? 'documents' : 'document'} to continue.`); return false; }
    return true;
  };

  const execute = async () => {
    if (!requireSelection() || busy) return;
    setBusy(true); setProgress('Preparing your document…'); setResult(null);
    try {
      let output, text;
      const first = selectedDocs[0].file;
      const all = selectedDocs.map(x => x.file);
      const report = (title, body, details = []) => setResult({ type: 'report', title, body, details });

      switch (active) {
        case 'merge': output = await engine.mergePdfs(all, setProgress); break;
        case 'split': output = await engine.splitPdf(first, options, setProgress); break;
        case 'rotate': output = await engine.rotatePdf(first, options, setProgress); break;
        case 'delete': output = await engine.deletePages(first, options, setProgress); break;
        case 'reorder': output = await engine.reorderPdf(first, options, setProgress); break;
        case 'compress': output = await engine.compactPdf(first, setProgress); break;
        case 'watermark': output = await engine.watermarkPdf(first, options, setProgress); break;
        case 'sign': output = await engine.signPdf(first, options, setProgress); break;
        case 'pdf-word': output = await engine.pdfToWord(first, setProgress); break;
        case 'pdf-excel': output = await engine.pdfToExcel(first, setProgress); break;
        case 'pdf-ppt': output = await engine.pdfToPpt(first, setProgress); break;
        case 'pdf-jpg': output = await engine.pdfToJpg(first, setProgress); break;
        case 'word-pdf': output = await engine.wordToPdf(first, setProgress); break;
        case 'excel-pdf': output = await engine.excelToPdf(first, setProgress); break;
        case 'ppt-pdf': output = await engine.pptToPdf(first, setProgress); break;
        case 'ocr': text = await engine.ocrPdf(first, setProgress); report('OCR text', `${text.slice(0, 1200)}${text.length > 1200 ? '…' : ''}`, [{ label: 'Pages scanned', value: String(selectedDocs[0]?.pages || '—') }, { label: 'Characters recognized', value: String(text.length) }]); break;
        case 'summary': text = (await engine.extractPdfTextWithFallback(first, setProgress)).join('\n\n'); { const r = engine.summarizeText(text); report('Document summary', r.overview, r.keyPoints.map((x, i) => ({ label: `Key point ${i + 1}`, value: x })).concat([{ label: 'Key terms', value: r.keywords.join(' · ') }])); } break;
        case 'chat': text = (await engine.extractPdfTextWithFallback(first, setProgress)).join('\n\n'); { const answer = engine.answerQuestion(text, options.question); const docMeta = selectedDocs[0]; report(options.question, answer, [{ label: 'Searched', value: `${docMeta?.name || first.name} · ${docMeta?.pages ? docMeta.pages + ' pages' : 'Document'}` }]); } break;
        case 'contract': text = (await engine.extractPdfTextWithFallback(first, setProgress)).join('\n\n'); { const r = engine.extractFacts(text, 'contract'); report('Contract review', r.risks.length ? 'Potential attention areas found in the document.' : 'No common contract-risk phrases were detected.', r.risks.map((x, i) => ({ label: `Review ${i + 1}`, value: x.trim() })).concat([{ label: 'Dates detected', value: r.dates.join(', ') || 'None detected' }])); } break;
        case 'invoice': text = (await engine.extractPdfTextWithFallback(first, setProgress)).join('\n\n'); { const r = engine.extractFacts(text, 'invoice'); report('Invoice extraction', 'Key fields were extracted from selectable document text.', [{ label: 'Vendor', value: r.vendor }, { label: 'Invoice number', value: r.invoice }, { label: 'Amounts', value: r.amounts.join(', ') || 'Not detected' }, { label: 'Dates', value: r.dates.join(', ') || 'Not detected' }]); } break;
        case 'compare': { const [one, two] = await Promise.all(all.slice(0, 2).map(file => engine.extractPdfTextWithFallback(file, setProgress).then(p => p.join('\n\n')))); const a = new Set(one.toLowerCase().match(/[a-z]{4,}/g) || []), b = new Set(two.toLowerCase().match(/[a-z]{4,}/g) || []); const onlyOne = [...a].filter(x => !b.has(x)).slice(0, 18); const onlyTwo = [...b].filter(x => !a.has(x)).slice(0, 18); report('Document comparison', `${selectedDocs[0].name} and ${selectedDocs[1].name} were compared from their extracted text.`, [{ label: 'Only in first document', value: onlyOne.join(', ') || 'No distinct words found' }, { label: 'Only in second document', value: onlyTwo.join(', ') || 'No distinct words found' }]); } break;
        default: throw new Error('This tool is not ready yet.');
      }
      if (output) {
        engine.download(output);
        setResult({ type: 'download', title: 'Your file is ready', body: active === 'compress' ? `${output.name} is a PDF and has been downloaded. Open it in a PDF viewer or browser—not Microsoft Word.` : `${output.name} has been downloaded to your device.`, details: [] });
        setHistory(h => [{ name: output.name, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), tool: current.name }, ...h].slice(0, 5));
      }
    } catch (error) {
      console.error(error);
      setToast(error?.message || 'We could not process this document.');
    } finally {
      setBusy(false); setProgress('');
    }
  };

  const removeDoc = id => { setDocs(d => d.filter(x => x.id !== id)); setChosen(c => c.filter(x => x !== id)); };

  return (
    <>
      <div className="app-shell">
        <header className="app-nav">
          <div className="crumb">
            <Link to="/">Home</Link>
            <ChevronRight size={14} />
            <Link to="/tools/merge">Tools</Link>
            <ChevronRight size={14} />
            <b>{current.name}</b>
          </div>
          <button className="upload-top" onClick={() => setModal(true)}>
            <Upload size={15} /> Upload files
          </button>
        </header>
        <div className="workbench">
          <aside className="tool-sidebar">
            <div className="side-heading"><LayoutDashboard size={16} /> Workspace</div>
            {groups.map(group => (
              <div className="tool-group" key={group.label}>
                <span>{group.label}</span>
                {group.items.map(([id, name]) => {
                  const Icon = toolIcons[id];
                  return (
                    <Link key={id} className={active === id ? 'tool-active' : ''} to={`/tools/${id}`}>
                      <Icon size={15} />{name}
                    </Link>
                  );
                })}
              </div>
            ))}
          </aside>
          <main className="tool-main">
            <div className="tool-heading">
              <div className="tool-head-icon"><CurrentIcon size={22} /></div>
              <div>
                <span className="tiny-kicker">{current.group}</span>
                <h1>{current.name}</h1>
                <p>{current.description}. Your files stay in your browser while they're processed.</p>
              </div>
            </div>
            <section className="tool-canvas">
              <FilePicker
                active={active}
                docs={docs}
                chosen={chosen}
                setChosen={setChosen}
                remove={removeDoc}
                addFiles={addFiles}
                openPicker={() => setModal(true)}
                required={multiple.has(active) ? 2 : 1}
              />
              <ToolOptions active={active} options={options} setOptions={setOptions} pageCount={selectedDocs[0]?.pages} />
              <button className="run-button" disabled={busy || selectedDocs.length < (multiple.has(active) ? 2 : 1)} onClick={execute}>
                {busy ? (
                  <><LoaderCircle className="spin" size={17} /> {progress || 'Processing…'}</>
                ) : (
                  <>{active === 'summary' || active === 'chat' || active === 'compare' || active === 'contract' || active === 'invoice' ? 'Analyze document' : active === 'ocr' ? 'Run OCR' : 'Process and download'} <ArrowRight size={17} /></>
                )}
              </button>
              {!busy && selectedDocs.length < (multiple.has(active) ? 2 : 1) && (
                <p className="run-hint">{active === 'compare' ? 'Select two documents to compare them.' : active === 'merge' ? 'Select documents to merge them.' : 'Select a document to continue.'}</p>
              )}
            </section>
            {result && <ResultCard result={result} />}
          </main>
          <aside className="activity-panel">
            <div className="activity-panel-header">
              <div className="side-tab-bar">
                <button
                  type="button"
                  className={`side-tab-btn ${sideTab === 'guide' ? 'active' : ''}`}
                  onClick={() => setSideTab('guide')}
                >
                  <BookOpen size={13} /> Guide
                </button>
                <button
                  type="button"
                  className={`side-tab-btn ${sideTab === 'faq' ? 'active' : ''}`}
                  onClick={() => setSideTab('faq')}
                >
                  <HelpCircle size={13} /> FAQ
                </button>
                <button
                  type="button"
                  className={`side-tab-btn ${sideTab === 'activity' ? 'active' : ''}`}
                  onClick={() => setSideTab('activity')}
                >
                  <Clock size={13} /> Activity
                  {selectedDocs.length > 0 && <span className="tab-pill">{selectedDocs.length}</span>}
                </button>
              </div>
            </div>

            <div className="activity-panel-body">
              {sideTab === 'guide' ? (
              <div className="sidebar-guide">
                <div className="guide-header">
                  <span className="tiny-kicker">{current.group}</span>
                  <h3>{current.name}</h3>
                  <p className="guide-desc">{current.description}. Processed locally in your browser.</p>
                </div>

                {toolContent[active]?.howTo && (
                  <div className="guide-section">
                    <h4>How to use</h4>
                    <ol className="guide-steps">
                      {toolContent[active].howTo.map((step, i) => (
                        <li key={i}>
                          <span className="step-badge">{i + 1}</span>
                          <span className="step-text">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {toolContent[active]?.longDescription && (
                  <div className="guide-section guide-details">
                    <h4>Overview</h4>
                    {toolContent[active].longDescription.split('\n\n').slice(0, 2).map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}

                <div className="guide-privacy">
                  <ShieldCheck size={14} />
                  <span>100% Private — files never leave your browser</span>
                </div>

                {toolContent[active]?.faqs?.length > 0 && (
                  <button type="button" className="guide-faq-btn" onClick={() => setSideTab('faq')}>
                    <HelpCircle size={13} /> View Frequently Asked Questions →
                  </button>
                )}

                {selectedDocs.length > 0 && (
                  <div className="guide-active-file" onClick={() => setSideTab('activity')}>
                    <FileText size={14} />
                    <span>{selectedDocs.length} {selectedDocs.length === 1 ? 'file' : 'files'} selected</span>
                    <ArrowRight size={12} />
                  </div>
                )}
              </div>
            ) : sideTab === 'faq' ? (
              <div className="sidebar-faq">
                <div className="guide-header">
                  <span className="tiny-kicker">{current.group}</span>
                  <h3>{current.name} FAQs</h3>
                  <p className="guide-desc">Common questions about {current.name}.</p>
                </div>

                {toolContent[active]?.faqs?.length > 0 ? (
                  <div className="sidebar-faq-list">
                    {toolContent[active].faqs.map((faq, i) => (
                      <details key={i} className="sidebar-faq-item" open={i === 0}>
                        <summary>
                          <span>{faq.q}</span>
                          <ChevronDown size={14} />
                        </summary>
                        <p>{faq.a}</p>
                      </details>
                    ))}
                  </div>
                ) : (
                  <div className="empty-state">No FAQs available for this tool.</div>
                )}

                <div className="sidebar-faq-footer">
                  <Link to="/faq" className="sidebar-faq-more">View General Help Center →</Link>
                </div>
              </div>
            ) : (
              <div className="sidebar-activity">
                <div className="activity-head"><b>Workspace activity</b><MoreHorizontal size={17} /></div>
                <div className="privacy-note"><LockKeyhole size={16} /><span><b>Private by design</b>Files are processed locally in your browser. Nothing is uploaded to a server.</span></div>
                <div className="file-summary">
                  <span>SELECTED FILES</span>
                  {selectedDocs.length ? selectedDocs.map(doc => (
                    <div key={doc.id}><FileText size={18} /><p><b>{doc.name}</b><small>{engine.formatBytes(doc.size)}{doc.pages ? ` · ${doc.pages} pages` : ''}</small></p></div>
                  )) : <div className="empty-state">No files selected yet.</div>}
                </div>
                <div className="recent">
                  <span>RECENT OUTPUTS</span>
                  {history.length ? history.map(item => (
                    <div key={item.name + item.time}><FileDown size={15} /><p><b>{item.name}</b><small>{item.tool} · {item.time}</small></p></div>
                  )) : <div className="empty-state">Your completed files will appear here.</div>}
                </div>
              </div>
            )}
            </div>
          </aside>
        </div>
      </div>
      {modal && <UploadModal accept={accept} label={allowedLabel} multiple={multiple.has(active) || active === 'merge'} onClose={() => setModal(false)} onFiles={addFiles} />}
      {toast && <div className="toast"><Check size={16} />{toast}</div>}
    </>
  );
}
