import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { updateSEO } from '../utils/seo';

export default function SEOHead({ title, description, image, schema }) {
  const { lang } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    updateSEO({
      title,
      description,
      canonicalPath: location.pathname,
      image,
      lang,
      schema,
    });
  }, [title, description, location.pathname, image, lang, schema]);

  return null;
}
