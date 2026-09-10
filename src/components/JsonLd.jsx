import React, { useEffect } from 'react';

export const DEFAULT_MOVING_COMPANY_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'MovingCompany',
  name: 'Riyadh Movers Experts',
  url: 'https://www.riyadhmoversexperts.com/',
  telephone: '+966 56 469 4614',
  email: 'Khankeratmat453@gmail.com',
  areaServed: 'Riyadh, Saudi Arabia',
  serviceType: [
    'House Moving',
    'Furniture Dismantling',
    'Packing',
    'Office Relocation',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Riyadh',
    addressCountry: 'SA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: '24.7480559',
    longitude: '46.7766306',
  },
};

/**
 * Reusable JsonLd Component
 * Dynamically injects or updates a Schema.org script tag in the document head.
 */
export default function JsonLd({ schema = DEFAULT_MOVING_COMPANY_SCHEMA, id = 'json-ld-schema' }) {
  useEffect(() => {
    if (!schema) return;

    let scriptTag = document.getElementById(id);
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = id;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    scriptTag.textContent = JSON.stringify(schema, null, 2);

    return () => {
      // Keep script on unmount or let next page overwrite smoothly
    };
  }, [schema, id]);

  return null;
}
