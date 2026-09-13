import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Clock,
  Truck,
  HeartHandshake,
  Wrench,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { images } from '../data/images';
import { companyInfo } from '../data/companyInfo';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionTitle from '../components/SectionTitle';
import SEOHead from '../components/SEOHead';
import WhatsAppButton from '../components/WhatsAppButton';
import CallButton from '../components/CallButton';

export default function AboutPage() {
  const { t, isArabic, getLocalizedPath } = useLanguage();

  const valueIcons = [Clock, Wrench, Truck, HeartHandshake];

  const breadcrumbData = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: isArabic ? '/ar' : '/' },
    { name: t.breadcrumbs.about, url: isArabic ? '/ar/about' : '/about' },
  ];

  return (
    <div className="py-8 sm:py-12">
      <SEOHead
        title={t.seo.about.title}
        description={t.seo.about.description}
        keywords={
          isArabic
            ? 'شركة نقل اثاث بالرياض, خبراء نقل العفش, دينا نقل عفش بالرياض, اسطول دينا نقل عفش, نجارين نقل اثاث'
            : 'Moving Company in Riyadh, Riyadh Movers Experts, Professional Movers Riyadh, Relocation Services Saudi Arabia'
        }
        image={images.about}
        breadcrumbs={breadcrumbData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: t.breadcrumbs.about }]} />

        {/* Hero Banner for About */}
        <div className="mb-16 bg-gradient-to-r from-brand-navy-dark via-brand-navy to-slate-900 rounded-3xl text-white p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-gold text-white inline-block">
              {t.about.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {t.about.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed pt-2">
              {t.about.intro}
            </p>
          </div>

          <div className="absolute top-0 end-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Two-column Philosophy & Safe Handling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Visual Container */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-card-soft bg-slate-900 aspect-[16/10] sm:aspect-[4/3] flex items-center justify-center p-2">
            <img
              src={images.about}
              alt={isArabic ? 'أسطول شاحنات دينا مغلقة لنقل وتغليف الأثاث بالرياض - خبراء نقل وتغليف الأثاث' : 'Riyadh Movers Experts - reliable moving company with fleet of enclosed trucks in Riyadh'}
              className="w-full h-full object-contain rounded-xl"
              loading="lazy"
              decoding="async"
            />
          </div>

          {/* Philosophy & Customer-Focused Approach */}
          <div className="space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="p-2 rounded-lg bg-amber-50 text-brand-gold-dark">
                  <HeartHandshake className="w-5 h-5" />
                </span>
                <h2 className="text-2xl font-bold text-slate-900">
                  {t.about.philosophyTitle}
                </h2>
              </div>
              <p className="text-slate-600 leading-relaxed text-base">
                {t.about.philosophyDesc}
              </p>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="p-2 rounded-lg bg-blue-50 text-brand-blue">
                  <ShieldCheck className="w-5 h-5" />
                </span>
                <h3 className="text-2xl font-bold text-slate-900">
                  {t.about.approachTitle}
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-base">
                {t.about.approachDesc}
              </p>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <span className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                  <Wrench className="w-5 h-5" />
                </span>
                <h3 className="text-2xl font-bold text-slate-900">
                  {t.about.safeHandlingTitle}
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-base">
                {t.about.safeHandlingDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Working Principles & Values */}
        <div className="mb-20">
          <SectionTitle
            title={t.about.valuesTitle}
            subtitle={
              isArabic
                ? 'نعمل وفق معايير صارمة تضمن جودة الأداء وسلامة المنقولات في كل خطوة.'
                : 'Core service principles we follow on every residential and commercial relocation.'
            }
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.about.values.map((val, idx) => {
              const IconComp = valueIcons[idx] || ShieldCheck;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-50 text-brand-gold-dark flex items-center justify-center mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {val.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="rounded-3xl bg-slate-900 text-white p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold">
            {isArabic
              ? 'هل ترغب في استشارة فريقنا بخصوص خطة نقلك؟'
              : 'Would You Like to Consult With Our Moving Team?'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            {isArabic
              ? 'تواصل معنا مباشرة لنقدم لك تقييماً دقيقاً لمسكنك وأثاثك ونحدد الموعد المناسب لطلبك.'
              : 'Contact us directly to get an accurate appraisal of your relocation scope and schedule your preferred moving slot.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <WhatsAppButton size="lg" />
            <CallButton size="lg" variant="white" />
            <Link
              to={getLocalizedPath('/contact')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-white/30 hover:bg-white hover:text-slate-900 text-white font-bold text-sm transition-all"
            >
              {t.nav.quoteBtn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
