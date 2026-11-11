import { Link } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'

export default function HomePage() {
  return (
    <PublicLayout>
      <section className="ovs-hero">
        <div className="ovs-hero__eyebrow">
          <i className="ri-shield-check-line" /> Instant authenticity check
        </div>
        <h1>Verify a NAVTTC Certificate</h1>
        <p>
          Anyone can confirm whether a certificate is authentic against official NAVTTC Unified Database records — no
          account, no fee, no waiting.
        </p>
      </section>

      <div className="ovs-method-grid">
        <Link to="/verify/qr" className="ovs-method-card">
          <div className="ovs-method-card__icon">
            <i className="ri-qr-scan-2-line" />
          </div>
          <h2>Verify through QR Code</h2>
          <p>Scan the QR code printed on the certificate. The system extracts the secure reference and returns the result immediately.</p>
          <span className="ovs-method-card__cta">
            Open QR scanner <i className="ri-arrow-right-line" />
          </span>
        </Link>

        <Link to="/verify/certificate-number" className="ovs-method-card">
          <div className="ovs-method-card__icon ovs-method-card__icon--amber">
            <i className="ri-hashtag" />
          </div>
          <h2>Verify through Certificate Number</h2>
          <p>
            Enter the certificate number and student registration number together. Both must match the same Unified
            Database record.
          </p>
          <span className="ovs-method-card__cta">
            Enter certificate &amp; registration no. <i className="ri-arrow-right-line" />
          </span>
        </Link>
      </div>

      <div className="ovs-info-strip">
        <div className="ovs-info-pill">
          <i className="ri-flashlight-line" />
          <div>
            <strong>Automated result</strong>
            <span>Verified or Not Verified — no manual approval</span>
          </div>
        </div>
        <div className="ovs-info-pill">
          <i className="ri-file-download-line" />
          <div>
            <strong>Optional downloads</strong>
            <span>Original certificate + verification report PDF</span>
          </div>
        </div>
        <div className="ovs-info-pill">
          <i className="ri-database-2-line" />
          <div>
            <strong>Official source</strong>
            <span>Reads from NAVTTC Unified Database only</span>
          </div>
        </div>
      </div>
    </PublicLayout>
  )
}
