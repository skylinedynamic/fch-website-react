export const bridgeHeroData = {
    title: "Bridge & Short-Term Business Capital: Strategic Use vs. Strategic Risk",
    breadcrumb: [
        { label: "Home", link: "/" },
        { label: "Bridge / Short-Term", link: "/bridge-short-term" }
    ],
    bgImage: "/images/home-3/hero/hero-bg.png"
};

export const bridgeIntroData = {
    label: "Bridge Financing Overview",
    icon: "fas fa-bridge",
    title: "The Most Misused Form of Business Financing",
    text: "Short-term capital is not inherently bad. But it is frequently misapplied. Bridge financing and revenue-based products are designed to solve timing gaps — not structural business weaknesses.",
    callout: "The difference lies in structure and exit strategy. Used correctly, they rescue opportunities; used incorrectly, they accelerate failure.",
    calloutIcon: "fas fa-shield-alt"
};

export const bridgeStructureData = {
    label: "Understanding Bridge Capital",
    title: "What Is Bridge / Short-Term Capital?",
    desc: "Unlike SBA or conventional loans, these products approve faster and require less documentation, but carry higher effective costs.",
    items: [
        {
            title: "Common Structures",
            icon: "fas fa-layer-group",
            points: [
                "Revenue-based financing (MCA-style)",
                "6–18 month term loans",
                "Daily or weekly remittance products",
                "Short amortization unsecured facilities"
            ]
        },
        {
            title: "Key Characteristics",
            icon: "fas fa-bolt",
            isDark: true,
            points: [
                "Fast approval (24–72 hours)",
                "Minimal documentation",
                "Higher effective cost",
                "Depends on deposit consistency"
            ]
        }
    ]
};

export const bridgeMechanismData = {
    label: "How It Works",
    title: "Revenue-Based Structures & Metrics",
    desc: "Instead of traditional interest rates, bridge capital uses factor rates and automated remittance.",
    metrics: [
        {
            number: "01",
            icon: "fas fa-percentage",
            title: "Factor Rates (e.g., 1.20–1.40)",
            desc: "A fixed multiplier applied to the principal. Unlike amortizing interest, the total payback amount is fixed from Day 1."
        },
        {
            number: "02",
            icon: "fas fa-calendar-check",
            title: "Daily/Weekly Remittance",
            desc: "Automatic withdrawals that align with your deposit activity. This creates immediate cash flow compression if not modeled properly."
        },
        {
            number: "03",
            icon: "fas fa-weight-hanging",
            title: "Payment Burden",
            desc: "The 'silent metric.' Total short-term obligations should ideally not exceed 12–18% of monthly gross revenue.",
            isCreditTiers: true,
            tiers: [
                { label: "≤12%", sub: "Strong", type: "best" },
                { label: "12–18%", sub: "Acceptable", type: "good" },
                { label: ">25%", sub: "High Risk", type: "weak" }
            ]
        }
    ]
};

export const bridgeFitData = {
    label: "Strategic Fit",
    title: "When It Makes Sense vs. When It's Dangerous",
    yes: {
        title: "Strategic Use Cases",
        icon: "fas fa-thumbs-up",
        list: [
            "Bridging large receivables",
            "Funding high-margin inventory",
            "Temporary seasonal dips",
            "Emergency equipment replacement",
            "Defined short-term opportunities"
        ]
    },
    no: {
        title: "Danger Zones",
        icon: "fas fa-thumbs-down",
        list: [
            "Covering ongoing losses",
            "Paying off other short-term debt",
            "Debt stacking (multiple layers)",
            "Long-term investments",
            "Payment burden > 25% revenue"
        ]
    }
};

export const bridgeStackingData = {
    label: "Risk Warning",
    title: "Stacking Risk: The Silent Killer",
    alert: "Stacking turns manageable capital into crushing pressure.",
    desc: "Stacking occurs when businesses take a second advance before paying off the first. This leads to dropping bank balances, NSF frequency, and eventually makes recovery mathematically difficult."
};

export const bridgeCaseExampleData = {
    label: "Repayment Example",
    icon: "fas fa-calculator",
    title: "Retail Business: $200k Monthly Revenue, 30% Margin",
    math: [
        { val: "$120,000", key: "Bridge Advance" },
        { operator: "×" },
        { val: "1.28", key: "Factor Rate" },
        { operator: "=" },
        { val: "$153,600", key: "Total Payback", isResult: true }
    ],
    note: "Over 8 months, this is ~$19,200/mo (9.6% burden). Adding a second advance often pushes burden above 20%, triggering margin compression."
};

export const bridgeChecklistData = {
    label: "Preparation",
    title: "Before You Apply",
    items: [
        "Define exit strategy (What repays this?)",
        "Eliminate overdrafts & NSFs",
        "Calculate payment burden realistically",
        "Maintain consistent deposit cadence",
        "Avoid stacking multiple layers",
        "Clean up negative balance days"
    ]
};

export const bridgeFaqData = {
    label: "FAQ",
    title: "Frequently Asked Questions",
    items: [
        {
            q: "Is bridge capital the same as an MCA?",
            a: "They are often structured similarly (revenue-based), but specific terms, documentation, and costs vary between products."
        },
        {
            q: "How fast can funding occur?",
            a: "In many cases, businesses can be funded within 24–72 hours after approval."
        },
        {
            q: "Is collateral required?",
            a: "Generally these are unsecured facilities, though personal guarantees are almost always required."
        },
        {
            q: "Does bridge capital affect future SBA eligibility?",
            a: "Yes. Excessive leverage or stacking can impact your Debt Service Coverage Ratio (DSCR) or deposit health required for SBA."
        },
        {
            q: "Can bridge capital be refinanced?",
            a: "Yes—often into longer-term amortized structures (like SBA or Conventional) once the business stabilizes."
        }
    ]
};

export const bridgeSidebarData = {
    nav: [
        { label: "Overview", link: "#bridge-overview", icon: "fas fa-info-circle" },
        { label: "How It Works", link: "#bridge-works", icon: "fas fa-cog" },
        { label: "Strategic Fit", link: "#bridge-fit", icon: "fas fa-check-circle" },
        { label: "Stacking Risks", link: "#bridge-stacking", icon: "fas fa-exclamation-triangle" },
        { label: "FAQ", link: "#bridge-faq", icon: "fas fa-question-circle" }
    ],
    metrics: [
        { label: "Funding Speed", val: "24–72 Hours" },
        { label: "Max Burden", val: "<18% Revenue" },
        { label: "Factor Rates", val: "1.20 – 1.40" },
        { label: "Terms", val: "6 – 18 Months" },
        { label: "Collateral", val: "Unsecured" },
        { label: "Repayment", val: "Daily/Weekly" }
    ],
    cta: {
        title: "Need Fast Bridge Funding?",
        desc: "Get an answer in hours. We help you bridge the gap without compromising your long-term stability.",
        btnText: "Apply Now",
        btnLink: "/pre-qualification"
    }
};
