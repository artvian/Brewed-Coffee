import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import PropertyFinder from './components/PropertyFinder';
import PropertyGrid from './components/PropertyGrid';
import MortgageCalculator from './components/MortgageCalculator';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import AIConcierge from './components/AIConcierge';

import { PropertyFilter, ConsultationBooking } from './types';
import { SERVICES_LIST } from './data';
import { Shield, Compass, Key, TrendingUp, Sparkles, Building2, Eye, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  
  // Standard financial initial filter bounds matching Rp 75M max
  const [filter, setFilter] = useState<PropertyFilter>({
    type: '',
    minPrice: 0,
    maxPrice: 75000000000,
    search: '',
    location: '',
  });

  const [bookingSuccess, setBookingSuccess] = useState<ConsultationBooking | null>(null);

  // Initialize Dark Mode state from native class lists
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Track scroll position to mark active navigation section in Header links automatically
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      const sections = ['hero', 'about', 'property', 'service', 'calculator', 'stories', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section === 'hero' ? 'about' : section); // Map home back properly
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  };

  const handleResetFilters = () => {
    setFilter({
      type: '',
      minPrice: 0,
      maxPrice: 75000000000,
      search: '',
      location: '',
    });
  };

  const handleNewBooking = (booking: ConsultationBooking) => {
    setBookingSuccess(booking);
    // Auto-timeout notifications
    setTimeout(() => {
      setBookingSuccess(null);
    }, 8500);
  };

  // Map icons from strings
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="w-5 h-5 text-brand-600 dark:text-brand-300" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-brand-600 dark:text-brand-300" />;
      case 'Key':
        return <Key className="w-5 h-5 text-brand-600 dark:text-brand-300" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-brand-600 dark:text-brand-300" />;
      default:
        return <Sparkles className="w-5 h-5 text-brand-600 dark:text-brand-300" />;
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen font-sans transition-colors duration-300">
      
      {/* Dynamic blurred fixed Header navigation */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onNavigate={handleNavigate}
        activeSection={activeSection}
      />

      {/* Main Hero slideshow carousel matching the visual reference */}
      <HeroCarousel
        onContactClick={() => handleNavigate('contact')}
        onExploreClick={() => handleNavigate('property')}
      />

      {/* Embedded Search Console on Hero margin overlap */}
      <PropertyFinder
        filter={filter}
        setFilter={setFilter}
        onReset={handleResetFilters}
      />

      {/* Success Booking notification banner overlay */}
      <AnimatePresence>
        {bookingSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-55%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -55, x: '-50%' }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-55 w-full max-w-md bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-start gap-4"
          >
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="text-left flex-1">
              <span className="block font-bold text-sm">Undangan Tinjaun Terkirim!</span>
              <span className="text-xs text-slate-100 font-light block mt-1">
                Halo <strong>{bookingSuccess.name}</strong>, spesialis kami telah menjadwalkan kunjungan privat Anda untuk <strong>{bookingSuccess.propertyName}</strong> pada {bookingSuccess.date} jam {bookingSuccess.time} WIB. Brosur eksklusif dikirim ke {bookingSuccess.email}.
              </span>
            </div>
            <button
              onClick={() => setBookingSuccess(null)}
              className="text-white/80 hover:text-white text-xs cursor-pointer"
            >
              Tutup
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Curated Luxury About Section */}
      <section id="about" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Description columns */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400 block font-mono">
                THE PROPTERA ETHOS
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 dark:text-slate-50 font-normal tracking-tight">
                Menciptakan Standar Baru Kehidupan Tropis Mewah
              </h2>
              <p className="text-sm text-slate-505 dark:text-slate-350 leading-relaxed font-light">
                Didirikan oleh konsorsium desainer dan analis real estate ternama, Proptera mengkhususkan diri mengumpulkan properti langka dan berkarakter arsitektural matang. Kami memperlakukan rumah bukan sekadar bangunan semen dan bata, melainkan sebagai sebuah warisan pribadi yang tak lekang waktu (timeless legacy).
              </p>
              
              {/* Core Features bullets */}
              <div className="space-y-4 pt-2">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-brand-600 dark:text-brand-300">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-800 dark:text-slate-200">Arsitektur Bintang Lima</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-light block leading-normal">Setiap vila diseleksi langsung oleh panel kurator arsitektur berskala internasional.</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-brand-600 dark:text-brand-300">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-800 dark:text-slate-200">Privasi Tanpa Celah</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-light block leading-normal">Mengutamakan tata ruang tertutup (low-density layout) demi kenyamanan mutlak penghuninya.</span>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-brand-600 dark:text-brand-300">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-slate-800 dark:text-slate-200">Aset Berdaulat</span>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-light block leading-normal">Legalitas tervalidasi sertifikat HGB/SHM bersih tanpa konflik hukum.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right visuals Column (Splendid overlapping banners) */}
            <div className="lg:col-span-7 grid grid-cols-12 gap-4 relative">
              <div className="col-span-8 overflow-hidden rounded-2xl bg-slate-100 h-96 shadow-lg transform hover:scale-101 transition duration-550 border border-slate-200/20">
                <img
                  src="/src/assets/images/proptera_hero_villas_1779525426492.png"
                  alt="Uluwatu stone villa landscape"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="col-span-4 self-end overflow-hidden rounded-2xl bg-slate-100 h-64 -translate-x-12 -translate-y-12 shadow-2xl relative z-10 hidden sm:block border-4 border-white dark:border-slate-900 transition-all duration-300 transform hover:scale-105">
                <img
                  src="/src/assets/images/proptera_japandi_lodge_1779525457262.png"
                  alt="Bandung lodge alpine decor"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Grid containing properties with dynamic detail view drawers */}
      <PropertyGrid
        filter={filter}
        onBookConsultation={handleNewBooking}
      />

      {/* Services List section */}
      <section id="service" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300 border-t border-slate-200/40 dark:border-slate-850/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400 block mb-2 font-mono">
              PRESTIGE ASSISTANCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 dark:text-slate-50 font-normal tracking-tight">
              Layanan Eksklusif yang Melampaui Batas
            </h2>
            <p className="text-xs sm:text-sm text-slate-505 dark:text-slate-400 mt-2 font-light leading-relaxed">
              Kami memandu Anda di setiap jengkal proses pembiayaan hingga tanda tangan akta, menjamin kedamaian batin seutuhnya.
            </p>
          </div>

          {/* Cards dynamic mapping */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES_LIST.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200/40 dark:border-slate-800 hover:border-brand-500/40 dark:hover:border-brand-400/40 transition-all duration-300 space-y-4 group text-left"
              >
                <div className="w-11 h-11 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/30 dark:border-slate-800 shadow-sm flex items-center justify-center text-slate-950 dark:text-white group-hover:scale-110 transition duration-300">
                  {getServiceIcon(service.icon)}
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Financial calculator */}
      <MortgageCalculator />

      {/* Testimonials Review panel */}
      <Testimonials />

      {/* Editorial footer Section */}
      <Footer />

      {/* Floating Clara AI Chat Assistant bot */}
      <AIConcierge />

    </div>
  );
}
