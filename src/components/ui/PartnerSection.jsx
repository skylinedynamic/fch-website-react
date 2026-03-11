import Link from 'next/link';

export default function PartnerSection({ data }) {
  const { partner } = data;
  return (
    <section className="ks-project-area">
      <div className="auto-container">
        <div className="sec-title text-center mb-50">
          <h6 className="sub-title wow fadeInUp animated" style={{ visibility: 'visible' }}>
            <span className="triangle triangle1"></span>
            <span className="triangle triangle2"></span>
            {partner.subtitle}
          </h6>
          <h2 className="wow fadeInUp animated" data-wow-delay=".3s" dangerouslySetInnerHTML={{ __html: partner.title }} />
        </div>
        <div className="row">
          <div className="col-12">
            {partner.panels.map((panel, idx) => (
              <div key={idx} className={`ks-project-item ks-project-panel ${idx === 0 ? 'partner-project-main' : ''}`}>
                <div className="d-flex justify-content-end">
                  <div className="ks-project-content-wrap">
                    <div className="ks-project-content partner-content">
                      <span className="ks-project-subtitle">{panel.title}</span>
                      <p className="ks-project-text">{panel.subtitle}</p>
                      <p className="ks-project-text mb-4">{panel.text}</p>
                      <ul className="partner-list mb-4">
                        {panel.list.map((item, idy) => (
                          <li key={idy}>{item}</li>
                        ))}
                      </ul>
                      <div className="about-content-3 about-button wow fadeInUp animated animated" data-wow-delay=".6s" style={{ paddingTop: '0px' }}>
                        <a href={panel.cta.link} target="_blank" rel="noopener noreferrer" className="theme-btn btn-style-one">
                          {panel.cta.text}
                          <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
