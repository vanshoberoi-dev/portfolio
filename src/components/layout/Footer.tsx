import { Link } from 'react-router-dom';
import { Github, Linkedin, Twitter, Facebook, Instagram, Mail, Phone, MapPin, ArrowUp, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import portfolioData from '@/data/portfolio';
import { trackEvent } from '@/utils/analytics';

export default function Footer() {
  const { personal } = portfolioData;
  const currentYear = new Date().getFullYear();

  const socialIcons = {
    github: <Github size={20} />,
    linkedin: <Linkedin size={20} />,
    twitter: <Twitter size={20} />,
    facebook: <Facebook size={20} />,
    instagram: <Instagram size={20} />,
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white pt-20 pb-8 relative">
      {/* Wave SVG - White color, positioned below arrow */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform translate-y-[-98%] z-50">
        <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="#ffffff"
            style={{ fill: '#ffffff' }}></path>
        </svg>
      </div>

      {/* Scroll to top button - Highest z-index */}
      <div className="absolute top-0 right-8 transform -translate-y-1/2 z-[200]">
        <motion.button
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
          <div className="md:col-span-5">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-2xl mr-4">V</div>
              <h3 className="text-2xl font-bold text-white">
                Vansh Oberoi
              </h3>
            </div>
            <p className="text-white/90 mb-6 text-lg leading-relaxed">
              Code. Create. Innovate. Deliver.
            </p>
            <div className="flex space-x-2 hover:space-x-6 transition-all duration-300">
              {personal.contact.socials.map((social) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.platform}
                >
                  {socialIcons[social.icon as keyof typeof socialIcons]}
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/20 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Experience', path: '/experience' },
                { name: 'Projects', path: '/projects' },
                { name: 'Contact', path: '/contact' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-white/80 hover:text-white transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>



          <div className="md:col-span-4">
            <h3 className="text-xl font-bold text-white mb-6 border-b border-white/20 pb-2">
              Contact
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white mr-4">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <a
                    href={`mailto:${personal.contact.email}`}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    {personal.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white mr-4">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Phone</p>
                  <a
                    href={`tel:${personal.contact.phone}`}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    {personal.contact.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white mr-4">
                  <MapPin size={18} />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Location</p>
                  <a
                    href="https://maps.app.goo.gl/jaBmqeRcnrBwa1T58"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    {personal.contact.address}
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
            <p className="text-white/70 text-sm mb-2 md:mb-0 md:mr-6">
              © 2024-{currentYear} Vansh Oberoi. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <Link
                to="/privacy-policy"
                className="text-white/70 text-sm hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex items-center">
              <p className="text-white/70 text-sm flex items-center">
                Made with <span className="mx-1 text-red-500">❤</span> using
                <span className="ml-1 text-white font-medium">React</span> &
                <span className="ml-1 text-white font-medium">Vite</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
