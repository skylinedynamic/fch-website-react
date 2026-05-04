'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import SbaSidebar from '@/components/ui/SbaSidebar';
import {
    sbaHeroData,
    sbaIntroData,
    sbaProgramsData,
    sbaUnderwritingData,
    sbaTimelineData,
    sbaFitData,
    sbaCaseExampleData,
    sbaChecklistData,
    sbaFaqData,
    sbaCtaData,
    sbaSidebarData
} from '@/data/sbaPrograms';

export default function SbaProgramsPage() {
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
            <section className="hero-section hero-3" style={{ backgroundImage: `url('${sbaHeroData.bgImage}')` }}>
                <div className="row g-4 align-items-center">
                    <div className="col-xl-7 col-lg-6">
                        <div className="hero-content">
                            <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                                {sbaHeroData.breadcrumb.map((crumb, index) => (
                                    <li key={index}>
                                        {index === sbaHeroData.breadcrumb.length - 1 ? (
                                            crumb.label
                                        ) : (
                                            <Link href={crumb.link}>{crumb.label}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <h1 className="wow fadeInUp credit-builder-h1" data-wow-delay=".2s">{sbaHeroData.title}</h1>
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
                                <div className="sba-intro-label"><i className={sbaIntroData.icon}></i> {sbaIntroData.label}</div>
                                <h2 className="sba-intro-title">{sbaIntroData.title}</h2>
                                <p className="sba-intro-text">{sbaIntroData.text}</p>
                                <div className="sba-intro-callout">
                                    <i className={sbaIntroData.calloutIcon}></i>
                                    <span>{sbaIntroData.callout}</span>
                                </div>
                            </div>

                            {/* Programs */}
                            <div id="sba-programs" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{sbaProgramsData.label}</span>
                                <h3 className="sba-section-title">{sbaProgramsData.title}</h3>
                            </div>

                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                {sbaProgramsData.items.map((item, index) => (
                                    <div className="col-md-6" key={index}>
                                        <div className={`sba-program-card ${item.isDark ? 'sba-program-card--dark' : ''}`}>
                                            <div className="sba-program-icon"><i className={item.icon}></i></div>
                                            <div className={`sba-program-badge ${item.isDark ? 'sba-program-badge--light' : ''}`}>{item.badge}</div>
                                            <h4 className="sba-program-title">{item.title}</h4>
                                            <p className="sba-program-sub" dangerouslySetInnerHTML={{ __html: item.sub }}></p>
                                            <ul className="sba-program-list">
                                                {item.points.map((point, pIndex) => (
                                                    <li key={pIndex}><i className="fas fa-check-circle"></i> {point}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Underwriting Metrics */}
                            <div id="sba-underwriting" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{sbaUnderwritingData.label}</span>
                                <h3 className="sba-section-title">{sbaUnderwritingData.title}</h3>
                                <p className="sba-section-desc">{sbaUnderwritingData.desc}</p>
                            </div>

                            {sbaUnderwritingData.metrics.map((metric, index) => (
                                <div className="sba-metric-card wow fadeInUp" data-wow-delay={`${0.2 + (index * 0.05)}s`} key={index}>
                                    <div className="sba-metric-number">{metric.number}</div>
                                    <div className="sba-metric-icon"><i className={metric.icon}></i></div>
                                    <div className="sba-metric-body">
                                        <h4>{metric.title}</h4>
                                        <p dangerouslySetInnerHTML={{ __html: metric.desc }}></p>
                                        
                                        {metric.hasProgressBar && (
                                            <div className="sba-dscr-bar">
                                                <div className="sba-dscr-fill">
                                                    <span>{metric.progressLabel}</span>
                                                </div>
                                            </div>
                                        )}

                                        {metric.isCreditTiers && (
                                            <div className="sba-credit-tiers">
                                                {metric.tiers.map((tier, tIndex) => (
                                                    <div className={`sba-credit-tier sba-credit-tier--${tier.type}`} key={tIndex}>
                                                        <span>{tier.label}</span>
                                                        <small>{tier.sub}</small>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {metric.note && <p className="sba-metric-note">{metric.note}</p>}
                                    </div>
                                </div>
                            ))}

                            {/* Timeline */}
                            <div id="sba-timeline" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{sbaTimelineData.label}</span>
                                <h3 className="sba-section-title">{sbaTimelineData.title}</h3>
                            </div>
                            <div className="sba-timeline-block wow fadeInUp" data-wow-delay=".3s">
                                <div className="sba-timeline-alert">
                                    <i className="fas fa-exclamation-triangle"></i> {sbaTimelineData.alert}
                                </div>
                                <div className="sba-timeline-steps">
                                    {sbaTimelineData.steps.map((step, index) => (
                                        <div key={index}>
                                            <div className={`sba-timeline-step ${step.isEnd ? 'sba-timeline-step--end' : ''}`}>
                                                <div className={`sba-timeline-dot ${step.isEnd ? 'sba-timeline-dot--end' : ''}`}>
                                                    <i className={step.icon}></i>
                                                </div>
                                                <div className="sba-timeline-info">
                                                    <strong>{step.title}</strong>
                                                    <span>{step.duration}</span>
                                                </div>
                                            </div>
                                            {index < sbaTimelineData.steps.length - 1 && <div className="sba-timeline-connector"></div>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Strategic Fit */}
                            <div id="sba-fit" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{sbaFitData.label}</span>
                                <h3 className="sba-section-title">{sbaFitData.title}</h3>
                            </div>
                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                <div className="col-md-6">
                                    <div className="sba-fit-card sba-fit-card--yes">
                                        <div className="sba-fit-header">
                                            <i className={sbaFitData.yes.icon}></i>
                                            <h4>{sbaFitData.yes.title}</h4>
                                        </div>
                                        <ul className="sba-fit-list">
                                            {sbaFitData.yes.list.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="sba-fit-card sba-fit-card--no">
                                        <div className="sba-fit-header">
                                            <i className={sbaFitData.no.icon}></i>
                                            <h4>{sbaFitData.no.title}</h4>
                                        </div>
                                        <ul className="sba-fit-list">
                                            {sbaFitData.no.list.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Case Example */}
                            <div className="sba-case-block wow fadeInUp" data-wow-delay=".3s">
                                <div className="sba-case-label"><i className={sbaCaseExampleData.icon}></i> {sbaCaseExampleData.label}</div>
                                <h4>{sbaCaseExampleData.title}</h4>
                                <div className="sba-case-math">
                                    {sbaCaseExampleData.math.map((item, index) => (
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
                                <p className="sba-case-note">{sbaCaseExampleData.note}</p>
                            </div>

                            {/* Preparation Checklist */}
                            <div className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{sbaChecklistData.label}</span>
                                <h3 className="sba-section-title">{sbaChecklistData.title}</h3>
                            </div>
                            <div className="sba-checklist-block wow fadeInUp" data-wow-delay=".3s">
                                {sbaChecklistData.items.map((item, index) => (
                                    <div className="sba-checklist-item" key={index}>
                                        <span className="sba-check-num">{index + 1}</span> {item}
                                    </div>
                                ))}
                            </div>

                            {/* FAQ */}
                            <div id="sba-faq" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{sbaFaqData.label}</span>
                                <h3 className="sba-section-title">{sbaFaqData.title}</h3>
                            </div>
                            <div className="sba-faq-block wow fadeInUp" data-wow-delay=".3s">
                                {sbaFaqData.items.map((item, index) => (
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
                                <div className="sba-cta-icon"><i className={sbaCtaData.icon}></i></div>
                                <h3 dangerouslySetInnerHTML={{ __html: sbaCtaData.title }}></h3>
                                <p>{sbaCtaData.desc}</p>
                                <Link href={sbaCtaData.btnLink} className="theme-btn btn-style-one">
                                    {sbaCtaData.btnText}
                                    <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
                                </Link>
                            </div>

                        </div>

                        {/* Sticky Sidebar */}
                        <div className="col-xl-4 col-lg-5">
                            <SbaSidebar sidebarData={sbaSidebarData} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
