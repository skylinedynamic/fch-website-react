'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function BusinessFundingSection({ data }) {
  const { businessFunding } = data;

  useEffect(() => {
    if (window.Swiper) {
      new window.Swiper('.project-slider-2', {
        slidesPerView: 1,
        spaceBetween: 30,
        pagination: {
          el: '.dot',
          clickable: true,
        },
        breakpoints: {
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
          1600: { slidesPerView: 4 },
        }
      });
    }
  }, []);

  return (
    <section className="project-section-2 fix section-padding pt-0 mt-100">
      <div className="auto-container">
        <div className="sec-title text-center">
          <h6 className="sub-title wow fadeInUp animated" style={{ visibility: 'visible' }}>
            <span className="triangle triangle1"></span>
            <span className="triangle triangle2"></span>
            {businessFunding.subtitle}
          </h6>
          <h2 className="wow fadeInUp animated" data-wow-delay=".3s" dangerouslySetInnerHTML={{ __html: businessFunding.title }} />
        </div>
      </div>
      <div className="project-wrapper-2">
        <div className="swiper project-slider-2">
          <div className="swiper-wrapper">
            {businessFunding.slides.map((slide, idx) => (
              <div key={idx} className="swiper-slide">
                <div className="project-box-items-2">
                  <div className="project-image">
                    <img src={slide.image} alt="img" />
                    <img src={slide.image} alt="img" />
                    <div className="shape-1">
                      <img src="/images/home-2/project/shape-1.png" alt="img" />
                    </div>
                    <div className="project-content">
                      <h3>
                        {slide.link ? (
                          <Link href={slide.link}>{slide.title}</Link>
                        ) : (
                          <a href="#">{slide.title}</a>
                        )}
                      </h3>
                      <p>{slide.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-dot mt-5 mb-0">
            <div className="dot"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
