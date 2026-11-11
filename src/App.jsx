import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { WireframeProvider, useWireframe } from './context/WireframeContext'
import HomePage from './pages/public/HomePage'
import HowItWorksPage from './pages/public/HowItWorksPage'
import VerifyByNumberPage from './pages/public/VerifyByNumberPage'
import VerifyByQrPage from './pages/public/VerifyByQrPage'
import VerificationResultPage from './pages/public/VerificationResultPage'
import AdminLogin from './pages/auth/AdminLogin'
import AdminDashboard from './pages/admin/Dashboard'
import VerificationActivity from './pages/admin/VerificationActivity'
import Reports from './pages/admin/Reports'
import AdminUsers from './pages/admin/AdminUsers'

function RequireAdmin({ children }) {
  const { adminSession } = useWireframe()
  let stored = null
  try {
    stored = JSON.parse(sessionStorage.getItem('ovs_admin_session') || 'null')
  } catch {
    stored = null
  }
  if (!adminSession && !stored) return <Navigate to="/admin/login" replace />
  return children
}

export default function App() {
  return (
    <WireframeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/verify/qr" element={<VerifyByQrPage />} />
          <Route path="/verify/certificate-number" element={<VerifyByNumberPage />} />
          <Route path="/verify/result" element={<VerificationResultPage />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminDashboard />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/activity"
            element={
              <RequireAdmin>
                <VerificationActivity />
              </RequireAdmin>
            }
          />
          <Route
            path="/admin/reports"
            element={
              <RequireAdmin>
                <Reports />
              </RequireAdmin>
            }
          />
          <Route path="/admin/reports/:reportId" element={<Navigate to="/admin/reports" replace />} />
          <Route
            path="/admin/users"
            element={
              <RequireAdmin>
                <AdminUsers />
              </RequireAdmin>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </WireframeProvider>
  )
}
