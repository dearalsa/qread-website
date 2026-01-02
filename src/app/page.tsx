"use client";

import React, { useState, useEffect, useRef } from "react";
import { BookOpen, Moon, Sun, ArrowRight, Search, Book, LayoutGrid, Info } from "lucide-react";
import { motion } from "framer-motion";
import Typewriter from 'typewriter-effect';
import Link from "next/link";

interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
}

export default function CombinedPage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const quranSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    fetch("https://equran.id/api/v2/surat")
      .then((res) => res.json())
      .then((data) => {
        setSurahs(data.data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching surah:", err));
  }, []);

  const scrollToQuran = () => {
    quranSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredSurahs = surahs.filter((s) =>
    s.namaLatin.toLowerCase().includes(search.toLowerCase())
  );

  if (!mounted) return null;

  return (
    <div className={`relative min-h-screen transition-colors duration-1000 ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#F8F5F0]'} ${isDarkMode ? 'text-[#F8F5F0]' : 'text-[#0F172A]'} overflow-x-hidden`}>
      
      <section className="relative min-h-screen flex flex-col">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className={`absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] ${isDarkMode ? 'bg-[#C5A059]/20' : 'bg-[#8B703C]/10'}`}
          />
        </div>

        <header className="relative z-10 flex justify-between items-center px-6 md:px-10 py-8 max-w-7xl mx-auto w-full font-['Bona_Nova']">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
            <BookOpen className={`w-6 h-6 ${isDarkMode ? 'text-[#C5A059]' : 'text-[#8B703C]'}`} />
            <span className="text-xl tracking-tight font-bold">Q-Read</span>
          </motion.div>
          
          <motion.button 
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-full border transition-all ${isDarkMode ? 'border-[#C5A059]/20 bg-white/5' : 'border-[#0F172A]/10 bg-black/5'}`}
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-[#C5A059]" /> : <Moon className="w-5 h-5 text-[#0F172A]" />}
          </motion.button>
        </header>

        <main className="relative z-10 flex flex-col items-center justify-start flex-grow pt-23 px-6 text-center">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-['Bona_Nova'] font-bold tracking-tight leading-tight mb-6">
              Jadikan Membaca Sebagai <br />
              <span className={`italic font-normal ${isDarkMode ? 'text-[#C5A059]' : 'text-[#8B703C]'}`}>
                <Typewriter
                  options={{
                    strings: ['Waktu Khusus', 'Momen Tenang', 'Ibadah Harian'],
                    autoStart: true, loop: true, delay: 75, cursor: "",
                  }}
                />
              </span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 0.7, y: 0 }} transition={{ delay: 0.5 }} className="max-w-xl mx-auto text-base md:text-lg font-light mb-10">
              Luangkan waktu membaca Al-Qur’an dengan tenang dan fokus agar setiap ayat dapat dipahami dengan lebih baik.
            </motion.p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex justify-center">
            <button 
              onClick={scrollToQuran}
              className={`group flex items-center gap-3 px-12 py-4 rounded-full font-bold transition-all shadow-lg ${isDarkMode ? 'bg-[#C5A059] text-[#0F172A] shadow-[#C5A059]/20' : 'bg-[#0F172A] text-[#F8F5F0] shadow-black/10'}`}
            >
              Mulai Membaca <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </main>
      </section>

      <section ref={quranSectionRef} className={`relative min-h-screen py-20 px-6 transition-colors duration-1000 ${isDarkMode ? 'bg-[#0F172A]' : 'bg-[#F8F5F0]'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-['Bona_Nova'] font-bold mb-4">Daftar Surah Al-Quran</h2>
            <p className="opacity-60 max-w-2xl mx-auto font-light">Jelajahi 114 surah dalam Al-Quran dengan terjemahan yang mudah diakses.</p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
            {[
              { label: "Total Surah", value: "114", icon: <Book className="w-4 h-4" /> },
              { label: "Total Ayat", value: "6.236", icon: <LayoutGrid className="w-4 h-4" /> },
              { label: "Juz", value: "30", icon: <Info className="w-4 h-4" /> },
            ].map((stat, i) => (
              <div key={i} className={`p-4 md:p-6 rounded-2xl text-center border ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
                <div className="text-[#C5A059] flex justify-center mb-2">{stat.icon}</div>
                <div className="text-xl font-bold">{stat.value}</div>
                <div className="text-[10px] uppercase tracking-widest opacity-40">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="relative max-w-2xl mx-auto mb-16">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 opacity-30" />
            <input 
              type="text"
              placeholder="Cari surah..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full bg-transparent border rounded-full py-4 pl-14 pr-6 focus:outline-none transition-all ${isDarkMode ? 'border-white/10 focus:border-[#C5A059]/50' : 'border-black/10 focus:border-[#8B703C]/50'}`}
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C5A059]"></div></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSurahs.map((surah) => (
                <Link key={surah.nomor} href={`/surah/${surah.nomor}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`group relative p-6 rounded-[24px] border transition-all cursor-pointer ${isDarkMode ? 'bg-white/5 border-white/10 hover:border-[#C5A059]/40' : 'bg-black/5 border-black/10 hover:border-[#8B703C]/40'}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm ${isDarkMode ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'bg-[#8B703C]/10 text-[#8B703C]'}`}>
                          {surah.nomor}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold group-hover:text-[#C5A059] transition-colors">{surah.namaLatin}</h3>
                          <p className="text-xs opacity-50 italic">{surah.arti}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-serif text-[#C5A059]">{surah.nama}</div>
                        <p className="text-[10px] opacity-40 uppercase">{surah.jumlahAyat} Ayat</p>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bona+Nova:ital,wght@0,400;0,700;1,400&family=Plus+Jakarta+Sans:wght@200..800&display=swap');
        html { scroll-behavior: smooth; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; margin: 0; padding: 0; }
      `}</style>
    </div>
  );
}