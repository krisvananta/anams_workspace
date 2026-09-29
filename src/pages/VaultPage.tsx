import { FolderOpen, Lock, Unlock, Download } from 'lucide-react'
import { formatDate } from '@/lib/utils'

export default function VaultPage() {
  return (
    <div className="animate-fade-in space-y-7">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Vault & Arsip</h1>
        <p className="text-sm text-slate-500 mt-1">Tahap 5 — Brankas Output, Penomoran Otomatis & Penguncian Arsip</p>
      </div>

      {/* Status Toggle */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 mb-3">Status Dokumen</h3>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 rounded-xl border-2 border-amber-300 bg-amber-50 px-5 py-3 text-sm font-bold text-amber-700 hover:bg-amber-100 transition-colors">
            <Unlock size={16} /> DRAFT
          </button>
          <button className="flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-500 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-colors">
            <Lock size={16} /> ACC (Kunci)
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-3">DRAFT → overwrite tanpa nomor register • ACC → nomor registrasi +1 & dokumen dikunci</p>
      </div>

      {/* Packages */}
      <div>
        <div className="text-sm font-bold text-slate-700 mb-3">Paket Tersimpan</div>
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50">
            <FolderOpen size={20} className="text-primary-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-bold text-slate-800">2026_KJ-01_Pajak-Hotel-BPKAD</div>
            <div className="text-xs text-slate-400 mt-0.5">{formatDate('2026-05-04T09:00:00')} • 11 dokumen</div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-700">
            <Unlock size={11} /> DRAFT
          </span>
          <button className="flex items-center gap-1.5 rounded-lg bg-primary-50 px-3 py-1.5 text-xs font-bold text-primary-700 hover:bg-primary-100 transition-colors">
            <Download size={13} /> ZIP
          </button>
        </div>
      </div>

      {/* File Tree */}
      <div className="rounded-2xl bg-slate-900 border border-white/5 p-6 font-mono text-[13px] leading-loose text-slate-300">
        <div className="text-emerald-400 text-xs mb-3">📁 output_packages/2026_KJ-01_Pajak-Hotel/</div>
        <div>├── 📄 2026_KJ-01_SK-PPKOM_Pajak-Hotel.docx</div>
        <div>├── 📄 2026_KJ-01_SK-PPKOM_Pajak-Hotel.pdf</div>
        <div>├── 📄 2026_KJ-01_KAK-Final_Pajak-Hotel.docx</div>
        <div>├── 📄 2026_KJ-01_KAK-Final_Pajak-Hotel.pdf</div>
        <div>├── 📊 2026_KJ-01_HPS-TKDN_Pajak-Hotel.xlsx</div>
        <div>├── 📄 2026_KJ-01_Uraian-Singkat_Pajak-Hotel.pdf</div>
        <div>├── 📄 2026_KJ-01_Surat-Permohonan-JSS_Pajak-Hotel.pdf</div>
        <div>├── 📄 2026_KJ-01_Surat-Rekomendasi_Pajak-Hotel.pdf</div>
        <div>├── 📄 2026_KJ-01_Rancangan-SPK_Pajak-Hotel.pdf</div>
        <div>└── 📦 2026_KJ-01_Paket-Lengkap_Pajak-Hotel.zip</div>
      </div>
    </div>
  )
}
