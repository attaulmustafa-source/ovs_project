import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'

export default function VerifyByNumberPage() {
  const navigate = useNavigate()
  const [certNo, setCertNo] = useState('NAVTTC/CERT/2024/004821')
  const [regNo, setRegNo] = useState('REG-LHR-2023-11842')

  const onSubmit = (e) => {
    e.preventDefault()
    const certificateNumber = certNo.trim()
    const registrationNumber = regNo.trim()
    if (!certificateNumber || !registrationNumber) return
    navigate(
      `/verify/result?method=number&q=${encodeURIComponent(certificateNumber)}&reg=${encodeURIComponent(registrationNumber)}`,
    )
  }

  return (
    <PublicLayout>
      <div className="ovs-panel" style={{ maxWidth: 640, margin: '0 auto' }}>
        <div className="ovs-panel__head">
          <h1>Certificate Number Verification</h1>
          <p>
            Enter both the certificate number and the student registration number. Verification succeeds only when both
            values match the same official record.
          </p>
        </div>
        <div className="ovs-panel__body">
          <form onSubmit={onSubmit}>
            <div className="ovs-form-row">
              <label htmlFor="certNo">
                Certificate Number <span className="form-required">*</span>
              </label>
              <input
                id="certNo"
                value={certNo}
                onChange={(e) => setCertNo(e.target.value)}
                placeholder="e.g. NAVTTC/CERT/2024/004821"
                required
              />
            </div>
            <div className="ovs-form-row">
              <label htmlFor="regNo">
                Student Registration Number <span className="form-required">*</span>
              </label>
              <input
                id="regNo"
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                placeholder="e.g. REG-LHR-2023-11842"
                required
              />
            </div>
            <div className="ovs-actions">
              <button type="submit" className="ovs-btn ovs-btn-primary">
                <i className="ri-shield-check-line" /> Verify Certificate
              </button>
              <Link to="/" className="ovs-btn ovs-btn-light">
                Back
              </Link>
            </div>
          </form>

          <div className="ovs-demo-hints">
            <strong>Wireframe demo inputs</strong>
            <p style={{ margin: '0.35rem 0 0' }}>
              Verified pair:
              <br />
              Cert <code>NAVTTC/CERT/2024/004821</code> + Reg <code>REG-LHR-2023-11842</code>
              <br />
              Cert <code>NAVTTC/CERT/2023/001156</code> + Reg <code>REG-ISB-2022-07455</code>
              <br />
              <br />
              Not verified: mismatched pair, revoked cert, or unknown values
              <br />
              e.g. Cert <code>NAVTTC/CERT/2024/004821</code> + Reg <code>REG-WRONG-000</code>
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
