export const preQualificationSteps = [
    {
        id: 1,
        title: "Personal Information",
        icon: "fas fa-user-circle",
        fields: [
            { id: "first_name", name: "first_name", label: "First Name", type: "text", placeholder: "Your First Name", required: true, width: "col-md-6" },
            { id: "last_name", name: "last_name", label: "Last Name", type: "text", placeholder: "Your Last Name", required: true, width: "col-md-6" },
            { id: "email", name: "email", label: "Email Address", type: "email", placeholder: "name@company.com", required: true, width: "col-md-6" },
            { id: "phone", name: "phone", label: "Phone Number", type: "tel", placeholder: "(546) 456-5465", required: true, width: "col-md-6", isPhone: true },
            { id: "website", name: "website", label: "Business Website", type: "url", placeholder: "https://example.com", required: false, width: "col-md-6" },
            { 
                id: "state", 
                name: "state", 
                label: "State of Incorporation", 
                type: "select", 
                required: true, 
                width: "col-md-6",
                isDynamic: true,
                options: ["Select State"] 
            },
        ]
    },
    {
        id: 2,
        title: "Business Details",
        icon: "fas fa-briefcase",
        fields: [
            { id: "business_name", name: "business_name", label: "Business Name", type: "text", placeholder: "Legal Entity Name", required: true, width: "col-md-6" },
            { 
                id: "industry", 
                name: "industry", 
                label: "Industry Type", 
                type: "select", 
                required: true, 
                width: "col-md-6",
                options: ["Select Industry", "Accounting & Financial Services", "Automotive Services & Dealerships", "Beauty, Salon & Spa Services", "Cannabis / CBD Industry", "Childcare & Daycare", "Cleaning & Janitorial Services", "Construction & Contracting", "E-Commerce / Online Retail", "Education & Tutoring Services", "Fitness & Wellness (Gyms, Yoga, Etc.)", "Franchise Businesses", "Government Contractor / Vendor", "Healthcare & Medical Practices", "Home Services (Plumbing, HVAC, Landscaping, etc.)", "Hospitality (Hotels / Lodging)", "IT & Software Development", "Legal & Professional Services", "Manufacturing & Wholesale", "Marketing, Advertising & Media", "Non-Profit Organization", "Real Estate & Property Management", "Restaurants, Bars & Catering", "Retail (Brick & Mortar)", "Transportation & Logistics", "Other"] 
            },
            { 
                id: "structure", 
                name: "structure", 
                label: "Business Structure", 
                type: "select", 
                required: true, 
                width: "col-md-6",
                options: ["Select Structure", "LLC", "S-Corporation", "Corporation", "Sole Proprietorship", "Partnership", "PLLC", "Public Corporation", "Other"] 
            },
            { 
                id: "time_in_business", 
                name: "time_in_business", 
                label: "Time in Business", 
                type: "select", 
                required: true, 
                width: "col-md-6",
                options: ["Select Duration", "Under 6 months", "6-12 months", "1-2 years", "2-3 years", "3+ years"] 
            },
            { id: "monthly_revenue", name: "monthly_revenue", label: "Monthly Revenue", type: "number", placeholder: "Average last 3 months", required: true, width: "col-md-6" },
            { id: "annual_revenue", name: "annual_revenue", label: "Annual Revenue", type: "number", placeholder: "Last fiscal year", required: true, width: "col-md-6" },
        ]
    },
    {
        id: 3,
        title: "Funding Requirements",
        icon: "fas fa-hand-holding-usd",
        fields: [
            { id: "funding_amount", name: "funding_amount", label: "Funding Requested Amount", type: "number", placeholder: "e.g. 500000", required: true, width: "col-md-6" },
            { 
                id: "urgency", 
                name: "urgency", 
                label: "Funding Urgency", 
                type: "select", 
                required: true, 
                width: "col-md-6",
                options: ["Select Urgency", "Immediate", "Within 30 days", "1-3 months", "Flexible"] 
            },
            { 
                id: "purpose", 
                name: "purpose", 
                label: "Purpose of Funding", 
                type: "select", 
                required: true, 
                width: "col-md-6",
                options: ["Select Purpose", "Working Capital", "Equipment", "Inventory", "Marketing", "Expansion", "Other"] 
            },
            { 
                id: "personal_credit", 
                name: "personal_credit", 
                label: "Personal Credit Score", 
                type: "select", 
                required: true, 
                width: "col-md-6",
                options: ["Select Score Range", "Poor (<580)", "Fair (580-669)", "Good (670-739)", "Very Good (740-799)", "Excellent (800+)"] 
            },
            { 
                id: "business_credit", 
                name: "business_credit", 
                label: "Estimate Business Credit Score", 
                type: "select", 
                required: true, 
                width: "col-md-6",
                options: ["Select Score", "No Business Credit", "Low", "Medium", "High"] 
            },
            { 
                id: "has_debt", 
                name: "has_debt", 
                label: "Existing Business Debt?", 
                type: "radio", 
                required: true, 
                width: "col-md-6",
                options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }],
                default: "no"
            },
            { id: "debt_balance", name: "debt_balance", label: "Debt Balance", type: "number", placeholder: "Current total debt", required: false, width: "col-md-6", condition: { field: "has_debt", value: "yes" } },
            { id: "note", name: "note", label: "Note", type: "textarea", placeholder: "Additional information or special requirements", required: false, width: "col-12" },
        ]
    }
];
