'use client';

import { useState, useRef, useEffect } from 'react';

export default function CreditBuilderFaq({ data }) {
    const faqs = data.items;
    const [activeIndex, setActiveIndex] = useState(0); // Default first item open

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (
        <section 
            className="faq-section fix section-padding section-bg bg-cover" 
            style={{ 
                backgroundImage: "url('/images/home-3/world-map.png')", 
                backgroundSize: 'contain', 
                backgroundPosition: 'bottom center' 
            }}
        >
            <div className="auto-container">
                <div className="row g-4 justify-content-center align-items-center">
                    <div className="col-xl-12 col-lg-12">
                        <div className="faq-left-items-1">
                            <div className="sec-title mb-4 text-center">
                                <h6 className="sub-title wow fadeInUp animated justify-content-center">
                                    <span className="triangle triangle1"></span>
                                    <span className="triangle triangle2"></span>
                                    {data.subtitle || "FAQ'S"}
                                </h6>
                                <h2 className="wow fadeInUp animated" data-wow-delay=".2s">{data.title || "Frequently Asked Questions"}</h2>
                                <p>{data.text}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-10 col-lg-10">
                        <div className="faq-content-1">
                            <ul className="accordion-box">
                                {faqs.map((faq, i) => {
                                    const isActive = activeIndex === i;
                                    return (
                                        <li
                                            key={i}
                                            className={`accordion block wow fadeInUp animated ${isActive ? 'active-block' : ''}`}
                                            data-wow-delay={`${i * 2}00ms`}
                                        >
                                            <div
                                                className={`acc-btn ${isActive ? 'active' : ''}`}
                                                onClick={() => toggleAccordion(i)}
                                                style={{ cursor: 'pointer' }}
                                            >
                                                {faq.question}
                                                <div className="icon fa fa-plus"></div>
                                            </div>
                                            <AccordionContent isActive={isActive}>
                                                <div className="content">
                                                    <div className="text">{faq.answer}</div>
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
    }, [isActive, children]);

    return (
        <div
            ref={contentRef}
            className={`acc-content ${isActive ? 'current' : ''}`}
            style={{
                height: height,
                overflow: 'hidden',
                transition: 'height 0.3s ease, margin-top 0.3s ease',
                display: 'block',
                marginTop: isActive ? '10px' : '0px',
            }}
        >
            {children}
        </div>
    );
}
