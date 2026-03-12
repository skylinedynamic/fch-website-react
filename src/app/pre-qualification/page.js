"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { preQualificationSteps } from '@/data/preQualificationData';

const PreQualificationPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const totalSteps = preQualificationSteps.length;

    useEffect(() => {
        // Initialize form data with defaults
        const initialData = {};
        preQualificationSteps.forEach(step => {
            step.fields.forEach(field => {
                if (field.type === 'radio' && field.default) {
                    initialData[field.name] = field.default;
                } else if (field.type === 'select') {
                    initialData[field.name] = "";
                } else {
                    initialData[field.name] = "";
                }
            });
        });
        setFormData(initialData);
    }, []);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        
        if (name === 'phone') {
            newValue = formatPhoneNumber(value);
        }
        
        setFormData(prev => ({ ...prev, [name]: newValue }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateStep = (stepNumber) => {
        const step = preQualificationSteps.find(s => s.id === stepNumber);
        const newErrors = {};
        let isValid = true;

        step.fields.forEach(field => {
            // Check if field is conditional and visible
            const isVisible = !field.condition || formData[field.condition.field] === field.condition.value;
            
            if (field.required && isVisible) {
                const val = formData[field.name];
                if (!val || val === "" || val === "Select State" || val === "Select Industry" || val === "Select Structure" || val === "Select Duration" || val === "Select Urgency" || val === "Select Purpose" || val === "Select Score Range" || val === "Select Score") {
                    newErrors[field.name] = true;
                    isValid = false;
                }
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        setCurrentStep(prev => prev - 1);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            setIsSubmitting(true);
            // Simulate submission
            setTimeout(() => {
                alert('Thank you! Your pre-qualification request has been submitted. Our advisors will contact you shortly.');
                window.location.href = '/';
            }, 1500);
        }
    };

    const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

    return (
        <>
            {/* Hero Section */}
            <section className="hero-section hero-3" style={{ backgroundImage: "url('/images/home-3/hero/hero-bg.png')" }}>
                <div className="row g-4 align-items-center">
                    <div className="col-xl-7 col-lg-6">
                        <div className="hero-content">
                            <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                                <li><Link href="/">Home</Link></li>
                                <li>pre-qualification</li>
                            </ul>
                            <h1 className="wow fadeInUp credit-builder-h1" data-wow-delay=".2s">Prequalify to Build Your Business Credit</h1>
                            <div className="text-item wow fadeInUp animated" data-wow-delay=".4s">
                                <p style={{ maxWidth: '781px' }}>
                                    We don't just help you get funding – we guarantee strategies to build business credit,
                                    improve fundability, and secure long-term growth.
                                    Complete your profile to get matched with pre-qualified programs – no credit impact.
                                </p>
                            </div>
                            <div className="hero-button wow fadeInUp animated" data-wow-delay=".6s">
                                <Link href="/contact" className="theme-btn btn-style-one">
                                    Contact Us
                                    <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Prequalification Form Section */}
            <section className="sba-article-section pre-padding" id="prequal-section">
                <div className="auto-container">
                    <div className="prequal-form-container wow fadeInUp" data-wow-delay=".2s">
                        <div className="prequal-progress-wrapper">
                            <div className="prequal-step-info mb-4 d-flex justify-content-between align-items-center">
                                <span className="step-count-text">Step {currentStep} of {totalSteps}</span>
                                <span className="step-completion-percent">{Math.round(progressPercent)}% Complete</span>
                            </div>

                            <div className="prequal-progress-steps">
                                <div className="prequal-progress-bar" style={{ width: `${progressPercent}%` }}></div>
                                {preQualificationSteps.map((step) => (
                                    <div 
                                        key={step.id} 
                                        className={`step-indicator ${step.id === currentStep ? 'active' : ''} ${step.id < currentStep ? 'completed' : ''}`}
                                    >
                                        <div className="step-number">
                                            {step.id < currentStep ? <span>✓</span> : <span>{step.id}</span>}
                                        </div>
                                        <div className="step-label">{step.title.split(' ')[0]}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="prequal-form">
                            {preQualificationSteps.map((step) => (
                                <div 
                                    key={step.id} 
                                    className={`prequal-step ${step.id === currentStep ? 'active' : ''}`}
                                    style={{ display: step.id === currentStep ? 'block' : 'none' }}
                                >
                                    <h3 className="prequal-step-title">
                                        <i className={step.icon}></i> {step.title}
                                    </h3>
                                    <div className="row g-4">
                                        {step.fields.map((field) => {
                                            const isVisible = !field.condition || formData[field.condition.field] === field.condition.value;
                                            if (!isVisible) return null;

                                            return (
                                                <div key={field.id} className={field.width}>
                                                    <label className="form-group-label">
                                                        {field.label} {field.required && <span>*</span>}
                                                    </label>
                                                    
                                                    {field.type === 'select' ? (
                                                        <div className="select-wrapper">
                                                            <select 
                                                                name={field.name}
                                                                className={`prequal-select ${errors[field.name] ? 'invalid' : ''}`}
                                                                required={field.required}
                                                                value={formData[field.name] || ""}
                                                                onChange={handleInputChange}
                                                            >
                                                                {field.options.map(opt => (
                                                                    <option key={opt} value={opt === field.options[0] ? "" : opt}>{opt}</option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    ) : field.isPhone ? (
                                                        <div className="phone-input-group">
                                                            <select className="country-code" name="country_code">
                                                                <option value="+1">USA (+1)</option>
                                                                <option value="+1">CAN (+1)</option>
                                                            </select>
                                                            <input 
                                                                type="tel" 
                                                                name={field.name}
                                                                className={`prequal-input ${errors[field.name] ? 'invalid' : ''}`} 
                                                                placeholder={field.placeholder} 
                                                                required={field.required}
                                                                value={formData[field.name] || ""}
                                                                onChange={handleInputChange}
                                                            />
                                                        </div>
                                                    ) : field.type === 'radio' ? (
                                                        <div className="radio-group">
                                                            {field.options.map(opt => (
                                                                <label key={opt.value} className="radio-label">
                                                                    <input 
                                                                        type="radio" 
                                                                        name={field.name} 
                                                                        value={opt.value}
                                                                        checked={formData[field.name] === opt.value}
                                                                        onChange={handleInputChange}
                                                                    /> {opt.label}
                                                                </label>
                                                            ))}
                                                        </div>
                                                    ) : field.type === 'textarea' ? (
                                                        <textarea 
                                                            name={field.name}
                                                            className={`prequal-textarea ${errors[field.name] ? 'invalid' : ''}`}
                                                            placeholder={field.placeholder}
                                                            value={formData[field.name] || ""}
                                                            onChange={handleInputChange}
                                                        ></textarea>
                                                    ) : (
                                                        <input 
                                                            type={field.type} 
                                                            name={field.name}
                                                            className={`prequal-input ${errors[field.name] ? 'invalid' : ''}`} 
                                                            placeholder={field.placeholder} 
                                                            required={field.required}
                                                            value={formData[field.name] || ""}
                                                            onChange={handleInputChange}
                                                        />
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}

                            <div className="form-navigation">
                                {currentStep > 1 && (
                                    <button type="button" className="btn-prev" onClick={handlePrev}>
                                        Previous
                                    </button>
                                )}
                                <div style={{ flex: 1 }}></div>
                                {currentStep < totalSteps ? (
                                    <button type="button" className="btn-next" onClick={handleNext}>
                                        Next Step <i className="fas fa-arrow-right"></i>
                                    </button>
                                ) : (
                                    <button type="submit" className="btn-submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'Submitting...' : 'Submit Prequalification'} <i className="fas fa-check-circle"></i>
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PreQualificationPage;
