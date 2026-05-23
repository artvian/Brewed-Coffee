import React from 'react';
import { Search, MapPin, Building2, SlidersHorizontal, DollarSign } from 'lucide-react';
import { PropertyFilter } from '../types';

interface PropertyFinderProps {
  filter: PropertyFilter;
  setFilter: (filter: PropertyFilter) => void;
  onReset: () => void;
}

export default function PropertyFinder({ filter, setFilter, onReset }: PropertyFinderProps) {
  const locations = ['Semua', 'Bali', 'Bandung', 'Jakarta'];
  const types = ['Semua', 'Villa', 'Apartment', 'Mansion', 'Lodge'];

  const handleLocationBadgeClick = (loc: string) => {
    setFilter({
      ...filter,
      location: loc === 'Semua' ? '' : loc,
    });
  };

  const handleTypeBadgeClick = (type: string) => {
    setFilter({
      ...filter,
      type: type === 'Semua' ? '' : type,
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 relative z-20 -mt-16">
      {/* Search Container Panel */}
      <div className="bg-white/85 dark:bg-slate-900/90 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-slate-200/40 dark:border-slate-800/60 transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Search Box */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5" /> Cari Properti
            </label>
            <input
              type="text"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              placeholder="Cari Amarta, Komorebi, Menteng..."
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2.5 px-3.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/50 text-slate-800 dark:text-slate-200"
            />
          </div>

          {/* Location Dropdown */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" /> Wilayah / Lokasi
            </label>
            <select
              value={filter.location}
              onChange={(e) => setFilter({ ...filter, location: e.target.value })}
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2.5 px-3.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/50 text-slate-800 dark:text-slate-200"
            >
              <option value="">Semua Lokasi</option>
              <option value="Bali">Bali (Uluwatu, Canggu, Ubud)</option>
              <option value="Bandung">Bandung (Dago Atas)</option>
              <option value="Jakarta">Jakarta (Menteng, Sudirman)</option>
            </select>
          </div>

          {/* Property Type Dropdown */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5" /> Tipe Hunian
            </label>
            <select
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
              className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2.5 px-3.5 text-sm outline-none focus:ring-2 focus:ring-brand-500/50 text-slate-800 dark:text-slate-200"
            >
              <option value="">Semua Tipe</option>
              <option value="Villa">Villa Mandiri</option>
              <option value="Apartment">Apartment & Penthouse</option>
              <option value="Mansion">Mansion Eksklusif</option>
              <option value="Lodge">Cabin & Lodge</option>
            </select>
          </div>

          {/* Max Price Range Slider */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5" /> Budget Maksimal
              </label>
              <span className="text-xs font-mono font-bold text-brand-600 dark:text-brand-400">
                Rp {filter.maxPrice === 75000000000 ? '75M+' : `${filter.maxPrice / 1000000000}M`}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-2.5">
              <input
                type="range"
                min="5000000000"
                max="75000000000"
                step="1000000000"
                value={filter.maxPrice}
                onChange={(e) => setFilter({ ...filter, maxPrice: parseInt(e.target.value) })}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
              />
            </div>
          </div>
        </div>

        {/* Quick Badges / Clear Actions */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 dark:text-slate-500 mr-2">Quick Filter:</span>
            
            {/* Quick Location Selection Badges */}
            <div className="flex gap-1.5">
              {locations.map((loc) => {
                const isSelected = (loc === 'Semua' && !filter.location) || filter.location === loc;
                return (
                  <button
                    key={loc}
                    onClick={() => handleLocationBadgeClick(loc)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors font-medium border cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-slate-900 text-white dark:bg-slate-100 dark:border-slate-100 dark:text-slate-950'
                        : 'bg-transparent border-slate-200/60 text-slate-600 dark:border-slate-800 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600'
                    }`}
                  >
                    {loc}
                  </button>
                );
              })}
            </div>

            <div className="w-[1px] h-4 bg-slate-300 dark:bg-slate-800 mx-2 hidden sm:block" />

            {/* Quick Type Selection Badges */}
            <div className="flex gap-1.5">
              {types.map((tp) => {
                const isSelected = (tp === 'Semua' && !filter.type) || filter.type === tp;
                return (
                  <button
                    key={tp}
                    onClick={() => handleTypeBadgeClick(tp)}
                    className={`text-xs px-3 py-1.5 rounded-full transition-colors font-medium border cursor-pointer ${
                      isSelected
                        ? 'bg-brand-600 border-brand-600 text-white dark:bg-brand-400 dark:border-brand-400 dark:text-slate-950'
                        : 'bg-transparent border-slate-200/60 text-slate-600 dark:border-slate-800 dark:text-slate-400 hover:border-slate-400 dark:hover:border-slate-600'
                    }`}
                  >
                    {tp}
                  </button>
                );
              })}
            </div>
          </div>

          <button
            onClick={onReset}
            className="text-xs text-brand-600 dark:text-brand-400 underline hover:opacity-80 transition cursor-pointer font-medium"
          >
            Reset Semua Filter
          </button>
        </div>
      </div>
    </div>
  );
}
