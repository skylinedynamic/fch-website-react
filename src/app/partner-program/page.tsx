import { partnerService } from '@/services/partner.service';
import Image from 'next/image';
import Link from 'next/link';
import CreditBuilderFaq from '@/components/credit-builder/CreditBuilderFaq';

import { Metadata } from 'next';
import { seoConfig } from '@/data/seo';

import { getDynamicMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
    return getDynamicMetadata('/partner-program');
}

export default async function PartnerProgramPage() {
    const data = await partnerService.getPartnerProgramData();

    return (
        <main>
            {/* Hero Section */}
            <section className="hero-section hero-3" style={{ backgroundImage: "url('/images/home-3/hero/hero-bg.png')" }}>
                <div className="row g-4 align-items-center">
                    <div className="col-xl-7 col-lg-6">
                        <div className="hero-content">
                            <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                                <li><Link href="/">Home</Link></li>
                                <li>partner-program</li>
                            </ul>
                            <h1 className="wow fadeInUp credit-builder-h1" data-wow-delay=".2s">{data.hero.title}</h1>
                            <div className="text-item wow fadeInUp" data-wow-delay=".4s">
                                <p>{data.hero.text}</p>
                            </div>
                            <div className="hero-button wow fadeInUp animated d-flex flex-wrap gap-3" data-wow-delay=".6s">
                                <Link href={data.hero.cta[0].link} className="theme-btn btn-style-one">
                                    {data.hero.cta[0].text}
                                    <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
                                </Link>
                                <a href={data.hero.cta[1].link} className="theme-btn btn-style-two" download>
                                    {data.hero.cta[1].text}
                                    <span className="icon"><i className="fa-solid fa-file-pdf"></i></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Program Overview Section */}
            <section className="partnership-modern-section gray-bg fix">
                <div className="auto-container">
                    <div className="sec-title text-center mb-60">
                        <h6 className="sub-title wow fadeInUp animated">
                            <span className="triangle triangle1"></span>
                            <span className="triangle triangle2"></span>
                            {data.overview.subtitle}
                        </h6>
                        <h2 className="title wow fadeInUp animated" data-wow-delay=".2s">{data.overview.title}</h2>
                    </div>

                    <div className="partnership-container">
                        {data.overview.cards.map((card, i) => (
                            <div key={i} className={`partnership-card wow ${i === 0 ? 'fadeInLeft' : 'fadeInRight'}`} data-wow-delay={i === 0 ? '.3s' : '.5s'}>
                                <div className="card-number">{card.number}</div>
                                <div className="card-icon">
                                    <i className={card.icon}></i>
                                </div>
                                <div className="card-body-content">
                                    <h3>{card.title}</h3>
                                    <p>{card.text}</p>
                                    <ul className="feature-list">
                                        {card.features.map((feature, idx) => (
                                            <li key={idx}><i className="fa-solid fa-check"></i> {feature}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="partnership-img-box">
                                    <img src={card.image} alt={card.title} />
                                </div>
                                <Link href="/contact" className="partnership-cta">
                                    {i === 0 ? 'Become a Partner' : 'Build Your Empire'} <i className="fa-solid fa-arrow-right"></i>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table Section */}
            <section className="comparison-section fix">
                <div className="auto-container">
                    <div className="sec-title text-center mb-60">
                        <div className="linear-badge wow fadeInUp">
                            <i className="fa-solid fa-play"></i> {data.comparison.badge}
                        </div>
                        <h2 className="title wow fadeInUp" data-wow-delay=".2s">{data.comparison.title}</h2>
                    </div>

                    <div className="comparison-table-wrapper wow fadeInUp" data-wow-delay=".4s">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th>Certified Partner</th>
                                    <th>Executive White-Label Partner</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.comparison.features.map((row, i) => (
                                    <tr key={i}>
                                        <td className="feature-col">{row.label}</td>
                                        <td>
                                            {typeof row.certified === 'boolean' ? (
                                                row.certified ? <span className="status-check"><i className="fa-solid fa-check"></i></span> : <span className="status-cross"><i className="fa-solid fa-xmark"></i></span>
                                            ) : (
                                                <span className="value-text" dangerouslySetInnerHTML={{ __html: row.certified }} />
                                            )}
                                        </td>
                                        <td>
                                            {typeof row.whitelabel === 'boolean' ? (
                                                row.whitelabel ? <span className="status-check"><i className="fa-solid fa-check"></i></span> : <span className="status-cross"><i className="fa-solid fa-xmark"></i></span>
                                            ) : (
                                                <span className="value-text" dangerouslySetInnerHTML={{ __html: row.whitelabel }} />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Activation Process Section */}
            <section className="how-it-work-section fix section-padding gray-bg pt-120" style={{ backgroundColor: '#f8f7f2' }}>
                <div className="auto-container">
                    <div className="sec-title text-center mb-60">
                        <h6 className="sub-title wow fadeInUp animated">
                            <span className="triangle triangle1"></span>
                            <span className="triangle triangle2"></span>
                            {data.activation.subtitle}
                        </h6>
                        <h2 className="title wow fadeInUp animated" data-wow-delay=".2s">{data.activation.title}</h2>
                    </div>
                    <div className="how-it-work-wrapper border-none">
                        <div className="row">
                            {data.activation.steps.map((step, i) => (
                                <div key={i} className="col-xl-4 col-lg-4 col-md-6 col-sm-6 wow fadeInUp animated" data-wow-delay={`${(i + 1) * 2}00ms`}>
                                    <div className="how-it-work-items-style-3 style-2">
                                        <h3 className="number">{step.number}</h3>
                                        <h4 className="title">{step.title}</h4>
                                        <p className="text">{step.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Banner Section */}
            <section className="growth-section section-padding bg-cover parallaxie" style={{ backgroundImage: "url('/images/home-2/choose-us/choose-us-bg.jpg')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
                <div className="sec-shape">
                    <Image className="sway_Y__animation" src="/images/growth-shape.png" alt="Image" width={100} height={100} />
                </div>
                <div className="auto-container">
                    <div className="sec-title text-center">
                        <h2 className="text-white wow fadeInUp animated" data-wow-delay=".2s">{data.growth.title}</h2>
                        <div className="cta-action-btns mt-4 wow fadeInUp animated" data-wow-delay=".4s">
                            {data.growth.cta.map((btn, i) => (
                                <Link key={i} href={btn.link} className={`cta-action-btn ${i === 0 ? 'enroll' : 'specialist'}`}>
                                    {btn.text}
                                    <span className="icon-circle"><i className="fa-solid fa-arrow-up-right"></i></span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <CreditBuilderFaq data={data.faq} />
        </main>
    );
}
