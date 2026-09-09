import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, PhoneCall, Truck, ChevronRight, MessageCircle, Mail } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { companyInfo } from '../data/companyInfo';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, lang, isArabic, getLocalizedPath } = useLanguage();
  const location = useLocation();

  // Handle scroll state for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: getLocalizedPath('/'), label: t.nav.home, sectionId: 'home' },
    { to: getLocalizedPath('/about'), label: t.nav.about, sectionId: 'about' },
    { to: getLocalizedPath('/services'), label: t.nav.services, sectionId: 'services' },
    { to: getLocalizedPath('/gallery'), label: t.nav.gallery, sectionId: 'gallery' },
    { to: getLocalizedPath('/faq'), label: t.nav.faq, sectionId: 'faq' },
    { to: getLocalizedPath('/contact'), label: t.nav.contact, sectionId: 'contact' },
  ];

  const handleNavClick = (e, link) => {
    const isHome = location.pathname === '/' || location.pathname === '/ar';
    if (isHome && link.sectionId) {
      const el = document.getElementById(link.sectionId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
        const basePath = isArabic ? '/ar' : '/';
        const targetUrl = link.sectionId === 'home' ? basePath : `${basePath === '/' ? '' : basePath}#${link.sectionId}`;
        window.history.replaceState(null, '', targetUrl);
        setIsOpen(false);
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-slate-200/80'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      {/* Top info sub-bar (Visible on Mobile & Desktop) */}
      <div className="bg-brand-navy text-slate-200 text-[11px] sm:text-xs py-2 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* Slogan - Desktop only */}
          <div className="hidden lg:flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-brand-gold-light">
              <Truck className="w-3.5 h-3.5" />
              <span>{isArabic ? 'خدمات نقل عفش معتمدة بالرياض' : 'Professional Movers & Packers in Riyadh'}</span>
            </span>
            <span className="text-slate-400">|</span>
            <span>{isArabic ? companyInfo.workingHours.ar : companyInfo.workingHours.en}</span>
          </div>

          {/* Contact Details (Phone & Email) - Displayed in both Mobile & Desktop */}
          <div className="w-full lg:w-auto flex items-center justify-between lg:justify-end gap-2 sm:gap-6">
            <a
              href={companyInfo.phoneCallUrl}
              className="flex items-center gap-1.5 text-white hover:text-brand-gold transition-colors font-bold text-[11px] sm:text-xs shrink-0"
              aria-label="Call Phone"
            >
              <PhoneCall className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span dir="ltr">{companyInfo.phone}</span>
            </a>

            <a
              href={`mailto:${companyInfo.email}`}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors text-[10.5px] sm:text-xs shrink-0 truncate max-w-[175px] sm:max-w-none"
              aria-label="Send Email"
            >
              <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
              <span className="truncate">{companyInfo.email}</span>
            </a>

            <a
              href={companyInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors shrink-0"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>{t.nav.whatsapp}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to={getLocalizedPath('/')}
            className="flex items-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold rounded-lg"
            aria-label={t.siteTitle}
          >
            <img
              src="/images/logo.jpg"
              alt="Riyadh Movers Experts"
              className="h-12 sm:h-14 w-auto object-contain rounded-lg border border-slate-200/80 shadow-sm group-hover:scale-105 transition-transform bg-white"
            />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight leading-none group-hover:text-brand-navy transition-colors">
                {isArabic ? 'خبراء الرياض' : 'Riyadh Movers'}
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-brand-gold-dark tracking-wide uppercase mt-1">
                {isArabic ? 'لنقل وتغليف الأثاث' : '& Experts Relocation'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === getLocalizedPath('/')}
                onClick={(e) => handleNavClick(e, link)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-150 ${
                    isActive
                      ? 'text-brand-gold-dark bg-amber-50/80 font-bold'
                      : 'text-slate-700 hover:text-brand-navy hover:bg-slate-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA & Language Switcher */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4">
            <LanguageSwitcher />

            <Link
              to={getLocalizedPath('/contact')}
              className="inline-flex items-center justify-center px-4.5 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.98]"
            >
              {t.nav.quoteBtn}
            </Link>
          </div>

          {/* Mobile Right Controls: Language & Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher variant="pill" />

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-expanded={isOpen}
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div
          className="fixed inset-0 top-[116px] z-50 bg-slate-900/60 backdrop-blur-sm md:hidden animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white w-full max-h-[calc(100vh-116px)] overflow-y-auto p-6 shadow-2xl border-t border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col space-y-1.5" aria-label="Mobile Navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === getLocalizedPath('/')}
                  onClick={(e) => handleNavClick(e, link)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? 'bg-amber-50 text-brand-gold-dark font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`
                  }
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-slate-400 rtl:rotate-180" />
                </NavLink>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
              <Link
                to={getLocalizedPath('/contact')}
                onClick={() => setIsOpen(false)}
                className="w-full flex items-center justify-center py-3 px-4 rounded-xl bg-brand-gold hover:bg-brand-gold-dark text-white font-bold shadow-md transition-all"
              >
                {t.nav.quoteBtn}
              </Link>

              <div className="grid grid-cols-2 gap-2 pt-2">
                <a
                  href={companyInfo.phoneCallUrl}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-slate-200 text-slate-800 font-semibold text-xs bg-slate-50"
                >
                  <PhoneCall className="w-4 h-4 text-brand-gold-dark" />
                  <span>{t.nav.callNow}</span>
                </a>

                <a
                  href={companyInfo.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold text-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.nav.whatsapp}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
