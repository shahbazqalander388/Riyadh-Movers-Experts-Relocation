import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock, Truck, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { companyInfo } from '../data/companyInfo';

export default function Footer() {
  const { t, isArabic, getLocalizedPath } = useLanguage();

  const mainLinks = [
    { to: getLocalizedPath('/'), label: t.nav.home },
    { to: getLocalizedPath('/about'), label: t.nav.about },
    { to: getLocalizedPath('/services'), label: t.nav.services },
    { to: getLocalizedPath('/gallery'), label: t.nav.gallery },
    { to: getLocalizedPath('/faq'), label: t.nav.faq },
    { to: getLocalizedPath('/contact'), label: t.nav.contact },
  ];

  const serviceLinks = t.services.items.slice(0, 6);

  return (
    <footer className="bg-brand-navy-dark text-slate-300 border-t border-slate-800">
      {/* Upper Footer: Main columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand & Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              to={getLocalizedPath('/')}
              className="inline-flex items-center gap-3 group"
            >
              <img
                src="/images/logo.jpg"
                alt={isArabic ? 'شعار شركة خبراء نقل وتغليف الأثاث بالرياض' : 'Riyadh Movers Experts - Moving Company in Riyadh Logo'}
                width="44"
                height="44"
                loading="lazy"
                decoding="async"
                className="h-11 w-auto object-contain rounded-lg bg-white p-0.5 shadow-md"
              />
              <div>
                <span className="text-xl font-extrabold text-white tracking-tight block">
                  {isArabic ? 'خبراء نقل الأثاث' : 'Riyadh Movers'}
                </span>
                <span className="text-xs font-semibold text-brand-gold-light tracking-wide uppercase">
                  {isArabic ? 'بالرياض والمملكة' : '& Experts Relocation'}
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {t.footer.aboutCompany}
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">
                {isArabic ? 'تابعنا على وسائل التواصل' : 'Follow Our Socials'}
              </span>
              <div className="flex items-center gap-2.5">
                {/* Facebook */}
                <a
                  href={companyInfo.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-gold hover:text-white flex items-center justify-center text-slate-300 transition-all"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href={companyInfo.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-gold hover:text-white flex items-center justify-center text-slate-300 transition-all"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a
                  href={companyInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-gold hover:text-white flex items-center justify-center text-slate-300 transition-all"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-sm">
              {mainLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="hover:text-brand-gold transition-colors inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services List (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">
              {t.footer.ourServices}
            </h4>
            <ul className="space-y-2 text-sm">
              {serviceLinks.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`${getLocalizedPath('/services')}/${service.slug}`}
                    className="hover:text-brand-gold transition-colors flex items-center justify-between group"
                  >
                    <span>{service.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-brand-gold transition-colors opacity-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-white font-bold text-sm tracking-wide uppercase">
              {t.footer.contactInfo}
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0 mt-1" />
                <a
                  href={companyInfo.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {t.footer.locationText}
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-gold shrink-0" />
                <a
                  href={companyInfo.phoneCallUrl}
                  className="hover:text-white transition-colors"
                  dir="ltr"
                >
                  {companyInfo.phone}
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-gold shrink-0" />
                <a
                  href={`mailto:${companyInfo.email}`}
                  className="hover:text-white transition-colors text-xs sm:text-sm break-all"
                >
                  {companyInfo.email}
                </a>
              </li>

              <li className="flex items-start gap-2.5 pt-1">
                <Clock className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <span className="text-xs text-slate-400">
                  {t.footer.hoursText}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright */}
      <div className="border-t border-slate-800/80 bg-black/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>{t.footer.copyright}</p>
          <div className="flex items-center gap-4">
            <span>Riyadh, Saudi Arabia</span>
            <span>•</span>
            <a
              href={companyInfo.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-gold-light hover:underline"
            >
              +966 56 469 4614
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
