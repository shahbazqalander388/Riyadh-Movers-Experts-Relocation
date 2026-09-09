import { PhoneCall } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { useLanguage } from '../hooks/useLanguage';

export default function CallButton({
  label,
  className = '',
  variant = 'primary', // 'primary' (navy), 'gold', 'outline', 'white'
  size = 'md', // 'sm', 'md', 'lg'
  iconOnly = false,
}) {
  const { lang } = useLanguage();
  const defaultLabel = lang === 'ar' ? 'اتصل الآن' : 'Call Now';
  const text = label || defaultLabel;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
  }[size];

  const variantClasses = {
    primary: 'bg-brand-navy hover:bg-brand-navy-light text-white shadow-md hover:shadow-lg',
    gold: 'bg-brand-gold hover:bg-brand-gold-dark text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-brand-navy text-brand-navy hover:bg-slate-100',
    white: 'bg-white hover:bg-slate-100 text-brand-navy shadow-md',
  }[variant];

  return (
    <a
      href={companyInfo.phoneCallUrl}
      aria-label={`${text}: ${companyInfo.phone}`}
      className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] ${
        iconOnly ? 'p-3 rounded-full' : sizeClasses
      } ${variantClasses} ${className}`}
    >
      <PhoneCall className={`${size === 'lg' ? 'w-5 h-5' : size === 'sm' ? 'w-4 h-4' : 'w-4 h-4'} shrink-0`} />
      {!iconOnly && <span>{text}</span>}
    </a>
  );
}
