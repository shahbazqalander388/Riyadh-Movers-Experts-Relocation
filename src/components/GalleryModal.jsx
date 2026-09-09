import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export default function GalleryModal({
  images = [],
  currentIndex = 0,
  isOpen = false,
  onClose,
  onNext,
  onPrev,
}) {
  const { isArabic } = useLanguage();

  // Keyboard navigation & body scroll lock
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        if (isArabic) onPrev();
        else onNext();
      } else if (e.key === 'ArrowLeft') {
        if (isArabic) onNext();
        else onPrev();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onNext, onPrev, isArabic]);

  if (!isOpen || !images[currentIndex]) return null;

  const currentItem = images[currentIndex];
  const title = isArabic ? currentItem.altAr : currentItem.altEn;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-brand-navy/95 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Top Bar with Close Button */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between z-10">
        <span className="text-white/80 text-sm font-medium">
          {currentIndex + 1} / {images.length}
        </span>

        <button
          type="button"
          onClick={onClose}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
          aria-label={isArabic ? 'إغلاق المعاينة' : 'Close preview'}
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main Image View */}
      <div
        className="relative max-w-4xl w-full flex flex-col items-center justify-center max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentItem.src}
          alt={title}
          className="max-h-[70vh] w-auto max-w-full rounded-xl object-contain shadow-2xl border border-white/10"
        />

        {/* Title Caption */}
        <div className="mt-4 text-center px-4">
          <p className="text-white font-semibold text-base sm:text-lg">{title}</p>
        </div>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={onPrev}
              className="absolute -start-3 sm:-start-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label={isArabic ? 'الصورة التالية' : 'Previous image'}
            >
              <ChevronLeft className="w-6 h-6 rtl:rotate-180" />
            </button>

            <button
              type="button"
              onClick={onNext}
              className="absolute -end-3 sm:-end-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/15 hover:bg-white/25 text-white backdrop-blur-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label={isArabic ? 'الصورة السابقة' : 'Next image'}
            >
              <ChevronRight className="w-6 h-6 rtl:rotate-180" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
