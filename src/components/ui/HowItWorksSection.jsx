export default function HowItWorksSection({ data }) {
  const { howItWorks } = data;
  return (
    <section className="how-it-work-section fix section-padding">
      <div className="circle-shape">
        <img src="/images/home-3/footer-rightshape.png" alt="img" />
      </div>
      <div className="auto-container">
        <div className="sec-title text-center">
          <h6 className="sub-title wow fadeInUp animated" style={{ visibility: 'visible' }}>
            <span className="triangle triangle1"></span>
            <span className="triangle triangle2"></span>
            {howItWorks.subtitle}
          </h6>
          <h2 className="wow fadeInUp animated" data-wow-delay=".2s" dangerouslySetInnerHTML={{ __html: howItWorks.title }} />
        </div>
        <div className="how-it-work-wrapper">
          <div className="row">
            {howItWorks.steps.map((step, idx) => (
              <div key={idx} className="col-xl-3 col-lg-4 col-md-6 col-sm-6 wow fadeInUp animated" data-wow-delay={`${(idx + 1) * 2}00ms`}>
                <div className={`how-it-work-items-style-3 ${idx === howItWorks.steps.length - 1 ? 'border-none' : ''}`}>
                  <h3 className="number">{step.number}</h3>
                  <h4 className="title">{step.title}</h4>
                  <p className="text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <h5 className="how-sec-text mt-50 wow fadeInUp animated" data-wow-delay=".3s">
          {howItWorks.footerText} <a href="/contact">{howItWorks.footerLink}</a>
        </h5>
      </div>
    </section>
  );
}
