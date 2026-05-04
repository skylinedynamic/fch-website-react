'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSiteSettings } from '@/modules/cms/queries';
import EmailObfuscator from '@/components/common/EmailObfuscator';

const navLinks = [
  { href: '/funding-options', label: 'Funding Options' },
  { href: '/credit-builder', label: 'Credit Builder' },
  { href: '/partner-program', label: 'Partner Program' },
  { href: '/faq', label: 'FAQ' },
  { href: 'https://partner.fourcornerfunding.com/', label: 'Partner Sign In', external: true },
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
        @media (max-width: 1199px) {
          .header-lower .outer-box .btn-style-one,
          .sticky-header .sticky-button {
            display: none !important;
          }
        }
        .sticky-header .sticky-header-btn,
        .mobile-menu .sticky-header-btn {
          margin-top: 2px !important;
          padding: 16px 35px !important;
          visibility: visible !important;
          opacity: 1 !important;
          animation-delay: 0.6s !important;
          animation-name: fadeInUp !important;
        }
      `}} />
      {/* Header Lower */}
      <div className="header-lower">
        <div className="main-box">
          <div className="nav-outer">
            <div className="logo-box">
              <div className="logo">
                <Link href="/">
                  <img
                    src={settings?.header_logo || "/images/black-logo.png"}
                    alt={`${settings?.site_name || "Four Corner Funding"} logo - Black`}
                    title={settings?.site_name || "Four Corner Funding"}
                    style={{ maxHeight: '76px', width: 'auto' }}
                  />
                </Link>
              </div>
            </div>

            <div className="outer-box">
              <nav className="nav main-menu">
                <Navigation />
              </nav>

              <a href="https://app.fourcornerfunding.com/" target="_blank"
                rel="noopener noreferrer"
                className="theme-btn btn-style-one"
                style={{ padding: '24px 35px', marginTop: '10px' }}>
                Borrower Portal
              </a>

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
                <img src={settings?.footer_logo || "/images/logo-white.png"} alt={`${settings?.site_name || "Four Corner Funding"} logo - White`} style={{ maxHeight: '54px', width: 'auto' }} />
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
                <a href="https://app.fourcornerfunding.com/" target="_blank" rel="noopener noreferrer"
                  className="theme-btn btn-style-one sticky-header-btn"
                  data-wow-delay=".6s">
                  Borrower Portal
                </a>
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
            {settings?.social_links?.twitter && <li><a href={settings.social_links.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a></li>}
            {settings?.social_links?.facebook && <li><a href={settings.social_links.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>}
            {settings?.social_links?.linkedin && <li><a href={settings.social_links.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a></li>}
            {settings?.social_links?.pinterest && <li><a href={settings.social_links.pinterest} target="_blank" rel="noopener noreferrer"><i className="fab fa-pinterest-p"></i></a></li>}
            {settings?.social_links?.instagram && <li><a href={settings.social_links.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>}
            {settings?.social_links?.youtube && <li><a href={settings.social_links.youtube} target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a></li>}
            {!settings?.social_links && (
              <>
                <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                <li><a href="#"><i className="fab fa-pinterest"></i></a></li>
                <li><a href="#"><i className="fab fa-instagram"></i></a></li>
              </>
            )}
          </ul>
        </nav>
      </div>

      {/* Sticky Header */}
      <div className="sticky-header">
        <div className="auto-container">
          <div className="inner-container">
            <div className="logo" style={{ width: '176px' }}>
              <Link href="/">
                <img
                  src={settings?.header_logo || "/images/black-logo.png"}
                  alt={`${settings?.site_name || "Four Corner Funding"} logo`}
                  style={{ maxHeight: '76px', width: 'auto' }}
                />
              </Link>
            </div>

            <div className="nav-outer">
              <nav className="main-menu">
                <div className="navbar-collapse show collapse clearfix d-flex">
                  <Navigation className="clearfix" onLinkClick={closeMenu} />
                  <div className="sticky-button" style={{ marginLeft: '45px' }}>
                    <a href="https://app.fourcornerfunding.com/" target="_blank" rel="noopener noreferrer"
                      className="theme-btn btn-style-one sticky-header-btn"
                      data-wow-delay=".6s">
                      Borrower Portal
                    </a>
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
