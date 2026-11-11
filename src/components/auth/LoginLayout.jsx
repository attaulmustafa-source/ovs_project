const BRAND_MISSION =
  'Our mission is to provide direction, support, and an enabling environment to the public and private sectors to implement training for skills development, enhancing social and economic progress.'

export default function LoginLayout({
  title = 'Sign In',
  subtitle = 'Enter your credentials to continue',
  children,
  footer,
}) {
  return (
    <div className="nvqf-login-page">
      <div className="nvqf-login-shell">
        <aside className="nvqf-panel-brand" aria-label="NAVTTC welcome">
          <div className="nvqf-panel-brand-inner">
            <div className="nvqf-brand-logo">
              <img src="/images/navttclogo.png" alt="NAVTTC Logo" width="115" loading="lazy" decoding="async" />
            </div>
            <h2 className="nvqf-brand-welcome-title">Welcome to NAVTTC Online Certificate Verification System</h2>
            <p className="nvqf-brand-welcome-urdu">نیوٹک آن لائن سرٹیفکیٹ تصدیقی نظام — ایڈمن پورٹل میں خوش آمدید</p>
            <p className="nvqf-brand-mission">{BRAND_MISSION}</p>
            <div className="nvqf-brand-info">
              <p>
                <i className="ri-phone-line nvqf-brand-info-icon" aria-hidden="true" />
                Need help? Call us at <strong>0800-88866</strong>
              </p>
              <p className="nvqf-brand-info-sub">(Available: Mon - Fri, 8:30 AM - 4:30 PM)</p>
            </div>
            <div className="nvqf-brand-info">
              <p>
                <i className="ri-mail-line nvqf-brand-info-icon" aria-hidden="true" />
                Email us at <strong>info.reg@navttc.gov.pk</strong>
              </p>
            </div>
            <p className="nvqf-brand-footer">NAVTTC · Online Verification — Admin</p>
          </div>
        </aside>
        <main className="nvqf-panel-form">
          <div className="nvqf-form-header">
            <h1>{title}</h1>
            <p>{subtitle}</p>
          </div>
          {children}
          {footer}
        </main>
      </div>
    </div>
  )
}
