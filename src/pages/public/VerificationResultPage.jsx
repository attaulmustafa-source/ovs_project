import { Link, useSearchParams } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'
import { certificates } from '../../data/mockData'
import { useWireframe } from '../../context/WireframeContext'

function findCertificate(method, q, reg) {
  const query = (q || '').trim().toLowerCase()
  const registration = (reg || '').trim().toLowerCase()
  if (!query) return null

  if (method === 'qr') {
    return certificates.find((c) => c.qrRef.toLowerCase() === query) || null
  }

  // Certificate number verification requires both fields to match jointly
  if (!registration) return null
  return (
    certificates.find((c) => {
      const certMatch = c.certificateNumber.toLowerCase() === query || c.id.toLowerCase() === query
      const regMatch = c.registrationNumber.toLowerCase() === registration
      return certMatch && regMatch
    }) || null
  )
}

export default function VerificationResultPage() {
  const [params] = useSearchParams()
  const { showToast } = useWireframe()
  const method = params.get('method') === 'qr' ? 'qr' : 'number'
  const q = params.get('q') || ''
  const reg = params.get('reg') || ''
  const cert = findCertificate(method, q, reg)
  const isVerified = Boolean(cert && cert.status === 'Active')
  const verifiedAt = new Date().toLocaleString()
  const verificationRef = `OV-VR-${Date.now().toString().slice(-8)}`

  const downloadCertificate = () => {
    if (!cert?.hasDocument) {
      showToast('Official certificate file is not currently available for download.', 'danger')
      return
    }
    showToast('Wireframe: original certificate download would start here.')
  }

  const downloadReport = () => {
    showToast('Wireframe: optional PDF verification report would download here.')
  }

  return (
    <PublicLayout>
      <div className="ovs-panel" style={{ maxWidth: 820, margin: '0 auto' }}>
        <div className="ovs-panel__body">
          <div className="ovs-result">
            {isVerified ? (
              <>
                <div className="ovs-result__badge ovs-result__badge--ok">
                  <i className="ri-checkbox-circle-fill" />
                </div>
                <h1>Verified</h1>
                <p>This certificate is authentic and matches the official NAVTTC records.</p>
              </>
            ) : (
              <>
                <div className="ovs-result__badge ovs-result__badge--fail">
                  <i className="ri-close-circle-fill" />
                </div>
                <h1>Not Verified</h1>
                <p>
                  This certificate could not be authenticated against the official NAVTTC records.
                  {method === 'number'
                    ? ' Both the certificate number and student registration number must match the same official record.'
                    : ''}
                  {cert?.status === 'Revoked' ? ' The source record indicates this certificate has been revoked.' : ''}
                </p>
              </>
            )}

            {cert && (
              <div className="ovs-result-grid">
                <div className="ovs-result-field">
                  <span>Student Name</span>
                  <strong>{cert.studentName}</strong>
                </div>
                <div className="ovs-result-field">
                  <span>Registration Number</span>
                  <strong>{cert.registrationNumber}</strong>
                </div>
                <div className="ovs-result-field">
                  <span>Certificate Number</span>
                  <strong>{cert.certificateNumber}</strong>
                </div>
                <div className="ovs-result-field">
                  <span>Qualification Name</span>
                  <strong>{cert.qualificationName}</strong>
                </div>
                <div className="ovs-result-field">
                  <span>Institute Name</span>
                  <strong>{cert.instituteName}</strong>
                </div>
                <div className="ovs-result-field">
                  <span>Awarding Body / Board</span>
                  <strong>{cert.awardingBody}</strong>
                </div>
                <div className="ovs-result-field">
                  <span>Certificate Issue Date</span>
                  <strong>{cert.issueDate}</strong>
                </div>
                <div className="ovs-result-field">
                  <span>Completion Date</span>
                  <strong>{cert.completionDate}</strong>
                </div>
                <div className="ovs-result-field">
                  <span>Certificate Status</span>
                  <strong>{cert.status}</strong>
                </div>
              </div>
            )}

            <div className="ovs-result-grid" style={{ marginTop: cert ? 0 : '1rem' }}>
              <div className="ovs-result-field">
                <span>Verification Method</span>
                <strong>{method === 'qr' ? 'QR Code' : 'Certificate Number + Registration Number'}</strong>
              </div>
              <div className="ovs-result-field">
                <span>Submitted Certificate Number</span>
                <strong>{q || '—'}</strong>
              </div>
              {method === 'number' && (
                <div className="ovs-result-field">
                  <span>Submitted Registration Number</span>
                  <strong>{reg || '—'}</strong>
                </div>
              )}
              <div className="ovs-result-field">
                <span>Verification Date &amp; Time</span>
                <strong>{verifiedAt}</strong>
              </div>
              <div className="ovs-result-field">
                <span>Verification Reference</span>
                <strong>{verificationRef}</strong>
              </div>
            </div>

            {isVerified && cert?.certificateImage && (
              <div className="ovs-cert-preview">
                <div className="ovs-cert-preview__label">
                  <i className="ri-image-line" /> Official Certificate Preview
                </div>
                <div className="ovs-cert-preview__frame">
                  <img src={cert.certificateImage} alt={`Certificate for ${cert.studentName}`} />
                </div>
              </div>
            )}

            <div className="ovs-actions" style={{ justifyContent: 'center' }}>
              {isVerified && (
                <button type="button" className="ovs-btn ovs-btn-success" onClick={downloadCertificate}>
                  <i className="ri-file-download-line" /> Download Certificate
                </button>
              )}
              <button type="button" className="ovs-btn ovs-btn-primary" onClick={downloadReport}>
                <i className="ri-file-pdf-2-line" /> Download Verification Report
              </button>
              <Link to={method === 'number' ? '/verify/certificate-number' : '/'} className="ovs-btn ovs-btn-light">
                Verify another
              </Link>
            </div>

            <p style={{ marginTop: '1.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              The verification report is optional and is not a replacement for the original academic certificate.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
