"use client";

import React from 'react';
import SearchableSelect from '@/components/ui/SearchableSelect';

interface FundingRequirementsProps {
    formData: any;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleSelectChange: (name: string, value: string) => void;
    showErrors: boolean;
    errors: Record<string, boolean>;
}

const FundingRequirements: React.FC<FundingRequirementsProps> = ({
    formData,
    handleInputChange,
    handleSelectChange,
    showErrors,
    errors
}) => {
    return (
        <div className="prequal-step active wow fadeInUp animated">
            <h3 className="prequal-step-title">
                <i className="fas fa-hand-holding-usd"></i> Funding Requirements
            </h3>
            <div className="row g-4">
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.funding_amount) ? '#ef4444' : 'inherit' }}>
                        Funding Requested Amount <span style={{ color: (showErrors && errors.funding_amount) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
                    <input
                        type="number"
                        name="funding_amount"
                        className={`prequal-input ${showErrors && errors.funding_amount ? 'prequal-error' : ''}`}
                        placeholder="e.g. 500000"
                        value={formData.funding_amount || ""}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.urgency) ? '#ef4444' : 'inherit' }}>
                        Funding Urgency <span style={{ color: (showErrors && errors.urgency) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
                    <SearchableSelect
                        name="urgency"
                        options={["Select Urgency", "Immediate", "Within 30 days", "1-3 months", "Flexible"]}
                        value={formData.urgency || ''}
                        onChange={handleSelectChange}
                        invalid={showErrors && !!errors.urgency}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.purpose) ? '#ef4444' : 'inherit' }}>
                        Purpose of Funding <span style={{ color: (showErrors && errors.purpose) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
                    <SearchableSelect
                        name="purpose"
                        options={["Select Purpose", "Working Capital", "Equipment", "Expansion", "Real Estate", "Debt Refinance / Consolidation", "Business Acquisition", "Startup Funding", "Other"]}
                        value={formData.purpose || ''}
                        onChange={handleSelectChange}
                        invalid={showErrors && !!errors.purpose}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.personal_credit) ? '#ef4444' : 'inherit' }}>
                        Personal Credit Score <span style={{ color: (showErrors && errors.personal_credit) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
                    <SearchableSelect
                        name="personal_credit"
                        options={["Select Score Range", "Poor (<580)", "Fair (580-669)", "Good (670-739)", "Very Good (740-799)", "Excellent (800+)"]}
                        value={formData.personal_credit || ''}
                        onChange={handleSelectChange}
                        invalid={showErrors && !!errors.personal_credit}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.business_credit) ? '#ef4444' : 'inherit' }}>
                        Estimate Business Credit Score <span style={{ color: (showErrors && errors.business_credit) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
                    <SearchableSelect
                        name="business_credit"
                        options={["Select Score", "No Business Credit", "Low", "Medium", "High"]}
                        value={formData.business_credit || ''}
                        onChange={handleSelectChange}
                        invalid={showErrors && !!errors.business_credit}
                    />
                </div>
                <div className="col-md-6">
                    <label className="form-group-label" style={{ color: (showErrors && errors.has_debt) ? '#ef4444' : 'inherit' }}>
                        Existing Business Debt? <span style={{ color: (showErrors && errors.has_debt) ? '#ef4444' : '#94a3b8', marginLeft: '4px' }}>*</span>
                    </label>
                    <div className="radio-group">
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="has_debt"
                                value="yes"
                                checked={formData.has_debt === 'yes'}
                                onChange={handleInputChange}
                            /> Yes
                        </label>
                        <label className="radio-label">
                            <input
                                type="radio"
                                name="has_debt"
                                value="no"
                                checked={formData.has_debt === 'no'}
                                onChange={handleInputChange}
                            /> No
                        </label>
                    </div>
                </div>
                {formData.has_debt === 'yes' && (
                    <div className="col-md-6">
                        <label className="form-group-label">Debt Balance</label>
                        <input
                            type="number"
                            name="debt_balance"
                            className="prequal-input"
                            placeholder="Current total debt"
                            value={formData.debt_balance || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                )}
                <div className="col-12">
                    <label className="form-group-label">Note</label>
                    <textarea
                        name="note"
                        className="prequal-textarea"
                        placeholder="Additional information or special requirements"
                        value={formData.note || ""}
                        onChange={handleInputChange}
                    ></textarea>
                </div>
            </div>
        </div>
    );
};

export default FundingRequirements;
