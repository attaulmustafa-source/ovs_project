import { NavLink } from 'react-router-dom'
import ProfileMenu from './ProfileMenu'
import { useWireframe } from '../../context/WireframeContext'

const adminNav = [
  {
    section: 'Overview',
    accent: 'green',
    items: [{ to: '/admin', label: 'Dashboard', icon: 'ri-dashboard-line', end: true, count: 'Live' }],
  },
  {
    section: 'Verification',
    accent: 'amber',
    items: [
      { to: '/admin/activity', label: 'Verification Activity', icon: 'ri-shield-check-line' },
      { to: '/admin/reports', label: 'Reports & Export', icon: 'ri-file-chart-line' },
    ],
  },
  {
    section: 'Administration',
    accent: 'blue',
    items: [{ to: '/admin/users', label: 'User Management', icon: 'ri-user-settings-line', superOnly: true }],
  },
]

export function Sidebar({ userName, userRole }) {
  const isSuper = userRole === 'Super Admin'
  const accentClass = { green: 'nav-section--green', amber: 'nav-section--amber', blue: 'nav-section--blue' }

  return (
    <aside className="app-sidebar nvqf-sidebar">
      <div className="sidebar-brand">
        <div className="logo-area">
          <div className="logo-badge">OV</div>
          <div className="logo-name">Online Verification</div>
          <div className="logo-sub">
            National Vocational &amp; Technical
            <br />
            Training Commission
          </div>
        </div>
      </div>
      <nav className="sidebar-nav">
        {adminNav.map((group) => {
          const items = group.items.filter((item) => !item.superOnly || isSuper)
          if (!items.length) return null
          return (
            <div key={group.section}>
              <div className={`nav-section ${accentClass[group.accent]}`}>{group.section}</div>
              {items.map((item) => (
                <div className="nav-item" key={item.to}>
                  <NavLink to={item.to} end={item.end} className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>
                    <i className={item.icon} aria-hidden="true" />
                    <span>{item.label}</span>
                    {item.count && <span className="nav-count">{item.count}</span>}
                  </NavLink>
                </div>
              ))}
            </div>
          )
        })}
        <div>
          <div className="nav-section nav-section--green">Public Portal</div>
          <div className="nav-item">
            <NavLink to="/" className="nav-link">
              <i className="ri-global-line" aria-hidden="true" />
              <span>Open Verify Portal</span>
            </NavLink>
          </div>
        </div>
      </nav>
      <div className="sidebar-footer sidebar-footer--profile">
        <ProfileMenu userName={userName} userRole={userRole} variant="sidebar" />
        <button type="button" className="sidebar-collapse-btn" title="Collapse sidebar" aria-label="Collapse sidebar">
          <i className="ri-arrow-left-double-line" />
        </button>
      </div>
    </aside>
  )
}

export function Header() {
  return (
    <header className="app-header sticky" id="header">
      <div className="main-header-container">
        <div className="header-content-left">
          <div className="nvqf-header-overview">
            <div className="nvqf-header-overview__inner">
              <div className="topbar-title">Welcome to NAVTTC Online Verification System</div>
              <div className="topbar-sub">
                <span className="topbar-sub__dot" aria-hidden="true" />
                <span>Live · Unified Database connected</span>
              </div>
            </div>
          </div>
        </div>
        <ul className="header-content-right">
          <li>
            <span className="wireframe-badge">
              <i className="ri-pencil-ruler-2-line" /> Wireframe
            </span>
          </li>
        </ul>
      </div>
    </header>
  )
}

export function AppLayout({ children }) {
  const { adminSession } = useWireframe()
  const userName = adminSession?.name || 'Admin User'
  const userRole = adminSession?.role || 'Admin'

  return (
    <div className="app-page">
      <Sidebar userName={userName} userRole={userRole} />
      <div className="app-main">
        <Header />
        <div className="main-content app-content">
          <div className="container-fluid">{children}</div>
        </div>
      </div>
    </div>
  )
}
