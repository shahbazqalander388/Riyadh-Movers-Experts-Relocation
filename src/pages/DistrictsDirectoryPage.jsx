import { Link } from 'react-router-dom';
import { MapPin, Truck, Clock, ArrowRight, ArrowLeft, ShieldCheck, ChevronRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { districtsList } from '../data/districtsData';
import { companyInfo } from '../data/companyInfo';
import { images } from '../data/images';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionTitle from '../components/SectionTitle';
import SEOHead from '../components/SEOHead';
import WhatsAppButton from '../components/WhatsAppButton';
import CallButton from '../components/CallButton';

export default function DistrictsDirectoryPage() {
  const { t, isArabic, getLocalizedPath } = useLanguage();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;
  const currentLang = isArabic ? 'ar' : 'en';

  const breadcrumbData = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: isArabic ? '/ar' : '/' },
    { name: isArabic ? 'أحياء الرياض' : 'Riyadh Districts', url: isArabic ? '/ar/districts' : '/districts' },
  ];

  // Group districts by zone for clean presentation
  const zones = [
    {
      id: 'north',
      title: isArabic ? 'أحياء شمال الرياض' : 'North Riyadh Districts',
      items: districtsList.filter((d) => d.zone.en.includes('North')),
    },
    {
      id: 'central',
      title: isArabic ? 'أحياء وسط الرياض' : 'Central Riyadh Districts',
      items: districtsList.filter((d) => d.zone.en.includes('Central')),
    },
    {
      id: 'east',
      title: isArabic ? 'أحياء شرق الرياض' : 'East Riyadh Districts',
      items: districtsList.filter((d) => d.zone.en.includes('East')),
    },
  ];

  return (
    <div className="py-8 sm:py-12">
      <SEOHead
        title={t.seo.districts.title}
        description={t.seo.districts.description}
        image={images.servicesBanner}
        breadcrumbs={breadcrumbData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: isArabic ? 'أحياء الرياض' : 'Riyadh Districts' }]} />

        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100/80 text-brand-gold-dark border border-amber-200 inline-block mb-3">
            {isArabic ? 'تغطية شاملة لكافة الأحياء' : 'Complete Riyadh Coverage'}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {isArabic ? 'دينا نقل عفش في جميع أحياء الرياض' : 'Movers and Packers in Riyadh Districts'}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {isArabic
              ? 'نقدم خدمات نقل وتغليف وفك وتركيب الأثاث بأسطول دينا مغلق وسريع يغطي جميع أحياء شمال، شرق، وسط، وغرب الرياض مع وصول سريع خلال 30 إلى 45 دقيقة.'
              : 'Fast, professional moving, packing, and furniture assembly with enclosed Dina moving trucks stationed across all Riyadh districts.'}
          </p>
        </div>

        {/* Districts by Zone */}
        <div className="space-y-12 mb-16">
          {zones.map((zone) => (
            <div key={zone.id} className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-brand-gold/20 text-brand-gold-dark flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {zone.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {zone.items.map((district) => (
                  <Link
                    key={district.slug}
                    to={`${getLocalizedPath('/districts')}/${district.slug}`}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-brand-gold/60 hover:shadow-md transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-brand-navy transition-colors">
                          {isArabic ? `حي ${district.name.ar}` : `${district.name.en} District`}
                        </span>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                          {district.zone[currentLang]}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
                        {district.tagline[currentLang]}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-brand-gold-dark">
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{district.dispatchTime[currentLang]}</span>
                      </span>
                      <span className="flex items-center gap-1 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                        <span>{isArabic ? 'التفاصيل والحجز' : 'View & Book'}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Fast Booking Support */}
        <div className="bg-gradient-to-r from-brand-navy-dark via-brand-navy to-slate-900 rounded-3xl p-8 sm:p-10 text-white text-center space-y-5 shadow-xl">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-gold text-white inline-block">
            {isArabic ? 'خدمة فورية على مدار 24 ساعة' : '24/7 Rapid Moving Dispatch'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {isArabic ? 'هل تحتاج دينا نقل عفش في حيك الآن؟' : 'Need Moving Services in Your Neighborhood Today?'}
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            {isArabic
              ? 'تواصل معنا مباشرة عبر الهاتف أو واتساب وسنقوم بإرسال أقرب دينا نقل عفش وفريق نجارين إلى موقعك فوراً.'
              : 'Contact us directly on WhatsApp or phone. Our nearest moving crew and enclosed truck will be dispatched to your location.'}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <WhatsAppButton
              size="lg"
              label={isArabic ? 'حجز فوري عبر واتساب' : 'Instant WhatsApp Booking'}
            />
            <CallButton
              size="lg"
              variant="white"
              label={isArabic ? `اتصل بنا: ${companyInfo.phone}` : `Call Now: ${companyInfo.phone}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
