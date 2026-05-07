export const realEstateHeroData = {
    title: "Owner-Occupied Commercial Real Estate: How SBA & Bank Financing Build Long-Term Business Equity",
    breadcrumb: [
        { label: "Home", link: "/" },
        { label: "Real Estate", link: "/real-estate" }
    ],
    bgImage: "/images/home-3/hero/hero-bg.png"
};

export const realEstateIntroData = {
    label: "Strategic Real Estate",
    icon: "fas fa-building",
    title: "Why Leasing Forever Limits Enterprise Value",
    text: "Most businesses lease space for years without asking a critical question: What if we owned the building instead? Commercial real estate — when owner-occupied — is not just a location decision; it is a capital structure decision that stabilizes occupancy costs and builds balance sheet equity.",
    callout: "Ownership protects against rent escalation and creates significant tax advantages while improving long-term valuation.",
    calloutIcon: "fas fa-shield-alt"
};

export const realEstateStructureData = {
    label: "Financing Options",
    title: "Primary Financing Structures",
    desc: "Choosing the right financing structure depends on your business maturity, flexibility needs, and capital availability.",
    items: [
        {
            title: "SBA 7(a) for Real Estate",
            icon: "fas fa-door-open",
            points: [
                "Used for: flexibility, mixed-use, or business acquisition scenarios",
                "Terms up to 25 years for real estate portions",
                "Refinancing of high-interest or seller-financed mortgages",
                "Rates are frequently variable"
            ]
        },
        {
            title: "SBA 504 Loan",
            icon: "fas fa-chart-pie",
            isDark: true,
            points: [
                "Structure: 50% Bank / 40% CDC / 10% Equity",
                "Designed specifically for RE and large equipment",
                "Long-term fixed-rate options available",
                "Highly popular for stabilized businesses"
            ]
        },
        {
            title: "Conventional Mortgage",
            icon: "fas fa-university",
            points: [
                "Stricter underwriting with 20–25% down payment",
                "Lower leverage but stable long-term terms",
                "Requires strong collateral and global cash flow",
                "Best for larger, lower-risk deals"
            ]
        }
    ]
};

export const realEstateMechanismData = {
    label: "Underwriting Standards",
    title: "What Lenders Actually Underwrite",
    desc: "Real estate loans are approved because the business cash flow supports the debt, not just because the property looks good.",
    metrics: [
        {
            number: "01",
            icon: "fas fa-calculator",
            title: "Debt Service Coverage Ratio (DSCR)",
            desc: "<strong>Industry Norm: ≥ 1.25x</strong><br/>If annual mortgage payments are $300k, business cash flow should be at least $375k. Strong files often exceed 1.35x–1.50x."
        },
        {
            number: "02",
            icon: "fas fa-globe",
            title: "Global Cash Flow",
            desc: "Lenders examine business income, personal income, existing personal mortgages, and contingent liabilities. Strong business income can be offset by high personal debt."
        },
        {
            number: "03",
            icon: "fas fa-money-bill-wave",
            title: "Equity Injection",
            desc: "<strong>SBA Min: 10%</strong> | <strong>Conventional: 20–25%</strong><br/>Startups may require 15–20% injection. Equity demonstrates commitment and reduces lender risk."
        },
        {
            number: "04",
            icon: "fas fa-home-alt",
            title: "Collateral & Appraisal",
            desc: "Property must appraise at or above purchase price and meet zoning/compliance. Shortfalls require additional borrower capital."
        }
    ]
};

export const realEstateOccupancyData = {
    label: "Compliance",
    title: "SBA Occupancy Rules",
    alert: "Owner-occupied ≠ Investment Property.",
    desc: "SBA loans require the property to be primarily owner-occupied. Existing property: 51% occupancy required. New construction: 60% initially with a plan to reach 80%."
};

export const realEstateFitData = {
    label: "Strategic Assessment",
    title: "When It Makes Sense vs. When It's Risky",
    yes: {
        title: "Ownership Works When:",
        icon: "fas fa-thumbs-up",
        list: [
            "Business is stable and profitable",
            "Occupancy needs are long-term",
            "Lease rates are rising",
            "DSCR comfortably exceeds 1.25x",
            "Equity injection is available"
        ]
    },
    no: {
        title: "Risky When:",
        icon: "fas fa-exclamation-triangle",
        list: [
            "Business revenue is volatile",
            "DSCR barely meets threshold",
            "Expansion assumptions are overly optimistic",
            "Personal leverage is high",
            "Liquidity post-closing is weak",
            "Flexibilities reduced if business performance declines"
        ]
    }
};

export const realEstateCaseExampleData = {
    label: "Real-World Example",
    icon: "fas fa-warehouse",
    title: "Distribution Company: $4M Revenue, $600k NOI",
    math: [
        { val: "$3,000,000", key: "Purchase Price" },
        { operator: "÷" },
        { val: "$420,000", key: "Ann. Mortgage" },
        { operator: "=" },
        { val: "1.43x", key: "DSCR (Strong)", isResult: true }
    ],
    note: "Comparison: If NOI were $450k, DSCR falls to 1.07x—a scenario that likely declines or requires restructuring."
};

export const realEstateEnvironmentalData = {
    label: "Disruptors",
    title: "Environmental Review (Phase I ESA)",
    desc: "The often overlooked factor. SBA requires a Phase I Environmental Site Assessment. Contamination can delay closing, require costly remediation, or kill the deal entirely."
};

export const realEstatePositioningData = {
    label: "Preparation",
    title: "Before You Apply (Shorten Your Timeline)",
    items: [
        "Review last 3 years tax returns",
        "Calculate DSCR conservatively",
        "Reduce personal revolving debt",
        "Prepare interim financials",
        "Maintain strong deposit trends",
        "Gather lease history (if relocating)",
        "Confirm zoning & compliance"
    ]
};

export const realEstateFaqData = {
    label: "FAQ",
    title: "Frequently Asked Questions",
    items: [
        {
            q: "How long does SBA real estate financing take?",
            a: "Typically 60–90+ days depending on complexity. Environmental reviews and appraisals impact timing."
        },
        {
            q: "Is a personal guarantee required?",
            a: "Yes — generally from owners with 20%+ ownership."
        },
        {
            q: "Can startups qualify?",
            a: "Yes, but higher equity injection (15–20%) and stronger compensating factors are usually required."
        },
        {
            q: "Can I rent part of the building?",
            a: "Yes, as long as occupancy requirements are met (51% for existing, 60% for new construction)."
        },
        {
            q: "Are rates fixed?",
            a: "504 loans often include long-term fixed components. 7(a) loans are frequently variable."
        }
    ]
};

export const realEstateSidebarData = {
    nav: [
        { label: "Overview", link: "#re-overview", icon: "fas fa-info-circle" },
        { label: "Financing", link: "#re-financing", icon: "fas fa-coins" },
        { label: "Underwriting", link: "#re-underwriting", icon: "fas fa-shield-check" },
        { label: "Compliance", link: "#re-compliance", icon: "fas fa-check-double" },
        { label: "Preparation", link: "#re-preparation", icon: "fas fa-list-check" },
        { label: "FAQ", link: "#re-faq", icon: "fas fa-question-circle" }
    ],
    metrics: [
        { label: "SBA Max Term", val: "25 Years" },
        { label: "Target DSCR", val: "≥ 1.25x" },
        { label: "Equity Min", val: "10%" },
        { label: "Occupancy Min", val: "51%" },
        { label: "Timeframe", val: "60-90+ Days" }
    ],
    cta: {
        title: "Ready to Build Equity?",
        desc: "Secure owner-occupied financing that transforms rent payments into business assets. Speak with an advisor today.",
        btnText: "Check Eligibility",
        btnLink: "/pre-qualification"
    }
};
