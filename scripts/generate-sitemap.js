import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { districtsList } from '../src/data/districtsData.js';
import { serviceSeoDetails } from '../src/data/serviceSeoData.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const sitemapPath = path.join(publicDir, 'sitemap.xml');

const SITE_URL = 'https://www.riyadhmoversexperts.com';
const TODAY = new Date().toISOString().split('T')[0];

const staticPages = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: 'services', priority: '0.9', changefreq: 'weekly' },
  { path: 'districts', priority: '0.85', changefreq: 'weekly' },
  { path: 'about', priority: '0.8', changefreq: 'monthly' },
  { path: 'gallery', priority: '0.8', changefreq: 'monthly' },
  { path: 'faq', priority: '0.8', changefreq: 'monthly' },
  { path: 'contact', priority: '0.8', changefreq: 'monthly' },
];

const serviceSlugs = Object.keys(serviceSeoDetails);
const districtSlugs = districtsList.map((d) => d.slug);

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

function buildUrlBlock(enPath, arPath, priority, changefreq) {
  const enUrl = enPath ? `${SITE_URL}/${enPath}` : `${SITE_URL}/`;
  const arUrl = arPath ? `${SITE_URL}/${arPath}` : `${SITE_URL}/ar`;

  const generateEntry = (locUrl) => `  <url>
    <loc>${locUrl}</loc>
    <lastmod>${TODAY}</lastmod>
    <xhtml:link rel="alternate" hreflang="en-SA" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="ar-SA" href="${arUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="ar" href="${arUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>
`;

  return generateEntry(enUrl) + generateEntry(arUrl);
}

// 1. Static Pages
xml += '  <!-- Core Static Pages -->\n';
for (const page of staticPages) {
  const enPath = page.path;
  const arPath = page.path ? `ar/${page.path}` : 'ar';
  xml += buildUrlBlock(enPath, arPath, page.priority, page.changefreq);
}

// 2. Core Services
xml += '\n  <!-- Core Services Pages -->\n';
for (const slug of serviceSlugs) {
  const enPath = `services/${slug}`;
  const arPath = `ar/services/${slug}`;
  xml += buildUrlBlock(enPath, arPath, '0.9', 'weekly');
}

// 3. Programmatic District Landing Pages
xml += '\n  <!-- Programmatic District Landing Pages -->\n';
for (const slug of districtSlugs) {
  const enPath = `districts/${slug}`;
  const arPath = `ar/districts/${slug}`;
  xml += buildUrlBlock(enPath, arPath, '0.85', 'weekly');
}

xml += '</urlset>\n';

fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log(`Successfully generated dynamic sitemap at ${sitemapPath} with ${staticPages.length * 2 + serviceSlugs.length * 2 + districtSlugs.length * 2} URLs.`);
