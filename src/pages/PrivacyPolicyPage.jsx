import React from 'react';
import SEO from '../components/SEO';
import AdUnit from '../components/AdUnit';

export default function PrivacyPolicyPage() {
  return (
    <div className="content-page">
      <SEO
        title="Privacy Policy"
        description="Paperly's Privacy Policy — learn how we protect your data. Files are processed entirely in your browser and are never uploaded to any server."
        path="/privacy-policy"
      />

      <section className="content-hero">
        <span className="tiny-kicker">LEGAL</span>
        <h1>Privacy Policy</h1>
        <p>Last updated: August 2026</p>
      </section>

      <article className="content-body legal-content">
        <section>
          <h2>Introduction</h2>
          <p>Paperly ("the Service" or "the Application") is created, owned, and operated by <strong>AmprimeDev</strong> on the official website domain <a href="https://www.amprimedev.xyz">www.amprimedev.xyz</a>. This Privacy Policy explains how we handle information when you use our web-based document workspace and tools.</p>
          <p>By using Paperly by AmprimeDev, you agree to the practices described in this policy. If you do not agree, please do not use the Service.</p>
        </section>

        <section>
          <h2>How Your Files Are Processed</h2>
          <p><strong>All document processing happens locally in your web browser.</strong> This is the core privacy principle of Paperly:</p>
          <ul>
            <li>When you upload a file to Paperly, it is loaded into your browser's memory (RAM) using JavaScript. It is <strong>not transmitted to any server</strong>.</li>
            <li>All document operations — merging, splitting, compressing, converting, OCR, AI analysis, and every other tool — are performed by JavaScript code running on your device.</li>
            <li>Output files (merged PDFs, converted documents, etc.) are generated in your browser and downloaded directly to your device.</li>
            <li>When you close the Paperly tab or navigate away, your files are removed from browser memory. We have <strong>no ability to access, view, copy, or store</strong> any document you process.</li>
            <li>We do not use server-side processing, cloud storage, or third-party document processing APIs for any tool functionality.</li>
          </ul>
          <p>In practical terms: <strong>your files never leave your computer</strong>. We never see them, we cannot recover them, and we have no record that they existed.</p>
        </section>

        <section>
          <h2>Information We Do Not Collect</h2>
          <p>We do not collect, store, or have access to:</p>
          <ul>
            <li>The content of any document you process (PDFs, Word files, spreadsheets, presentations, or images)</li>
            <li>File names, file sizes, or metadata of documents you process</li>
            <li>Text extracted by OCR or AI tools</li>
            <li>Questions you ask in the "Chat with PDF" tool</li>
            <li>Any personal information contained within your documents</li>
          </ul>
        </section>

        <section>
          <h2>Information That May Be Collected</h2>
          <h3>Website Analytics</h3>
          <p>We may use standard web analytics services to understand how visitors use our website. These services may collect:</p>
          <ul>
            <li>Pages visited and time spent on pages</li>
            <li>Browser type, operating system, and screen resolution</li>
            <li>Referring website or search terms</li>
            <li>General geographic location (country/region level, not precise location)</li>
            <li>Anonymous usage patterns and interaction data</li>
          </ul>
          <p>This data is aggregated and anonymized. It does not include any document content or personally identifiable information.</p>

          <h3>Advertising</h3>
          <p>We use <strong>Google AdSense</strong> to display advertisements on our website. Google AdSense may use cookies and similar technologies to serve ads based on your prior visits to our website or other websites. Specifically:</p>
          <ul>
            <li>Google uses the DoubleClick cookie to serve ads based on your visit to this site and/or other sites on the Internet.</li>
            <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google's Ads Settings</a>.</li>
            <li>You may opt out of third-party vendor cookies by visiting the <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer">Digital Advertising Alliance's opt-out page</a>.</li>
          </ul>
          <p>Google's use of advertising cookies is governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.</p>
          <p><strong>Important:</strong> Advertising technologies are completely separate from Paperly's document processing tools. Ad scripts cannot access, read, or interact with any documents you process in Paperly. The ad system and the document tools operate in isolated contexts.</p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>Paperly's core functionality does not require or use cookies. However, the following third-party services may set cookies:</p>
          <ul>
            <li><strong>Google AdSense:</strong> Uses cookies to serve relevant advertisements. See the Advertising section above for opt-out options.</li>
            <li><strong>Analytics services:</strong> May use cookies to distinguish unique visitors and track sessions.</li>
          </ul>
          <p>You can control cookie behavior through your browser settings. Disabling cookies will not affect Paperly's document processing tools.</p>
        </section>

        <section>
          <h2>Data Security</h2>
          <p>Because your documents are processed locally in your browser and are never transmitted to our servers, the primary security responsibility rests with your own device and network security. We recommend:</p>
          <ul>
            <li>Using a modern, up-to-date web browser</li>
            <li>Keeping your operating system and security software current</li>
            <li>Using Paperly on trusted networks</li>
          </ul>
        </section>

        <section>
          <h2>Children's Privacy</h2>
          <p>Paperly is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us at <a href="mailto:mpaperly@gmail.com">mpaperly@gmail.com</a>.</p>
        </section>

        <section>
          <h2>Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last updated" date. Your continued use of Paperly after changes are posted constitutes your acceptance of the revised policy.</p>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy or our privacy practices, please contact us at:</p>
          <p><strong>Email:</strong> <a href="mailto:mpaperly@gmail.com">mpaperly@gmail.com</a></p>
        </section>
      </article>

      <AdUnit slot="privacy-bottom" contentReady={true} />
    </div>
  );
}
