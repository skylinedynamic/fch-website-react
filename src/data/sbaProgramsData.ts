export const sbaHeroData = {
    title: "Institutional-Grade Capital for Long-Term Business Growth",
    breadcrumb: [
        { label: "Home", link: "/" },
        { label: "SBA Programs", link: "/sba-programs" }
    ],
    bgImage: "/images/home-3/hero/hero-bg.png"
};

export const sbaIntroData = {
    label: "SBA Financing Overview",
    icon: "fas fa-university",
    title: "Why SBA Financing Is Different From All Other Capital",
    text: "SBA loans are not \"easy government money.\" They are structured, bank-issued loans partially guaranteed by the U.S. Small Business Administration. That guarantee reduces lender risk — but it does not eliminate underwriting discipline. In fact, SBA underwriting is often stricter than conventional lending because files must pass internal bank credit review, SBA eligibility review, and documentation must withstand audit.",
    callout: "SBA financing rewards well-prepared businesses. It does not rescue distressed ones.",
    calloutIcon: "fas fa-shield-alt"
};

export const sbaProgramsData = {
    label: "Programs",
    title: "The Two Primary SBA Programs",
    items: [
        {
            id: "7a",
            title: "SBA 7(a) Loan Program",
            sub: "Up to $5 Million | Up to 25-year terms",
            badge: "Most Flexible",
            icon: "fas fa-layer-group",
            isDark: false,
            points: [
                "Working capital",
                "Business acquisition",
                "Partner buyouts",
                "Debt refinance",
                "Equipment purchase",
                "Owner-occupied real estate"
            ]
        },
        {
            id: "504",
            title: "SBA 504 Loan Program",
            sub: "Long-term fixed rates | Structured in 3 layers",
            badge: "Asset-Specific",
            icon: "fas fa-building",
            isDark: true,
            points: [
                "50% Bank loan",
                "40% CDC loan",
                "10% Borrower equity",
                "Commercial real estate",
                "Large equipment"
            ]
        }
    ]
};

export const sbaUnderwritingData = {
    label: "Underwriting",
    title: "What SBA Lenders Actually Underwrite",
    desc: "SBA approval centers around risk sustainability, not just revenue alone.",
    metrics: [
        {
            number: "01",
            icon: "fas fa-chart-line",
            title: "Debt Service Coverage Ratio (DSCR)",
            desc: "The core metric. DSCR = Net Operating Income ÷ Total Debt Service",
            hasProgressBar: true,
            progressLabel: "≥ 1.25x Required",
            note: "If annual debt payments = $100,000 → your business must generate at least $125,000 in available cash flow. Below this threshold, files often decline."
        },
        {
            number: "02",
            icon: "fas fa-dollar-sign",
            title: "Global Cash Flow",
            desc: "Lenders evaluate business income, personal income, personal debt, and contingent liabilities together. Strong business cash flow can be weakened by heavy personal obligations."
        },
        {
            number: "03",
            icon: "fas fa-star",
            title: "Credit Profile",
            desc: "",
            isCreditTiers: true,
            tiers: [
                { label: "700+", sub: "Strongest Approvals", type: "best" },
                { label: "680+", sub: "Preferred Range", type: "good" },
                { label: "<660", sub: "Difficult", type: "weak" }
            ]
        },
        {
            number: "04",
            icon: "fas fa-hand-holding-usd",
            title: "Equity Injection Requirements",
            desc: "For acquisitions and startups: typically 10%–20% down. Seller notes may count toward equity — but only if structured properly (often on full standby)."
        },
        {
            number: "05",
            icon: "fas fa-lock",
            title: "Collateral",
            desc: "SBA requires lenders to secure available collateral. However, collateral shortfall alone does not automatically decline a deal if cash flow is strong. Cash flow remains primary."
        }
    ]
};

export const sbaTimelineData = {
    label: "Timeline",
    title: "Timeline Reality",
    alert: "SBA is not 48-hour funding.",
    steps: [
        {
            icon: "fas fa-file-alt",
            title: "Phase 1: Underwriting & Documentation",
            duration: "2 – 4 Weeks"
        },
        {
            icon: "fas fa-stamp",
            title: "Phase 2: SBA Authorization & Closing",
            duration: "2 – 4 Weeks"
        },
        {
            icon: "fas fa-flag-checkered",
            title: "Total Timeline",
            duration: "45 – 90+ Days",
            isEnd: true
        }
    ]
};

export const sbaFitData = {
    label: "Fit Analysis",
    title: "Strategic Fit Assessment",
    yes: {
        title: "When SBA Makes Sense",
        icon: "fas fa-thumbs-up",
        list: [
            "Business is profitable",
            "Cash flow exceeds 1.25x DSCR",
            "Credit profile is stable",
            "Equity injection is available",
            "Capital use is long-term"
        ]
    },
    no: {
        title: "Common Decline Reasons",
        icon: "fas fa-thumbs-down",
        list: [
            "Insufficient DSCR",
            "Inconsistent tax return profitability",
            "Unresolved liens or judgments",
            "Weak equity injection",
            "Poor documentation"
        ]
    }
};

export const sbaCaseExampleData = {
    label: "Case Example",
    icon: "fas fa-calculator",
    title: "Manufacturing Company — $3.5M Annual Revenue",
    math: [
        { val: "$450,000", key: "Net Operating Income" },
        { operator: "÷" },
        { val: "$350,000", key: "Annual Debt Service" },
        { operator: "=" },
        { val: "1.28x", key: "DSCR ✓ Meets Threshold", isResult: true }
    ],
    note: "If DSCR falls below 1.20–1.25x, lenders hesitate. SBA underwriting is math-driven."
};

export const sbaChecklistData = {
    label: "Preparation",
    title: "How to Position Your Business Before Applying",
    items: [
        "Clean up tax return inconsistencies",
        "Reduce personal revolving debt",
        "Resolve liens or judgments",
        "Prepare updated financial statements",
        "Maintain stable deposit trends",
        "Clarify use of funds precisely",
        "Secure equity injection source"
    ]
};

export const sbaFaqData = {
    label: "FAQ",
    title: "Frequently Asked Questions",
    items: [
        {
            q: "Is SBA financing difficult to get?",
            a: "It is structured and documentation-heavy — but attainable for qualified businesses. Preparation dramatically improves approval odds."
        },
        {
            q: "Can startups qualify?",
            a: "Yes, but typically require strong personal credit, industry experience, a larger equity injection, and strong projections."
        },
        {
            q: "Can I refinance high-interest debt with SBA?",
            a: "Often yes, if refinance improves cash flow and meets SBA eligibility rules."
        },
        {
            q: "Are SBA rates fixed?",
            a: "504 loans often include long-term fixed components. 7(a) loans are frequently variable but competitive."
        },
        {
            q: "Is a personal guarantee required?",
            a: "Yes, generally from all owners with 20%+ ownership."
        }
    ]
};

export const sbaCtaData = {
    icon: "fas fa-rocket",
    title: "SBA financing is foundational capital.",
    desc: "Used correctly, it lowers cost of capital, extends amortization, improves enterprise stability, and builds long-term equity. The real question is not \"Can I get SBA financing?\" — it is \"Does my business demonstrate the cash flow and discipline that SBA lenders require?\"",
    btnText: "Get Pre-Qualified Today",
    btnLink: "/pre-qualification"
};

export const sbaSidebarData = {
    nav: [
        { label: "SBA Programs", link: "#sba-programs", icon: "fas fa-layer-group" },
        { label: "Underwriting Criteria", link: "#sba-underwriting", icon: "fas fa-chart-bar" },
        { label: "Timeline", link: "#sba-timeline", icon: "fas fa-clock" },
        { label: "Strategic Fit", link: "#sba-fit", icon: "fas fa-check-circle" },
        { label: "FAQ", link: "#sba-faq", icon: "fas fa-question-circle" }
    ],
    metrics: [
        { label: "Max Loan (7a)", val: "$5 Million" },
        { label: "Min DSCR", val: "1.25x" },
        { label: "Preferred Credit", val: "700+" },
        { label: "Equity Injection", val: "10–20%" },
        { label: "Typical Timeline", val: "45–90 Days" },
        { label: "RE Term (7a)", val: "Up to 25 Yrs" }
    ],
    cta: {
        title: "Ready to Explore SBA Financing?",
        desc: "Our advisors analyze your financials and position your file for the strongest possible approval.",
        btnText: "Schedule a Consultation",
        btnLink: "/contact"
    }
};
