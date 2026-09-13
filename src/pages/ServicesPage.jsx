import { Link, useParams } from 'react-router-dom';
import {
  CheckCircle2,
  PhoneCall,
  MessageCircle,
  Truck,
  ArrowRight,
  ArrowLeft,
  Home,
  Building,
  Briefcase,
  Layers,
  Package,
  ShieldAlert,
  Compass,
  Tag,
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { images, serviceAlts } from '../data/images';
import { companyInfo } from '../data/companyInfo';
import { serviceSeoDetails } from '../data/serviceSeoData';
import Breadcrumbs from '../components/Breadcrumbs';
import SectionTitle from '../components/SectionTitle';
import SEOHead from '../components/SEOHead';
import WhatsAppButton from '../components/WhatsAppButton';
import CallButton from '../components/CallButton';

export default function ServicesPage() {
  const { slug } = useParams();
  const { t, isArabic, getLocalizedPath } = useLanguage();
  const ArrowIcon = isArabic ? ArrowLeft : ArrowRight;

  const getServiceImage = (serviceSlug) => {
    switch (serviceSlug) {
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
      case 'packing-and-moving':
        return images.services.packing;
      case 'loading-unloading':
        return images.services.loading;
      case 'local-moving':
        return images.services.local;
      default:
        return images.services.house;
    }
  };

  // Check if viewing a specific individual service
  const matchedService = slug
    ? t.services.items.find(
        (s) =>
          s.slug === slug ||
          (slug === 'packing-and-moving' && s.slug === 'packing-unpacking') ||
          (slug === 'packing-unpacking' && s.slug === 'packing-unpacking')
      )
    : null;

  const seoKey = slug === 'packing-unpacking' ? 'packing-and-moving' : slug;
  const currentSeo = seoKey && serviceSeoDetails[seoKey] ? serviceSeoDetails[seoKey] : null;

  // 1. INDIVIDUAL SERVICE VIEW
  if (matchedService && currentSeo) {
    const pageTitle = currentSeo.seoTitle[isArabic ? 'ar' : 'en'];
    const pageDescription = currentSeo.seoDescription[isArabic ? 'ar' : 'en'];
    const pageH1 = currentSeo.h1[isArabic ? 'ar' : 'en'];
    const relatedKeywords = currentSeo.relatedKeywords[isArabic ? 'ar' : 'en'];
    const serviceImg = getServiceImage(matchedService.slug);
    const serviceAlt = serviceAlts[matchedService.slug]?.[isArabic ? 'ar' : 'en'] || matchedService.title;

    const singleServiceSchema = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: pageH1,
      description: pageDescription,
      serviceType: currentSeo.primaryKeyword[isArabic ? 'ar' : 'en'],
      provider: {
        '@type': 'MovingCompany',
        name: isArabic ? companyInfo.name.ar : companyInfo.name.en,
        telephone: companyInfo.phone,
        areaServed: 'Riyadh, Saudi Arabia',
      },
    };

    const breadcrumbsData = [
      { name: isArabic ? 'الرئيسية' : 'Home', url: isArabic ? '/ar' : '/' },
      { name: t.breadcrumbs.services, url: isArabic ? '/ar/services' : '/services' },
      { name: pageH1, url: isArabic ? `/ar/services/${slug}` : `/services/${slug}` },
    ];

    const otherServices = t.services.items.filter((s) => s.id !== matchedService.id).slice(0, 3);

    return (
      <div className="py-8 sm:py-12">
        <SEOHead
          title={pageTitle}
          description={pageDescription}
          keywords={relatedKeywords ? relatedKeywords.join(', ') : undefined}
          image={serviceImg}
          schema={singleServiceSchema}
          breadcrumbs={breadcrumbsData}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <Breadcrumbs
            items={[
              { label: t.breadcrumbs.services, to: getLocalizedPath('/services') },
              { label: pageH1 },
            ]}
          />

          {/* Hero Header for Service */}
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100/70 text-brand-gold-dark border border-amber-200 inline-block mb-3">
              {isArabic ? 'خدمات نقل معتمدة بالرياض' : 'Professional Movers in Riyadh'}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {pageH1}
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
              {pageDescription}
            </p>

            {/* Related Keyword Tags */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {relatedKeywords.map((kw, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200"
                >
                  <Tag className="w-3 h-3 text-brand-gold shrink-0" />
                  <span>{kw}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Main Service Card */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-card-soft overflow-hidden transition-all mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Visual Side (5 cols) */}
              <div className="lg:col-span-5 h-full">
                <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full w-full bg-slate-900 overflow-hidden min-h-[300px] lg:min-h-[440px] flex items-center justify-center p-2 sm:p-4">
                  <img
                    src={serviceImg}
                    alt={serviceAlt}
                    loading="eager"
                    decoding="async"
                    className="w-full h-full object-contain max-h-[440px] rounded-xl"
                  />
                </div>
              </div>

              {/* Content Side (7 cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 lg:p-12">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
                  {matchedService.title}
                </h2>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                  {matchedService.fullDesc}
                </p>

                {/* Benefits */}
                <div className="mb-8">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                    {isArabic ? 'مزايا ومعايير الخدمة:' : 'Service Highlights:'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {matchedService.benefits.map((b, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                  <WhatsAppButton
                    size="md"
                    message={`Hello Riyadh Movers, I want to book or ask for a quote regarding ${pageH1}`}
                    label={isArabic ? 'حجز عبر واتساب' : 'Book via WhatsApp'}
                  />

                  <CallButton
                    size="md"
                    variant="outline"
                    label={isArabic ? 'اتصال مباشر' : 'Call Directly'}
                  />

                  <Link
                    to={getLocalizedPath('/contact')}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-brand-gold px-3 py-2 transition-colors ms-auto"
                  >
                    <span>{isArabic ? 'طلب تسعيرة مخصصة' : 'Request Custom Quote'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Related Moving Services in Riyadh */}
          <div className="mb-16">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-6">
              {isArabic ? 'خدمات نقل أخرى ذات صلة في الرياض' : 'Related Moving Services in Riyadh'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {otherServices.map((other) => (
                <Link
                  key={other.id}
                  to={`${getLocalizedPath('/services')}/${other.slug}`}
                  className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all group flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-navy transition-colors mb-2">
                      {other.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {other.shortDesc}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-gold-dark mt-4">
                    <span>{isArabic ? 'عرض التفاصيل' : 'View Details'}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom CTA Block */}
          <div className="rounded-3xl bg-brand-navy text-white p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-3xl font-bold">
              {isArabic
                ? 'هل ترغب في حجز هذه الخدمة أو استشارة فريقنا؟'
                : 'Ready to Book This Service in Riyadh?'}
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
              {isArabic
                ? 'فريق خبراء نقل وتغليف الأثاث بالرياض متواجد 24 ساعة لخدمتكم بأفضل الأسعار وأحدث الشاحنات.'
                : 'Riyadh Movers Experts operates 24/7 across all Riyadh neighborhoods. Contact us today for reliable moving.'}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
              <WhatsAppButton
                size="lg"
                label={isArabic ? 'تواصل معنا الآن' : 'Discuss on WhatsApp'}
              />
              <Link
                to={getLocalizedPath('/services')}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-all"
              >
                {isArabic ? 'كافة خدمات النقل' : 'View All Services'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. FULL CATALOG OVERVIEW VIEW (When no slug is specified)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: t.services.items.map((srv, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: srv.title,
        description: srv.shortDesc,
        provider: {
          '@type': 'MovingCompany',
          name: isArabic ? companyInfo.name.ar : companyInfo.name.en,
          telephone: companyInfo.phone,
          areaServed: 'Riyadh, Saudi Arabia',
        },
      },
    })),
  };

  const breadcrumbData = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: isArabic ? '/ar' : '/' },
    { name: t.breadcrumbs.services, url: isArabic ? '/ar/services' : '/services' },
  ];

  return (
    <div className="py-8 sm:py-12">
      <SEOHead
        title={t.seo.services.title}
        description={t.seo.services.description}
        keywords={
          isArabic
            ? 'خدمات نقل اثاث بالرياض, دينا نقل عفش بالرياض, فك وتركيب غرف نوم, تغليف بابلز, نقل مكاتب بالرياض, نقل فلل بالرياض'
            : 'Moving Services Riyadh, House Shifting Riyadh, Furniture Movers Riyadh, Packing and Moving Riyadh, Office Relocation Riyadh'
        }
        image={images.servicesBanner}
        schema={serviceSchema}
        breadcrumbs={breadcrumbData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: t.breadcrumbs.services }]} />

        {/* Hero Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100/70 text-brand-gold-dark border border-amber-200 inline-block mb-3">
            {t.services.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.services.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.services.subtitle}
          </p>
        </div>

        {/* Detailed Service Cards (Alternating Layout) */}
        <div className="space-y-16 lg:space-y-24">
          {t.services.items.map((service, idx) => {
            const isEven = idx % 2 === 0;
            const imgSrc = getServiceImage(service.slug);

            return (
              <div
                key={service.id}
                id={service.slug}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-card-soft overflow-hidden transition-all duration-300 hover:shadow-card-hover"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                  {/* Visual Side (5 cols) */}
                  <div
                    className={`lg:col-span-5 h-full ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full w-full bg-slate-900 overflow-hidden min-h-[280px] lg:min-h-[400px] flex items-center justify-center p-2 sm:p-4">
                      <img
                        src={imgSrc}
                        alt={serviceAlts[service.slug]?.[isArabic ? 'ar' : 'en'] || service.title}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-contain max-h-[440px] rounded-xl"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:hidden pointer-events-none rounded-xl" />
                      <span className="absolute top-4 start-4 bg-brand-navy/90 text-brand-gold-light text-xs font-bold px-3 py-1 rounded-full border border-white/10 shadow-sm">
                        {`0${idx + 1}`}
                      </span>
                    </div>
                  </div>

                  {/* Content Side (7 cols) */}
                  <div
                    className={`lg:col-span-7 p-6 sm:p-8 lg:p-12 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-brand-gold-dark">
                        {isArabic ? 'خدمات نقل معتمدة' : 'Verified Moving Service'}
                      </span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                      <Link
                        to={`${getLocalizedPath('/services')}/${service.slug}`}
                        className="hover:text-brand-gold transition-colors"
                      >
                        {service.title}
                      </Link>
                    </h2>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                      {service.fullDesc}
                    </p>

                    {/* Benefit Checklist */}
                    <div className="mb-8">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                        {isArabic ? 'مزايا ومعايير الخدمة:' : 'Service Highlights:'}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.benefits.map((b, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                            <span>{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Service CTA Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
                      <WhatsAppButton
                        size="md"
                        message={`Hello Riyadh Movers, I want to book or ask for a quote regarding ${service.title}`}
                        label={isArabic ? 'حجز عبر واتساب' : 'Book via WhatsApp'}
                      />

                      <CallButton
                        size="md"
                        variant="outline"
                        label={isArabic ? 'اتصال مباشر' : 'Call Directly'}
                      />

                      <Link
                        to={`${getLocalizedPath('/services')}/${service.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-navy hover:text-brand-gold px-3 py-2 transition-colors ms-auto"
                      >
                        <span>{isArabic ? 'صفحة الخدمة والتفاصيل' : 'View Service Page'}</span>
                        <ArrowIcon className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <div className="mt-20 rounded-3xl bg-brand-navy text-white p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold">
            {isArabic
              ? 'هل لديك متطلبات نقل خاصة أو أكثر من موقع؟'
              : 'Do You Have Custom Relocation Needs in Riyadh?'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto">
            {isArabic
              ? 'نحن مرنون تماماً وجاهزون لتخصيص خطة نقل وشاحنات وعمالة تناسب رغباتك بدقة.'
              : 'We provide fully customizable relocation solutions across Riyadh with dedicated trucks and specialized crews.'}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-2">
            <WhatsAppButton
              size="lg"
              label={isArabic ? 'تواصل معنا لشرح متطلباتك' : 'Discuss on WhatsApp'}
            />
            <Link
              to={getLocalizedPath('/contact')}
              className="px-6 py-3 rounded-xl bg-white text-brand-navy font-bold text-sm hover:bg-slate-100 transition-all"
            >
              {t.nav.quoteBtn}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
