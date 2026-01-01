"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Sun, Moon } from "lucide-react";
import SurahHeader from "./SurahHeader";
import AyatCard from "./AyatCard";
import { Surah } from "../../../types/quran";

export default function DetailSurah() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  
  const [surah, setSurah] = useState<Surah | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://equran.id/api/v2/surat/${id}`);
        const data = await res.json();
        setSurah(data.data);
      } catch (error) {
        console.error("Gagal memuat surah:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup audio saat pindah halaman
    return () => {
      audioRef.current?.pause();
    };
  }, [id]);

  if (loading) return (
    <div className={`min-h-screen flex flex-col items-center justify-center gap-4 ${darkMode ? "bg-[#0F172A] text-white" : "bg-[#F8F5F0] text-[#0F172A]"}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#C5A059]"></div>
      <p className="font-medium animate-pulse">Memuat Mushaf...</p>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-700 ${darkMode ? "bg-[#0F172A] text-[#F8F5F0]" : "bg-[#F8F5F0] text-[#0F172A]"}`}>
      <nav className="sticky top-0 z-50 p-4 backdrop-blur-md">
        <div className={`max-w-5xl mx-auto flex justify-between items-center rounded-3xl p-3 border transition-all ${darkMode ? "bg-white/5 border-white/10 shadow-2xl" : "bg-white/80 border-black/5 shadow-lg"}`}>
          <button onClick={() => router.push('/')} 
            className="group flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm transition-all hover:text-[#C5A059]"
            >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" /> 
            Kembali
            </button>
          <button onClick={() => setDarkMode(!darkMode)} className={`p-3 rounded-2xl transition-all ${darkMode ? "bg-white/10 text-yellow-400" : "bg-black/5 text-yellow-600"}`}>
            {darkMode ? <Sun size={20}/> : <Moon size={20}/>}
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-10 pb-20">
        {surah && (
          <>
            <SurahHeader surah={surah} id={id} darkMode={darkMode} />
            <div className="space-y-8">
              {surah.ayat.map((item, index) => (
                <AyatCard key={item.nomorAyat} item={item} index={index} darkMode={darkMode} />
              ))}
            </div>
          </>
        )}
      </main>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Plus+Jakarta+Sans:wght@400;700&display=swap');
        .font-serif { font-family: 'Amiri', serif; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `}</style>
    </div>
  );
}