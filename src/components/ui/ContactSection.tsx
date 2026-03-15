"use client";
import React, { useState } from 'react';

export default function ContactSection({ data }: any) {
  const { contact } = data;
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('USA (+1)');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, '').substring(0, 10);
    let formattedNumber = '';
    if (input.length > 6) {
      formattedNumber = `(${input.slice(0, 3)}) ${input.slice(3, 6)}-${input.slice(6)}`;
    } else if (input.length > 3) {
      formattedNumber = `(${input.slice(0, 3)}) ${input.slice(3)}`;
    } else if (input.length > 0) {
      formattedNumber = `(${input}`;
    }
    setPhone(formattedNumber);
  };

  return (
    <section className="contact-section-3 fix section-padding">
      <div className="auto-container">
        <div className="contact-wrapper-3">
          <div className="row g-4 justify-content-between align-items-center">
            <div className="col-xl-5 col-lg-6">
              <div className="contact-content-style-3">
                <div className="sec-title mb-0">
                  <h6 className="sub-title wow fadeInUp">
                    <span className="triangle triangle1"></span>
                    <span className="triangle triangle2"></span>
                    {contact.subtitle}
                  </h6>
                  <h2 className="wow fadeInUp" data-wow-delay=".3s">
                    let's work together
                  </h2>
                </div>
                <p className="contact-text wow fadeInUp" data-wow-delay=".5s">
                  We denounce with righteous indignation and like men
                  beguiled and demoralized by the charms
                </p>
                <ul className="contact-list wow fadeInUp" data-wow-delay=".7s">
                  <li>
                    <div className="icon">
                      <i className="lnr-icon-phone-handset"></i>
                    </div>
                    <div className="content">
                      <span>Call For Inquiry</span>
                      <h3><a href={`tel:${contact.info.phone}`}>{contact.info.phone}</a></h3>
                    </div>
                  </li>
                  <li>
                    <div className="icon">
                      <i className="lnr-icon-envelope"></i>
                    </div>
                    <div className="content">
                      <span>Send Us Email</span>
                      <h3><a href={`mailto:${contact.info.email}`}>{contact.info.email}</a></h3>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="contact-box-style-3">
                <h3 className="wow fadeInUp" data-wow-delay=".2s">Need Help For Project!</h3>
                <p className="wow fadeInUp" data-wow-delay=".4s">We are ready to help your next projects, let’s work together</p>
                <form action="#0" className="custom-contact-form" style={{ marginTop: '0' }}>
                  <div className="row g-4 text-start mt-4">
                    <div className="col-12 wow fadeInUp">
                      <div className="d-flex align-items-center pb-3" style={{ borderBottom: '1px solid #e0e0e0' }}>
                        <span className="me-3" style={{ fontSize: '20px', color: '#888' }}>
                          <i className="lnr-icon-user1"></i>
                        </span>
                        <input
                          type="text"
                          className="w-100 shadow-none bg-transparent border-0 px-0 m-0"
                          style={{
                            color: '#777',
                            outline: 'none',
                            fontSize: '16px'
                          }}
                          placeholder="Your Name*"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 wow fadeInUp" data-wow-delay=".1s">
                      <div className="d-flex align-items-center pb-3" style={{ borderBottom: '1px solid #e0e0e0' }}>
                        <span className="me-3" style={{ fontSize: '20px', color: '#888' }}>
                          <i className="lnr-icon-apartment"></i>
                        </span>
                        <input
                          type="text"
                          className="w-100 shadow-none bg-transparent border-0 px-0 m-0"
                          style={{
                            color: '#777',
                            outline: 'none',
                            fontSize: '16px'
                          }}
                          placeholder="Company Name"
                        />
                      </div>
                    </div>
                    <div className="col-12 wow fadeInUp" data-wow-delay=".2s">
                      <div className="d-flex align-items-center pb-3" style={{ borderBottom: '1px solid #e0e0e0' }}>
                        <span className="me-3" style={{ fontSize: '20px', color: '#888' }}>
                          <i className="lnr-icon-envelope1"></i>
                        </span>
                        <input
                          type="email"
                          className="w-100 shadow-none bg-transparent border-0 px-0 m-0"
                          style={{
                            color: '#777',
                            outline: 'none',
                            fontSize: '16px'
                          }}
                          placeholder="Email Address*"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 wow fadeInUp" data-wow-delay=".3s" style={{ position: 'relative', zIndex: 99 }}>
                      <div className="d-flex align-items-center pb-3" style={{ borderBottom: '1px solid #e0e0e0' }}>
                        <span className="me-3" style={{ fontSize: '20px', color: '#888' }}>
                          <i className="lnr-icon-phone-handset"></i>
                        </span>

                        {/* Dropdown Button */}
                        <div
                          className="d-flex align-items-center pe-3"
                          style={{ cursor: 'pointer' }}
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                          <span style={{ fontSize: '15px', color: '#777' }}>{countryCode === 'USA (+1)' ? '+1' : '+1'}</span>
                          <i className={`lnr-icon-chevron-${isDropdownOpen ? 'up' : 'down'}`} style={{ fontSize: '12px', marginLeft: '5px', color: '#777' }}></i>
                        </div>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                          <div
                            className="position-absolute bg-white shadow-sm"
                            style={{
                              top: '32px',
                              left: '35px',
                              width: '125px',
                              borderRadius: '8px',
                              zIndex: 10,
                              border: '1px solid #e0e5e5',
                              overflow: 'hidden'
                            }}
                          >
                            <div
                              className="px-3 py-3"
                              style={{ cursor: 'pointer', fontSize: '14px', color: countryCode === 'USA (+1)' ? '#103e3d' : '#888', backgroundColor: countryCode === 'USA (+1)' ? '#f8f9fa' : 'transparent', borderBottom: '1px solid #f0f0f0' }}
                              onClick={() => { setCountryCode('USA (+1)'); setIsDropdownOpen(false); }}
                            >
                              USA (+1)
                            </div>
                            <div
                              className="px-3 py-3"
                              style={{ cursor: 'pointer', fontSize: '14px', color: countryCode === 'CAN (+1)' ? '#103e3d' : '#888', backgroundColor: countryCode === 'CAN (+1)' ? '#f8f9fa' : 'transparent' }}
                              onClick={() => { setCountryCode('CAN (+1)'); setIsDropdownOpen(false); }}
                            >
                              CAN (+1)
                            </div>
                          </div>
                        )}

                        <input
                          type="tel"
                          className="w-100 shadow-none bg-transparent border-0 px-0 m-0"
                          style={{
                            color: '#777',
                            outline: 'none',
                            fontSize: '16px'
                          }}
                          placeholder="Phone Number (XXX) XXX-XXXX*"
                          required
                          value={phone}
                          onChange={handlePhoneChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 wow fadeInUp" data-wow-delay=".4s">
                      <div className="d-flex align-items-start pb-3" style={{ borderBottom: '1px solid #e0e0e0' }}>
                        <span className="me-3 mt-1" style={{ fontSize: '20px', color: '#888' }}>
                          <i className="lnr-icon-pencil"></i>
                        </span>
                        <textarea
                          className="w-100 shadow-none bg-transparent border-0 px-0 m-0"
                          style={{
                            color: '#777',
                            outline: 'none',
                            resize: 'none',
                            height: '100px',
                            fontSize: '16px'
                          }}
                          placeholder="Enter Your Messege here"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12 wow fadeInUp" data-wow-delay=".5s">
                      <div style={{ paddingBottom: '30px' }}></div>
                      <button type="submit" className="border-0 rounded-1" style={{ backgroundColor: '#103e3d', color: '#ffffff', padding: '15px 35px', fontWeight: 'bold', fontSize: '16px' }}>
                        Submit Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-image">
        <img className="wow bounceInRight" data-wow-delay="200ms" data-wow-duration="1500ms" src={contact.image} alt="Image" />
      </div>
    </section>
  );
}
