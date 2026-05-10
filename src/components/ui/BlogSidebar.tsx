'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function BlogSidebar({ categories, tags, latestPosts }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/blog');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__single custom-sidebar-search-wrapper">
        <div className="custom-sidebar-search">
          <input 
            type="text" 
            placeholder="Search here" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {searchQuery && (
            <button 
              type="button" 
              onClick={() => { setSearchQuery(''); router.push('/blog'); }}
              style={{ cursor: 'pointer', marginRight: '10px', fontSize: '16px', opacity: 0.7 }}
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
          <button 
            type="button" 
            onClick={() => handleSearch()}
            style={{ cursor: 'pointer' }}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>

      {latestPosts && latestPosts.length > 0 && (
        <div className="sidebar__single sidebar__post">
          <h3 className="sidebar__title">Latest Posts</h3>
          <ul className="sidebar__post-list list-unstyled">
            {latestPosts.map((post, index) => (
              <li key={index}>
                <div className="sidebar__post-image">
                  <img src={post.image} alt="" />
                </div>
                <div className="sidebar__post-content">
                  <h3>
                    <Link href={`/blog/${post.slug}`} className="sidebar__post-title-span">{post.title}</Link>
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {categories && categories.filter((cat: any) => cat.count > 0).length > 0 && (
        <div className="sidebar__single sidebar__category">
          <h3 className="sidebar__title">Categories</h3>
          <ul className="sidebar__category-list list-unstyled">
            {categories.filter((cat: any) => cat.count > 0).map((cat, index) => (
              <li key={index} className={cat.active ? 'active' : ''}>
                <Link href={`/blog?category=${cat.id}`} className="sidebar__link-span" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  {cat.label}
                  <span className="icon-right-arrow"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tags && tags.length > 0 && (
        <div className="sidebar__single sidebar__tags">
          <h3 className="sidebar__title">Tags</h3>
          <div className="sidebar__tags-list">
            {tags.map((tag, index) => (
              <Link key={index} href={`/blog?tag=${tag}`} className="sidebar__tag-span">{tag}</Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
