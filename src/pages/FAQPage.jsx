import React, { useState } from 'react';
import { ChevronDown, Link as LinkIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import AdUnit from '../components/AdUnit';

const faqs = [
  {
    category: 'Privacy & Security',
    items: [
      { q: 'Are my files uploaded to a server?', a: 'No. All file processing happens entirely within your web browser using JavaScript. Your documents are loaded into your browser\'s memory, processed locally, and the results are downloaded directly to your device. No file data is ever transmitted to any server. We have no ability to access, view, or store your documents.' },
      { q: 'Is Paperly safe for confidential documents?', a: 'Yes. Because all processing happens locally in your browser, Paperly is suitable for confidential and sensitive documents. Your files never leave your device. We recommend using Paperly on a trusted device with an up-to-date browser for the best security.' },
      { q: 'Does Paperly store my files after processing?', a: 'No. Your files exist only in your browser\'s memory while you are actively using a tool. When you close the Paperly tab or navigate away, all file data is removed from memory. We have no server-side storage and no mechanism to retain your documents.' },
      { q: 'What data does Paperly collect?', a: 'Paperly does not collect any document content or personal information from your files. We may use standard web analytics to understand site usage patterns (page views, browser type, etc.), and Google AdSense may use cookies for ad serving. See our Privacy Policy for full details.' },
    ]
  },
  {
    category: 'Supported Formats & Compatibility',
    items: [
      { q: 'What file formats does Paperly support?', a: 'Paperly supports PDF files for most tools (merge, split, rotate, compress, watermark, sign, and all AI tools). For conversion, we support PDF, DOCX (Word), XLSX/XLS/CSV (Excel), PPTX (PowerPoint), and JPG output. Each tool page specifies which formats it accepts.' },
      { q: 'What browsers are supported?', a: 'Paperly works in all modern browsers including Google Chrome, Mozilla Firefox, Microsoft Edge, and Apple Safari. We recommend using the latest version of your browser for the best performance and compatibility.' },
      { q: 'Does Paperly work on mobile devices?', a: 'Yes. Paperly is responsive and works on smartphones and tablets. However, processing very large files on mobile devices may be slower due to limited memory and processing power. For the best experience with large documents, we recommend using a desktop or laptop computer.' },
      { q: 'Is there a file size limit?', a: 'There is no server-enforced file size limit since processing happens in your browser. The practical limit depends on your device\'s available memory (RAM). Most modern computers can handle files up to several hundred megabytes. Very large files may cause slower processing or memory limitations on devices with limited RAM.' },
    ]
  },
  {
    category: 'Cost & Account',
    items: [
      { q: 'Is Paperly free?', a: 'Yes. All Paperly tools are completely free to use with no limits on the number of files you can process. There are no paid tiers, no trial periods, and no feature restrictions. The service is supported by advertising.' },
      { q: 'Do I need to create an account?', a: 'No. Paperly does not require any sign-up, account creation, or login. Simply open the website and start using any tool immediately. There are no accounts, no passwords, and no email verification.' },
      { q: 'Are there watermarks on the output files?', a: 'No. Paperly does not add any watermarks, logos, or branding to your processed documents. The output is a clean file with no modifications beyond what you requested.' },
    ]
  },
  {
    category: 'AI Features',
    items: [
      { q: 'How do the AI features work?', a: 'Paperly\'s AI features (Summary, Chat with PDF, Contract Review, Invoice Extraction, Document Comparison) use local text analysis algorithms that run in your browser. They extract text from your PDF and apply pattern matching and natural language processing to generate results. No external AI services (like OpenAI or Google AI) are used.' },
      { q: 'How accurate is the AI analysis?', a: 'The AI tools provide useful starting points for understanding document content, but they are not infallible. Summaries capture main themes, contract review flags common risk phrases, and invoice extraction identifies standard fields. We recommend verifying critical information against the original document. AI tools should not be used as a substitute for professional legal, financial, or medical advice.' },
      { q: 'Does Paperly use ChatGPT or similar cloud AI?', a: 'No. All AI features run locally in your browser using built-in algorithms. Your document text is never sent to OpenAI, Google, or any other external AI service. This ensures complete privacy for your document content.' },
    ]
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (key) => setOpenIndex(prev => prev === key ? null : key);

  return (
    <div className="content-page">
      <SEO
        title="Frequently Asked Questions"
        description="Find answers to common questions about Paperly — privacy, supported formats, file size limits, AI features, browser support, and more."
        path="/faq"
      />

      <section className="content-hero">
        <span className="tiny-kicker">HELP CENTER</span>
        <h1>Frequently Asked <em>Questions</em></h1>
        <p>Everything you need to know about using Paperly for your document work.</p>
      </section>

      <article className="content-body">
        {faqs.map((category) => (
          <section key={category.category} className="faq-category">
            <h2>{category.category}</h2>
            <div className="faq-list">
              {category.items.map((faq, i) => {
                const key = `${category.category}-${i}`;
                return (
                  <details key={key} className="faq-item" open={openIndex === key} onClick={(e) => { e.preventDefault(); toggle(key); }}>
                    <summary>
                      <span>{faq.q}</span>
                      <ChevronDown size={18} />
                    </summary>
                    <p>{faq.a}</p>
                  </details>
                );
              })}
            </div>
          </section>
        ))}

        <section className="faq-cta">
          <h2>Still have questions?</h2>
          <p>We are happy to help. Reach out to us and we will get back to you as soon as possible.</p>
          <Link to="/contact" className="primary">
            <LinkIcon size={16} /> Contact Us
          </Link>
        </section>
      </article>

      <AdUnit slot="faq-bottom" contentReady={true} />
    </div>
  );
}
