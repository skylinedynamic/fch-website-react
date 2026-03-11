'use client';

import { useState, useRef, useEffect } from 'react';

export default function FaqSection({ data }) {
    const [activeCategory, setActiveCategory] = useState('business-funding');
    const [activeIndex, setActiveIndex] = useState(0); // First item open by default

    // Filter items based on active category
    const filteredItems = data.items.filter(item => {
        if (activeCategory === 'all') return true;
        return item.categories.includes(activeCategory);
    });

    // Handle category change without interfering with global logic
    const handleCategoryChange = (e, catId) => {
        // Prevent any default behaviors and stop propagation
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setActiveCategory(catId);
        setActiveIndex(-1); // Close all on category change
    };

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (
        <section className="faq-section fix section-padding section-bg bg-cover"
            style={{
                backgroundImage: "url('/images/home-3/world-map.png')",
                backgroundSize: 'contain',
                backgroundPosition: 'top center'
            }}>
            <div className="auto-container">
                <div className="row g-4 justify-content-center align-items-center">

                    <div className="faq-tabs wow fadeInUp animated" data-wow-delay=".3s">
                        {data.categories.map(cat => (
                            <button
                                key={cat.id}
                                type="button"
                                className={`faq-tab ${activeCategory === cat.id ? 'active' : ''}`}
                                onClick={(e) => handleCategoryChange(e, cat.id)}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>

                    <div className="col-xl-10 col-lg-11">
                        <div className="faq-content-1">
                            {/* Use custom id and class to block global jQuery/script.js interference */}
                            <ul className="faq-custom-accordion-wrapper" id="faq-dynamic-list">
                                {filteredItems.map((item, idx) => {
                                    const isActive = activeIndex === idx;
                                    return (
                                        <li
                                            key={`${activeCategory}-${idx}`}
                                            className={`accordion block faq-reveal-item ${isActive ? 'active-block' : ''}`}
                                        >
                                            <div
                                                className={`faq-acc-btn ${isActive ? 'active' : ''}`}
                                                onClick={() => toggleAccordion(idx)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {item.question}
                                                <div className="icon fa fa-plus"></div>
                                            </div>
                                            <AccordionContent isActive={isActive}>
                                                <div className="content">
                                                    <div className="text">{item.answer}</div>
                                                </div>
                                            </AccordionContent>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
        .faq-reveal-item {
          animation: faqFadeScale 0.4s ease forwards;
          opacity: 0;
          transform: translateY(10px);
        }
        @keyframes faqFadeScale {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
        </section>
    );
}

function AccordionContent({ isActive, children }) {
    const contentRef = useRef(null);
    const [height, setHeight] = useState('0px');

    useEffect(() => {
        if (contentRef.current) {
            setHeight(isActive ? `${contentRef.current.scrollHeight}px` : '0px');
        }
    }, [isActive]);

    return (
        <div
            ref={contentRef}
            className={`faq-acc-content ${isActive ? 'current' : ''}`}
            style={{
                height: height,
                overflow: 'hidden',
                transition: 'height 0.3s ease, margin-top 0.3s ease',
                display: 'block',
                marginTop: isActive ? '20px' : '0px',
                paddingRight: '20px'
            }}
        >
            {children}
        </div>
    );
}
