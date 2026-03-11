import { getFaqData } from '@/lib/api/cmsService';
import Link from 'next/link';
import FaqList from '@/components/ui/FaqList';

export const metadata = {
  title: 'FAQ | Four Corner Funding',
  description: 'Frequently Asked Questions about Business Funding and Credit Building',
};

export default async function FaqPage() {
  const data = await getFaqData();

  return (
    <main>
      <section className="hero-section hero-3" style={{ backgroundImage: "url('/images/home-3/hero/hero-bg.png')" }}>
        <div className="row g-4 align-items-center">
          <div className="col-xl-7 col-lg-6">
            <div className="hero-content">
              <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                <li><Link href="/">Home</Link></li>
                <li>FAQ</li>
              </ul>
              <h1 className="wow fadeInUp">{data.hero.title}</h1>
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

      <section className="faq-section fix section-padding section-bg bg-cover"
        style={{ backgroundImage: "url('/images/home-3/world-map.png')", backgroundSize: 'contain', backgroundPosition: 'top center' }}>
        <div className="auto-container">
          <div className="row g-4 justify-content-center align-items-center">
            <FaqList categories={data.categories} items={data.items} />
          </div>
        </div>
      </section>
    </main>
  );
}
