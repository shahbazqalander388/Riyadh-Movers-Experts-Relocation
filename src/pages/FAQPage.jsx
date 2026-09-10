import { useState } from 'react';
import { Search, MessageCircle, PhoneCall, HelpCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { companyInfo } from '../data/companyInfo';
import Breadcrumbs from '../components/Breadcrumbs';
import FAQAccordion from '../components/FAQAccordion';
import SEOHead from '../components/SEOHead';
import WhatsAppButton from '../components/WhatsAppButton';
import CallButton from '../components/CallButton';

export default function FAQPage() {
  const { t, isArabic } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  // Structured Data for FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
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

  const filteredItems = t.faq.items.filter(
    (item) =>
      item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const breadcrumbData = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: isArabic ? '/ar' : '/' },
    { name: t.breadcrumbs.faq, url: isArabic ? '/ar/faq' : '/faq' },
  ];

  return (
    <div className="py-8 sm:py-12">
      <SEOHead
        title={t.seo.faq.title}
        description={t.seo.faq.description}
        schema={faqSchema}
        breadcrumbs={breadcrumbData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: t.breadcrumbs.faq }]} />

        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100/70 text-brand-gold-dark border border-amber-200 inline-block mb-3">
            {t.faq.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.faq.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.faq.subtitle}
          </p>

          {/* Quick Search Input */}
          <div className="mt-8 max-w-md mx-auto relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isArabic ? 'ابحث في الأسئلة الشائعة...' : 'Search questions or keywords...'}
              className="w-full py-3 ps-10 pe-4 bg-white rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold shadow-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute top-3.5 start-3.5" />
          </div>
        </div>

        {/* FAQ Accordion List */}
        <div className="mb-16">
          {filteredItems.length > 0 ? (
            <FAQAccordion items={filteredItems} allowMultiple={true} />
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-6 max-w-md mx-auto">
              <HelpCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 font-semibold text-sm">
                {isArabic
                  ? 'لم يتم العثور على نتائج مطابقة لكلمات البحث.'
                  : 'No questions matched your search term.'}
              </p>
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="mt-3 text-xs font-bold text-brand-gold hover:underline"
              >
                {isArabic ? 'إعادة عرض جميع الأسئلة' : 'Reset search filter'}
              </button>
            </div>
          )}
        </div>

        {/* Need More Assistance Support Card */}
        <div className="max-w-3xl mx-auto bg-slate-900 text-white rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-brand-gold/20 text-brand-gold-light flex items-center justify-center mx-auto">
            <MessageCircle className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold">
            {t.faq.needMoreHelp}
          </h2>
          <p className="text-slate-300 text-sm max-w-md mx-auto">
            {t.faq.contactPrompt}
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <WhatsAppButton
              size="lg"
              message="Hello Riyadh Movers, I have a question regarding your moving and packing services."
              label={isArabic ? 'اسألنا عبر واتساب الآن' : 'Ask on WhatsApp Now'}
            />
            <CallButton
              size="lg"
              variant="white"
              label={isArabic ? 'اتصال بالدعم' : 'Call Support'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
