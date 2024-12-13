import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoLanguageOutline } from 'react-icons/io5';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Layout from './Layout';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ru', name: 'Русский' },
  { code: 'uz', name: 'O\'zbekcha' }
];

const navItems = [
  { name: 'nav.destinations', href: 'flights' },
  { name: 'nav.categories', href: 'categories' },
  { name: 'nav.flights', href: 'places' },
  { name: 'nav.bookings', href: 'contact' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { i18n, t } = useTranslation();
  const languageRef = useRef(null);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageSelect = (language) => {
    i18n.changeLanguage(language.code);
    setIsLanguageOpen(false);
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <Layout>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg transition-all duration-300 ${
          isScrolled ? 'shadow-lg' : ''
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 ">
              <a href="/" className="flex items-center">
                <img 
                  src="/images/photo_2024-10-14_08-46-02.jpg" 
                  alt="Sarhad Travel Logo" 
                  className="h-12 w-auto rounded-[12px]"
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {navItems.map((item) => (
                <span
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                >
                  {t(item.name)}
                </span>
              ))}
            </div>

            {/* Language Selector */}
            <div className="hidden md:flex items-center">
              <div className="relative" ref={languageRef}>
                <span
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:border-primary transition-colors duration-200 cursor-pointer"
                >
                  <IoLanguageOutline className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{currentLanguage.code.toUpperCase()}</span>
                  <MdKeyboardArrowDown 
                    className={`h-5 w-5 text-gray-600 transition-transform duration-200 ${
                      isLanguageOpen ? 'rotate-180' : ''
                    }`}
                  />
                </span>

                <AnimatePresence>
                  {isLanguageOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1"
                    >
                      {languages.map((language) => (
                        <span
                          key={language.code}
                          onClick={() => handleLanguageSelect(language)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${
                            currentLanguage.code === language.code
                              ? 'text-primary bg-primary/5'
                              : 'text-gray-700'
                          } cursor-pointer`}
                        >
                          <span className="font-medium">{language.name}</span>
                          <span className="text-gray-500">{language.code.toUpperCase()}</span>
                        </span>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <span
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 cursor-pointer"
              >
                {isMobileMenuOpen ? (
                  <FaTimes className="h-6 w-6" />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </span>
            </div>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden py-4"
              >
                <div className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <span
                      key={item.name}
                      onClick={() => scrollToSection(item.href)}
                      className="text-base font-medium text-gray-600 hover:text-primary cursor-pointer transition-colors duration-300"
                    >
                      {t(item.name)}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </Layout>
  );
};

export default Navbar;
