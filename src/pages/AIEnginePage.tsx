import { Sparkles, Bot, Wand2, List } from 'lucide-react'

const KAK_17 = [
  'Latar Belakang & Urgensi', 'Maksud dan Tujuan', 'Sasaran', 'Lokasi Kegiatan',
  'Sumber Pendanaan & Perkiraan Biaya', 'Ruang Lingkup & Fasilitas', 'Hasil Produk / Output',
  'Waktu Pelaksanaan (90 Hari Kalender)', 'Pendekatan & Metodologi', 'Spesifikasi Teknis',
  'Peralatan & Material', 'Jangka Waktu Penyelesaian', 'Kebutuhan Personil (Tenaga Ahli & Kualifikasi)',
  'Jadwal Pelaksanaan Pekerjaan (Tabel Tata Kala Dinamis)', 'Sistematika Laporan Akhir',
  'Pedoman Pengumpulan Data Lapangan', 'Alih Pengetahuan & Hak Kekayaan Intelektual',
]

export default function AIEnginePage() {
  return (
    <div className="animate-fade-in space-y-7">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">AI Narrative Transformation</h1>
        <p className="text-sm text-slate-500 mt-1">Tahap 3 — Restrukturisasi KAK ke 17 Poin Baku via Gemini API</p>
      </div>

      {/* Gemini Card */}
      <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 via-purple-50 to-primary-50 p-7">
        <div className="flex items-center gap-4">
          <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 shadow-lg shadow-violet-600/30">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <div className="text-lg font-extrabold text-slate-900 tracking-tight">Gemini AI Engine</div>
            <p className="text-sm text-slate-600 mt-1 max-w-xl leading-relaxed">
              Engine membaca KAK Mentah dan menyusun ulang naskah ke dalam{' '}
              <strong className="text-violet-700">17 Poin Baku KAK Pemkot Yogyakarta</strong> menggunakan{' '}
              <code className="rounded-md bg-violet-100 px-1.5 py-0.5 text-xs font-mono text-violet-700">google-genai</code> SDK.
            </p>
          </div>
        </div>
      </div>

      {/* 17 Points */}
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex items-center gap-2.5 mb-5">
          <List size={20} className="text-primary-600" />
          <h2 className="text-base font-bold text-slate-900">17 Poin Baku KAK</h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {KAK_17.map((p, i) => (
            <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-3.5 py-2.5 hover:border-primary-200 hover:bg-primary-50 transition-colors">
              <span className="flex h-6.5 w-6.5 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-[11px] font-extrabold text-primary-700">
                {i + 1}
              </span>
              <span className="text-sm text-slate-700 font-medium">{p}</span>
            </div>
          ))}
        </div>
      </div>

      {/* WYSIWYG Placeholder */}
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 py-14 px-8">
        <Wand2 size={40} className="text-slate-300 mb-3" />
        <div className="text-sm font-bold text-slate-500">Rich-Text Editor (WYSIWYG)</div>
        <div className="text-xs text-slate-400 mt-1">Area preview & editing KAK — tersedia setelah data input diproses</div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-violet-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
          <Sparkles size={16} /> Transform KAK via Gemini
        </button>
      </div>
    </div>
  )
}
