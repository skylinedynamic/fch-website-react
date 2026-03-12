import Link from 'next/link';

export default function BlogSidebar({ categories, tags, latestPosts }) {
  return (
    <div className="sidebar">
      <div className="sidebar__single sidebar__search">
        <form action="#" className="sidebar__search-form">
          <input type="search" placeholder="Search here" />
          <button type="submit"><i className="far fa-search"></i></button>
        </form>
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
                    <span className="sidebar__post-content-meta">
                      <i className="fas fa-user-circle"></i> Admin
                    </span>
                    <Link href={post.link}>{post.title}</Link>
                  </h3>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {categories && categories.length > 0 && (
        <div className="sidebar__single sidebar__category">
          <h3 className="sidebar__title">Categories</h3>
          <ul className="sidebar__category-list list-unstyled">
            {categories.map((cat, index) => (
              <li key={index} className={cat.active ? 'active' : ''}>
                <Link href={`/blog/category/${cat.id}`}>
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
              <Link key={index} href={`/blog/tag/${tag.toLowerCase()}`}>{tag}</Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
