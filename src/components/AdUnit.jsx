import React, { useEffect, useRef } from 'react';
import { loadAdSense } from '../utils/adsense';

/**
 * Gated ad component — only renders when contentReady is true.
 * This ensures ads never appear on thin/behavioral screens
 * (modals, loading states, empty workspaces).
 */
export default function AdUnit({ slot, format = 'auto', contentReady = false, style }) {
  const adRef = useRef(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (!contentReady || pushed.current) return;
    loadAdSense();
    try {
      if (adRef.current && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        pushed.current = true;
      }
    } catch (e) {
      // Handled silently
    }
  }, [contentReady]);

  if (!contentReady) return null;

  return (
    <div className="ad-container" aria-hidden="true">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', ...(style || {}) }}
        data-ad-client="ca-pub-6119917561433989"
        data-ad-slot={slot || ''}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
