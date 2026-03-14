import Link from 'next/link';

export default function SbaSidebar({ sidebarData }) {
    if (!sidebarData) return null;

    return (
        <div className="sidebar sba-sticky-sidebar">
            {/* Quick Navigator */}
            <div className="sidebar__single sba-sidebar-nav wow fadeInUp" data-wow-delay=".3s">
                <h3 className="sidebar__title">Quick Navigation</h3>
                <ul className="sba-nav-list list-unstyled">
                    {sidebarData.nav.map((item, index) => (
                        <li key={index}>
                            <a href={item.link}>
                                <i className={item.icon}></i> {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Key Metrics Card */}
            <div className="sidebar__single sba-sidebar-metrics wow fadeInUp" data-wow-delay=".4s">
                <h3 className="sidebar__title">Key Metrics at a Glance</h3>
                <div className="sba-metric-mini">
                    {sidebarData.metrics.map((item, index) => (
                        <div className="sba-metric-mini-row" key={index}>
                            <span className="sba-mini-label">{item.label}</span>
                            <span className="sba-mini-val">{item.val}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Sidebar */}
            <div className="sidebar__single sba-sidebar-cta wow fadeInUp" data-wow-delay=".5s">
                <h3>{sidebarData.cta.title}</h3>
                <p>{sidebarData.cta.desc}</p>
                <Link href={sidebarData.cta.btnLink} className="theme-btn btn-style-one w-100 text-center d-block">
                    {sidebarData.cta.btnText}
                </Link>
            </div>
        </div>
    );
}
