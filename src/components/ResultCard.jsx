import React from 'react';
import { AlertTriangle, Check, Info, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ResultCard({ result, onRetry }) {
  // Error state — rich guidance card
  if (result.type === 'error') return (
    <div className="result-card result-card-error">
      <div className="result-icon result-icon-error"><AlertTriangle size={20} /></div>
      <div className="result-error-body">
        <h2>{result.title}</h2>
        <p className="result-error-msg">{result.body}</p>
        {result.tip && (
          <div className="result-error-tip">
            <Info size={14} />
            <span>{result.tip}</span>
          </div>
        )}
        <div className="result-error-actions">
          {onRetry && (
            <button className="result-retry-btn" onClick={onRetry}>
              Try again
            </button>
          )}
          <Link to="/tools/ocr" className="result-error-link">Use OCR tool →</Link>
          <Link to="/faq" className="result-error-link">Help &amp; FAQ →</Link>
        </div>
      </div>
    </div>
  );

  if (result.type === 'download') return (
    <div className="result-card">
      <div className="result-icon"><Check size={20} /></div>
      <div>
        <h2>{result.title}</h2>
        <p>{result.body}</p>
      </div>
    </div>
  );

  return (
    <div className="result-card">
      <div className="result-icon"><Sparkles size={20} /></div>
      <div>
        <h2>{result.title}</h2>
        <p>{result.body}</p>
        {result.details?.length > 0 && (
          <div className="result-details">
            {result.details.map((d, i) => (
              <div key={i}>
                <span>{d.label}</span>
                <b>{d.value}</b>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
