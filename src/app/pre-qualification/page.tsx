"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { preQualificationSteps } from '@/data/preQualification';
import SearchableSelect from '@/components/ui/SearchableSelect';
import { locationsService, prequalificationService } from '@/services';
import { countryCodeToKey } from '@/data/locations';

import PersonalInformation from './PersonalInformation';
import BusinessDetails from './BusinessDetails';
import FundingRequirements from './FundingRequirements';

const PreQualificationPage = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<Record<string, any>>({ country_code: '+1', has_debt: 'no' });
    const [errors, setErrors] = useState<Record<string, boolean>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [locationData, setLocationData] = useState<any | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [isCountryOpen, setIsCountryOpen] = useState(false);

    const totalSteps = 3;

    useEffect(() => {
        locationsService.fetchLocations()
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

    const countryVal = formData['country_code'] || '+1';
    const selectedCountryKey = countryCodeToKey[countryVal] || 'USA';

    const fetchedStates = locationsService.getStateNames(locationData, selectedCountryKey);
    const stateOptions = locationData
        ? ['Select State', ...fetchedStates]
        : ['Loading States...'];

    const [showErrors, setShowErrors] = useState(false);

    useEffect(() => {
        setErrors({});
        setShowErrors(false);
    }, [currentStep]);

    const formatPhoneNumber = (value: string) => {
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
        setErrors(prev => {
            const n = { ...prev };
            delete n[name];
            return n;
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === 'phone') {
            newValue = formatPhoneNumber(value);
        }

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
            }
        });

        setErrors(newErrors);

        if (!isValid) {
            setShowErrors(true);
            const firstError = Object.keys(newErrors)[0];
            const element = document.getElementsByName(firstError)[0];
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        return isValid;
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (validateStep(currentStep)) {
            setCurrentStep(prev => prev + 1);
            window.scrollTo({ top: 400, behavior: 'smooth' });
        }
    };

    const handlePrev = () => {
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

                await prequalificationService.submitPrequalification(payload);
                setSubmitSuccess(true);
                setFormData({ country_code: '+1', has_debt: 'no' });
                setCurrentStep(1);
                window.scrollTo({ top: 400, behavior: 'smooth' });
                setTimeout(() => { setSubmitSuccess(false); }, 5000);
            } catch (err: any) {
                console.error('Submission failed:', err);
                setSubmitError(err.message || 'We encountered an error processing your request.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const progressPercent = ((currentStep - 1) / (totalSteps - 1)) * 100;

    const handleStartAssessment = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const element = document.getElementById('prequal-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <section className="hero-section hero-3" style={{ backgroundImage: "url('/images/home-3/hero/hero-bg.png')" }}>
                <div className="row g-4 align-items-center">
                    <div className="col-xl-7 col-lg-6">
                        <div className="hero-content">
                            <ul className="page-breadcrumb wow fadeInUp animated pb-2" data-wow-delay=".3s">
                                <li><Link href="/">Home</Link></li>
                                <li>pre-qualification</li>
                            </ul>
                            <h1 className="wow fadeInUp credit-builder-h1" data-wow-delay=".2s">
                                Find Out What Funding Your Business May Qualify For
                            </h1>
                            <div className="text-item wow fadeInUp animated" data-wow-delay=".4s">
                                <p style={{ maxWidth: '781px' }}>
                                    Complete our Funding Readiness Assessment to identify approval gaps, funding opportunities, business credit opportunities, and next-step recommendations.
                                </p>
                            </div>
                            <div className="trust-bar wow fadeInUp animated" data-wow-delay=".5s">
                                <div className="trust-item">
                                    <span className="trust-item-icon">✅</span>
                                    <span>No Credit Impact</span>
                                </div>
                                <div className="trust-item">
                                    <span className="trust-item-icon">✅</span>
                                    <span>Takes Less Than 3 Minutes</span>
                                </div>
                                <div className="trust-item">
                                    <span className="trust-item-icon">✅</span>
                                    <span>Funding Readiness Review</span>
                                </div>
                                <div className="trust-item">
                                    <span className="trust-item-icon">✅</span>
                                    <span>Funding & Business Credit Opportunities</span>
                                </div>
                            </div>
                            <div className="hero-button wow fadeInUp animated" data-wow-delay=".6s">
                                <a href="#prequal-section" onClick={handleStartAssessment} className="theme-btn btn-style-one">
                                    Start My Assessment
                                    <span className="icon"><i className="flaticon-finance-arrow-right-svgrepo-com1-2"></i></span>
                                </a>
                                <p className="sub-btn-text">
                                    Join business owners who want to understand their funding readiness before applying.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="sba-article-section pre-padding" id="prequal-section">
                <div className="auto-container">
                    <div className="discover-section wow fadeInUp" data-wow-delay=".2s">
                        <h2 className="discover-title">What You'll Discover</h2>
                        <div className="discover-grid">
                            <div className="discover-card">
                                <div className="discover-card-icon">
                                    <i className="fas fa-check"></i>
                                </div>
                                <span className="discover-card-text">Potential Funding Opportunities</span>
                            </div>
                            <div className="discover-card">
                                <div className="discover-card-icon">
                                    <i className="fas fa-check"></i>
                                </div>
                                <span className="discover-card-text">Business Credit Opportunities</span>
                            </div>
                            <div className="discover-card">
                                <div className="discover-card-icon">
                                    <i className="fas fa-check"></i>
                                </div>
                                <span className="discover-card-text">Approval Risks & Red Flags</span>
                            </div>
                            <div className="discover-card">
                                <div className="discover-card-icon">
                                    <i className="fas fa-check"></i>
                                </div>
                                <span className="discover-card-text">Funding Readiness Gaps </span>
                            </div>
                            <div className="discover-card">
                                <div className="discover-card-icon">
                                    <i className="fas fa-check"></i>
                                </div>
                                <span className="discover-card-text">Next-Step Recommendations</span>
                            </div>
                        </div>
                    </div>

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

                        <form onSubmit={currentStep === totalSteps ? handleSubmit : handleNext} className="prequal-form" noValidate>
                            {currentStep === 1 && (
                                <PersonalInformation
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    handleSelectChange={handleSelectChange}
                                    showErrors={showErrors}
                                    errors={errors}
                                    isCountryOpen={isCountryOpen}
                                    setIsCountryOpen={setIsCountryOpen}
                                    selectedCountryKey={selectedCountryKey}
                                    stateOptions={stateOptions}
                                />
                            )}
                            {currentStep === 2 && (
                                <BusinessDetails
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    handleSelectChange={handleSelectChange}
                                    showErrors={showErrors}
                                    errors={errors}
                                />
                            )}
                            {currentStep === 3 && (
                                <FundingRequirements
                                    formData={formData}
                                    handleInputChange={handleInputChange}
                                    handleSelectChange={handleSelectChange}
                                    showErrors={showErrors}
                                    errors={errors}
                                />
                            )}

                            <div className="form-navigation">
                                {currentStep > 1 && (
                                    <button type="button" className="btn-prev" onClick={handlePrev}>
                                        Previous
                                    </button>
                                )}
                                <div style={{ flex: 1 }}></div>
                                {currentStep < totalSteps ? (
                                    <button type="submit" className="btn-next">
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

                    <div className="next-steps-section wow fadeInUp" data-wow-delay=".2s">
                        <h2 className="next-steps-title">What Happens Next?</h2>
                        <div className="next-steps-grid">
                            <div className="next-step-card">
                                <div className="next-step-number">1</div>
                                <h3 className="next-step-heading">Complete Your Assessment</h3>
                                <p className="next-step-desc">
                                    Answer a few questions about your business and funding goals.
                                </p>
                            </div>
                            <div className="next-step-card">
                                <div className="next-step-number">2</div>
                                <h3 className="next-step-heading">Funding Readiness Review</h3>
                                <p className="next-step-desc">
                                    We evaluate key factors lenders commonly review.
                                </p>
                            </div>
                            <div className="next-step-card">
                                <div className="next-step-number">3</div>
                                <h3 className="next-step-heading">Identify Opportunities & Gaps</h3>
                                <p className="next-step-desc">
                                    Discover potential strengths, weaknesses, and areas for improvement.
                                </p>
                            </div>
                            <div className="next-step-card">
                                <div className="next-step-number">4</div>
                                <h3 className="next-step-heading">Explore Next Steps</h3>
                                <p className="next-step-desc">
                                    Receive guidance on business credit, funding readiness, and capital access opportunities.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default PreQualificationPage;
