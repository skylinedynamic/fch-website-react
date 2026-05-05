'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import SbaSidebar from '@/components/ui/SbaSidebar';
import {
    realEstateHeroData,
    realEstateIntroData,
    realEstateStructureData,
    realEstateMechanismData,
    realEstateOccupancyData,
    realEstateFitData,
    realEstateCaseExampleData,
    realEstateEnvironmentalData,
    realEstatePositioningData,
    realEstateFaqData,
    realEstateSidebarData
} from '@/data/realEstate';

export default function RealEstatePage() {
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
            <section className="hero-section hero-3" style={{ backgroundImage: `url('${realEstateHeroData.bgImage}')` }}>
                <div className="row g-4 align-items-center">
                    <div className="col-xl-7 col-lg-6">
                        <div className="hero-content">
                            <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                                {realEstateHeroData.breadcrumb.map((crumb, index) => (
                                    <li key={index}>
                                        {index === realEstateHeroData.breadcrumb.length - 1 ? (
                                            crumb.label
                                        ) : (
                                            <Link href={crumb.link}>{crumb.label}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <h1 className="wow fadeInUp credit-builder-h1" data-wow-delay=".2s">{realEstateHeroData.title}</h1>
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
                            <div id="re-overview" className="sba-intro-block wow fadeInUp" data-wow-delay=".2s">
                                <div className="sba-intro-label"><i className={realEstateIntroData.icon}></i> {realEstateIntroData.label}</div>
                                <h2 className="sba-intro-title">{realEstateIntroData.title}</h2>
                                <p className="sba-intro-text">{realEstateIntroData.text}</p>
                                <div className="sba-intro-callout">
                                    <i className={realEstateIntroData.calloutIcon}></i>
                                    <span>{realEstateIntroData.callout}</span>
                                </div>
                            </div>

                            {/* Financing Structures */}
                            <div id="re-financing" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{realEstateStructureData.label}</span>
                                <h3 className="sba-section-title">{realEstateStructureData.title}</h3>
                                <p className="sba-section-desc">{realEstateStructureData.desc}</p>
                            </div>

                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                {realEstateStructureData.items.map((item, index) => (
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

                            {/* Underwriting Metrics */}
                            <div id="re-underwriting" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{realEstateMechanismData.label}</span>
                                <h3 className="sba-section-title">{realEstateMechanismData.title}</h3>
                                <p className="sba-section-desc">{realEstateMechanismData.desc}</p>
                            </div>

                            {realEstateMechanismData.metrics.map((metric, index) => (
                                <div className="sba-metric-card wow fadeInUp" data-wow-delay={`${0.2 + (index * 0.05)}s`} key={index}>
                                    <div className="sba-metric-number">{metric.number}</div>
                                    <div className="sba-metric-icon"><i className={metric.icon}></i></div>
                                    <div className="sba-metric-body">
                                        <h4>{metric.title}</h4>
                                        <p dangerouslySetInnerHTML={{ __html: metric.desc }}></p>
                                    </div>
                                </div>
                            ))}

                            {/* Occupancy Rules */}
                            <div id="re-compliance" className="sba-timeline-block wow fadeInUp mt-40" data-wow-delay=".3s" style={{ borderLeft: '5px solid #2D9A96' }}>
                                <div className="sba-timeline-alert" style={{ background: '#f0fdfa', borderColor: '#2D9A96', color: '#134e4a' }}>
                                    <i className="fas fa-exclamation-circle"></i> {realEstateOccupancyData.label}
                                </div>
                                <div className="px-3">
                                    <h4 className="mb-2" style={{ color: '#103C3B' }}>{realEstateOccupancyData.title}</h4>
                                    <p className="mb-3" style={{ fontWeight: 600, color: '#2D9A96' }}>{realEstateOccupancyData.alert}</p>
                                    <p className="mb-0" style={{ color: '#64748b', fontSize: '15px' }}>{realEstateOccupancyData.desc}</p>
                                </div>
                            </div>

                            {/* Strategic Fit */}
                            <div className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{realEstateFitData.label}</span>
                                <h3 className="sba-section-title">{realEstateFitData.title}</h3>
                            </div>
                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                <div className="col-md-6">
                                    <div className="sba-fit-card sba-fit-card--yes">
                                        <div className="sba-fit-header">
                                            <i className={realEstateFitData.yes.icon}></i>
                                            <h4>{realEstateFitData.yes.title}</h4>
                                        </div>
                                        <ul className="sba-fit-list">
                                            {realEstateFitData.yes.list.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="sba-fit-card sba-fit-card--no">
                                        <div className="sba-fit-header">
                                            <i className={realEstateFitData.no.icon}></i>
                                            <h4>{realEstateFitData.no.title}</h4>
                                        </div>
                                        <ul className="sba-fit-list">
                                            {realEstateFitData.no.list.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Case Example */}
                            <div className="sba-case-block wow fadeInUp mb-50" data-wow-delay=".3s">
                                <div className="sba-case-label"><i className={realEstateCaseExampleData.icon}></i> {realEstateCaseExampleData.label}</div>
                                <h4>{realEstateCaseExampleData.title}</h4>
                                <div className="sba-case-math">
                                    {realEstateCaseExampleData.math.map((item, index) => (
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
                                <p className="sba-case-note">{realEstateCaseExampleData.note}</p>
                            </div>

                            {/* Environmental Factors */}
                            <div className="sba-timeline-block wow fadeInUp mb-50" data-wow-delay=".3s" style={{ borderLeft: '5px solid #ef4444' }}>
                                <div className="sba-timeline-alert" style={{ background: '#fef2f2', borderLeftColor: '#ef4444', color: '#b91c1c' }}>
                                    <i className="fas fa-biohazard"></i> {realEstateEnvironmentalData.label}
                                </div>
                                <div className="px-3">
                                    <h4 className="mb-2" style={{ color: '#103C3B' }}>{realEstateEnvironmentalData.title}</h4>
                                    <p className="mb-0" style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.7' }}>{realEstateEnvironmentalData.desc}</p>
                                </div>
                            </div>

                            {/* Preparation Checklist */}
                            <div id="re-preparation" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{realEstatePositioningData.label}</span>
                                <h3 className="sba-section-title">{realEstatePositioningData.title}</h3>
                            </div>
                            <div className="sba-checklist-block wow fadeInUp mb-50" data-wow-delay=".3s">
                                {realEstatePositioningData.items.map((item, index) => (
                                    <div className="sba-checklist-item" key={index}>
                                        <span className="sba-check-num">{index + 1}</span> {item}
                                    </div>
                                ))}
                            </div>

                            {/* FAQ Section */}
                            <div id="re-faq" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{realEstateFaqData.label}</span>
                                <h3 className="sba-section-title">{realEstateFaqData.title}</h3>
                            </div>
                            <div className="sba-faq-block wow fadeInUp" data-wow-delay=".3s">
                                {realEstateFaqData.items.map((item, index) => (
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
                            <SbaSidebar sidebarData={realEstateSidebarData} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
