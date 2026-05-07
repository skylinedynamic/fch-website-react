export const faqConfig = {
    hero: {
      title: "Frequently Asked Questions",
      text: "Got questions? You’re not alone. Here are the most common questions we get about funding, credit, and our partner platform. Still need help?",
      cta: { text: "Contact Us", link: "/contact" }
    },
    categories: [
      { id: "all", label: "All" },
      { id: "business-funding", label: "Business Funding" },
      { id: "credit-builder", label: "Business Credit Builder" },
      { id: "platform-process", label: "Platform & Process" },
      { id: "partner-program", label: "Partner Program" }
    ],
    items: [
      {
        categories: ["business-funding"],
        question: "Will checking my funding options affect my credit?",
        answer: "No. Our prequalification process uses soft-pull or no-pull methods depending on the program. You can explore options with no risk to your score."
      },
      {
        categories: ["business-funding"],
        question: "How fast can I get funded?",
        answer: "Depending on the program, you can receive funds in as little as 24 hours (for MCA) or up to 90 days (for SBA loans)."
      },
      {
        categories: ["business-funding"],
        question: "Will applying hurt my credit?",
        answer: "No — we use a soft pull or no pull during the prequalification stage."
      },
      {
        categories: ["business-funding"],
        question: "What’s the fastest funding program?",
        answer: "Merchant Cash Advances and Invoice Factoring can fund in as little as 24–48 hours."
      },
      {
        categories: ["business-funding"],
        question: "Can I get funding with bad credit?",
        answer: "Yes — we have options for all credit profiles and industries."
      },
      {
        categories: ["credit-builder"],
        question: "How long does it take to build business credit?",
        answer: "Most clients see significant results within 4 to 7 months of following our structured process."
      },
      {
        categories: ["credit-builder"],
        question: "Do I need to use my personal social security number?",
        answer: "No, our goal is to help you build credit tied specifically to your EIN."
      },
      {
        categories: ["business-funding", "platform-process"],
        question: "What documents will I need?",
        answer: "Common documents include bank statements, tax returns, and a business plan, depending on the loan type."
      },
      {
        categories: ["platform-process"],
        question: "How does the matching engine work?",
        answer: "Our AI-powered platform analyzes your business profile against thousands of lending criteria to find the best match."
      },
      {
        categories: ["partner-program"],
        question: "How do I become a partner?",
        answer: "You can apply through our Partner Portal to start offering our funding solutions to your clients."
      },
      {
        categories: ["partner-program"],
        question: "What are the commission structures?",
        answer: "We offer competitive, transparent commission models for all our partners."
      }
    ]
};
