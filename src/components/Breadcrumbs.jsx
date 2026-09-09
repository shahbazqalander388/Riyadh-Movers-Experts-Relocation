import { ChevronRight, ChevronLeft, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

export default function Breadcrumbs({ items = [] }) {
  const { lang, isArabic, getLocalizedPath } = useLanguage();
  const ChevronIcon = isArabic ? ChevronLeft : ChevronRight;

  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center text-xs sm:text-sm text-slate-500 py-3 mb-6 overflow-x-auto whitespace-nowrap"
    >
      <ol className="flex items-center space-x-2 rtl:space-x-reverse">
        {/* Home */}
        <li className="flex items-center">
          <Link
            to={getLocalizedPath('/')}
            className="flex items-center gap-1.5 text-slate-600 hover:text-brand-gold transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{isArabic ? 'الرئيسية' : 'Home'}</span>
          </Link>
        </li>

        {/* Dynamic Items */}
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
              <ChevronIcon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              {isLast || !item.to ? (
                <span className="font-semibold text-brand-dark" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.to}
                  className="text-slate-600 hover:text-brand-gold transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
