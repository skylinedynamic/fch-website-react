"use client";
import React, { useState } from 'react';

export default function ContactSection({ data }: any) {
  const { contact } = data;
  const [phone, setPhone] = useState('');

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
                <form action="#0" className="custom-contact-form">
                  <div className="row g-4 text-start mt-4">
                    <div className="col-12 wow fadeInUp">
                      <div className="contact-input-group">
                        <span className="contact-icon-wrap">
                          <i className="lnr-icon-user1"></i>
                        </span>
                        <input
                          type="text"
                          className="contact-field"
                          placeholder="Your Name*"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 wow fadeInUp" data-wow-delay=".1s">
                      <div className="contact-input-group">
                        <span className="contact-icon-wrap">
                          <i className="lnr-icon-apartment"></i>
                        </span>
                        <input
                          type="text"
                          className="contact-field"
                          placeholder="Company Name"
                        />
                      </div>
                    </div>
                    <div className="col-12 wow fadeInUp" data-wow-delay=".2s">
                      <div className="contact-input-group">
                        <span className="contact-icon-wrap">
                          <i className="lnr-icon-envelope1"></i>
                        </span>
                        <input
                          type="email"
                          className="contact-field"
                          placeholder="Email Address*"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-12 wow fadeInUp" data-wow-delay=".3s">
                      <div className="contact-input-group">
                        <span className="contact-icon-wrap">
                          <i className="lnr-icon-phone-handset"></i>
                        </span>

                        <input
                          type="tel"
                          className="contact-field"
                          placeholder="Phone Number (XXX) XXX-XXXX*"
                          required
                          value={phone}
                          onChange={handlePhoneChange}
                        />
                      </div>
                    </div>
                    <div className="col-12 wow fadeInUp" data-wow-delay=".4s">
                      <div className="contact-input-group contact-input-group--textarea">
                        <span className="contact-icon-wrap contact-icon-wrap--textarea">
                          <i className="lnr-icon-pencil"></i>
                        </span>
                        <textarea
                          className="contact-field contact-field--textarea"
                          placeholder="Enter Your Messege here"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12 wow fadeInUp" data-wow-delay=".5s">
                      <div className="form-spacing"></div>
                      <button type="submit" className="contact-submit-btn">
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
