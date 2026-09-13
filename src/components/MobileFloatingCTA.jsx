import { MessageCircle, PhoneCall } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { useLanguage } from '../hooks/useLanguage';

export default function MobileFloatingCTA() {
  const { t, isArabic } = useLanguage();

  const prefilledText = isArabic
    ? 'السلام عليكم، أرغب في الاستفسار وحجز دينا نقل عفش بالرياض.'
    : 'Hello Riyadh Movers Experts, I would like to inquire about moving services in Riyadh.';

  const whatsappLink = `https://wa.me/966564694614?text=${encodeURIComponent(prefilledText)}`;

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 pt-2 pb-[calc(0.5rem+env(safe-area-inset-bottom,0px))] shadow-[0_-4px_25px_rgba(0,0,0,0.12)] transition-transform duration-300"
      role="region"
      aria-label={isArabic ? 'أزرار التواصل السريع' : 'Quick contact actions'}
    >
      {/* Mini 24/7 Availability Indicator */}
      <div className="flex items-center justify-center gap-1.5 pb-1 text-[10px] font-semibold text-slate-600">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span>{isArabic ? 'طاقم العمل والدينا متواجدون الآن على مدار 24 ساعة' : 'Moving crew & Dina trucks active 24/7'}</span>
      </div>

      <div className="max-w-md mx-auto grid grid-cols-2 gap-2.5">
        {/* WhatsApp Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm active:scale-[0.98] transition-all"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span className="truncate">{t.floatingCta.whatsapp}</span>
        </a>

        {/* Call Now Button */}
        <a
          href="tel:+966564694614"
          className="flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-navy-light text-white py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm shadow-sm active:scale-[0.98] transition-all"
        >
          <PhoneCall className="w-4 h-4 shrink-0 text-brand-gold" />
          <span className="truncate">{t.floatingCta.call}</span>
        </a>
      </div>
    </div>
  );
}
