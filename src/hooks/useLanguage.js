import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translations } from '../data/translations';

export function useLanguage() {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // Determine language based on route prefix
  const isArabic = pathname === '/ar' || pathname.startsWith('/ar/');
  const lang = isArabic ? 'ar' : 'en';
  const dir = isArabic ? 'rtl' : 'ltr';

  // Synchronize HTML attributes
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  /**
   * Converts a given generic path (e.g. '/about') to the localized equivalent
   */
  const getLocalizedPath = (path, targetLang = lang) => {
    // Clean leading/trailing slashes for calculation
    const cleanPath = path === '/' ? '' : path.replace(/^\/ar(\/|$)/, '/');
    const normalized = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

    if (targetLang === 'ar') {
      return normalized === '/' ? '/ar' : `/ar${normalized}`;
    }
    return normalized || '/';
  };

  /**
   * Returns the corresponding URL of the current page in the opposite language
   */
  const getOppositeLangPath = () => {
    if (isArabic) {
      // Switch from Arabic to English
      const enPath = pathname.replace(/^\/ar/, '') || '/';
      return `${enPath}${location.search}${location.hash}`;
    } else {
      // Switch from English to Arabic
      const arPath = pathname === '/' ? '/ar' : `/ar${pathname}`;
      return `${arPath}${location.search}${location.hash}`;
    }
  };

  const switchLanguage = (newLang) => {
    if (newLang === lang) return;
    const targetPath = getOppositeLangPath();
    navigate(targetPath);
  };

  return {
    lang,
    dir,
    isArabic,
    t: translations[lang],
    getLocalizedPath,
    getOppositeLangPath,
    switchLanguage,
  };
}
