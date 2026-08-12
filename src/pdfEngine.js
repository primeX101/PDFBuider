import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib';
import * as pdfjsLib from 'pdfjs-dist';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, Footer, PageNumber } from 'docx';
import { jsPDF } from 'jspdf';
import mammoth from 'mammoth';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import PptxGenJS from 'pptxgenjs';

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

export const isPdf = (file) => file?.type === 'application/pdf' || file?.name?.toLowerCase().endsWith('.pdf');
export const fileBase = (name = 'document') => name.replace(/\.[^.]+$/, '').replace(/[^a-z0-9-_]+/gi, '-').replace(/-+$/, '') || 'document';
export const formatBytes = (size = 0) => size < 1024 * 1024 ? `${Math.max(1, Math.round(size / 1024))} KB` : `${(size / 1024 / 1024).toFixed(1)} MB`;
export const download = ({ blob, name }) => { const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 2000); };
export const asArrayBuffer = async (file) => {
  if (!file) return new ArrayBuffer(0);
  if (file instanceof ArrayBuffer) return file;
  if (ArrayBuffer.isView(file)) return file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength);
  if (typeof file.arrayBuffer === 'function') return await file.arrayBuffer();
  return file;
};
export async function pageCount(file) { const doc = await PDFDocument.load(await asArrayBuffer(file)); return doc.getPageCount(); }
export async function extractPdfText(file, progress) {
  progress?.('Reading document textâ€¦');
  const bytes = new Uint8Array(await asArrayBuffer(file));
  const pdfDoc = await pdfjsLib.getDocument({ data: bytes }).promise;
  let pages = [];

  for (let n = 1; n <= pdfDoc.numPages; n++) {
    progress?.(`Reading page ${n} of ${pdfDoc.numPages}â€¦`);
    const page = await pdfDoc.getPage(n);
    const content = await page.getTextContent();

    if (!content.items || content.items.length === 0) {
      pages.push('');
      continue;
    }

    const items = content.items
      .filter(item => item.str && item.str.trim().length > 0)
      .map(item => ({
        str: item.str,
        x: item.transform ? item.transform[4] : 0,
        y: item.transform ? item.transform[5] : 0,
        width: item.width || 0,
        fontSize: item.transform ? Math.abs(item.transform[0]) || Math.abs(item.transform[3]) || 10 : 10
      }));

    items.sort((a, b) => b.y - a.y || a.x - b.x);

    let lines = [];
    let curLine = [];
    let curY = null;
    let lineFontSize = 10;

    for (const item of items) {
      if (curY === null || Math.abs(curY - item.y) <= Math.max(lineFontSize, item.fontSize) * 0.35 || Math.abs(curY - item.y) <= 3.5) {
        curLine.push(item);
        if (curY === null) curY = item.y;
        lineFontSize = Math.max(lineFontSize, item.fontSize);
      } else {
        lines.push(formatLineText(curLine));
        curLine = [item];
        curY = item.y;
        lineFontSize = item.fontSize;
      }
    }
    if (curLine.length > 0) {
      lines.push(formatLineText(curLine));
    }

    pages.push(lines.join('\n'));
  }

  return pages;
}

export async function extractPdfTextWithFallback(file, progress) {
  const pages = await extractPdfText(file, progress);
  const combined = pages.join('\n\n').trim();
  const alphaChars = (combined.match(/[a-zA-Z0-9]/g) || []).length;
  if (alphaChars < 20 && isPdf(file)) {
    progress?.('No text layer found. Running OCR on scanned documentâ€¦');
    const ocrText = await ocrPdf(file, progress);
    return [ocrText];
  }
  return pages;
}

function formatLineText(items) {
  items.sort((a, b) => a.x - b.x);
  let lineStr = '';
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const prev = i > 0 ? items[i - 1] : null;
    let space = '';
    if (prev) {
      const gap = item.x - (prev.x + prev.width);
      if (gap > prev.fontSize * 0.15 && !prev.str.endsWith(' ') && !item.str.startsWith(' ')) {
        space = ' ';
      }
    }
    lineStr += space + item.str;
  }
  return lineStr.replace(/\s+/g, ' ').trim();
}
function ranges(source, max) {
  const items = source.split(',').flatMap(part => { const [start, end = start] = part.trim().split('-').map(x => Number(x.trim())); if (!Number.isInteger(start) || !Number.isInteger(end)) return []; const lo = Math.max(1, Math.min(start, end)); const hi = Math.min(max, Math.max(start, end)); return Array.from({ length: hi - lo + 1 }, (_, i) => lo + i - 1); });
  return [...new Set(items)];
}
async function outputPdf(pdf, name) {
  const bytes = await pdf.save({ useObjectStreams: true, addDefaultPage: false });
  const safeBuffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  return { blob: new Blob([safeBuffer], { type: 'application/pdf' }), name };
}
async function loaded(file) { return PDFDocument.load(await asArrayBuffer(file)); }
export async function mergePdfs(files, progress) { const merged = await PDFDocument.create(); for (let i = 0; i < files.length; i++) { progress?.(`Merging ${i + 1} of ${files.length}â€¦`); const source = await loaded(files[i]); const copied = await merged.copyPages(source, source.getPageIndices()); copied.forEach(page => merged.addPage(page)); } return outputPdf(merged, `paperly-merged-${Date.now()}.pdf`); }
export async function splitPdf(file, option, progress) { const source = await loaded(file); const selected = ranges(option.range || '1', source.getPageCount()); if (!selected.length) throw new Error('Enter a valid page range, such as 1-3, 6.'); const result = await PDFDocument.create(); progress?.('Extracting selected pagesâ€¦'); const copied = await result.copyPages(source, selected); copied.forEach(page => result.addPage(page)); return outputPdf(result, `${fileBase(file.name)}-pages-${option.range.replace(/\s/g, '')}.pdf`); }
export async function rotatePdf(file, option, progress) { const pdf = await loaded(file); const selected = ranges(option.range || `1-${pdf.getPageCount()}`, pdf.getPageCount()); if (!selected.length) throw new Error('Enter a valid page range.'); progress?.('Rotating pagesâ€¦'); selected.forEach(index => { const page = pdf.getPage(index); page.setRotation(degrees((page.getRotation().angle + Number(option.angle || 90)) % 360)); }); return outputPdf(pdf, `${fileBase(file.name)}-rotated.pdf`); }
export async function deletePages(file, option, progress) { const source = await loaded(file); const removal = new Set(ranges(option.range || '', source.getPageCount())); if (!removal.size) throw new Error('Enter pages to remove, such as 2, 5-7.'); if (removal.size >= source.getPageCount()) throw new Error('Keep at least one page in the PDF.'); const pdf = await PDFDocument.create(); progress?.('Removing selected pagesâ€¦'); const keep = source.getPageIndices().filter(i => !removal.has(i)); const copied = await pdf.copyPages(source, keep); copied.forEach(p => pdf.addPage(p)); return outputPdf(pdf, `${fileBase(file.name)}-edited.pdf`); }
export async function reorderPdf(file, option, progress) { const source = await loaded(file); const order = option.order.split(',').map(x => Number(x.trim()) - 1).filter(n => Number.isInteger(n) && n >= 0 && n < source.getPageCount()); if (order.length !== source.getPageCount() || new Set(order).size !== order.length) throw new Error(`Enter every page once, e.g. ${Array.from({ length: source.getPageCount() }, (_, i) => i + 1).reverse().join(', ')}.`); const pdf = await PDFDocument.create(); progress?.('Reordering pagesâ€¦'); const copied = await pdf.copyPages(source, order); copied.forEach(p => pdf.addPage(p)); return outputPdf(pdf, `${fileBase(file.name)}-reordered.pdf`); }
export async function watermarkPdf(file, option, progress) { const pdf = await loaded(file); const font = await pdf.embedFont(StandardFonts.HelveticaBold); const text = option.text?.trim() || 'CONFIDENTIAL'; progress?.('Adding watermarkâ€¦'); pdf.getPages().forEach(page => { const { width, height } = page.getSize(); const size = Math.min(width, height) / 10; const textWidth = font.widthOfTextAtSize(text, size); page.drawText(text, { x: (width - textWidth) / 2, y: height / 2, size, font, color: rgb(.35, .42, .38), opacity: .26, rotate: degrees(-35) }); }); return outputPdf(pdf, `${fileBase(file.name)}-watermarked.pdf`); }
export async function signPdf(file, option, progress) { const pdf = await loaded(file); const font = await pdf.embedFont(StandardFonts.HelveticaOblique); const page = pdf.getPages()[Math.max(0, Math.min(pdf.getPageCount() - 1, Number(option.page || 1) - 1))]; const { width } = page.getSize(); progress?.('Placing your signatureâ€¦'); page.drawText(option.signature?.trim() || 'Signed', { x: Number(option.x || 48), y: Number(option.y || 48), size: 22, font, color: rgb(.05, .28, .24) }); page.drawText(`Digitally signed ${new Date().toLocaleDateString()}`, { x: Number(option.x || 48), y: Number(option.y || 48) - 15, size: 7, color: rgb(.25, .35, .31) }); return outputPdf(pdf, `${fileBase(file.name)}-signed.pdf`); }
export async function compactPdf(file, progress) {
  progress?.('Rebuilding PDF structureâ€¦');
  const source = await loaded(file);
  const compact = await PDFDocument.create();
  const copied = await compact.copyPages(source, source.getPageIndices());
  copied.forEach(page => compact.addPage(page));
  compact.setProducer('Paperly PDF Tools');
  compact.setCreator('Paperly PDF Tools');
  return outputPdf(compact, `${fileBase(file.name)}-optimized.pdf`);
}
export async function pdfToWord(file, progress) {
  progress?.('Extracting document layout & structureâ€¦');
  const bytes = new Uint8Array(await asArrayBuffer(file));
  const pdfDoc = await pdfjsLib.getDocument({ data: bytes }).promise;
  const numPages = pdfDoc.numPages;

  let pageData = [];
  let fontSizes = [];

  for (let n = 1; n <= numPages; n++) {
    progress?.(`Analyzing page ${n} of ${numPages}â€¦`);
    const page = await pdfDoc.getPage(n);
    const content = await page.getTextContent();

    if (!content.items || content.items.length === 0) {
      pageData.push({ pageIndex: n, lines: [] });
      continue;
    }

    const items = content.items
      .filter(item => item.str && item.str.trim().length > 0)
      .map(item => {
        const transform = item.transform || [10, 0, 0, 10, 0, 0];
        const x = transform[4] || 0;
        const y = transform[5] || 0;
        const fontSize = Math.abs(transform[0]) || Math.abs(transform[3]) || item.height || 10;
        const fontName = (item.fontName || '').toLowerCase();
        const isBold = /bold|black|heavy|semibold|medium/i.test(fontName);
        const isItalic = /italic|oblique/i.test(fontName);

        fontSizes.push(fontSize);

        return {
          str: item.str,
          x: Math.round(x * 10) / 10,
          y: Math.round(y * 10) / 10,
          fontSize: Math.round(fontSize * 10) / 10,
          fontName: item.fontName,
          isBold,
          isItalic,
          width: item.width || 0,
          height: item.height || fontSize,
          hasEOL: item.hasEOL || false
        };
      });

    items.sort((a, b) => b.y - a.y || a.x - b.x);

    let lines = [];
    let currentLineItems = [];
    let currentY = null;
    let lineFontSize = 10;

    for (const item of items) {
      if (currentY === null || Math.abs(currentY - item.y) <= Math.max(lineFontSize, item.fontSize) * 0.35 || Math.abs(currentY - item.y) <= 3.5) {
        currentLineItems.push(item);
        if (currentY === null) currentY = item.y;
        lineFontSize = Math.max(lineFontSize, item.fontSize);
      } else {
        lines.push(buildLine(currentLineItems));
        currentLineItems = [item];
        currentY = item.y;
        lineFontSize = item.fontSize;
      }
    }
    if (currentLineItems.length > 0) {
      lines.push(buildLine(currentLineItems));
    }

    pageData.push({ pageIndex: n, lines });
  }

  fontSizes.sort((a, b) => a - b);
  const medianBodySize = fontSizes.length > 0 ? fontSizes[Math.floor(fontSizes.length / 2)] : 10.5;

  let docxParagraphs = [];

  for (let pageIdx = 0; pageIdx < pageData.length; pageIdx++) {
    const { pageIndex, lines } = pageData[pageIdx];
    if (lines.length === 0) {
      docxParagraphs.push(
        new Paragraph({
          pageBreakBefore: pageIdx > 0,
          children: [new TextRun({ text: '[No selectable text on page]', italics: true, color: '888888', size: 20 })]
        })
      );
      continue;
    }

    let pageParas = [];
    let curParaLines = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const prevLine = i > 0 ? lines[i - 1] : null;

      let isNewPara = false;
      if (!prevLine) {
        isNewPara = true;
      } else {
        const deltaY = prevLine.y - line.y;
        const maxFont = Math.max(line.maxFontSize, prevLine.maxFontSize);

        if (deltaY > maxFont * 1.55) {
          isNewPara = true;
        } else if (Math.abs(line.maxFontSize - prevLine.maxFontSize) >= 2.0) {
          isNewPara = true;
        } else if (line.isBold !== prevLine.isBold && (line.text.length < 80 || prevLine.text.length < 80)) {
          isNewPara = true;
        } else if (/^([\bullet\u2022\u25cf\u25cb\-â€“\â€”]|\d+[\.\)]|[a-zA-Z][\.\)])\s+/.test(line.text.trim())) {
          isNewPara = true;
        } else if (/^(abstract|introduction|background|methodology|methods|results|discussion|conclusion|references|acknowledgments|keywords|figure\s+\d+|table\s+\d+|doi:)/i.test(line.text.trim())) {
          isNewPara = true;
        } else if (Math.abs(line.x - prevLine.x) > 18 && /[.\:!?]$/.test(prevLine.text.trim())) {
          isNewPara = true;
        }
      }

      if (isNewPara && curParaLines.length > 0) {
        pageParas.push(assembleParagraph(curParaLines, medianBodySize, pageIdx === 0 && pageParas.length === 0));
        curParaLines = [];
      }
      curParaLines.push(line);
    }
    if (curParaLines.length > 0) {
      pageParas.push(assembleParagraph(curParaLines, medianBodySize, pageIdx === 0 && pageParas.length === 0));
    }

    if (pageIdx > 0 && pageParas.length > 0) {
      pageParas[0].pageBreakBefore = true;
    }

    docxParagraphs.push(...pageParas);
  }

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 }
        }
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({ text: 'Page ', color: '64748B', size: 18, font: 'Calibri' }),
                PageNumber.CURRENT,
                new TextRun({ text: ' of ', color: '64748B', size: 18, font: 'Calibri' }),
                PageNumber.TOTAL_PAGES
              ]
            })
          ]
        })
      },
      children: docxParagraphs.length > 0 ? docxParagraphs : [
        new Paragraph({ children: [new TextRun({ text: 'No text extracted from PDF file.', size: 22 })] })
      ]
    }]
  });

  progress?.('Building Word document (.docx)â€¦');
  return { blob: await Packer.toBlob(doc), name: `${fileBase(file.name)}.docx` };
}

function buildLine(items) {
  items.sort((a, b) => a.x - b.x);

  let runs = [];
  let fullText = '';
  let maxFontSize = 0;
  let boldCharCount = 0;
  let totalCharCount = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const prevItem = i > 0 ? items[i - 1] : null;

    let prefixSpace = '';
    if (prevItem) {
      const expectedNextX = prevItem.x + prevItem.width;
      const gap = item.x - expectedNextX;
      if (gap > prevItem.fontSize * 0.15 && !prevItem.str.endsWith(' ') && !item.str.startsWith(' ')) {
        prefixSpace = ' ';
      }
    }

    const textPart = prefixSpace + item.str;
    fullText += textPart;
    maxFontSize = Math.max(maxFontSize, item.fontSize);
    totalCharCount += item.str.length;
    if (item.isBold) boldCharCount += item.str.length;

    if (runs.length > 0) {
      const lastRun = runs[runs.length - 1];
      if (lastRun.isBold === item.isBold && lastRun.isItalic === item.isItalic && Math.abs(lastRun.fontSize - item.fontSize) < 1.0) {
        lastRun.text += textPart;
        continue;
      }
    }

    runs.push({
      text: textPart,
      fontSize: item.fontSize,
      isBold: item.isBold,
      isItalic: item.isItalic
    });
  }

  return {
    x: items[0]?.x || 0,
    y: items[0]?.y || 0,
    maxFontSize: maxFontSize || 10,
    isBold: totalCharCount > 0 && boldCharCount / totalCharCount > 0.5,
    text: fullText,
    runs
  };
}

function assembleParagraph(lines, medianBodySize, isFirstDocPara = false) {
  let mergedRuns = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let lineRuns = line.runs.map(r => ({ ...r }));

    if (i < lines.length - 1 && line.text.trim().endsWith('-')) {
      const lastRun = lineRuns[lineRuns.length - 1];
      if (lastRun) {
        lastRun.text = lastRun.text.trimEnd().replace(/-$/, '');
      }
    } else if (i < lines.length - 1) {
      const lastRun = lineRuns[lineRuns.length - 1];
      if (lastRun && !lastRun.text.endsWith(' ')) {
        lastRun.text += ' ';
      }
    }

    mergedRuns.push(...lineRuns);
  }

  const fullText = mergedRuns.map(r => r.text).join('').trim();
  const maxFontSize = Math.max(...lines.map(l => l.maxFontSize), medianBodySize);
  const isBoldPara = lines.every(l => l.isBold) || (lines[0]?.isBold && fullText.length < 80);
  const isItalicPara = mergedRuns.every(r => r.isItalic);

  let headingLevel = undefined;
  let alignment = AlignmentType.LEFT;
  let spacing = { before: 0, after: 120, line: 276 };

  if (isFirstDocPara || ((maxFontSize >= medianBodySize * 1.35 || (maxFontSize >= medianBodySize * 1.25 && isBoldPara && fullText.length < 120)) && !fullText.endsWith('.'))) {
    headingLevel = HeadingLevel.HEADING_1;
    spacing = { before: 240, after: 120, line: 276 };
  } else if ((maxFontSize >= medianBodySize * 1.15 || (isBoldPara && fullText.length < 80)) && !fullText.endsWith('.')) {
    headingLevel = HeadingLevel.HEADING_2;
    spacing = { before: 180, after: 80, line: 276 };
  } else if (isBoldPara && fullText.length < 60 && /^\d+(\.\d+)*\s+/.test(fullText)) {
    headingLevel = HeadingLevel.HEADING_3;
    spacing = { before: 140, after: 60, line: 276 };
  } else if (/^([\bullet\u2022\u25cf\u25cb\-â€“\â€”]|\d+[\.\)]|[a-zA-Z][\.\)])\s+/.test(fullText)) {
    spacing = { before: 40, after: 40, line: 276 };
  } else if (/^(doi:|article in|citations|reads|author|published|figure\s+\d+|table\s+\d+|http)/i.test(fullText) || (maxFontSize < medianBodySize * 0.9 && isItalicPara)) {
    spacing = { before: 60, after: 60, line: 240 };
  }

  const children = mergedRuns.map(run => {
    let size = Math.round(run.fontSize * 2);
    let color = '1F2937';

    if (headingLevel === HeadingLevel.HEADING_1) {
      size = Math.round(Math.max(run.fontSize, medianBodySize * 1.5) * 2);
      color = '0F172A';
    } else if (headingLevel === HeadingLevel.HEADING_2) {
      size = Math.round(Math.max(run.fontSize, medianBodySize * 1.25) * 2);
      color = '1E3A8A';
    } else if (headingLevel === HeadingLevel.HEADING_3) {
      size = Math.round(Math.max(run.fontSize, medianBodySize * 1.1) * 2);
      color = '334155';
    } else if (/^(doi:|article in|citations|reads|author|published|figure\s+\d+|table\s+\d+|http)/i.test(fullText)) {
      color = '4B5563';
    }

    return new TextRun({
      text: run.text,
      size,
      bold: run.isBold || headingLevel !== undefined,
      italics: run.isItalic,
      color,
      font: 'Calibri'
    });
  });

  return new Paragraph({
    heading: headingLevel,
    alignment,
    spacing,
    children: children.length > 0 ? children : [new TextRun({ text: fullText, font: 'Calibri' })]
  });
}
export async function pdfToExcel(file, progress) { const pages = await extractPdfText(file, progress); const rows = pages.flatMap((text, p) => text.split(/(?<=[.!?])\s+|\n/).filter(Boolean).map((line, i) => ({ Page: p + 1, Line: i + 1, Content: line }))); const wb = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(rows.length ? rows : [{ Page: 1, Line: 1, Content: 'No selectable text found.' }]), 'PDF text'); return { blob: new Blob([XLSX.write(wb, { bookType: 'xlsx', type: 'array' })], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), name: `${fileBase(file.name)}.xlsx` }; }
export async function pdfToPpt(file, progress) { const pages = await extractPdfText(file, progress); const pptx = new PptxGenJS(); pptx.layout = 'LAYOUT_WIDE'; pages.forEach((text, i) => { const slide = pptx.addSlide(); slide.background = { color: 'F7F7F3' }; slide.addText(`Page ${i + 1}`, { x: .6, y: .5, w: 10, h: .4, fontFace: 'Aptos', fontSize: 16, bold: true, color: '0B463D' }); slide.addText(text || 'No selectable text found on this page.', { x: .6, y: 1.2, w: 11.8, h: 5.5, fontFace: 'Aptos', fontSize: 18, color: '28332E', breakLine: false, fit: 'shrink' }); }); const data = await pptx.write({ outputType: 'blob' }); return { blob: data, name: `${fileBase(file.name)}.pptx` }; }
export async function pdfToJpg(file, progress) { const bytes = new Uint8Array(await asArrayBuffer(file)); const doc = await pdfjsLib.getDocument({ data: bytes }).promise; const zip = new JSZip(); for (let n = 1; n <= doc.numPages; n++) { progress?.(`Rendering page ${n} of ${doc.numPages}â€¦`); const page = await doc.getPage(n); const viewport = page.getViewport({ scale: 1.7 }); const canvas = document.createElement('canvas'); canvas.width = viewport.width; canvas.height = viewport.height; await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise; const jpeg = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', .9)); zip.file(`${fileBase(file.name)}-page-${n}.jpg`, jpeg); } const blob = await zip.generateAsync({ type: 'blob' }); return { blob, name: `${fileBase(file.name)}-images.zip` }; }
function linesToPdf(lines, name) { const pdf = new jsPDF({ unit: 'pt', format: 'a4' }); const margin = 48, lineHeight = 16, maxWidth = 499; let y = 58; lines.forEach(line => { const chunks = pdf.splitTextToSize(String(line || ' '), maxWidth); chunks.forEach(chunk => { if (y > 790) { pdf.addPage(); y = 58; } pdf.text(chunk, margin, y); y += lineHeight; }); }); return { blob: pdf.output('blob'), name }; }
export async function wordToPdf(file, progress) { progress?.('Reading Word documentâ€¦'); const buf = await asArrayBuffer(file); const result = await mammoth.extractRawText({ arrayBuffer: buf, buffer: buf }); return linesToPdf(result.value.split(/\r?\n/), `${fileBase(file.name)}.pdf`); }
export async function excelToPdf(file, progress) { progress?.('Reading spreadsheetâ€¦'); const workbook = XLSX.read(await asArrayBuffer(file), { type: 'array' }); const lines = workbook.SheetNames.flatMap(name => { const rows = XLSX.utils.sheet_to_json(workbook.Sheets[name], { header: 1, defval: '' }); return [`${name}`, ...rows.map(r => r.join('   |   ')), '']; }); return linesToPdf(lines, `${fileBase(file.name)}.pdf`); }
export async function pptToPdf(file, progress) { progress?.('Reading presentationâ€¦'); const zip = await JSZip.loadAsync(await asArrayBuffer(file)); const slides = Object.keys(zip.files).filter(name => /^ppt\/slides\/slide\d+\.xml$/.test(name)).sort((a,b) => Number(a.match(/\d+/).at(-1)) - Number(b.match(/\d+/).at(-1))); const lines = []; for (const name of slides) { const xml = await zip.file(name).async('string'); const slideNo = name.match(/\d+/).at(-1); lines.push(`Slide ${slideNo}`); lines.push(...[...xml.matchAll(/<a:t>(.*?)<\/a:t>/g)].map(m => m[1].replace(/&amp;/g, '&').replace(/&lt;/g, '<'))); lines.push(''); } return linesToPdf(lines.length ? lines : ['No readable slide text was found.'], `${fileBase(file.name)}.pdf`); }
export async function ocrPdf(file, progress) { const { createWorker } = await import('tesseract.js'); const bytes = new Uint8Array(await asArrayBuffer(file)); const doc = await pdfjsLib.getDocument({ data: bytes }).promise; const worker = await createWorker('eng', 1, { logger: m => m.status === 'recognizing text' && progress?.(`OCR ${Math.round((m.progress || 0) * 100)}%â€¦`) }); let all = []; for (let n = 1; n <= doc.numPages; n++) { progress?.(`Preparing page ${n} of ${doc.numPages}â€¦`); const page = await doc.getPage(n); const viewport = page.getViewport({ scale: 2 }); const canvas = document.createElement('canvas'); canvas.width = viewport.width; canvas.height = viewport.height; await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise; const { data } = await worker.recognize(canvas); all.push(`Page ${n}\n${data.text.trim()}`); } await worker.terminate(); return all.join('\n\n'); }
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
// PAPERLY NLP ENGINE v2  â€“  Domain-aware document intelligence
// â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

// â”€â”€ Utility: strip OCR noise â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function sanitizeOcrText(raw) {
  if (!raw) return '';
  return raw
    .split('\n')
    .map(line => line.replace(/\s+/g, ' ').trim())
    .filter(line => {
      if (!line || line.length < 2) return false;
      // Drop lines where less than half the chars are readable
      const readable = (line.match(/[a-zA-Z0-9â‚¹$â‚¬Â£.,:\-()/]/g) || []).length;
      if (readable / line.length < 0.45 && line.length > 10) return false;
      return true;
    })
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// â”€â”€ Utility: simple sentence splitter â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function splitSentences(text) {
  const protected_ = text.replace(
    /(?:e\.g\.|i\.e\.|vol\.|no\.|vs\.|dr\.|prof\.|mr\.|mrs\.|ms\.|inc\.|ltd\.|co\.|pp\.)/gi,
    m => m.replace(/\./g, '___DOT___')
  );
  return (protected_.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [])
    .map(s => s.replace(/___DOT___/g, '.').replace(/\s+/g, ' ').trim())
    .filter(Boolean);
}

function isGoodSentence(s) {
  if (!s || s.length < 35 || s.length > 380) return false;
  const wc = s.split(/\s+/).length;
  if (wc < 6 || wc > 60) return false;
  if (/^(see discussions|vol\s*\d+|issn|doi:|http|https|www\.|downloaded from|page \d+ of \d+|\d+\s*\|\s*page|journal of|proceedings of|copyright|rights reserved|abstract|references)/i.test(s)) return false;
  const sym = (s.match(/[+*\/\\=<>@#$^~_{}]/g) || []).length;
  if (sym > 2 && sym / s.length > 0.06) return false;
  const letters = (s.match(/[a-zA-Z]/g) || []).length;
  if (letters / s.length < 0.55) return false;
  return true;
}

function stripPrefixJunk(s) {
  return s
    .replace(/^(?:(?:[a-z0-9-]+\.)*(?:com|org|net|edu|gov|io)\s*|issn\s*[\d-]+\s*|vol\s*\d+[^\n]*?\s*)+/gi, '')
    .replace(/^(?:ABSTRACT|OVERVIEW|INTRODUCTION|METHODOLOGY|RESULTS|DISCUSSION|CONCLUSION|EXECUTIVE SUMMARY|SUMMARY|\d+\.\s*[A-Z\s]{2,})\s*/gi, '')
    .trim();
}

function jaccardSim(a, b) {
  const A = new Set(a.toLowerCase().match(/[a-z]{3,}/g) || []);
  const B = new Set(b.toLowerCase().match(/[a-z]{3,}/g) || []);
  if (!A.size || !B.size) return 0;
  let n = 0;
  A.forEach(w => { if (B.has(w)) n++; });
  return n / Math.min(A.size, B.size);
}

// â”€â”€ Document classification â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DOC_SIGNATURES = [
  {
    type: 'ticket',
    signals: ['pnr', 'boarding pass', 'e-ticket', 'irctc', 'berth', 'coach', 'train no', 'flight no',
              'passenger', 'journey date', 'class', 'confirmation', 'waitlist', 'cnf', 'rac',
              'departure station', 'arrival station', 'seat no', 'booking id', 'tatkal'],
    min: 2
  },
  {
    type: 'invoice',
    signals: ['invoice', 'bill to', 'ship to', 'subtotal', 'amount due', 'payment due', 'due date',
              'gst', 'vat', 'hsn', 'invoice no', 'invoice number', 'tax invoice', 'balance due',
              'remit to', 'purchase order', 'po number'],
    min: 2
  },
  {
    type: 'contract',
    signals: ['agreement', 'parties', 'whereas', 'shall', 'hereby', 'indemnify', 'indemnification',
              'liability', 'termination', 'governing law', 'jurisdiction', 'arbitration',
              'confidentiality', 'intellectual property', 'covenant', 'represent', 'warranty'],
    min: 3
  },
  {
    type: 'academic',
    signals: ['abstract', 'introduction', 'methodology', 'conclusion', 'references', 'hypothesis',
              'literature review', 'doi:', 'journal of', 'vol.', 'issn', 'findings',
              'experiment', 'proposed method', 'related work'],
    min: 2
  },
  {
    type: 'report',
    signals: ['executive summary', 'table of contents', 'recommendations', 'appendix',
              'quarterly', 'annual report', 'fiscal year', 'key performance', 'kpi',
              'background', 'objectives', 'deliverable'],
    min: 2
  }
];

function classifyDocument(text) {
  const lower = text.toLowerCase();
  let best = { type: 'general', score: 0 };
  for (const sig of DOC_SIGNATURES) {
    const score = sig.signals.filter(s => lower.includes(s)).length;
    if (score >= sig.min && score > best.score) best = { type: sig.type, score };
  }
  return best.type;
}

// â”€â”€ Entity extraction â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function extractEntities(text) {
  const DATE_RE = /\b(?:\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\d{4}[\/\-]\d{2}[\/\-]\d{2}|\d{1,2}[\/\-](?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)[\-\/]\d{2,4}|(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{1,2}[,\s]+\d{4}|\d{1,2}\s+(?:jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\s+\d{4})\b/gi;
  // Require digit immediately after currency symbol to prevent spurious matches like 'Rs,' or 'rs.'
  const AMOUNT_RE = /(?:\u20b9|\bINR\b|\bUSD\b|\bGBP\b|\bEUR\b)\s?[\d,]+(?:\.\d{1,2})?|(?:\$|\u20ac|\u00a3)\s?[\d,]+(?:\.\d{1,2})?|\bRs\.?\s?(?=[\d,])[\d,]+(?:\.\d{1,2})?|\b[\d,]{4,}\.\d{2}\s*(?:\bINR\b|\bUSD\b|\bGBP\b|\bEUR\b)/gi;

  const dates = [...new Set(text.match(DATE_RE) || [])];
  const amounts = [...new Set(text.match(AMOUNT_RE) || [])];

  const pnrM = text.match(/\bPNR\b\s*[:#\-\s]*([0-9]{10})\b/i) || 
               text.match(/(?:PNR|booking\s*(?:no|ref|id|number)?|ticket\s*(?:no|number|id)?|ref(?:erence)?)\s*[:#\-]\s*([A-Z0-9]{6,15})\b/i) || 
               text.match(/\b(?:PNR|booking\s*(?:no|ref|id|number)?|ticket\s*(?:no|number|id)?|ref(?:erence)?)\s+([A-Z0-9]*\d[A-Z0-9]*)\b/i);
  const pnr = pnrM ? pnrM[1] : null;

  const invM = text.match(/(?:invoice|ticket|order|bill)\s*(?:no|number|#|id)?\s*[:#\-]\s*([A-Z0-9\-\/]{3,25})\b/i) || 
               text.match(/(?:invoice|ticket|order|bill)\s*(?:no|number|#|id)?\s+([A-Z0-9\-\/]*\d[A-Z0-9\-\/]*)\b/i);
  const invoiceNo = invM ? invM[1] : null;

  const trainM = text.match(/(?:train\s*(?:no|number|#)?|train\/)\s*[:#\-]?\s*(\d{4,5})/i);
  const flightM = text.match(/(?:flight\s*(?:no|number)?)\s*[:#\-]?\s*([A-Z]{2}\s*\d{3,4})/i);
  const transportNo = (trainM ? trainM[1] : null) || (flightM ? flightM[1] : null);

  const trainNameM = text.match(/\b([A-Z][A-Z\s]{3,}(?:EXPRESS|EXP|RAJDHANI|SHATABDI|DURONTO|MAIL|SUPERFAST|SPECIAL|SF|SPL))\b/i);
  const transportName = trainNameM ? trainNameM[1].replace(/\s+/g, ' ').trim() : null;

  const routeM = text.match(/(?:from|origin|boarding|source)\s*[:\-]?\s*([A-Z][a-zA-Z\s]{2,30}?)(?:\s+to\s+|\s*[→\->\u2192]\s*)([A-Z][a-zA-Z\s]{2,30})(?=\s*(?:on|date|class|seat|,|\.|\n|$))/i);
  const route = routeM ? { from: routeM[1].trim(), to: routeM[2].trim() } : null;

  const classM = text.match(/(?:class|travel\s*class|coach\s*type|accommodation)\s*[:\-]?\s*([A-Z0-9]{1,5})\b/i);
  const travelClass = classM ? classM[1] : null;

  const statusM = text.match(/\b(CNF|Confirmed|WL\s*\d*|RAC\s*\d*|Waitlisted|CANCELLED|GNWL|PQWL|RLWL|TQWL)\b/i);
  const status = statusM ? statusM[1] : null;

  const vendorM = text.match(/(?:from|vendor|supplier|seller|billed?\s*by|issued\s*by|service\s*provider)\s*[:\-]?\s*([A-Z][a-zA-Z\s&.,]+?(?:Ltd|Inc|Pvt|LLP|Corp|Co\.?|Services|Solutions|Technologies|Railway|Airlines|Airways|IRCTC)?\.?)\s*(?:\n|,|$)/i);
  const vendor = vendorM ? vendorM[1].replace(/\s+/g, ' ').trim() : null;

  // Passenger names: stop before keywords like Age, Gender, Seat, Class, Berth, Quota, Status
  const personsRaw = [...text.matchAll(/(?:passenger|traveller|passenger\s*name|pax|traveller\s*name)\s*\d*\s*[:\-]?\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,3})(?=\s+(?:Age|Gender|Seat|Class|Berth|Quota|Status|DOB|M\b|F\b|\d))/gi)];
  const persons = [...new Set(personsRaw.map(m => m[1].trim()))];

  // Convenience / service fee: specific line extraction
  const convM = text.match(/(?:convenience\s*fee|service\s*charge|irctc\s*fee|booking\s*fee)[^\n]*?([\u20b9$\u20ac\u00a3]|Rs\.?|INR|USD)\s?([\d,]+(?:\.\d{1,2})?)/i);
  const convenienceFee = convM ? `${convM[1]}${convM[2]}` : null;

  return { dates, amounts, pnr, invoiceNo, transportNo, transportName, route, travelClass, status, vendor, persons, convenienceFee };
}

// â”€â”€ Grounded context finder â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function findGroundingLine(text, values) {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 5 && l.length < 300);
  for (const val of (Array.isArray(values) ? values : [values])) {
    if (!val || val.length < 3) continue;
    const line = lines.find(l => l.toLowerCase().includes(String(val).toLowerCase()));
    if (line) return line;
  }
  return null;
}

// â”€â”€ Domain-specific summary builders â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function buildTicketSummary(text, entities) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  const parts = [];
  if (entities.pnr) parts.push(`PNR: ${entities.pnr}`);
  if (entities.transportNo) {
    parts.push(entities.transportName
      ? `Train: ${entities.transportNo} / ${entities.transportName}`
      : `Service No: ${entities.transportNo}`);
  }
  if (entities.route) parts.push(`Route: ${entities.route.from} â†’ ${entities.route.to}`);
  if (entities.dates.length > 0) parts.push(`Journey Date: ${entities.dates[0]}`);
  if (entities.travelClass) parts.push(`Class: ${entities.travelClass}`);
  if (entities.status) parts.push(`Status: ${entities.status}`);
  const uniqueFareAmts = [...new Set(entities.amounts)];
  const primaryFare = uniqueFareAmts[uniqueFareAmts.length - 1] || null;
  if (primaryFare) parts.push(`Total Fare: ${primaryFare}`);
  const overview = parts.length >= 2
    ? `Travel Booking Summary | ${parts.join(' | ')}`
    : lines.filter(l => l.length > 10).slice(0, 2).join('. ');

  const keyPoints = [];
  if (entities.persons.length > 0) {
    keyPoints.push(`Passengers: ${entities.persons.join(', ')}`);
  }
  // Cancellation / refund / TDR rules from the document itself
  const ruleLines = lines.filter(l =>
    /refund|cancel|tdr|clerkage|admissible|waitlist|rac|deduct|policy|notice|hours|penalty/i.test(l)
    && l.length > 25 && l.length < 350
  ).slice(0, 4);
  keyPoints.push(...ruleLines);
  // Convenience fee / charge lines
  const feeLines = lines.filter(l =>
    /convenience\s*fee|service\s*charge|gst|irctc fee|per\s*e.ticket/i.test(l) && l.length > 8
  ).slice(0, 2);
  keyPoints.push(...feeLines);

  const keywords = [...new Set([
    'ticket', 'irctc', 'booking', 'refund', 'passenger',
    entities.pnr, entities.transportNo, entities.travelClass, entities.status
  ].filter(Boolean))].slice(0, 8);

  return {
    overview: overview.trim(),
    keyPoints: keyPoints.slice(0, 5).length > 0 ? keyPoints.slice(0, 5) : [overview],
    keywords
  };
}

function buildInvoiceSummary(text, entities) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  const parts = [];
  if (entities.invoiceNo) parts.push(`Invoice #${entities.invoiceNo}`);
  if (entities.vendor) parts.push(`From: ${entities.vendor}`);
  if (entities.dates.length > 0) parts.push(`Date: ${entities.dates[0]}`);
  const uniqueInvAmts = [...new Set(entities.amounts)];
  if (uniqueInvAmts.length > 0) parts.push(`Total: ${uniqueInvAmts[uniqueInvAmts.length - 1]}`);
  const overview = parts.length >= 2
    ? `Invoice Summary | ${parts.join(' | ')}`
    : lines.filter(l => l.length > 5).slice(0, 2).join('. ');

  const keyPoints = lines.filter(l =>
    /item|description|qty|quantity|rate|amount|tax|gst|subtotal|discount|total|due|hsn/i.test(l)
    && l.length > 5 && l.length < 250
  ).slice(0, 5);

  const keywords = [...new Set(['invoice', 'payment', 'amount', 'due', 'tax', entities.invoiceNo, entities.vendor].filter(Boolean))].slice(0, 6);

  return {
    overview: overview.trim(),
    keyPoints: keyPoints.length > 0 ? keyPoints : [overview],
    keywords
  };
}

function buildContractSummary(text, entities) {
  const sents = splitSentences(text);
  const legal = sents.filter(s =>
    /\b(shall|parties|party|liability|termination|confidential|govern|jurisdiction|arbitration|penalty|indemnif|covenant|warrant|represent|obligat|hereby|whereas)\b/i.test(s)
    && s.length >= 40 && s.length <= 450
  );

  const overview = legal.length > 0
    ? legal[0].replace(/\s+/g, ' ').trim()
    : (sents.find(s => s.length > 40) || text.slice(0, 200)).replace(/\s+/g, ' ').trim();

  const keyPoints = legal.slice(1, 6).map(s => s.replace(/\s+/g, ' ').trim());
  if (entities.dates.length > 0) keyPoints.push(`Key Dates: ${entities.dates.join(', ')}`);
  if (entities.amounts.length > 0) keyPoints.push(`Financial Terms: ${entities.amounts.join(', ')}`);

  return {
    overview,
    keyPoints: keyPoints.length > 0 ? keyPoints.slice(0, 5) : [overview],
    keywords: ['agreement', 'contract', 'party', 'liability', 'termination', 'clause']
  };
}

function buildExtractiveSummary(text, entities) {
  const cleanLines = text.split(/\r?\n/).map(l => l.replace(/\s+/g, ' ').trim()).filter(line => {
    if (!line) return false;
    if (/^(see discussions|vol\s*\d+|issn|doi:|http|https|www\.|downloaded from|page \d+ of \d+|\d+\s*\|\s*page|journal of|proceedings of|copyright|rights reserved)/i.test(line)) return false;
    const sym = (line.match(/[+*\/\\=<>@#$^~_{}Î²Î±Î³Î´Î»Î¼ÏƒÏ€Î¸]/g) || []).length;
    if (sym > 3 && sym / line.length > 0.08) return false;
    return true;
  });
  const full = cleanLines.join('\n');

  let overview = '';
  const absM = full.match(/(?:ABSTRACT|EXECUTIVE SUMMARY|SUMMARY|OVERVIEW)\s*[:\-â€”]?\s*([\s\S]{80,1800}?)(?=\n\s*\n[A-Z0-9\s\.\-]{3,40}(?:\r?\n|$)|\b(?:1\.|INTRODUCTION|KEYWORDS|METHODS|CONTENTS)\b|$)/i);
  if (absM?.[1]) {
    const s = splitSentences(absM[1].replace(/\s+/g, ' ')).map(stripPrefixJunk).filter(isGoodSentence);
    if (s.length) overview = s.slice(0, 3).join(' ');
  }
  if (!overview || overview.length < 40) {
    const cands = splitSentences(full).map(stripPrefixJunk).filter(isGoodSentence);
    overview = cands.slice(0, 2).join(' ');
  }
  if (!overview || overview.length < 20) {
    const rl = full.split(/\r?\n/).map(l => l.replace(/\s+/g, ' ').trim()).filter(l => l.length > 5);
    overview = rl.slice(0, 3).join('. ');
  }
  if (!overview) overview = 'This document contains the following information: ' + full.slice(0, 150).replace(/\s+/g, ' ').trim();

  // TF scoring
  const STOP = new Set(['this','that','with','from','have','will','your','their','were','they','about','which','there','would','could','should','into','when','where','while','document','page','table','figure','section','paper','study','author','using','used','based','results','journal','issn','vol','volume','issue','http','https','www','com','org','net','also','than','been','each','more','such','only','some','time','first','both','after','other','between','through','during']);
  const words = full.toLowerCase().match(/[a-z][a-z'-]{3,}/g) || [];
  const freq = {};
  words.forEach(w => { if (!STOP.has(w)) freq[w] = (freq[w] || 0) + 1; });

  const validSents = splitSentences(full).map(stripPrefixJunk).filter(isGoodSentence);
  const scored = validSents.map((s, i) => {
    let score = (s.toLowerCase().match(/[a-z][a-z'-]{3,}/g) || []).reduce((acc, w) => acc + (freq[w] || 0), 0);
    if (s.length >= 60 && s.length <= 220) score *= 1.3;
    if (/^(in conclusion|the results show|this paper|this study|the main|to establish|the key finding)/i.test(s)) score *= 1.5;
    if (i < 5 || i > validSents.length - 5) score *= 1.2;
    return { s, score };
  }).sort((a, b) => b.score - a.score);

  const selected = [];
  for (const { s } of scored) {
    if (selected.some(p => jaccardSim(p, s) > 0.45 || p.includes(s) || s.includes(p))) continue;
    if (s !== overview && !overview.includes(s)) selected.push(s);
    if (selected.length >= 5) break;
  }

  if (selected.length === 0) {
    const fb = full.split(/\r?\n/).map(l => l.replace(/\s+/g, ' ').trim()).filter(l => l.length >= 6 && !/^(page \d+|copyright|issn|doi:|http|https)/i.test(l));
    for (const line of fb) {
      if (!selected.includes(line) && line !== overview && !overview.includes(line)) selected.push(line);
      if (selected.length >= 5) break;
    }
  }

  const sortedKW = Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 6).map(([w]) => w);
  return { overview: overview.trim(), keyPoints: selected.length > 0 ? selected : [overview], keywords: sortedKW };
}

// â”€â”€ Public: summarizeText â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function summarizeText(text) {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return {
      overview: 'No readable text found in this document.',
      keyPoints: ['This document appears to contain no selectable or recognizable text. If it is a scanned document, use the OCR PDF tool first.'],
      keywords: []
    };
  }
  const cleaned = sanitizeOcrText(text);
  const docType = classifyDocument(cleaned);
  const entities = extractEntities(cleaned);

  if (docType === 'ticket')   return buildTicketSummary(cleaned, entities);
  if (docType === 'invoice')  return buildInvoiceSummary(cleaned, entities);
  if (docType === 'contract') return buildContractSummary(cleaned, entities);
  return buildExtractiveSummary(cleaned, entities);
}

// â”€â”€ Synonym groups for query expansion â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SYNONYM_GROUPS = [
  ['fare', 'price', 'cost', 'amount', 'total', 'fee', 'charge', 'payment', 'rate', 'money', 'pay', 'paid'],
  ['date', 'time', 'day', 'schedule', 'when', 'departure', 'arrival', 'journey', 'travel', 'booking date'],
  ['pnr', 'booking', 'ticket', 'reference', 'number', 'confirmation', 'code', 'id', 'reservation'],
  ['name', 'passenger', 'traveller', 'person', 'customer', 'holder', 'member', 'individual'],
  ['refund', 'cancel', 'cancellation', 'tdr', 'return', 'reimbursement', 'claim', 'money back'],
  ['seat', 'berth', 'coach', 'class', 'position', 'accommodation', 'bunk', 'compartment'],
  ['vendor', 'seller', 'supplier', 'company', 'organization', 'provider', 'issuer', 'party'],
  ['train', 'flight', 'bus', 'service', 'transport', 'vehicle', 'aircraft', 'locomotive'],
  ['route', 'from', 'to', 'destination', 'origin', 'source', 'journey', 'travel', 'station', 'airport'],
  ['status', 'confirmed', 'waitlisted', 'rac', 'cancelled', 'cnf', 'wl', 'booked', 'availability'],
  ['policy', 'rule', 'terms', 'condition', 'regulation', 'procedure', 'guideline', 'law', 'clause'],
  ['invoice', 'bill', 'receipt', 'statement', 'order', 'purchase'],
  ['penalty', 'fine', 'charge', 'deduction', 'clerkage', 'forfeit'],
  ['risk', 'liability', 'indemnity', 'warranty', 'breach', 'violation', 'clause', 'obligation'],
];

function expandQuery(words) {
  const expanded = new Set(words.map(w => w.toLowerCase()));
  for (const w of words) {
    const group = SYNONYM_GROUPS.find(g => g.includes(w.toLowerCase()));
    if (group) group.forEach(s => expanded.add(s));
  }
  return [...expanded];
}

// â”€â”€ Entity intent patterns for direct lookup â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const ENTITY_INTENTS = [
  { re: /\b(pnr|booking\s*(?:number|no|id|ref)|ticket\s*(?:number|no|id)|confirmation\s*(?:number|code))\b/i,    key: 'pnr',            label: 'PNR / Booking Reference' },
  // Convenience fee MUST come before general fare/fee to avoid being swallowed by 'fee' keyword
  { re: /\b(convenience\s*fee|service\s*charge|irctc\s*fee|booking\s*fee|processing\s*fee)\b/i,                  key: 'convenienceFee', label: 'Convenience / Service Fee' },
  { re: /\b(fare|ticket\s*price|total\s*(?:cost|amount|fare|price)|how\s*much|cost|price|fee)\b/i,              key: 'amounts',        label: 'Fare / Amount' },
  { re: /\b(date|journey\s*date|travel\s*date|when|departure\s*date|arrival\s*date|travel\s*on)\b/i,            key: 'dates',          label: 'Date / Schedule' },
  { re: /\b(passenger|traveller|name|who\s*(?:is|are|will|booked)|person|customer)\b/i,                         key: 'persons',        label: 'Passenger(s)' },
  { re: /\b(train\s*(?:number|no|name)|flight\s*(?:number|no)|service\s*no|vehicle\s*no)\b/i,                   key: 'transportNo',    label: 'Train / Flight No.' },
  { re: /\b(route|from|to|destination|origin|where|station|airport|source|journey\s*from)\b/i,                  key: 'route',          label: 'Route / Journey' },
  { re: /\b(class|coach|berth|seat|accommodation|type\s*of\s*travel|travel\s*class)\b/i,                        key: 'travelClass',    label: 'Travel Class / Seat' },
  { re: /\b(status|confirmed|waitlist|rac|booked|booking\s*status|availability)\b/i,                            key: 'status',         label: 'Booking Status' },
  { re: /\b(vendor|seller|company|supplier|billed|issued\s*by|from\s*whom|service\s*provider)\b/i,              key: 'vendor',         label: 'Vendor / Issuer' },
  { re: /\b(invoice\s*(?:number|no)|bill\s*number|receipt\s*number|order\s*(?:no|number))\b/i,                  key: 'invoiceNo',      label: 'Invoice Number' },
];


// â”€â”€ Public: answerQuestion â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function answerQuestion(text, question) {
  const q = (question || '').trim();
  const qLower = q.toLowerCase();

  const cleaned = sanitizeOcrText(text)
    .replace(/[\uE000-\uF8FF\uFFF0-\uFFFF\uFFFD]/g, ' ')
    .replace(/^[ \t]*[â€¢\u25cf\u25cb\-â€“â€”][ \t]*/gm, 'â€¢ ');

  const docType = classifyDocument(cleaned);
  const entities = extractEntities(cleaned);

  // â”€â”€â”€ 1. General / summary question â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  const isGeneral = /^(describe|summary|overview|explain|about|what is this|what does this|main points|tell me about|summarize|give me a summary|what is the document|what is the file|what type of document)\b/i.test(qLower)
    || (/\b(document|file|pdf)\b/.test(qLower) && /\b(describe|about|summary|overview|explain|what)\b/.test(qLower));

  if (isGeneral) {
    const sum = summarizeText(cleaned);
    let body = sum.overview;
    if (sum.keyPoints?.length > 0) {
      const kps = sum.keyPoints.filter(k => k.length > 10);
      if (kps.length > 0) body += '\n\nKey Points:\n' + kps.map(k => `â€¢ ${k}`).join('\n');
    }
    return body;
  }

  // â”€â”€â”€ 2. Direct entity lookup â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
  for (const intent of ENTITY_INTENTS) {
    if (intent.re.test(qLower)) {
      const val = entities[intent.key];
      const hasValue = val && (Array.isArray(val) ? val.length > 0 : !!val);
      if (hasValue) {
        let found;
        if (intent.key === 'route' && val && typeof val === 'object') {
          found = val.from + ' to ' + val.to;
        } else if (intent.key === 'amounts') {
          found = [...new Set(val)].join(', ');
        } else if (Array.isArray(val)) {
          found = val.join(', ');
        } else {
          found = String(val);
        }
        const grounding = findGroundingLine(cleaned, Array.isArray(val) ? val : [val]);
        let answer = `**${intent.label}**: ${found}`;
        if (grounding && !grounding.toLowerCase().includes(found.toLowerCase().slice(0, 8))) {
          answer += `\n\n_From the document:_ "${grounding}"`;
        } else if (grounding) {
          answer += `\n\n_Context:_ "${grounding}"`;
        }
        return answer;
      }
    }
  }

  // â”€â”€â”€ 3. Policy / rule questions â€” sentence-level retrieval â”€â”€â”€
  const STOP_Q = new Set(['what','where','when','which','who','how','does','is','are','was','were','the','this','that','these','those','tell','give','show','can','will','would','should','could','do','did','if','my','your','our','me','we','you','it','its','any','some','get','let','make','says','say']);
  const baseWords = qLower.match(/[a-z0-9]{3,}/g)?.filter(w => !STOP_Q.has(w)) || [];

  if (!baseWords.length) return 'Please enter a specific question about the document contents.';

  const queryTerms = expandQuery(baseWords);

  // Sentence-level BM25 scoring
  const allSentences = cleaned
    .split(/(?<=[.!?])\s+|\n+/)
    .map(s => s.replace(/\s+/g, ' ').trim())
    .filter(s => s.length > 15 && s.length < 600);

  const N = allSentences.length || 1;
  const df = {};
  allSentences.forEach(s => {
    const sl = s.toLowerCase();
    const seen = new Set();
    queryTerms.forEach(w => { if (sl.includes(w) && !seen.has(w)) { df[w] = (df[w] || 0) + 1; seen.add(w); } });
  });

  const scoredSents = allSentences.map(s => {
    const sl = s.toLowerCase();
    let score = 0;
    queryTerms.forEach(w => {
      const tf = sl.split(w).length - 1;
      const idf = Math.log((N + 1) / ((df[w] || 0) + 1)) + 1;
      score += tf * idf;
    });
    return { s, score };
  }).filter(x => x.score > 0).sort((a, b) => b.score - a.score);

  if (!scoredSents.length) {
    return `I could not find content matching "${q}" in this document. Try rephrasing using specific terms, names, dates, or numbers that appear in the document.`;
  }

  // De-duplicate top results
  const topSents = [];
  for (const { s } of scoredSents) {
    if (topSents.some(p => jaccardSim(p, s) > 0.55 || p.includes(s) || s.includes(p))) continue;
    topSents.push(s);
    if (topSents.length >= 4) break;
  }

  const docLabel = docType === 'ticket' ? 'booking document' : docType === 'invoice' ? 'invoice' : docType === 'contract' ? 'contract' : 'document';
  return `**Relevant information from the ${docLabel}:**\n\n${topSents.join('\n\n')}`;
}

// â”€â”€ Public: extractFacts â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export function extractFacts(text, kind) {
  const cleaned = sanitizeOcrText(text);
  const entities = extractEntities(cleaned);

  if (kind === 'invoice') {
    return {
      dates: entities.dates,
      amounts: entities.amounts,
      invoice: entities.invoiceNo || entities.pnr || 'Not detected',
      vendor: entities.vendor || 'Not detected'
    };
  }

  // Contract risk analysis
  const riskPatterns = /\b(liability|liable|indemnity|indemnification|renewal|renew|terminate|termination|penalty|breach|governing\s*law|confidential|arbitration|shall\s+not|must\s+not|warranty|represent)\b/i;
  const risks = cleaned
    .split(/(?<=[.!?])\s+|\n/)
    .map(s => s.replace(/\s+/g, ' ').trim())
    .filter(s => riskPatterns.test(s) && s.length > 20 && s.length < 500)
    .slice(0, 5);

  return { dates: entities.dates, risks };
}
