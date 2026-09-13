import { useParams, Link, Navigate } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Truck,
  ShieldCheck,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  Wrench,
  Package,
  Home,
  Building,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { getDistrictBySlug, districtsList } from '../data/districtsData';
import { companyInfo } from '../data/companyInfo';
import { images } from '../data/images';
import Breadcrumbs from '../components/Breadcrumbs';
import FAQAccordion from '../components/FAQAccordion';
import SEOHead from '../components/SEOHead';
import WhatsAppButton from '../components/WhatsAppButton';
import CallButton from '../components/CallButton';

export default function DistrictPage() {
  const { slug } = useParams();
  const { isArabic, getLocalizedPath } = useLanguage();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const district = getDistrictBySlug(slug);

  // If district not found, redirect to districts directory
  if (!district) {
    return <Navigate to={getLocalizedPath('/districts')} replace />;
  }

  const currentLang = isArabic ? 'ar' : 'en';
  const districtName = district.name[currentLang];
  const districtZone = district.zone[currentLang];
  const dispatchTime = district.dispatchTime[currentLang];
  const nearbyRoads = district.nearbyRoads[currentLang].join(' • ');

  // Localized title & meta description
  const pageTitle = district.seoTitle[currentLang];
  const pageDescription = district.seoDescription[currentLang];
  const pageH1 = district.h1[currentLang];
  const tagline = district.tagline[currentLang];

  // Specific high-intent keywords for this district
  const districtKeywords = isArabic
    ? `نقل عفش حي ${districtName} بالرياض, دينا نقل عفش حي ${districtName}, شركة نقل اثاث حي ${districtName}, فك وتركيب غرف نوم حي ${districtName}, نقل عفش ${districtZone}, ارقام نقل عفش بالرياض`
    : `Movers and Packers in ${districtName} Riyadh, House Shifting ${districtName} Riyadh, Furniture Relocation ${districtName}, Dina Moving Truck ${districtName}, Moving Company ${districtName} Riyadh`;

  // WhatsApp Pre-filled message tailored to this district
  const whatsappMessage = isArabic
    ? `السلام عليكم، أحتاج حجز دينا نقل عفش وفك وتركيب في حي ${district.name.ar} بالرياض.`
    : `Hello Riyadh Movers Experts, I need a moving and packing quote for ${district.name.en} district in Riyadh.`;

  // JSON-LD Schemas: MovingCompany (local) + FAQPage + Breadcrumbs
  const districtMovingCompanySchema = {
    '@type': 'MovingCompany',
    '@id': `https://www.riyadhmoversexperts.com/#movingcompany-${district.slug}`,
    name: isArabic
      ? `خبراء نقل وتغليف الأثاث - فرع حي ${district.name.ar}`
      : `Riyadh Movers Experts - ${district.name.en} Branch`,
    url: isArabic
      ? `https://www.riyadhmoversexperts.com/ar/districts/${district.slug}`
      : `https://www.riyadhmoversexperts.com/districts/${district.slug}`,
    telephone: companyInfo.phoneRaw,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: `${district.name.en} (${district.fullName.ar})`,
      containedInPlace: {
        '@type': 'City',
        name: 'Riyadh',
      },
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: district.coordinates.lat,
      longitude: district.coordinates.lng,
    },
    openingHours: 'Mo-Su 00:00-23:59',
    priceRange: '$$',
    currenciesAccepted: 'SAR',
    paymentAccepted: 'Cash, Bank Transfer, Mada',
    serviceType: [
      'House Moving Services',
      'Residential Relocation',
      'Furniture Dismantling and Assembly',
      'Multi-layer Bubble Wrap Packing',
      'Dina Moving Trucks',
      `نقل عفش حي ${district.name.ar}`,
      `دينا نقل عفش حي ${district.name.ar}`,
      'فك وتركيب غرف نوم بالرياض',
    ],
  };

  const districtFaqSchema = {
    '@type': 'FAQPage',
    mainEntity: district.faqs.map((faq) => ({
      '@type': 'Question',
      name: isArabic ? faq.qAr : faq.qEn,
      acceptedAnswer: {
        '@type': 'Answer',
        text: isArabic ? faq.aAr : faq.aEn,
      },
    })),
  };

  const breadcrumbData = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: isArabic ? '/ar' : '/' },
    { name: isArabic ? 'أحياء الرياض' : 'Riyadh Districts', url: isArabic ? '/ar/districts' : '/districts' },
    { name: districtName, url: isArabic ? `/ar/districts/${district.slug}` : `/districts/${district.slug}` },
  ];

  // Accordion formatted FAQs
  const formattedFaqs = district.faqs.map((f) => ({
    q: isArabic ? f.qAr : f.qEn,
    a: isArabic ? f.aAr : f.aEn,
  }));

  // Key services tailored to district
  const districtServices = [
    {
      icon: Home,
      title: isArabic ? `نقل فلل وشقق حي ${districtName}` : `House & Villa Shifting in ${districtName}`,
      desc: isArabic
        ? `خدمة نقل سكنية متكاملة بأسطول دينا مغلقة مع تغليف آمن لكافة الغرف والمحتويات.`
        : `Complete residential moving with enclosed trucks, floor protection, and room-by-room setup.`,
    },
    {
      icon: Wrench,
      title: isArabic ? `فك وتركيب غرف النوم والمطابخ` : `Furniture Carpentry & Bedroom Assembly`,
      desc: isArabic
        ? `نجارون وفنيون متخصصون في فك غرف النوم الوطنية وايكيا، وإعادة تركيبها بدقة متناهية.`
        : `Experienced carpenters for IKEA, Italian, and custom bedroom sets, dining tables, and kitchens.`,
    },
    {
      icon: Package,
      title: isArabic ? `تغليف بابلز وكرتون مقوى فاخر` : `Multi-Layer Bubble & Carton Packing`,
      desc: isArabic
        ? `حماية فائقة للزجاج، التحف، شاشات التلفزيون الكبيرة، والأجهزة المنزلية ضد الصدمات.`
        : `High-grade bubble rolls, stretch film, and heavy-duty cartons protecting fragile chinaware and TVs.`,
    },
    {
      icon: Truck,
      title: isArabic ? `دينا نقل عفش سريعة 24/7` : `Fast Dina Truck Dispatch 24/7`,
      desc: isArabic
        ? `شاحنات دينا مجهزة بأحزمة أمان ومبطنة من الداخل لوصول فوري خلال ${dispatchTime}.`
        : `Padded, enclosed moving trucks dispatched promptly with estimated arrival within ${dispatchTime}.`,
    },
  ];

  // Other nearby districts for cross-linking (Local SEO internal equity)
  const otherDistricts = districtsList
    .filter((d) => d.slug !== district.slug)
    .slice(0, 6);

  return (
    <div className="py-8 sm:py-12">
      <SEOHead
        title={pageTitle}
        description={pageDescription}
        keywords={districtKeywords}
        image={images.servicesBanner}
        schema={[districtMovingCompanySchema, districtFaqSchema]}
        breadcrumbs={breadcrumbData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: isArabic ? 'أحياء الرياض' : 'Riyadh Districts', to: getLocalizedPath('/districts') },
            { label: districtName },
          ]}
        />

        {/* HERO BANNER */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-brand-navy-dark via-brand-navy to-slate-900 text-white p-6 sm:p-10 lg:p-12 shadow-2xl mb-12 border border-white/10">
          <div className="absolute top-0 end-0 w-80 h-80 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-5">
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold bg-brand-gold text-white shadow-sm">
                <MapPin className="w-3.5 h-3.5" />
                <span>{districtZone} — {districtName}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Clock className="w-3.5 h-3.5" />
                <span>{isArabic ? `وصول الدينا خلال: ${dispatchTime}` : `Truck Arrival: ${dispatchTime}`}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-slate-200 border border-white/15">
                <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                <span>{isArabic ? 'خدمة متواصلة 24 ساعة' : 'Available 24/7'}</span>
              </span>
            </div>

            {/* H1 Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              {pageH1}
            </h1>

            {/* Subtitle / Tagline */}
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              {tagline}. {isArabic
                ? `نوفر أسطول سيارات دينا نقل عفش مجهزة بالكامل بالقرب من (${nearbyRoads}) لضمان تلبية طلبك فوراً بأفضل الأسعار وأعلى مستويات الأمان.`
                : `We operate dedicated enclosed Dina moving trucks stationed near ${nearbyRoads} to deliver seamless, scratch-free relocation at competitive rates.`}
            </p>

            {/* Call to Action Triggers */}
            <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <WhatsAppButton
                size="lg"
                message={whatsappMessage}
                label={isArabic ? `احجز دينا بحي ${districtName} عبر واتساب` : `Book on WhatsApp (${districtName})`}
              />

              <CallButton
                size="lg"
                variant="white"
                label={isArabic ? `اتصل الآن: ${companyInfo.phone}` : `Call Now: ${companyInfo.phone}`}
              />
            </div>
          </div>
        </div>

        {/* SECTION 1: DISTRICT FEATURES / FAST DISPATCH */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100/80 text-brand-gold-dark border border-amber-200 inline-block mb-3">
              {isArabic ? 'سرعة الوصول والأمان' : 'Fast Local Dispatch'}
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {isArabic
                ? `دينا نقل عفش مجهزة وسريعة في حي ${districtName}`
                : `Fast Dina Moving Truck Dispatch in ${districtName}`}
            </h2>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              {isArabic
                ? `ندرك أهمية الوقت لسكان حي ${districtName}. لذلك خصصنا شاحنات دينا مغلقة وسائقين على دراية تامة بكافة مداخل ومخارج الحي وشوارعه الرئيسية لسرعة الإنجاز.`
                : `We value your time. Our specialized moving trucks and drivers are intimately familiar with ${districtName} streets and main access roads, guaranteeing swift turnaround.`}
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {districtServices.map((srv, idx) => {
              const IconComp = srv.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-gold/40 transition-all group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-brand-gold text-brand-gold-dark group-hover:text-white flex items-center justify-center mb-5 transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                      {srv.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {srv.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 2: WHY CHOOSE US IN THIS DISTRICT */}
        <section className="mb-16 bg-slate-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-gold text-white inline-block">
              {isArabic ? 'معايير الجودة والضمان' : 'Quality & Protection'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              {isArabic
                ? `لماذا يفضل سكان حي ${districtName} شركة خبراء الرياض لنقل الأثاث؟`
                : `Why Residents in ${districtName} Trust Riyadh Movers Experts`}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {isArabic
                ? `نقدم تجربة نقل استثنائية تجمع بين العمالة الفنية المدربة، والالتزام الصارم بالمواعيد، والأسعار الشفافة بدون أي زيادات غير متوقعة.`
                : `We deliver an effortless relocation journey backed by trained professional movers, punctual schedules, and upfront pricing tailored to your requirements.`}
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-sm text-slate-200">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
                <span>{isArabic ? 'نجارون متخصصون في فك وتركيب غرف النوم وايكيا' : 'Expert carpenters for bedroom dismantling & assembly'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
                <span>{isArabic ? 'تغليف متعدد الطبقات بالبابلز والكرتون والنايلون' : 'Multi-layer bubble wrap & heavy-duty cartons'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
                <span>{isArabic ? 'شاحنات دينا مغلقة ونظيفة تحمي العفش من الغبار' : 'Clean enclosed moving trucks shielded from heat & dust'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-brand-gold shrink-0" />
                <span>{isArabic ? 'تسعير فوري ومباشر عبر واتساب بدون وسيط' : 'Direct instant pricing on WhatsApp with zero middlemen'}</span>
              </div>
            </div>

            <div className="pt-6 flex flex-wrap items-center gap-3">
              <WhatsAppButton
                size="md"
                message={whatsappMessage}
                label={isArabic ? 'تواصل عبر واتساب فوراً' : 'Message on WhatsApp Now'}
              />
              <CallButton
                size="md"
                variant="white"
                label={isArabic ? 'اتصال مباشر' : 'Call Directly'}
              />
            </div>
          </div>
        </section>

        {/* SECTION 3: DISTRICT FAQ */}
        <section className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100/80 text-brand-gold-dark border border-amber-200 inline-block mb-3">
              {isArabic ? 'الأسئلة المتكررة' : 'District FAQs'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              {isArabic
                ? `الأسئلة الشائعة حول نقل الأثاث في حي ${districtName}`
                : `Frequently Asked Questions About Moving in ${districtName}`}
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <FAQAccordion items={formattedFaqs} allowMultiple={true} />
          </div>
        </section>

        {/* SECTION 4: NEARBY RIYADH DISTRICTS (LOCAL SEO INTERNAL LINKING) */}
        <section className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {isArabic ? 'أحياء أخرى نخدمها في الرياض' : 'Other Riyadh Districts We Serve'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {isArabic
                  ? 'نوفر خدمات دينا نقل عفش سريعة في جميع أحياء شمال وشرق ووسط الرياض.'
                  : 'Fast moving truck coverage across all North, East, and Central Riyadh districts.'}
              </p>
            </div>

            <Link
              to={getLocalizedPath('/districts')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-navy hover:text-brand-gold transition-colors"
            >
              <span>{isArabic ? 'استعراض كافة أحياء الرياض' : 'View All Riyadh Districts'}</span>
              <ArrowIcon className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {otherDistricts.map((d) => (
              <Link
                key={d.slug}
                to={`${getLocalizedPath('/districts')}/${d.slug}`}
                className="bg-white p-3 rounded-xl border border-slate-200 hover:border-brand-gold/60 text-center transition-all group shadow-2xs"
              >
                <span className="block text-xs font-bold text-slate-800 group-hover:text-brand-navy transition-colors">
                  {d.name[currentLang]}
                </span>
                <span className="block text-[10px] text-slate-500 mt-0.5">
                  {d.zone[currentLang]}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
