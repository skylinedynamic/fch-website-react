import { faqService } from '@/services/faq.service';
import Link from 'next/link';
import FaqSection from '@/components/faq/FaqSection';

import { Metadata } from 'next';
import { seoConfig } from '@/data/seo';

import { getDynamicMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('/faq');
}

import JsonLd from '@/components/seo/JsonLd';

export default async function FaqPage() {
  const data = await faqService.getFaqData();

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <main>
      <JsonLd data={faqSchema} />
      {/* Hero section remains static and separate from the dynamic FAQ logic */}
      <section className="hero-section hero-3" style={{ backgroundImage: "url('/images/home-3/hero/hero-bg.png')" }}>
        <div className="row g-4 align-items-center">
          <div className="col-xl-7 col-lg-6">
            <div className="hero-content">
              <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                <li><Link href="/">Home</Link></li>
                <li>FAQ</li>
              </ul>
              <h1 className="wow fadeInUp" data-wow-delay=".2s">{data.hero.title}</h1>
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

      {/* The FAQ data and filtering are handled purely inside this dedicated child component */}
      <FaqSection data={data} />
    </main>
  );
}
