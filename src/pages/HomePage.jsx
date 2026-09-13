import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  ShieldCheck,
  Clock,
  BadgeDollarSign,
  Truck,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  Sparkles,
  MapPin,
  CalendarCheck,
  ChevronRight,
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { images } from '../data/images';
import { companyInfo } from '../data/companyInfo';
import { districtsList } from '../data/districtsData';
import SectionTitle from '../components/SectionTitle';
import ServiceCard from '../components/ServiceCard';
import FAQAccordion from '../components/FAQAccordion';
import SEOHead from '../components/SEOHead';
import WhatsAppButton from '../components/WhatsAppButton';
import CallButton from '../components/CallButton';

export default function HomePage() {
  const { t, isArabic, getLocalizedPath } = useLanguage();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  // ScrollSpy: Dynamically update address bar URL as user scrolls through sections
  useEffect(() => {
    const sections = [
      { id: 'about', hash: '#about' },
      { id: 'services', hash: '#services' },
      { id: 'gallery', hash: '#gallery' },
      { id: 'districts', hash: '#districts' },
      { id: 'faq', hash: '#faq' },
      { id: 'contact', hash: '#contact' },
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;
      const basePath = isArabic ? '/ar' : '/';

      if (window.scrollY < 180) {
        if (window.location.hash) {
          window.history.replaceState(null, '', basePath);
        }
        return;
      }

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            const targetUrl = `${basePath === '/' ? '' : basePath}${sections[i].hash}`;
            if (window.location.hash !== sections[i].hash) {
              window.history.replaceState(null, '', targetUrl);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isArabic]);

  // Benefit icons mapping
  const benefitIcons = {
    team: Users,
    safety: ShieldCheck,
    reliability: Clock,
    pricing: BadgeDollarSign,
  };

  // Why choose us icons mapping
  const whyIcons = [
    ShieldCheck,
    Sparkles,
    Truck,
    Users,
    MessageCircle,
    CalendarCheck,
  ];

  // Helper to get image for each service
  const getServiceImage = (slug) => {
    switch (slug) {
      case 'house-moving':
        return images.services.house;
      case 'villa-moving':
        return images.services.villa;
      case 'apartment-moving':
        return images.services.apartment;
      case 'office-moving':
        return images.services.office;
      case 'furniture-moving':
        return images.services.furniture;
      case 'packing-unpacking':
        return images.services.packing;
      case 'loading-unloading':
        return images.services.loading;
      case 'local-moving':
        return images.services.local;
      default:
        return images.services.house;
    }
  };

  // FAQ Schema for the 8 visible FAQs on Home Page
  const homeFaqSchema = {
    '@type': 'FAQPage',
    mainEntity: t.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  };

  return (
    <div>
      <SEOHead
        title={t.seo.home.title}
        description={t.seo.home.description}
        keywords={
          isArabic
            ? 'نقل عفش بالرياض, شركة نقل اثاث بالرياض, دينا نقل عفش بالرياض, فك وتركيب غرف نوم بالرياض, اسعار نقل العفش بالرياض, تغليف اثاث بالرياض, دينا نقل عفش شمال الرياض'
            : 'Movers and Packers in Riyadh, House Shifting Services Riyadh, Furniture Relocation Riyadh, Moving Company in Riyadh, Cheap Movers Riyadh, Villa Relocation Riyadh'
        }
        image={images.hero}
        schema={homeFaqSchema}
      />

      {/* 1. HERO SECTION */}
      <section id="home" className="relative bg-gradient-to-b from-brand-navy-dark via-brand-navy to-slate-900 text-white overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Subtle background glow */}
        <div className="absolute top-0 end-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 start-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-start">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-brand-gold-light text-xs sm:text-sm font-semibold backdrop-blur-sm">
                <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                <span>{t.hero.badge}</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                {t.hero.title}
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.hero.description}
              </p>

              {/* Feature Highlights */}
              <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-x-5 gap-y-2.5 text-xs sm:text-sm text-slate-200">
                {t.hero.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Hero Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
                <WhatsAppButton
                  label={t.hero.whatsappCta}
                  size="lg"
                  className="w-full sm:w-auto"
                />

                <CallButton
                  label={t.hero.callCta}
                  size="lg"
                  variant="white"
                  className="w-full sm:w-auto"
                />
              </div>
            </div>

            {/* Right Hero Image (5 cols) */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Decorative border frame */}
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-brand-gold to-sky-400/50 rounded-3xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

                <div className="relative rounded-2xl overflow-hidden bg-slate-900 shadow-2xl border border-white/10 aspect-[16/10] sm:aspect-[4/3] flex items-center justify-center p-1 sm:p-2">
                  <img
                    src={images.hero}
                    alt={isArabic ? 'شركة نقل عفش بالرياض - دينا نقل أثاث تابعة لخبراء الرياض لنقل العفش على طريق الملك فهد' : 'Professional Movers in Riyadh - Riyadh Movers Experts truck on King Fahd Road with Riyadh skyline'}
                    className="w-full h-full object-contain sm:object-cover rounded-xl"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />

                  {/* Floating Trust Pill */}
                  <div className="hidden sm:flex absolute bottom-4 start-4 end-4 bg-brand-navy/90 backdrop-blur-md p-3.5 rounded-xl border border-white/10 shadow-lg items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-brand-gold flex items-center justify-center text-white shrink-0">
                        <Truck className="w-4 h-4" />
                      </div>
                      <div className="text-start">
                        <span className="block text-xs font-bold text-white">
                          {isArabic ? 'جاهزون لخدمتك في الرياض' : 'Ready in Riyadh 24/7'}
                        </span>
                        <span className="block text-[11px] text-brand-gold-light" dir="ltr">
                          {companyInfo.phone}
                        </span>
                      </div>
                    </div>

                    <a
                      href={companyInfo.phoneCallUrl}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
                      aria-label="Call Now"
                    >
                      <PhoneCall className="w-4 h-4 text-brand-gold" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST / BENEFITS SECTION */}
      <section id="about" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200/80 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge={t.benefits.badge}
            title={t.benefits.title}
            subtitle={t.benefits.subtitle}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.benefits.cards.map((card) => {
              const IconComponent = benefitIcons[card.id] || ShieldCheck;
              return (
                <div
                  key={card.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all duration-200 group flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-amber-50 group-hover:bg-brand-gold text-brand-gold-dark group-hover:text-white flex items-center justify-center mb-5 transition-colors duration-200">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-navy transition-colors mb-2.5">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SERVICES PREVIEW SECTION */}
      <section id="services" className="py-16 sm:py-24 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge={t.services.badge}
            title={t.services.title}
            subtitle={t.services.subtitle}
          />

          {/* 8 Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {t.services.items.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                imageSrc={getServiceImage(service.slug)}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to={getLocalizedPath('/services')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-brand-navy text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
            >
              <span>{isArabic ? 'استعراض كافة تفاصيل الخدمات' : 'View All Moving Services'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US SECTION */}
      <section id="why-us" className="py-16 sm:py-24 bg-brand-navy text-white relative overflow-hidden scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionTitle
            badge={t.whyChooseUs.badge}
            title={t.whyChooseUs.title}
            subtitle={t.whyChooseUs.subtitle}
            inverted
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {t.whyChooseUs.points.map((point, index) => {
              const IconComp = whyIcons[index] || ShieldCheck;
              return (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 sm:p-7 border border-white/10 hover:border-brand-gold/50 transition-all duration-200"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-gold/20 text-brand-gold-light flex items-center justify-center mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {point.title}
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS SECTION */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-slate-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge={t.howItWorks.badge}
            title={t.howItWorks.title}
            subtitle={t.howItWorks.subtitle}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            {t.howItWorks.steps.map((step, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold text-brand-gold">
                      {step.num}
                    </span>
                    <span className="w-8 h-8 rounded-full bg-amber-50 text-brand-gold-dark font-bold text-xs flex items-center justify-center">
                      ✓
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <WhatsAppButton
              size="lg"
              label={isArabic ? 'ابدأ خطوتك الأولى الآن عبر واتساب' : 'Start Step 1: Message on WhatsApp'}
            />
          </div>
        </div>
      </section>

      {/* 6. GALLERY TEASER SECTION */}
      <section id="gallery" className="py-16 sm:py-20 bg-white border-t border-slate-100 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-amber-100/70 text-brand-gold-dark border border-amber-200 inline-block mb-2">
                {t.gallery.badge}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                {t.gallery.title}
              </h2>
            </div>
            <Link
              to={getLocalizedPath('/gallery')}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-navy hover:text-brand-gold transition-colors"
            >
              <span>{isArabic ? 'مشاهدة المعرض كاملاً' : 'Explore Full Gallery'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Featured Gallery Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.gallery.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                to={getLocalizedPath('/gallery')}
                className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-900 border border-slate-200 shadow-sm flex items-center justify-center p-2"
              >
                <img
                  src={item.src}
                  alt={isArabic ? item.altAr : item.altEn}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity rounded-lg pointer-events-none" />
                <div className="absolute bottom-4 inset-x-4">
                  <p className="text-white font-bold text-sm sm:text-base leading-snug">
                    {isArabic ? item.altAr : item.altEn}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. RIYADH DISTRICTS COVERAGE SECTION (High Impact Local SEO) */}
      <section id="districts" className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200/80 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge={isArabic ? 'أحياء الرياض' : 'Riyadh Districts'}
            title={isArabic ? 'دينا نقل عفش في جميع أحياء ومناطق الرياض' : 'Movers and Packers Across All Riyadh Districts'}
            subtitle={isArabic
              ? 'شاحنات دينا مجهزة متمركزة في شمال، شرق، وسط، وغرب الرياض لتصل إلى منزلك خلال 25 إلى 35 دقيقة مع طاقم فك وتركيب متكامل.'
              : 'Dedicated Dina moving trucks stationed across North, East, and Central Riyadh for fast 25-35 minute response times.'}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
            {districtsList.map((d) => (
              <Link
                key={d.slug}
                to={`${getLocalizedPath('/districts')}/${d.slug}`}
                className="bg-white hover:bg-amber-50/70 p-4 rounded-2xl border border-slate-200/80 hover:border-brand-gold/60 shadow-card-soft hover:shadow-card-hover transition-all duration-200 group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="w-7 h-7 rounded-lg bg-amber-50 group-hover:bg-brand-gold text-brand-gold-dark group-hover:text-white flex items-center justify-center transition-colors">
                      <MapPin className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {d.zone[isArabic ? 'ar' : 'en']}
                    </span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-brand-navy transition-colors">
                    {isArabic ? `حي ${d.name.ar}` : `${d.name.en}`}
                  </h3>
                </div>

                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-brand-gold-dark">
                  <span className="text-slate-500">{d.dispatchTime[isArabic ? 'ar' : 'en']}</span>
                  <ArrowIcon className="w-3 h-3 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to={getLocalizedPath('/districts')}
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-gold transition-colors"
            >
              <span>{isArabic ? 'استعراض دليل كافة أحياء الرياض بالتفصيل' : 'View Full Riyadh Districts Directory'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. FAQ PREVIEW SECTION */}
      <section id="faq" className="py-16 sm:py-24 bg-white border-t border-slate-200/80 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            badge={t.faq.badge}
            title={t.faq.title}
            subtitle={t.faq.subtitle}
          />

          <FAQAccordion items={t.faq.items} defaultOpenIndex={0} />

          <div className="mt-10 text-center">
            <Link
              to={getLocalizedPath('/faq')}
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy hover:text-brand-gold transition-colors"
            >
              <span>{isArabic ? 'عرض صفحة الأسئلة الشائعة والبحث' : 'View Full FAQ Page & Search'}</span>
              <ArrowIcon className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. HIGH-CONVERTING BOTTOM CTA BANNER */}
      <section id="contact" className="py-16 bg-gradient-to-r from-brand-navy-dark via-brand-navy to-brand-navy-light text-white relative scroll-mt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-gold text-white inline-block">
            {isArabic ? 'جاهزون لنقلك بأمان' : 'Ready For A Smooth Move?'}
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight">
            {isArabic
              ? 'احصل على استشارة فورية وعرض سعر لنقل أثاثك بالرياض'
              : 'Get Instant Consultation & Direct Pricing for Your Move in Riyadh'}
          </h2>

          <p className="text-base text-slate-300 max-w-2xl mx-auto">
            {isArabic
              ? 'تواصل معنا مباشرة عبر الهاتف أو واتساب، وفريقنا جاهز للرد على استفساراتك وتحديد الموعد المناسب لك فوراً.'
              : 'Contact us directly via Phone or WhatsApp. Our professional moving crew is available 24/7 across Riyadh.'}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <WhatsAppButton
              size="lg"
              label={isArabic ? 'تواصل عبر واتساب فوراً' : 'Message on WhatsApp'}
            />

            <CallButton
              size="lg"
              variant="white"
              label={isArabic ? `اتصل الآن: ${companyInfo.phone}` : `Call Now: ${companyInfo.phone}`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
