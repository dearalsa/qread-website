"use client";

import { motion } from "framer-motion";
import Tajwid from "../../components/Tajwid";

export default function AyatCard({ item, index, darkMode }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group p-6 md:p-10 rounded-[30px] border transition-all ${
        darkMode 
          ? "bg-[#161f33] border-white/5 hover:border-[#C5A059]/30" 
          : "bg-white border-black/5 hover:border-[#C5A059]/30 shadow-sm"
      }`}
    >
      <div className="flex justify-between items-start mb-8">
        <div className={`w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm ${
          darkMode ? "bg-[#C5A059]/20 text-[#C5A059]" : "bg-[#C5A059] text-white"
        }`}>
          {item.nomorAyat}
        </div>
      </div>

      <Tajwid 
        text={item.teksArab} 
        className={`text-right font-serif mb-8 leading-[2.5] ${
          darkMode ? "text-white" : "text-[#1A4D2E]"
        } text-3xl md:text-4xl`} 
      />
      
      <div className="space-y-4 border-l-2 border-[#C5A059]/20 pl-6">
        <p className="text-lg md:text-xl text-[#C5A059] font-medium italic leading-relaxed">
          {item.teksLatin}
        </p>
        <p className={`text-base md:text-lg font-light leading-relaxed ${
          darkMode ? "text-white/70" : "text-black/70"
        }`}>
          {item.teksIndonesia}
        </p>
      </div>
    </motion.div>
  );
}