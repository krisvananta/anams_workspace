import {
  FileText, Upload, ShieldCheck, Sparkles, Package,
  TrendingUp, Clock, ArrowRight, Zap, Server,
} from 'lucide-react'
import { formatRupiah } from '@/lib/utils'
import { PROCUREMENT_DOCUMENTS } from '@/types'
import { useNavigate } from 'react-router-dom'

const STATS = [
  { label: 'Total Dokumen', value: '11', sub: 'Pra-Pengadaan', icon: FileText, accent: 'border-t-primary-500', iconBg: 'bg-primary-50', iconTxt: 'text-primary-600' },
  { label: 'Pagu DPA', value: formatRupiah(325142000), sub: 'Belanja Jasa', icon: TrendingUp, accent: 'border-t-emerald-500', iconBg: 'bg-emerald-50', iconTxt: 'text-emerald-600' },
  { label: 'Paket HPS', value: '≤ ' + formatRupiah(100000000), sub: 'Per Pengadaan Langsung', icon: Package, accent: 'border-t-warning-500', iconBg: 'bg-amber-50', iconTxt: 'text-amber-600' },
  { label: 'Status Sistem', value: 'Siap', sub: 'v2.0 Desktop Edition', icon: Server, accent: 'border-t-violet-500', iconBg: 'bg-violet-50', iconTxt: 'text-violet-600' },
]

const PIPELINE = [
  { id: 1, label: 'Input Data Master', icon: Upload, path: '/input' },
  { id: 2, label: 'Audit Mismatch', icon: ShieldCheck, path: '/audit' },
  { id: 3, label: 'AI Transformation', icon: Sparkles, path: '/ai-engine' },
  { id: 4, label: 'Generate Dokumen', icon: FileText, path: '/generate' },
  { id: 5, label: 'Vault & Arsip', icon: Package, path: '/vault' },
]

export default function DashboardPage() {
  const nav = useNavigate()

  return (
    <div className="animate-fade-in space-y-7">
      {/* Header */}
      <div className="flex items-center gap-3.5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-600 to-primary-500 shadow-lg shadow-primary-600/25">
          <Zap size={22} className="text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500">Anam's Workspace — Procurement Automation Engine v2.0</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {STATS.map((s, i) => {
          const Icon = s.icon
          return (
            <div key={i} className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 border-t-[3px] ${s.accent}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2">{s.label}</div>
                  <div className="text-xl font-extrabold text-slate-900 tracking-tight">{s.value}</div>
                  <div className="text-xs text-slate-400 mt-1">{s.sub}</div>
                </div>
                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${s.iconBg}`}>
                  <Icon size={22} className={s.iconTxt} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Pipeline */}
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-base font-bold text-slate-900">Pipeline Otomasi</h2>
            <p className="text-xs text-slate-400 mt-0.5">5 Tahapan Utama — User Journey Map</p>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
            <Clock size={11} /> Idle
          </span>
        </div>

        <div className="flex items-center">
          {PIPELINE.map((stage, idx) => {
            const Icon = stage.icon
            return (
              <div key={stage.id} className="flex items-center flex-1 min-w-0">
                <button
                  onClick={() => nav(stage.path)}
                  className="flex-1 flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white p-4 transition-all hover:border-primary-300 hover:bg-primary-50 hover:-translate-y-0.5 hover:shadow-md group"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 group-hover:bg-primary-100 group-hover:text-primary-600 transition-colors">
                    <Icon size={18} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-slate-400">Tahap {stage.id}</div>
                    <div className="text-[13px] font-semibold text-slate-700 truncate">{stage.label}</div>
                  </div>
                </button>
                {idx < PIPELINE.length - 1 && (
                  <div className="shrink-0 px-1">
                    <div className="w-6 h-0.5 bg-gradient-to-r from-slate-300 to-slate-200 rounded-full" />
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Document Table */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">11 Dokumen Pra-Pengadaan</h2>
          <p className="text-xs text-slate-400 mt-0.5">Keluaran paket otomasi lengkap — PRD v2.0</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400 w-14">No</th>
                <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">Nama Dokumen</th>
                <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">Engine</th>
                <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400">Format</th>
                <th className="px-6 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-400 w-28">Status</th>
              </tr>
            </thead>
            <tbody>
              {PROCUREMENT_DOCUMENTS.map((doc) => (
                <tr key={doc.id} className="border-b border-slate-50 hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-3.5">
                    <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-500">
                      {doc.id}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="text-sm font-semibold text-slate-800">{doc.nama_dokumen}</div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">{doc.kode_dokumen}</div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {doc.tipe_engine.includes('AI') ? <Sparkles size={12} className="text-violet-500" /> : <Zap size={12} className="text-amber-500" />}
                      {doc.tipe_engine}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <div className="flex gap-1">
                      {doc.format_terbit.map(f => (
                        <span key={f} className="rounded-md bg-primary-50 px-2 py-0.5 text-[11px] font-mono font-semibold text-primary-700">{f}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-bold text-slate-500">
                      <Clock size={11} /> Pending
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Upload DPA & KAK', sub: 'Mulai proses otomasi baru', icon: Upload, path: '/input', iconBg: 'bg-primary-50', iconTxt: 'text-primary-600', hoverBorder: 'hover:border-primary-300' },
          { label: 'Audit & Validasi', sub: 'Cek mismatch KAK vs DPA vs SHBJ', icon: ShieldCheck, path: '/audit', iconBg: 'bg-emerald-50', iconTxt: 'text-emerald-600', hoverBorder: 'hover:border-emerald-300' },
          { label: 'Generate Package', sub: 'Cetak 11 dokumen dalam 1 ZIP', icon: FileText, path: '/generate', iconBg: 'bg-violet-50', iconTxt: 'text-violet-600', hoverBorder: 'hover:border-violet-300' },
        ].map((a) => {
          const Icon = a.icon
          return (
            <button key={a.path} onClick={() => nav(a.path)} className={`flex items-center gap-4 rounded-2xl border-2 border-slate-200 bg-white p-5 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg group ${a.hoverBorder}`}>
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${a.iconBg} ${a.iconTxt} transition-transform group-hover:scale-110`}>
                <Icon size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-800">{a.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{a.sub}</div>
              </div>
              <ArrowRight size={16} className="text-slate-300 shrink-0" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
