export default function GrowthSection({ data }) {
  const { growthFeatures } = data;
  return (
    <section className="feature-growth-section fix section-padding">
      <div className="auto-container">
        <div className="sec-title">
          <div className="row g-4 justify-content-between align-items-center">
            <div className="col-xl-12 col-lg-12 text-center">
              <h6 className="sub-title wow fadeInUp">
                <span className="triangle triangle1"></span>
                <span className="triangle triangle2"></span>
                {growthFeatures.subtitle}
              </h6>
              <h2 className="wow fadeInUp" data-wow-delay=".2s">{growthFeatures.title}</h2>
            </div>
          </div>
        </div>
        <div className="row g-4">
          {growthFeatures.items.map((item, idx) => (
            <div key={idx} className="col-xl-4 col-lg-4 col-md-6 wow bounceInUp" data-wow-delay={`${idx * 100}ms`} data-wow-duration="1500ms">
              <div className={`feature-growth-box-items mb-4 ${idx === 1 || idx === 4 ? 'style-top' : ''}`}>
                <div className="icon">
                  <i className={item.icon}></i>
                </div>
                <div className="content">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
