import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQAccordion({ items = [], allowMultiple = false, defaultOpenIndex = null }) {
  const [openIndexes, setOpenIndexes] = useState(
    defaultOpenIndex !== null && defaultOpenIndex !== undefined ? [defaultOpenIndex] : []
  );

  const toggle = (index) => {
    if (allowMultiple) {
      setOpenIndexes((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      );
    } else {
      setOpenIndexes((prev) => (prev.includes(index) ? [] : [index]));
    }
  };

  return (
    <div className="space-y-3.5 max-w-3xl mx-auto">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        const buttonId = `faq-btn-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <div
            key={index}
            className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
              isOpen
                ? 'bg-white border-brand-gold/40 shadow-card-soft ring-1 ring-brand-gold/20'
                : 'bg-white/80 hover:bg-white border-slate-200/80 shadow-sm'
            }`}
          >
            <button
              id={buttonId}
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={panelId}
              className="w-full py-4.5 px-5 sm:px-6 text-start flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-brand-navy transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            >
              <span className="text-base sm:text-lg leading-snug">{item.q}</span>
              <span
                className={`p-1.5 rounded-full shrink-0 transition-transform duration-200 ${
                  isOpen
                    ? 'bg-amber-100 text-brand-gold-dark rotate-180'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                <ChevronDown className="w-4 h-4" />
              </span>
            </button>

            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100"
              >
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
