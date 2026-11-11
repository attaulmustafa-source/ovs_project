import { Link, NavLink } from 'react-router-dom'

export default function PublicLayout({ children }) {
  return (
    <div className="ovs-public">
      <header className="ovs-public-header">
        <div className="ovs-public-header__inner">
          <Link to="/" className="ovs-brand">
            <img src="/images/navttclogo.png" alt="NAVTTC" className="ovs-brand__logo" />
            <div className="ovs-brand__text">
              <strong>Online Certificate Verification</strong>
              <span>National Vocational &amp; Technical Training Commission</span>
            </div>
          </Link>
          <nav className="ovs-public-nav">
            <NavLink to="/" end>
              Verify
            </NavLink>
            <NavLink to="/how-it-works">How it works</NavLink>
            <NavLink to="/admin/login" className="ovs-nav-admin">
              Admin Login
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="ovs-public-main">{children}</main>
      <footer className="ovs-public-footer">
        <div className="ovs-public-footer__inner">
          <div>
            <strong>NAVTTC</strong>
            <p>Online Certificate Verification System — public portal. No registration required.</p>
          </div>
          <div>
            <p>
              <i className="ri-phone-line" /> 0800-88866
            </p>
            <p>
              <i className="ri-mail-line" /> info.reg@navttc.gov.pk
            </p>
          </div>
          <div className="ovs-public-footer__note">
            <span className="wireframe-badge">
              <i className="ri-pencil-ruler-2-line" /> Wireframe
            </span>
            <p>© {new Date().getFullYear()} NAVTTC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
