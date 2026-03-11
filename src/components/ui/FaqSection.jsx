import Link from 'next/link';

export default function FaqSection({ data }) {
  const { faq } = data;
  return (
    <section className="faq-section-2 fix">
      <div className="faq-wrapper-2">
        <div className="dotted-shape">
          <img src="/images/home-3/dotted-map.png" alt="img" />
        </div>
        <div className="row g-4 align-items-center">
          <div className="col-xxl-4">
            <div className="faq-image-style-3 image-pllx fix">
              <img src={faq.image} alt="img" />
            </div>
          </div>
          <div className="col-xxl-8">
            <div className="faq-items-wrap">
              <div className="row g-5">
                <div className="col-xl-5 col-lg-6">
                  <div className="faq-content-style-3">
                    <div className="sec-title mb-0">
                      <h6 className="text-white sub-title wow fadeInUp">
                        <span className="triangle triangle1"></span>
                        <span className="triangle triangle2"></span>
                        {faq.subtitle}
                      </h6>
                      <h2 className="text-white wow fadeInUp" data-wow-delay=".2s">{faq.title}</h2>
                    </div>
                    <p className="faq-text wow fadeInUp" data-wow-delay=".4s">{faq.text}</p>
                    <Link href={faq.cta.link} className="theme-btn btn-style-one wow fadeInUp animated" data-wow-delay=".6s">
                      {faq.cta.text}
                      <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-6">
                  <div className="faq-accordion-style-3">
                    <div className="accordion" id="accordionExample2">
                      {faq.items.map((item, idx) => (
                        <div key={idx} className="accordion-item wow fadeInUp" data-wow-delay={`${idx * 2}00ms`}>
                          <h2 className="accordion-header">
                            <button className={`accordion-button ${idx === 1 ? '' : 'collapsed'}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseFaq${idx}`} aria-expanded={idx === 1 ? 'true' : 'false'} aria-controls={`collapseFaq${idx}`}>
                              {item.question}
                            </button>
                          </h2>
                          <div id={`collapseFaq${idx}`} className={`accordion-collapse collapse ${idx === 1 ? 'show' : ''}`} data-bs-parent="#accordionExample2">
                            <div className="accordion-body">
                              <p className="text">{item.answer}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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
