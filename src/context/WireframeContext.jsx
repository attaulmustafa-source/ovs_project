import { createContext, useContext, useMemo, useState } from 'react'
import { demoAccounts } from '../data/mockData'

const SESSION_KEY = 'ovs_admin_session'
const WireframeContext = createContext(null)

function readSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function WireframeProvider({ children }) {
  const [adminSession, setAdminSession] = useState(() => readSession())
  const [toast, setToast] = useState(null)

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(null), 2800)
  }

  const loginAdmin = ({ email, password }) => {
    const match = Object.values(demoAccounts).find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.password === password,
    )
    if (!match) {
      showToast('Invalid credentials. Use the demo admin accounts.', 'danger')
      return null
    }
    const session = { name: match.name, email: match.email, role: match.role }
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
    setAdminSession(session)
    showToast(`Signed in as ${match.role}`)
    return session
  }

  const logoutAdmin = () => {
    sessionStorage.removeItem(SESSION_KEY)
    setAdminSession(null)
  }

  const value = useMemo(
    () => ({
      adminSession,
      loginAdmin,
      logoutAdmin,
      showToast,
      toast,
    }),
    [adminSession, toast],
  )

  return (
    <WireframeContext.Provider value={value}>
      {children}
      {toast && (
        <div className={`ovs-toast ovs-toast--${toast.type}`} role="status">
          {toast.message}
        </div>
      )}
    </WireframeContext.Provider>
  )
}

export function useWireframe() {
  const ctx = useContext(WireframeContext)
  if (!ctx) throw new Error('useWireframe must be used within WireframeProvider')
  return ctx
}
