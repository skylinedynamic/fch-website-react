'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import SbaSidebar from '@/components/ui/SbaSidebar';
import {
    acqHeroData,
    acqIntroData,
    acqPillarsData,
    acqStructuresData,
    acqRisksData,
    acqExampleData,
    acqPrepData,
    acqFaqData,
    acqCtaData,
    acqSidebarData
} from '@/data/businessAcquisitionData';

export default function BusinessAcquisitionPage() {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.WOW) {
            new window.WOW().init();
        }
    }, []);

    const toggleFaq = (e) => {
        const item = e.currentTarget.closest('.sba-faq-item');
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.sba-faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    };

    return (
        <main>
            {/* Hero Section */}
            <section className="hero-section hero-3" style={{ backgroundImage: `url('${acqHeroData.bgImage}')` }}>
                <div className="row g-4 align-items-center">
                    <div className="col-xl-7 col-lg-6">
                        <div className="hero-content">
                            <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                                {acqHeroData.breadcrumb.map((crumb, index) => (
                                    <li key={index}>
                                        {index === acqHeroData.breadcrumb.length - 1 ? (
                                            crumb.label
                                        ) : (
                                            <Link href={crumb.link}>{crumb.label}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <h1 className="wow fadeInUp credit-builder-h1" data-wow-delay=".2s">{acqHeroData.title}</h1>
                            <div className="hero-button wow fadeInUp animated" data-wow-delay=".6s">
                                <Link href="/contact" className="theme-btn btn-style-one">
                                    Contact Us
                                    <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Article Section */}
            <section className="sba-article-section section-padding pt-100">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-7">

                            {/* Intro Card */}
                            <div className="sba-intro-block wow fadeInUp" data-wow-delay=".2s">
                                <div className="sba-intro-label"><i className={acqIntroData.icon}></i> {acqIntroData.label}</div>
                                <h2 className="sba-intro-title">{acqIntroData.title}</h2>
                                <p className="sba-intro-text">{acqIntroData.text1}</p>
                                <p className="sba-intro-text" style={{ marginBottom: 0 }}>{acqIntroData.text2}</p>
                                <div className="sba-intro-callout">
                                    <i className={acqIntroData.calloutIcon}></i>
                                    <span>{acqIntroData.callout}</span>
                                </div>
                            </div>

                            {/* Pillars */}
                            <div id="acq-pillars" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{acqPillarsData.label}</span>
                                <h3 className="sba-section-title">{acqPillarsData.title}</h3>
                                <p className="sba-section-desc">{acqPillarsData.desc}</p>
                            </div>

                            {acqPillarsData.pillars.map((pillar, index) => (
                                <div className="sba-metric-card wow fadeInUp" data-wow-delay={`${0.2 + (index * 0.05)}s`} key={index}>
                                    <div className="sba-metric-number">{pillar.number}</div>
                                    <div className="sba-metric-icon"><i className={pillar.icon}></i></div>
                                    <div className="sba-metric-body">
                                        <h4>{pillar.title}</h4>
                                        <p dangerouslySetInnerHTML={{ __html: pillar.desc }}></p>

                                        {pillar.progressLabel && (
                                            <div className="sba-dscr-bar">
                                                <div className="sba-dscr-fill">
                                                    <span>{pillar.progressLabel}</span>
                                                </div>
                                            </div>
                                        )}

                                        {pillar.isCreditTiers && (
                                            <div className="sba-credit-tiers">
                                                {pillar.tiers.map((tier, tIndex) => (
                                                    <div className={`sba-credit-tier sba-credit-tier--${tier.type}`} key={tIndex}>
                                                        <span>{tier.label}</span>
                                                        <small>{tier.sub}</small>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {pillar.note && <p className="sba-metric-note">{pillar.note}</p>}
                                    </div>
                                </div>
                            ))}

                            {/* Structures */}
                            <div id="acq-structures" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{acqStructuresData.label}</span>
                                <h3 className="sba-section-title">{acqStructuresData.title}</h3>
                            </div>

                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                {acqStructuresData.items.map((item, index) => (
                                    <div className="col-md-4" key={index}>
                                        <div className={`sba-program-card ${item.isDark ? 'sba-program-card--dark' : ''}`} style={{ height: '100%' }}>
                                            <div className="sba-program-icon"><i className={item.icon}></i></div>
                                            <div className={`sba-program-badge ${item.isDark ? 'sba-program-badge--light' : ''}`}>{item.badge}</div>
                                            <h4 className="sba-program-title">{item.title}</h4>
                                            <ul className="sba-program-list">
                                                {item.points.map((point, pIndex) => (
                                                    <li key={pIndex}><i className="fas fa-check-circle"></i> {point}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Risk Factors */}
                            <div id="acq-risks" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{acqRisksData.label}</span>
                                <h3 className="sba-section-title">{acqRisksData.title}</h3>
                            </div>
                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                {acqRisksData.items.map((item, index) => (
                                    <div className="col-md-6" key={index}>
                                        <div className={`sba-fit-card ${item.isYes ? 'sba-fit-card--yes' : 'sba-fit-card--no'}`}>
                                            <div className="sba-fit-header">
                                                <i className={item.icon}></i>
                                                <h4>{item.title}</h4>
                                            </div>
                                            <ul className="sba-fit-list">
                                                {item.list.map((listItem, lIndex) => (
                                                    <li key={lIndex}>{listItem}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Case Example */}
                            <div id="acq-example" className="sba-case-block wow fadeInUp" data-wow-delay=".3s">
                                <div className="sba-case-label"><i className={acqExampleData.icon}></i> {acqExampleData.label}</div>
                                <h4>{acqExampleData.title}</h4>
                                <div className="sba-case-math">
                                    {acqExampleData.math.map((item, index) => (
                                        item.operator ? (
                                            <div className="sba-case-operator" key={index}>{item.operator}</div>
                                        ) : (
                                            <div className={`sba-case-item ${item.isResult ? 'sba-case-item--result' : ''}`} key={index}>
                                                <span className="sba-case-val">{item.val}</span>
                                                <span className="sba-case-key">{item.key}</span>
                                            </div>
                                        )
                                    ))}
                                </div>
                                <div className="sba-case-math" style={{ marginTop: '16px' }}>
                                    {acqExampleData.math2.map((item, index) => (
                                        item.operator ? (
                                            <div className="sba-case-operator" key={index}>{item.operator}</div>
                                        ) : (
                                            <div className={`sba-case-item ${item.isResult ? 'sba-case-item--result' : ''}`} key={index}>
                                                <span className="sba-case-val">{item.val}</span>
                                                <span className="sba-case-key">{item.key}</span>
                                            </div>
                                        )
                                    ))}
                                </div>
                                <p className="sba-case-note">{acqExampleData.note}</p>
                            </div>

                            {/* Preparation Checklist */}
                            <div id="acq-prep" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{acqPrepData.label}</span>
                                <h3 className="sba-section-title">{acqPrepData.title}</h3>
                                <p className="sba-section-desc">{acqPrepData.desc}</p>
                            </div>
                            <div className="sba-checklist-block wow fadeInUp" data-wow-delay=".3s">
                                {acqPrepData.items.map((item, index) => (
                                    <div className="sba-checklist-item" key={index}>
                                        <span className="sba-check-num">{index + 1}</span> {item}
                                    </div>
                                ))}
                            </div>

                            {/* FAQ */}
                            <div id="acq-faq" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{acqFaqData.label}</span>
                                <h3 className="sba-section-title">{acqFaqData.title}</h3>
                            </div>
                            <div className="sba-faq-block wow fadeInUp" data-wow-delay=".3s">
                                {acqFaqData.items.map((item, index) => (
                                    <div className={`sba-faq-item ${index === 0 ? 'active' : ''}`} key={index}>
                                        <div className="sba-faq-q" onClick={toggleFaq}>
                                            <span>{item.q}</span>
                                            <i className="fas fa-chevron-down"></i>
                                        </div>
                                        <div className="sba-faq-a">
                                            <p>{item.a}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Strategic CTA */}
                            <div className="sba-cta-block wow fadeInUp" data-wow-delay=".3s">
                                <div className="sba-cta-icon"><i className={acqCtaData.icon}></i></div>
                                <h3 dangerouslySetInnerHTML={{ __html: acqCtaData.title }}></h3>
                                <p>{acqCtaData.desc}</p>
                                <Link href={acqCtaData.btnLink} className="theme-btn btn-style-one">
                                    {acqCtaData.btnText}
                                    <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
                                </Link>
                            </div>

                        </div>

                        {/* Sticky Sidebar */}
                        <div className="col-xl-4 col-lg-5">
                            <SbaSidebar sidebarData={acqSidebarData} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
