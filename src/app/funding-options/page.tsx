import Link from 'next/link';
import FundingFaq from './FundingFaq';

import { Metadata } from 'next';
import { seoConfig } from '@/data/seo';

import { getDynamicMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('/funding-options');
}

const fundingCards = [
  {
    number: '01',
    icon: 'flaticon-business-054-graph',
    title: 'SBA Loans (7a & 504)',
    desc: 'Low rates, long terms — ideal for established businesses and real estate purchases.',
    requirements: ['Min Credit: 650+', 'Docs: 2 years tax returns, P&L, business plan', 'Time: 30–90 days'],
    dark: true,
    link: '/sba-programs'
  },
  {
    number: '02',
    icon: 'flaticon-business-028-briefcase',
    title: 'Business Term Loans',
    desc: 'Fast lump-sum funding for inventory, marketing, or expansion.',
    requirements: ['Min Credit: 600+', 'Time in Biz: 1-2 years', 'Time: 3-7 days'],
    link: '/working-capital-and-growth'
  },
  {
    number: '03',
    icon: 'flaticon-business-011-dollar',
    title: 'Business Line of Credit',
    desc: 'Flexible working capital you can draw on as needed.',
    requirements: ['Revolving credit', 'Min Credit: 600+', 'Time: 1-5 days'],
    link: '/working-capital-and-growth'
  },
  {
    number: '04',
    icon: 'flaticon-finance-business-expense-svgrepo-com-1',
    title: 'Merchant Cash Advance (MCA)',
    desc: 'Fast funding based on your revenue, not your credit.',
    requirements: ['Credit score: 500+', 'Time in Biz: 3-6 months', 'Time: 24-48 hours'],
    link: '/bridge-short-term'
  },
  {
    number: '05',
    icon: 'flaticon-business-030-settings',
    title: 'Equipment Financing',
    desc: 'Purchase or lease trucks, tools, tech, or machinery.',
    requirements: ['Min Credit: 600+', 'Equipment quote required', 'Time: 2-5 days'],
    link: '/asset-and-equipment'
  },
  {
    number: '06',
    icon: 'flaticon-business-057-file',
    title: 'Invoice Factoring',
    desc: 'Turn unpaid invoices into cash — ideal for B2B companies.',
    requirements: ['No minimum credit score', '3+ months in business', 'Time: 2-3 days'],
    link: '/receivables-and-cash-flow'
  },
  {
    number: '07',
    icon: 'flaticon-business-013-idea',
    title: 'Startup Funding / Microloans',
    desc: 'Funding options available even for new businesses and entrepreneurs.',
    requirements: ['Startup plans accepted', 'Personal credit reviewed', 'Options vary by profile'],
  },
];

const faqs = [
  {
    question: 'Will applying hurt my credit?',
    answer: 'No — we use a soft pull or no pull during the prequalification stage.',
    active: false,
  },
  {
    question: "What's the fastest funding program?",
    answer: 'Merchant Cash Advances and Invoice Factoring can fund in as little as 24–48 hours.',
    active: false,
  },
  {
    question: 'Can I get funding with bad credit?',
    answer: 'Yes — we have options for all credit profiles and industries.',
    active: true,
  },
];

import JsonLd from '@/components/seo/JsonLd';

export default function FundingOptionsPage() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Business Funding Options',
    provider: {
      '@type': 'FinancialService',
      name: seoConfig.siteName,
    },
    description: 'A wide range of business funding solutions including SBA loans, Term loans, and MCAs.',
    areaServed: 'US',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Business Loans',
      itemListElement: fundingCards.map((card) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: card.title,
          description: card.desc,
        },
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: seoConfig.siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Funding Options',
        item: `${seoConfig.siteUrl}/funding-options`,
      },
    ],
  };

  return (
    <main>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      {/* ── Hero ── */}
      <section
        className="hero-section hero-3"
        style={{ backgroundImage: "url('/images/home-3/hero/hero-bg.png')" }}
      >
        <div className="row g-4 align-items-center">
          <div className="col-xl-7 col-lg-6">
            <div className="hero-content">
              <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                <li><Link href="/">Home</Link></li>
                <li>Funding Options</li>
              </ul>
              <h1 className="wow fadeInUp" data-wow-delay=".2s">
                Find the Right Funding Fast
              </h1>
              <div className="text-item wow fadeInUp" data-wow-delay=".4s">
                <p>
                  From SBA loans to fast working capital, our AI-powered platform matches your
                  business with the best-fit programs. No guesswork, no hard credit pulls.
                </p>
              </div>
              <div className="hero-button wow fadeInUp animated" data-wow-delay=".6s">
                <Link href="/pre-qualification" className="theme-btn btn-style-one">
                  Get Pre-Qualified
                  <span className="icon">
                    <i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="about-section fix section-padding section-margin">
        <div className="auto-container">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="image-column-3">
                <div className="inner-column">
                  <div className="image1 overlay-anim wow fadeInUp" data-wow-delay=".3s">
                    <img src="/images/home-3/about/about-01.jpg" alt="About Four Corner Funding" />
                  </div>
                  <div className="info float-bob-x">
                    <img src="/images/home-3/about/about-info.png" alt="Info" />
                  </div>
                  <div className="image2 wow fadeInUp" data-wow-delay=".5s">
                    <img src="/images/home-3/business.jpg" alt="Business" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-content-3">
                <div className="sec-title mb-0">
                  <h6 className="sub-title wow fadeInUp">
                    <span className="triangle triangle1"></span>
                    <span className="triangle triangle2"></span>
                    Who We Are
                  </h6>
                  <h2 className="wow fadeInUp" data-wow-delay=".2s">
                    Where Strategy Meets Funding.
                  </h2>
                </div>
                <p className="about-text wow fadeInUp" data-wow-delay=".4s">
                  Four Corner Holdings, LLC is a Florida-based financial services and funding firm
                  built to empower entrepreneurs and established businesses with strategic access to
                  capital, credit-building systems, and customized lending solutions.
                </p>
                <div className="skill-feature wow fadeInUp" data-wow-delay="1s">
                  <h3 className="box-title">Business Success</h3>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      style={{ width: '88%', opacity: 1 }}
                    >
                      <div className="progress-value">
                        <span className="counter-number2">88</span>%
                      </div>
                    </div>
                  </div>
                </div>
                <div className="info mt-50 wow fadeInUp" data-wow-delay=".2s">
                  <Link
                    href="/contact"
                    className="theme-btn btn-style-one wow fadeInUp"
                    data-wow-delay=".5s"
                  >
                    Let's Talk
                    <span className="icon">
                      <i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i>
                    </span>
                  </Link>
                  <div className="user">
                    <div className="image">
                      <img src="/images/home-3/about/craig.png" alt="Craig Rice" />
                    </div>
                    <div>
                      <div className="signature-text">Craig Rice</div>
                      <p className="sub-title">Founder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Funding Categories Grid ── */}
      <section className="funding-categories-grid pt-0">
        <div className="container">
          <div className="row g-4">
            {/* Section title card */}
            <div className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".1s">
              <div className="sec-title">
                <h6 className="sub-title">
                  <span className="triangle triangle1"></span>
                  <span className="triangle triangle2"></span>
                  Funding Categories
                </h6>
                <h2 className="title">Funding paths for every stage of business.</h2>
              </div>
            </div>

            {/* Funding cards */}
            {fundingCards.map((card, i) => (
              <div
                key={card.number}
                className="col-xl-3 col-lg-4 col-md-6 wow fadeInUp"
                data-wow-delay={`.${i + 2}s`}
              >
                <div className={`funding-card${card.dark ? ' dark-bg' : ''}`}>
                  {card.link && (
                    <Link href={card.link} className="funding-card-link">
                      <i className="fas fa-arrow-right"></i>
                    </Link>
                  )}
                  <div className="card-number">{card.number}</div>
                  <div className="card-icon">
                    <i className={card.icon}></i>
                  </div>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-desc">{card.desc}</p>
                  <ul className="funding-requirements">
                    {card.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        className="growth-section section-padding bg-cover parallaxie"
        style={{
          backgroundImage: "url('/images/home-2/choose-us/choose-us-bg.jpg')",
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
        }}
      >
        <div className="sec-shape">
          <img className="sway_Y__animation" src="/images/growth-shape.png" alt="" />
        </div>
        <div className="auto-container">
          <div className="sec-title">
            <div className="row g-4 justify-content-between align-items-center">
              <div className="col-xl-7 col-lg-7">
                <h6 className="text-white sub-title wow fadeInUp animated">
                  <span className="triangle triangle1"></span>
                  <span className="triangle triangle2"></span>
                  Instant Pre-Qualification
                </h6>
                <h2 className="text-white wow fadeInUp animated" data-wow-delay=".2s">
                  See What You Qualify For
                </h2>
                <div className="text">
                  Don&apos;t guess — let our prequal engine match you with the{' '}
                  <br className="d-none d-md-block" />
                  best-fit funding. No hard credit pull. No commitment.
                </div>
              </div>
              <div
                className="col-xl-3 col-lg-4 wow fadeInUp animated"
                data-wow-delay=".5s"
              >
                <Link
                  href="/contact"
                  className="theme-btn btn-style-one wow fadeInUp animated"
                  data-wow-delay=".5s"
                >
                  Let's Talk
                  <span className="icon">
                    <i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="faq-section fix section-padding section-bg bg-cover"
        style={{
          backgroundImage: "url('/images/home-3/world-map.png')",
          backgroundSize: 'contain',
          backgroundPosition: 'bottom center',
        }}
      >
        <div className="auto-container">
          <div className="row g-4 justify-content-center align-items-center">
            <div className="col-xl-12 col-lg-12">
              <div className="faq-left-items-1">
                <div className="sec-title mb-4 text-center">
                  <h6 className="sub-title wow fadeInUp animated justify-content-center">
                    <span className="triangle triangle1"></span>
                    <span className="triangle triangle2"></span>
                    FAQ&apos;S
                  </h6>
                  <h2 className="wow fadeInUp animated" data-wow-delay=".2s">
                    Frequently Asked Questions
                  </h2>
                  <p>
                    We help you build the foundation correctly first, so you don&apos;t burn months
                    on denials.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-10 col-lg-10">
              <div className="faq-content-1">
                <FundingFaq faqs={faqs} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
