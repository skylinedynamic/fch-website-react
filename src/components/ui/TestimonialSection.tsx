'use client';

import { useEffect } from 'react';

export default function TestimonialSection({ data }) {
  const { testimonials } = data;

  useEffect(() => {
    if (window.Swiper) {
      new window.Swiper('.testimonial-slider-3', {
        slidesPerView: 1,
        navigation: {
          nextEl: '.array-next',
          prevEl: '.array-prev',
        },
      });
    }
  }, []);

  return (
    <section className="testimonial-section-3 fix section-padding" style={{ backgroundColor: '#103C3B' }}>
      <div className="auto-container">
        <div className="swiper testimonial-slider-3">
          <div className="swiper-wrapper">
            {testimonials.map((t, idx) => (
              <div key={idx} className="swiper-slide">
                <div className="testimonial-wrapper-3">
                  <div className="mask-shape-style-3">
                    <img src="/images/home-3/testimonial/mask-shape.png" alt="Decorative mask shape for testimonial image frame" loading="lazy" decoding="async" />
                  </div>
                  <div className="image-box-style-3">
                    <div className="quate">
                      <i className="flaticon-finance-Quote"></i>
                    </div>
                    <div className="image">
                      <img src={t.image} alt={`Client testimonial from ${t.name}`} loading="lazy" decoding="async" />
                      <div className="planet-shape">
                        <img src="/images/home-3/testimonial/planet.png" alt="Planetary decorative shape accompanying client photo" loading="lazy" decoding="async" />
                      </div>
                    </div>
                    <div className="star">
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                      <i className="fa-solid fa-star"></i>
                    </div>
                  </div>
                  <div className="content-box-style-3">
                    <h3 className="text" style={{ color: '#fff' }}>&quot;{t.text}&quot;</h3>
                    <h3 className="title" style={{ color: '#fff' }}>
                      {t.name} {t.company && `/ `}
                      {t.company && <span style={{ color: '#dfdfdf' }}>{t.company}</span>}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="array-button justify-content-end">
            <button className="array-prev"><i className="fa-solid fa-arrow-left"></i></button>
            <button className="array-next"><i className="fa-solid fa-arrow-right"></i></button>
          </div>
        </div>
      </div>
    </section>
  );
}
