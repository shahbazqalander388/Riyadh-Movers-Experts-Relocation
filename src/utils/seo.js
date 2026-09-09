import { companyInfo } from '../data/companyInfo';

const SITE_URL = 'https://riyadhmoverandexpert.com';

export function updateSEO({
  title,
  description,
  canonicalPath = '',
  image = '/images/real-9.jpg',
  lang = 'en',
  schema = null,
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
  setMeta('robots', 'name', 'index, follow');

  // Open Graph
  const fullUrl = `${SITE_URL}${canonicalPath === '/' ? '' : canonicalPath}`;
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  setMeta('og:title', 'property', title);
  setMeta('og:description', 'property', description);
  setMeta('og:url', 'property', fullUrl);
  setMeta('og:image', 'property', fullImage);
  setMeta('og:type', 'property', 'website');
  setMeta('og:locale', 'property', lang === 'ar' ? 'ar_SA' : 'en_US');
  setMeta('og:locale:alternate', 'property', lang === 'ar' ? 'en_US' : 'ar_SA');

  // Twitter
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
  canonicalEl.setAttribute('href', fullUrl);

  // Hreflang alternates
  const enUrl = `${SITE_URL}${canonicalPath.replace(/^\/ar(\/|$)/, '/') || '/'}`;
  const cleanEn = enUrl.endsWith('/') && enUrl.length > SITE_URL.length + 1 ? enUrl.slice(0, -1) : enUrl;
  const arUrl = cleanEn === SITE_URL ? `${SITE_URL}/ar` : cleanEn.replace(SITE_URL, `${SITE_URL}/ar`);

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

  setHreflang('en', cleanEn);
  setHreflang('ar', arUrl);
  setHreflang('x-default', cleanEn);

  // JSON-LD Structured Data
  let scriptEl = document.getElementById('json-ld-schema');
  if (!scriptEl) {
    scriptEl = document.createElement('script');
    scriptEl.id = 'json-ld-schema';
    scriptEl.type = 'application/ld+json';
    document.head.appendChild(scriptEl);
  }

  // Generate Base LocalBusiness / MovingCompany schema
  const baseLocalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MovingCompany',
    '@id': `${SITE_URL}/#movingcompany`,
    name: lang === 'ar' ? companyInfo.name.ar : companyInfo.name.en,
    alternateName: lang === 'ar' ? companyInfo.name.en : companyInfo.name.ar,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    image: `${SITE_URL}/images/real-9.jpg`,
    telephone: companyInfo.phone,
    email: companyInfo.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Riyadh',
      addressCountry: 'SA',
      streetAddress: 'Riyadh, Saudi Arabia',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: companyInfo.location.latitude,
      longitude: companyInfo.location.longitude,
    },
    openingHoursSpecification: {
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
    areaServed: {
      '@type': 'City',
      name: 'Riyadh',
    },
    sameAs: [
      companyInfo.social.facebook,
      companyInfo.social.tiktok,
      companyInfo.social.instagram,
      companyInfo.location.mapsUrl,
    ],
  };

  const finalSchema = schema
    ? [baseLocalBusinessSchema, schema]
    : baseLocalBusinessSchema;

  scriptEl.textContent = JSON.stringify(finalSchema, null, 2);
}
