import { useState } from 'react';
import { Maximize2, Filter, Camera, MessageCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { images } from '../data/images';
import Breadcrumbs from '../components/Breadcrumbs';
import GalleryModal from '../components/GalleryModal';
import SEOHead from '../components/SEOHead';
import WhatsAppButton from '../components/WhatsAppButton';

export default function GalleryPage() {
  const { t, isArabic } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const categories = [
    { id: 'all', label: t.gallery.all },
    { id: 'residential', label: t.gallery.residential },
    { id: 'packing', label: t.gallery.packing },
    { id: 'furniture', label: t.gallery.furniture },
    { id: 'transport', label: t.gallery.transport },
    { id: 'office', label: t.gallery.office },
  ];

  const filteredImages =
    activeCategory === 'all'
      ? images.gallery
      : images.gallery.filter((img) => img.category === activeCategory);

  const openLightbox = (index) => {
    // Find absolute index in full gallery array
    const originalItem = filteredImages[index];
    const originalIdx = images.gallery.findIndex((item) => item.id === originalItem.id);
    setSelectedImageIndex(originalIdx >= 0 ? originalIdx : 0);
    setModalOpen(true);
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % images.gallery.length);
  };

  const prevImage = () => {
    setSelectedImageIndex(
      (prev) => (prev - 1 + images.gallery.length) % images.gallery.length
    );
  };

  return (
    <div className="py-8 sm:py-12">
      <SEOHead
        title={t.seo.gallery.title}
        description={t.seo.gallery.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: t.breadcrumbs.gallery }]} />

        {/* Page Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100/70 text-brand-gold-dark border border-amber-200 inline-block mb-3">
            {t.gallery.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.gallery.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.gallery.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-brand-navy text-white shadow-md'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredImages.map((item, index) => {
            const title = isArabic ? item.altAr : item.altEn;
            return (
              <div
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-card-soft hover:shadow-card-hover cursor-pointer transition-all duration-300 aspect-[4/3] flex items-center justify-center p-2"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                  }
                }}
                aria-label={`${title} - ${t.gallery.viewLarger}`}
              >
                <img
                  src={item.src}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 rounded-xl"
                />

                {/* Dark Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/80 via-brand-navy-dark/20 to-transparent opacity-60 group-hover:opacity-85 transition-opacity rounded-xl pointer-events-none" />

                {/* Zoom Icon Button Badge */}
                <div className="absolute top-4 end-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-200">
                  <Maximize2 className="w-4 h-4" />
                </div>

                {/* Caption Title */}
                <div className="absolute bottom-4 inset-x-4">
                  <p className="text-white font-bold text-base leading-snug">
                    {title}
                  </p>
                  <span className="text-xs text-brand-gold-light mt-1 inline-block">
                    {t.gallery.viewLarger}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Lightbox Modal */}
        <GalleryModal
          images={images.gallery}
          currentIndex={selectedImageIndex}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          onNext={nextImage}
          onPrev={prevImage}
        />

        {/* WhatsApp Photo Estimate Banner */}
        <div className="mt-16 bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
          <div className="flex items-center gap-4 text-start">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-emerald-950">
                {isArabic
                  ? 'أرسل صور أثاثك عبر واتساب لتقييم فوري'
                  : 'Send Furniture Photos on WhatsApp for an Instant Estimate'}
              </h3>
              <p className="text-xs sm:text-sm text-emerald-800 mt-1">
                {isArabic
                  ? 'صور الغرف والقطع الكبيرة وسيحدد لك فريقنا السعر المناسب خلال دقائق.'
                  : 'Snap photos of your rooms or large items and our team will quote your move within minutes.'}
              </p>
            </div>
          </div>

          <WhatsAppButton
            size="md"
            message="Hello Riyadh Movers, I am sending photos of my furniture to request a quick moving estimate."
            label={isArabic ? 'إرسال صور العفش' : 'Send Photos on WhatsApp'}
            className="shrink-0 w-full sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
}
