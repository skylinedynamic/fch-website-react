'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
    const [phone, setPhone] = useState('');

    const formatPhoneNumber = (value) => {
        if (!value) return value;
        const phoneNumber = value.replace(/[^\d]/g, '');
        const phoneNumberLength = phoneNumber.length;
        if (phoneNumberLength < 4) return phoneNumber;
        if (phoneNumberLength < 7) {
            return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
        }
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };

    const handlePhoneChange = (e) => {
        const formattedValue = formatPhoneNumber(e.target.value);
        setPhone(formattedValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Form handling logic would go here
        alert('Thank you for reaching out! Your message has been sent.');
    };

    return (
        <main>
            {/* Hero Section */}
            <section className="hero-section hero-3" style={{ backgroundImage: "url('/images/home-3/hero/hero-bg.png')" }}>
                <div className="row g-4 align-items-center">
                    <div className="col-xl-7 col-lg-6">
                        <div className="hero-content">
                            <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                                <li><Link href="/">Home</Link></li>
                                <li>Contact</li>
                            </ul>
                            <h1 className="wow fadeInUp credit-builder-h1" data-wow-delay=".2s">Contact Us</h1>
                            <div className="text-item wow fadeInUp" data-wow-delay=".4s">
                                <p>
                                    Explore funding, build business credit, or become a partner, our team is here to help.
                                    Send us a message or contact us directly to get started.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Details Section */}
            <section className="contact-details fix section-padding">
                <div className="auto-container">
                    <div className="row g-5">
                        {/* Address Block */}
                        <div className="col-md-6 col-lg-4 wow fadeInLeft" data-wow-delay="0ms">
                            <div className="contact-details-block dark-card">
                                <div className="inner-box">
                                    <div className="icon">
                                        <i className="fa-solid fa-location-dot"></i>
                                    </div>
                                    <h4 className="title">Address</h4>
                                    <p className="text">3750 Gunn Highway, Suite 306 Tampa, FL. 33618</p>
                                </div>
                            </div>
                        </div>
                        {/* Phone Block */}
                        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="100ms">
                            <div className="contact-details-block">
                                <div className="inner-box">
                                    <div className="icon">
                                        <i className="fa-solid fa-phone"></i>
                                    </div>
                                    <h4 className="title">Phone Number</h4>
                                    <p className="text">
                                        <a href="tel:813-391-3333" style={{ color: 'inherit' }}>813-391-3333</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Email Block */}
                        <div className="col-md-6 col-lg-4 wow fadeInRight" data-wow-delay="200ms">
                            <div className="contact-details-block">
                                <div className="inner-box">
                                    <div className="icon">
                                        <i className="fa-solid fa-envelope"></i>
                                    </div>
                                    <h4 className="title">Mailing Address</h4>
                                    <p className="text">
                                        <a href="mailto:Info@fourcornerfunding.com" style={{ color: 'inherit' }}>Info@fourcornerfunding.com</a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-100">
                        <div className="row g-5 pt-3">
                            <div className="col-lg-6 content-column">
                                <div className="inner-column wow fadeInLeft" data-wow-delay="0ms">
                                    <div className="sec-title mb-40">
                                        <h2 className="title">Get in touch</h2>
                                        <p className="text">
                                            We help startups, growing businesses, and partners nationwide —
                                            reach out today to get started.
                                        </p>
                                    </div>
                                    <div className="google-map">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2431.9026235120837!2d-82.48482817448344!3d28.034468817835467!2m3!1f275.9634941696157!2f44.31251129127868!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x88c2c1393912d155%3A0x41d1edef6ef2477b!2s3750%20Gunn%20Hwy%20suite%20306%2C%20Tampa%2C%20FL%2033618%2C%20USA!5e1!3m2!1sen!2sbd!4v1772000051944!5m2!1sen!2sbd"
                                            width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 content-column">
                                <div className="inner-column right-column wow fadeInRight" data-wow-delay="200ms">
                                    <div className="sec-title mb-40">
                                        <h2 className="title">Fill Up The Form</h2>
                                        <p className="text">Your email address will not be published. Required fields are marked *</p>
                                    </div>
                                    <form id="contact_form" onSubmit={handleSubmit}>
                                        <div className="type-feild">
                                            <i className="fa-light fa-user"></i>
                                            <input type="text" name="form_name" id="name" placeholder="Your Name*" required />
                                        </div>
                                        <div className="type-feild">
                                            <i className="fa-light fa-building"></i>
                                            <input type="text" name="form_company" id="company" placeholder="Company Name" />
                                        </div>
                                        <div className="type-feild">
                                            <i className="fa-light fa-envelope"></i>
                                            <input type="email" name="form_email" id="email" placeholder="Email Address*" required />
                                        </div>
                                        <div className="type-feild">
                                            <i className="fa-light fa-phone"></i>
                                            <input
                                                type="tel"
                                                name="form_phone"
                                                id="phone"
                                                placeholder="Phone Number (XXX) XXX-XXXX*"
                                                required
                                                value={phone}
                                                onChange={handlePhoneChange}
                                            />
                                        </div>
                                        <div className="type-feild">
                                            <i className="fa-light fa-pen-to-square"></i>
                                            <textarea name="form_message" id="message" placeholder="Enter Your Messege here" required></textarea>
                                        </div>
                                        <button type="submit" className="theme-btn btn-style-one">Submit Now</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
