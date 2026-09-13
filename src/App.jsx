import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

import DistrictsDirectoryPage from './pages/DistrictsDirectoryPage';
import DistrictPage from './pages/DistrictPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        {/* English Routes (Default) */}
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:slug" element={<ServicesPage />} />
        <Route path="districts" element={<DistrictsDirectoryPage />} />
        <Route path="districts/:slug" element={<DistrictPage />} />
        <Route path="gallery" element={<GalleryPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="contact" element={<ContactPage />} />

        {/* Arabic Routes (/ar Prefix) */}
        <Route path="ar" element={<HomePage />} />
        <Route path="ar/about" element={<AboutPage />} />
        <Route path="ar/services" element={<ServicesPage />} />
        <Route path="ar/services/:slug" element={<ServicesPage />} />
        <Route path="ar/districts" element={<DistrictsDirectoryPage />} />
        <Route path="ar/districts/:slug" element={<DistrictPage />} />
        <Route path="ar/gallery" element={<GalleryPage />} />
        <Route path="ar/faq" element={<FAQPage />} />
        <Route path="ar/contact" element={<ContactPage />} />

        {/* Fallback 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
