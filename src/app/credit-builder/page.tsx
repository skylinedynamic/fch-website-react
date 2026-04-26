import { getCreditBuilderData } from '@/lib/api/cmsService';
import Image from 'next/image';
import Link from 'next/link';
import CreditBuilderFaq from '@/components/credit-builder/CreditBuilderFaq';

export const metadata = {
  title: 'Credit Builder | Four Corner Funding',
  description: 'Structured, underwriting-aligned business credit infrastructure built for real funding eligibility.',
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
              <h1 className="wow fadeInUp animated" data-wow-delay=".2s">
                {data.hero.title}
              </h1>
              <div className="text-item wow fadeInUp animated" data-wow-delay=".4s">
                <p>{data.hero.text}</p>
              </div>

              <div className="hero-button wow fadeInUp animated mt-4" data-wow-delay=".6s">
                <Link href={data.hero.cta.link} className="theme-btn btn-style-one">
                  {data.hero.cta.text}
                  <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Important Funding Notice */}
      <section className="funding-notice-section section-padding pb-0">
        <div className="auto-container">
          <div className="info-alert-box wow fadeInUp animated" data-wow-delay=".2s">
            <div className="row g-4 align-items-center">
              <div className="col-lg-8">
                <h3>{data.fundingNotice.title}</h3>
                <p>{data.fundingNotice.text}</p>
              </div>
              <div className="col-lg-4">
                <div className="points-box">
                  <ul className="tier-points mb-0">
                    {data.fundingNotice.points.map((p, i) => (
                      <li key={i} style={{ color: '#fff' }}>{p}</li>
                    ))}
                  </ul>
                  <p className="mt-3" style={{ color: '#2D9A96', fontWeight: '600', fontStyle: 'italic' }}>
                    {data.fundingNotice.footer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Structure Matters Section */}
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
                  <div className="mistake-card wow fadeInUp animated" data-wow-delay=".4s">
                    <div className="benefit-pill">COMMON DENIAL TRIGGERS</div>
                    <ul className="mistake-list">
                      {data.about.features.map((f, i) => (
                        <li key={i}>
                          <i className="fa-solid fa-triangle-exclamation"></i>
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
                    <Image src="/images/home-5/about/about-image.jpg" alt="img" width={600} height={400} className="rounded-4" />
                  </div>
                  <div className="count-box counted">
                    <div className="counter"><span className="count-text">PRO</span></div>
                    <div className="counter-title">Institutional Alignment</div>
                    <div className="counter-btn color-white"><Link href="/pre-qualification">Get Started</Link></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tiers Section */}
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
          <div className="row g-4">
            {data.process.steps.map((tier, i) => (
              <div key={i} className="col-xl-3 col-lg-6 col-md-6 wow fadeInUp animated" data-wow-delay={`${i * 100}ms`}>
                <div className="tier-card">
                  <span className="tier-number">{tier.number}</span>
                  <h4 className="tier-title">{tier.title}</h4>
                  <p className="text-sm mb-4" style={{ fontSize: '14px', color: '#666' }}>{tier.text}</p>
                  <ul className="tier-points">
                    {(tier.points || []).map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                  {tier.footer && (
                    <div className="tier-footer">
                      {tier.footer}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="whats-included-section section-padding">
        <div className="auto-container">
          <div className="sec-title text-center mb-60">
            <h6 className="sub-title wow fadeInUp animated">
              <span className="triangle triangle1"></span>
              <span className="triangle triangle2"></span>
              {data.whatsIncluded.subtitle}
            </h6>
            <h2 className="title wow fadeInUp animated" data-wow-delay=".2s">{data.whatsIncluded.title}</h2>
          </div>
          <div className="row g-4 justify-content-center">
            {data.whatsIncluded.sections.map((section, i) => (
              <div key={i} className="col-lg-4 col-md-6 wow fadeInUp animated" data-wow-delay={`${i * 100}ms`}>
                <div className="tier-card" style={{ padding: '30px', background: '#f8fafc' }}>
                  <h4 style={{ fontSize: '18px', marginBottom: '15px', color: '#062928' }}>{section.title}</h4>
                  <ul className="tier-points mb-0">
                    {section.list.map((item, idx) => (
                      <li key={idx} style={{ fontSize: '14px' }}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <p className="fw-bold text-muted italic">{data.whatsIncluded.footer}</p>
          </div>
        </div>
      </section>

      {/* Ideal Users Section */}
      <section className="why-choose-section who-for-section fix section-padding">
        <div className="auto-container">
          <div className="sec-title text-center mb-60">
            <h6 className="sub-title wow fadeInUp animated">
              <span className="triangle triangle1"></span>
              <span className="triangle triangle2"></span>
              {data.idealUsers.subtitle}
            </h6>
            <h2 className="title wow fadeInUp animated" data-wow-delay=".2s">{data.idealUsers.title}</h2>
          </div>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="designed-for-box wow fadeInLeft animated">
                <h4 className="mb-4" style={{ color: '#062928' }}>Designed For:</h4>
                <ul className="why-list p-0">
                  {data.idealUsers.list.map((item, i) => (
                    <li key={i} className="d-flex align-items-center gap-3 mb-3">
                      <img src="/images/home-3/list-icon.png" alt="icon" width={20} />
                      <span style={{ fontSize: '16px', fontWeight: '500' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="not-designed-box wow fadeInRight animated">
                <h4 className="mb-4" style={{ color: '#991b1b' }}>Not Designed For:</h4>
                <ul className="mistake-list p-0">
                  {data.idealUsers.notFor.map((item, i) => (
                    <li key={i} className="d-flex align-items-center gap-3 mb-3" style={{ color: '#991b1b' }}>
                      <i className="fa-solid fa-circle-xmark"></i>
                      <span style={{ fontSize: '16px', fontWeight: '500' }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section fix section-padding">
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
            <div className="price-note text-start border-top pt-4 mt-2" dangerouslySetInnerHTML={{ __html: data.pricing.note }} />
            <div className="pricing-btns mt-4">
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
          <div className="pricing-footer wow fadeInUp animated" data-wow-delay=".6s">
            {data.pricing.footer}
          </div>
        </div>
      </section>

      {/* System Integrity & Standards Section */}
      <section className="integrity-section section-padding gray-bg">
        <div className="auto-container">
          <div className="sec-title text-center mb-60">
            <h6 className="sub-title wow fadeInUp animated">
              <span className="triangle triangle1"></span>
              <span className="triangle triangle2"></span>
              System Standards
            </h6>
            <h2 className="title wow fadeInUp animated" data-wow-delay=".2s">Built for Compliance — Not Just Marketing</h2>
          </div>
          <div className="row g-4 justify-content-center">
            <div className="col-lg-10">
              <div className="row g-4">
                {data.hero.notices.map((notice, i) => (
                  <div key={i} className="col-lg-6 col-md-6 wow fadeInUp animated" data-wow-delay={`${i * 100}ms`}>
                    <div className="not-item" style={{ background: '#fff', border: '1px solid #e5e7eb', padding: '15px 25px', borderRadius: '12px', color: '#111827' }}>
                      <span className="icon" style={{ color: '#ef4444', marginRight: '10px' }}><i className="fa-solid fa-circle-xmark"></i></span>
                      {notice}
                    </div>
                  </div>
                ))}
              </div>
              <div className="not-item compliance wow fadeInUp animated mt-5" data-wow-delay=".5s" style={{ background: '#062928', borderColor: '#2D9A96', color: '#fff', padding: '25px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                <span className="icon" style={{ color: '#2D9A96', fontSize: '24px', marginRight: '15px' }}><i className="fa-solid fa-circle-check"></i></span>
                <span style={{ fontSize: '18px', fontWeight: '500' }}>
                  Every stage is eligibility-gated. Every advancement is validated. Every funding pathway is reviewed — not guessed.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Growth Section */}
      <section className="growth-section section-padding bg-cover parallaxie" style={{ backgroundImage: "url('/images/home-2/choose-us/choose-us-bg.jpg')", backgroundSize: 'cover' }}>
        <div className="auto-container">
          <div className="sec-title text-center">
            <h2 className="text-white wow fadeInUp animated" data-wow-delay=".2s" style={{ fontSize: '42px' }}>{data.growth.title}</h2>
            <p className="text-white opacity-75 mt-3 mb-5 mx-auto" style={{ maxWidth: '800px', fontSize: '18px' }}>
              {data.growth.description}
            </p>

            <div className="row g-4 justify-content-center mb-5">
              {data.growth.points.map((p, i) => (
                <div key={i} className="col-auto">
                  <div className="not-item" style={{ background: 'rgba(255,255,255,0.1)', border: 'none' }}>
                    <i className="fa-solid fa-check text-success"></i> {p}
                  </div>
                </div>
              ))}
            </div>

            <div className="ready-box mt-5">
              <h3 className="text-white mb-3">{data.growth.readyTitle}</h3>
              <p className="text-white opacity-75 mb-4">{data.growth.readyText}</p>
              <Link href={data.growth.cta[0].link} className="theme-btn btn-style-one">
                {data.growth.cta[0].text}
                <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
              </Link>
            </div>

            <div className="growth-footer-disclaimer">
              {data.growth.disclaimer}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <CreditBuilderFaq data={data.faq} />
    </main>
  );
}
