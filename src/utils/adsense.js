const CLIENT_ID = 'ca-pub-6119917561433989';
const SCRIPT_ID = 'paperly-adsense-script';

/**
 * Checks if an ad blocker extension is active by testing an ad-bait element.
 * Ad blockers inject CSS rules hiding elements with standard ad class names.
 */
export function isAdBlockerActive() {
  if (typeof window === 'undefined' || !document.body) return false;

  try {
    const bait = document.createElement('div');
    bait.className = 'adsbox pub_300x250 pub_728x90 text-ad textAd ads-banner';
    bait.style.position = 'absolute';
    bait.style.left = '-9999px';
    bait.style.top = '-9999px';
    bait.style.width = '1px';
    bait.style.height = '1px';
    bait.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bait);

    const style = window.getComputedStyle(bait);
    const isBlocked =
      style.display === 'none' ||
      style.visibility === 'hidden' ||
      bait.offsetParent === null ||
      bait.offsetHeight === 0 ||
      bait.offsetWidth === 0;

    bait.remove();
    return isBlocked;
  } catch (_) {
    return false;
  }
}

/**
 * Safely loads Google AdSense script only when:
 * 1. User has granted advertising cookie consent (or is a search crawler)
 * 2. An ad blocker is NOT active (preventing ERR_BLOCKED_BY_CLIENT console errors)
 * 3. The script hasn't already been injected
 */
export function loadAdSense() {
  if (typeof window === 'undefined') return;
  if (document.getElementById(SCRIPT_ID)) return;

  try {
    const consent = localStorage.getItem('paperly_cookie_consent');
    const isBot = /bot|google|crawler|spider|robot|crawling/i.test(navigator.userAgent);

    // Only load if user accepted all cookies OR is a crawler
    if (consent !== 'all' && !isBot) return;

    // Check for active adblocker before making a network request
    if (isAdBlockerActive()) {
      return;
    }

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${CLIENT_ID}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onerror = () => {
      // Silently handle adblocker network abort
    };

    document.head.appendChild(script);
  } catch (_) {}
}
