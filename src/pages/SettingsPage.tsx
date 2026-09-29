import { useState } from 'react'
import { Key, User, Database, Save } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)

  return (
    <div className="animate-fade-in space-y-5">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Pengaturan</h1>
        <p className="text-sm text-slate-500 mt-1">Konfigurasi sistem, API Key, dan referensi pejabat</p>
      </div>

      {/* Gemini API */}
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <Key size={20} className="text-primary-600" />
          <h3 className="text-base font-bold text-slate-900">Gemini API Key</h3>
        </div>
        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
          API Key untuk koneksi Google Gemini (<code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-mono">google-genai</code> SDK). Disimpan lokal di <code className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs font-mono">config.json</code>.
        </p>
        <div className="flex gap-2.5">
          <input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            placeholder="YOUR_GEMINI_API_KEY_HERE"
            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-mono text-slate-700 focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 outline-none transition-all"
          />
          <button onClick={() => setShowKey(!showKey)} className="shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            {showKey ? 'Sembunyikan' : 'Tampilkan'}
          </button>
        </div>
      </div>

      {/* Officials */}
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <User size={20} className="text-primary-600" />
          <h3 className="text-base font-bold text-slate-900">Referensi Pejabat</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label: 'Pengguna Anggaran (PA)', value: 'Raden Roro Andarini, S.E., M.Si.', mono: false },
            { label: 'NIP PA', value: '197203171997032004', mono: true },
            { label: 'PPK', value: 'Bambang Setyo Nugroho, S.ST.', mono: false },
            { label: 'NIP PPK', value: '', ph: 'NIP PPK', mono: true },
          ].map((f, i) => (
            <div key={i}>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{f.label}</label>
              <input
                type="text"
                defaultValue={f.value}
                placeholder={f.ph}
                className={cn(
                  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 outline-none transition-all',
                  f.mono && 'font-mono text-[13px]'
                )}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Defaults */}
      <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex items-center gap-2.5 mb-4">
          <Database size={20} className="text-primary-600" />
          <h3 className="text-base font-bold text-slate-900">Default Sistem</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Tahun Anggaran', value: '2026' },
            { label: 'PPN Rate', value: '11%' },
            { label: 'TKDN Target', value: '100%' },
          ].map((f, i) => (
            <div key={i}>
              <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">{f.label}</label>
              <input type="text" defaultValue={f.value} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-700 focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100 outline-none transition-all" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-primary-600/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
          <Save size={16} /> Simpan Pengaturan
        </button>
      </div>
    </div>
  )
}
