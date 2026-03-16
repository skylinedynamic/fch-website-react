'use client';

import { useState, useRef, useEffect } from 'react';

export default function FundingFaq({ faqs }) {
    const defaultActive = faqs.findIndex(faq => faq.active);
    const [activeIndex, setActiveIndex] = useState(defaultActive !== -1 ? defaultActive : -1);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    };

    return (
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
