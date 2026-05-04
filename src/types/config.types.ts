export interface CTA {
    text: string;
    link: string;
}

export interface HeroData {
    title: string;
    text: string;
    cta: CTA;
    images?: {
        bg: string;
        main: string;
        small: string;
        ellipse: string;
        star: string;
        paperShape: string;
    };
}

export interface HomeData {
    hero: HeroData;
    process: Array<{
        number: string;
        icon: string;
        title: string;
        text: string;
    }>;
    about: {
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
    };
    buildRight: {
        subtitle: string;
        title: string;
        text: string;
        list: string[];
        cta: CTA;
        image: string;
        shape: string;
        icon: string;
    };
    howItWorks: {
        subtitle: string;
        title: string;
        steps: Array<{
            number: string;
            title: string;
            text: string;
        }>;
        footerText: string;
        footerLink: string;
    };
    fundability: {
        subtitle: string;
        title: string;
        text: string;
        list: string[];
        scenarios: {
            title: string;
            items: Array<{
                id: string;
                label: string;
                content: string;
            }>;
        };
        image: string;
        bgImage: string;
        shape: string;
    };
    businessFunding: {
        subtitle: string;
        title: string;
        slides: Array<{
            image: string;
            title: string;
            text: string;
            link: string;
        }>;
    };
    partner: {
        subtitle: string;
        title: string;
        panels: Array<{
            title: string;
            subtitle: string;
            text: string;
            list: string[];
            cta: CTA;
        }>;
    };
    growthFeatures: {
        subtitle: string;
        title: string;
        items: Array<{
            icon: string;
            title: string;
            text: string;
        }>;
    };
    testimonials: Array<{
        text: string;
        name: string;
        company: string;
        image: string;
    }>;
    contact: {
        subtitle: string;
        title: string;
        text: string;
        info: {
            phone: string;
            email: string;
        };
        image: string;
    };
    faq: {
        subtitle: string;
        title: string;
        text: string;
        cta: CTA;
        items: Array<{
            question: string;
            answer: string;
        }>;
        image: string;
    };
    blog: {
        subtitle: string;
        title: string;
        posts: any[];
    };
}
