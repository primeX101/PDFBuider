import React from 'react';
import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';

const toolLinks = [
  { id: 'merge', label: 'Merge PDF' },
  { id: 'split', label: 'Split PDF' },
  { id: 'compress', label: 'Compress PDF' },
  { id: 'pdf-word', label: 'PDF to Word' },
  { id: 'pdf-jpg', label: 'PDF to JPG' },
  { id: 'ocr', label: 'OCR PDF' },
  { id: 'watermark', label: 'Watermark PDF' },
  { id: 'summary', label: 'AI Summary' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Link to="/" className="brand">
            <span className="brand-mark"><FileText size={15} /></span>
            paperly <span style={{ fontSize: '11px', color: '#7a9b71', fontWeight: 'normal', marginLeft: '4px' }}>by AmprimeDev</span>
          </Link>
          <p>Private PDF tools for everyday work by AmprimeDev.<br />Files are processed locally in your browser.</p>
        </div>

        <div className="footer-col">
          <h4>Popular Tools</h4>
          <ul>
            {toolLinks.map(t => (
              <li key={t.id}><Link to={`/tools/${t.id}`}>{t.label}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><Link to="/about">About Paperly</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} Paperly by AmprimeDev (amprimedev.xyz). All rights reserved.</span>
        <span>Your documents never leave your browser.</span>
      </div>
    </footer>
  );
}
