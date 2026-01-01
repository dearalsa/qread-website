"use client";

import React from "react";

export default function Tajwid({ text, className }: { text: string; className?: string }) {
  if (!text) return null;

  return (
    <div 
      className={className} 
      dir="rtl" 
      lang="ar"
      style={{ wordSpacing: '8px' }}
    >
      {text}
    </div>
  );
}