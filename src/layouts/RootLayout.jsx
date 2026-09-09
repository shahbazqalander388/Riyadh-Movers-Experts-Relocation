import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import MobileFloatingCTA from '../components/MobileFloatingCTA';
import { useLanguage } from '../hooks/useLanguage';

export default function RootLayout() {
  const { pathname } = useLocation();
  const { dir } = useLanguage();

  // Scroll to top upon navigating between pages
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div className="flex flex-col min-h-screen relative" dir={dir}>
      {/* Sticky Top Header */}
      <Navbar />

      {/* Main Content Area with mobile floating CTA bottom offset */}
      <main className="flex-grow pb-floating-cta">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Mobile Floating Bottom Bar for WhatsApp and Call */}
      <MobileFloatingCTA />
    </div>
  );
}
