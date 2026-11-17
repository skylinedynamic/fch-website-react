'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSiteSettings } from '@/hooks/useCMS';
import EmailObfuscator from '@/components/common/EmailObfuscator';
import { BORROWER_PORTAL_URL, PARTNER_PORTAL_URL } from '@/lib/portals';
import { APPLY_PAGE_PATH } from '@/lib/applyForm';
import { APPLY_NOW_LOCATIONS, trackApplyNowClick } from '@/lib/analytics';

const navLinks = [
  { href: '/funding-options', label: 'Funding Options' },
  { href: '/credit-builder', label: 'Credit Builder' },
  { href: '/partner-program', label: 'Partner Program' },
  { href: '/faq', label: 'FAQ' },
  { href: PARTNER_PORTAL_URL, label: 'Partner Sign In', external: true },
  { href: BORROWER_PORTAL_URL, label: 'Borrower Portal', external: true },
];

interface NavigationProps {
  className?: string;
  onLinkClick?: () => void;
}

const Navigation = ({ className, onLinkClick }: NavigationProps) => (
  <ul className={`navigation ${className || ''}`}>
    {navLinks.map((link) => (
      <li key={link.label} onClick={onLinkClick}>
        {link.external ? (
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            {link.label}
          </a>
        ) : (
          <Link href={link.href}>{link.label}</Link>
        )}
      </li>
    ))}
  </ul>
);

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: response } = useSiteSettings();
  const settings = response?.data;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('mobile-menu-visible');
    } else {
      document.body.classList.remove('mobile-menu-visible');
    }
  }, [isMenuOpen]);

  return (
    <header className="main-header header-style-one header-3">
      <style dangerouslySetInnerHTML={{
        __html: `
        .main-header {
          z-index: 9999 !important;
        }
        .header-style-one .main-box .btn-style-one {
          display: inline-flex !important;
        }
        /* Apply Now sits on the dark tab cut into the hero image's top-right
           corner (hero-bg.png: 1860px wide, tab from x=1530, ~18%). The hero
           scales the image to its width on desktop (globals.css), so the tab
           is always 17.7% of the hero (100vw minus its 30px side margins);
           reserving that much keeps the links off it at every width.
           The padding centres the button on the tab (at the button's height it
           spans x 1557-1860, centre 148.5px in from the right edge): that
           distance, less half the button (154px wide, 128px below 1440px)
           and less the gap between the header's right edge and the hero's
           (none below 1700px; 40px from 1700px, where the template widens
           .main-box's side padding from 30px to 70px). */
        .header-lower .outer-box .header-cta {
          display: flex;
          justify-content: flex-end;
          flex-shrink: 0;
          min-width: calc((100vw - 60px) * 0.18 - 40px);
          padding-right: calc((100vw - 60px) * 148.5 / 1860 - 77px);
        }
        @media (min-width: 1200px) and (max-width: 1439.98px) {
          .header-lower .outer-box .header-cta {
            padding-right: calc((100vw - 60px) * 148.5 / 1860 - 64px);
          }
        }
        @media (min-width: 1700px) {
          .header-lower .outer-box .header-cta {
            padding-right: calc((100vw - 60px) * 148.5 / 1860 - 117px);
          }
        }
        /* Six links plus the space kept for the tab only fit in one row with
           the template's 50px gaps from 1680px up; tighten them below that. */
        .header-lower .main-menu .navigation > li:last-child {
          margin-right: 0;
        }
        @media (min-width: 1440px) and (max-width: 1679.98px) {
          .header-lower .main-menu .navigation > li {
            margin-right: 34px;
          }
        }
        @media (min-width: 1200px) and (max-width: 1439.98px) {
          .header-lower .main-menu .navigation > li {
            margin-right: 16px;
          }
          .header-style-one.header-3 .main-box .main-menu {
            margin-right: 16px;
          }
          .header-lower .outer-box .btn-style-one {
            padding: 18px 22px !important;
          }
        }
        /* The sticky header's container stops at 1320px, so it needs the
           tighter spacing at every desktop width to keep the links and Apply Now in a row. */
        .sticky-header.fixed-header .main-menu .navigation > li {
          margin-left: 28px !important;
        }
        .sticky-header.fixed-header .sticky-button {
          margin-left: 12px !important;
        }
        .sticky-header.fixed-header .sticky-header-btn {
          padding: 16px 24px !important;
        }
        /* Below 1200px the hero has no tab, so Apply Now leaves the header bar.
           The template only switches to the mobile menu below 1024px; switch at
           1200px too, or 1024-1199px shows the links wrapped onto two rows and
           no Apply Now at all. The mobile menu carries Apply Now. */
        @media (max-width: 1199.98px) {
          .header-lower .outer-box .header-cta,
          .header-lower .outer-box .btn-style-one,
          .sticky-header .sticky-button,
          .main-header .header-lower .main-menu,
          .main-header .sticky-header .main-menu {
            display: none !important;
          }
          .main-header .header-lower .mobile-nav-toggler,
          .main-header .sticky-header .mobile-nav-toggler {
            display: block;
          }
          .main-header .header-lower .main-box {
            justify-content: space-between;
          }
        }
        .sticky-header.fixed-header .sticky-header-btn,
        .mobile-menu-visible .mobile-menu .sticky-header-btn {
          margin-top: 2px !important;
          padding: 16px 35px !important;
          visibility: visible !important;
          opacity: 1 !important;
          animation-delay: 0.6s !important;
          animation-name: fadeInUp !important;
        }
        /* The sticky header and mobile menu stay in the page while hidden
           (opacity 0) — make sure nothing inside them can be clicked until shown. */
        .sticky-header:not(.fixed-header),
        .sticky-header:not(.fixed-header) *,
        body:not(.mobile-menu-visible) .mobile-menu,
        body:not(.mobile-menu-visible) .mobile-menu * {
          pointer-events: none !important;
        }
      `}} />
      {/* Header Lower */}
      <div className="header-lower">
        <div className="main-box">
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <Image
                    src={settings?.header_logo || "/images/black-logo.png"}
                    alt={`${settings?.site_name || "Four Corner Funding"} logo - Black`}
                    title={settings?.site_name || "Four Corner Funding"}
                    width={250}
                    height={76}
                    style={{ maxHeight: '76px', width: 'auto' }}
                    priority
                  />
                </Link>
              </div>
            </div>

            <div className="outer-box">
              <nav className="nav main-menu">
                <Navigation />
              </nav>

              <div className="header-cta">
                <Link href={APPLY_PAGE_PATH}
                  onClick={() => trackApplyNowClick(APPLY_NOW_LOCATIONS.HEADER)}
                  className="theme-btn btn-style-one apply-now-btn"
                  style={{ padding: '24px 35px', marginTop: '10px' }}>
                  Apply Now
                </Link>
              </div>

              <div className="mobile-nav-toggler" onClick={toggleMenu}>
                <span className="icon lnr-icon-bars"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-menu">
        <div className="menu-backdrop" onClick={closeMenu}></div>
        <nav className="menu-box">
          <div className="upper-box">
            <div className="nav-logo">
              <Link href="/">
                <Image
                  src={settings?.footer_logo || "/images/logo-white.png"}
                  alt={`${settings?.site_name || "Four Corner Funding"} logo - White`}
                  width={180}
                  height={54}
                  style={{ maxHeight: '54px', width: 'auto' }}
                />
              </Link>
            </div>
            <div className="close-btn" onClick={closeMenu}><i className="icon fa fa-times"></i></div>
          </div>

          <div className="navigation-wrapper">
            <Navigation className="clearfix" onLinkClick={closeMenu} />
          </div>

          <ul className="contact-list-one">
            <li>
              <div className="sticky-button">
                <Link href={APPLY_PAGE_PATH}
                  onClick={() => {
                    trackApplyNowClick(APPLY_NOW_LOCATIONS.MOBILE);
                    closeMenu();
                  }}
                  className="theme-btn btn-style-one sticky-header-btn apply-now-btn"
                  data-wow-delay=".6s">
                  Apply Now
                </Link>
              </div>
            </li>
            <li>
              <div className="contact-info-box">
                <i className="icon lnr-icon-phone-handset"></i>
                <span className="title">Call Now</span>
                <a href={`tel:${settings?.phone_number || "8133913333"}`}>{settings?.phone_number || "813-391-3333"}</a>
              </div>
            </li>
            <li>
              <div className="contact-info-box">
                <EmailObfuscator
                  email={settings?.email || "Info@fourcornerfunding.com"}
                  showIcon={true}
                  className=""
                />
              </div>
            </li>
          </ul>

          <ul className="social-links">
            {Array.isArray(settings?.social_links) &&
              settings.social_links
                .filter((social) => social?.url)
                .map((social, index) => {
                  const platform = (social?.platform || '').toString().trim().toLowerCase();
                  const iconMap: Record<string, string> = {
                    facebook: 'fa-facebook-f',
                    linkedin: 'fa-linkedin-in',
                    youtube: 'fa-youtube',
                    instagram: 'fa-instagram',
                    pinterest: 'fa-pinterest-p',
                    twitter: 'fa-x-twitter',
                    x: 'fa-x-twitter',
                  };
                  const iconClass = iconMap[platform];
                  if (!iconClass) return null;
                  return (
                    <li key={index}>
                      <a href={social.url} target="_blank" rel="noopener noreferrer">
                        <i className={`fab ${iconClass}`}></i>
                      </a>
                    </li>
                  );
                })}
          </ul>
        </nav>
      </div>

      {/* Sticky Header */}
      <div className="sticky-header">
        <div className="auto-container">
          <div className="inner-container">
            <div className="logo" style={{ width: '176px' }}>
              <Link href="/">
                <Image
                  src={settings?.header_logo || "/images/black-logo.png"}
                  alt={`${settings?.site_name || "Four Corner Funding"} logo`}
                  width={250}
                  height={76}
                  style={{ maxHeight: '76px', width: 'auto' }}
                />
              </Link>
            </div>

            <div className="nav-outer">
              <nav className="main-menu">
                <div className="navbar-collapse show collapse clearfix d-flex">
                  <Navigation className="clearfix" onLinkClick={closeMenu} />
                  <div className="sticky-button" style={{ marginLeft: '45px' }}>
                    <Link href={APPLY_PAGE_PATH}
                      onClick={() => trackApplyNowClick(APPLY_NOW_LOCATIONS.STICKY)}
                      className="theme-btn btn-style-one sticky-header-btn apply-now-btn"
                      data-wow-delay=".6s">
                      Apply Now
                    </Link>
                  </div>
                </div>
              </nav>

              <div className="mobile-nav-toggler" onClick={toggleMenu}>
                <span className="icon lnr-icon-bars"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
