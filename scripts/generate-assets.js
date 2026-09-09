import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const imagesDir = path.join(__dirname, '..', 'public', 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

const services = [
  {
    name: 'service-house.svg',
    titleEn: 'House Moving',
    titleAr: 'نقل المنازل والشقق',
    desc: 'Complete Residential Relocation & Care',
    color1: '#0A192F',
    color2: '#1E3E62',
    icon: `<path d="M400 240 L600 80 L800 240 V520 H400 Z" fill="#D97706" opacity="0.85"/>
           <rect x="540" y="360" width="120" height="160" fill="#0A192F"/>
           <rect x="460" y="270" width="80" height="80" rx="6" fill="#FEF3C7"/>
           <rect x="660" y="270" width="80" height="80" rx="6" fill="#FEF3C7"/>
           <line x1="500" y1="270" x2="500" y2="350" stroke="#0A192F" stroke-width="4"/>
           <line x1="460" y1="310" x2="540" y2="310" stroke="#0A192F" stroke-width="4"/>`
  },
  {
    name: 'service-villa.svg',
    titleEn: 'Villa Moving',
    titleAr: 'نقل الفلل والقصور',
    desc: 'Careful Handling of Large Properties',
    color1: '#0F172A',
    color2: '#1E293B',
    icon: `<path d="M300 260 L460 140 L620 260 V520 H300 Z" fill="#D97706" opacity="0.85"/>
           <path d="M580 220 L740 100 L900 220 V520 H580 Z" fill="#F59E0B" opacity="0.75"/>
           <rect x="420" y="380" width="80" height="140" fill="#0A192F"/>
           <rect x="700" y="380" width="80" height="140" fill="#0A192F"/>`
  },
  {
    name: 'service-apartment.svg',
    titleEn: 'Apartment Moving',
    titleAr: 'نقل أثاث الشقق',
    desc: 'Organized & Swift Apartment Moving',
    color1: '#0E2342',
    color2: '#1E3E62',
    icon: `<rect x="440" y="120" width="320" height="400" rx="8" fill="#D97706" opacity="0.9"/>
           <g fill="#0A192F">
             <rect x="480" y="160" width="60" height="60" rx="4"/>
             <rect x="570" y="160" width="60" height="60" rx="4"/>
             <rect x="660" y="160" width="60" height="60" rx="4"/>
             <rect x="480" y="250" width="60" height="60" rx="4"/>
             <rect x="570" y="250" width="60" height="60" rx="4"/>
             <rect x="660" y="250" width="60" height="60" rx="4"/>
             <rect x="480" y="340" width="60" height="60" rx="4"/>
             <rect x="570" y="340" width="60" height="60" rx="4"/>
             <rect x="660" y="340" width="60" height="60" rx="4"/>
             <rect x="560" y="430" width="80" height="90" fill="#0A192F"/>
           </g>`
  },
  {
    name: 'service-office.svg',
    titleEn: 'Office Moving',
    titleAr: 'نقل المكاتب والشركات',
    desc: 'Structured Corporate & Commercial Relocation',
    color1: '#0B132B',
    color2: '#1C2541',
    icon: `<rect x="360" y="320" width="480" height="30" rx="6" fill="#F59E0B"/>
           <rect x="400" y="350" width="40" height="170" fill="#94A3B8"/>
           <rect x="760" y="350" width="40" height="170" fill="#94A3B8"/>
           <!-- Monitor -->
           <rect x="520" y="200" width="160" height="100" rx="8" fill="#FFFFFF"/>
           <rect x="530" y="210" width="140" height="80" rx="4" fill="#0A192F"/>
           <rect x="590" y="300" width="20" height="20" fill="#94A3B8"/>
           <!-- Chair -->
           <path d="M460 220 H500 V320 H460 Z" fill="#D97706"/>`
  },
  {
    name: 'service-furniture.svg',
    titleEn: 'Furniture Moving',
    titleAr: 'نقل وتفكيك وتركيب الأثاث',
    desc: 'Expert Disassembly, Transport & Assembly',
    color1: '#111827',
    color2: '#1F2937',
    icon: `<path d="M360 280 H840 V420 H360 Z" fill="#D97706"/>
           <rect x="340" y="240" width="520" height="50" rx="10" fill="#F59E0B"/>
           <rect x="380" y="420" width="40" height="80" fill="#94A3B8"/>
           <rect x="780" y="420" width="40" height="80" fill="#94A3B8"/>
           <!-- Pillows -->
           <rect x="420" y="295" width="160" height="110" rx="10" fill="#FEF3C7"/>
           <rect x="620" y="295" width="160" height="110" rx="10" fill="#FEF3C7"/>`
  },
  {
    name: 'service-packing.svg',
    titleEn: 'Packing & Unpacking',
    titleAr: 'تغليف وفك الأثاث',
    desc: 'Multi-layer Bubble Wrap & Carton Protection',
    color1: '#0A192F',
    color2: '#1E293B',
    icon: `<rect x="460" y="200" width="280" height="240" rx="12" fill="#D97706"/>
           <polygon points="460,200 600,120 740,200" fill="#F59E0B"/>
           <line x1="600" y1="120" x2="600" y2="440" stroke="#0A192F" stroke-width="8"/>
           <line x1="460" y1="320" x2="740" y2="320" stroke="#0A192F" stroke-width="8"/>
           <!-- Tape roll -->
           <circle cx="380" cy="380" r="50" fill="#FBBF24"/>
           <circle cx="380" cy="380" r="25" fill="#FFFFFF"/>`
  },
  {
    name: 'service-loading.svg',
    titleEn: 'Loading & Unloading',
    titleAr: 'التحميل والتنزيل الاحترافي',
    desc: 'Careful Heavy Lifting & Secure Transport',
    color1: '#0F172A',
    color2: '#1E3E62',
    icon: `<rect x="340" y="320" width="300" height="180" rx="8" fill="#FFFFFF"/>
           <rect x="640" y="260" width="220" height="240" rx="8" fill="#D97706"/>
           <!-- Hand truck dolly -->
           <path d="M420 220 L420 500 L540 500" stroke="#F59E0B" stroke-width="12" stroke-linecap="round" fill="none"/>
           <circle cx="430" cy="500" r="24" fill="#0A192F"/>`
  },
  {
    name: 'service-local.svg',
    titleEn: 'Local Moving in Riyadh',
    titleAr: 'نقل محلي داخل أحياء الرياض',
    desc: 'Covering All Riyadh Districts Fast & Efficiently',
    color1: '#0A192F',
    color2: '#0D2B45',
    icon: `<circle cx="600" cy="300" r="140" fill="none" stroke="#D97706" stroke-width="16"/>
           <!-- Map Pin -->
           <path d="M600 180 C560 180 530 210 530 250 C530 300 600 370 600 370 C600 370 670 300 670 250 C670 210 640 180 600 180 Z" fill="#F59E0B"/>
           <circle cx="600" cy="245" r="25" fill="#0A192F"/>`
  }
];

services.forEach(s => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 640" width="100%" height="100%">
  <defs>
    <linearGradient id="grad-${s.name}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${s.color1}" />
      <stop offset="100%" stop-color="${s.color2}" />
    </linearGradient>
  </defs>
  <rect width="1200" height="640" fill="url(#grad-${s.name})" />
  
  <!-- Subtle decorative shapes -->
  <circle cx="200" cy="150" r="300" fill="#FFFFFF" opacity="0.02" />
  <circle cx="1000" cy="500" r="250" fill="#D97706" opacity="0.04" />
  
  <!-- Icon / Visual -->
  <g>
    ${s.icon}
  </g>

  <!-- Labels -->
  <text x="600" y="550" font-family="'Cairo', sans-serif" font-weight="800" font-size="34" fill="#FFFFFF" text-anchor="middle">${s.titleAr}</text>
  <text x="600" y="590" font-family="'Inter', sans-serif" font-weight="600" font-size="20" fill="#F59E0B" text-anchor="middle">${s.titleEn} — ${s.desc}</text>
</svg>`;
  fs.writeFileSync(path.join(imagesDir, s.name), svg, 'utf8');
});

// Generate 6 Gallery SVGs
for (let i = 1; i <= 6; i++) {
  const titles = [
    { ar: 'تغليف الأثاث بمواد واقية عالية الجودة', en: 'Multi-layer Furniture Packaging & Protection' },
    { ar: 'تحميل الشاحنات وترتيب البضائع باحتراف', en: 'Professional Truck Loading & Secure Transport' },
    { ar: 'تفكيك غرف النوم والمطابخ والمكيفات', en: 'Disassembly of Bedrooms, Kitchens & Fixtures' },
    { ar: 'خدمات نقل الفلل والقصور بالرياض', en: 'Complete Villa & Residential Relocation' },
    { ar: 'نقل مكاتب الشركات ومحطات العمل', en: 'Commercial Office Relocation in Riyadh' },
    { ar: 'تنزيل وترتيب الأثاث في المقر الجديد', en: 'Careful Unloading & Setup in New Location' }
  ];
  const item = titles[i - 1];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="gal-${i}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0A192F" />
      <stop offset="100%" stop-color="#1E3E62" />
    </linearGradient>
  </defs>
  <rect width="800" height="600" rx="12" fill="url(#gal-${i})" />
  <rect x="30" y="30" width="740" height="540" rx="8" fill="none" stroke="#D97706" stroke-width="2" opacity="0.3" />
  
  <!-- Image Symbol -->
  <circle cx="400" cy="240" r="70" fill="#D97706" opacity="0.2" />
  <path d="M370 240 L395 265 L435 220" stroke="#F59E0B" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
  
  <text x="400" y="360" font-family="'Cairo', sans-serif" font-weight="700" font-size="24" fill="#FFFFFF" text-anchor="middle">${item.ar}</text>
  <text x="400" y="400" font-family="'Inter', sans-serif" font-weight="500" font-size="16" fill="#F59E0B" text-anchor="middle">${item.en}</text>
  <text x="400" y="450" font-family="'Inter', sans-serif" font-weight="400" font-size="14" fill="#94A3B8" text-anchor="middle">Riyadh Movers &amp; Experts • Gallery ${i}</text>
</svg>`;
  fs.writeFileSync(path.join(imagesDir, `gallery-${i}.svg`), svg, 'utf8');
}

console.log('Successfully generated all placeholder SVGs in public/images/');
