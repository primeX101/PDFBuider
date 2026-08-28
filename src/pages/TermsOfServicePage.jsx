import React from 'react';
import SEO from '../components/SEO';
import AdUnit from '../components/AdUnit';

export default function TermsOfServicePage() {
  return (
    <div className="content-page">
      <SEO
        title="Terms of Service"
        description="Paperly's Terms of Service — read our terms for acceptable use, limitations of liability, and your rights when using our free document tools."
        path="/terms-of-service"
      />

      <section className="content-hero">
        <span className="tiny-kicker">LEGAL</span>
        <h1>Terms of Service</h1>
        <p>Last updated: August 2026</p>
      </section>

      <article className="content-body legal-content">
        <section>
          <h2>1. Acceptance of Terms</h2>
          <p>By accessing or using Paperly at <a href="https://www.amprimedev.xyz">www.amprimedev.xyz</a> (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.</p>
        </section>

        <section>
          <h2>2. Description of Service</h2>
          <p>Paperly provides free, browser-based document processing tools including PDF manipulation (merging, splitting, rotating, compressing, watermarking, signing), format conversion (PDF to Word, Excel, PowerPoint, JPG, and vice versa), and AI-powered document analysis (summarization, Q&A, OCR, contract review, invoice extraction, document comparison).</p>
          <p>All document processing is performed locally in your web browser using client-side JavaScript. Files are not uploaded to or processed on any server.</p>
        </section>

        <section>
          <h2>3. Acceptable Use</h2>
          <p>You agree to use Paperly only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul>
            <li>Use the Service to process documents that you do not have the legal right to access or modify.</li>
            <li>Attempt to interfere with, disrupt, or disable the Service or its infrastructure.</li>
            <li>Use automated scripts, bots, or scrapers to access the Service in a manner that could impair its performance.</li>
            <li>Reverse-engineer, decompile, or disassemble the Service's source code beyond what is permitted by applicable law.</li>
            <li>Use the Service to distribute malware, viruses, or other harmful code.</li>
            <li>Misrepresent the output of any tool as being created by a different service or software.</li>
          </ul>
        </section>

        <section>
          <h2>4. Intellectual Property</h2>
          <p>The Paperly name, logo, design, and source code are the intellectual property of Paperly and its creators. You may not reproduce, distribute, or create derivative works based on our branding or code without prior written permission.</p>
          <p>Documents you process through Paperly remain entirely your property. We claim no rights, ownership, or license over any content you create, modify, or process using our tools.</p>
        </section>

        <section>
          <h2>5. No Warranty</h2>
          <p>The Service is provided <strong>"as is" and "as available"</strong> without warranties of any kind, either express or implied, including but not limited to:</p>
          <ul>
            <li>Implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</li>
            <li>Warranties that the Service will be uninterrupted, error-free, or free of harmful components.</li>
            <li>Warranties regarding the accuracy, reliability, or completeness of any tool's output.</li>
          </ul>
          <p>Specifically, the AI-powered tools (summarization, contract review, invoice extraction, chat, and comparison) use automated text analysis and pattern matching. Their output is provided for informational purposes only and should not be relied upon as legal advice, financial guidance, or a substitute for professional review.</p>
        </section>

        <section>
          <h2>6. Limitation of Liability</h2>
          <p>To the maximum extent permitted by applicable law, Paperly and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to:</p>
          <ul>
            <li>Loss of data or documents</li>
            <li>Loss of profits, revenue, or business opportunities</li>
            <li>Costs of procuring substitute services</li>
            <li>Any damages arising from errors, inaccuracies, or omissions in tool output</li>
          </ul>
          <p>Because all processing occurs locally in your browser, you are responsible for maintaining backups of your original documents. Paperly is not responsible for any modifications, corruptions, or losses that occur during document processing on your device.</p>
        </section>

        <section>
          <h2>7. Third-Party Services</h2>
          <p>Paperly uses Google AdSense for advertising. Your interaction with advertisements is governed by Google's terms and privacy policies. Paperly is not responsible for the content, accuracy, or practices of any third-party advertiser.</p>
          <p>Paperly may include links to third-party websites or resources. We are not responsible for the content or practices of those external sites.</p>
        </section>

        <section>
          <h2>8. Modifications to the Service</h2>
          <p>We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with or without notice. We are not liable to you or any third party for any modification, suspension, or discontinuance of the Service.</p>
        </section>

        <section>
          <h2>9. Changes to These Terms</h2>
          <p>We may update these Terms from time to time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of the Service after changes are posted constitutes your acceptance of the revised Terms.</p>
        </section>

        <section>
          <h2>10. Governing Law</h2>
          <p>These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.</p>
        </section>

        <section>
          <h2>11. Contact</h2>
          <p>If you have questions about these Terms, please contact us at <a href="mailto:mpaperly@gmail.com">mpaperly@gmail.com</a>.</p>
        </section>
      </article>

      <AdUnit slot="terms-bottom" contentReady={true} />
    </div>
  );
}
