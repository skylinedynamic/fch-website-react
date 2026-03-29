'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import SbaSidebar from '@/components/ui/SbaSidebar';
import {
    bridgeHeroData,
    bridgeIntroData,
    bridgeStructureData,
    bridgeMechanismData,
    bridgeFitData,
    bridgeStackingData,
    bridgeCaseExampleData,
    bridgeChecklistData,
    bridgeFaqData,
    bridgeSidebarData
} from '@/data/bridgeShortTermData';

export default function BridgeShortTermPage() {
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
            <section className="hero-section hero-3" style={{ backgroundImage: `url('${bridgeHeroData.bgImage}')` }}>
                <div className="row g-4 align-items-center">
                    <div className="col-xl-7 col-lg-6">
                        <div className="hero-content">
                            <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                                {bridgeHeroData.breadcrumb.map((crumb, index) => (
                                    <li key={index}>
                                        {index === bridgeHeroData.breadcrumb.length - 1 ? (
                                            crumb.label
                                        ) : (
                                            <Link href={crumb.link}>{crumb.label}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <h1 className="wow fadeInUp credit-builder-h1" data-wow-delay=".2s">{bridgeHeroData.title}</h1>
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
                            <div id="bridge-overview" className="sba-intro-block wow fadeInUp" data-wow-delay=".2s">
                                <div className="sba-intro-label"><i className={bridgeIntroData.icon}></i> {bridgeIntroData.label}</div>
                                <h2 className="sba-intro-title">{bridgeIntroData.title}</h2>
                                <p className="sba-intro-text">{bridgeIntroData.text}</p>
                                <div className="sba-intro-callout">
                                    <i className={bridgeIntroData.calloutIcon}></i>
                                    <span>{bridgeIntroData.callout}</span>
                                </div>
                            </div>

                            {/* Structures */}
                            <div id="bridge-structures" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{bridgeStructureData.label}</span>
                                <h3 className="sba-section-title">{bridgeStructureData.title}</h3>
                                <p className="sba-section-desc">{bridgeStructureData.desc}</p>
                            </div>

                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                {bridgeStructureData.items.map((item, index) => (
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

                            {/* Mechanism & Metrics */}
                            <div id="bridge-works" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{bridgeMechanismData.label}</span>
                                <h3 className="sba-section-title">{bridgeMechanismData.title}</h3>
                                <p className="sba-section-desc">{bridgeMechanismData.desc}</p>
                            </div>

                            {bridgeMechanismData.metrics.map((metric, index) => (
                                <div className="sba-metric-card wow fadeInUp" data-wow-delay={`${0.2 + (index * 0.05)}s`} key={index}>
                                    <div className="sba-metric-number">{metric.number}</div>
                                    <div className="sba-metric-icon"><i className={metric.icon}></i></div>
                                    <div className="sba-metric-body">
                                        <h4>{metric.title}</h4>
                                        <p dangerouslySetInnerHTML={{ __html: metric.desc }}></p>

                                        {metric.isCreditTiers && (
                                            <div className="sba-credit-tiers">
                                                {metric.tiers?.map((tier: any, tIndex: number) => (
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

                            {/* Stacking Warning */}
                            <div id="bridge-stacking" className="sba-timeline-block wow fadeInUp" style={{ marginBottom: '50px' }} data-wow-delay=".3s">
                                <div className="sba-timeline-alert" style={{ background: '#fef2f2', borderLeftColor: '#ef4444', color: '#b91c1c' }}>
                                    <i className="fas fa-exclamation-triangle" style={{ color: '#ef4444' }}></i> {bridgeStackingData.alert}
                                </div>
                                <div className="p-4">
                                    <h4 className="mb-3" style={{ color: '#103C3B' }}>{bridgeStackingData.title}</h4>
                                    <p className="mb-0" style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.7' }}>{bridgeStackingData.desc}</p>
                                </div>
                            </div>

                            {/* Strategic Fit */}
                            <div id="bridge-fit" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{bridgeFitData.label}</span>
                                <h3 className="sba-section-title">{bridgeFitData.title}</h3>
                            </div>
                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                <div className="col-md-6">
                                    <div className="sba-fit-card sba-fit-card--yes">
                                        <div className="sba-fit-header">
                                            <i className={bridgeFitData.yes.icon}></i>
                                            <h4>{bridgeFitData.yes.title}</h4>
                                        </div>
                                        <ul className="sba-fit-list">
                                            {bridgeFitData.yes.list.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="sba-fit-card sba-fit-card--no">
                                        <div className="sba-fit-header">
                                            <i className={bridgeFitData.no.icon}></i>
                                            <h4>{bridgeFitData.no.title}</h4>
                                        </div>
                                        <ul className="sba-fit-list">
                                            {bridgeFitData.no.list.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Case Example */}
                            <div className="sba-case-block wow fadeInUp" data-wow-delay=".3s">
                                <div className="sba-case-label"><i className={bridgeCaseExampleData.icon}></i> {bridgeCaseExampleData.label}</div>
                                <h4>{bridgeCaseExampleData.title}</h4>
                                <div className="sba-case-math">
                                    {bridgeCaseExampleData.math.map((item, index) => (
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
                                <p className="sba-case-note">{bridgeCaseExampleData.note}</p>
                            </div>

                            {/* Preparation Checklist */}
                            <div id="bridge-checklist" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{bridgeChecklistData.label}</span>
                                <h3 className="sba-section-title">{bridgeChecklistData.title}</h3>
                            </div>
                            <div className="sba-checklist-block wow fadeInUp" data-wow-delay=".3s">
                                {bridgeChecklistData.items.map((item, index) => (
                                    <div className="sba-checklist-item" key={index}>
                                        <span className="sba-check-num">{index + 1}</span> {item}
                                    </div>
                                ))}
                            </div>

                            {/* FAQ */}
                            <div id="bridge-faq" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{bridgeFaqData.label}</span>
                                <h3 className="sba-section-title">{bridgeFaqData.title}</h3>
                            </div>
                            <div className="sba-faq-block wow fadeInUp" data-wow-delay=".3s">
                                {bridgeFaqData.items.map((item, index) => (
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

                        {/* Sticky Sidebar */}
                        <div className="col-xl-4 col-lg-5">
                            <SbaSidebar sidebarData={bridgeSidebarData} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
