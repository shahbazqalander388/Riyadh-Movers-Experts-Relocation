export default function SectionTitle({
  badge,
  title,
  subtitle,
  center = true,
  inverted = false,
  className = '',
  as = 'h2',
}) {
  const HeadingTag = as;

  return (
    <div
      className={`mb-10 sm:mb-14 ${
        center ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'
      } ${className}`}
    >
      {badge && (
        <div className={`inline-flex items-center gap-2 mb-3.5 ${center ? 'justify-center' : ''}`}>
          <span
            className={`px-3.5 py-1 rounded-full text-xs font-bold tracking-wide uppercase transition-colors ${
              inverted
                ? 'bg-white/10 text-brand-gold-light border border-white/15'
                : 'bg-amber-100/70 text-brand-gold-dark border border-amber-200'
            }`}
          >
            {badge}
          </span>
        </div>
      )}

      <HeadingTag
        className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
          inverted ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </HeadingTag>

      {subtitle && (
        <p
          className={`mt-3.5 text-base sm:text-lg leading-relaxed ${
            inverted ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
