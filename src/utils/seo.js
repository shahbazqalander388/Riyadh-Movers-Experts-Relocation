import { companyInfo } from '../data/companyInfo';

const SITE_URL = 'https://www.riyadhmoversexperts.com';

export function updateSEO({
  title,
  description,
  keywords,
  canonicalPath = '',
  image = '/images/real-9.jpg',
  lang = 'en',
  schema = null,
  breadcrumbs = null,
  noindex = false,
}) {
  // 1. Title
  document.title = title;

  // 2. Helper to set or create meta tag
  const setMeta = (nameOrProperty, attrName, content) => {
    let el = document.querySelector(`meta[${attrName}="${nameOrProperty}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attrName, nameOrProperty);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // Basic Meta
  setMeta('description', 'name', description);
  setMeta('robots', 'name', noindex ? 'noindex, nofollow' : 'index, follow');

  // Local & Keywords Meta
  const defaultKeywords =
    lang === 'ar'
      ? 'نقل عفش بالرياض, شركة نقل اثاث بالرياض, دينا نقل عفش بالرياض, فك وتركيب غرف نوم بالرياض, دينا نقل عفش, اسعار نقل العفش بالرياض, تغليف اثاث بالرياض, نجار فك وتركيب بالرياض, نقل عفش شمال الرياض'
      : 'Movers and Packers in Riyadh, House Shifting Services Riyadh, Furniture Relocation Riyadh, Moving Company in Riyadh, Cheap Movers Riyadh, Villa Relocation Riyadh, Office Movers Riyadh, Furniture Dismantling Assembly Riyadh';
  setMeta('keywords', 'name', keywords || defaultKeywords);

  // Geo Tags for Riyadh Local SEO
  setMeta('geo.region', 'name', 'SA-01');
  setMeta('geo.placename', 'name', 'Riyadh');
  setMeta('geo.position', 'name', '24.748056;46.776631');
  setMeta('ICBM', 'name', '24.748056, 46.776631');

  // Compute Canonical & Alternate URLs
  const cleanPath = canonicalPath.replace(/\/$/, '') || '/';
  const isArabicRoute = cleanPath === '/ar' || cleanPath.startsWith('/ar/');
  const pathWithoutLang = isArabicRoute
    ? cleanPath.replace(/^\/ar(\/|$)/, '/') || '/'
    : cleanPath;

  const enUrl = pathWithoutLang === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathWithoutLang}`;
  const arUrl = pathWithoutLang === '/' ? `${SITE_URL}/ar` : `${SITE_URL}/ar${pathWithoutLang}`;
  const currentCanonicalUrl = lang === 'ar' ? arUrl : enUrl;

  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  // Open Graph
  setMeta('og:title', 'property', title);
  setMeta('og:description', 'property', description);
  setMeta('og:url', 'property', currentCanonicalUrl);
  setMeta('og:image', 'property', fullImage);
  setMeta('og:type', 'property', 'website');
  setMeta('og:site_name', 'property', 'Riyadh Movers Experts');
  setMeta('og:locale', 'property', lang === 'ar' ? 'ar_SA' : 'en_SA');
  setMeta('og:locale:alternate', 'property', lang === 'ar' ? 'en_SA' : 'ar_SA');

  // Twitter / X
  setMeta('twitter:card', 'name', 'summary_large_image');
  setMeta('twitter:title', 'name', title);
  setMeta('twitter:description', 'name', description);
  setMeta('twitter:image', 'name', fullImage);

  // Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]');
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', currentCanonicalUrl);

  // Hreflang alternates
  const setHreflang = (hreflang, href) => {
    let link = document.querySelector(`link[rel="alternate"][hreflang="${hreflang}"]`);
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', hreflang);
      document.head.appendChild(link);
    }
    link.setAttribute('href', href);
  };

  setHreflang('en-SA', enUrl);
  setHreflang('ar-SA', arUrl);
  setHreflang('en', enUrl);
  setHreflang('ar', arUrl);
  setHreflang('x-default', enUrl);

  // JSON-LD Structured Data
  let scriptEl = document.getElementById('json-ld-schema');
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'json-ld-schema';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  // Generate Base Graph: WebSite, Organization, MovingCompany (LocalBusiness)
  const graphElements = [
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: 'Riyadh Movers Experts',
      alternateName: 'خبراء نقل وتغليف الأثاث بالرياض',
      description: 'Professional movers, packers, furniture and relocation services in Riyadh, Saudi Arabia.',
      inLanguage: ['en-SA', 'ar-SA'],
    },
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'Riyadh Movers Experts',
      alternateName: 'خبراء نقل وتغليف الأثاث بالرياض',
      url: `${SITE_URL}/`,
      logo: `${SITE_URL}/images/logo.jpg`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: companyInfo.phoneRaw || '+966564694614',
        contactType: 'customer service',
        areaServed: 'SA',
        availableLanguage: ['Arabic', 'English'],
      },
    },
    {
      '@type': 'MovingCompany',
      '@id': `${SITE_URL}/#movingcompany`,
      name: lang === 'ar' ? companyInfo.name.ar : companyInfo.name.en,
      alternateName: lang === 'ar' ? companyInfo.name.en : companyInfo.name.ar,
      url: currentCanonicalUrl,
      logo: `${SITE_URL}/images/logo.jpg`,
      image: fullImage,
      telephone: companyInfo.phoneRaw || '+966564694614',
      email: companyInfo.email,
      priceRange: '$$',
      currenciesAccepted: 'SAR',
      paymentAccepted: 'Cash, Bank Transfer, Mada',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Riyadh',
        addressRegion: 'Riyadh Province',
        addressCountry: 'SA',
        streetAddress: 'Riyadh, Saudi Arabia',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: companyInfo.location.latitude,
        longitude: companyInfo.location.longitude,
      },
      hasMap: companyInfo.location.mapsUrl,
      openingHours: 'Mo-Su 00:00-23:59',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
          opens: '00:00',
          closes: '23:59',
        },
      ],
      areaServed: [
        { '@type': 'City', name: 'Riyadh', sameAs: 'https://en.wikipedia.org/wiki/Riyadh' },
        { '@type': 'AdministrativeArea', name: 'Al Malqa (حي الملقا)' },
        { '@type': 'AdministrativeArea', name: 'Al Narjis (حي النرجس)' },
        { '@type': 'AdministrativeArea', name: 'Al Yasmin (حي الياسمين)' },
        { '@type': 'AdministrativeArea', name: 'Al Olaya (حي العليا)' },
        { '@type': 'AdministrativeArea', name: 'Al Sahafa (حي الصحافة)' },
        { '@type': 'AdministrativeArea', name: 'Al Rawdah (حي الروضة)' },
        { '@type': 'AdministrativeArea', name: 'Al Nakheel (حي النخيل)' },
        { '@type': 'AdministrativeArea', name: 'Hittin (حي حطين)' },
        { '@type': 'AdministrativeArea', name: 'Al Aqiq (حي العقيق)' },
        { '@type': 'AdministrativeArea', name: 'Al Hamra (حي الحمراء)' },
      ],
      serviceType: [
        'House Moving Services',
        'Residential Relocation',
        'Office Moving Services',
        'Furniture Dismantling and Assembly',
        'Multi-layer Bubble Wrap Packing',
        'Villa Moving Services',
        'Apartment Moving',
        'Dina Moving Trucks',
        'نقل عفش بالرياض',
        'شركة نقل اثاث بالرياض',
        'دينا نقل عفش بالرياض',
        'فك وتركيب غرف نوم بالرياض',
        'تغليف اثاث بالبابلز',
      ],
      sameAs: [
        companyInfo.social.facebook,
        companyInfo.social.tiktok,
        companyInfo.social.instagram,
        companyInfo.location.mapsUrl,
      ],
    },
  ];

  // Optional BreadcrumbList Schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    graphElements.push({
      '@type': 'BreadcrumbList',
      '@id': `${currentCanonicalUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((bc, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: bc.name,
        item: bc.url.startsWith('http') ? bc.url : `${SITE_URL}${bc.url}`,
      })),
    });
  }

  // Optional Page-Specific Schemas (FAQPage, ItemList, etc.)
  if (schema) {
    if (Array.isArray(schema)) {
      graphElements.push(...schema);
    } else {
      graphElements.push(schema);
    }
  }

  const finalSchema = {
    '@context': 'https://schema.org',
    '@graph': graphElements,
  };

  scriptEl.textContent = JSON.stringify(finalSchema, null, 2);
}
