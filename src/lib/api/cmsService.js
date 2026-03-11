import { homeData } from '@/data/homeData';

// Simulated API service
export const getHomeData = async () => {
  // In a real app, this would be a fetch call to a CMS or API
  return homeData;
};

export const getCreditBuilderData = async () => {
  // Mock data for credit builder page
  return {
    hero: {
      title: "Build Business Credit the Right Way — With or Without a Personal Guarantee",
      text: "Our step-by-step system helps your business (or your clients) unlock real credit, funding access, and long-term financial growth — without relying on your personal credit.",
      cta: { text: "Get Started", link: "/contact" }
    },
    about: {
      subtitle: "Educate & establish authority",
      title: "What Is Business Credit Building?",
      text: "Business credit is the foundation for getting approved for real capital — with better terms, no personal guarantee (PG), and higher limits.",
      features: [
        "Build trade lines with net-30 vendors",
        "Register with DUNS & business credit bureaus",
        "Track and improve your business credit score",
        "Unlock access to term loans, lines of credit, and equipment financing"
      ]
    },
    process: {
      subtitle: "Steps visually",
      title: "How Our Program Works",
      steps: [
        {
          number: "01",
          title: "Setup the Right Foundation",
          text: "We make sure your business is “lendable” proper registrations, address, entity, EIN, NAICS, bank setup, and more."
        },
        {
          number: "02",
          title: "Establish Reporting Tradelines",
          text: "Access a handpicked list of vendors and accounts that report to bureaus get approved fast."
        },
        {
          number: "03",
          title: "Monitor and Grow",
          text: "Track your business credit growth and unlock access to real funding offers through our integrated prequalification engine."
        }
      ]
    },
    strategy: {
      subtitle: "Types of clients",
      title: "PG vs No PG Strategy",
      cards: [
        {
          title: "No PG (No Personal Guarantee)",
          list: ["Use EIN-only vendors", "Qualify based on business profile", "Separate business from personal credit"]
        },
        {
          title: "With PG (If Needed)",
          list: ["Great for newer businesses", "Build fast, then remove PG later", "Use strong personal credit to get early approvals"]
        }
      ]
    },
    pricing: {
      subtitle: "Pricing",
      title: "Simple Transparent Pricing",
      badge: "Direct Clients Only",
      amount: "$2,497 One-Time",
      sub: "or 6 Monthly Payments of $500",
      note: "No monthly fees. No recurring charges. No cost unless we help you secure funding."
    }
  };
};

export const getFaqData = async () => {
  return {
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
        category: "business-funding",
        question: "Will checking my funding options affect my credit?",
        answer: "No. Our prequalification process uses soft-pull or no-pull methods depending on the program. You can explore options with no risk to your score."
      },
      {
        category: "business-funding",
        question: "How fast can I get funded?",
        answer: "Depending on the program, you can receive funds in as little as 24 hours (for MCA) or up to 90 days (for SBA loans)."
      },
      {
        category: "business-funding",
        question: "Will applying hurt my credit?",
        answer: "No — we use a soft pull or no pull during the prequalification stage."
      },
      {
        category: "business-funding",
        question: "What’s the fastest funding program?",
        answer: "Merchant Cash Advances and Invoice Factoring can fund in as little as 24–48 hours."
      },
      {
        category: "business-funding",
        question: "Can I get funding with bad credit?",
        answer: "Yes — we have options for all credit profiles and industries."
      },
      {
        category: "credit-builder",
        question: "How long does it take to build business credit?",
        answer: "Most clients see significant results within 4 to 7 months of following our structured process."
      },
      {
        category: "credit-builder",
        question: "Do I need to use my personal social security number?",
        answer: "No, our goal is to help you build credit tied specifically to your EIN."
      },
      {
        category: "platform-process",
        question: "What documents will I need?",
        answer: "Common documents include bank statements, tax returns, and a business plan, depending on the loan type."
      },
      {
        category: "platform-process",
        question: "How does the matching engine work?",
        answer: "Our AI-powered platform analyzes your business profile against thousands of lending criteria to find the best match."
      },
      {
        category: "partner-program",
        question: "How do I become a partner?",
        answer: "You can apply through our Partner Portal to start offering our funding solutions to your clients."
      },
      {
        category: "partner-program",
        question: "What are the commission structures?",
        answer: "We offer competitive, transparent commission models for all our partners."
      }
    ]
  };
};
