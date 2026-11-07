'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { APPLY_FORM_ANCHOR } from '@/lib/applyForm';
import { useApplyForm } from '@/hooks/useCMS';
import ApplyHero from './components/ApplyHero';
import ApplyFormFrame from './components/ApplyFormFrame';
import FundingOptionsOverview from './components/FundingOptionsOverview';
import SoftPullNotice from './components/SoftPullNotice';
import './apply.css';

export default function ApplyPage() {
    const { data: applyForm, isLoading } = useApplyForm();

    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).WOW) {
            new (window as any).WOW().init();
        }
    }, []);

    const scrollToApplication = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        document.getElementById(APPLY_FORM_ANCHOR)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <main>
            <ApplyHero onStart={scrollToApplication} />

            <FundingOptionsOverview />

            {/* Application */}
            <section id={APPLY_FORM_ANCHOR} className="sba-article-section apply-application" aria-label="Business funding application">
                {/* Same .container as the funding grid above, so every block lines up. */}
                <div className="container">
                    <SoftPullNotice />

                    {/* No reveal animation here: the application and its disclosure must
                        never wait on a scroll event to become visible. */}
                    <div className="prequal-form-container apply-form-card">
                        <div className="apply-form-head">
                            <h3 className="prequal-step-title mb-0">
                                <i className="fas fa-file-signature" aria-hidden="true"></i> Business Funding Application
                            </h3>
                            <span className="apply-secure-pill">
                                <i className="fas fa-lock" aria-hidden="true"></i> Secure &amp; Encrypted
                            </span>
                        </div>

                        {isLoading ? (
                            <div className="apply-form-state" role="status">
                                <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                Loading the application…
                            </div>
                        ) : applyForm ? (
                            <ApplyFormFrame form={applyForm} />
                        ) : (
                            <div className="apply-form-state apply-form-state--error" role="alert">
                                <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                                The application is not available right now. Please try again later.
                            </div>
                        )}

                        <div className="apply-form-foot">
                            {applyForm && (
                                <a href={applyForm.form_url} target="_blank" rel="noopener noreferrer" className="apply-newtab-link">
                                    <i className="fas fa-external-link-alt" aria-hidden="true"></i> Open Application in a New Tab
                                </a>
                            )}
                            <nav className="apply-legal-links" aria-label="Legal">
                                <Link href="/privacy-policy">Privacy Policy</Link>
                                <span aria-hidden="true">•</span>
                                <Link href="/terms">Terms of Service</Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
