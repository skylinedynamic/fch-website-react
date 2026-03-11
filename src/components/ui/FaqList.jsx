'use client';

import { useState } from 'react';

export default function FaqList({ categories, items }) {
  const [activeCategory, setActiveCategory] = useState('business-funding');

  const filteredItems = activeCategory === 'all' 
    ? items 
    : items.filter(item => item.category === activeCategory || (activeCategory === 'platform-process' && item.category === 'business-funding')); 
    // Wait, the original logic had some overlap. Let's just do simple filtering first.

  return (
    <>
      <div className="faq-tabs wow fadeInUp animated" data-wow-delay=".3s">
        {categories.map(cat => (
          <button 
            key={cat.id} 
            className={`faq-tab ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="col-xl-10 col-lg-11">
        <div className="faq-content-1">
          <ul className="accordion-box filter-list">
            {items.map((item, idx) => {
              const isVisible = activeCategory === 'all' || item.category === activeCategory;
              return (
                <li 
                  key={idx} 
                  className={`accordion block wow fadeInUp animated ${isVisible ? '' : 'd-none'}`} 
                  data-wow-delay=".2s"
                >
                  <div className="acc-btn" onClick={(e) => {
                    const parent = e.currentTarget.parentElement;
                    const content = parent.querySelector('.acc-content');
                    const isActive = parent.classList.contains('active-block');
                    
                    // Close all
                    document.querySelectorAll('.accordion-box .accordion').forEach(el => {
                      el.classList.remove('active-block');
                      el.querySelector('.acc-content').style.display = 'none';
                      el.querySelector('.acc-btn').classList.remove('active');
                    });

                    if (!isActive) {
                      parent.classList.add('active-block');
                      content.style.display = 'block';
                      e.currentTarget.classList.add('active');
                    }
                  }}>
                    {item.question}
                    <div className="icon fa fa-plus"></div>
                  </div>
                  <div className="acc-content" style={{ display: 'none' }}>
                    <div className="content">
                      <div className="text">{item.answer}</div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
