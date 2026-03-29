"use client";

import React from 'react';
import SearchableSelect from '@/components/ui/SearchableSelect';

interface BusinessDetailsProps {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSelectChange: (name: string, value: string) => void;
    showErrors: boolean;
    errors: Record<string, boolean>;
}

const BusinessDetails: React.FC<BusinessDetailsProps> = ({
    formData,
    handleInputChange,
    handleSelectChange,
    showErrors,
    errors
}) => {
    return (
        <div className="prequal-step active wow fadeInUp animated">
            <h3 className="prequal-step-title">
                <i className="fas fa-briefcase"></i> Business Details
            </h3>
            <div className="row g-4">
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.business_name) ? '#ef4444' : 'inherit' }}>
                        Business Name <span style={{ color: (showErrors && errors.business_name) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
                    <input
                        type="text"
                        name="business_name"
                        className={`prequal-input ${showErrors && errors.business_name ? 'prequal-error' : ''}`}
                        placeholder="Legal Entity Name"
                        value={formData.business_name || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.industry) ? '#ef4444' : 'inherit' }}>
                        Industry Type <span style={{ color: (showErrors && errors.industry) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
                    <SearchableSelect
                        name="industry"
                        options={["Select Industry", "Accounting & Financial Services", "Automotive Services & Dealerships", "Beauty, Salon & Spa Services", "Cannabis / CBD Industry", "Childcare & Daycare", "Cleaning & Janitorial Services", "Construction & Contracting", "E-Commerce / Online Retail", "Education & Tutoring Services", "Fitness & Wellness (Gyms, Yoga, Etc.)", "Franchise Businesses", "Government Contractor / Vendor", "Healthcare & Medical Practices", "Home Services (Plumbing, HVAC, Landscaping, etc.)", "Hospitality (Hotels / Lodging)", "IT & Software Development", "Legal & Professional Services", "Manufacturing & Wholesale", "Marketing, Advertising & Media", "Non-Profit Organization", "Real Estate & Property Management", "Restaurants, Bars & Catering", "Retail (Brick & Mortar)", "Transportation & Logistics", "Other"]}
                        value={formData.industry || ''}
                        onChange={handleSelectChange}
                        invalid={showErrors && !!errors.industry}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.structure) ? '#ef4444' : 'inherit' }}>
                        Business Structure <span style={{ color: (showErrors && errors.structure) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
                    <SearchableSelect
                        name="structure"
                        options={["Select Structure", "LLC", "S-Corporation", "Corporation", "Sole Proprietorship", "Partnership", "PLLC", "Public Corporation", "Other"]}
                        value={formData.structure || ''}
                        onChange={handleSelectChange}
                        invalid={showErrors && !!errors.structure}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.time_in_business) ? '#ef4444' : 'inherit' }}>
                        Time in Business <span style={{ color: (showErrors && errors.time_in_business) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
                    <SearchableSelect
                        name="time_in_business"
                        options={["Select Duration", "Under 6 months", "6-12 months", "1-2 years", "2-3 years", "3+ years"]}
                        value={formData.time_in_business || ''}
                        onChange={handleSelectChange}
                        invalid={showErrors && !!errors.time_in_business}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.monthly_revenue) ? '#ef4444' : 'inherit' }}>
                        Monthly Revenue <span style={{ color: (showErrors && errors.monthly_revenue) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
                    <input
                        type="number"
                        name="monthly_revenue"
                        className={`prequal-input ${showErrors && errors.monthly_revenue ? 'prequal-error' : ''}`}
                        placeholder="Average last 3 months"
                        value={formData.monthly_revenue || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.annual_revenue) ? '#ef4444' : 'inherit' }}>
                        Annual Revenue <span style={{ color: (showErrors && errors.annual_revenue) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
                    <input
                        type="number"
                        name="annual_revenue"
                        className={`prequal-input ${showErrors && errors.annual_revenue ? 'prequal-error' : ''}`}
                        placeholder="Last fiscal year"
                        value={formData.annual_revenue || ""}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default BusinessDetails;
