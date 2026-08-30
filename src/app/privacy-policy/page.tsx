'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import EmailObfuscator from '@/components/common/EmailObfuscator';

export default function PrivacyPolicyPage() {
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
                                <li>Privacy Policy</li>
                            </ul>
                            <h1 className="wow fadeInUp" data-wow-delay=".2s" style={{ fontSize: '56px' }}>Privacy Policy</h1>
                            <p className="text-white wow fadeInUp" data-wow-delay=".4s">Legal-Grade v1.0</p>
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
                                    <p><strong>URL:</strong> <a href="/privacy-policy">www.fourcornerfunding.com/privacy-policy</a></p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>1. INTRODUCTION</h4>
                                    <p>Four Corner Holdings, LLC, doing business as Four Corner Funding (“Company,” “we,” “our,” or “us”), is committed to protecting your privacy and safeguarding your personal and business information.</p>
                                    <p>This Privacy Policy explains how we collect, use, disclose, and protect information when you access our website, platform, and services.</p>
                                    <p>By using our services, you agree to the terms of this Privacy Policy.</p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>2. INFORMATION WE COLLECT</h4>
                                    <p>We collect information necessary to provide underwriting, credit analysis, and funding-related services.</p>

                                    <h5>A. Personal Information</h5>
                                    <p>May include:</p>
                                    <ul>
                                        <li>Name, email, phone number</li>
                                        <li>Date of birth</li>
                                        <li>Social Security Number (SSN) or partial SSN</li>
                                        <li>Driver’s license or government ID</li>
                                        <li>Residential address</li>
                                    </ul>

                                    <h5>B. Business Information</h5>
                                    <p>May include:</p>
                                    <ul>
                                        <li>Business name, EIN</li>
                                        <li>Business address and contact details</li>
                                        <li>Ownership structure</li>
                                        <li>Time in business (TIB)</li>
                                        <li>Industry classification (NAICS)</li>
                                    </ul>

                                    <h5>C. Financial & Credit Information</h5>
                                    <p>May include:</p>
                                    <ul>
                                        <li>Personal credit data (via compliant soft-pull providers such as iSoftPull)</li>
                                        <li>Business credit data (Dun & Bradstreet, Experian, Equifax, MicroBilt)</li>
                                        <li>Banking and cash flow data (if provided)</li>
                                        <li>Public records (liens, judgments, UCC filings)</li>
                                    </ul>

                                    <h5>D. Technical & Usage Data</h5>
                                    <ul>
                                        <li>IP address</li>
                                        <li>Browser and device type</li>
                                        <li>Platform usage activity</li>
                                        <li>Session logs and timestamps</li>
                                    </ul>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>3. HOW WE USE YOUR INFORMATION</h4>
                                    <p>We use collected information to:</p>
                                    <ul>
                                        <li>Perform underwriting and credit analysis</li>
                                        <li>Determine funding eligibility and positioning</li>
                                        <li>Verify identity and prevent fraud</li>
                                        <li>Facilitate communication and support</li>
                                        <li>Operate and improve our platform and services</li>
                                        <li>Comply with legal and regulatory obligations</li>
                                    </ul>
                                    <p><strong>We do not sell your personal information.</strong></p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>4. DATA SHARING & DISCLOSURE</h4>
                                    <p>We may share information with:</p>

                                    <h5>A. Service Providers</h5>
                                    <ul>
                                        <li>Credit bureaus and data providers</li>
                                        <li>Payment processors (e.g., Stripe)</li>
                                        <li>Technology vendors and infrastructure providers</li>
                                    </ul>

                                    <h5>B. Funding & Business Partners</h5>
                                    <ul>
                                        <li>Lenders and capital providers (for funding evaluation only)</li>
                                        <li>Partner organizations involved in your application</li>
                                    </ul>

                                    <h5>C. Legal & Compliance</h5>
                                    <ul>
                                        <li>Government authorities when required by law</li>
                                        <li>Regulatory bodies or in response to legal requests</li>
                                    </ul>
                                    <p>We only share information as necessary to deliver services and maintain compliance.</p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>5. CREDIT DATA & THIRD-PARTY SOURCES</h4>
                                    <p>We obtain credit and business data from third-party providers, including but not limited to:</p>
                                    <ul>
                                        <li>Dun & Bradstreet (D&B)</li>
                                        <li>Experian</li>
                                        <li>Equifax</li>
                                        <li>MicroBilt</li>
                                        <li>iSoftPull (consumer credit access)</li>
                                    </ul>
                                    <p>You acknowledge that:</p>
                                    <ul>
                                        <li>These providers maintain their own data practices</li>
                                        <li>We do not control the accuracy of third-party data</li>
                                        <li>Credit data is used strictly for underwriting and funding purposes</li>
                                    </ul>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>6. DATA SECURITY</h4>
                                    <p>We implement commercially reasonable security measures, including:</p>
                                    <ul>
                                        <li>Encryption of sensitive data</li>
                                        <li>Secure servers and infrastructure</li>
                                        <li>Access controls and role-based permissions (RBAC)</li>
                                        <li>Monitoring and audit logging</li>
                                    </ul>
                                    <p>Despite these measures, no system can guarantee absolute security.</p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>7. DATA RETENTION</h4>
                                    <p>We retain information:</p>
                                    <ul>
                                        <li>As long as necessary to provide services</li>
                                        <li>To comply with legal, tax, and regulatory obligations</li>
                                        <li>To resolve disputes and enforce agreements</li>
                                    </ul>
                                    <p>Data may be retained even after account closure where required.</p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>8. YOUR RIGHTS</h4>
                                    <p>Depending on applicable law, you may have the right to:</p>
                                    <ul>
                                        <li>Access your information</li>
                                        <li>Request corrections</li>
                                        <li>Request deletion (subject to legal limitations)</li>
                                        <li>Opt out of certain communications</li>
                                    </ul>
                                    <p>Requests can be submitted to: <EmailObfuscator email="support@fourcornerfunding.com" showIcon={false} /></p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>9. COOKIES & TRACKING</h4>
                                    <p>We may use cookies and similar technologies to:</p>
                                    <ul>
                                        <li>Improve user experience</li>
                                        <li>Track platform usage</li>
                                        <li>Maintain session security</li>
                                    </ul>
                                    <p>You may disable cookies via browser settings, though functionality may be limited.</p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>10. THIRD-PARTY LINKS</h4>
                                    <p>Our platform may contain links to third-party websites.</p>
                                    <p>We are not responsible for the privacy practices or content of those external sites.</p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>11. CHILDREN’S PRIVACY</h4>
                                    <p>Our services are not intended for individuals under the age of 18.</p>
                                    <p>We do not knowingly collect data from minors.</p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>12. CHANGES TO THIS POLICY</h4>
                                    <p>We reserve the right to update this Privacy Policy at any time.</p>
                                    <p>Changes will be posted on this page with an updated effective date.</p>
                                    <p>Continued use of the platform constitutes acceptance of the updated policy.</p>
                                </div>

                                <div className="term-block mb-3">
                                    <h4>13. CONTACT INFORMATION</h4>
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
                        margin-bottom: 15px;
                        font-size: 24px;
                        border-bottom: 1px solid #f1f1f1;
                        padding-bottom: 8px;
                        margin-top: 30px;
                    }
                    .terms-content h5 {
                        color: #2D9A96;
                        font-weight: 600;
                        margin-top: 20px;
                        margin-bottom: 10px;
                        font-size: 18px;
                    }
                    .terms-content p {
                        line-height: 1.8;
                        color: #555;
                        margin-bottom: 10px;
                    }
                    .terms-content ul {
                        margin-bottom: 15px;
                    }
                    .terms-content ul li {
                        position: relative;
                        padding-left: 25px;
                        margin-bottom: 8px;
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
