"use client";
import React, { useState } from 'react';
import { leadErrorMessage, leadsService } from '@/services';
import { useRecaptchaToken } from '@/hooks/useRecaptchaToken';
import EmailObfuscator from '@/components/common/EmailObfuscator';

export default function ContactSection({ data }: any) {
  const { contact } = data;
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const getRecaptchaToken = useRecaptchaToken();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      // A token only when reCAPTCHA is set up in Site Settings; the API
      // requires one as soon as a secret is saved there.
      const token = await getRecaptchaToken();

      await leadsService.submitLead({
        contact_person: formData.name,
        email: formData.email,
        phone_number: phone || undefined,
        company_name: formData.company || undefined,
        requirements_details: formData.message || undefined,
        ...(token ? { recaptcha_token: token } : {}),
      });

      setSuccessMessage('Thank you! Your message has been sent successfully.');
      setFormData({
        name: '',
        email: '',
        company: '',
        message: ''
      });
      setPhone('');
    } catch (err: unknown) {
      setErrorMessage(leadErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
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
                  <h3 className="title wow fadeInUp" data-wow-delay=".3s">
                    let&apos;s work together
                  </h3>
                </div>
                <p className="contact-text wow fadeInUp" data-wow-delay=".5s">
                  We help startups, growing businesses, and partners nationwide — reach out today to get started.
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
                      <h3><EmailObfuscator email={contact.info.email} showIcon={false} /></h3>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="contact-box-style-3">
                <h3 className="wow fadeInUp" data-wow-delay=".2s">Need Help with Your Project?</h3>
                <p className="wow fadeInUp" data-wow-delay=".4s">We are ready to help your next projects, let&apos;s work together</p>

                <form className="custom-contact-form" onSubmit={handleSubmit}>
                  <div className="row g-4 text-start mt-4">
                    <div className="col-12 wow fadeInUp">
                      <div className="contact-input-group">
                        <span className="contact-icon-wrap">
                          <i className="lnr-icon-user1"></i>
                        </span>
                        <input
                          type="text"
                          name="name"
                          className="contact-field"
                          placeholder="Your Name*"
                          value={formData.name}
                          onChange={handleChange}
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
                          name="company"
                          className="contact-field"
                          placeholder="Company Name"
                          value={formData.company}
                          onChange={handleChange}
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
                          name="email"
                          className="contact-field"
                          placeholder="Email Address*"
                          value={formData.email}
                          onChange={handleChange}
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
                          name="phone"
                          className="contact-field"
                          placeholder="Phone Number (XXX) XXX-XXXX"
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
                          name="message"
                          className="contact-field contact-field--textarea"
                          placeholder="Enter Your Message here"
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-12 wow fadeInUp" data-wow-delay=".5s">
                      {successMessage && (
                        <div role="alert" className="form-alert form-alert--success">
                          {successMessage}
                        </div>
                      )}
                      {errorMessage && (
                        <div role="alert" className="form-alert form-alert--error">
                          {errorMessage}
                        </div>
                      )}
                      <div className="form-spacing"></div>
                      <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Submit Now'}
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
        <img className="wow bounceInRight" data-wow-delay="200ms" data-wow-duration="1500ms" src={contact.image} alt="Consultation meeting between a financial specialist and a client" />
      </div>
    </section>
  );
}
