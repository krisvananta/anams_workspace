import { useState, createContext, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

export const SidebarContext = createContext<{
  collapsed: boolean
  setCollapsed: (v: boolean) => void
}>({ collapsed: false, setCollapsed: () => {} })

export function useSidebar() {
  return useContext(SidebarContext)
}

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-[72px]' : 'ml-[264px]'}`}>
          <div className="min-h-screen p-8 max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarContext.Provider>
  )
}
