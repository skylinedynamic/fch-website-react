'use client';

import { useState, useRef, useEffect } from 'react';

export default function FaqList({ categories, items }) {
  const [activeCategory, setActiveCategory] = useState('business-funding');
  const [activeIndex, setActiveIndex] = useState(0); // 0 by default to match HTML initial state

  // Filter items based on active category
  const filteredItems = items.filter(item => {
    if (activeCategory === 'all') return true;
    return item.categories.includes(activeCategory);
  });

  // Handle category change
  const handleCategoryChange = (e, catId) => {
    e.preventDefault(); // Extra safety to prevent any form submission/reload
    setActiveCategory(catId);
  };

  // When category changes, match HTML behavior by closing all items
  useEffect(() => {
    setTimeout(() => setActiveIndex(-1), 0);

    // Re-sync WOW animations for newly visible items
    if (typeof window !== 'undefined' && window.WOW) {
      new window.WOW().init();
    }
  }, [activeCategory]);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <>
      <div className="faq-tabs wow fadeInUp animated" data-wow-delay=".3s">
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button" // Explicitly set to button to prevent form submission
            className={`faq-tab ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={(e) => handleCategoryChange(e, cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="col-xl-10 col-lg-11">
        <div className="faq-content-1">
          {/* Renamed filter-list to avoid MixItUp collision from script.js */}
          <ul className="faq-accordion-container faq-filter-list">
            {filteredItems.map((item, idx) => {
              const isActive = activeIndex === idx;
              return (
                <li
                  key={`${activeCategory}-${idx}`}
                  className={`accordion block wow fadeInUp animated ${isActive ? 'active-block' : ''}`}
                  data-wow-delay=".2s"
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
    </>
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
