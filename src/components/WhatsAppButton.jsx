import { MessageCircle } from 'lucide-react';
import { companyInfo } from '../data/companyInfo';
import { useLanguage } from '../hooks/useLanguage';

export default function WhatsAppButton({
  label,
  message,
  className = '',
  variant = 'primary', // 'primary' (green), 'gold', 'outline', 'white'
  size = 'md', // 'sm', 'md', 'lg'
  iconOnly = false,
}) {
  const { lang } = useLanguage();
  const defaultLabel = lang === 'ar' ? 'واتساب مباشر' : 'WhatsApp Us';
  const text = label || defaultLabel;

  const url = message
    ? `${companyInfo.whatsappUrl}?text=${encodeURIComponent(message)}`
    : companyInfo.whatsappUrl;

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3.5 text-base gap-2.5',
  }[size];

  const variantClasses = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md hover:shadow-lg',
    gold: 'bg-brand-gold hover:bg-brand-gold-dark text-white shadow-md hover:shadow-lg',
    outline: 'border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30',
    white: 'bg-white hover:bg-slate-100 text-emerald-700 shadow-md',
  }[variant];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={text}
      className={`inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 active:scale-[0.98] ${
        iconOnly ? 'p-3 rounded-full' : sizeClasses
      } ${variantClasses} ${className}`}
    >
      <MessageCircle className={`${size === 'lg' ? 'w-5 h-5' : size === 'sm' ? 'w-4 h-4' : 'w-4 h-4'} shrink-0`} />
      {!iconOnly && <span>{text}</span>}
    </a>
  );
}
