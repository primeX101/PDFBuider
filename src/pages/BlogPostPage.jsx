import React from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, User } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import AdUnit from '../components/AdUnit';
import BlogSidebar from '../components/BlogSidebar';
import { blogPosts, getRelatedPosts } from '../data/blogPosts';

/** Renders a single body block — supports string (legacy) and typed object */
function BodyBlock({ block, index }) {
  // Legacy: plain string → render as paragraph
  if (typeof block === 'string') return <p>{block}</p>;

  switch (block.type) {
    case 'h2': return <h2>{block.text}</h2>;
    case 'h3': return <h3>{block.text}</h3>;
    case 'ul': return <ul>{(block.items || []).map((li, i) => <li key={i}>{li}</li>)}</ul>;
    case 'ol': return <ol>{(block.items || []).map((li, i) => <li key={i}>{li}</li>)}</ol>;
    case 'callout': return <blockquote className="blog-callout"><p>{block.text}</p></blockquote>;
    default: return <p>{block.text || block}</p>;
  }
}

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

  const relatedPosts = getRelatedPosts(slug, 3);

  return (
    <div className="content-page">
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
      />

      {/* JSON-LD structured data for Article */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            dateModified: post.dateModified || post.date,
            author: {
              '@type': 'Organization',
              name: post.author,
              url: 'https://www.amprimedev.xyz'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Paperly by AmprimeDev',
              url: 'https://www.amprimedev.xyz'
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://www.amprimedev.xyz/blog/${post.slug}`
            }
          })}
        </script>
      </Helmet>

      {/* Breadcrumb */}
      <div className="blog-breadcrumb">
        <div className="blog-breadcrumb-inner">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/blog">Blog</Link>
          <span>/</span>
          <span className="breadcrumb-current">{post.title}</span>
        </div>
      </div>

      <div className="blog-layout blog-post-layout">
        {/* Main article */}
        <main className="blog-main">
          <article className="blog-article">
            <header className="blog-article-header">
              <span className="blog-category-badge">{post.category}</span>
              <h1>{post.title}</h1>
              <div className="blog-article-meta">
                <span><User size={14} /> {post.author}</span>
                <span><Calendar size={14} /> {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span><Clock size={14} /> {post.readTime}</span>
              </div>
            </header>

            {/* Article body — supports both legacy string[] and structured block[] */}
            <div className="blog-article-body">
              {post.body.map((block, i) => (
                <React.Fragment key={i}>
                  <BodyBlock block={block} index={i} />
                  {/* Mid-article ad after the 4th block */}
                  {i === 3 && <AdUnit slot="blog-mid-article" contentReady={true} />}
                </React.Fragment>
              ))}
            </div>

            {/* Author bio */}
            <div className="blog-author-bio">
              <div className="author-avatar-circle">A</div>
              <div className="author-bio-text">
                <strong className="author-bio-name">{post.author}</strong>
                <p>The Paperly editorial team writes practical guides about PDF workflows, document management, and privacy-first software. We build browser-based tools used by professionals, students, and businesses worldwide.</p>
              </div>
            </div>

            {/* Tags */}
            <div className="blog-tags">
              <Tag size={14} />
              {post.tags.map(tag => (
                <span key={tag} className="blog-tag">{tag}</span>
              ))}
            </div>
          </article>

          {/* Related posts */}
          {relatedPosts.length > 0 && (
            <section className="blog-related">
              <h2>Related Articles</h2>
              <div className="blog-related-grid">
                {relatedPosts.map(rp => (
                  <Link key={rp.slug} to={`/blog/${rp.slug}`} className="blog-related-card">
                    <span className="blog-category-badge small">{rp.category}</span>
                    <h3>{rp.title}</h3>
                    <p>{rp.excerpt}</p>
                    <span className="blog-read-more">Read article <ArrowRight size={13} /></span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Back to blog */}
          <div className="blog-back">
            <Link to="/blog" className="blog-back-link">
              <ArrowLeft size={15} /> Back to all articles
            </Link>
          </div>
        </main>

        {/* Sidebar */}
        <BlogSidebar currentSlug={slug} />
      </div>
    </div>
  );
}


