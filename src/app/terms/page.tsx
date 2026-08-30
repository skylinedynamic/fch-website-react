'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import EmailObfuscator from '@/components/common/EmailObfuscator';

export default function TermsOfServicePage() {
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
                                <li>Terms of Service</li>
                            </ul>
                            <h1 className="wow fadeInUp" data-wow-delay=".2s" style={{ fontSize: '56px' }}>Terms of Service</h1>
                            <p className="text-white wow fadeInUp" data-wow-delay=".4s">Legal-Grade v2.0</p>
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
                                    <p><strong>Effective Date:</strong> {effectiveDate}</p>
                                    <p><strong>URL:</strong> <a href="https://www.fourcornerfunding.com/terms">www.fourcornerfunding.com/terms</a></p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>1. INTRODUCTION</h4>
                                    <p>These Terms of Service (“Terms”) govern your access to and use of the website, software platform, and services provided by Four Corner Funding™ (a product of Four Corner Holdings, LLC) (“Company,” “we,” “our,” or “us”).</p>
                                    <p>By accessing or using the platform, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, you may not use the platform or services.</p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>2. PLATFORM DESCRIPTION (B2B FINTECH POSITIONING)</h4>
                                    <p>Four Corner Funding operates as a business-to-business (B2B) fintech platform designed to support business credit development, underwriting preparation, and funding eligibility positioning.</p>
                                    <p>Services may include:</p>
                                    <ul>
                                        <li>Business Credit Building Programs (Tier 0–Tier 4)</li>
                                        <li>Underwriting & Prequalification Engine</li>
                                        <li>Document Management & CRM Tools</li>
                                        <li>Partner & White-Label Platform Access</li>
                                    </ul>
                                    <p><strong>Important Disclosure:</strong></p>
                                    <p>The platform may involve the review of personal credit data of business owners (e.g., personal guarantors) strictly for underwriting and funding eligibility purposes. The Company does not provide consumer credit repair services.</p>
                                    <p>No guarantees are made regarding credit outcomes, approvals, funding amounts, or reporting behavior.</p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>3. PLATFORM GOVERNANCE & DATA CONTROLS</h4>
                                    <p>The platform operates under strict system controls, including but not limited to:</p>
                                    <ul>
                                        <li>Role-Based Access Control (RBAC)</li>
                                        <li>Multi-tenant data isolation</li>
                                        <li>Cost-protected API and bureau integrations</li>
                                        <li>Underwriting approval gating for data access</li>
                                    </ul>
                                    <p>Users acknowledge and agree that:</p>
                                    <ul>
                                        <li>They may not initiate or trigger external data pulls, including credit bureau requests</li>
                                        <li>All third-party data access is controlled exclusively by the Company</li>
                                        <li>Data refresh cycles are governed by system rules and third-party limitations</li>
                                        <li>Platform activity may be monitored, logged, and audited for compliance and fraud prevention</li>
                                    </ul>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>4. PAYMENT TERMS</h4>
                                    <p>All fees are due as outlined at the time of purchase or enrollment.</p>
                                    <p><strong>Program Fees:</strong></p>
                                    <ul>
                                        <li>Client Enrollment: $2,497 or installment plan</li>
                                        <li>Certified Partner: $4,997 or installment plan + SaaS fee</li>
                                        <li>White-Label Partner: $7,997 or installment plan + SaaS fee</li>
                                        <li>Client Activation Fee (Partners): $800 per borrower</li>
                                    </ul>
                                    <p>Payments may be processed as one-time or recurring charges depending on selected plan.</p>
                                    <p><strong>Payment Enforcement:</strong></p>
                                    <ul>
                                        <li>Failure, reversal, or chargeback constitutes a material breach</li>
                                        <li>The Company reserves the right to suspend access immediately</li>
                                        <li>Outstanding balances may be accelerated and become immediately due</li>
                                        <li>The Company may pursue legal remedies, including collection costs and attorney fees</li>
                                    </ul>
                                    <p>All sales are final unless otherwise stated in a written agreement.</p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>5. CLIENT & PARTNER RESPONSIBILITIES</h4>
                                    <p>Users agree to:</p>
                                    <ul>
                                        <li>Provide accurate and complete information</li>
                                        <li>Use the platform for lawful business purposes only</li>
                                        <li>Maintain account security and confidentiality</li>
                                        <li>Avoid misrepresentation of affiliation or services</li>
                                    </ul>
                                    <p>Partners agree to:</p>
                                    <ul>
                                        <li>Operate within approved use cases</li>
                                        <li>Not resell or represent the platform beyond authorized scope</li>
                                        <li>Comply with all applicable laws and platform policies</li>
                                    </ul>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>6. CREDIT & DATA AUTHORIZATION</h4>
                                    <p>By using the platform, you authorize the Company to:</p>
                                    <ul>
                                        <li>Access business and/or personal credit data where applicable</li>
                                        <li>Share information with third-party service providers, bureaus, or funding sources</li>
                                    </ul>
                                    <p>All personal credit access will be conducted via compliant soft-pull methods unless separate consent is obtained.</p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>7. NO GUARANTEE / NO ADVICE DISCLAIMER</h4>
                                    <p>The Company does not guarantee:</p>
                                    <ul>
                                        <li>Credit score improvements</li>
                                        <li>Tradeline reporting outcomes</li>
                                        <li>Funding approvals or terms</li>
                                    </ul>
                                    <p>All outcomes depend on third parties, user actions, and external factors.</p>
                                    <p>The platform does not provide legal, tax, or financial advice. Users are responsible for seeking independent professional guidance.</p>
                                </div>

                                <div className="term-block mb-4">
                                    <h4>8. PARTNER RELATIONSHIP DISCLAIMER</h4>
                                    <p>Certified and White-Label Partners operate as independent entities. The Company is not responsible for:</p>
                                    <ul>
                                        <li>Partner representations or communications</li>
                                        <li>Fees charged by partners</li>
                                        <li>Actions taken by partners outside the platform</li>
                                    </ul>
                                </div>

                                <div className="term-block mb-4">
                                    <h4>9. INTELLECTUAL PROPERTY</h4>
                                    <p>All platform content, systems, software, and documentation are the exclusive property of Four Corner Holdings, LLC. Users may not:</p>
                                    <ul>
                                        <li>Copy, reproduce, or distribute content</li>
                                        <li>Reverse engineer platform functionality</li>
                                        <li>Use materials outside permitted scope</li>
                                    </ul>
                                    <p>White-label rights are limited to approved branding usage only.</p>
                                </div>

                                <div className="term-block mb-4">
                                    <h4>10. ACCOUNT SUSPENSION & TERMINATION</h4>
                                    <p>The Company reserves the right to:</p>
                                    <ul>
                                        <li>Suspend or terminate accounts at its sole discretion</li>
                                        <li>Restrict access for non-payment, misuse, or fraud</li>
                                        <li>Revoke access without refund in cases of material breach</li>
                                    </ul>
                                </div>

                                <div className="term-block mb-4">
                                    <h4>11. LIMITATION OF LIABILITY</h4>
                                    <p>To the maximum extent permitted by law, the Company is not liable for:</p>
                                    <ul>
                                        <li>Third-party funding decisions</li>
                                        <li>Credit bureau inaccuracies</li>
                                        <li>Loss of business or revenue</li>
                                        <li>Indirect, incidental, or consequential damages</li>
                                    </ul>
                                    <p>Use of the platform is at your own risk.</p>
                                </div>

                                <div className="term-block mb-4">
                                    <h4>12. GOVERNING LAW & DISPUTE RESOLUTION</h4>
                                    <p>These Terms are governed by the laws of the State of Florida.</p>
                                    <p>Any disputes shall be resolved through binding arbitration in Tampa, Florida, unless otherwise required by law.</p>
                                </div>

                                <div className="term-block mb-4">
                                    <h4>13. MODIFICATIONS TO TERMS</h4>
                                    <p>The Company reserves the right to update these Terms at any time.</p>
                                    <p>Continued use of the platform constitutes acceptance of revised Terms.</p>
                                </div>

                                <div className="term-block mb-4">
                                    <h4>14. CONTACT INFORMATION</h4>
                                    <p>Four Corner Holdings, LLC<br />
                                        3750 Gunn Highway, Suite 306<br />
                                        Tampa, FL 33618<br />
                                        <EmailObfuscator email="support@fourcornerfunding.com" showIcon={false} /><br />
                                        <a href="tel:8133913333">813-391-3333</a><br />
                                        <a href="https://www.fourcornerfunding.com">www.fourcornerfunding.com</a></p>
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
