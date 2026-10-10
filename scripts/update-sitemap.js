import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');

let xml = fs.readFileSync(sitemapPath, 'utf8');

// Replace <loc>(url)</loc> with <loc>$1</loc>\n    <lastmod>2026-10-10</lastmod>
xml = xml.replace(/<loc>(https:\/\/[^<]+)<\/loc>/g, '<loc>$1</loc>\n    <lastmod>2026-10-10</lastmod>');

fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log('Successfully added lastmod to all URLs in public/sitemap.xml');
