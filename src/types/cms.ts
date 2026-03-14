export interface CTA {
    text: string;
    link: string;
}

export interface ImageAssets {
    bg?: string;
    main?: string;
    small?: string;
    ellipse?: string;
    star?: string;
    paperShape?: string;
}

export interface HeroData {
    title: string;
    text: string;
    cta: CTA;
    images: ImageAssets;
}

export interface ProcessItem {
    number: string;
    icon: string;
    title: string;
    text: string;
}

export interface AboutData {
    subtitle: string;
    title: string;
    text: string;
    successRate: number;
    cta: CTA;
    founder: {
        name: string;
        role: string;
        image: string;
    };
    images: string[];
    infoImage: string;
}

export interface HomeData {
    hero: HeroData;
    process: ProcessItem[];
    about: AboutData;
    buildRight: any; // Simplified for brevity
    howItWorks: any;
    fundability: any;
    businessFunding: any;
    partner: any;
    growthFeatures: any;
    testimonials: any[];
    contact: any;
    faq: any;
    blog: any;
}
