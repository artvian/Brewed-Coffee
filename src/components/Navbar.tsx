import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Sparkles, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ darkMode, setDarkMode, onNavigate, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'about', label: 'About' },
    { id: 'property', label: 'Property' },
    { id: 'service', label: 'Service' },
    { id: 'calculator', label: 'KPR Calc' },
    { id: 'stories', label: 'Stories' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleMenuClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <nav
        id="proptera-navbar"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-50/90 dark:bg-slate-950/90 backdrop-blur-md py-4 shadow-sm border-b border-slate-200/50 dark:border-slate-800/50'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo Brand matching the image style */}
          <button
            onClick={() => handleMenuClick('hero')}
            className={`font-sans font-extrabold tracking-[0.2em] text-2xl uppercase transition-colors duration-300 ${
              scrolled
                ? 'text-slate-900 dark:text-slate-50'
                : 'text-slate-900 dark:text-slate-100'
            }`}
          >
            PROPTERA
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`text-sm font-medium tracking-wide transition-all duration-200 relative py-1 hover:text-brand-600 dark:hover:text-brand-300 ${
                  activeSection === item.id
                    ? scrolled
                      ? 'text-slate-900 dark:text-slate-50 font-semibold'
                      : 'text-slate-900 dark:text-slate-50 font-semibold'
                    : scrolled
                    ? 'text-slate-600 dark:text-slate-400'
                    : 'text-slate-700 dark:text-slate-200'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-600 dark:bg-brand-400"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Actions: Theme Switch, Auth, Mobile Toggle */}
          <div className="flex items-center gap-4">
            {/* Dark Mode Switcher with transit effects */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full cursor-pointer hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors text-slate-800 dark:text-slate-200"
              aria-label="Toggle dark mode"
              id="theme-toggle-btn"
            >
              <AnimatePresence mode="wait" initial={false}>
                {darkMode ? (
                  <motion.div
                    key="sun"
                    initial={{ y: -10, opacity: 0, rotate: -40 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 10, opacity: 0, rotate: 40 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5 text-amber-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ y: -10, opacity: 0, rotate: 40 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 10, opacity: 0, rotate: -40 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5 text-indigo-900" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Desktop Quick Auth Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => handleMenuClick('contact')}
                className={`text-sm font-semibold hover:opacity-85 transition-colors cursor-pointer ${
                  scrolled ? 'text-slate-800 dark:text-slate-200' : 'text-slate-800 dark:text-slate-100'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => handleMenuClick('contact')}
                className="bg-slate-900 dark:bg-slate-100 text-slate-50 dark:text-slate-900 font-semibold px-5 py-2 rounded-md hover:bg-brand-700 dark:hover:bg-brand-100 transition-all text-sm shadow-sm cursor-pointer"
              >
                Register
              </button>
            </div>

            {/* Mobile Hamburger Burger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-slate-200/50 dark:hover:bg-slate-800/50 transition-colors text-slate-900 dark:text-slate-50"
              aria-label={mobileMenuOpen ? 'Tutup Menu' : 'Buka Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[71px] z-45 bg-slate-50 dark:bg-slate-950 px-6 py-8 flex flex-col justify-between md:hidden border-t border-slate-200 dark:border-slate-800"
          >
            <div className="flex flex-col gap-5">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleMenuClick(item.id)}
                  className={`text-left text-lg font-medium py-2 border-b border-slate-100 dark:border-slate-900 transition-colors ${
                    activeSection === item.id
                      ? 'text-brand-600 dark:text-brand-300 font-bold'
                      : 'text-slate-800 dark:text-slate-300'
                  }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            <div className="flex flex-col gap-4 pb-8">
              <button
                onClick={() => handleMenuClick('contact')}
                className="w-full text-center py-3 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-300 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 font-semibold transition"
              >
                Masuk / Login
              </button>
              <button
                onClick={() => handleMenuClick('contact')}
                className="w-full bg-slate-900 dark:bg-slate-100 text-slate-50 dark:text-slate-900 text-center py-3 rounded-lg hover:opacity-90 font-semibold transition shadow-sm"
              >
                Daftar Akun Baru
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
