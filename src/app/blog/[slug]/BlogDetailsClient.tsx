'use client';

import { useState, useEffect } from 'react';

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import BlogSidebar from '@/components/ui/BlogSidebar';

export default function BlogDetailsClient({
  initialPost,
  initialCategories,
  initialTags,
  initialPrevPost,
  initialNextPost,
  slug
}) {
  const [post, setPost] = useState(initialPost);
  const [categories, setCategories] = useState(initialCategories);
  const [tags, setTags] = useState(initialTags);
  const [loading, setLoading] = useState(false);
  const [prevPost, setPrevPost] = useState(initialPrevPost);
  const [nextPost, setNextPost] = useState(initialNextPost);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.WOW) {
      new window.WOW().init();
    }
  }, []);

  if (!post) return null;

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section hero-3" style={{ backgroundImage: "url('/images/home-3/hero/hero-bg.png')" }}>
        <div className="row g-4 align-items-center">
          <div className="col-xl-7 col-lg-6">
            <div className="hero-content">
              <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                <li><Link href="/">Home</Link></li>
                <li>Blog Details</li>
              </ul>
              <h1 className="wow fadeInUp" data-wow-delay=".2s">{post.title}</h1>
              <div className="hero-button wow fadeInUp animated" data-wow-delay=".6s">
                <Link href="/contact" className="theme-btn btn-style-one">
                  Contact Us
                  <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Details Section */}
      <section className="blog-details section-padding">
        <div className="auto-container">
          <div className="row">
            <div className="col-xl-8 col-lg-7">
              <div className="blog-details__left">
                <div className="blog-details__img wow fadeInUp">
                  <img src={post.image} alt={post.title} />
                  <div className="blog-details__date">
                    <span className="day">{post.date}</span>
                    <span className="month">{post.month}</span>
                  </div>
                </div>
                <div className="blog-details__content">
                  <ul className="list-unstyled blog-details__meta">
                    <li><span><i className="fas fa-user-circle"></i> {post.author}</span></li>
                  </ul>
                  <h3 className="blog-details__title">{post.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                <div className="blog-details__bottom">
                  <p className="blog-details__tags">
                    <span>Tags</span>
                    {post.tags.map((tag, i) => (
                      <span key={i}>{tag}</span>
                    ))}
                  </p>
                  <div className="blog-details__social-list">
                    <span><i className="fa fa-x"></i></span>
                    <span><i className="fab fa-facebook"></i></span>
                    <span><i className="fab fa-pinterest-p"></i></span>
                    <span><i className="fab fa-instagram"></i></span>
                  </div>
                </div>

                {/* Dynamic Nav Links */}
                {(prevPost || nextPost) && (
                  <div className="nav-links">
                    {prevPost ? (
                      <div className="prev">
                        <Link href={`/blog/${prevPost.slug}`} rel="prev">{prevPost.title}</Link>
                      </div>
                    ) : <div></div>}
                    {nextPost ? (
                      <div className="next">
                        <Link href={`/blog/${nextPost.slug}`} rel="next">{nextPost.title}</Link>
                      </div>
                    ) : <div></div>}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-xl-4 col-lg-5">
              <BlogSidebar
                categories={categories}
                tags={tags}
                latestPosts={post.latestPosts}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
