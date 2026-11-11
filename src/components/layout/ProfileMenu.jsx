import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWireframe } from '../../context/WireframeContext'

function MenuIcon({ letter }) {
  return (
    <span className="profile-menu__icon" aria-hidden="true">
      {letter}
    </span>
  )
}

export default function ProfileMenu({ userName, userRole, variant = 'sidebar' }) {
  const menuId = useId()
  const rootRef = useRef(null)
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { logoutAdmin, showToast } = useWireframe()

  const initials = userName?.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase() || 'U'

  useEffect(() => {
    if (!open) return undefined
    const onDocClick = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false)
    }
    const onEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onEscape)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onEscape)
    }
  }, [open])

  const handleLogout = () => {
    setOpen(false)
    logoutAdmin()
    showToast('Logged out successfully.')
    navigate('/admin/login')
  }

  return (
    <div ref={rootRef} className={`profile-menu profile-menu--${variant}${open ? ' profile-menu--open' : ''}`}>
      <button
        type="button"
        className="profile-menu__toggle"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <div className="user-chip">
          <div className="user-avatar">{initials}</div>
          <div className="user-chip-text">
            <div className="user-name">{userName}</div>
            <div className="user-role">{userRole || 'User'}</div>
          </div>
        </div>
      </button>

      <ul id={menuId} className="profile-menu__dropdown" role="menu" hidden={!open}>
        <li role="none">
          <button type="button" className="profile-menu__item" role="menuitem" onClick={handleLogout}>
            <MenuIcon letter="L" />
            <span>Log Out</span>
          </button>
        </li>
      </ul>
    </div>
  )
}
