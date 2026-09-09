import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import WhatsAppButton from './WhatsAppButton';

export default function ServiceCard({
  service,
  imageSrc,
  showFull = false,
}) {
  const { isArabic, getLocalizedPath } = useLanguage();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200/80 hover:border-brand-gold/40 shadow-card-soft hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden">
      {/* Image / Graphic Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-900 flex items-center justify-center p-1.5 sm:p-2">
        <img
          src={imageSrc}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-lg"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity pointer-events-none" />
        <span className="absolute bottom-3 start-3 bg-brand-navy/90 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-lg border border-white/10 shadow-sm">
          {service.title}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 group-hover:text-brand-navy transition-colors">
            {service.title}
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            {showFull ? service.fullDesc : service.shortDesc}
          </p>

          {/* Key Benefits List */}
          {service.benefits && (
            <ul className="mt-4 space-y-2">
              {service.benefits.slice(0, showFull ? 4 : 3).map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <Link
            to={getLocalizedPath('/services')}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-brand-navy hover:text-brand-gold transition-colors"
          >
            <span>{isArabic ? 'المزيد من التفاصيل' : 'Learn More'}</span>
            <ArrowIcon className="w-3.5 h-3.5" />
          </Link>

          <WhatsAppButton
            size="sm"
            message={`Hello Riyadh Movers, I would like to inquire about ${service.title}`}
            label={isArabic ? 'حجز سريع' : 'Quick Book'}
          />
        </div>
      </div>
    </div>
  );
}
