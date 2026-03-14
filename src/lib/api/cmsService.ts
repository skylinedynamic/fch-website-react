import { homeData } from '@/data/homeData';
import { blogData, blogCategories, blogTags } from '@/data/blogData';
import { HomeData } from '@/types/cms';

// Simulated API service
export const getHomeData = async (): Promise<HomeData> => {

  // In a real app, this would be a fetch call to a CMS or API
  return homeData;
};

export const getBlogPostBySlug = async (slug) => {
  return blogData.find(post => post.slug === slug);
};

export const getBlogCategories = async () => {
  return blogCategories;
};

export const getBlogTags = async () => {
  return blogTags;
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
    whatsIncluded: {
      subtitle: "Platform Features",
      title: "What’s Included",
      features: [
        "Lendability Audit & Business Credit Plan",
        "Net-30 Vendor Access & Tradeline Tracker",
        "EIN-only Credit Application Strategy",
        "Portal Access with Progress Tracking",
        "Prequalification Engine Access",
        "Live Support + Funding Advisor Check-Ins"
      ]
    },
    idealUsers: {
      subtitle: "Ideal Users",
      title: "Who This Platform Is For",
      text: "Perfect for",
      list: [
        "Startups and solopreneurs",
        "Established businesses wanting credit lines",
        "Brokers or agencies serving small businesses",
        "Credit repair clients needing business funding"
      ]
    },
    pricing: {
      subtitle: "Pricing",
      title: "Simple Transparent Pricing",
      badge: "Direct Clients Only",
      amount: "$2,497 One-Time",
      sub: "or 6 Monthly Payments of $500",
      note: "No monthly fees. No recurring charges. No cost unless<br>we help you secure funding."
    },
    growth: {
      title: "Ready to Build Business Credit and Unlock Real Capital?",
      cta: [
        { text: "Enroll Now", link: "/contact" },
        { text: "Talk to a Specialist", link: "/contact" }
      ]
    },
    faq: {
      subtitle: "FAQ’S",
      title: "Frequently Asked Questions",
      text: "We help you build the foundation correctly first, so you don’t burn months on denials.",
      items: [
        {
          question: "Can I build business credit with bad personal credit?",
          answer: "Yes — many of our vendors are “No PG” and approve based on your business profile."
        },
        {
          question: "How long does it take to qualify for funding?",
          answer: "Some clients qualify in 30–60 days. It depends on your profile and setup."
        },
        {
          question: "Is this a tradeline rental or shelf corp?",
          answer: "No — we do everything the legit way. You build real, sustainable credit under your EIN."
        }
      ]
    }
  };
};

export const getPartnerProgramData = async () => {
  return {
    hero: {
      title: "Build Your Own Business Funding Empire",
      text: "Offer business credit building and funding services — as a Certified Partner or fully White-Labeled. Start helping business owners and earning real revenue.",
      cta: [
        { text: "Get Started", link: "/contact" },
        { text: "Partner Program PDF", link: "/pdfs/Partner-Program.pdf", download: true }
      ]
    },
    overview: {
      subtitle: "Program Overview",
      title: "Two Powerful Ways to Partner With Us",
      cards: [
        {
          number: "01",
          icon: "fa-solid fa-medal",
          title: "Certified Partner",
          text: "Perfect for professionals looking to generate high-yield revenue through a proven referral model. We handle fulfillment, you earn commissions.",
          features: ["High Referral Commissions", "Real-time Tracking Portal", "Marketing Asset Library"],
          image: "/images/home-3/partner1.png"
        },
        {
          number: "02",
          icon: "fa-solid fa-crown",
          title: "Executive White-Label",
          text: "Take full control of your business destiny. Launch your own branded funding platform powered by our backend infrastructure and underwriting.",
          features: ["Custom Branded Platform", "100% Client Ownership", "Full Underwriting Access"],
          image: "/images/home-3/white.png"
        }
      ]
    },
    comparison: {
      badge: "Partner Comparison Table",
      title: "Key differences visually",
      features: [
        { label: "Branded Website Included", certified: false, whitelabel: true },
        { label: "Client Portal Access", certified: true, whitelabel: true },
        { label: "Business Credit Builder Included", certified: true, whitelabel: true },
        { label: "Funding Program Access", certified: true, whitelabel: true },
        { label: "White-Labeled Branding", certified: false, whitelabel: true },
        { label: "Commission Earnings", certified: true, whitelabel: true },
        { label: "Branding", certified: "Four Corner Funding", whitelabel: "Your Business Name, Logo, <br>and Contact Information" },
        { label: "Client CRM Dashboard", certified: "Limited (basic tracking)", whitelabel: "Full CRM & controls" },
        { label: "Platform Ownership", certified: "Shared", whitelabel: "Full front-end ownership" },
        { label: "Client Submission to FCH", certified: "$800 per client", whitelabel: "$800 per client" },
        { label: "Cost to Join", certified: "$4,997 (or 11×$499.70)", whitelabel: "$6,997 (or 11×$699.70)" },
        { label: "Monthly SaaS Fee (starts Month 12)", certified: "$299/mo", whitelabel: "$399/mo" }
      ]
    },
    activation: {
      subtitle: "Activation Process",
      title: "How to Get Started",
      steps: [
        {
          number: "01",
          title: "Apply & Schedule Your Welcome Call",
          text: "Submit your application and choose a time for onboarding."
        },
        {
          number: "02",
          title: "Complete Your Setup",
          text: "Choose your payment option. We’ll send you your partner dashboard and training access."
        },
        {
          number: "03",
          title: "Start Selling & Earning",
          text: "You’ll get links, marketing materials, and access to live support. Submit deals immediately after activation."
        }
      ]
    },
    growth: {
      title: "Ready to become a Certified or White-Labeled Partner?",
      cta: [
        { text: "Request a Call", link: "/contact" },
        { text: "Apply Now", link: "/contact" }
      ]
    },
    faq: {
      subtitle: "FAQ’S",
      title: "Frequently Asked Questions",
      text: "We help you build the foundation correctly first, so you don’t burn months on denials.",
      items: [
        {
          question: "Can I upgrade from Certified to White-Label later?",
          answer: "Yes, you can apply the value of your Certified investment toward a White-Label upgrade."
        },
        {
          question: "Do I have to fulfill clients myself?",
          answer: "No — we handle fulfillment, onboarding, funding, and support for all submitted clients."
        },
        {
          question: "Can I make money with just referrals?",
          answer: "Absolutely. Many partners simply refer clients and earn funding commissions."
        }
      ]
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
};
