import { Play, Clock, Sparkles, Zap } from 'lucide-react'
import { PROCUREMENT_DOCUMENTS } from '@/types'

export default function GeneratePage() {
  return (
    <div className="animate-fade-in space-y-7">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Generate Dokumen</h1>
        <p className="text-sm text-slate-500 mt-1">Tahap 4 — Injeksi Templat & Kalkulasi Engine → 11 Berkas Pra-Pengadaan</p>
      </div>

      <div className="space-y-2.5">
        {PROCUREMENT_DOCUMENTS.map(doc => (
          <div key={doc.id} className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-sm font-extrabold text-slate-500">
              {doc.id}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-800 truncate">{doc.nama_dokumen}</div>
              <div className="flex items-center gap-1.5 mt-1">
                {doc.tipe_engine.includes('AI') ? <Sparkles size={12} className="text-violet-400" /> : <Zap size={12} className="text-amber-400" />}
                <span className="text-[11px] text-slate-400">{doc.tipe_engine}</span>
              </div>
            </div>
            <div className="flex gap-1">
              {doc.format_terbit.map(f => <span key={f} className="rounded-md bg-primary-50 px-2 py-0.5 text-[11px] font-mono font-semibold text-primary-700">{f}</span>)}
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
              <Clock size={11} /> Pending
            </span>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
          <Play size={16} /> Generate Package (11 Dokumen)
        </button>
      </div>
    </div>
  )
}
