import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Search, X } from 'lucide-react';
import SEO from '../components/SEO';
import BlogSidebar from '../components/BlogSidebar';
import { blogPosts, getBlogCategories } from '../data/blogPosts';

export default function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || null;
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = getBlogCategories();

  const filteredPosts = useMemo(() => {
    const sorted = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
    const q = searchQuery.trim().toLowerCase();

    // Search mode: ignore category filter
    if (q) {
      return sorted.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }

    if (!activeCategory) return sorted;
    return sorted.filter(p => p.category === activeCategory);
  }, [activeCategory, searchQuery]);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setSearchQuery(''); // clear search when switching categories
    if (cat) {
      setSearchParams({ category: cat });
    } else {
      setSearchParams({});
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Clear active category while searching
    if (e.target.value) {
      setActiveCategory(null);
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <div className="content-page">
      <SEO
        title="Blog — PDF Tips, Guides & Document Productivity"
        description="Expert guides, practical tips, and in-depth articles about PDF tools, document management, privacy, and productivity. Learn how to work smarter with your documents."
        path="/blog"
      />

      <section className="content-hero blog-hero">
        <span className="tiny-kicker">PAPERLY BLOG</span>
        <h1>Tips, guides & <em>insights.</em></h1>
        <p>Expert articles about PDF tools, document workflows, privacy, and productivity — helping you work smarter with every document.</p>

        {/* Search bar */}
        <div className="blog-search-wrap">
          <div className="blog-search-box">
            <Search size={16} className="blog-search-icon" />
            <input
              id="blog-search-input"
              type="search"
              className="blog-search-input"
              placeholder="Search articles, topics, or tags…"
              value={searchQuery}
              onChange={handleSearchChange}
              aria-label="Search blog articles"
            />
            {searchQuery && (
              <button className="blog-search-clear" onClick={clearSearch} aria-label="Clear search">
                <X size={14} />
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="blog-search-count">
              {filteredPosts.length} result{filteredPosts.length !== 1 ? 's' : ''} for &ldquo;<strong>{searchQuery}</strong>&rdquo;
            </p>
          )}
        </div>
      </section>

      {/* Category filter chips — hidden when searching */}
      {!searchQuery && (
        <div className="blog-filter-bar">
          <div className="blog-filter-inner">
            <button
              className={`blog-chip ${!activeCategory ? 'active' : ''}`}
              onClick={() => handleCategoryClick(null)}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.name}
                className={`blog-chip ${activeCategory === cat.name ? 'active' : ''}`}
                onClick={() => handleCategoryClick(cat.name)}
              >
                {cat.name} <span className="chip-count">{cat.count}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="blog-layout">
        {/* Main content: post grid */}
        <main className="blog-main">
          {filteredPosts.length === 0 && (
            <div className="blog-empty">
              {searchQuery
                ? <p>No articles found for &ldquo;<strong>{searchQuery}</strong>&rdquo;. Try a different search term.</p>
                : <p>No posts found in this category.</p>
              }
            </div>
          )}

          <div className="blog-grid">
            {filteredPosts.map((post, idx) => (
              <article key={post.slug} className={`blog-card ${idx === 0 && !activeCategory && !searchQuery ? 'featured' : ''}`}>
                <Link to={`/blog/${post.slug}`} className="blog-card-link">
                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span className="blog-category-badge">{post.category}</span>
                      <span className="blog-card-date">
                        <Calendar size={12} />
                        {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.excerpt}</p>
                    <div className="blog-card-footer">
                      <span className="blog-read-time"><Clock size={12} /> {post.readTime}</span>
                      <span className="blog-read-more">Read article <ArrowRight size={14} /></span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </main>

        {/* Sidebar */}
        <BlogSidebar
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />
      </div>
    </div>
  );
}
