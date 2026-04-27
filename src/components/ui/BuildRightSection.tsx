import Link from 'next/link';

export default function BuildRightSection({ data }) {
  const { buildRight } = data;
  return (
    <section className="why-choose-section fix section-bg-2">
      <div className="shape-1 bounce-y">
        <img src={buildRight.shape} alt="Floating decorative shape background" />
      </div>
      <div className="auto-container">
        <div className="why-choose-us-wrapper">
          <div className="row g-4 align-items-center">
            <div className="col-xl-5">
              <div className="why-choose-us-image-1">
                <img
                  src={buildRight.image}
                  alt="Strategic business roadmap for achieving funding readiness"
                  className="wow img-custom-anim-left animated"
                />
                <div className="icon-box-items">
                  <div className="icon">
                    <i className={buildRight.icon}></i>
                  </div>
                  <h3>Funding Readiness Recognition</h3>
                </div>
              </div>
            </div>

            <div className="col-xl-7">
              <div className="why-choose-us-content-1">
                <div className="sec-title mb-0">
                  <h6 className="sub-title light">
                    <span className="triangle triangle1"></span>
                    <span className="triangle triangle2"></span>
                    {buildRight.subtitle}
                  </h6>
                  <h2
                    className="title light wow fadeInUp animated"
                    data-wow-delay=".2s"
                  >
                    {buildRight.title}
                  </h2>
                </div>

                <div className="tab-content light">
                  <div id="Mission" className="tab-pane fade show active">
                    <div className="why-choose-list wow fadeInUp animated" data-wow-delay=".3s">
                      <p>{buildRight.text}</p>
                    </div>
                    <div className="why-choose-list-items">
                      <ul className="why-list wow fadeInUp animated" data-wow-delay=".5s">
                        {buildRight.list.map((item, i) => (
                          <li key={i}>
                            <img src="/images/home-3/list-icon.png" alt="Checkmark list icon" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div
                    className="about-content-3 about-button wow fadeInUp animated"
                    data-wow-delay=".6s"
                  >
                    <Link href={buildRight.cta.link} className="theme-btn btn-style-one">
                      {buildRight.cta.text}
                      <span className="icon">
                        <i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
