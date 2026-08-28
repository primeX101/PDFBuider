import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, ChevronDown, ArrowRight, Menu, X } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = location.pathname === '/';

  return (
    <nav className={isHome ? 'landing-nav' : 'landing-nav inner-nav'}>
      <Link to="/" className="brand" onClick={() => setMobileOpen(false)}>
        <span className="brand-mark"><FileText size={18} /></span>
        paperly <small style={{ fontSize: '11px', color: '#69746e', fontWeight: 'normal', marginLeft: '4px' }}>by AmprimeDev</small>
      </Link>

      <div className={`navlinks ${mobileOpen ? 'navlinks-open' : ''}`}>
        <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
        <Link to="/tools/merge" onClick={() => setMobileOpen(false)}>
          Tools <ChevronDown size={14} />
        </Link>
        <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
        <Link to="/faq" onClick={() => setMobileOpen(false)}>FAQ</Link>
      </div>

      <div className="landing-actions">
        <Link to="/tools/merge" className="start" onClick={() => setMobileOpen(false)}>
          Get started <ArrowRight size={15} />
        </Link>
      </div>

      <button
        className="mobile-menu-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
      </button>
    </nav>
  );
}
