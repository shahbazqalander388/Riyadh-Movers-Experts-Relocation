import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';

export default function LanguageSwitcher({ className = '', variant = 'pill' }) {
  const { lang, getOppositeLangPath } = useLanguage();
  const targetPath = getOppositeLangPath();

  if (variant === 'simple') {
    return (
      <Link
        to={targetPath}
        className={`inline-flex items-center gap-1.5 text-sm font-semibold transition-colors duration-150 hover:text-brand-gold ${className}`}
        aria-label={lang === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'}
      >
        <Globe className="w-4 h-4 text-brand-gold" />
        <span>{lang === 'en' ? 'العربية' : 'EN'}</span>
      </Link>
    );
  }

  return (
    <div
      className={`inline-flex items-center p-1 bg-slate-100/90 dark:bg-slate-800/80 rounded-full border border-slate-200 dark:border-slate-700 text-xs font-semibold ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <Link
        to={lang === 'en' ? '#' : targetPath}
        className={`px-2.5 py-1 rounded-full transition-all duration-200 ${
          lang === 'en'
            ? 'bg-brand-navy text-white shadow-sm font-bold'
            : 'text-slate-600 hover:text-brand-dark'
        }`}
        aria-current={lang === 'en' ? 'true' : undefined}
      >
        EN
      </Link>
      <span className="text-slate-300 mx-0.5 select-none">|</span>
      <Link
        to={lang === 'ar' ? '#' : targetPath}
        className={`px-2.5 py-1 rounded-full font-arabic transition-all duration-200 ${
          lang === 'ar'
            ? 'bg-brand-navy text-white shadow-sm font-bold'
            : 'text-slate-600 hover:text-brand-dark'
        }`}
        aria-current={lang === 'ar' ? 'true' : undefined}
      >
        العربية
      </Link>
    </div>
  );
}
