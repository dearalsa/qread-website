export interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
}

export interface Surah {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  audioFull: { [key: string]: string };
  ayat: Ayat[];
}

// Tambahan untuk API Tajwid
export interface TajwidVerse {
  verse_key: string;
  text_uthmani_tajwid: string;
}