export const acqHeroData = {
    title: "Financing a Business Acquisition: Structure Deals That Lenders Approve",
    breadcrumb: [
        { label: "Home", link: "/" },
        { label: "Business Acquisition", link: "/business-acquisition" }
    ],
    bgImage: "/images/home-3/hero/hero-bg.png"
};

export const acqIntroData = {
    label: "Business Acquisition Financing",
    icon: "fas fa-handshake",
    title: "Buying a Business Is Not the Hard Part — Structuring It Is",
    text1: "Acquiring an existing business can accelerate growth instantly — immediate revenue, an established customer base, existing cash flow, trained staff, and operating systems already in place. But most acquisition attempts fail for one reason: the deal is structured emotionally, not financially.",
    text2: "Lenders do not finance optimism. They finance durable cash flow. Understanding how underwriting works before negotiating a purchase agreement changes everything.",
    callout: "Most acquisition deal declines are predictable — and preventable — before submission.",
    calloutIcon: "fas fa-shield-alt"
};

export const acqPillarsData = {
    label: "Underwriting",
    title: "The Three Core Pillars of Acquisition Underwriting",
    desc: "When lenders review a business acquisition, they focus on three things. If any are weak, the deal struggles.",
    pillars: [
        {
            number: "01",
            icon: "fas fa-chart-line",
            title: "Historical Cash Flow (Most Important)",
            desc: "Acquisition financing is based primarily on the target company's adjusted EBITDA or net operating income. Lenders analyze 3 years of tax returns, YTD financials, add-backs, revenue stability, and customer concentration.",
            progressLabel: "≥ 1.25x DSCR Required",
            note: "Cash flow must support both acquisition debt and ongoing operational obligations."
        },
        {
            number: "02",
            icon: "fas fa-user-tie",
            title: "Buyer Profile & Experience",
            desc: "Even if the business is strong, lenders evaluate the buyer's credit (680+ preferred), industry experience, management capability, liquidity post-close, and personal financial stability. A strong operator improves approval probability. A buyer with no industry experience increases perceived risk.",
            isCreditTiers: true,
            tiers: [
                { label: "680+", sub: "Preferred Credit", type: "best" },
                { label: "10%+", sub: "Min. Equity Down", type: "good" },
                { label: "0x", sub: "No Liquidity = Risk", type: "weak" }
            ]
        },
        {
            number: "03",
            icon: "fas fa-sitemap",
            title: "Deal Structure Matters More Than Price",
            desc: "Many buyers negotiate aggressively on price but ignore structure. Lenders prefer 10% buyer equity, seller note participation (often 10%), clean asset purchase agreements, reasonable goodwill allocation, and a clear transition plan. Seller notes on full standby can strengthen DSCR. Poorly structured deals collapse underwriting."
        }
    ]
};

export const acqStructuresData = {
    label: "Structures",
    title: "Common Acquisition Financing Structures",
    items: [
        {
            title: "SBA 7(a) Acquisition",
            badge: "Most Common",
            icon: "fas fa-university",
            isDark: true,
            points: [
                "10% buyer equity down",
                "10% seller note (standby)",
                "80% SBA financing",
                "Up to 10-year terms",
                "Lower cost of capital"
            ]
        },
        {
            title: "Conventional Bank",
            badge: "Low Leverage",
            icon: "fas fa-landmark",
            isDark: false,
            points: [
                "Stricter underwriting",
                "Requires strong collateral",
                "Higher equity injection",
                "Lower leverage ratio",
                "Larger, lower-risk deals"
            ]
        },
        {
            title: "Seller Financing",
            badge: "High Trust",
            icon: "fas fa-handshake",
            isDark: false,
            points: [
                "Bank financing unavailable",
                "Strong buyer/seller trust",
                "Higher risk tolerance",
                "Can be layered strategically"
            ]
        }
    ]
};

export const acqRisksData = {
    label: "Risk Factors",
    title: "Key Risk Factors Lenders Scrutinize",
    items: [
        {
            title: "Goodwill & Intangible Risk",
            icon: "fas fa-exclamation-circle",
            isYes: false,
            list: [
                "Goodwill-heavy deals = less collateral value",
                "Higher intangible allocation = tighter underwriting",
                "Requires stronger cash flow to compensate",
                "Hard assets (equipment, RE) reduce lender risk"
            ]
        },
        {
            title: "Customer Concentration Risk",
            icon: "fas fa-users",
            isYes: false,
            list: [
                "50–70% revenue from one client = red flag",
                "May reduce loan size or increase equity",
                "Diversification improves financeability",
                "Contractual clients reduce concern"
            ]
        },
        {
            title: "Transition & Continuity",
            icon: "fas fa-exchange-alt",
            isYes: true,
            list: [
                "Seller remains during transition ✓",
                "Key employees staying ✓",
                "Contracts are assignable ✓",
                "Customers contractually bound ✓"
            ]
        },
        {
            title: "Why Deals Get Declined",
            icon: "fas fa-ban",
            isYes: false,
            list: [
                "Inflated or unverifable add-backs",
                "Excessive goodwill valuation",
                "Buyer lacking post-close liquidity",
                "No structured transition plan"
            ]
        }
    ]
};

export const acqExampleData = {
    label: "Real-World Example",
    icon: "fas fa-calculator",
    title: "Target Business — $2.8M Revenue | $600K Adjusted EBITDA | $2M Purchase Price",
    math: [
        { val: "$200K", key: "Buyer Equity (10%)" },
        { operator: "+" },
        { val: "$200K", key: "Seller Note (Standby)" },
        { operator: "+" },
        { val: "$1.6M", key: "SBA Financing (80%)", isResult: true }
    ],
    math2: [
        { val: "$600,000", key: "Adjusted EBITDA" },
        { operator: "÷" },
        { val: "$350,000", key: "Annual Debt Service" },
        { operator: "=" },
        { val: "1.71x", key: "DSCR ✓ Strong Profile", isResult: true }
    ],
    note: "If EBITDA were $400,000 instead, DSCR drops below the acceptable threshold. The deal would likely fail — regardless of optimism."
};

export const acqPrepData = {
    label: "Preparation",
    title: "How to Position Before Negotiating",
    desc: "Acquisition financing begins before the letter of intent is signed.",
    items: [
        "Review 3 years of target company tax returns",
        "Calculate DSCR conservatively (not optimistically)",
        "Validate and document all add-backs",
        "Assess customer concentration risk",
        "Confirm assignability of key contracts",
        "Secure proof of equity injection source",
        "Evaluate seller willingness for standby note"
    ]
};

export const acqFaqData = {
    label: "FAQ",
    title: "Frequently Asked Questions",
    items: [
        {
            q: "How much down payment is required?",
            a: "Typically 10% minimum for SBA acquisitions. Higher risk deals may require 15–20%."
        },
        {
            q: "Can seller financing replace buyer equity?",
            a: "Sometimes partially — but not fully without careful structuring. Seller notes typically need to be on full standby to count toward equity."
        },
        {
            q: "How long does acquisition financing take?",
            a: "45–90+ days for SBA structures. Complex deals take longer. Businesses requiring immediate liquidity are not SBA candidates."
        },
        {
            q: "Is collateral required?",
            a: "Yes. Available business and personal assets are pledged. Collateral shortfall alone does not decline a deal if cash flow is strong."
        },
        {
            q: "Can someone without industry experience acquire a business?",
            a: "Yes — if the buyer profile is strong and cash flow clearly supports the structure. Industry experience reduces perceived risk significantly."
        }
    ]
};

export const acqCtaData = {
    icon: "fas fa-rocket",
    title: "The right acquisition compresses 10 years of growth into one transaction.",
    desc: "But only if structured with discipline. The lender's mindset is simple: can this business, under new ownership, reliably service the debt? If the answer is clearly yes — approval follows. If the answer requires optimism — it does not.",
    btnText: "Structure Your Acquisition Deal",
    btnLink: "/contact"
};

export const acqSidebarData = {
    nav: [
        { label: "Underwriting Pillars", link: "#acq-pillars", icon: "fas fa-chart-bar" },
        { label: "Financing Structures", link: "#acq-structures", icon: "fas fa-layer-group" },
        { label: "Risk Factors", link: "#acq-risks", icon: "fas fa-exclamation-triangle" },
        { label: "Case Example", link: "#acq-example", icon: "fas fa-calculator" },
        { label: "Pre-Negotiation Steps", link: "#acq-prep", icon: "fas fa-check-circle" },
        { label: "FAQ", link: "#acq-faq", icon: "fas fa-question-circle" }
    ],
    metrics: [
        { label: "Min Buyer Equity", val: "10%" },
        { label: "Min DSCR", val: "1.25x" },
        { label: "Preferred Credit", val: "680+" },
        { label: "SBA Max Loan", val: "$5 Million" },
        { label: "Typical Timeline", val: "45–90 Days" },
        { label: "Tax Returns Required", val: "3 Years" }
    ],
    cta: {
        title: "Structuring an Acquisition?",
        desc: "Our advisors analyze the target company's financials and structure your deal for lender approval — before you sign a letter of intent.",
        btnText: "Schedule a Deal Review",
        btnLink: "/contact"
    }
};
