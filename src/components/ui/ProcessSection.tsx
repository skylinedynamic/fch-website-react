export default function ProcessSection({ data }) {
  const { process } = data;
  return (
    <section className="how-it-works-featured fix">
      <div className="process-container">
        <div className="row g-4">
          {process.map((step, i) => (
            <div
              key={i}
              className={`col-lg-4 col-md-6 wow fadeInUp`}
              data-wow-delay={`${0.3 + i * 0.2}s`}
            >
              <div className="process-card text-center">
                <div className="process-number">{step.number}</div>
                <div className="process-icon">
                  <i className={step.icon}></i>
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
