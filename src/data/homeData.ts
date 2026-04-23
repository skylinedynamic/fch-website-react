import { HomeData } from '@/types/cms';

export const homeData: HomeData = {

  hero: {
    title: "Fast, Flexible Business Funding — Powered by Intelligence",
    text: "Get matched with top funding options in minutes. No hard credit pull. No hidden fees.",
    cta: {
      text: "Get Pre-Qualified",
      link: "/pre-qualification",
    },
    images: {
      bg: "/images/home-3/hero/hero-bg.png",
      main: "/images/home-3/hero/hero-image.png",
      small: "/images/home-3/image.jpeg",
      ellipse: "/images/home-3/hero/ellipse-shape.png",
      star: "/images/home-3/hero/white-star.png",
      paperShape: "/images/home-3/hero/paper-shape.png",
    },
  },
  process: [
    {
      number: "01",
      icon: "flaticon-business-006-target",
      title: "Step 1 – Tell us about your business",
      text: "Submit a quick, no-pressure application in just a few minutes.",
    },
    {
      number: "02",
      icon: "flaticon-business-013-idea",
      title: "Step 2 – Get matched instantly",
      text: "We match you with the best funding programs using our AI-powered engine.",
    },
    {
      number: "03",
      icon: "flaticon-business-057-file",
      title: "Step 3 – Upload docs & get funded",
      text: "Upload your documents, connect with a funding advisor, and access capital fast.",
    },
  ],
  about: {
    subtitle: "Who We Are",
    title: "Where Strategy Meets Funding.",
    text: "Four Corner Holdings, LLC is a Florida-based financial services and funding firm built to empower entrepreneurs and established businesses with strategic access to capital, credit-building systems, and customized lending solutions.",
    successRate: 88,
    cta: {
      text: "Lets Talk With Us",
      link: "/contact",
    },
    founder: {
      name: "Craig Rice",
      role: "Founder",
      image: "/images/home-3/about/craig.png",
    },
    images: ["/images/home-3/about/about-01.jpg", "/images/home-3/business.jpg"],
    infoImage: "/images/home-3/about/about-info.png",
  },
  buildRight: {
    subtitle: "Start A Business",
    title: "Build It Right From Day One",
    text: "Starting a business is one of the best times to do it correctly — before mistakes cost months.",
    list: [
      "Documentation readiness",
      "Identity signals alignment",
      "Entity consistency + compliance",
      "Risk alignment with the funding program",
      "Credit profile maturity + reporting behavior",
    ],
    cta: {
      text: "Start a Business Foundation Path",
      link: "/contact",
    },
    image: "/images/home-3/usa-city.jpg",
    shape: "/images/home-5/shape/shape-image-1.png",
    icon: "flaticon-finance-award-svgrepo-com-1",
  },
  howItWorks: {
    subtitle: "How It Works",
    title: "Unlock Capital Without<br/>the Guesswork.",
    steps: [
      {
        number: "01",
        title: "Assessment",
        text: "We evaluate your business identity, structure, documentation, and credit/fundability signals to determine what you’re eligible for right now.",
      },
      {
        number: "02",
        title: "Two Underwriting Paths",
        text: "Path A: Immediate Eligibility. Path B: Readiness Path to fix blockers and improve approval probability.",
      },
      {
        number: "03",
        title: "Build Business Credit",
        text: "If your profile needs strengthening, we guide legitimate tradelines and progression designed to establish bureau presence and reduce denials.",
      },
      {
        number: "04",
        title: "Underwriting Review",
        text: "Before major funding actions, underwriting confirms readiness, documents, risk alignment, and the correct strategy. Some files clear quickly. Others need structured preparation. The system is built for both.",
      },
    ],
    footerText: "Embrace Innovation, Adapt Quickly, and Lead with Confidence.",
    footerLink: "Consult Now",
  },
  fundability: {
    subtitle: "What Is Fundability?",
    title: "Business Credit & Fundability",
    text: "Starting a business is one of the best times to do it correctly — before mistakes cost months.",
    list: [
      "Documentation readiness",
      "Identity signals alignment",
      "Entity consistency + compliance",
      "Risk alignment with the funding program",
      "Credit profile maturity + reporting behavior",
    ],
    scenarios: {
      title: "Two Common Scenarios We Serve",
      items: [
        {
          id: "established",
          label: "Established Businesses",
          content: "If you already meet program requirements, underwriting may clear you quickly.",
        },
        {
          id: "new",
          label: "New / Early-Stage",
          content: "For new or early-stage businesses, we'll guide you through the foundation-building process.",
        },
      ],
    },
    image: "/images/home-2/choose-us/choose-us-image.png",
    bgImage: "/images/home-2/choose-us/choose-us-bg.jpg",
    shape: "/images/home-2/choose-us/circle-shape.png",
  },
  businessFunding: {
    subtitle: "Funding Outcomes",
    title: "Business Funding For<br/>Every Business",
    slides: [
      {
        image: "/images/home-3/working.jpg.jpeg",
        title: "Working Capital & Growth",
        text: "We offer Business Lines of Credit, Term Loans, Revenue-Based Financing, and profile-based unsecured funding.",
        link: "/working-capital-and-growth",
      },
      {
        image: "/images/home-3/receivables.jpg.jpeg",
        title: "Receivables & Cash Flow",
        text: "We provide A/R Financing, Invoice Factoring, and eligible Purchase Order Financing to support your cash flow.",
        link: "/receivables-and-cash-flow",
      },
      {
        image: "/images/home-3/asset-and-equipment.jpg.jpeg",
        title: "Asset & Equipment",
        text: "We provide equipment and commercial vehicle financing, including heavy or specialty equipment, based on your profile.",
        link: "/asset-and-equipment",
      },
      {
        image: "/images/home-3/sba-programs.jpg.jpeg",
        title: "SBA Programs",
        text: "We provide SBA 7(a), SBA 504, and SBA Microloans for eligible businesses.",
        link: "/sba-programs",
      },
      {
        image: "/images/home-3/business-acquisition.jpg.jpeg",
        title: "Business Acquisition",
        text: "Business Acquisition Financing (structured acquisitions, SBA-backed where eligible, seller note coordination)",
        link: "/business-acquisition",
      },
      {
        image: "/images/home-3/real-estate.jpg.jpeg",
        title: "Real Estate",
        text: "SBA-backed financing for owner-occupied commercial property, refinancing, or expansion.",
        link: "/real-estate",
      },
      {
        image: "/images/home-3/short-term.jpeg",
        title: "Bridge / Short-Term",
        text: "Short-term capital options only when risk and cost make sense",
        link: "/bridge-short-term",
      },
    ],
  },
  partner: {
    subtitle: "Funding Solutions",
    title: "Partner With a Smarter<br/>Business Funding Platform",
    panels: [
      {
        title: "For Partners",
        subtitle: "We Promise: Process, structure, clarity.",
        text: "We Don't Promise: Guaranteed approvals or magical timelines.",
        list: [
          "Commission tracking",
          "Underwriting transparency (read-only)",
          "Structured onboarding + client tracking",
          "Training & resources that reduce denials",
          "Tier-based credit building (when needed)",
        ],
        cta: {
          text: "Apply to Become a Partner",
          link: "https://partner.fourcornerfunding.com/",
        },
      },
      {
        title: "White-label solutions",
        subtitle: "Your Brand. Our Infrastructure.",
        text: "White-label partners operate under their own brand while leveraging FCH’s engines.",
        list: [
          "Branded marketing website + branded portals",
          "Tenant-scoped data isolation",
          "Central underwriting rules (WL cannot alter underwriting)",
          "Training + resources that stay compliance-safe",
        ],
        cta: {
          text: "Request White-Label Information",
          link: "https://partner.fourcornerfunding.com/",
        },
      },
    ],
  },
  growthFeatures: {
    subtitle: "Education / Learning",
    title: "Learn Before You Apply",
    items: [
      {
        icon: "flaticon-finance-Starategic-Invesment",
        title: "Business Credit Fundamentals",
        text: "Understand the difference between personal guarantee and true business credit.",
      },
      {
        icon: "flaticon-finance-customer-1",
        title: "Why Approvals Fail",
        text: "Why structure often matters more than just your credit score.",
      },
      {
        icon: "flaticon-finance-investment-1",
        title: "SBA Basics",
        text: "Detailed breakdowns of 7(a), 504, and Microloans to find the right fit.",
      },
      {
        icon: "flaticon-finance-iteration-1",
        title: "Acquisition Readiness",
        text: "How to prepare your profile for buying a business.",
      },
      {
        icon: "flaticon-finance-Starategic-Invesment",
        title: "A/R Financing",
        text: "Leverage your receivables for immediate cash flow.",
      },
      {
        icon: "flaticon-finance-customer-1",
        title: "Documentation Checklists",
        text: "Know exactly what you need before you apply.",
      },
    ],
  },
  testimonials: [
    {
      text: "Four Corner Funding helped us secure the capital we needed and guided us every step of the way.",
      name: "Austin & Brayden",
      company: "Brotherz Window Cleaning",
      image: "/images/home-3/testimonial/1.png",
    },
    {
      text: "Craig and his team are PERFECT if you’re looking to elevate your business to the next level! The endless help and knowledge they have provided and continue to provide are unmatched.",
      name: "Tints by Medina, LLC",
      company: "",
      image: "/images/home-3/testimonial/Tints By Medina.jpg",
    },
    {
      text: "They were fast, transparent, and did exactly as they said they would.",
      name: "Nicole H.",
      company: "Nothing but Perfection",
      image: "/images/home-3/testimonial/2.png",
    },
    {
      text: "Craig has been fantastic. So helpful in explaining and answering our questions. He is so positive and we always feel so much better after talking to him. We feel we have hope!",
      name: "Todd & Lynn",
      company: "",
      image: "/images/home-3/testimonial/4.avif",
    },
    {
      text: "Good morning! Because you got us funded, we have landed our first job and putting work in all day at the machine shop. I hope you and your family have a happy 1st. Thanks to you, we’ve got one more thing to celebrate!",
      name: "Jose & John",
      company: "GOAT Precision Machining, LLC",
      image: "/images/home-3/testimonial/3.png",
    },
  ],
  contact: {
    subtitle: "Our Contact",
    title: "let's work together",
    text: "We are ready to help your next projects, let’s work together",
    info: {
      phone: "813-391-3333",
      email: "Info@fourcornerfunding.com",
    },
    image: "/images/home-3/contact.png",
  },
  faq: {
    subtitle: "FAQ",
    title: "Have Questions?",
    text: "We help you build the foundation correctly first, so you don’t burn months on denials.",
    cta: {
      text: "View All FAQs",
      link: "/faq",
    },
    items: [
      {
        question: "Can I be approved immediately?",
        answer: "Sometimes, yes. If your business already meets documentation, revenue, and risk requirements for a given program, underwriting may clear you quickly.",
      },
      {
        question: "What if I’m starting a business?",
        answer: "We help you build the foundation correctly first — so you don’t burn months on denials",
      },
      {
        question: "Do you submit applications for me?",
        answer: "No. Applications are borrower-driven after underwriting readiness.",
      },
      {
        question: "Is funding guaranteed?",
        answer: "No. Eligibility is determined through underwriting.",
      },
      {
        question: "Do you pull credit automatically?",
        answer: "No borrower-triggered bureau pulls exist.",
      },
    ],
    image: "/images/home-3/faq-image.jpg",
  },
    blog: {
    subtitle: "Our Blog",
    title: "Insights from Latest Blog",
    posts: [
      {
        date: "20",
        month: "March",
        author: "Admin",
        comments: "02 Comments",
        title: "Financial Errors in Taxes That Can Cost Your Business Thousands",
        link: "/blog/financial-consequences-tax-errors",
        image: "/images/home-1/news/news-01.jpg",
      },
      {
        date: "25",
        month: "March",
        author: "Admin",
        comments: "05 Comments",
        title: "Achieving Work-Life Balance in a Hectic World",
        link: "/blog/work-life-balance-hectic-world",
        image: "/images/home-1/news/news-02.jpg",
      },
      {
        date: "30",
        month: "March",
        author: "Admin",
        comments: "01 Comments",
        title: "Mastering Work-Life Balance While Staying Focused on Business Goals",
        link: "/blog/mastering-work-life-business-goal",
        image: "/images/home-1/news/news-03.jpg",
      },
    ],
  },

};
