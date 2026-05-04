'use client';

import Link from 'next/link';
import { useSiteSettings } from '@/hooks/useCMS';
import { formatAddress } from '@/utils/address';

const quickLinks = [
  { href: '/funding-options', label: 'Funding Options' },
  { href: '/credit-builder', label: 'Credit Builder' },
  { href: '/partner-program', label: 'Partner Program' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/faq', label: 'FAQ' },
];

const legalLinks = [
  { href: '/terms', label: 'Terms of Service' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
  { href: '/disclosure', label: 'Disclosure' },
];

const supportLinks = [
  { href: '/credit-builder', label: 'Credit Builder' },
  { href: 'https://app.fourcornerfunding.com/', label: 'Borrower Portal', external: true },
  { href: 'https://partner.fourcornerfunding.com/', label: 'Partner Portal', external: true },
];

export default function Footer() {
  const { data: response } = useSiteSettings();
  const settings = response?.data;
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer-section-2 fix footer-bg">
      <div className="bg-color">
        <img src="/images/home-2/footer-bg-color.png" alt="Footer background color gradient" />
      </div>
      <div className="footer-shape">
        <img src="/images/home-2/footer-shape.png" alt="Footer decorative background shape" />
      </div>
      <div className="auto-container">
        <div className="footer-top-wrapper">
          <Link href="/" className="footer-logo wow fadeInUp" data-wow-delay=".3s">
            <img style={{ width: '191px' }} src={settings?.footer_logo || "/images/logo-white.png"} alt={`${settings?.site_name || "Four Corner Funding"} white logo`} />
          </Link>
        <div className="social-icon wow fadeInUp" data-wow-delay=".5s">
            {Array.isArray(settings?.social_links) &&
              settings.social_links
                .filter((social) => social?.url) // ignore empty rows
                .map((social, index) => {
                  const platform = (social?.platform || '')
                    .toString()
                    .trim()
                    .toLowerCase();

                  const iconMap = {
                    facebook: 'fa-facebook-f',
                    linkedin: 'fa-linkedin-in',
                    youtube: 'fa-youtube',
                    instagram: 'fa-instagram',
                    pinterest: 'fa-pinterest-p',
                    twitter: 'fa-x-twitter',
                    'twitter (x)': 'fa-x-twitter',
                    x: 'fa-x-twitter',
                  };

                  const iconClass = iconMap[platform];

                  if (!iconClass) return null;

                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className={`fa-brands ${iconClass}`}></i>
                    </a>
                  );
                })}
          </div>
        </div>

        <div className="footer-widget-wrapper style-2">
          <div className="row justify-content-between">
            <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp animated animated" data-wow-delay=".3s"
              style={{ visibility: 'visible', animationDelay: '0.3s', animationName: 'fadeInUp' }}>
              <div className="footer-widget-items mt-30">
                <div className="widget-title mb-25">
                  <h3 className="font-size-24 text-white font-weight-500">Head office</h3>
                </div>
                <div className="footer-content">
                  <p className="text-white" style={{ whiteSpace: 'pre-line' }}>
                    {settings?.site_name || ""} <br />
                    {formatAddress(settings?.address)}
                  </p>
                  <ul className="contact-list-2 mb-4">
                    <li>
                      <a href={`tel:${settings?.phone_number || ""}`}><i className="fa-solid fa-phone me-2"></i>
                        {settings?.phone_number || ""}</a>
                    </li>
                    <li>
                      <a href={`mailto:${settings?.email || ""}`}><i
                        className="fa-solid fa-envelope me-2"></i>
                        {settings?.email || ""}</a>
                    </li>
                  </ul>
                  <div className="footer-btn">
                    <Link href="/pre-qualification" className="footer-cta-btn">
                      Get Pre-Qualified <span className="arrow"><i
                        className="fa-regular fa-arrow-right"></i></span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-1 d-none d-xl-block"></div>
            <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp animated animated" data-wow-delay=".5s"
              style={{ visibility: 'visible', animationDelay: '0.5s', animationName: 'fadeInUp' }}>
              <div className="footer-widget-items mt-30">
                <div className="widget-title mb-25">
                  <h3 className="font-size-24 text-white font-weight-500">Quick Link</h3>
                </div>
                <div className="user-links-area">
                  <ul className="user-links">
                    {quickLinks.map((l) => (
                      <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
                    ))}
                  </ul>
                  <ul className="user-links">
                    {legalLinks.map((l) => (
                      <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-2 col-lg-3 col-md-6 wow fadeInUp animated animated" data-wow-delay=".7s"
              style={{ visibility: 'visible', animationDelay: '0.7s', animationName: 'fadeInUp' }}>
              <div className="footer-widget-items mt-30">
                <div className="widget-title mb-25">
                  <h3 className="font-size-24 text-white font-weight-500">Support</h3>
                </div>
                <ul className="user-links">
                  {supportLinks.map((l) =>
                    l.external ? (
                      <li key={l.label}>
                        <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
                      </li>
                    ) : (
                      <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <p className="footer-text wow fadeInUp" data-wow-delay=".3s">Copyright © {currentYear} {settings?.site_name || "Four Corner Funding"}. All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
