import React, { useState } from 'react';
import { Heart, Maximize2, BedDouble, Bath, Square, Star, MapPin, X, ArrowRight, Phone, MessageSquare, Check, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Property, PropertyFilter, ConsultationBooking } from '../types';
import { MOCK_PROPERTIES } from '../data';

interface PropertyGridProps {
  filter: PropertyFilter;
  onBookConsultation: (booking: ConsultationBooking) => void;
}

export default function PropertyGrid({ filter, onBookConsultation }: PropertyGridProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  
  // Detail Modal internal scheduling state
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingMsg, setBookingMsg] = useState('');
  const [isBookedSuccess, setIsBookedSuccess] = useState(false);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter((bId) => bId !== id));
    } else {
      setBookmarks([...bookmarks, id]);
    }
  };

  // Filter logic
  const filteredProperties = MOCK_PROPERTIES.filter((item) => {
    // Search keyword matching title or location or type
    const matchesSearch =
      !filter.search ||
      item.title.toLowerCase().includes(filter.search.toLowerCase()) ||
      item.location.toLowerCase().includes(filter.search.toLowerCase()) ||
      item.type.toLowerCase().includes(filter.search.toLowerCase());

    // Type matching
    const matchesType = !filter.type || item.type === filter.type;

    // Location matching
    const matchesLocation =
      !filter.location || item.location.includes(filter.location);

    // Price matching
    const matchesPrice = item.price <= filter.maxPrice;

    return matchesSearch && matchesType && matchesLocation && matchesPrice;
  });

  const handleOpenDetail = (prop: Property) => {
    setSelectedProperty(prop);
    setIsBookedSuccess(false);
    // Auto-fill dates
    setBookingDate('2026-05-25');
    setBookingTime('10:00');
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProperty || !bookingName || !bookingEmail || !bookingPhone) return;

    onBookConsultation({
      name: bookingName,
      email: bookingEmail,
      phone: bookingPhone,
      propertyId: selectedProperty.id,
      propertyName: selectedProperty.title,
      date: bookingDate,
      time: bookingTime,
      message: bookingMsg,
    });

    setIsBookedSuccess(true);
    // Reset form fields
    setBookingName('');
    setBookingEmail('');
    setBookingPhone('');
    setBookingMsg('');
  };

  return (
    <div id="property" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400 block mb-2 font-mono">
              CURATED COLLECTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 dark:text-slate-50 font-normal tracking-tight">
              Pilihan Kediaman Estetik Terbaik
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md font-light leading-relaxed">
            Menghimpun mahakarya residensial terbaik dari penjuru kepulauan Nusantara, menawarkan interior berkarakter tinggi dan kesempurnaan struktur tropis.
          </p>
        </div>

        {/* Listings Grid */}
        {filteredProperties.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-300/60 dark:border-slate-800/60">
            <p className="text-slate-400 dark:text-slate-500 text-sm">Tidak ada properti mewah yang cocok dengan filter pencarian Anda.</p>
            <button
              onClick={() => setSelectedProperty(null)}
              className="mt-3 text-xs text-brand-500 font-bold decoration-slice hover:underline"
            >
              Ubah kriteria filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => {
              const isBookmarked = bookmarks.includes(property.id);
              return (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all border border-slate-200/40 dark:border-slate-800/50 flex flex-col group cursor-pointer"
                  onClick={() => handleOpenDetail(property)}
                >
                  {/* Card Banner Image Section */}
                  <div className="relative h-64 overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Dark gradient bottom blend on card image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

                    {/* Bookmark Heart Overlay */}
                    <button
                      onClick={(e) => toggleBookmark(property.id, e)}
                      className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/70 backdrop-blur-md dark:bg-slate-950/70 text-slate-700 dark:text-slate-300 flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm border border-white/20"
                      aria-label="Simpan favorit"
                    >
                      <Heart
                        className={`w-4 h-4 transition-colors ${
                          isBookmarked ? 'fill-rose-500 text-rose-500' : 'text-slate-600 dark:text-slate-300'
                        }`}
                      />
                    </button>

                    {/* Rating badge */}
                    <div className="absolute top-4 left-4 inline-flex items-center gap-1 text-xs font-bold leading-none bg-slate-950/60 backdrop-blur-md text-amber-400 px-2.5 py-1 rounded font-mono border border-white/5">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{property.rating}</span>
                    </div>

                    {/* Left category tag */}
                    {property.tag && (
                      <div className="absolute bottom-4 left-4 bg-brand-600 text-white font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded leading-none">
                        {property.tag}
                      </div>
                    )}
                  </div>

                  {/* Property Card Info Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Price & Category */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs uppercase tracking-widest font-mono text-brand-600 dark:text-brand-400 font-bold">
                          {property.type}
                        </span>
                        <span className="text-sm font-bold font-mono text-slate-900 dark:text-slate-100">
                          Rp {(property.price / 1000000000).toFixed(1)} Miliar
                        </span>
                      </div>

                      <h3 className="text-xl font-serif text-slate-800 dark:text-slate-50 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2 font-normal">
                        {property.title}
                      </h3>

                      <p className="text-slate-400 dark:text-slate-500 text-xs flex items-center gap-1 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" /> {property.location}
                      </p>

                      <p className="text-xs text-slate-500 dark:text-slate-400 font-light line-clamp-2 leading-relaxed mb-4">
                        {property.description}
                      </p>
                    </div>

                    {/* Footer specs (Bed, Bath, Area) */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400 font-mono">
                      <span className="flex items-center gap-1.5 font-sans">
                        <BedDouble className="w-4 h-4 text-slate-400" /> {property.bed} KT
                      </span>
                      <span className="flex items-center gap-1.5 font-sans">
                        <Bath className="w-4 h-4 text-slate-400" /> {property.bath} KM
                      </span>
                      <span className="flex items-center gap-1.5 font-sans">
                        <Square className="w-3.5 h-3.5 text-slate-400" /> {property.areaSqft} m²
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Detailed Property Overlay Modal (Toggled on card click) */}
        <AnimatePresence>
          {selectedProperty && (
            <div className="fixed inset-0 z-50 flex items-center justify-end overflow-hidden">
              {/* Overlay Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProperty(null)}
                className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
              />

              {/* Slider Panel right-docked drawer */}
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                className="relative w-full max-w-2xl h-full bg-white dark:bg-slate-900 shadow-2xl flex flex-col z-10 border-l border-slate-200 dark:border-slate-800"
              >
                {/* Header buttons */}
                <div className="absolute top-4 right-4 z-20 flex gap-2">
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="w-10 h-10 rounded-full bg-slate-950/20 backdrop-blur-md hover:bg-slate-950/40 text-white flex items-center justify-center transition border border-white/10 cursor-pointer"
                    aria-label="Tutup detail"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main Scrollable Area */}
                <div className="flex-1 overflow-y-auto no-scrollbar pb-8">
                  {/* Hero backdrop inside modal */}
                  <div className="relative h-80 bg-slate-800">
                    <img
                      src={selectedProperty.image}
                      alt={selectedProperty.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent" />
                    
                    {/* Badge Category */}
                    <div className="absolute bottom-6 left-6 space-y-2">
                      <span className="bg-brand-500 text-white font-mono text-xs px-2.5 py-1 rounded inline-block uppercase tracking-wider">
                        {selectedProperty.type}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif text-white block">
                        {selectedProperty.title}
                      </h3>
                    </div>
                  </div>

                  {/* Panel Content info block */}
                  <div className="p-6 space-y-6">
                    {/* Specs / Price strip */}
                    <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60">
                      <div>
                        <span className="text-xs text-slate-400 dark:text-slate-500 block uppercase font-mono tracking-widest">
                          HARGA INVESTASI EKSKLUSIF
                        </span>
                        <span className="text-xl sm:text-2xl font-serif text-brand-700 dark:text-brand-300">
                          Rp {selectedProperty.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm font-mono text-slate-600 dark:text-slate-300">
                        <span className="flex items-center gap-1">
                          <BedDouble className="w-4.5 h-4.5 text-brand-500" /> {selectedProperty.bed} KT
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Bath className="w-4.5 h-4.5 text-brand-500" /> {selectedProperty.bath} KM
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Square className="w-4 h-4 text-brand-500" /> {selectedProperty.areaSqft} m²
                        </span>
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Tentang Kediaman
                      </h4>
                      <p className="text-sm text-slate-650 dark:text-slate-300 leading-relaxed font-light">
                        {selectedProperty.description}
                      </p>
                    </div>

                    {/* Features Grid */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                        Keunggulan Arsitektur & Fasilitas
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {selectedProperty.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded-lg border border-slate-200/40 dark:border-slate-800/30"
                          >
                            <Check className="w-4 h-4 text-brand-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Advisor Details Section */}
                    <div className="p-4 rounded-xl border border-slate-200/65 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={selectedProperty.agent.avatar}
                          alt={selectedProperty.agent.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-slate-300 dark:border-slate-700"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <span className="text-xs text-slate-400 dark:text-slate-500 block leading-tight font-mono">
                            OFFICIAL PROPERTY CONSULTANT
                          </span>
                          <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
                            {selectedProperty.agent.name}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 block leading-none">
                            {selectedProperty.agent.role}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${selectedProperty.agent.phone}`}
                          className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-md transition duration-200 flex items-center justify-center cursor-pointer"
                          aria-label="Telepon Agen"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <a
                          href={`https://wa.me/${selectedProperty.agent.phone.replace(/[^0-9]/g, '')}?text=Halo%20Proptera%2C%20saya%20tertarik%20dengan%20properti%20${encodeURIComponent(selectedProperty.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2.5 rounded-md transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                        >
                          <MessageSquare className="w-4 h-4" /> Hubungi WA
                        </a>
                      </div>
                    </div>

                    {/* Schedule Visitation Form Drawer inside Details */}
                    <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1 flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-brand-600 dark:text-brand-400" /> Jadwalkan Kunjungan Lokasi
                        </h4>
                        <p className="text-xs text-slate-400 dark:text-slate-500">
                          Pesan agenda tinjau privat langsung ke lokasi vila ditemani oleh spesialis real estate kami.
                        </p>
                      </div>

                      {isBookedSuccess ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-emerald-100 dark:bg-emerald-950/40 p-5 rounded-lg border border-emerald-300/40 dark:border-emerald-800/40 text-center"
                        >
                          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-3">
                            <Check className="w-5 h-5 stroke-[3]" />
                          </div>
                          <span className="block text-sm font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                            Reservasi Terjadwal!
                          </span>
                          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-light block">
                            Terima kasih, tim legal kami akan segera menghubungi Anda dengan undangan resmi kunjungan.
                          </span>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleCreateBooking} className="space-y-3.5">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] uppercase font-mono text-slate-400 dark:text-slate-500 mb-1">
                                Tanggal Kunjungan
                              </label>
                              <input
                                type="date"
                                required
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-800 text-xs border-none rounded py-2 px-3 outline-none text-slate-800 dark:text-slate-200"
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] uppercase font-mono text-slate-400 dark:text-slate-500 mb-1">
                                Pilih Jam (WIB)
                              </label>
                              <input
                                type="time"
                                required
                                value={bookingTime}
                                onChange={(e) => setBookingTime(e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-800 text-xs border-none rounded py-2 px-3 outline-none text-slate-800 dark:text-slate-200"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] uppercase font-mono text-slate-400 dark:text-slate-500">
                              Nama Lengkap Anda
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Nama Anda"
                              value={bookingName}
                              onChange={(e) => setBookingName(e.target.value)}
                              className="w-full bg-slate-100 dark:bg-slate-800 text-xs border-none rounded py-2 px-3 outline-none text-slate-800 dark:text-slate-200"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="block text-[10px] uppercase font-mono text-slate-400 dark:text-slate-500">
                                Email Aktif
                              </label>
                              <input
                                type="email"
                                required
                                placeholder="nama@email.com"
                                value={bookingEmail}
                                onChange={(e) => setBookingEmail(e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-800 text-xs border-none rounded py-2 px-3 outline-none text-slate-800 dark:text-slate-200"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="block text-[10px] uppercase font-mono text-slate-400 dark:text-slate-500">
                                Nomor Telepon (WA)
                              </label>
                              <input
                                type="tel"
                                required
                                placeholder="0812-xxxx-xxxx"
                                value={bookingPhone}
                                onChange={(e) => setBookingPhone(e.target.value)}
                                className="w-full bg-slate-100 dark:bg-slate-800 text-xs border-none rounded py-2 px-3 outline-none text-slate-800 dark:text-slate-200"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="block text-[10px] uppercase font-mono text-slate-400 dark:text-slate-500">
                              Catatan Khusus (Opsional)
                            </label>
                            <textarea
                              rows={2}
                              placeholder="Saya ingin meminta berkas SHM dan brosur cetak terlebih dahulu..."
                              value={bookingMsg}
                              onChange={(e) => setBookingMsg(e.target.value)}
                              className="w-full bg-slate-100 dark:bg-slate-800 text-xs border-none rounded py-2 px-3 outline-none resize-none text-slate-800 dark:text-slate-200 font-sans"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 bg-slate-900 hover:bg-brand-600 text-white dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-brand-100 text-sm font-bold tracking-wide rounded-lg transition duration-200 shadow-md cursor-pointer flex items-center justify-center gap-2"
                          >
                            Konfirmasi Jadwal Kunjungan <ArrowRight className="w-4 h-4" />
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
