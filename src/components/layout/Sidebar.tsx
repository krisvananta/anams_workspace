import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, FileUp, ShieldCheck, Sparkles,
  FileOutput, Archive, Settings, ChevronLeft,
  ChevronRight, Zap,
} from 'lucide-react'
import { useSidebar } from './AppLayout'
import type { HealthCheckResponse } from '@/types'
import { cn } from '@/lib/utils'

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { id: 'input', label: 'Input & Upload', icon: FileUp, path: '/input' },
  { id: 'audit', label: 'Audit Mismatch', icon: ShieldCheck, path: '/audit' },
  { id: 'ai-engine', label: 'AI Transform', icon: Sparkles, path: '/ai-engine' },
  { id: 'generate', label: 'Generate Docs', icon: FileOutput, path: '/generate' },
  { id: 'vault', label: 'Vault & Arsip', icon: Archive, path: '/vault' },
]

export default function Sidebar() {
  const { collapsed, setCollapsed } = useSidebar()
  const [engine, setEngine] = useState<'online' | 'offline' | 'checking'>('checking')
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const check = async () => {
      try {
        const r = await fetch('/api/health')
        if (r.ok) { const d: HealthCheckResponse = await r.json(); setEngine(d.status) }
        else setEngine('offline')
      } catch { setEngine('offline') }
    }
    check()
    const i = setInterval(check, 30000)
    return () => clearInterval(i)
  }, [])

  return (
    <aside className={cn(
      'fixed left-0 top-0 z-50 flex h-screen flex-col bg-slate-950 border-r border-white/5 shadow-xl transition-all duration-300',
      collapsed ? 'w-[72px]' : 'w-[264px]'
    )}>
      {/* Brand */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 shadow-lg shadow-primary-600/30">
          <Zap size={17} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="text-sm font-extrabold text-white tracking-tight">Anam's Workspace</div>
            <div className="text-[10px] font-semibold text-white/30 uppercase tracking-widest mt-0.5">Procurement Engine</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {!collapsed && (
          <div className="text-[10px] font-bold text-white/20 uppercase tracking-[0.1em] px-3 pb-2">Pipeline</div>
        )}
        {NAV.map((item) => {
          const active = location.pathname === item.path
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all duration-200',
                active
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md shadow-primary-600/25 font-semibold'
                  : 'text-white/45 hover:text-white/80 hover:bg-white/5'
              )}
            >
              <Icon size={18} className={cn('shrink-0', active ? 'opacity-100' : 'opacity-50')} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="px-3 py-3 border-t border-white/5 space-y-1">
        {/* Engine status */}
        <div className="flex items-center gap-2.5 rounded-lg px-3 py-2 bg-white/[0.03]">
          <div className={cn(
            'w-[7px] h-[7px] rounded-full shrink-0',
            engine === 'online' && 'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]',
            engine === 'checking' && 'bg-warning-400 animate-pulse',
            engine === 'offline' && 'bg-danger-400 shadow-[0_0_6px_rgba(248,113,113,0.4)]',
          )} />
          {!collapsed && (
            <span className="text-xs text-white/40">
              Engine{' '}
              <span className={cn(
                'font-bold',
                engine === 'online' && 'text-emerald-400',
                engine === 'checking' && 'text-warning-400',
                engine === 'offline' && 'text-danger-400',
              )}>
                {engine === 'online' ? 'Online' : engine === 'checking' ? '…' : 'Offline'}
              </span>
            </span>
          )}
        </div>

        {/* Settings */}
        <button
          onClick={() => navigate('/settings')}
          title={collapsed ? 'Pengaturan' : undefined}
          className={cn(
            'flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all',
            location.pathname === '/settings'
              ? 'bg-white/10 text-white'
              : 'text-white/40 hover:text-white/70 hover:bg-white/5'
          )}
        >
          <Settings size={18} className="shrink-0 opacity-60" />
          {!collapsed && <span>Pengaturan</span>}
        </button>

        {/* Collapse */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg py-2 text-white/25 hover:bg-white/5 hover:text-white/50 transition-all"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  )
}
