import Link from 'next/link';
import { cmsService } from '@/services/cms.service';
import BlogListingClient from './BlogListingClient';
import BlogSidebar from '@/components/ui/BlogSidebar';

import { Metadata } from 'next';
import { getDynamicMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('/blog', 'Blog');
}

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: { page?: string, category?: string, tag?: string, search?: string }
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams?.page) || 1;
  const category = resolvedSearchParams?.category || '';
  const tag = resolvedSearchParams?.tag || '';
  const search = resolvedSearchParams?.search || '';

  const filters: any = {};
  if (category) filters.category = category;
  if (tag) filters.tag = tag;
  if (search) filters.search = search;

  const allPosts = await cmsService.fetchBlogPosts(filters);
  const totalPosts = allPosts.length;
  const postsPerPage = 10;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const posts = allPosts.slice((page - 1) * postsPerPage, page * postsPerPage);

  const categories = await cmsService.fetchBlogCategories();
  const tags = await cmsService.fetchBlogTags();
  const latestPosts = await cmsService.fetchBlogPosts({ per_page: 3 });

  return (
    <main className="blog-page">
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
            <div className="col-xl-8 col-lg-7">
              <div className="row">
                {posts.map((post, idx) => (
                  <div key={idx} className="col-xl-6 col-lg-12 col-md-6 mb-4">
                    <div className="news-box-items mt-0">
                      <div className="news-image">
                        <img src={post.image} alt={post.title} />
                        <img src={post.image} alt={post.title} />
                        <span className="post-box">
                          <span className="date">{post.date}</span>
                          <span className="month">{post.month}</span>
                        </span>
                        {post.category?.name && (
                          <span className="blog-card__cat">{post.category.name}</span>
                        )}
                      </div>
                      <div className="news-content">
                        <ul className="comments-list">
                          <li><i className="lnr-icon-user1"></i> {post.author}</li>
                        </ul>
                        <h3>
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        {post.summary && (
                          <p className="blog-card__excerpt">{post.summary}</p>
                        )}
                        <Link href={`/blog/${post.slug}`} className="link-btn">
                          Learn More
                          <span className="icon"><i className="lnr-icon-arrow-right"></i></span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                {posts.length === 0 && (
                  <div className="col-12">
                    <div className="blog-empty">
                      <i className="fas fa-newspaper"></i>
                      <h4>No posts found</h4>
                      <p className="mb-0">Nothing matches the selected criteria yet. Try another category or clear your search.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="text-center mt-5">
                  <ul className="modern-pagination">
                    {page > 1 && (
                      <li><Link href={`/blog?page=${page - 1}${category ? `&category=${category}` : ''}${tag ? `&tag=${tag}` : ''}${search ? `&search=${search}` : ''}`}><i className="fas fa-angle-left"></i></Link></li>
                    )}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                      <li key={pageNum}>
                        <Link href={`/blog?page=${pageNum}${category ? `&category=${category}` : ''}${tag ? `&tag=${tag}` : ''}${search ? `&search=${search}` : ''}`} className={pageNum === page ? 'active' : ''}>{pageNum}</Link>
                      </li>
                    ))}
                    {page < totalPages && (
                      <li><Link href={`/blog?page=${page + 1}${category ? `&category=${category}` : ''}${tag ? `&tag=${tag}` : ''}${search ? `&search=${search}` : ''}`}><i className="fas fa-angle-right"></i></Link></li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <div className="col-xl-4 col-lg-5">
              <BlogSidebar
                categories={categories.map((c: any) => ({ ...c, active: c.id === category }))}
                tags={tags}
                latestPosts={latestPosts}
              />
            </div>
          </div>
        </div>
      </section>
      <BlogListingClient />
    </main>
  );
}
