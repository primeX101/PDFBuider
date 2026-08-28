import React, { useState } from 'react';
import { Mail, MessageSquare, Send } from 'lucide-react';
import SEO from '../components/SEO';
import AdUnit from '../components/AdUnit';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mailtoUrl = `mailto:mpaperly@gmail.com?subject=${encodeURIComponent(form.subject || 'Paperly Contact')}&body=${encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`)}`;
    window.open(mailtoUrl, '_blank');
    setSent(true);
  };

  const update = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="content-page">
      <SEO
        title="Contact Us"
        description="Get in touch with the Paperly team. Have questions, feedback, or a feature request? We'd love to hear from you."
        path="/contact"
      />

      <section className="content-hero">
        <span className="tiny-kicker">GET IN TOUCH</span>
        <h1>Contact <em>Us</em></h1>
        <p>Have questions, feedback, or a feature request? We would love to hear from you.</p>
      </section>

      <article className="content-body">
        <div className="contact-grid">
          <div className="contact-info">
            <h2>Reach Out</h2>
            <p>Whether you have a question about how a tool works, want to report a bug, or have an idea for a new feature, we are here to help.</p>

            <div className="contact-method">
              <Mail size={20} />
              <div>
                <h3>Email</h3>
                <a href="mailto:mpaperly@gmail.com">mpaperly@gmail.com</a>
                <p>We typically respond within 1–2 business days.</p>
              </div>
            </div>

            <div className="contact-method">
              <MessageSquare size={20} />
              <div>
                <h3>What Can We Help With?</h3>
                <ul>
                  <li>Questions about specific tools or features</li>
                  <li>Bug reports and technical issues</li>
                  <li>Feature requests and suggestions</li>
                  <li>Privacy and security inquiries</li>
                  <li>Partnership and business inquiries</li>
                  <li>General feedback</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h2>Send a Message</h2>
            {sent ? (
              <div className="contact-success">
                <Send size={24} />
                <h3>Message prepared!</h3>
                <p>Your email client should have opened with your message. If it did not, please send your message directly to <a href="mailto:mpaperly@gmail.com">mpaperly@gmail.com</a>.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <label className="option-field">
                  <span>Your Name</span>
                  <input name="name" value={form.name} onChange={update} placeholder="Jane Doe" required />
                </label>
                <label className="option-field">
                  <span>Your Email</span>
                  <input name="email" type="email" value={form.email} onChange={update} placeholder="jane@example.com" required />
                </label>
                <label className="option-field">
                  <span>Subject</span>
                  <input name="subject" value={form.subject} onChange={update} placeholder="Feature request, bug report, question…" />
                </label>
                <label className="option-field">
                  <span>Message</span>
                  <textarea name="message" value={form.message} onChange={update} placeholder="Tell us what's on your mind…" rows={5} required />
                </label>
                <button type="submit" className="primary contact-submit">
                  <Send size={16} /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </article>

      <AdUnit slot="contact-bottom" contentReady={true} />
    </div>
  );
}
