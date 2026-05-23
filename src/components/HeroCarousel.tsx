import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, UserCheck, Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { HERO_SLIDES } from '../data';

interface HeroCarouselProps {
  onContactClick: () => void;
  onExploreClick: () => void;
}

export default function HeroCarousel({ onContactClick, onExploreClick }: HeroCarouselProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIdx((prevIdx) => (prevIdx + 1) % HERO_SLIDES.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [autoplay]);

  const nextSlide = () => {
    setAutoplay(false);
    setCurrentIdx((prevIdx) => (prevIdx + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setAutoplay(false);
    setCurrentIdx((prevIdx) => (prevIdx - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const slide = HERO_SLIDES[currentIdx];

  return (
    <div id="hero" className="relative h-screen min-h-[650px] overflow-hidden bg-slate-900 text-white select-none">
      {/* Background Image Carousel with visual gradient overlays */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0.8, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0.8, scale: 0.98 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.subTitle}
            className="w-full h-full object-cover opacity-85 brightness-[0.7] focus:outline-none"
            referrerPolicy="no-referrer"
          />
          {/* Stunning fog-gradient matches reference's smooth bottom and top fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-950/20 to-slate-950/40 dark:from-slate-950 dark:via-slate-950/40 dark:to-slate-950/60 transition-colors duration-300" />
        </motion.div>
      </AnimatePresence>

      {/* Main Premium Text Container */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between items-center max-w-7xl mx-auto px-6 pt-36 pb-32">
        <div className="flex-1 flex flex-col justify-center items-center text-center max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Slide Category Label */}
              <span className="inline-block text-xs uppercase tracking-[0.3em] font-mono text-brand-300 bg-slate-950/40 px-3 py-1.5 rounded backdrop-blur-sm border border-brand-500/10">
                {slide.tag} • {slide.location}
              </span>

              {/* Majestic Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal leading-[1.12] tracking-tight text-white drop-shadow-md">
                {slide.title}
              </h1>

              {/* Subheading localized */}
              <p className="font-sans text-sm sm:text-base leading-relaxed text-slate-200/90 max-w-2xl mx-auto font-light drop-shadow">
                {slide.description}
              </p>

              {/* Interactive buttons */}
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={onContactClick}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white text-slate-950 font-bold tracking-wide rounded text-sm hover:bg-brand-100 transition shadow-lg cursor-pointer transform hover:-translate-y-0.5"
                  id="hero-contact-cta"
                >
                  Contact us
                </button>
                <button
                  onClick={onExploreClick}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold tracking-wide rounded text-sm transition backdrop-blur-sm cursor-pointer border border-white/20 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  Jelajahi Properti <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Section containing indicators, descriptions and stats exactly as in reference */}
        <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
          {/* Left: Dynamic Carousel progress bar and controller buttons */}
          <div className="md:col-span-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-slate-950/35 backdrop-blur-md p-4 rounded-xl border border-white/5">
            <div className="flex items-center gap-3">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center border border-white/20 transition cursor-pointer text-white"
                aria-label="Previous property"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Scroll meter path indicators matching PROPTERA image exactly */}
              <div className="w-24 h-[3px] bg-white/20 relative rounded-full overflow-hidden">
                <motion.div
                  className="absolute h-full bg-brand-400"
                  animate={{ left: `${(currentIdx / HERO_SLIDES.length) * 100}%` }}
                  style={{ width: `${100 / HERO_SLIDES.length}%` }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                />
              </div>

              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center border border-white/20 transition cursor-pointer text-white"
                aria-label="Next property"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Micro active property title and details */}
            <div className="text-left text-xs text-slate-300 font-sans tracking-wide leading-tight">
              <span className="font-bold text-white block font-mono">{slide.subTitle}</span>
              <span>{slide.location} • Rp {slide.price.toLocaleString('id-ID')}</span>
            </div>
          </div>

          {/* Right: Premium client trusted stats badges (matching illustration "+30k") */}
          <div className="md:col-span-6 flex justify-start md:justify-end">
            <div className="flex items-center gap-4 bg-slate-950/30 backdrop-blur-sm p-3.5 rounded-xl border border-white/5">
              {/* Overlapping client avatars */}
              <div className="flex -space-x-3.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100"
                  alt="Client portrait"
                  className="w-9 h-9 rounded-full object-cover border-2 border-slate-900"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100"
                  alt="Client portrait"
                  className="w-9 h-9 rounded-full object-cover border-2 border-slate-900"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100"
                  alt="Client portrait"
                  className="w-9 h-9 rounded-full object-cover border-2 border-slate-900"
                  referrerPolicy="no-referrer"
                />
                <div className="w-9 h-9 rounded-full bg-brand-100 text-slate-950 flex items-center justify-center text-[10px] font-bold border-2 border-slate-900 font-mono">
                  +30k
                </div>
              </div>

              {/* Trust Counter text */}
              <div className="text-left">
                <span className="block text-sm font-bold text-white font-mono leading-none">38K+ Clients</span>
                <span className="text-[11px] text-slate-300 font-sans">Sertifikasi & diakomodasi global.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
