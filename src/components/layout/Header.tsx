import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, FileText } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, LinkButton } from '@/components/ui/Button';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Experience', path: '/experience' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="group flex items-center"
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
              <div className="relative px-3 py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border border-white/20 dark:border-gray-700/50 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 flex items-center">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">V</span>
                </div>
              </div>
            </div>
          </Link>
          <img 
            src="/flute_lineart.png" 
            alt="Flute decoration" 
            className="ml-3 w-8 h-4 object-contain opacity-60"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== '/' && location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive
                  ? 'text-primary-600 dark:text-primary-400'
                  : 'text-dark-300 dark:text-light-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-light-300/50 dark:hover:bg-dark-200/50'
                }`}
              >
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}

          <div className="ml-4 flex items-center space-x-3">
            <ThemeToggle />
            <LinkButton
              variant="outline"
              size="sm"
              href="/resume.pdf"
              external={true}
              icon={<FileText size={16} />}
              iconPosition="left"
            >
              Resume
            </LinkButton>
            <LinkButton
              variant="primary"
              size="sm"
              href="/contact#contact-form"
            >
              Hire Me
            </LinkButton>
          </div>
        </nav>

        {/* Mobile Navigation Toggle */}
        <div className="flex items-center md:hidden space-x-4">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-md text-dark-300 dark:text-light-300 hover:bg-light-300/50 dark:hover:bg-dark-200/50 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass shadow-lg border-t border-light-500/50 dark:border-dark-100/50"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-1">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path ||
                    (item.path !== '/' && location.pathname.startsWith(item.path));

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                        : 'text-dark-300 dark:text-light-300 hover:bg-light-300/50 dark:hover:bg-dark-200/50'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  );
                })}
                <div className="pt-4 mt-4 border-t border-light-500/50 dark:border-dark-100/50 space-y-3">
                  <LinkButton
                    variant="outline"
                    size="sm"
                    href="/resume.pdf"
                    external={true}
                    icon={<FileText size={16} />}
                    iconPosition="left"
                    fullWidth
                  >
                    View Resume
                  </LinkButton>
                  <LinkButton
                    variant="primary"
                    size="sm"
                    href="/contact#contact-form"
                    fullWidth
                  >
                    Hire Me
                  </LinkButton>
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
