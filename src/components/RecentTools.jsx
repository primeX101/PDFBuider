import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { toolsById, toolIcons } from './ToolWorkbench';
import { FileText } from 'lucide-react';

const STORAGE_KEY = 'paperly_recent_tools';

export default function RecentTools() {
  const [recentIds, setRecentIds] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      setRecentIds(stored.filter(id => toolsById[id]));
    } catch (_) {}
  }, []);

  if (recentIds.length === 0) return null;

  return (
    <section className="recent-tools-section">
      <div className="recent-tools-header">
        <Clock size={15} />
        <span>Recently used</span>
      </div>
      <div className="recent-tools-row">
        {recentIds.map(id => {
          const tool = toolsById[id];
          const Icon = toolIcons[id] || FileText;
          return (
            <Link key={id} to={`/tools/${id}`} className="recent-tool-chip">
              <Icon size={14} />
              <span>{tool.name}</span>
              <ArrowRight size={12} className="recent-chip-arrow" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
