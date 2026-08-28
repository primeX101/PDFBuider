import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText } from 'lucide-react';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  return (
    <div className="content-page">
      <SEO
        title="Page Not Found"
        description="The page you're looking for doesn't exist. Return to Paperly's homepage to find the document tool you need."
        path="/404"
      />

      <section className="content-hero not-found-hero">
        <FileText size={48} />
        <h1>Page not found</h1>
        <p>The page you are looking for does not exist or has been moved. Let us help you find what you need.</p>
        <div className="hero-actions">
          <Link to="/" className="primary">Go to homepage <ArrowRight size={16} /></Link>
          <Link to="/tools/merge" className="secondary">Try Merge PDF</Link>
        </div>
      </section>
    </div>
  );
}
