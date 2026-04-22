export const workingCapitalHeroData = {
    title: "Strategic Working Capital: How Smart Companies Fund Growth Without Overleveraging",
    breadcrumb: [
        { label: "Home", link: "/" },
        { label: "Working Capital", link: "/working-capital-and-growth" }
    ],
    bgImage: "/images/home-3/hero/hero-bg.png"
};

export const workingCapitalIntroData = {
    label: "Strategic Growth Funding",
    icon: "fas fa-chart-line",
    title: "The Problem Most Businesses Don't Recognize",
    text: "Revenue growth does not automatically mean financial strength. In fact, rapid growth often creates the most dangerous cash flow strain: payroll expands before receivables arrive, inventory must be purchased before revenue is collected, marketing spend increases before ROI is realized, and vendor terms tighten under scaling pressure.",
    callout: "Working capital, when structured properly, solves this. When structured poorly, it destroys margins.",
    calloutIcon: "fas fa-shield-alt"
};

export const workingCapitalStructureData = {
    label: "The Three Primary Structures",
    title: "How Capital Should Align With Your Operational Cycle",
    desc: "Understanding how lenders underwrite risk is key to choosing the right structure for your business needs.",
    items: [
        {
            title: "1. Business Line of Credit",
            icon: "fas fa-sync-alt",
            points: [
                "Revolving facility (draw, repay, reuse)",
                "Best for: Inventory turns, seasonal payroll, bridging receivables, short-cycle operating needs",
                "Key Focus: Deposit consistency, low overdraft activity, cash flow coverage",
                "Common Mistake: Using a line of credit for long-term investments"
            ]
        },
        {
            title: "2. Term Loans",
            icon: "fas fa-calendar-alt",
            isDark: true,
            points: [
                "Lump-sum disbursement repaid over a fixed term",
                "Best for: expansion, hiring, marketing scale-up, facility upgrades",
                "Cost: Lower APR (Bank/SBA) vs Higher cost/shorter duration (Non-bank)",
                "Strategic Rule: Match the term length to the life of the investment"
            ]
        },
        {
            title: "3. Revenue-Based Financing",
            icon: "fas fa-hand-holding-usd",
            points: [
                "Repayments tied to revenue flow (often daily/weekly remittance)",
                "Best for: High-growth, consistent deposit activity",
                "Metrics: Avg monthly revenue, deposit frequency, existing stacking risk",
                "Strategy: Short-term capital must have a clear exit strategy"
            ]
        }
    ]
};

export const workingCapitalMechanismData = {
    label: "Institutional Underwriting",
    title: "What Working Capital Actually Means",
    desc: "Underwriters evaluate working capital by reviewing demonstrated cash behavior, not just definitions or projections.",
    metrics: [
        {
            number: "01",
            icon: "fas fa-book",
            title: "Textbook vs Institutional",
            desc: "<strong>Textbook:</strong> Current assets minus current liabilities.<br/><strong>Institutional:</strong> The ability of a company to sustain operations without liquidity stress."
        },
        {
            number: "02",
            icon: "fas fa-search-dollar",
            title: "Demonstrated Cash Behavior",
            desc: "Underwriters evaluate 3–6 months of bank statements, revenue consistency/volatility, average daily balances, NSF frequency, existing debt, and payment burden relative to gross revenue."
        },
        {
            number: "03",
            icon: "fas fa-weight-hanging",
            title: "Payment Burden Bands",
            desc: "Industry norms for gross revenue consumption. Once repayment exceeds 20-25%, liquidity compression begins.",
            isCreditTiers: true,
            tiers: [
                { label: "≤12%", sub: "Strong", type: "best" },
                { label: "12–18%", sub: "Acceptable", type: "good" },
                { label: "18–25%", sub: "Aggressive", type: "weak" },
                { label: ">25%", sub: "High Risk", type: "danger" }
            ]
        }
    ]
};

export const workingCapitalBurdenData = {
    label: "The Mathematics",
    title: "Simplified Payment Burden",
    desc: "If your business generates $100,000/month in gross revenue, a responsible working capital structure should not exceed $12,000–$18,000 in total monthly debt payments (including existing obligations). Once repayment consumes more than 20–25% of gross revenue, liquidity compression begins. This is where businesses start stacking debt — and collapse margins.",
};

export const workingCapitalFitData = {
    label: "Growth vs. Risk",
    title: "When It Fuels Growth vs. When It Destroys Businesses",
    yes: {
        title: "Working Capital Works When:",
        icon: "fas fa-arrow-up",
        list: [
            "Gross margins support repayment",
            "Revenue is consistent month-over-month",
            "Funds are used for revenue-generating initiatives",
            "There is a clear ROI timeline",
            "There is no excessive stacking"
        ]
    },
    no: {
        title: "Dangerous When:",
        icon: "fas fa-exclamation-triangle",
        list: [
            "Used to cover losses or existing debt",
            "Used without margin modeling",
            "Layered repeatedly (stacking)",
            "Structured shorter than the investment life",
            "Used to 'buy time' for operational imbalance"
        ]
    }
};

export const workingCapitalCaseExampleData = {
    label: "Case Example",
    icon: "fas fa-calculator",
    title: "Strategic Leverage: $1.2M Annual Revenue ($100K/Mo)",
    math: [
        { val: "$150,000", key: "Term Loan" },
        { operator: "÷" },
        { val: "36 Mo", key: "Structure" },
        { operator: "=" },
        { val: "$5,500 - $6,500", key: "Monthly Payment", isResult: true }
    ],
    note: "Used to expand sales team, increase marketing spend, and increase production capacity. If gross margin supports 30%+ and revenue grows 15–20%, the loan strengthens enterprise value."
};

export const workingCapitalLenderMindsetData = {
    label: "Lender Perspective",
    title: "How Lenders Actually Think",
    alert: "Cash flow determines approval; Credit score influences pricing.",
    desc: "Contrary to popular belief, most lenders focus on cash flow behavior, stability of deposits, and business model risk (including industry risk and leverage position) before credit score."
};

export const workingCapitalPositioningData = {
    label: "Positioning",
    title: "Position Your Business (90-Day Plan)",
    items: [
        "Eliminate overdrafts and NSF activity",
        "Avoid new short-term stacking",
        "Clean up bank statement anomalies",
        "Separate personal and business expenses",
        "Improve receivables collection cycle",
        "Reduce unnecessary subscription drains",
        "Maintain consistent deposit cadence"
    ]
};

export const workingCapitalFaqData = {
    label: "FAQ",
    title: "Frequently Asked Questions",
    items: [
        {
            q: "How much working capital can my business qualify for?",
            a: "Most non-bank lenders offer 10–20% of annual gross revenue, depending on stability and risk profile."
        },
        {
            q: "What credit score is required?",
            a: "Traditional bank products typically 680+. Non-bank approvals may begin in the 600+ range, though pricing increases with risk."
        },
        {
            q: "How fast can working capital be funded?",
            a: "Non-bank capital: 24–72 hours after approval. Bank/SBA capital: several weeks to months."
        },
        {
            q: "Does working capital require collateral?",
            a: "Often unsecured for smaller facilities. Larger or bank-based facilities may require liens or guarantees."
        },
        {
            q: "Is working capital tax deductible?",
            a: "Interest generally is. Principal is not. Always confirm with your CPA."
        }
    ]
};

export const workingCapitalSidebarData = {
    nav: [
        { label: "Overview", link: "#wc-overview", icon: "fas fa-info-circle" },
        { label: "Structures", link: "#wc-structures", icon: "fas fa-layer-group" },
        { label: "Metrics", link: "#wc-metrics", icon: "fas fa-chart-bar" },
        { label: "Checklist", link: "#wc-checklist", icon: "fas fa-list-check" },
        { label: "FAQ", link: "#wc-faq", icon: "fas fa-question-circle" }
    ],
    metrics: [
        { label: "Funding Range", val: "10-20% Gross Rev" },
        { label: "Approval Time", val: "24-72 Hours" },
        { label: "Min Credit", val: "600+" },
        { label: "Best Burden", val: "≤12%" },
        { label: "Max Burden", val: "25%" },
        { label: "Collateral", val: "Often Unsecured" }
    ],
    cta: {
        title: "Ready to Fund Your Growth?",
        desc: "Secure strategic working capital that aligns with your business cycle. Get an answer in as little as 24 hours.",
        btnText: "Check Qualification",
        btnLink: "/pre-qualification"
    }
};
