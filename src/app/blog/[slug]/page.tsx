'use client';

import { useState, useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import BlogSidebar from '@/components/ui/BlogSidebar';
import { 
  getBlogPostBySlug, 
  getBlogCategories, 
  getBlogTags 
} from '@/lib/api/cmsService';

export default function BlogDetailsPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const p = await getBlogPostBySlug(slug);
      if (!p) {
        notFound();
      }
      setPost(p);
      const cats = await getBlogCategories();
      setCategories(cats);
      const t = await getBlogTags();
      setTags(t);
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.WOW && !loading) {
      new window.WOW().init();
    }
  }, [loading]);

  if (loading) return null;

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
                    <li><Link href="#"><i className="fas fa-user-circle"></i> {post.author}</Link></li>
                    <li><Link href="#"><i className="fas fa-comments"></i> {post.comments < 10 ? `0${post.comments}` : post.comments} Comments</Link></li>
                  </ul>
                  <h3 className="blog-details__title">{post.title}</h3>
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                <div className="blog-details__bottom">
                  <p className="blog-details__tags">
                    <span>Tags</span>
                    {post.tags.map((tag, i) => (
                      <Link key={i} href="#">{tag}</Link>
                    ))}
                  </p>
                  <div className="blog-details__social-list">
                    <Link href="#"><i className="fa fa-x"></i></Link>
                    <Link href="#"><i className="fab fa-facebook"></i></Link>
                    <Link href="#"><i className="fab fa-pinterest-p"></i></Link>
                    <Link href="#"><i className="fab fa-instagram"></i></Link>
                  </div>
                </div>

                {/* Nav Links */}
                <div className="nav-links">
                  <div className="prev">
                    <Link href="/blog/scenarios-established-businesses" rel="prev">Established Businesses Scenario</Link>
                  </div>
                  <div className="next">
                    <Link href="/blog/new-early-stage-businesses" rel="next">New / Early-Stage Businesses</Link>
                  </div>
                </div>

                {/* Comment Section (Simplified for Demo) */}
                <div className="comment-one">
                  <h3 className="comment-one__title">{post.comments} Comments</h3>
                  <div className="comment-one__single">
                    <div className="comment-one__image"> <img src="/images/inner/news-details/testi-2.jpg" alt="" /> </div>
                    <div className="comment-one__content">
                      <h3>Kevin Martin</h3>
                      <p>Mauris non dignissim purus, ac commodo diam. Donec sit amet lacinia nulla. Aliquam quis purus in justo pulvinar tempor. Aliquam tellus nulla, sollicitudin at euismod.</p>
                      <button className="theme-btn btn-style-two comment-one__btn"><span className="btn-title">Reply</span></button>
                    </div>
                  </div>
                  {/* ... duplicate if needed ... */}
                </div>

                {/* Comment Form */}
                <div className="comment-form">
                  <h3 className="comment-form__title mb-30">Leave a Comment</h3>
                  <form id="contact_form" name="contact_form" action="#" method="post">
                    <div className="row">
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <input name="form_name" className="form-control required" type="text" placeholder="Enter Name" />
                        </div>
                      </div>
                      <div className="col-sm-6">
                        <div className="mb-3">
                          <input name="form_email" className="form-control required email" type="email" placeholder="Enter Email" />
                        </div>
                      </div>
                    </div>
                    <div className="mb-3">
                        <textarea name="form_message" className="form-control required" rows={5} placeholder="Enter Message"></textarea>                    </div>
                    <div className="mb-3">
                      <button type="submit" className="theme-btn btn-two">
                        <span className="theme-btn btn-style-one rounded-0 ">Submit Comment</span>
                      </button>
                    </div>
                  </form>
                </div>
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
