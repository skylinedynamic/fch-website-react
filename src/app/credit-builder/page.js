import { getCreditBuilderData } from '@/lib/api/cmsService';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Credit Builder',
  description: 'Build Business Credit the Right Way — With or Without a Personal Guarantee',
};

export default async function CreditBuilderPage() {
  const data = await getCreditBuilderData();
  
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-section hero-3" style={{ backgroundImage: "url('/images/home-3/hero/hero-bg.png')" }}>
        <div className="row g-4 align-items-center">
          <div className="col-xl-7 col-lg-6">
            <div className="hero-content">
              <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                <li><Link href="/">Home</Link></li>
                <li>Credit Builder</li>
              </ul>
              <h1 className="wow fadeInUp credit-builder-h1" data-wow-delay=".2s">{data.hero.title}</h1>
              <div className="text-item wow fadeInUp" data-wow-delay=".4s">
                <p>{data.hero.text}</p>
              </div>
              <div className="hero-button wow fadeInUp animated" data-wow-delay=".6s">
                <Link href={data.hero.cta.link} className="theme-btn btn-style-one">
                  {data.hero.cta.text}
                  <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section-three fix pb-120 section-padding">
        <div className="auto-container">
          <div className="row g-4 align-items-center">
            <div className="col-md-6">
              <div className="content-colmun">
                <div className="content-box">
                  <div className="sec-title">
                    <h6 className="sub-title wow fadeInUp animated">
                      <span className="triangle triangle1"></span>
                      <span className="triangle triangle2"></span>
                      {data.about.subtitle}
                    </h6>
                    <h2 className="wow fadeInUp animated" data-wow-delay=".2s">{data.about.title}</h2>
                    <div className="text">{data.about.text}</div>
                  </div>
                  <div className="feature-box">
                    <div className="shape-image"><Image src="/images/home-5/about/about-shape-image.png" alt="" width={100} height={100} /></div>
                    <div className="feature-title">We help you:</div>
                    <ul className="feature-list">
                      {data.about.features.map((f, i) => (
                        <li key={i}>
                          <span className="icon"><i className="fa-solid fa-check"></i></span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="image-colmun">
                <div className="image-box">
                  <div className="about-image">
                    <Image src="/images/home-5/about/about-image.jpg" alt="img" width={600} height={400} />
                  </div>
                  <div className="count-box counted">
                    <div className="counter"><span className="count-text">40</span>+</div>
                    <div className="counter-title">Expert Team Members</div>
                    <div className="counter-btn color-white"><Link href="/contact">Contact Us</Link></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="how-it-work-section fix section-padding gray-bg pt-120">
        <div className="auto-container">
          <div className="sec-title text-center mb-60">
            <h6 className="sub-title wow fadeInUp animated">
              <span className="triangle triangle1"></span>
              <span className="triangle triangle2"></span>
              {data.process.subtitle}
            </h6>
            <h2 className="title wow fadeInUp animated" data-wow-delay=".2s">{data.process.title}</h2>
          </div>
          <div className="how-it-work-wrapper border-none">
            <div className="row">
              {data.process.steps.map((s, i) => (
                <div key={i} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 wow fadeInUp animated" data-wow-delay={`${(i+1)*2}00ms`}>
                  <div className="how-it-work-items-style-3 style-2">
                    <h3 className="number">{s.number}</h3>
                    <h4 className="title">{s.title}</h4>
                    <p className="text">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <h5 className="how-sec-text mt-20 wow fadeInUp animated" data-wow-delay=".3s">
            <Link href="/pre-qualification">Get-Pre-Qualified</Link>
          </h5>
        </div>
      </section>

      {/* Strategy Section */}
      <section className="pg-strategy-section section-padding bg-cover parallaxie" style={{ backgroundImage: "url('/images/home-2/choose-us/choose-us-bg.jpg')" }}>
        <div className="auto-container">
          <div className="sec-title text-center mb-60">
            <h6 className="sub-title text-white wow fadeInUp animated">
              <span className="triangle triangle1"></span>
              <span className="triangle triangle2"></span>
              {data.strategy.subtitle}
            </h6>
            <h2 className="title text-white wow fadeInUp animated" data-wow-delay=".2s">{data.strategy.title}</h2>
          </div>
          <div className="row g-4">
            {data.strategy.cards.map((c, i) => (
              <div key={i} className={`col-lg-6 wow ${i === 0 ? 'fadeInLeft' : 'fadeInRight'} animated`} data-wow-delay=".3s">
                <div className="strategy-card">
                  <h3>{c.title}</h3>
                  <ul className="feature-list style-two">
                    {c.list.map((li, idx) => (
                      <li key={idx}>
                        <span className="icon"><i className="fa-solid fa-check"></i></span>
                        {li}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section fix">
        <div className="auto-container">
          <div className="sec-title text-center mb-60">
            <h6 className="sub-title wow fadeInUp animated">
              <span className="triangle triangle1"></span>
              <span className="triangle triangle2"></span>
              {data.pricing.subtitle}
            </h6>
            <h2 className="title wow fadeInUp animated" data-wow-delay=".2s">{data.pricing.title}</h2>
          </div>
          <div className="pricing-card wow fadeInUp animated" data-wow-delay=".4s">
            <div className="pricing-badge">{data.pricing.badge}</div>
            <div className="price-amount">{data.pricing.amount}</div>
            <div className="price-sub">{data.pricing.sub}</div>
            <p className="price-note" dangerouslySetInnerHTML={{ __html: data.pricing.note }} />
            <div className="pricing-btns">
              <Link href="/contact" className="pricing-btn primary">
                Enroll Now
                <span className="icon-circle"><i className="fa-solid fa-arrow-up-right-from-square"></i></span>
              </Link>
              <Link href="/contact" className="pricing-btn secondary">
                Book a Call
                <span className="icon-circle"><i className="fa-solid fa-arrow-up-right-from-square"></i></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
