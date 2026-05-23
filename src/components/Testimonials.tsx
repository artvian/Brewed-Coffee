import React from 'react';
import { Star, MessageSquareQuote } from 'lucide-react';
import { MOCK_REVIEWS } from '../data';

export default function Testimonials() {
  return (
    <div id="stories" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 border-t border-slate-200/40 dark:border-slate-850/50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400 block mb-2 font-mono">
            VERIFIED EXPERIENCES
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 dark:text-slate-50 font-normal tracking-tight">
            Cerita Kepercayaan dari Pemilik
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-3 font-light leading-relaxed">
            Mendengar kisah nyata dibalik kepemilikan residensial prestisius kami dari barisan direksi, kolektor seni, serta investor ternama global.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 relative border border-slate-200/40 dark:border-slate-800 flex flex-col justify-between"
            >
              {/* Quote icon overlay */}
              <div className="absolute top-6 right-6 text-slate-100 dark:text-slate-800/60 pointer-events-none">
                <MessageSquareQuote className="w-12 h-12 stroke-[1.5]" />
              </div>

              {/* Review Comment body */}
              <div className="space-y-4">
                {/* Visual Gold stars */}
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(review.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200 dark:text-slate-700'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-350 leading-relaxed font-light italic">
                  "{review.comment}"
                </p>
              </div>

              {/* Author info footer */}
              <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                <img
                  src={review.avatar}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-100 uppercase tracking-wide">
                    {review.userName}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block dark:text-slate-500">
                    {review.role} • {review.date}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Stats Panel to match PROPTERA standard */}
        <div className="mt-16 bg-slate-900 text-white p-8 rounded-3xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            <div className="space-y-1">
              <span className="block text-3xl sm:text-4xl font-serif font-bold text-brand-300">Rp 120T+</span>
              <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Total Transaksi Diakomodasi</span>
            </div>
            
            <div className="space-y-1">
              <span className="block text-3xl sm:text-4xl font-serif font-bold text-brand-300">38K+</span>
              <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Klien Terbantu Global</span>
            </div>

            <div className="space-y-1">
              <span className="block text-3xl sm:text-4xl font-serif font-bold text-brand-300">99.4%</span>
              <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider font-semibold">Tingkat Kepuasan Legal</span>
            </div>

            <div className="space-y-1">
              <span className="block text-3xl sm:text-4xl font-serif font-bold text-brand-300">12 Tahun</span>
              <span className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Layanan Tanpa Berkas Cacat</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
