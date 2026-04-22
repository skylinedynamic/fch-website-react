'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import SbaSidebar from '@/components/ui/SbaSidebar';
import {
    assetEquipmentHeroData,
    assetEquipmentIntroData,
    assetEquipmentStructureData,
    assetEquipmentMechanismData,
    assetEquipmentEquityData,
    assetEquipmentAssetTypeData,
    assetEquipmentTransportationData,
    assetEquipmentTaxData,
    assetEquipmentFitData,
    assetEquipmentCaseExampleData,
    assetEquipmentChecklistData,
    assetEquipmentFaqData,
    assetEquipmentSidebarData
} from '@/data/assetEquipmentData';

export default function AssetEquipmentPage() {
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
            <section className="hero-section hero-3" style={{ backgroundImage: `url('${assetEquipmentHeroData.bgImage}')` }}>
                <div className="row g-4 align-items-center">
                    <div className="col-xl-7 col-lg-6">
                        <div className="hero-content">
                            <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                                {assetEquipmentHeroData.breadcrumb.map((crumb, index) => (
                                    <li key={index}>
                                        {index === assetEquipmentHeroData.breadcrumb.length - 1 ? (
                                            crumb.label
                                        ) : (
                                            <Link href={crumb.link}>{crumb.label}</Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                            <h1 className="wow fadeInUp credit-builder-h1" data-wow-delay=".2s">{assetEquipmentHeroData.title}</h1>
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
                            <div id="asset-overview" className="sba-intro-block wow fadeInUp" data-wow-delay=".2s">
                                <div className="sba-intro-label"><i className={assetEquipmentIntroData.icon}></i> {assetEquipmentIntroData.label}</div>
                                <h2 className="sba-intro-title">{assetEquipmentIntroData.title}</h2>
                                <p className="sba-intro-text">{assetEquipmentIntroData.text}</p>
                                <div className="sba-intro-callout">
                                    <i className={assetEquipmentIntroData.calloutIcon}></i>
                                    <span>{assetEquipmentIntroData.callout}</span>
                                </div>
                            </div>

                            {/* Structure vs Lease */}
                            <div id="asset-structure" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{assetEquipmentStructureData.label}</span>
                                <h3 className="sba-section-title">{assetEquipmentStructureData.title}</h3>
                                <p className="sba-section-desc">{assetEquipmentStructureData.desc}</p>
                            </div>

                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                {assetEquipmentStructureData.items.map((item, index) => (
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

                            {/* Qualification Standards */}
                            <div id="asset-qualify" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{assetEquipmentMechanismData.label}</span>
                                <h3 className="sba-section-title">{assetEquipmentMechanismData.title}</h3>
                                <p className="sba-section-desc">{assetEquipmentMechanismData.desc}</p>
                            </div>

                            {assetEquipmentMechanismData.metrics.map((metric, index) => (
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

                            {/* Down Payments */}
                            <div className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{assetEquipmentEquityData.label}</span>
                                <h3 className="sba-section-title">{assetEquipmentEquityData.title}</h3>
                            </div>
                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                {assetEquipmentEquityData.items.map((item, index) => (
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

                            {/* New vs Used */}
                            <div className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{assetEquipmentAssetTypeData.label}</span>
                                <h3 className="sba-section-title">{assetEquipmentAssetTypeData.title}</h3>
                                <p className="sba-section-desc">{assetEquipmentAssetTypeData.desc}</p>
                            </div>
                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                {assetEquipmentAssetTypeData.items.map((item, index) => (
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

                            {/* Transportation Scrap Warning */}
                            <div id="asset-transport" className="sba-timeline-block wow fadeInUp" style={{ marginBottom: '50px' }} data-wow-delay=".3s">
                                <div className="sba-timeline-alert" style={{ background: '#fef2f2', borderLeftColor: '#ef4444', color: '#b91c1c' }}>
                                    <i className="fas fa-truck-moving" style={{ color: '#ef4444' }}></i> {assetEquipmentTransportationData.label}
                                </div>
                                <div className="p-4">
                                    <h4 className="mb-3" style={{ color: '#103C3B' }}>{assetEquipmentTransportationData.title}</h4>
                                    <p className="mb-3" style={{ fontWeight: '600', color: '#ef4444' }}>{assetEquipmentTransportationData.alert}</p>
                                    <p className="mb-0" style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.7' }}>{assetEquipmentTransportationData.desc}</p>
                                </div>
                            </div>

                            {/* Tax Strategy */}
                            <div id="asset-tax" className="sba-intro-block wow fadeInUp mb-50" data-wow-delay=".2s" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                                <div className="sba-intro-label" style={{ background: '#103C3B', color: '#fff' }}><i className="fas fa-file-contract"></i> {assetEquipmentTaxData.label}</div>
                                <h3 className="sba-intro-title" style={{ marginTop: '15px' }}>{assetEquipmentTaxData.title}</h3>
                                <p className="sba-intro-text">{assetEquipmentTaxData.desc}</p>
                                <div className="sba-intro-callout" style={{ background: '#ecfdf5', borderColor: '#10b981' }}>
                                    <i className="fas fa-lightbulb" style={{ color: '#10b981' }}></i>
                                    <span style={{ color: '#065f46' }}>{assetEquipmentTaxData.callout}</span>
                                </div>
                            </div>

                            {/* Strategic Fit */}
                            <div id="asset-fit" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{assetEquipmentFitData.label}</span>
                                <h3 className="sba-section-title">{assetEquipmentFitData.title}</h3>
                            </div>
                            <div className="row g-4 mb-50 wow fadeInUp" data-wow-delay=".3s">
                                <div className="col-md-6">
                                    <div className="sba-fit-card sba-fit-card--yes">
                                        <div className="sba-fit-header">
                                            <i className={assetEquipmentFitData.yes.icon}></i>
                                            <h4>{assetEquipmentFitData.yes.title}</h4>
                                        </div>
                                        <ul className="sba-fit-list">
                                            {assetEquipmentFitData.yes.list.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="sba-fit-card sba-fit-card--no">
                                        <div className="sba-fit-header">
                                            <i className={assetEquipmentFitData.no.icon}></i>
                                            <h4>{assetEquipmentFitData.no.title}</h4>
                                        </div>
                                        <ul className="sba-fit-list">
                                            {assetEquipmentFitData.no.list.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Case Example */}
                            <div className="sba-case-block wow fadeInUp" data-wow-delay=".3s">
                                <div className="sba-case-label"><i className={assetEquipmentCaseExampleData.icon}></i> {assetEquipmentCaseExampleData.label}</div>
                                <h4>{assetEquipmentCaseExampleData.title}</h4>
                                <div className="sba-case-math">
                                    {assetEquipmentCaseExampleData.math.map((item, index) => (
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
                                <p className="sba-case-note">{assetEquipmentCaseExampleData.note}</p>
                            </div>

                            {/* Preparation Checklist */}
                            <div id="asset-checklist" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{assetEquipmentChecklistData.label}</span>
                                <h3 className="sba-section-title">{assetEquipmentChecklistData.title}</h3>
                            </div>
                            <div className="sba-checklist-block wow fadeInUp" data-wow-delay=".3s">
                                {assetEquipmentChecklistData.items.map((item, index) => (
                                    <div className="sba-checklist-item" key={index}>
                                        <span className="sba-check-num">{index + 1}</span> {item}
                                    </div>
                                ))}
                            </div>

                            {/* FAQ */}
                            <div id="asset-faq" className="sba-section-head wow fadeInUp" data-wow-delay=".2s">
                                <span className="sba-section-label">{assetEquipmentFaqData.label}</span>
                                <h3 className="sba-section-title">{assetEquipmentFaqData.title}</h3>
                            </div>
                            <div className="sba-faq-block wow fadeInUp" data-wow-delay=".3s">
                                {assetEquipmentFaqData.items.map((item, index) => (
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
                            <SbaSidebar sidebarData={assetEquipmentSidebarData} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
