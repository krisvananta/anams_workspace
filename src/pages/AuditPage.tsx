import { AlertTriangle, AlertOctagon, ShieldCheck, Check } from 'lucide-react'
import type { AuditIssue } from '@/types'

const ISSUES: AuditIssue[] = [
  { id: '1', rule: 'MISMATCH_TENAGA_AHLI', severity: 'warning', target: 'Tenaga Ahli Hukum', description: 'Durasi Orang-Bulan (OB) berbeda antara KAK dan HPS', kak_value: '1 Org × 2 OB', hps_value: '1 Org × 3 OB', resolution: null },
  { id: '2', rule: 'SHBJ_CAP_EXCEEDED', severity: 'warning', target: 'Billing Rate Ahli Akuntansi', description: 'Tarif HPS melebihi plafon SHBJ Pemkot Yogyakarta', hps_value: 'Rp 15.000.000', shbj_limit: 12500000, resolution: null },
]

const RULES = [
  { label: 'Over-Budget Protection', desc: 'Total HPS > Pagu DPA', count: 0, icon: AlertOctagon, border: 'border-red-200', bg: 'bg-red-50', iconColor: 'text-red-500', countColor: 'text-red-500' },
  { label: 'Mismatch Tenaga Ahli', desc: 'OB/Kualifikasi KAK ≠ HPS', count: 1, icon: AlertTriangle, border: 'border-amber-200', bg: 'bg-amber-50', iconColor: 'text-amber-500', countColor: 'text-amber-600' },
  { label: 'SHBJ Cap Enforcement', desc: 'Tarif > Plafon SHBJ', count: 1, icon: ShieldCheck, border: 'border-emerald-200', bg: 'bg-emerald-50', iconColor: 'text-emerald-500', countColor: 'text-emerald-600' },
]

const SEV = { error: { icon: AlertOctagon, bg: 'bg-red-50', color: 'text-red-600', badge: 'bg-red-100 text-red-700', label: 'Hard Block' }, warning: { icon: AlertTriangle, bg: 'bg-amber-50', color: 'text-amber-600', badge: 'bg-amber-100 text-amber-700', label: 'Perlu Konfirmasi' }, info: { icon: AlertTriangle, bg: 'bg-primary-50', color: 'text-primary-600', badge: 'bg-primary-100 text-primary-700', label: 'Info' } }

export default function AuditPage() {
  return (
    <div className="animate-fade-in space-y-7">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Audit Interaktif Mismatch</h1>
        <p className="text-sm text-slate-500 mt-1">Tahap 2 — Sinkronisasi KAK vs DPA vs Plafon SHBJ</p>
      </div>

      {/* Rules */}
      <div className="grid grid-cols-3 gap-3">
        {RULES.map((r, i) => {
          const Icon = r.icon
          return (
            <div key={i} className={`flex items-start gap-3.5 rounded-xl border-2 p-4 ${r.border} ${r.bg}`}>
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white">
                <Icon size={18} className={r.iconColor} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-bold text-slate-800">{r.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{r.desc}</div>
              </div>
              <span className={`flex h-7 w-7 items-center justify-center rounded-lg bg-white text-sm font-extrabold ${r.count > 0 ? r.countColor : 'text-slate-400'}`}>
                {r.count}
              </span>
            </div>
          )
        })}
      </div>

      {/* Issues */}
      <div>
        <div className="text-sm font-bold text-slate-700 mb-3">Temuan Audit ({ISSUES.length})</div>
        <div className="space-y-3">
          {ISSUES.map(issue => {
            const s = SEV[issue.severity]
            const Icon = s.icon
            return (
              <div key={issue.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex gap-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${s.bg}`}>
                    <Icon size={18} className={s.color} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-[15px] font-bold text-slate-800">{issue.target}</div>
                        <div className="text-sm text-slate-500 mt-0.5">{issue.description}</div>
                      </div>
                      <span className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-bold ${s.badge}`}>{s.label}</span>
                    </div>

                    {/* Comparison pills */}
                    <div className="flex flex-wrap gap-2">
                      {issue.kak_value && <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">KAK: {issue.kak_value}</span>}
                      {issue.hps_value && <span className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-700">HPS: {issue.hps_value}</span>}
                      {issue.shbj_limit && <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-700">SHBJ Limit: Rp {issue.shbj_limit.toLocaleString('id-ID')}</span>}
                    </div>

                    {/* Resolution */}
                    <div className="flex flex-wrap gap-2">
                      {issue.rule === 'MISMATCH_TENAGA_AHLI' && <>
                        <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-primary-700 transition-colors"><Check size={13} /> Gunakan Data KAK</button>
                        <button className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-amber-600 transition-colors"><Check size={13} /> Gunakan Data HPS</button>
                        <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">Ketik Manual</button>
                      </>}
                      {issue.rule === 'SHBJ_CAP_EXCEEDED' && <>
                        <button className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"><Check size={13} /> Auto-Adjust ke SHBJ</button>
                        <button className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors">Justifikasi Khusus</button>
                      </>}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
