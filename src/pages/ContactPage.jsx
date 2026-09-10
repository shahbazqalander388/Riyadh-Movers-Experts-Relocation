import { useState } from 'react';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ExternalLink,
  Truck,
  AlertCircle,
} from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';
import { companyInfo } from '../data/companyInfo';
import Breadcrumbs from '../components/Breadcrumbs';
import SEOHead from '../components/SEOHead';
import WhatsAppButton from '../components/WhatsAppButton';
import CallButton from '../components/CallButton';

export default function ContactPage() {
  const { t, isArabic } = useLanguage();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = t.contact.form.errors.name;
    }
    if (!formData.phone.trim() || formData.phone.length < 8) {
      errs.phone = t.contact.form.errors.phone;
    }
    if (!formData.service) {
      errs.service = t.contact.form.errors.service;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    // Simulate brief client-side processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      message: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  // WhatsApp prefilled message with form details
  const whatsappQuoteMessage = submitted
    ? `Hello Riyadh Movers, my name is ${formData.name}. I submitted a quote request for: ${formData.service}. Phone: ${formData.phone}. Notes: ${formData.message || 'N/A'}`
    : `Hello Riyadh Movers, I would like to request a moving quote.`;

  const breadcrumbData = [
    { name: isArabic ? 'الرئيسية' : 'Home', url: isArabic ? '/ar' : '/' },
    { name: t.breadcrumbs.contact, url: isArabic ? '/ar/contact' : '/contact' },
  ];

  return (
    <div className="py-8 sm:py-12">
      <SEOHead
        title={t.seo.contact.title}
        description={t.seo.contact.description}
        breadcrumbs={breadcrumbData}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: t.breadcrumbs.contact }]} />

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100/70 text-brand-gold-dark border border-amber-200 inline-block mb-3">
            {t.contact.badge}
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {t.contact.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 4 Direct Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Phone Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-brand-gold-dark flex items-center justify-center mb-4">
                <Phone className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-slate-900">
                {t.contact.cards.phone.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-3">
                {t.contact.cards.phone.subtitle}
              </p>
              <a
                href={companyInfo.phoneCallUrl}
                className="text-base font-extrabold text-brand-navy hover:text-brand-gold transition-colors block"
                dir="ltr"
              >
                {companyInfo.phone}
              </a>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <CallButton label={t.contact.cards.phone.action} size="sm" className="w-full" />
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-slate-900">
                {t.contact.cards.whatsapp.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-3">
                {t.contact.cards.whatsapp.subtitle}
              </p>
              <span className="text-sm font-bold text-emerald-700 block" dir="ltr">
                +966 56 469 4614
              </span>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <WhatsAppButton label={t.contact.cards.whatsapp.action} size="sm" className="w-full" />
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <h2 className="text-base font-bold text-slate-900">
                {t.contact.cards.email.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-3">
                {t.contact.cards.email.subtitle}
              </p>
              <a
                href={`mailto:${companyInfo.email}`}
                className="text-xs sm:text-sm font-bold text-slate-800 hover:text-brand-gold break-all transition-colors block"
              >
                {companyInfo.email}
              </a>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <a
                href={`mailto:${companyInfo.email}`}
                className="w-full inline-flex items-center justify-center px-4 py-2 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-brand-navy text-white transition-all shadow-sm"
              >
                <span>{t.contact.cards.email.action}</span>
              </a>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-card-soft hover:shadow-card-hover transition-all flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-brand-gold-dark" />
              </div>
              <h2 className="text-base font-bold text-slate-900">
                {t.contact.cards.location.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1 mb-3">
                {t.contact.cards.location.subtitle}
              </p>
              <span className="text-xs sm:text-sm font-semibold text-slate-700 block">
                {isArabic ? companyInfo.location.address.ar : companyInfo.location.address.en}
              </span>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <a
                href={companyInfo.location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 text-slate-800 hover:bg-slate-50 transition-all"
              >
                <span>{t.contact.cards.location.action}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Main Content Split: Form & Google Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
          {/* Form Side (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card-soft">
            {!submitted ? (
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-2">
                  {t.contact.form.title}
                </h2>
                <p className="text-sm text-slate-600 mb-8">
                  {t.contact.form.subtitle}
                </p>

                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                      {t.contact.form.name} <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: null });
                      }}
                      placeholder={t.contact.form.namePlaceholder}
                      className={`w-full px-4 py-3 text-sm rounded-xl border ${
                        errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold'
                      } bg-white text-slate-900 focus:outline-none transition-all`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Phone & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                        {t.contact.form.phone} <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: null });
                        }}
                        placeholder={t.contact.form.phonePlaceholder}
                        dir="ltr"
                        className={`w-full px-4 py-3 text-sm rounded-xl border text-start ${
                          errors.phone ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold'
                        } bg-white text-slate-900 focus:outline-none transition-all`}
                      />
                      {errors.phone && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                        {t.contact.form.email}
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contact.form.emailPlaceholder}
                        dir="ltr"
                        className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold bg-white text-slate-900 focus:outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Moving Service Selector */}
                  <div>
                    <label htmlFor="service" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                      {t.contact.form.service} <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => {
                        setFormData({ ...formData, service: e.target.value });
                        if (errors.service) setErrors({ ...errors, service: null });
                      }}
                      className={`w-full px-4 py-3 text-sm rounded-xl border ${
                        errors.service ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold'
                      } bg-white text-slate-900 focus:outline-none transition-all`}
                    >
                      <option value="">{t.contact.form.serviceSelect}</option>
                      {t.services.items.map((item) => (
                        <option key={item.id} value={item.title}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.service}</span>
                      </p>
                    )}
                  </div>

                  {/* Message / Details */}
                  <div>
                    <label htmlFor="message" className="block text-xs sm:text-sm font-bold text-slate-800 mb-1.5">
                      {t.contact.form.message}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contact.form.messagePlaceholder}
                      className="w-full px-4 py-3 text-sm rounded-xl border border-slate-300 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold bg-white text-slate-900 focus:outline-none transition-all resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 rounded-xl bg-brand-navy hover:bg-brand-navy-light text-white font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 active:scale-[0.99] disabled:opacity-70 flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>{t.contact.form.submitting}</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 rtl:rotate-180" />
                          <span>{t.contact.form.submit}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* Success State Display (Frontend confirmation) */
              <div className="py-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    {t.contact.form.successTitle}
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                    {t.contact.form.successDesc}
                  </p>
                </div>

                {/* Submitted Details Summary Card */}
                <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 text-start text-xs sm:text-sm text-slate-700 max-w-md mx-auto space-y-2">
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="font-semibold text-slate-500">{t.contact.form.name}:</span>
                    <span className="font-bold text-slate-900">{formData.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="font-semibold text-slate-500">{t.contact.form.phone}:</span>
                    <span className="font-bold text-slate-900" dir="ltr">{formData.phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                    <span className="font-semibold text-slate-500">{t.contact.form.service}:</span>
                    <span className="font-bold text-brand-gold-dark">{formData.service}</span>
                  </div>
                </div>

                {/* Direct instant actions */}
                <div className="space-y-3 pt-2 max-w-md mx-auto">
                  <WhatsAppButton
                    size="lg"
                    message={whatsappQuoteMessage}
                    label={t.contact.form.whatsappDirectBtn}
                    className="w-full"
                  />

                  <CallButton
                    size="lg"
                    variant="outline"
                    label={t.contact.form.callDirectBtn}
                    className="w-full"
                  />

                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-slate-500 hover:text-brand-navy font-semibold underline pt-2 block mx-auto"
                  >
                    {t.contact.form.submitAnother}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Map Side (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {t.contact.mapHeading}
                  </h2>
                  <p className="text-xs text-slate-500">
                    {isArabic ? 'إحداثيات الموقع: 24.7480559, 46.7766306' : 'Coordinates: 24.7480559, 46.7766306'}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-brand-gold-dark flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
              </div>

              {/* Google Maps Iframe */}
              <div className="rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200 shadow-sm relative bg-slate-100">
                <iframe
                  title="Riyadh Movers & Experts Location"
                  src={companyInfo.location.embedMapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              <div className="pt-2">
                <a
                  href={companyInfo.location.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-brand-navy text-white text-xs sm:text-sm font-bold transition-all shadow-sm"
                >
                  <span>{t.contact.mapDirections}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Social Media Channels Box */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
              <h3 className="text-lg font-bold">
                {t.contact.socialHeading}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {t.contact.socialSubtitle}
              </p>

              <div className="grid grid-cols-3 gap-3 pt-2">
                {/* Facebook */}
                <a
                  href={companyInfo.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-brand-gold transition-colors text-center text-xs font-semibold gap-1.5"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </a>

                {/* TikTok */}
                <a
                  href={companyInfo.social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-brand-gold transition-colors text-center text-xs font-semibold gap-1.5"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                  </svg>
                  <span>TikTok</span>
                </a>

                {/* Instagram */}
                <a
                  href={companyInfo.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white/10 hover:bg-brand-gold transition-colors text-center text-xs font-semibold gap-1.5"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
