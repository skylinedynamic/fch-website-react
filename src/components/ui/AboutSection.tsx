import Link from 'next/link';

export default function AboutSection({ data }) {
  const { about } = data;
  return (
    <section className="about-section fix section-padding section-margin">
      <div className="auto-container">
        <div className="row g-4">
          {/* Images Column */}
          <div className="col-lg-6">
            <div className="image-column-3">
              <div className="inner-column">
                <div className="image1 overlay-anim wow fadeInUp" data-wow-delay=".3s">
                  <img src={about.images[0]} alt="Image" />
                </div>
                <div className="info float-bob-x">
                  <img src={about.infoImage} alt="Image" />
                </div>
                <div className="image2 wow fadeInUp" data-wow-delay=".5s">
                  <img src={about.images[1]} alt="Image" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="col-lg-6">
            <div className="about-content-3">
              <div className="sec-title mb-0">
                <h6 className="sub-title wow fadeInUp">
                  <span className="triangle triangle1"></span>
                  <span className="triangle triangle2"></span>
                  {about.subtitle}
                </h6>
                <h2 className="wow fadeInUp" data-wow-delay=".2s">
                    {about.title}
                </h2>
              </div>
              <p className="about-text wow fadeInUp" data-wow-delay=".4s">
                {about.text}
              </p>

              <div className="skill-feature wow fadeInUp" data-wow-delay="1s">
                <h3 className="box-title">Business Success</h3>
                <div className="progress">
                  <div
                    className="progress-bar"
                    style={{
                      width: `${about.successRate}%`,
                      animation: '2.6s ease 0s 1 normal none running animate-positive',
                      opacity: 1,
                    }}
                  >
                    <div className="progress-value">
                      <span className="counter-number2">{about.successRate}</span>%
                    </div>
                  </div>
                </div>
              </div>

              <div className="info mt-50 wow fadeInUp" data-wow-delay=".2s">
                <Link
                  href={about.cta.link}
                  className="theme-btn btn-style-one wow fadeInUp"
                  data-wow-delay=".5s"
                >
                  {about.cta.text}
                  <span className="icon">
                    <i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i>
                  </span>
                </Link>

                <div className="user">
                  <div className="image">
                    <img src={about.founder.image} alt="Image" />
                  </div>
                  <div>
                    <div className="signature-text">{about.founder.name}</div>
                    <p className="sub-title">{about.founder.role}</p>
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
