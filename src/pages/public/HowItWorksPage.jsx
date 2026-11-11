import { Link } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'

const steps = [
  {
    title: 'Choose a method',
    desc: 'Scan the certificate QR code, or enter certificate number and student registration number together.',
    icon: 'ri-apps-2-line',
  },
  {
    title: 'Automated check',
    desc: 'The verification engine reads approved fields from the NAVTTC Unified Database — no officer approval.',
    icon: 'ri-cpu-line',
  },
  {
    title: 'Immediate result',
    desc: 'See Verified or Not Verified with certificate details when a match is found.',
    icon: 'ri-flashlight-line',
  },
  {
    title: 'Optional downloads',
    desc: 'Download the official certificate (when available) and an optional PDF verification report.',
    icon: 'ri-download-2-line',
  },
]

export default function HowItWorksPage() {
  return (
    <PublicLayout>
      <section className="ovs-hero">
        <div className="ovs-hero__eyebrow">
          <i className="ri-information-line" /> Process overview
        </div>
        <h1>How Online Verification Works</h1>
        <p>A fully automated public service connected to the existing Unified Database. No registration, payment, or pending request workflow.</p>
      </section>

      <div className="ovs-method-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
        {steps.map((step, index) => (
          <div key={step.title} className="ovs-method-card" style={{ cursor: 'default' }}>
            <div className="ovs-method-card__icon">
              <i className={step.icon} />
            </div>
            <h2>
              {index + 1}. {step.title}
            </h2>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>

      <div className="ovs-actions" style={{ justifyContent: 'center' }}>
        <Link to="/verify/certificate-number" className="ovs-btn ovs-btn-primary">
          Start verification
        </Link>
        <Link to="/" className="ovs-btn ovs-btn-light">
          Back to home
        </Link>
      </div>
    </PublicLayout>
  )
}
