"use client";

import { motion } from "framer-motion";
import { Play, Pause, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { Surah } from "../../../types/quran";

export default function SurahHeader({ surah, id, darkMode }: { surah: Surah, id: number, darkMode: boolean }) {
  const router = useRouter();
  const [isPlayingFull, setIsPlayingFull] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleFullAudio = () => {
    if (isPlayingFull) {
      audioRef.current?.pause();
      setIsPlayingFull(false);
    } else {
      const fullAudioUrl = surah.audioFull["05"]; 
      audioRef.current = new Audio(fullAudioUrl);
      audioRef.current.play();
      setIsPlayingFull(true);
      audioRef.current.onended = () => setIsPlayingFull(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-[40px] p-6 md:p-12 text-center mb-10 md:mb-16 border-2 transition-all ${
        darkMode ? "bg-[#0F172A] border-white/5 shadow-2xl" : "bg-white border-black/5 shadow-xl"
      }`}
    >
      <div className="relative z-10">
        <h2 className="text-5xl md:text-7xl font-serif mb-4" style={{ color: "#C5A059" }}>{surah.nama}</h2>
        <h1 className="text-2xl md:text-4xl font-bold mb-2">{surah.namaLatin}</h1>
        <p className="text-base md:text-lg italic opacity-60 mb-8 md:mb-10">{surah.arti}</p>

        <div className="flex flex-col items-center gap-6 md:gap-8">
          <div className="w-full flex items-center justify-center gap-3 md:gap-5">
            <button 
              disabled={id <= 1} 
              onClick={() => router.push(`/surah/${id - 1}`)} 
              className={`p-2 md:p-3 rounded-xl md:rounded-2xl transition-all ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"} disabled:opacity-20`}
            >
              <ChevronLeft size={20} className="md:w-6 md:h-6" />
            </button>
            
            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
              <span className={`px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-lg font-bold border whitespace-nowrap ${
                darkMode ? "border-[#C5A059]/30 bg-[#C5A059]/5 text-[#C5A059]" : "border-[#C5A059]/20 bg-[#C5A059]/5 text-[#8B6E37]"
              }`}>
                {surah.jumlahAyat} Ayat
              </span>
              <span className={`px-3 py-1.5 md:px-5 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-lg font-bold border whitespace-nowrap ${
                darkMode ? "border-[#C5A059]/30 bg-[#C5A059]/5 text-[#C5A059]" : "border-[#C5A059]/20 bg-[#C5A059]/5 text-[#8B6E37]"
              }`}>
                {surah.tempatTurun}
              </span>
            </div>

            <button 
              disabled={id >= 114} 
              onClick={() => router.push(`/surah/${id + 1}`)} 
              className={`p-2 md:p-3 rounded-xl md:rounded-2xl transition-all ${darkMode ? "bg-white/5 hover:bg-white/10" : "bg-black/5 hover:bg-black/10"} disabled:opacity-20`}
            >
              <ChevronRight size={20} className="md:w-6 md:h-6" />
            </button>
          </div>

          <button 
            onClick={toggleFullAudio}
            className={`flex items-center gap-3 px-5 py-2.5 md:px-8 md:py-3.5 rounded-full font-bold text-xs md:text-sm transition-all active:scale-95 shadow-lg ${
              isPlayingFull 
              ? "bg-red-500 text-white shadow-red-500/20" 
              : "bg-[#C5A059] text-[#0F172A] shadow-[#C5A059]/20"
            }`}
          >
            {isPlayingFull ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" className="ml-0.5" />}
            <span className="uppercase tracking-wider">{isPlayingFull ? "Berhenti" : "Dengarkan Surah"}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}