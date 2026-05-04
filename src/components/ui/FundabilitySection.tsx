'use client';

import { useState } from 'react';

export default function FundabilitySection({ data }) {
  const { fundability } = data;
  const [activeScenario, setActiveScenario] = useState('established');

  return (
    <section className="why-choose-section-2 parallaxie pb-0 section-padding fix bg-cover"
      style={{
        backgroundImage: `url('${fundability.bgImage}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center'
      }}>
      <div className="circle-shape">
        <img src={fundability.shape} alt="Circular decorative background for fundability section" />
      </div>
      <div className="auto-container">
        <div className="why-choose-us-wrapper-2">
          <div className="row justify-content-between">
            <div className="col-xxl-3 col-xl-5">
              <div className="choose-us-image-2 wow fadeInUp animated" data-wow-delay=".3s">
                <img src={fundability.image} alt="Dashboard visualizing business fundability scores" />
              </div>
            </div>
            <div className="col-xxl-8 col-xl-7">
              <div className="choose-us-content-2">
                <div className="sec-title mb-0">
                  <h6 className="sub-title text-white">
                    <span className="triangle triangle1"></span>
                    <span className="triangle triangle2"></span>
                    {fundability.subtitle}
                  </h6>
                  <h2 className="text-white wow fadeInUp animated" data-wow-delay=".3s">
                    {fundability.title}
                  </h2>
                </div>

                <div className="row">
                  <div className="tab-content light">
                    <div className="tab-pane fade show active">
                      <div className="why-choose-list wow fadeInUp animated" data-wow-delay=".3s">
                        <p>{fundability.text}</p>
                      </div>
                      <div className="why-choose-list-items">
                        <ul className="why-list wow fadeInUp animated" data-wow-delay=".5s">
                          {fundability.list.map((item, index) => (
                            <li key={index}>
                              <img src="/images/home-3/list-icon.png" alt="Checkmark list icon" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Scenarios Tab Section */}
                    <div className="scenarios-tab-section mt-5 wow fadeInUp animated" data-wow-delay=".5s">
                      <h5 className="scenarios-title">{fundability.scenarios.title}</h5>
                      <div className="scenarios-tabs">
                        {fundability.scenarios.items.map((item) => (
                          <button
                            key={item.id}
                            className={`scenario-tab ${activeScenario === item.id ? 'active' : ''}`}
                            onClick={() => setActiveScenario(item.id)}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                      <div className="scenarios-content">
                        {fundability.scenarios.items.map((item) => (
                          <div
                            key={item.id}
                            className={`scenario-content ${activeScenario === item.id ? 'active' : ''}`}
                            id={`scenario-${item.id}`}
                          >
                            <p>{item.content}</p>
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
      </div>
    </section>
  );
}
