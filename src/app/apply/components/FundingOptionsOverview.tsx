import { APPLY_FUNDING_CATEGORIES, APPLY_FUNDING_DISCLAIMER } from '@/data/apply';

/** The /funding-options "Funding Categories" grid, with the categories FCH reviews through this application. */
export default function FundingOptionsOverview() {
    return (
        <section className="funding-categories-grid apply-options" aria-labelledby="apply-options-title">
            <div className="container">
                <div className="row g-4">
                    <div className="col-xl-3 col-lg-12 wow fadeInUp" data-wow-delay=".1s">
                        <div className="sec-title">
                            <h6 className="sub-title">
                                <span className="triangle triangle1"></span>
                                <span className="triangle triangle2"></span>
                                Funding Options
                            </h6>
                            <h2 id="apply-options-title" className="title">Funding paths we can review.</h2>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-12">
                        <div className="row g-4">
                            {APPLY_FUNDING_CATEGORIES.map((category, i) => (
                                <div key={category.title} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={`.${i + 2}s`}>
                                    <div className={`funding-card apply-option-card${i === 0 ? ' dark-bg' : ''}`}>
                                        <div className="card-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
                                        <div className="card-icon">
                                            <i className={category.icon} aria-hidden="true"></i>
                                        </div>
                                        <h3 className="card-title">{category.title}</h3>
                                        <p className="card-desc">{category.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-12 wow fadeInUp" data-wow-delay=".2s">
                        <div className="sba-intro-callout apply-options-callout">
                            <i className="fas fa-info-circle" aria-hidden="true"></i>
                            <span>{APPLY_FUNDING_DISCLAIMER}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
