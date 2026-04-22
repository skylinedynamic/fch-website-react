export const assetEquipmentHeroData = {
    title: "Asset & Equipment Financing: How to Acquire Critical Assets Without Disrupting Liquidity",
    breadcrumb: [
        { label: "Home", link: "/" },
        { label: "Asset & Equipment", link: "/asset-and-equipment" }
    ],
    bgImage: "/images/home-3/hero/hero-bg.png"
};

export const assetEquipmentIntroData = {
    label: "Equipment Financing Overview",
    icon: "fas fa-tools",
    title: "Why Equipment Decisions Determine Enterprise Value",
    text: "Equipment is not an expense; it is revenue infrastructure. Whether for construction, medical, or manufacturing, equipment directly determines production capacity and enterprise valuation. Paying cash or using short-term capital for long-life assets are costly mistakes that create long-term strain.",
    callout: "The intelligent move is structured equipment financing aligned with asset life and cash flow. It increases capacity without depleting working capital.",
    calloutIcon: "fas fa-shield-alt"
};

export const assetEquipmentStructureData = {
    label: "Financing vs. Leasing",
    title: "Understanding Your Options",
    desc: "Asset-based capital where the equipment itself serves as collateral. The structure you choose affects ownership and tax strategy.",
    items: [
        {
            title: "Equipment Financing (Loan)",
            icon: "fas fa-file-invoice-dollar",
            points: [
                "You own the asset immediately",
                "Fixed amortized payments",
                "Section 179 tax deductions",
                "Best for long-term operational machinery"
            ]
        },
        {
            title: "Equipment Leasing",
            icon: "fas fa-hand-holding-usd",
            isDark: true,
            points: [
                "Lower upfront cash requirement",
                "Flexible end-of-term buyouts",
                "Easier innovation/upgrade cycles",
                "Best for technology & medical equipment"
            ]
        }
    ]
};

export const assetEquipmentMechanismData = {
    label: "Qualification Standards",
    title: "Institutional Norms & Standards",
    desc: "While guidelines vary, lenders focus on business durability and historical behavior alongside the asset's value.",
    metrics: [
        {
            number: "01",
            icon: "fas fa-history",
            title: "Time in Business (2+ Years)",
            desc: "2+ years is preferred. Startups may be limited in amount unless personal credit is exceptionally strong."
        },
        {
            number: "02",
            icon: "fas fa-user-check",
            title: "Credit Profile (680+)",
            desc: "680+ secures strongest pricing. 640–679 is typical acceptable range. Below 640 limits options."
        },
        {
            number: "03",
            icon: "fas fa-balance-scale",
            title: "Comparable Credit",
            desc: "Lenders prefer evidence of managing obligations at least 50% of the requested amount (e.g., $50k manageable credit for $100k request).",
            isCreditTiers: true,
            tiers: [
                { label: "680+", sub: "Strong Pricing", type: "best" },
                { label: "640-679", sub: "Acceptable", type: "good" },
                { label: "<640", sub: "Challenged", type: "weak" }
            ]
        }
    ]
};

export const assetEquipmentEquityData = {
    label: "Equity Injection",
    title: "Down Payment Expectations",
    items: [
        {
            title: "Strong Profiles",
            icon: "fas fa-star",
            points: [
                "0% – 10% down payment",
                "Highest FICO scores",
                "Strong comparable credit history"
            ]
        },
        {
            title: "Modern/Moderate Risk",
            icon: "fas fa-check-double",
            isDark: true,
            points: [
                "10% – 20% down payment",
                "Moderate FICO / Time in Business",
                "Startups or challenged credit (20%–30%)"
            ]
        }
    ]
};

export const assetEquipmentAssetTypeData = {
    label: "Asset Review",
    title: "New vs. Used Equipment Underwriting",
    desc: "The quality and age of the asset materially impact the approval probability and amortization terms.",
    items: [
        {
            title: "New Equipment",
            icon: "fas fa-box-open",
            points: [
                "Easier underwriting & clear valuation",
                "Full manufacturer support",
                "Longest amortization options available"
            ]
        },
        {
            title: "Used Equipment",
            icon: "fas fa-recycle",
            isDark: true,
            points: [
                "Often must be under 10 years old",
                "Resale value & condition reviewed",
                "Tighter underwriting as age increases"
            ]
        }
    ]
};

export const assetEquipmentTransportationData = {
    label: "Specialized Underwriting",
    title: "Transportation-Specific Considerations",
    alert: "Class 8 OTR trucking carries significantly higher scrutiny due to depreciation.",
    desc: "Underwriting often requires 5+ years in business, multiple trucks, DOT compliance, and strong tradeline depth. FICO expectations often start at 680–690+ for heavy-duty fleet expansion."
};

export const assetEquipmentTaxData = {
    label: "Tax Strategy",
    title: "Section 179 Advantages",
    desc: "Ownerhip may allow businesses to deduct the full purchase price in the year placed in service. Leasing may also offer deductible payments. Tax strategy should influence your choice between financing and leasing.",
    callout: "Always coordinate with a CPA to align financing structure with your overall tax strategy."
};

export const assetEquipmentFitData = {
    label: "Strategic Fit",
    title: "When It Makes Sense vs. When It's Risky",
    yes: {
        title: "Strategic Success",
        icon: "fas fa-thumbs-up",
        list: [
            "Equipment directly produces revenue",
            "Cash flow supports fixed payments",
            "Asset life exceeds financing term",
            "Margins allow predictable repayment",
            "Enterprise value increases correctly"
        ]
    },
    no: {
        title: "Danger Zones",
        icon: "fas fa-thumbs-down",
        list: [
            "Equipment use is speculative",
            "Cash flow is unstable or declining",
            "Used equipment lacks resale value",
            "Payments exceed operational margin",
            "Business is in structural decline"
        ]
    }
};

export const assetEquipmentCaseExampleData = {
    label: "Repayment Example",
    icon: "fas fa-calculator",
    title: "Construction: $2.5M Revenue, $250k Equipment Need",
    math: [
        { val: "$250,000", key: "Asset Cost" },
        { operator: "→" },
        { val: "10%", key: "Down Payment" },
        { operator: "=" },
        { val: "60 Mo", key: "Amortized Term", isResult: true }
    ],
    note: "Strong 720 credit and 5 years in business secure a fixed payment structure. because the asset produces revenue, it avoids depleting working capital while scaling."
};

export const assetEquipmentChecklistData = {
    label: "Preparation",
    title: "Positioning Before Applying",
    items: [
        "Prepare clear equipment invoice or quote",
        "Reduce recent overdrafts & NSFs",
        "Avoid stacking short-term debt recently",
        "Improve utilization ratios on current credit",
        "Maintain clean, consistent bookkeeping",
        "Gather last 3 months of bank statements"
    ]
};

export const assetEquipmentFaqData = {
    label: "FAQ",
    title: "Frequently Asked Questions",
    items: [
        {
            q: "How fast can equipment financing close?",
            a: "Application-only deals can close in days. Larger, complex transactions typically take 1–3 weeks depending on documentation."
        },
        {
            q: "Is a personal guarantee required?",
            a: "Often yes, especially for businesses under 10 years old or those without substantial corporate credit depth."
        },
        {
            q: "Can startups qualify?",
            a: "Yes, but typically with strong personal credit, larger down payments (20%+), and limits on the total loan amount."
        },
        {
            q: "Is collateral required beyond the equipment?",
            a: "Usually no. Asset-based lending uses the equipment as the primary collateral, though risk profiles vary."
        },
        {
            q: "What rates should I expect?",
            a: "Rates vary based on credit, time in business, and equipment type. Stronger profiles receive materially better pricing."
        }
    ]
};

export const assetEquipmentSidebarData = {
    nav: [
        { label: "Overview", link: "#asset-overview", icon: "fas fa-info-circle" },
        { label: "Financing vs Leasing", link: "#asset-structure", icon: "fas fa-layer-group" },
        { label: "Qualification", link: "#asset-qualify", icon: "fas fa-user-check" },
        { label: "Strategic Fit", link: "#asset-fit", icon: "fas fa-check-circle" },
        { label: "FAQ", link: "#asset-faq", icon: "fas fa-question-circle" }
    ],
    metrics: [
        { label: "Funding Speed", val: "2 Days – 3 Weeks" },
        { label: "Down Payment", val: "0% – 20%" },
        { label: "Terms", val: "24 – 84 Months" },
        { label: "Rate Basis", val: "Amortized" },
        { label: "Asset Value", val: "Collateralized" },
        { label: "Tax Benefit", val: "Section 179" }
    ],
    cta: {
        title: "Need Equipment Financing?",
        desc: "Acquire the tools you need to grow without draining your cash reserves. Get a quote in 24 hours.",
        btnText: "Get Started",
        btnLink: "/pre-qualification"
    }
};
