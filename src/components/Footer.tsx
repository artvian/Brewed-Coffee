import React, { useState } from 'react';
import { Mail, ArrowRight, Instagram, Linkedin, MessageSquare, ShieldCheck, Award } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer id="contact" className="bg-slate-950 text-slate-400 py-16 dark:bg-slate-999 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main upper footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-900">
          
          {/* Brand block (Left) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="font-sans font-extrabold tracking-[0.25em] text-2xl text-white uppercase block">
              PROPTERA
            </span>
            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed max-w-sm">
              Membangun warisan kemewahan sejati dan kenyamanan hidup tropis melalui kurasi arsitektur residensial berakar kuat dan elegan di Asia Tenggara.
            </p>
            {/* Trust indicators */}
            <div className="flex gap-4 pt-2 text-xs text-brand-400 font-mono">
              <span className="flex items-center gap-1"><ShieldCheck className="w-4 h-4 text-brand-500" /> Sertifikasi AREBI</span>
              <span className="flex items-center gap-1"><Award className="w-4 h-4 text-brand-500" /> Prop-Design Winner 2025</span>
            </div>
          </div>

          {/* Nav Links block (Middle) */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6">
            <div className="space-y-3">
              <span className="text-xs text-white uppercase tracking-wider font-semibold font-mono">Navigasi</span>
              <ul className="space-y-2 text-xs font-light">
                <li><a href="#hero" className="hover:text-white transition">Home Showcase</a></li>
                <li><a href="#about" className="hover:text-white transition">About Us</a></li>
                <li><a href="#property" className="hover:text-white transition">Luxury Catalog</a></li>
                <li><a href="#calculator" className="hover:text-white transition">Simulasi KPR</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-xs text-white uppercase tracking-wider font-semibold font-mono">Wilayah</span>
              <ul className="space-y-2 text-xs font-light">
                <li><a href="#property" className="hover:text-white transition">Uluwatu, Bali</a></li>
                <li><a href="#property" className="hover:text-white transition">Canggu, Bali</a></li>
                <li><a href="#property" className="hover:text-white transition">Dago, Bandung</a></li>
                <li><a href="#property" className="hover:text-white transition">Menteng, Jakarta</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-xs text-white uppercase tracking-wider font-semibold font-mono">Bantuan</span>
              <ul className="space-y-2 text-xs font-light">
                <li><a href="https://wa.me/6281234567890" target="_blank" className="hover:text-white transition">Kontak Layanan</a></li>
                <li><span className="block opacity-65">Kebijakan Privasi</span></li>
                <li><span className="block opacity-65">Syarat & Ketentuan</span></li>
              </ul>
            </div>
          </div>

          {/* Newsletters block (Right) */}
          <div className="lg:col-span-3 space-y-4">
            <span className="text-xs text-white uppercase tracking-wider font-semibold font-mono block">
              CATALOG PRIVAT BULANAN
            </span>
            <p className="text-xs font-light text-slate-400">
              Daftarkan email Anda untuk menerima pemberitahuan unit rahasia (off-market listings) yang belum dirilis ke publik umum.
            </p>

            {subscribed ? (
              <div className="bg-brand-500/10 border border-brand-500/20 p-3.5 rounded text-xs text-brand-400 font-medium">
                Email Terdaftar! Bersiaplah menerima katalog VIP kami mulai bulan ini.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-1 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                <input
                  type="email"
                  required
                  placeholder="email@anda.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent text-xs w-full px-2 text-white outline-none border-none placeholder-slate-500"
                />
                <button
                  type="submit"
                  className="bg-white text-slate-900 p-2 rounded hover:bg-brand-300 transition shrink-0 cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Lower footer copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <span>
            © 2026 PROPTERA Real Estate Sinergy. Hak cipta dilindungi undang-undang.
          </span>
          <div className="flex gap-4">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition flex items-center gap-1.5"
            >
              <Instagram className="w-4 h-4" /> Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition flex items-center gap-1.5"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition flex items-center gap-1.5 text-emerald-500"
            >
              <MessageSquare className="w-4 h-4" /> Whatsapp Konsultan
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
