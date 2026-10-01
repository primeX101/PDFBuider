import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, Settings, X } from 'lucide-react';

const STORAGE_KEY = 'paperly_cookie_consent';

/**
 * Cookie consent values:
 *  null / undefined  — not yet decided (show banner)
 *  'all'             — accepted all (analytics + ads)
 *  'essential'       — essential only (no ad personalisation)
 */

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [adConsent, setAdConsent] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) setVisible(true); // first visit — show banner
    } catch (_) {
      setVisible(true);
    }
  }, []);

  const save = (value) => {
    try { localStorage.setItem(STORAGE_KEY, value); } catch (_) {}
    setVisible(false);
    setShowManage(false);
  };

  const acceptAll = () => save('all');
  const acceptEssential = () => save('essential');
  const saveManage = () => save(adConsent ? 'all' : 'essential');

  if (!visible) return null;

  return (
    <div className="cookie-overlay" role="dialog" aria-modal="true" aria-label="Cookie consent">
      <div className="cookie-banner">
        {/* Header */}
        <div className="cookie-header">
          <div className="cookie-title">
            <Cookie size={18} />
            <span>We use cookies</span>
          </div>
          <button className="cookie-close" onClick={acceptEssential} aria-label="Dismiss — essential only">
            <X size={16} />
          </button>
        </div>

        {!showManage ? (
          /* Main consent view */
          <>
            <p className="cookie-body">
              Paperly uses cookies for contextual advertising via{' '}
              <strong>Google AdSense</strong> (DoubleClick) and anonymous analytics.
              Your documents are <strong>never uploaded</strong> — cookies only affect ads, not your files.{' '}
              <Link to="/privacy-policy" className="cookie-link">Learn more</Link>.
            </p>
            <div className="cookie-actions">
              <button className="cookie-btn-secondary" onClick={() => setShowManage(true)}>
                <Settings size={14} /> Manage
              </button>
              <button className="cookie-btn-secondary" onClick={acceptEssential}>
                Essential only
              </button>
              <button className="cookie-btn-primary" onClick={acceptAll}>
                Accept all
              </button>
            </div>
          </>
        ) : (
          /* Manage / granular view */
          <>
            <div className="cookie-manage-rows">
              <div className="cookie-row">
                <div>
                  <strong>Essential cookies</strong>
                  <p>Required for the site to function — recently used tools, preferences. Cannot be disabled.</p>
                </div>
                <div className="cookie-toggle always-on">Always on</div>
              </div>
              <div className="cookie-row">
                <div>
                  <strong>Advertising & analytics cookies</strong>
                  <p>Google AdSense uses DoubleClick cookies to serve relevant ads. Analytics collects anonymous usage data. You can opt out at <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>.</p>
                </div>
                <button
                  className={`cookie-toggle ${adConsent ? 'on' : 'off'}`}
                  onClick={() => setAdConsent(v => !v)}
                  aria-label={adConsent ? 'Disable advertising cookies' : 'Enable advertising cookies'}
                  aria-pressed={adConsent}
                >
                  <span className="toggle-thumb" />
                </button>
              </div>
            </div>
            <div className="cookie-actions">
              <button className="cookie-btn-secondary" onClick={() => setShowManage(false)}>
                ← Back
              </button>
              <button className="cookie-btn-primary" onClick={saveManage}>
                Save preferences
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
