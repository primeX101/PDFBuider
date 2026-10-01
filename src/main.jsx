import React, { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Layout from './components/Layout';
import CookieConsent from './components/CookieConsent';
import './styles.css';

// ── Eagerly loaded: pages users hit first ──────────────────────────────────
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';

// ── Lazily loaded: split into separate chunks ──────────────────────────────
// Each lazy() creates its own JS chunk that only loads when that route
// is first navigated to — dramatically reducing the initial bundle size.
const ToolPage        = lazy(() => import('./pages/ToolPage'));
const AboutPage       = lazy(() => import('./pages/AboutPage'));
const PrivacyPage     = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage       = lazy(() => import('./pages/TermsOfServicePage'));
const ContactPage     = lazy(() => import('./pages/ContactPage'));
const FAQPage         = lazy(() => import('./pages/FAQPage'));
const BlogPage        = lazy(() => import('./pages/BlogPage'));
const BlogPostPage    = lazy(() => import('./pages/BlogPostPage'));
const ComparisonPage  = lazy(() => import('./pages/ComparisonPage'));

/** Minimal full-page spinner shown while a lazy chunk loads */
function PageLoader() {
  return (
    <div style={{
      minHeight: '60vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', flexDirection: 'column', gap: '14px',
      color: '#6b7a76', fontFamily: 'inherit'
    }}>
      <div style={{
        width: 36, height: 36, border: '3px solid #e0e0d8',
        borderTopColor: '#0b463d', borderRadius: '50%',
        animation: 'spin 0.7s linear infinite'
      }} />
      <span style={{ fontSize: 13 }}>Loading…</span>
    </div>
  );
}

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/"                    element={<HomePage />} />
              <Route path="/tools/:toolId"       element={<ToolPage />} />
              <Route path="/about"               element={<AboutPage />} />
              <Route path="/privacy-policy"      element={<PrivacyPage />} />
              <Route path="/terms-of-service"    element={<TermsPage />} />
              <Route path="/contact"             element={<ContactPage />} />
              <Route path="/faq"                 element={<FAQPage />} />
              <Route path="/blog"                element={<BlogPage />} />
              <Route path="/blog/:slug"          element={<BlogPostPage />} />
              <Route path="/compare/:slug"       element={<ComparisonPage />} />
              <Route path="*"                    element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
        {/* CookieConsent must be INSIDE BrowserRouter — it uses <Link> */}
        <CookieConsent />
      </BrowserRouter>
    </HelmetProvider>
  );
}

createRoot(document.getElementById('root')).render(<App />);
