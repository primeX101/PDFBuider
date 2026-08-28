import React from 'react';
import { Check, Sparkles } from 'lucide-react';

export default function ResultCard({ result }) {
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
