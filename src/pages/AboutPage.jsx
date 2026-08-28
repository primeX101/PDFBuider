import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import AdUnit from '../components/AdUnit';

export default function AboutPage() {
  return (
    <div className="content-page">
      <SEO
        title="About Paperly"
        description="Learn about Paperly — the free, private, browser-based document workspace. Transform PDFs, extract insights, and keep work moving without uploading files."
        path="/about"
      />

      <section className="content-hero">
        <span className="tiny-kicker">ABOUT US</span>
        <h1>Document work, <em>reimagined.</em></h1>
        <p>Paperly is a free, browser-based document workspace that puts your privacy first. Every tool runs locally — your files never leave your device.</p>
      </section>

      <article className="content-body">
        <section>
          <h2>What is Paperly by AmprimeDev?</h2>
          <p>Paperly is the flagship privacy-first document workspace developed and operated by <strong>AmprimeDev</strong> at <a href="https://www.amprimedev.xyz">www.amprimedev.xyz</a>. We created Paperly because we believe working with sensitive files should never require uploading them to third-party cloud servers, creating accounts, or purchasing expensive desktop software subscriptions.</p>
          <p>Whether you need to merge contracts, compress reports, convert spreadsheets, extract invoice data, or get an AI-powered summary of a research paper, Paperly handles it in seconds — right in your browser tab.</p>
        </section>

        <section>
          <h2>Our Philosophy</h2>
          <div className="about-values">
            <div className="about-value">
              <ShieldCheck size={24} />
              <h3>Privacy First</h3>
              <p>Every file you process stays on your device. We use client-side JavaScript libraries to handle all document operations. No file data is transmitted to any server, stored in any cloud, or accessible to anyone but you. When you close your browser tab, your documents are gone from memory — because they were never anywhere else.</p>
            </div>
            <div className="about-value">
              <Zap size={24} />
              <h3>Zero Friction</h3>
              <p>No accounts, no subscriptions, no installation. Open Paperly in any modern browser and start working immediately. We removed every barrier between you and productive document work. There are no trial limits, no watermarks on output files, and no feature gates.</p>
            </div>
            <div className="about-value">
              <Sparkles size={24} />
              <h3>Genuinely Useful</h3>
              <p>We focus on the document tasks that people actually need every day — not edge-case features that look impressive in a demo but never get used. Each tool is designed to do one thing well, with a clean interface that does not require a manual to understand.</p>
            </div>
          </div>
        </section>

        <section>
          <h2>How It Works</h2>
          <p>Paperly uses modern web technologies to process documents directly in your browser. Here is the technical foundation:</p>
          <ul>
            <li><strong>PDF manipulation</strong> — powered by <code>pdf-lib</code>, an open-source library that reads and writes PDF files in JavaScript without any server dependency.</li>
            <li><strong>PDF rendering</strong> — uses <code>pdfjs-dist</code> (Mozilla's PDF.js) to render PDF pages as images for conversion and preview.</li>
            <li><strong>Document conversion</strong> — Word documents are built with the <code>docx</code> library, spreadsheets with <code>xlsx</code>, and presentations with <code>pptxgenjs</code>.</li>
            <li><strong>OCR (text recognition)</strong> — powered by <code>Tesseract.js</code>, a WebAssembly port of the Tesseract OCR engine that runs entirely in the browser.</li>
            <li><strong>AI features</strong> — document summarization, Q&A, contract review, and invoice extraction use local text analysis algorithms. No external AI APIs are called.</li>
          </ul>
        </section>

        <section>
          <h2>Who Uses Paperly?</h2>
          <p>Paperly is used by professionals, students, and individuals worldwide who value privacy and efficiency in their document workflows:</p>
          <ul>
            <li><strong>Legal professionals</strong> who need to merge case files, review contracts, and redact pages without exposing client documents to third-party services.</li>
            <li><strong>Financial teams</strong> who compress reports, extract invoice data, and convert spreadsheets while maintaining strict data confidentiality.</li>
            <li><strong>Students and researchers</strong> who split textbooks into chapters, summarize papers, and convert between formats for their studies.</li>
            <li><strong>Small business owners</strong> who need professional document tools without enterprise software budgets.</li>
            <li><strong>Anyone</strong> who has ever searched for "merge PDF online" and hesitated before uploading a sensitive file to an unfamiliar website.</li>
          </ul>
        </section>

        <section>
          <h2>Get in Touch</h2>
          <p>We would love to hear from you — whether you have a feature request, found a bug, or just want to say hello.</p>
          <p>Reach us at <a href="mailto:mpaperly@gmail.com">mpaperly@gmail.com</a> or visit our <Link to="/contact">contact page</Link>.</p>
        </section>
      </article>

      <AdUnit slot="about-bottom" contentReady={true} />
    </div>
  );
}
