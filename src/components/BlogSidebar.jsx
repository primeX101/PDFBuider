import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, FileText, FolderOpen, Sparkles, TrendingUp } from 'lucide-react';
import { getRecentPosts, getBlogCategories } from '../data/blogPosts';

const popularTools = [
  { id: 'merge', label: 'Merge PDF' },
  { id: 'compress', label: 'Compress PDF' },
  { id: 'split', label: 'Split PDF' },
  { id: 'pdf-word', label: 'PDF to Word' },
  { id: 'ocr', label: 'OCR PDF' },
  { id: 'watermark', label: 'Watermark PDF' },
];

export default function BlogSidebar({ currentSlug = null, activeCategory = null, onCategoryClick = null }) {
  const recentPosts = getRecentPosts(5, currentSlug);
  const categories = getBlogCategories();

  return (
    <aside className="blog-sidebar">
      {/* Recent Posts */}
      <div className="sidebar-widget">
        <h3><Clock size={15} /> Recent Posts</h3>
        <ul className="sidebar-post-list">
          {recentPosts.map(post => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`}>
                <span className="sidebar-post-title">{post.title}</span>
                <span className="sidebar-post-meta">{post.readTime} · {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Categories */}
      <div className="sidebar-widget">
        <h3><FolderOpen size={15} /> Categories</h3>
        <ul className="sidebar-category-list">
          {onCategoryClick && (
            <li>
              <button
                className={`sidebar-cat-btn ${!activeCategory ? 'active' : ''}`}
                onClick={() => onCategoryClick(null)}
              >
                <span>All Posts</span>
              </button>
            </li>
          )}
          {categories.map(cat => (
            <li key={cat.name}>
              {onCategoryClick ? (
                <button
                  className={`sidebar-cat-btn ${activeCategory === cat.name ? 'active' : ''}`}
                  onClick={() => onCategoryClick(cat.name)}
                >
                  <span>{cat.name}</span>
                  <span className="cat-count">{cat.count}</span>
                </button>
              ) : (
                <Link to={`/blog?category=${encodeURIComponent(cat.name)}`} className="sidebar-cat-btn">
                  <span>{cat.name}</span>
                  <span className="cat-count">{cat.count}</span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Popular Tools */}
      <div className="sidebar-widget">
        <h3><TrendingUp size={15} /> Popular Tools</h3>
        <ul className="sidebar-tools-list">
          {popularTools.map(tool => (
            <li key={tool.id}>
              <Link to={`/tools/${tool.id}`}>
                <FileText size={14} />
                <span>{tool.label}</span>
                <ArrowRight size={13} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter / CTA */}
      <div className="sidebar-widget sidebar-cta">
        <Sparkles size={20} />
        <h3>Try Paperly Free</h3>
        <p>Process PDFs privately in your browser. No uploads, no accounts.</p>
        <Link to="/tools/merge" className="sidebar-cta-btn">
          Get Started <ArrowRight size={14} />
        </Link>
      </div>
    </aside>
  );
}
