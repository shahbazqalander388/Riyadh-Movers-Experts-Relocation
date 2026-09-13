import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { updateSEO } from '../utils/seo';

export default function SEOHead({
  title,
  description,
  keywords,
  image,
  schema,
  breadcrumbs,
  noindex = false,
}) {
  const { lang } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    updateSEO({
      title,
      description,
      keywords,
      canonicalPath: location.pathname,
      image,
      lang,
      schema,
      breadcrumbs,
      noindex,
    });
  }, [title, description, keywords, location.pathname, image, lang, schema, breadcrumbs, noindex]);

  return null;
}
