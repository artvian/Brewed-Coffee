import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Percent, Calendar, HelpCircle, TrendingUp, Info } from 'lucide-react';

export default function MortgageCalculator() {
  const [propertyPrice, setPropertyPrice] = useState(24500000000); // Rp 24.5 M
  const [downpaymentPct, setDownpaymentPct] = useState(20); // 20% DP
  const [interestRate, setInterestRate] = useState(4.8); // 4.8% annual interest
  const [tenureYears, setTenureYears] = useState(15); // 15 years

  // Calculated values state
  const [downpaymentAmount, setDownpaymentAmount] = useState(0);
  const [loanPrincipal, setLoanPrincipal] = useState(0);
  const [monthlyInstallment, setMonthlyInstallment] = useState(0);
  const [totalInterestPaid, setTotalInterestPaid] = useState(0);

  useEffect(() => {
    const calculatedDP = (propertyPrice * downpaymentPct) / 100;
    const principal = propertyPrice - calculatedDP;
    
    // Monthly interest calculations
    const monthlyRate = interestRate / 12 / 100;
    const totalPayments = tenureYears * 12;

    let installment = 0;
    if (monthlyRate === 0) {
      installment = principal / totalPayments;
    } else {
      installment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }

    const totalPaid = installment * totalPayments;
    const totalInterest = totalPaid - principal;

    setDownpaymentAmount(calculatedDP);
    setLoanPrincipal(principal);
    setMonthlyInstallment(installment);
    setTotalInterestPaid(totalInterest);
  }, [propertyPrice, downpaymentPct, interestRate, tenureYears]);

  const rupiahFormatter = (num: number) => {
    if (num >= 1000000000) {
      return `Rp ${(num / 1000000000).toFixed(2)} Miliar`;
    }
    return `Rp ${num.toLocaleString('id-ID')}`;
  };

  const formattedInstallment = (num: number) => {
    return `Rp ${Math.round(num).toLocaleString('id-ID')}`;
  };

  return (
    <div id="calculator" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600 dark:text-brand-400 block mb-2 font-mono">
            FINANCIAL SIMULATOR
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 dark:text-slate-50 font-normal tracking-tight">
            Kalkulator Simulasi KPR Mandiri
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-3 font-light leading-relaxed">
            Estimasi cicilan bulanan yang disesuaikan langsung dengan suku bunga utama perbankan nasional untuk menghitung pembiayaan investasi properti bernilai tinggi secara akurat.
          </p>
        </div>

        {/* Content Body Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left panel: Input parameters */}
          <div className="lg:col-span-7 bg-slate-50 dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-200/50 dark:border-slate-800/80 space-y-6">
            
            {/* 1. Property Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-700 dark:text-slate-300">Harga Properti Impian</span>
                <span className="text-brand-700 dark:text-brand-400 font-mono font-bold">
                  {rupiahFormatter(propertyPrice)}
                </span>
              </div>
              <input
                type="range"
                min={2000000000}
                max={80000000000}
                step={500000000}
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded appearance-none cursor-pointer accent-brand-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Rp 2 M</span>
                <span>Rp 40 M</span>
                <span>Rp 80 M</span>
              </div>
            </div>

            {/* 2. Down Payment Selector */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-slate-700 dark:text-slate-300">Uang Muka (Down Payment)</span>
                <span className="text-brand-700 dark:text-brand-400 font-mono font-bold">
                  {downpaymentPct}% ({rupiahFormatter(downpaymentAmount)})
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2 pt-1">
                {[10, 20, 30, 40].map((pct) => (
                  <button
                    key={pct}
                    type="button"
                    onClick={() => setDownpaymentPct(pct)}
                    className={`py-2 text-xs font-bold rounded-lg border cursor-pointer font-mono transition-colors ${
                      downpaymentPct === pct
                        ? 'bg-slate-900 border-slate-900 text-white dark:bg-slate-100 dark:border-slate-100 dark:text-slate-950'
                        : 'bg-white border-slate-200 text-slate-600 dark:bg-slate-900 dark:border-slate-850 dark:text-slate-400 hover:border-slate-400'
                    }`}
                  >
                    {pct}% DP
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Interest Rate & Tenure inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Suku Bunga (%) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Suku Bunga Ann. (%)</span>
                  <span className="text-brand-700 dark:text-brand-400 font-mono font-bold">
                    {interestRate}%
                  </span>
                </div>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="15"
                  value={interestRate}
                  onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3.5 text-sm font-mono text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-light block">
                  *Suku bunga rata-rata bank saat ini: ~4.5% - 6.5%
                </span>
              </div>

              {/* Masa Tenor (Tahun) */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold">
                  <span className="text-slate-700 dark:text-slate-300">Masa Tenor Pinjaman</span>
                  <span className="text-brand-700 dark:text-brand-400 font-mono font-bold">
                    {tenureYears} Tahun
                  </span>
                </div>
                <select
                  value={tenureYears}
                  onChange={(e) => setTenureYears(parseInt(e.target.value))}
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 px-3.5 text-sm font-mono text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                >
                  <option value={5}>5 Tahun (60 Bulan)</option>
                  <option value={10}>10 Tahun (120 Bulan)</option>
                  <option value={15}>15 Tahun (180 Bulan)</option>
                  <option value={20}>20 Tahun (240 Bulan)</option>
                  <option value={25}>25 Tahun (300 Bulan)</option>
                </select>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-light block">
                  *Tenor lebih panjang memperkecil cicilan per bulan.
                </span>
              </div>

            </div>

          </div>

          {/* Right panel: Live calculation results */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Giant Monthly Installment Card */}
            <div className="bg-slate-900 dark:bg-slate-950 text-white p-8 rounded-2xl shadow-xl relative overflow-hidden border border-brand-500/10">
              <div className="absolute top-0 right-0 w-28 h-28 bg-brand-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-widest block font-mono mb-2">
                ESTIMASI ANGSURAN BULANAN
              </span>
              <div className="text-3xl sm:text-4xl font-mono font-extrabold text-brand-300 mb-6 tracking-tight">
                {formattedInstallment(monthlyInstallment)} <span className="text-xs text-slate-400 font-sans font-light">/Bulan</span>
              </div>

              {/* Installment specs split lists */}
              <div className="space-y-3.5 text-xs border-t border-white/10 pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Harga Keseluruhan Properti</span>
                  <span className="font-mono text-slate-200 font-semibold">{rupiahFormatter(propertyPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Pembayaran Pertama (DP)</span>
                  <span className="font-mono text-slate-200 font-semibold">{rupiahFormatter(downpaymentAmount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Jumlah Pokok Kredit Dimohon</span>
                  <span className="font-mono text-slate-200 font-semibold">{rupiahFormatter(loanPrincipal)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Total Bunga Akumulatif ({tenureYears}th)</span>
                  <span className="font-mono text-brand-300 font-semibold">{rupiahFormatter(totalInterestPaid)}</span>
                </div>
              </div>
            </div>

            {/* Micro visual Distribution bar */}
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800/80">
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase font-mono tracking-wider font-bold block mb-3">
                Proporsi Pembayaran Kredit
              </span>
              {/* Custom segmented percentage line bar indicator */}
              <div className="h-2.5 w-full rounded-full overflow-hidden flex bg-slate-200 dark:bg-slate-800">
                {/* DP fill */}
                <div
                  className="bg-slate-900 dark:bg-slate-100"
                  style={{ width: `${(downpaymentAmount / (propertyPrice + totalInterestPaid)) * 100}%` }}
                />
                {/* Principal fill */}
                <div
                  className="bg-brand-500"
                  style={{ width: `${(loanPrincipal / (propertyPrice + totalInterestPaid)) * 100}%` }}
                />
                {/* Interest payment fill */}
                <div
                  className="bg-amber-400 animate-pulse"
                  style={{ width: `${(totalInterestPaid / (propertyPrice + totalInterestPaid)) * 100}%` }}
                />
              </div>

              {/* Legend labels */}
              <div className="grid grid-cols-3 gap-1 pt-3 text-[10px] font-mono text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-slate-900 dark:bg-slate-100 block shrink-0" />
                  <span>Uang Muka</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-brand-500 block shrink-0" />
                  <span>Pokok Pinjaman</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded bg-amber-400 block shrink-0" />
                  <span>Bunga Kredit</span>
                </div>
              </div>
            </div>

            {/* Note alert */}
            <div className="rounded-xl p-4 bg-amber-500/5 border border-amber-500/10 text-[11px] leading-relaxed text-amber-800 dark:text-amber-450 flex gap-2">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
              <span>Simulasi ini bersifat perkiraan kasar. Hubungi perwakilan konsultan atau bank terafiliasi kami untuk mendapatkan suku bunga fix-promo terbaru serta verifikasi kelengkapan berkas BI Checking Anda.</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
