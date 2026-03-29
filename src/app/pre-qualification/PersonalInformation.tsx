"use client";

import React from 'react';
import SearchableSelect from '@/components/ui/SearchableSelect';

interface PersonalInformationProps {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSelectChange: (name: string, value: string) => void;
    showErrors: boolean;
    errors: Record<string, boolean>;
    isCountryOpen: boolean;
    setIsCountryOpen: (open: boolean) => void;
    selectedCountryKey: string;
    stateOptions: string[];
}

const PersonalInformation: React.FC<PersonalInformationProps> = ({
    formData,
    handleInputChange,
    handleSelectChange,
    showErrors,
    errors,
    isCountryOpen,
    setIsCountryOpen,
    selectedCountryKey,
    stateOptions
}) => {
    const countryVal = formData['country_code'] || '+1';

    return (
        <div className="prequal-step active wow fadeInUp animated">
            <h3 className="prequal-step-title">
                <i className="fas fa-user-circle"></i> Personal Information
            </h3>
            <div className="row g-4">
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.first_name) ? '#ef4444' : 'inherit' }}>
                        First Name <span style={{ color: (showErrors && errors.first_name) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
                    <input
                        type="text"
                        name="first_name"
                        className={`prequal-input ${showErrors && errors.first_name ? 'prequal-error' : ''}`}
                        placeholder="Your First Name"
                        value={formData.first_name || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.last_name) ? '#ef4444' : 'inherit' }}>
                        Last Name <span style={{ color: (showErrors && errors.last_name) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
                    <input
                        type="text"
                        name="last_name"
                        className={`prequal-input ${showErrors && errors.last_name ? 'prequal-error' : ''}`}
                        placeholder="Your Last Name"
                        value={formData.last_name || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.email) ? '#ef4444' : 'inherit' }}>
                        Email Address <span style={{ color: (showErrors && errors.email) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
                    <input
                        type="email"
                        name="email"
                        className={`prequal-input ${showErrors && errors.email ? 'prequal-error' : ''}`}
                        placeholder="name@company.com"
                        value={formData.email || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.phone) ? '#ef4444' : 'inherit' }}>
                        Phone Number <span style={{ color: (showErrors && errors.phone) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
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
                                            handleSelectChange('state', ''); 
                                            setIsCountryOpen(false);
                                        }}
                                    >
                                        USA (+1)
                                    </div>
                                    <div 
                                        className={`prequal-country-item ${countryVal === '+1-CA' ? 'active' : ''}`}
                                        onClick={() => {
                                            handleSelectChange('country_code', '+1-CA');
                                            handleSelectChange('state', ''); 
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
                            name="phone"
                            className={`prequal-input ${showErrors && errors.phone ? 'prequal-error' : ''}`}
                            placeholder="(546) 456-5465"
                            value={formData.phone || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <label className="form-group-label">Business Website</label>
                    <input
                        type="url"
                        name="website"
                        className="prequal-input"
                        placeholder="https://example.com"
                        value={formData.website || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.state) ? '#ef4444' : 'inherit' }}>
                        State of Incorporation <span style={{ color: (showErrors && errors.state) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
                    <SearchableSelect
                        key={`${selectedCountryKey}-state-select`}
                        name="state"
                        options={stateOptions}
                        value={formData.state || ''}
                        onChange={handleSelectChange}
                        invalid={showErrors && !!errors.state}
                    />
                </div>
            </div>
        </div>
    );
};

export default PersonalInformation;
