import Link from 'next/link';
import { cmsService } from '@/services/cms.service';
import BlogListingClient from './BlogListingClient';

import { Metadata } from 'next';
import { getDynamicMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('/blog');
}

export default async function BlogIndexPage() {
  const posts = await cmsService.fetchBlogPosts({ is_featured: 1 });

  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section hero-3" style={{ backgroundImage: "url('/images/home-3/hero/hero-bg.png')" }}>
        <div className="row g-4 align-items-center">
          <div className="col-xl-7 col-lg-6">
            <div className="hero-content">
              <ul className="page-breadcrumb pb-2">
                <li><Link href="/">Home</Link></li>
                <li>Blog</li>
              </ul>
              <h1>Latest News & Insights</h1>
              <div className="hero-button">
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
            {posts.map((post, idx) => (
              <div key={idx} className="col-xl-4 col-lg-4 col-md-6">
                <div className="news-box-items">
                  <div className="news-image">
                    <img src={post.image} alt={post.title} />
                    <img src={post.image} alt={post.title} />
                    <span className="post-box">
                      <span className="date">{post.date}</span>
                      <span className="month">{post.month}</span>
                    </span>
                  </div>
                  <div className="news-content">
                    <ul className="comments-list">
                      <li><i className="lnr-icon-user1"></i> {post.author}</li>
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
      <BlogListingClient />
    </main>
  );
}
