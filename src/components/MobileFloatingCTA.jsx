import { MessageCircle, PhoneCall } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { useLanguage } from '../hooks/useLanguage';

export default function MobileFloatingCTA() {
  const { t, lang } = useLanguage();

  return (
    <div
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300"
      role="region"
      aria-label={lang === 'ar' ? 'أزرار التواصل السريع' : 'Quick contact actions'}
    >
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2.5">
        {/* WhatsApp Button */}
        <a
          href={companyInfo.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 px-3 rounded-xl font-semibold text-sm shadow-sm active:scale-[0.98] transition-all"
        >
          <MessageCircle className="w-4 h-4 shrink-0" />
          <span className="truncate">{t.floatingCta.whatsapp}</span>
        </a>

        {/* Call Now Button */}
        <a
          href={companyInfo.phoneCallUrl}
          className="flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-navy-light text-white py-2.5 px-3 rounded-xl font-semibold text-sm shadow-sm active:scale-[0.98] transition-all"
        >
          <PhoneCall className="w-4 h-4 shrink-0 text-brand-gold" />
          <span className="truncate">{t.floatingCta.call}</span>
        </a>
      </div>
    </div>
  );
}
