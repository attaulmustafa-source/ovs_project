import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoginLayout from '../../components/auth/LoginLayout'
import { DEMO_PASSWORD, demoAccounts } from '../../data/mockData'
import { useWireframe } from '../../context/WireframeContext'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { loginAdmin } = useWireframe()
  const [visible, setVisible] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const session = loginAdmin({
      email: form.email.value.trim(),
      password: form.password.value,
    })
    if (session) navigate('/admin')
  }

  return (
    <LoginLayout
      title="Admin Sign In"
      subtitle="Super Admin and Admin access to the Online Verification panel"
      footer={
        <div className="nvqf-form-footer">
          <p>
            Public users? <Link to="/">Go to verification portal</Link>
          </p>
          <div className="ovs-demo-hints" style={{ textAlign: 'left', marginTop: '0.75rem' }}>
            <strong>Demo accounts</strong>
            <p style={{ margin: '0.35rem 0 0' }}>
              Super Admin: <code>{demoAccounts.superAdmin.email}</code>
              <br />
              Admin: <code>{demoAccounts.admin.email}</code>
              <br />
              Password: <code>{DEMO_PASSWORD}</code>
            </p>
          </div>
        </div>
      }
    >
      <form onSubmit={handleSubmit}>
        <div className="nvqf-form-field">
          <label htmlFor="email">
            Email or Username <span className="required">*</span>
          </label>
          <input
            id="email"
            type="text"
            name="email"
            className="form-control"
            placeholder="Enter your email or username"
            defaultValue={demoAccounts.superAdmin.email}
            autoComplete="username"
            required
          />
        </div>
        <div className="nvqf-form-field">
          <label htmlFor="password" className="nvqf-label-muted">
            Password <span className="required">*</span>
          </label>
          <div className="nvqf-password-wrap">
            <input
              id="password"
              type={visible ? 'text' : 'password'}
              name="password"
              className="form-control"
              placeholder="Enter your password"
              defaultValue={DEMO_PASSWORD}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="nvqf-password-toggle"
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? 'Hide password' : 'Show password'}
            >
              <i className={visible ? 'ri-eye-line' : 'ri-eye-off-line'} />
            </button>
          </div>
          <div className="nvqf-remember">
            <input type="checkbox" id="remember" name="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
        </div>
        <button type="submit" className="nvqf-btn-login">
          Login
        </button>
      </form>
    </LoginLayout>
  )
}
