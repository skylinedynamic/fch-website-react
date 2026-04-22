'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import SbaSidebar from '@/components/ui/SbaSidebar';
import {
    receivablesHeroData,
    receivablesIntroData,
    receivablesCycleData,
    receivablesMechanismData,
    receivablesRecourseData,
    receivablesConcentrationData,
    receivablesPoData,
    receivablesFitData,
    receivablesCaseExampleData,
    receivablesChecklistData,
    receivablesFaqData,
    receivablesSidebarData
} from '@/data/receivablesCashFlowData';

export default function ReceivablesCashFlowPage() {
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
            <section className="hero-section hero-3" style={{ backgroundImage: `url('${receivablesHeroData.bgImage}')` }}>
                <div className="row g-4 align-items-center">
                    <div className="col-xl-7 col-lg-6">
                        <div className="hero-content">
                            <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                                {receivablesHeroData.breadcrumb.map((crumb, index) => (
                                    <li key={index}>
                                        {index === receivablesHeroData.breadcrumb.length - 1 ? (
                                            crumb.label
                                        ) : (
                                            <Link href={crumb.link}>{crumb.label}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <h1 className="wow fadeInUp credit-builder-h1" data-wow-delay=".2s">{receivablesHeroData.title}</h1>
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
                            <div id="receivables-overview" className="sba-intro-block wow fadeInUp" data-wow-delay=".2s">
                                <div className="sba-intro-label"><i className={receivablesIntroData.icon}></i> {receivablesIntroData.label}</div>
                                <h2 className="sba-intro-title">{receivablesIntroData.title}</h2>
                                <p className="sba-intro-text">{receivablesIntroData.text}</p>
                                <div className="sba-intro-callout">
                                    <i className={receivablesIntroData.calloutIcon}></i>
                                    <span>{receivablesIntroData.callout}</span>
                                </div>
                            </div>

                            {/* Cycle Section */}
                            <div id="receivables-cycle" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{receivablesCycleData.label}</span>
                                <h3 className="sba-section-title">{receivablesCycleData.title}</h3>
                                <p className="sba-section-desc">{receivablesCycleData.desc}</p>
                            </div>

                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                {receivablesCycleData.items.map((item, index) => (
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
                            <div id="receivables-works" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{receivablesMechanismData.label}</span>
                                <h3 className="sba-section-title">{receivablesMechanismData.title}</h3>
                                <p className="sba-section-desc">{receivablesMechanismData.desc}</p>
                            </div>

                            {receivablesMechanismData.metrics.map((metric, index) => (
                                <div className="sba-metric-card wow fadeInUp" data-wow-delay={`${0.2 + (index * 0.05)}s`} key={index}>
                                    <div className="sba-metric-number">{metric.number}</div>
                                    <div className="sba-metric-icon"><i className={metric.icon}></i></div>
                                    <div className="sba-metric-body">
                                        <h4>{metric.title}</h4>
                                        <p dangerouslySetInnerHTML={{ __html: metric.desc }}></p>
                                    </div>
                                </div>
                            ))}

                            {/* Recourse vs Non-Recourse */}
                            <div id="receivables-risk" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{receivablesRecourseData.label}</span>
                                <h3 className="sba-section-title">{receivablesRecourseData.title}</h3>
                                <p className="sba-section-desc">{receivablesRecourseData.desc}</p>
                            </div>

                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                {receivablesRecourseData.items.map((item, index) => (
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

                            {/* Concentration Risk */}
                            <div className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{receivablesConcentrationData.label}</span>
                                <h3 className="sba-section-title">{receivablesConcentrationData.title}</h3>
                                <p className="sba-section-desc">{receivablesConcentrationData.desc}</p>
                            </div>

                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                {receivablesConcentrationData.items.map((item, index) => (
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

                            {/* PO Financing Layer */}
                            <div id="receivables-po" className="sba-timeline-block wow fadeInUp" style={{ marginBottom: '50px' }} data-wow-delay=".3s">
                                <div className="sba-timeline-alert" style={{ background: '#f0fdf4', borderLeftColor: '#22c55e', color: '#15803d' }}>
                                    <i className="fas fa-layer-group" style={{ color: '#22c55e' }}></i> {receivablesPoData.label}
                                </div>
                                <div className="p-4">
                                    <h4 className="mb-3" style={{ color: '#103C3B' }}>{receivablesPoData.title}</h4>
                                    <p className="mb-3" style={{ fontWeight: '600', color: '#15803d' }}>{receivablesPoData.alert}</p>
                                    <p className="mb-0" style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.7' }}>{receivablesPoData.desc}</p>
                                </div>
                            </div>

                            {/* Strategic Fit */}
                            <div id="receivables-fit" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{receivablesFitData.label}</span>
                                <h3 className="sba-section-title">{receivablesFitData.title}</h3>
                            </div>
                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                <div className="col-md-6">
                                    <div className="sba-fit-card sba-fit-card--yes">
                                        <div className="sba-fit-header">
                                            <i className={receivablesFitData.yes.icon}></i>
                                            <h4>{receivablesFitData.yes.title}</h4>
                                        </div>
                                        <ul className="sba-fit-list">
                                            {receivablesFitData.yes.list.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="sba-fit-card sba-fit-card--no">
                                        <div className="sba-fit-header">
                                            <i className={receivablesFitData.no.icon}></i>
                                            <h4>{receivablesFitData.no.title}</h4>
                                        </div>
                                        <ul className="sba-fit-list">
                                            {receivablesFitData.no.list.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Case Example */}
                            <div className="sba-case-block wow fadeInUp" data-wow-delay=".3s">
                                <div className="sba-case-label"><i className={receivablesCaseExampleData.icon}></i> {receivablesCaseExampleData.label}</div>
                                <h4>{receivablesCaseExampleData.title}</h4>
                                <div className="sba-case-math">
                                    {receivablesCaseExampleData.math.map((item, index) => (
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
                                <p className="sba-case-note">{receivablesCaseExampleData.note}</p>
                            </div>

                            {/* Preparation Checklist */}
                            <div id="receivables-checklist" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{receivablesChecklistData.label}</span>
                                <h3 className="sba-section-title">{receivablesChecklistData.title}</h3>
                            </div>
                            <div className="sba-checklist-block wow fadeInUp" data-wow-delay=".3s">
                                {receivablesChecklistData.items.map((item, index) => (
                                    <div className="sba-checklist-item" key={index}>
                                        <span className="sba-check-num">{index + 1}</span> {item}
                                    </div>
                                ))}
                            </div>

                            {/* FAQ */}
                            <div id="receivables-faq" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{receivablesFaqData.label}</span>
                                <h3 className="sba-section-title">{receivablesFaqData.title}</h3>
                            </div>
                            <div className="sba-faq-block wow fadeInUp" data-wow-delay=".3s">
                                {receivablesFaqData.items.map((item, index) => (
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
                            <SbaSidebar sidebarData={receivablesSidebarData} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
