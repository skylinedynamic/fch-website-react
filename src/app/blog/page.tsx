'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { blogData } from '@/data/blogData';

export default function BlogIndexPage() {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.WOW) {
      new window.WOW().init();
    }
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section hero-3" style={{ backgroundImage: "url('/images/home-3/hero/hero-bg.png')" }}>
        <div className="row g-4 align-items-center">
          <div className="col-xl-7 col-lg-6">
            <div className="hero-content">
              <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                <li><Link href="/">Home</Link></li>
                <li>Blog</li>
              </ul>
              <h1 className="wow fadeInUp" data-wow-delay=".2s">Latest News & Insights</h1>
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

      {/* Blog Listing Section */}
      <section className="news-secton section-padding fix">
        <div className="auto-container">
          <div className="row">
            {blogData.map((post, idx) => (
              <div key={idx} className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${(idx * 2) + 3}00ms`}>
                <div className="news-box-items">
                  <div className="news-image">
                    <img src={post.image} alt="img" />
                    <img src={post.image} alt="img" />
                    <span className="post-box">
                      <span className="date">{post.date}</span>
                      <span className="month">{post.month}</span>
                    </span>
                  </div>
                  <div className="news-content">
                    <ul className="comments-list">
                      <li><i className="lnr-icon-user1"></i> {post.author}</li>
                      <li><i className="lnr-icon-comment"></i> {post.comments} Comments</li>
                    </ul>
                    <h3>
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <Link href={`/blog/${post.slug}`} className="link-btn">
                      Learn More
                      <span className="icon"><i className="lnr-icon-arrow-right"></i></span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
