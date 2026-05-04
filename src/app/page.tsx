import { getHomeData } from '@/lib/api/cmsService';
import HeroSection from '@/components/ui/HeroSection';
import ProcessSection from '@/components/ui/ProcessSection';
import AboutSection from '@/components/ui/AboutSection';
import BuildRightSection from '@/components/ui/BuildRightSection';
import HowItWorksSection from '@/components/ui/HowItWorksSection';
import FundabilitySection from '@/components/ui/FundabilitySection';
import BusinessFundingSection from '@/components/ui/BusinessFundingSection';
import PartnerSection from '@/components/ui/PartnerSection';
import GrowthSection from '@/components/ui/GrowthSection';
import TestimonialSection from '@/components/ui/TestimonialSection';
import ContactSection from '@/components/ui/ContactSection';
import FaqSection from '@/components/ui/FaqSection';
import BlogSection from '@/components/ui/BlogSection';

import { Metadata } from 'next';
import { getDynamicMetadata } from '@/lib/metadata';

export async function generateMetadata(): Promise<Metadata> {
  return getDynamicMetadata('/');
}

export default async function Home() {
  const homeData = await getHomeData();
  return (
    <main>
      <HeroSection data={homeData} />
      <ProcessSection data={homeData} />
      <AboutSection data={homeData} />
      <BuildRightSection data={homeData} />
      <HowItWorksSection data={homeData} />
      <FundabilitySection data={homeData} />
      <BusinessFundingSection data={homeData} />
      <PartnerSection data={homeData} />
      <GrowthSection data={homeData} />
      <TestimonialSection data={homeData} />
      <ContactSection data={homeData} />
      <FaqSection data={homeData} />
      <BlogSection data={homeData} />
    </main>
  );
}
