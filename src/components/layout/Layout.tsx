// React and third-party imports
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

// Components
import Header from './Header';
import Footer from './Footer';
import GlobalAnimatedBackground from './GlobalAnimatedBackground';
import AIChatbot from '@/components/ui/AIChatbot';

export default function Layout() {
  const location = useLocation();

  // Handle route changes
  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 relative">
      {/* Global Animated Background */}
      <GlobalAnimatedBackground />

      <Header />
      <main className="flex-grow pt-20 relative z-10">
        <Outlet />
      </main>
      <Footer />

      {/* AI Chatbot */}
      <AIChatbot />
    </div>
  );
}
