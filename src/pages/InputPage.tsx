import { useCallback, useState } from 'react'
import { Upload, FileText, FileSpreadsheet, File, CheckCircle2, AlertCircle, X, Loader2, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UFile { id: string; name: string; size: number; type: 'pdf' | 'docx' | 'xlsx' | 'unknown'; status: 'ready' | 'uploading' | 'success' | 'error' }

const TYPE_MAP = {
  pdf: { icon: FileText, color: 'text-red-500', bg: 'bg-red-50', label: 'DPA (PDF)' },
  docx: { icon: File, color: 'text-blue-500', bg: 'bg-blue-50', label: 'KAK Mentah (DOCX)' },
  xlsx: { icon: FileSpreadsheet, color: 'text-emerald-500', bg: 'bg-emerald-50', label: 'Data Master (XLSX)' },
  unknown: { icon: File, color: 'text-slate-400', bg: 'bg-slate-50', label: 'File' },
}

function detect(n: string) { const e = n.split('.').pop()?.toLowerCase(); return e === 'pdf' ? 'pdf' : e === 'docx' ? 'docx' : (e === 'xlsx' || e === 'xls') ? 'xlsx' : 'unknown' as const }
function fmtSize(b: number) { return b < 1024 ? `${b} B` : b < 1048576 ? `${(b / 1024).toFixed(1)} KB` : `${(b / 1048576).toFixed(1)} MB` }

export default function InputPage() {
  const [files, setFiles] = useState<UFile[]>([])
  const [dragging, setDragging] = useState(false)
  const add = useCallback((fl: FileList | null) => {
    if (!fl) return
    setFiles(p => [...p, ...Array.from(fl).map(f => ({ id: crypto.randomUUID(), name: f.name, size: f.size, type: detect(f.name), status: 'ready' as const }))])
  }, [])

  return (
    <div className="animate-fade-in space-y-7">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Input & Upload</h1>
        <p className="text-sm text-slate-500 mt-1">Tahap 1 — Unggah DPA, KAK Mentah, dan Data Master Pengadaan</p>
      </div>

      {/* Anchors */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'DPA 2026', ext: '.pdf', desc: 'Dokumen Pelaksanaan Anggaran APBD', icon: FileText, border: 'border-red-200', bg: 'bg-red-50', iconColor: 'text-red-500' },
          { label: 'KAK Mentah', ext: '.docx', desc: 'Draf naskah awal Kerangka Acuan Kerja', icon: File, border: 'border-blue-200', bg: 'bg-blue-50', iconColor: 'text-blue-500' },
          { label: 'Data Master', ext: '.xlsx', desc: 'Master Pejabat, MAK, Pagu, Plafon SHBJ', icon: FileSpreadsheet, border: 'border-emerald-200', bg: 'bg-emerald-50', iconColor: 'text-emerald-500' },
        ].map((a, i) => {
          const Icon = a.icon
          return (
            <div key={i} className={`flex items-center gap-3.5 rounded-xl border-2 p-4 ${a.border} ${a.bg}`}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                <Icon size={20} className={a.iconColor} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-800">{a.label} <span className="font-mono text-xs text-slate-500">({a.ext})</span></div>
                <div className="text-xs text-slate-500 mt-0.5">{a.desc}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); add(e.dataTransfer.files) }}
        className={cn(
          'flex flex-col items-center justify-center rounded-2xl border-2 border-dashed py-16 px-8 transition-all duration-300 cursor-pointer',
          dragging ? 'border-emerald-400 bg-emerald-50 scale-[1.005]' : 'border-slate-300 bg-slate-50 hover:border-primary-400 hover:bg-primary-50'
        )}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-50 to-primary-100 mb-4">
          <Upload size={28} className="text-primary-500" />
        </div>
        <div className="text-base font-bold text-slate-700">Drag & drop file di sini</div>
        <div className="text-sm text-slate-400 mt-1">
          atau{' '}
          <label className="cursor-pointer font-bold text-primary-600 underline underline-offset-2 hover:text-primary-700">
            klik untuk memilih
            <input type="file" className="hidden" multiple accept=".pdf,.docx,.xlsx,.xls" onChange={e => add(e.target.files)} />
          </label>
        </div>
        <div className="text-[11px] text-slate-400 mt-2">Format: .pdf, .docx, .xlsx — Maks. 25MB</div>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="text-sm font-bold text-slate-700">File Terunggah ({files.length})</div>
          {files.map(f => {
            const cfg = TYPE_MAP[f.type]; const Icon = cfg.icon
            return (
              <div key={f.id} className="flex items-center gap-3.5 rounded-xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${cfg.bg}`}>
                  <Icon size={20} className={cfg.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-slate-800 truncate">{f.name}</div>
                  <div className="text-xs text-slate-400">{fmtSize(f.size)} • {cfg.label}</div>
                </div>
                {f.status === 'ready' && <span className="rounded-lg bg-primary-50 px-2.5 py-1 text-[11px] font-bold text-primary-600">Ready</span>}
                {f.status === 'uploading' && <Loader2 size={16} className="text-primary-500 animate-spin" />}
                {f.status === 'success' && <CheckCircle2 size={16} className="text-emerald-500" />}
                {f.status === 'error' && <AlertCircle size={16} className="text-danger-500" />}
                <button onClick={() => setFiles(p => p.filter(x => x.id !== f.id))} className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors">
                  <X size={14} />
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* Action */}
      <div className="flex justify-end">
        <button disabled={files.length === 0} className={cn(
          'flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all',
          files.length > 0
            ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-600/25 hover:shadow-xl hover:-translate-y-0.5'
            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
        )}>
          <Upload size={16} /> Proses & Ekstrak Data <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
