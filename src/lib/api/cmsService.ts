import { homeData } from '@/data/homeData';
import { blogData, blogCategories, blogTags } from '@/data/blogData';
import { HomeData } from '@/types/cms';

// Use the environment variable for the base URL, ensuring no trailing slash and no duplicate /v1
const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1').replace(/\/+$/, '');

const fetchFromApi = async (endpoint: string, options: RequestInit = {}) => {
  try {
    // Ensure the endpoint starts with a slash
    const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    
    // The .env.local already includes /v1, and website.php routes use /v1/website
    // BUT! website.php defines routes relative to the prefix.
    // Let's check the route again: Route::prefix('v1/website')->group(...)
    // So the full URL is BASE_URL (which has /v1) + /website + ...
    // Wait, if BASE_URL is .../api/v1, and we need .../api/v1/website, then endpoint should just be /website/...
    
    const url = `${API_BASE_URL}${path.replace('/v1', '')}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        ...options.headers,
      },
      next: { revalidate: 0 } // No cache during testing
    });

    if (!response.ok) {
      console.warn(`API error: ${response.status} at ${url}`);
      return null;
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    return null;
  }
};

const transformPost = (post: any) => {
  if (!post) return null;
  
  const publishedAt = post.published_at ? new Date(post.published_at) : new Date(post.created_at);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  return {
    ...post,
    date: publishedAt.getDate().toString(),
    month: months[publishedAt.getMonth()],
    year: publishedAt.getFullYear(),
    author: post.author?.name || 'Admin',
    image: post.featured_image ? 
      (post.featured_image.startsWith('http') ? post.featured_image : `${process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:8000/storage'}/${post.featured_image}`) 
      : '/images/home-1/news/news-01.jpg',
    tags: Array.isArray(post.blog_tag_id) ? post.blog_tag_id : [],
    content: post.content || '',
    title: post.title || '',
    slug: post.slug || '',
    link: `/blog/${post.slug}`,
  };
};

export const getHomeData = async (): Promise<HomeData> => {
  const latestBlogs = await getBlogPosts();
  return {
    ...homeData,
    blog: {
      ...homeData.blog,
      posts: latestBlogs.slice(0, 3) // Use the first 3 dynamic blogs
    }
  };
};

export const getBlogPostBySlug = async (slug: string) => {
  const post = await fetchFromApi(`/website/blogs/${slug}`);
  return post ? transformPost(post) : null;
};

export const getBlogPosts = async (filters: any = {}) => {
  const query = new URLSearchParams();
  if (filters.category) query.append('category', filters.category);
  if (filters.tag) query.append('tag', filters.tag);
  if (filters.search) query.append('search', filters.search);
  
  const data = await fetchFromApi(`/website/blogs?${query.toString()}`);
  if (!data) return [];
  
  const posts = data.data || data;
  return Array.isArray(posts) ? posts.map(transformPost) : [];
};

export const getBlogCategories = async () => {
  const categories = await fetchFromApi('/website/blogs/categories');
  if (!categories) return blogCategories; // Fallback to static if API fails
  return categories.map((cat: any) => ({
    id: cat.slug,
    label: cat.name,
    count: cat.blogs_count || 0
  }));
};

export const getBlogTags = async () => {
  const tags = await fetchFromApi('/website/blogs/tags');
  if (!tags) return blogTags; // Fallback to static if API fails
  return tags.map((tag: any) => tag.name);
};

export const getCreditBuilderData = async () => {
  return {
    hero: {
      title: "Institutional Business Credit Infrastructure — Built for Real Funding Eligibility",
      text: "Four Corner Funding’s Credit Builder is a structured, underwriting-aligned system designed to build, validate, and position your business for real capital access.",
      cta: { text: "Get Pre-Qualified", link: "/pre-qualification" },
      notices: [
        "This is not credit repair.",
        "This is not a vendor list.",
        "This is not instant funding marketing.",
        "This is a compliance-driven credit infrastructure platform built to align your business with real lender expectations."
      ],
      highlights: [
        "Every stage is eligibility-gated.",
        "Every advancement is validated.",
        "Every funding pathway is reviewed — not guessed."
      ]
    },
    about: {
      subtitle: "WHY STRUCTURE MATTERS",
      title: "Most businesses are denied funding not because of revenue — but because their credit profile was built incorrectly.",
      text: "Our system prevents this by enforcing a structured, underwriting-aligned progression model. These mistakes trigger denials, lower approval amounts, and long-term profile damage:",
      features: [
        "Out-of-sequence vendor applications",
        "Incomplete bureau presence",
        "Unverified reporting",
        "Premature funding submissions"
      ]
    },
    fundingNotice: {
      title: "IMPORTANT: HOW FUNDING ACTUALLY WORKS IN THIS SYSTEM",
      text: "Businesses do not always need to reach Tier 4 to be considered for funding. Once your business becomes properly fundable and meets the underwriting profile for a specific financing product, early-stage funding evaluation may be possible.",
      points: [
        "Strengthen your approval profile",
        "Expand financing options",
        "Reduce denial risk"
      ],
      footer: "—not to delay access to capital unnecessarily."
    },
    process: {
      subtitle: "HOW THE SYSTEM WORKS",
      title: "Tier Progression Model",
      steps: [
        {
          number: "TIER 0",
          title: "FOUNDATION & FUNDABILITY VALIDATION",
          text: "Before vendor credit or funding access is considered, your business must meet institutional fundability standards. Our system validates:",
          points: [
            "Legal entity structure",
            "EIN registration alignment",
            "NAICS classification accuracy",
            "Secretary of State consistency",
            "Business address integrity",
            "Domain & professional email alignment",
            "Banking structure",
            "Bureau file presence (where applicable)"
          ],
          footer: "This is where businesses become “fundable.” Access to Tier 1 unlocks only after compliance approval—ensuring your profile is structured correctly before any credit activity begins."
        },
        {
          number: "TIER 1",
          title: "REPORTING VENDOR SEQUENCING",
          text: "Once compliance is confirmed, the platform releases a structured, eligibility-controlled vendor pathway.",
          points: [
            "This is not open vendor browsing.",
            "Each account is released in controlled sequence",
            "Logged inside the system",
            "Monitored for reporting behavior",
            "Verified before advancement",
            "Minimum account thresholds",
            "Confirmed reporting validation",
            "Administrative review"
          ],
          footer: "This protects your profile from denials and prevents stacking risk."
        },
        {
          number: "TIER 2 & 3",
          title: "CREDIT DEPTH & EXPANDED ELIGIBILITY",
          text: "As verified tradelines begin reporting, your profile strengthens and expands in eligibility. The system evaluates: Reporting consistency, Tradeline depth, Payment history, Bureau visibility, and Qualification benchmarks.",
          points: [
            "At this stage, some businesses may already meet the criteria for select funding pathways, depending on: Credit profile strength, Business structure, Industry, Revenue and banking behavior.",
            "Additional accounts are only released when qualification standards are met.",
            "No blind submissions.",
            "No random applications.",
            "No denial stacking."
          ],
          footer: ""
        },
        {
          number: "TIER 4",
          title: "ADVANCED FUNDING READINESS",
          text: "Tier 4 represents a more advanced stage of credit maturity, where your business is positioned for broader funding access and stronger approval potential.",
          points: [
            "At this level, your profile is typically evaluated for:",
            "SBA financing",
            "Business lines of credit",
            "Term loans",
            "Equipment financing",
            "Revenue-based working capital",
            "Unsecured business credit (if qualified)"
          ],
          footer: "Important: Tier 4 is not the first point of funding eligibility—it is where your profile reaches maximum strength, flexibility, and lender alignment. All funding is evaluated through underwriting review. No instant approvals. No open marketplace exposure. No guaranteed outcomes."
        }
      ]
    },
    whatsIncluded: {
      subtitle: "WHAT’S INCLUDED",
      title: "System Features & Infrastructure",
      sections: [
        {
          title: "Compliance & Fundability Engine",
          list: ["Tier 0 validation & correction", "Business structure alignment", "Bureau presence verification"]
        },
        {
          title: "Tier Progression System",
          list: ["Eligibility-gated vendor sequencing", "Structured Tier 1 → Tier 4 advancement", "Reporting verification tracking"]
        },
        {
          title: "Client Portal Access",
          list: ["Real-time tier dashboard", "Progress tracking", "Secure document environment"]
        },
        {
          title: "Funding Readiness Evaluation",
          list: ["Prequalification review", "Underwriting-aligned analysis", "Strategic funding pathway guidance"]
        },
        {
          title: "Structured Support",
          list: ["System-driven checkpoints", "Profile review notifications", "Guided process visibility"]
        }
      ],
      footer: "This is infrastructure access, not a funding guarantee."
    },
    idealUsers: {
      subtitle: "WHO THIS IS FOR",
      title: "Target Profiles & Intent",
      text: "Designed for entrepreneurs seeking structured capital readiness.",
      list: [
        "New businesses establishing credit profiles",
        "Existing businesses strengthening reporting depth",
        "Owners preparing for real financing",
        "Entrepreneurs seeking structured capital readiness"
      ],
      notFor: [
        "Personal credit repair",
        "Guaranteed approval seekers",
        "Instant funding marketing programs"
      ]
    },
    pricing: {
      subtitle: "TRANSPARENT INVESTMENT",
      title: "Implementation Fee",
      badge: "Credit Builder Infrastructure",
      amount: "$2,497",
      sub: "or 6 Monthly Payments of $500",
      note: "<strong>Additional Funding Success Fees</strong><br>If you pursue funding through Four Corner Funding, success-based compensation may apply upon successful funding.<br>• Fees apply only after funding is secured<br>• Fully disclosed prior to submission<br>• No fees tied to credit building or tier advancement",
      footer: "No subscriptions. No hidden costs. No ongoing platform fees."
    },
    growth: {
      title: "BUILT FOR CAPITAL — NOT JUST SCORES",
      description: "Business credit exists for one purpose: Access to capital. Our platform aligns credit development with real funding expectations from day one—helping your business become financeable as early as your profile allows, while continuing to strengthen your position over time.",
      points: ["Reducing denials", "Improving approval quality", "Expanding funding options", "Building long-term capital access"],
      readyTitle: "READY TO BEGIN?",
      readyText: "Start with a structured eligibility review. No hard credit inquiry. Underwriting evaluation required.",
      cta: [
        { text: "Get Pre-Qualified", link: "/pre-qualification" }
      ],
      disclaimer: "Prequalification required. Credit approval, vendor reporting, and funding eligibility are subject to underwriting standards and bureau verification. Results vary based on financial profile and compliance status."
    },
    faq: {
      subtitle: "FREQUENTLY ASKED QUESTIONS",
      title: "Common Inquiries",
      text: "Understanding the path to business credit and funding.",
      items: [
        {
          question: "Do I have to wait until Tier 4 to get funding?",
          answer: "No. Some businesses may qualify for funding review earlier once they become fundable and meet underwriting criteria. Tier progression strengthens your profile and expands your options—it does not delay funding unnecessarily."
        },
        {
          question: "Is this credit repair?",
          answer: "No. This platform structures business credit profiles for funding eligibility. It does not repair personal credit."
        },
        {
          question: "Do you guarantee funding?",
          answer: "No. All funding decisions are subject to underwriting standards, financial review, and eligibility."
        },
        {
          question: "Will this impact my personal credit?",
          answer: "Prequalification does not require a hard inquiry. Some funding products may require a personal guarantee depending on qualification."
        },
        {
          question: "How long does progress take?",
          answer: "Timelines vary based on vendor reporting, payment behavior, and compliance validation."
        },
        {
          question: "Is there a monthly fee?",
          answer: "No. This is a one-time infrastructure investment."
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
        { text: "Get Pre-Qualified", link: "/pre-qualification" }
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
