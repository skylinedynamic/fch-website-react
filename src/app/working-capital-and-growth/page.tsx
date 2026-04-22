'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import SbaSidebar from '@/components/ui/SbaSidebar';
import {
    workingCapitalHeroData,
    workingCapitalIntroData,
    workingCapitalStructureData,
    workingCapitalMechanismData,
    workingCapitalBurdenData,
    workingCapitalFitData,
    workingCapitalCaseExampleData,
    workingCapitalLenderMindsetData,
    workingCapitalPositioningData,
    workingCapitalFaqData,
    workingCapitalSidebarData
} from '@/data/workingCapitalData';

export default function WorkingCapitalGrowthPage() {
    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).WOW) {
            new (window as any).WOW().init();
        }
    }, []);

    const toggleFaq = (e: React.MouseEvent<HTMLDivElement>) => {
        const item = e.currentTarget.closest('.sba-faq-item');
        if (!item) return;
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.sba-faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    };

    return (
        <main>
            {/* Hero Section */}
            <section className="hero-section hero-3" style={{ backgroundImage: `url('${workingCapitalHeroData.bgImage}')` }}>
                <div className="row g-4 align-items-center">
                    <div className="col-xl-7 col-lg-6">
                        <div className="hero-content">
                            <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                                {workingCapitalHeroData.breadcrumb.map((crumb, index) => (
                                    <li key={index}>
                                        {index === workingCapitalHeroData.breadcrumb.length - 1 ? (
                                            crumb.label
                                        ) : (
                                            <Link href={crumb.link}>{crumb.label}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <h1 className="wow fadeInUp credit-builder-h1" data-wow-delay=".2s">{workingCapitalHeroData.title}</h1>
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

            {/* Main Content Section */}
            <section className="sba-article-section section-padding pt-100">
                <div className="auto-container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-7">

                            {/* Intro Section */}
                            <div id="wc-overview" className="sba-intro-block wow fadeInUp" data-wow-delay=".2s">
                                <div className="sba-intro-label"><i className={workingCapitalIntroData.icon}></i> {workingCapitalIntroData.label}</div>
                                <h2 className="sba-intro-title">{workingCapitalIntroData.title}</h2>
                                <p className="sba-intro-text">{workingCapitalIntroData.text}</p>
                                <div className="sba-intro-callout">
                                    <i className={workingCapitalIntroData.calloutIcon}></i>
                                    <span>{workingCapitalIntroData.callout}</span>
                                </div>
                            </div>

                            {/* Structures Section */}
                            <div id="wc-structures" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{workingCapitalStructureData.label}</span>
                                <h3 className="sba-section-title">{workingCapitalStructureData.title}</h3>
                                <p className="sba-section-desc">{workingCapitalStructureData.desc}</p>
                            </div>

                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                {workingCapitalStructureData.items.map((item, index) => (
                                    <div className="col-md-6" key={index}>
                                        <div className={`sba-program-card ${item.isDark ? 'sba-program-card--dark' : ''}`}>
                                            <div className="sba-program-icon"><i className={item.icon}></i></div>
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

                            {/* Metrics & Underwriting */}
                            <div id="wc-metrics" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{workingCapitalMechanismData.label}</span>
                                <h3 className="sba-section-title">{workingCapitalMechanismData.title}</h3>
                                <p className="sba-section-desc">{workingCapitalMechanismData.desc}</p>
                            </div>

                            {workingCapitalMechanismData.metrics.map((metric, index) => (
                                <div className="sba-metric-card wow fadeInUp" data-wow-delay={`${0.2 + (index * 0.05)}s`} key={index}>
                                    <div className="sba-metric-number">{metric.number}</div>
                                    <div className="sba-metric-icon"><i className={metric.icon}></i></div>
                                    <div className="sba-metric-body">
                                        <h4>{metric.title}</h4>
                                        <p dangerouslySetInnerHTML={{ __html: metric.desc }}></p>
                                        {metric.isCreditTiers && (
                                            <div className="sba-credit-tiers">
                                                {metric.tiers?.map((tier, tIndex) => (
                                                    <div className={`sba-credit-tier sba-credit-tier--${tier.type}`} key={tIndex}>
                                                        <span>{tier.label}</span>
                                                        <small>{tier.sub}</small>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Mathematics of Burden */}
                            <div className="sba-timeline-block wow fadeInUp mt-40" data-wow-delay=".3s">
                                <div className="sba-timeline-alert">
                                    <i className="fas fa-calculator"></i> {workingCapitalBurdenData.label}
                                </div>
                                <div className="px-3">
                                    <h4 className="mb-3" style={{ color: '#103C3B' }}>{workingCapitalBurdenData.title}</h4>
                                    <p className="mb-0" style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.7' }}>{workingCapitalBurdenData.desc}</p>
                                </div>
                            </div>

                            {/* Growth vs Risk */}
                            <div className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{workingCapitalFitData.label}</span>
                                <h3 className="sba-section-title">{workingCapitalFitData.title}</h3>
                            </div>
                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                <div className="col-md-6">
                                    <div className="sba-fit-card sba-fit-card--yes">
                                        <div className="sba-fit-header">
                                            <i className={workingCapitalFitData.yes.icon}></i>
                                            <h4>{workingCapitalFitData.yes.title}</h4>
                                        </div>
                                        <ul className="sba-fit-list">
                                            {workingCapitalFitData.yes.list.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="sba-fit-card sba-fit-card--no">
                                        <div className="sba-fit-header">
                                            <i className={workingCapitalFitData.no.icon}></i>
                                            <h4>{workingCapitalFitData.no.title}</h4>
                                        </div>
                                        <ul className="sba-fit-list">
                                            {workingCapitalFitData.no.list.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Case Example */}
                            <div className="sba-case-block wow fadeInUp mb-50" data-wow-delay=".3s">
                                <div className="sba-case-label"><i className={workingCapitalCaseExampleData.icon}></i> {workingCapitalCaseExampleData.label}</div>
                                <h4>{workingCapitalCaseExampleData.title}</h4>
                                <div className="sba-case-math">
                                    {workingCapitalCaseExampleData.math.map((item, index) => (
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
                                <p className="sba-case-note">{workingCapitalCaseExampleData.note}</p>
                            </div>

                            {/* Lender Mindset Alert */}
                            <div className="sba-timeline-block wow fadeInUp mb-50" data-wow-delay=".3s" style={{ borderLeft: '5px solid #2D9A96' }}>
                                <div className="sba-timeline-alert" style={{ background: '#f0fdfa', borderColor: '#2D9A96', color: '#134e4a' }}>
                                    <i className="fas fa-lightbulb"></i> {workingCapitalLenderMindsetData.label}
                                </div>
                                <div className="px-3">
                                    <h4 className="mb-2" style={{ color: '#103C3B' }}>{workingCapitalLenderMindsetData.title}</h4>
                                    <p className="mb-3" style={{ fontWeight: 600, color: '#2D9A96' }}>{workingCapitalLenderMindsetData.alert}</p>
                                    <p className="mb-0" style={{ color: '#64748b', fontSize: '15px' }}>{workingCapitalLenderMindsetData.desc}</p>
                                </div>
                            </div>

                            {/* Preparation Checklist */}
                            <div id="wc-checklist" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{workingCapitalPositioningData.label}</span>
                                <h3 className="sba-section-title">{workingCapitalPositioningData.title}</h3>
                            </div>
                            <div className="sba-checklist-block wow fadeInUp mb-50" data-wow-delay=".3s">
                                {workingCapitalPositioningData.items.map((item, index) => (
                                    <div className="sba-checklist-item" key={index}>
                                        <span className="sba-check-num">{index + 1}</span> {item}
                                    </div>
                                ))}
                            </div>

                            {/* FAQ Section */}
                            <div id="wc-faq" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{workingCapitalFaqData.label}</span>
                                <h3 className="sba-section-title">{workingCapitalFaqData.title}</h3>
                            </div>
                            <div className="sba-faq-block wow fadeInUp" data-wow-delay=".3s">
                                {workingCapitalFaqData.items.map((item, index) => (
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

                        </div>

                        {/* Sidebar Column */}
                        <div className="col-xl-4 col-lg-5">
                            <SbaSidebar sidebarData={workingCapitalSidebarData} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
