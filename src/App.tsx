import { Routes, Route } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import DashboardPage from '@/pages/DashboardPage'
import InputPage from '@/pages/InputPage'
import AuditPage from '@/pages/AuditPage'
import AIEnginePage from '@/pages/AIEnginePage'
import GeneratePage from '@/pages/GeneratePage'
import VaultPage from '@/pages/VaultPage'
import SettingsPage from '@/pages/SettingsPage'

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/audit" element={<AuditPage />} />
        <Route path="/ai-engine" element={<AIEnginePage />} />
        <Route path="/generate" element={<GeneratePage />} />
        <Route path="/vault" element={<VaultPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  )
}
