import Image from 'next/image';
import Link from 'next/link';
import { SOFT_PULL_POINTS } from '@/data/apply';
import { APPLY_FORM_ANCHOR } from '@/lib/applyForm';

/**
 * Same hero as /pre-qualification (breadcrumb, credit-builder-h1, trust-bar,
 * arrow button), with a business image on the right.
 */
export default function ApplyHero({ onStart }: { onStart: (event: React.MouseEvent<HTMLAnchorElement>) => void }) {
    return (
        <section className="hero-section hero-3 apply-hero" style={{ backgroundImage: "url('/images/home-3/hero/hero-bg.png')" }}>
            <div className="row g-4 align-items-center">
                <div className="col-xl-7 col-lg-7">
                    <div className="hero-content">
                        <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                            <li><Link href="/">Home</Link></li>
                            <li>Apply</li>
                        </ul>
                        <h1 className="wow fadeInUp credit-builder-h1" data-wow-delay=".2s">
                            Explore Funding Options for Your Business
                        </h1>
                        <div className="text-item wow fadeInUp animated" data-wow-delay=".4s">
                            <p style={{ maxWidth: '640px' }}>
                                Tell us about your business through one application so our team can review your
                                financing needs and identify potential funding options.
                            </p>
                        </div>
                        <ul className="trust-bar wow fadeInUp animated" data-wow-delay=".5s" aria-label="Soft-pull prequalification">
                            {SOFT_PULL_POINTS.map((point) => (
                                <li className="trust-item" key={point}>
                                    <span className="trust-item-icon" aria-hidden="true">✅</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="hero-button wow fadeInUp animated" data-wow-delay=".6s">
                            <a href={`#${APPLY_FORM_ANCHOR}`} onClick={onStart} className="theme-btn btn-style-one">
                                Start My Application
                                <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
                            </a>
                            <p className="sub-btn-text">
                                One secure application. Our team reviews it and follows up on your options.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="col-xl-5 col-lg-5 d-none d-lg-block">
                    <div className="apply-hero-media wow fadeInUp" data-wow-delay=".4s">
                        <Image
                            src="/images/home-3/about/about-01.jpg"
                            alt="Business owners reviewing financing options with an advisor"
                            width={480}
                            height={584}
                            priority
                        />
                        <div className="apply-hero-badge">
                            <span className="apply-hero-badge-icon"><i className="fas fa-shield-alt" aria-hidden="true"></i></span>
                            <span>
                                <strong>Soft-pull only</strong>
                                <small>No impact to your credit score</small>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
