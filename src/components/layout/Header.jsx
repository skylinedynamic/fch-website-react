import Link from 'next/link';

const navLinks = [
  { href: '/funding-options', label: 'Funding Options' },
  { href: '/credit-builder', label: 'Credit Builder' },
  { href: '/partner-program', label: 'Partner Program' },
  { href: '/faq', label: 'FAQ' },
  { href: 'https://partner.fourcornerfunding.com/', label: 'Partner Sign In', external: true },
];

const Navigation = ({ className }) => (
  <ul className={`navigation ${className || ''}`}>
    {navLinks.map((link) => (
      <li key={link.label}>
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

const borrowerPortalStyle = {
  marginTop: '2px',
  padding: '16px 35px',
  visibility: 'visible',
  animationDelay: '0.6s',
  animationName: 'fadeInUp'
};

export default function Header() {
  return (
    <header className="main-header header-style-one header-3">
      <style dangerouslySetInnerHTML={{ __html: `
        .sticky-header .sticky-header-btn,
        .mobile-menu .sticky-header-btn {
          margin-top: 2px !important;
          padding: 16px 35px !important;
          visibility: visible !important;
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
                    src="/images/black-logo.png" 
                    alt="" 
                    title="finclix" 
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

              <div className="mobile-nav-toggler">
                <span className="icon lnr-icon-bars"></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="mobile-menu">
        <div className="menu-backdrop"></div>
        <nav className="menu-box">
          <div className="upper-box">
            <div className="nav-logo">
              <Link href="/">
                <img src="/images/logo-white.png" alt="" style={{ maxHeight: '54px', width: 'auto' }} />
              </Link>
            </div>
            <div className="close-btn"><i className="icon fa fa-times"></i></div>
          </div>

          <div className="navigation-wrapper">
             <Navigation className="clearfix" />
          </div>

          <ul className="contact-list-one">
            <li>
              <div className="sticky-button">
                <a href="https://app.fourcornerfunding.com/" target="_blank" rel="noopener noreferrer"
                   className="theme-btn btn-style-one sticky-header-btn wow fadeInUp animated"
                   data-wow-delay=".6s">
                  Borrower Portal
                </a>
              </div>
            </li>
            <li>
              <div className="contact-info-box">
                <i className="icon lnr-icon-phone-handset"></i>
                <span className="title">Call Now</span>
                <a href="tel:8133913333">813-391-3333</a>
              </div>
            </li>
            <li>
              <div className="contact-info-box">
                <span className="icon lnr-icon-envelope1"></span>
                <span className="title">Send Email</span>
                <a href="mailto:Info@fourcornerfunding.com">Info@fourcornerfunding.com</a>
              </div>
            </li>
          </ul>

          <ul className="social-links">
            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
            <li><a href="#"><i className="fab fa-pinterest"></i></a></li>
            <li><a href="#"><i className="fab fa-instagram"></i></a></li>
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
                  src="/images/black-logo.png" 
                  alt="img" 
                  style={{ maxHeight: '76px', width: 'auto' }} 
                />
              </Link>
            </div>

            <div className="nav-outer">
              <nav className="main-menu">
                <div className="navbar-collapse show collapse clearfix d-flex">
                  <Navigation className="clearfix" />
                  <div className="sticky-button" style={{ marginLeft: '45px' }}>
                    <a href="https://app.fourcornerfunding.com/" target="_blank" rel="noopener noreferrer"
                       className="theme-btn btn-style-one sticky-header-btn wow fadeInUp animated"
                       data-wow-delay=".6s">
                      Borrower Portal
                    </a>
                  </div>
                </div>
              </nav>

              <div className="mobile-nav-toggler">
                <span className="icon lnr-icon-bars"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
