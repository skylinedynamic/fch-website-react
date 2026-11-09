import { SOFT_PULL_DISCLOSURE, SOFT_PULL_HEADLINE } from '@/data/apply';

/** The soft-pull disclosure directly above the application, in the /sba-programs intro-block style. */
export default function SoftPullNotice() {
    return (
        <div className="sba-intro-block apply-soft-pull">
            <div className="sba-intro-label">
                <i className="fas fa-shield-alt" aria-hidden="true"></i> Soft-Pull Prequalification
            </div>
            <h2 className="sba-intro-title">{SOFT_PULL_HEADLINE}</h2>
            <p className="sba-intro-text mb-0">{SOFT_PULL_DISCLOSURE}</p>
        </div>
    );
}
