import Link from 'next/link';
import Image from 'next/image';

export default function BlogSection({ data }) {
  const { blog } = data;
  return (
    <section className="news-secton section-padding fix">
      <div className="auto-container">
        <div className="sec-title text-center">
          <h6 className="sub-title wow fadeInUp">
            <span className="triangle triangle1"></span>
            <span className="triangle triangle2"></span>
            {blog.subtitle}
          </h6>
          <h2 className="wow fadeInUp" data-wow-delay=".3s">{blog.title}</h2>
        </div>
        <div className="row">
          {blog.posts.map((post, idx) => (
            <div key={idx} className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`${(idx * 2) + 3}00ms`}>
              <div className="news-box-items">
                <div className="news-image">
                  <Image src={post.image} alt={post.title} width={450} height={300} style={{ width: '100%', height: 'auto' }} />
                  <Image src={post.image} alt={post.title} width={450} height={300} style={{ width: '100%', height: 'auto' }} />
                  <span className="post-box">
                    <span className="date">{post.date}</span>
                    <span className="month">{post.month}</span>
                  </span>
                </div>
                <div className="news-content">
                  {/* <ul className="comments-list">
                    <li><i className="lnr-icon-user1"></i> {post.author}</li>
                    <li><i className="lnr-icon-comment"></i> {post.comments}</li>
                  </ul> */}
                  <h3>
                    <Link href={post.link}>{post.title}</Link>
                  </h3>
                  <Link href={post.link} className="link-btn">
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
  );
}
