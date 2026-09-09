import { Link } from 'react-router-dom';
import { Truck, Home, ArrowRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import SEOHead from '../components/SEOHead';

export default function NotFoundPage() {
  const { t, isArabic, getLocalizedPath } = useLanguage();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div className="py-20 sm:py-28 text-center">
      <SEOHead
        title={t.seo.notFound.title}
        description={t.seo.notFound.description}
      />

      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="w-20 h-20 rounded-3xl bg-amber-50 text-brand-gold-dark flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Truck className="w-10 h-10" />
        </div>

        <span className="text-sm font-bold text-brand-gold uppercase tracking-wider block mb-2">
          ERROR 404
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
          {t.notFound.title}
        </h1>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
          {t.notFound.desc}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            to={getLocalizedPath('/')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white text-sm font-bold shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>{t.notFound.backHome}</span>
          </Link>

          <Link
            to={getLocalizedPath('/services')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 text-sm font-semibold transition-all"
          >
            <span>{t.notFound.viewServices}</span>
            <ArrowIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
