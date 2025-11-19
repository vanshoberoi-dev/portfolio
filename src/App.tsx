// React and third-party imports
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// Hooks and utilities
import { trackPageView } from './utils/analytics';

// Components
import { ThemeProvider } from '@/components/ThemeProvider';
import Layout from '@/components/layout/Layout';
// Analytics components
import { VercelAnalytics } from '@/components/VercelAnalytics';

// Direct imports for instant navigation - no lazy loading delays
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ExperiencePage from '@/pages/ExperiencePage';
import ProjectsPage from '@/pages/ProjectsPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import NotFoundPage from '@/pages/NotFoundPage';

// Router component with global state
const AppRouter = () => {
  const location = useLocation();

  // Track page views when location changes
  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="experience" element={<ExperiencePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      <BrowserRouter>
        <VercelAnalytics />
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
