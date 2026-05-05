'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function DisclosurePage() {
    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).WOW) {
            new (window as any).WOW().init();
        }
    }, []);

    const effectiveDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <main>
            {/* Hero Section */}
            <section className="hero-section hero-3" style={{ backgroundImage: "url('/images/home-3/hero/hero-bg.png')", height: '400px' }}>
                <div className="row g-4 align-items-center justify-content-center text-center w-100 h-100">
                    <div className="col-xl-12">
                        <div className="hero-content">
                            <ul className="page-breadcrumb wow fadeInUp animated pb-2 justify-content-center" data-wow-delay=".3s">
                                <li><Link href="/">Home</Link></li>
                                <li>Disclosure</li>
                            </ul>
                            <h1 className="wow fadeInUp" data-wow-delay=".2s" style={{ fontSize: '56px' }}>Disclosure</h1>
                            <p className="text-white wow fadeInUp" data-wow-delay=".4s">Credit Authorization & Permissible Purpose</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="terms-section section-padding pt-100 pb-100">
                <div className="auto-container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10">
                            <div className="terms-content wow fadeInUp" data-wow-delay=".2s">
                                <div className="mb-5">
                                    <h3>FOUR CORNER FUNDING™</h3>
                                    <h4 className="border-0 p-0 m-0" style={{ color: '#2D9A96', fontSize: '18px' }}>CREDIT AUTHORIZATION & PERMISSIBLE PURPOSE DISCLOSURE</h4>
                                    <p className="mt-3"><strong>Effective Date:</strong> {effectiveDate}</p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>1. AUTHORIZATION</h4>
                                    <p>By submitting any application, form, or request through this website or platform, you (“Applicant”) hereby authorize Four Corner Holdings, LLC, DBA Four Corner Funding (“Company”), its affiliates, service providers, and funding partners to obtain, review, and evaluate your credit information as outlined below.</p>
                                    <p>This authorization applies to both:</p>
                                    <ul>
                                        <li>Personal Credit Reports (for business owners, guarantors, or principals)</li>
                                        <li>Business Credit Reports (including commercial credit profiles and trade data)</li>
                                    </ul>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>2. PERMISSIBLE PURPOSE</h4>
                                    <p>You acknowledge and agree that the Company has a permissible purpose to access your credit information for the following business purposes:</p>
                                    <ul>
                                        <li>Business credit evaluation and fundability analysis</li>
                                        <li>Underwriting and prequalification assessment</li>
                                        <li>Funding eligibility determination</li>
                                        <li>Verification of identity and financial responsibility</li>
                                        <li>Ongoing account review and servicing (if applicable)</li>
                                    </ul>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>3. PERSONAL CREDIT DISCLOSURE (PG CONTEXT)</h4>
                                    <p>Where applicable, you understand that:</p>
                                    <ul>
                                        <li>Personal credit may be reviewed in connection with your role as a business owner, officer, or personal guarantor</li>
                                        <li>Such review is conducted solely for business underwriting and funding purposes</li>
                                        <li>No hard inquiry will be made without additional explicit authorization where required by law</li>
                                    </ul>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>4. BUSINESS CREDIT & DATA SOURCES</h4>
                                    <p>The Company may obtain business-related data from, including but not limited to:</p>
                                    <ul>
                                        <li>Dun & Bradstreet (D&B)</li>
                                        <li>Experian Business</li>
                                        <li>Equifax Commercial</li>
                                        <li>MicroBilt</li>
                                        <li>Other commercial data providers</li>
                                    </ul>
                                    <p>You acknowledge that:</p>
                                    <ul>
                                        <li>Business credit data may include trade lines, payment history, and public records</li>
                                        <li>Reporting accuracy is determined by third-party providers, not the Company</li>
                                    </ul>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>5. CONTINUING AUTHORIZATION</h4>
                                    <p>This authorization remains valid:</p>
                                    <ul>
                                        <li>For the duration of your relationship with the Company</li>
                                        <li>For any updates, renewals, or re-evaluations related to funding or credit positioning</li>
                                    </ul>
                                    <p>You authorize the Company to obtain updated credit information as reasonably necessary for these purposes.</p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>6. NO GUARANTEE</h4>
                                    <p>You acknowledge that:</p>
                                    <ul>
                                        <li>Credit review does not guarantee approval, funding, or credit profile changes</li>
                                        <li>All outcomes depend on third-party lenders, bureaus, and underwriting criteria</li>
                                    </ul>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>7. ELECTRONIC CONSENT</h4>
                                    <p>By submitting your application electronically, you:</p>
                                    <ul>
                                        <li>Consent to this authorization being executed electronically</li>
                                        <li>Agree that your electronic submission constitutes a legally binding authorization</li>
                                        <li>Confirm that you are authorized to act on behalf of the business (if applicable)</li>
                                    </ul>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>8. CERTIFICATION</h4>
                                    <p>You certify that:</p>
                                    <ul>
                                        <li>All information provided is true, accurate, and complete</li>
                                        <li>You are authorized to submit this request on behalf of the business (if applicable)</li>
                                        <li>You understand and agree to the terms of this authorization</li>
                                    </ul>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>9. REQUIRED CHECKBOX LANGUAGE (UI IMPLEMENTATION)</h4>
                                    <div className="p-3 bg-light border rounded mb-3">
                                        <p className="mb-0 d-flex gap-2">
                                            <i className="far fa-square mt-1"></i>
                                            <span>I authorize Four Corner Funding (Four Corner Holdings, LLC) and its partners to obtain and review my personal and/or business credit reports for underwriting, prequalification, and funding purposes. I understand this may include soft credit inquiries and does not guarantee approval.</span>
                                        </p>
                                    </div>
                                    <div className="p-3 bg-light border rounded">
                                        <p className="mb-0 d-flex gap-2">
                                            <i className="far fa-square mt-1"></i>
                                            <span>I confirm I am an owner or authorized representative of the business and have authority to provide this authorization.</span>
                                        </p>
                                    </div>
                                </div>

                                <div className="final-notice mt-5 pt-4 border-top">
                                    <p><strong>FINAL NOTICE</strong></p>
                                    <p>Four Corner Funding™ is a product of Four Corner Holdings, LLC.<br />
                                        All rights reserved.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
                    .terms-content h4 {
                        color: #103C3B;
                        font-weight: 700;
                        margin-bottom: 10px;
                        font-size: 20px;
                        border-bottom: 1px solid #f1f1f1;
                        padding-bottom: 8px;
                        margin-top: 15px;
                    }
                    .terms-content p {
                        line-height: 1.8;
                        color: #555;
                        margin-bottom: 10px;
                    }
                    .terms-content ul {
                        margin-bottom: 10px;
                    }
                    .terms-content ul li {
                        position: relative;
                        padding-left: 25px;
                        margin-bottom: 6px;
                        color: #555;
                        line-height: 1.6;
                    }
                    .terms-content ul li::before {
                        content: '\f058';
                        font-family: "Font Awesome 6 Free";
                        font-weight: 900;
                        position: absolute;
                        left: 0;
                        top: 2px;
                        color: #2D9A96;
                        font-size: 14px;
                    }
                    .term-block {
                        padding: 0;
                    }
                `}</style>
            </section>
        </main>
    );
}
