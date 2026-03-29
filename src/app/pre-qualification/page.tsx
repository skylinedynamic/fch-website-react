"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { preQualificationSteps } from '@/data/preQualificationData';
import SearchableSelect from '@/components/ui/SearchableSelect';
import { fetchLocations, getStateNames, countryCodeToKey } from '@/lib/api/locationsService';
import { submitPrequalification } from '@/lib/api/prequalificationService';

const PreQualificationPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [locationData, setLocationData] = useState<any | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [isCountryOpen, setIsCountryOpen] = useState(false);

    const totalSteps = preQualificationSteps.length;

    useEffect(() => {
        // Initialize form data with defaults
        const initialData: Record<string, any> = { country_code: '+1' };
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

        fetchLocations()
            .then(data => {
                console.log('[PrequalPage] API Loaded successfully');
                setLocationData(data);
                setFetchError(null);
            })
            .catch(err => {
                console.error('[PrequalPage] API Fetch Error:', err);
                setFetchError('API Connection failed');
            });
    }, []);

    // Close country dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (isCountryOpen) {
                const target = e.target as HTMLElement;
                if (!target.closest('.prequal-country-dropdown')) {
                    setIsCountryOpen(false);
                }
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [isCountryOpen]);

    // Derive state options based on selected country code (defaults to +1 / USA)
    const countryVal = formData['country_code'] || '+1';
    const selectedCountryKey = countryCodeToKey[countryVal] || 'USA';
    
    // Compute the list of states. If locationData is still null (loading), show a single "Loading..." option.
    const fetchedStates = getStateNames(locationData, selectedCountryKey);
    const stateOptions = locationData 
        ? ['Select State', ...fetchedStates]
        : ['Loading States...'];

    // Clear errors when step changes
    useEffect(() => {
        setErrors({});
    }, [currentStep]);

    // ADD DEBUG LOGS HERE
    useEffect(() => {
        if (locationData) {
            console.log('[PrequalPage] Current Step:', currentStep);
            console.log('[PrequalPage] Errors current state:', errors);
        }
    }, [currentStep, errors, locationData]);


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

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => { const n = { ...prev }; delete n[name]; return n; });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'phone') {
            newValue = formatPhoneNumber(value);
        }

        // When country code changes, reset state selection
        if (name === 'country_code') {
            setFormData(prev => ({ ...prev, [name]: newValue, state: '' }));
            setErrors(prev => { const n = { ...prev }; delete n['state']; return n; });
            return;
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

    const validateStep = (stepNumber: number) => {
        const step = preQualificationSteps.find(s => s.id === stepNumber);
        if (!step) return true;

        const newErrors: Record<string, boolean> = {};
        let isValid = true;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^(\(\d{3}\) \d{3}-\d{4}|\d{10})$/;

        step.fields.forEach(field => {
            const isVisible = !field.condition || formData[field.condition.field] === field.condition.value;
            if (!isVisible) return;

            const val = formData[field.name];
            const isEmpty = !val || val === "" || (typeof val === 'string' && val.startsWith('Select '));

            if (field.required && isEmpty) {
                newErrors[field.name] = true;
                isValid = false;
            } else if (!isEmpty) {
                // Type-specific validation
                if (field.type === 'email' && !emailRegex.test(val)) {
                    newErrors[field.name] = true;
                    isValid = false;
                }
                if (field.isPhone && !phoneRegex.test(val)) {
                    newErrors[field.name] = true;
                    isValid = false;
                }
                if (field.type === 'number' && (isNaN(Number(val)) || Number(val) <= 0)) {
                    newErrors[field.name] = true;
                    isValid = false;
                }
                if (field.type === 'url' && val.length > 0) {
                    try { new URL(val); } catch (_) { 
                        // Allow if it doesn't have protocol but look like domain? 
                        // Simplified check for now
                    }
                }
            }
        });

        setErrors(newErrors);
        if (!isValid) {
            // Scroll to the first error
            const firstError = Object.keys(newErrors)[0];
            const element = document.getElementsByName(firstError)[0];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        return isValid;
    };

    const handleNext = () => {
        if (validateStep(currentStep)) {
            setErrors({}); // Clear errors before moving to next step
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
        setErrors({}); // Clear errors when going back
        setCurrentStep(prev => prev - 1);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitError(null);
        setSubmitSuccess(false);

        if (validateStep(currentStep)) {
            setIsSubmitting(true);
            try {
                // Map frontend data to backend payload
                const payload = {
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    email: formData.email,
                    phone_number: formData.phone,
                    business_website: formData.website || null,
                    state_of_incorporation: formData.state,
                    business_name: formData.business_name,
                    industry_type: formData.industry,
                    business_structure: formData.structure,
                    years_in_business: formData.time_in_business,
                    monthly_revenue: Number(formData.monthly_revenue),
                    annual_revenue: Number(formData.annual_revenue),
                    funding_requested_amount: Number(formData.funding_amount),
                    funding_urgency: formData.urgency,
                    purpose_of_funding: formData.purpose,
                    personal_credit_score: formData.personal_credit,
                    estimated_business_credit_score: formData.business_credit,
                    existing_business_debt: formData.has_debt === 'yes',
                    debt_balance: formData.has_debt === 'yes' ? Number(formData.debt_balance) : 0,
                    notes: formData.note || null
                };

                await submitPrequalification(payload);
                setSubmitSuccess(true);
                
                // Clear state after successful submission
                setFormData({});
                window.scrollTo({ top: 400, behavior: 'smooth' });
                
                // Optional: Redirect after success
                setTimeout(() => {
                    window.location.href = '/';
                }, 3000);
            } catch (err: any) {
                console.error('Submission failed:', err);
                setSubmitError(err.message || 'We encountered an error processing your request. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
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

                        <form onSubmit={handleSubmit} className="prequal-form" noValidate>
                            {submitSuccess && (
                                <div className="form-alert form-alert--success mb-4">
                                    Thank you! Your pre-qualification request has been submitted successfully.
                                </div>
                            )}
                            {submitError && (
                                <div className="form-alert form-alert--error mb-4">
                                    {submitError}
                                </div>
                            )}
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
                                                        <SearchableSelect
                                                            key={(field as any).isDynamic ? `${selectedCountryKey}-${locationData ? 'loaded' : 'loading'}` : field.name}
                                                            name={field.name}
                                                            options={(field as any).isDynamic ? stateOptions : field.options as string[]}
                                                            value={formData[field.name] || ''}
                                                            onChange={handleSelectChange}
                                                            invalid={!!errors[field.name]}
                                                        />
                                                    ) : field.isPhone ? (
                                                        <div className="phone-input-group">
                                                            <div className={`prequal-country-dropdown${isCountryOpen ? ' open' : ''}`}>
                                                                <div 
                                                                    className="prequal-country-trigger"
                                                                    onClick={() => setIsCountryOpen(!isCountryOpen)}
                                                                >
                                                                    <span>{countryVal === '+1-CA' ? 'CAN (+1)' : 'USA (+1)'}</span>
                                                                    <i className={`fas fa-chevron-down ms-2 ${isCountryOpen ? 'rotate-180' : ''}`}></i>
                                                                </div>
                                                                {isCountryOpen && (
                                                                    <div className="prequal-country-list">
                                                                        <div 
                                                                            className={`prequal-country-item ${countryVal === '+1' ? 'active' : ''}`}
                                                                            onClick={() => {
                                                                                handleSelectChange('country_code', '+1');
                                                                                handleSelectChange('state', ''); // clear state
                                                                                setIsCountryOpen(false);
                                                                            }}
                                                                        >
                                                                            USA (+1)
                                                                        </div>
                                                                        <div 
                                                                            className={`prequal-country-item ${countryVal === '+1-CA' ? 'active' : ''}`}
                                                                            onClick={() => {
                                                                                handleSelectChange('country_code', '+1-CA');
                                                                                handleSelectChange('state', ''); // clear state
                                                                                setIsCountryOpen(false);
                                                                            }}
                                                                        >
                                                                            CAN (+1)
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <input
                                                                type="tel"
                                                                name={field.name}
                                                                className={`prequal-input ${errors[field.name] ? 'prequal-error' : ''}`}
                                                                placeholder={field.placeholder}
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
                                                            className={`prequal-input ${errors[field.name] ? 'prequal-error' : ''}`}
                                                            placeholder={field.placeholder}
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
