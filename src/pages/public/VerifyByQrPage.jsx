import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PublicLayout from '../../components/layout/PublicLayout'

const DEMO_SCANS = [
  { label: 'Valid QR — Ayesha Khan', value: 'OV-QR-004821-A9F2' },
  { label: 'Valid QR — Muhammad Bilal', value: 'OV-QR-001156-B3C1' },
  { label: 'Revoked certificate QR', value: 'OV-QR-000887-REV' },
  { label: 'Invalid / unknown QR', value: 'OV-QR-INVALID' },
]

export default function VerifyByQrPage() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const dragRef = useRef(null)

  const [step, setStep] = useState('choose') // choose | camera | upload | adjust
  const [scanning, setScanning] = useState(false)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [fileName, setFileName] = useState('')
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)
  const [dragging, setDragging] = useState(false)

  const goResult = (q) => {
    navigate(`/verify/result?method=qr&q=${encodeURIComponent(q)}`)
  }

  const simulateScan = (value = DEMO_SCANS[0].value) => {
    setScanning(true)
    window.setTimeout(() => {
      setScanning(false)
      goResult(value)
    }, 1100)
  }

  const onFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setFileName(file.name)
    setOffset({ x: 0, y: 0 })
    setScale(1)
    setStep('adjust')
  }

  const onPointerDown = (e) => {
    if (!previewUrl) return
    e.currentTarget.setPointerCapture(e.pointerId)
    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: offset.x,
      originY: offset.y,
    }
    setDragging(true)
  }

  const onPointerMove = (e) => {
    if (!dragRef.current) return
    const dx = e.clientX - dragRef.current.startX
    const dy = e.clientY - dragRef.current.startY
    setOffset({
      x: dragRef.current.originX + dx,
      y: dragRef.current.originY + dy,
    })
  }

  const onPointerUp = (e) => {
    if (!dragRef.current) return
    e.currentTarget.releasePointerCapture(e.pointerId)
    dragRef.current = null
    setDragging(false)
  }

  const backToChoose = () => {
    setStep('choose')
    setScanning(false)
    setOffset({ x: 0, y: 0 })
    setScale(1)
  }

  return (
    <PublicLayout>
      <div className="ovs-panel">
        <div className="ovs-panel__head">
          <h1>QR Code Verification</h1>
          <p>
            {step === 'choose' && 'Choose how you want to capture the certificate QR code.'}
            {step === 'camera' && 'Point your device camera at the QR code printed on the certificate.'}
            {step === 'upload' && 'Upload a photo or PDF of the certificate that contains the QR code.'}
            {step === 'adjust' && 'Drag the document so the QR code sits inside the scan box, then start scanning.'}
          </p>
        </div>

        <div className="ovs-panel__body">
          {step === 'choose' && (
            <>
              <div className="ovs-method-grid">
                <button type="button" className="ovs-method-card" onClick={() => setStep('camera')}>
                  <div className="ovs-method-card__icon">
                    <i className="ri-camera-line" />
                  </div>
                  <h2>Use Camera</h2>
                  <p>Open the live camera scanner and scan the QR code directly from the certificate.</p>
                  <span className="ovs-method-card__cta">
                    Open scanner <i className="ri-arrow-right-line" />
                  </span>
                </button>

                <button type="button" className="ovs-method-card" onClick={() => setStep('upload')}>
                  <div className="ovs-method-card__icon ovs-method-card__icon--amber">
                    <i className="ri-upload-2-line" />
                  </div>
                  <h2>Upload Document</h2>
                  <p>Upload a certificate image or scan, adjust the QR into the frame, then start scanning.</p>
                  <span className="ovs-method-card__cta">
                    Upload file <i className="ri-arrow-right-line" />
                  </span>
                </button>
              </div>
              <div className="ovs-actions" style={{ marginTop: '1rem' }}>
                <Link to="/" className="ovs-btn ovs-btn-light">
                  Back
                </Link>
              </div>
            </>
          )}

          {step === 'camera' && (
            <div className="ovs-qr-stage">
              <div>
                <div className={`ovs-camera${scanning ? ' ovs-camera--scanning' : ''}`} aria-label="Camera scanner">
                  <div className="ovs-camera__frame">
                    <div className="ovs-camera__scan" />
                  </div>
                  <div className="ovs-camera__label">{scanning ? 'Reading QR…' : 'Live camera scanner'}</div>
                </div>
                <div className="ovs-actions" style={{ marginTop: '1rem' }}>
                  <button type="button" className="ovs-btn ovs-btn-primary" onClick={() => simulateScan()} disabled={scanning}>
                    <i className="ri-qr-scan-2-line" /> {scanning ? 'Scanning…' : 'Simulate Successful Scan'}
                  </button>
                  <button type="button" className="ovs-btn ovs-btn-light" onClick={backToChoose} disabled={scanning}>
                    Change method
                  </button>
                </div>
              </div>

              <div>
                <h3 className="ovs-qr-side-title">Demo scan options</h3>
                <div className="ovs-qr-demo-list">
                  {DEMO_SCANS.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      className="ovs-btn ovs-btn-light"
                      style={{ justifyContent: 'space-between', width: '100%' }}
                      onClick={() => simulateScan(item.value)}
                      disabled={scanning}
                    >
                      <span>{item.label}</span>
                      <i className="ri-qr-code-line" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 'upload' && (
            <div className="ovs-upload-panel">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,.pdf"
                hidden
                onChange={onFileChange}
              />
              <button type="button" className="ovs-upload-dropzone" onClick={() => fileInputRef.current?.click()}>
                <i className="ri-image-add-line" />
                <strong>Upload certificate image or PDF</strong>
                <span>PNG, JPG, or PDF · wireframe demo accepts any file</span>
              </button>
              <div className="ovs-actions">
                <button type="button" className="ovs-btn ovs-btn-primary" onClick={() => fileInputRef.current?.click()}>
                  <i className="ri-upload-2-line" /> Choose File
                </button>
                <button type="button" className="ovs-btn ovs-btn-light" onClick={backToChoose}>
                  Change method
                </button>
              </div>
            </div>
          )}

          {step === 'adjust' && (
            <div className="ovs-qr-stage">
              <div>
                <div className="ovs-adjust-meta">
                  <span>
                    <i className="ri-file-line" /> {fileName || 'Uploaded document'}
                  </span>
                  <button type="button" className="ovs-link-btn" onClick={() => fileInputRef.current?.click()}>
                    Replace file
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*,.pdf" hidden onChange={onFileChange} />
                </div>

                <div
                  className={`ovs-camera ovs-camera--adjust${scanning ? ' ovs-camera--scanning' : ''}${dragging ? ' is-dragging' : ''}`}
                  aria-label="Adjust document over QR scanner"
                  onPointerDown={onPointerDown}
                  onPointerMove={onPointerMove}
                  onPointerUp={onPointerUp}
                  onPointerCancel={onPointerUp}
                >
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Uploaded certificate"
                      className="ovs-adjust-doc"
                      draggable={false}
                      style={{
                        transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px)) scale(${scale})`,
                      }}
                    />
                  ) : (
                    <div className="ovs-adjust-placeholder">Document preview</div>
                  )}
                  <div className="ovs-camera__frame ovs-camera__frame--overlay">
                    <div className="ovs-camera__scan" />
                  </div>
                  <div className="ovs-camera__label">
                    {scanning ? 'Reading QR…' : 'Drag document to fit QR in the box'}
                  </div>
                </div>

                <div className="ovs-adjust-controls">
                  <label htmlFor="zoom">
                    Zoom
                    <input
                      id="zoom"
                      type="range"
                      min="0.7"
                      max="1.8"
                      step="0.05"
                      value={scale}
                      onChange={(e) => setScale(Number(e.target.value))}
                      disabled={scanning}
                    />
                  </label>
                  <button
                    type="button"
                    className="ovs-btn ovs-btn-light"
                    onClick={() => {
                      setOffset({ x: 0, y: 0 })
                      setScale(1)
                    }}
                    disabled={scanning}
                  >
                    Reset position
                  </button>
                </div>

                <div className="ovs-actions" style={{ marginTop: '1rem' }}>
                  <button type="button" className="ovs-btn ovs-btn-primary" onClick={() => simulateScan()} disabled={scanning}>
                    <i className="ri-qr-scan-2-line" /> {scanning ? 'Scanning…' : 'Start Scanning'}
                  </button>
                  <button type="button" className="ovs-btn ovs-btn-light" onClick={() => setStep('upload')} disabled={scanning}>
                    Back
                  </button>
                </div>
              </div>

              <div>
                <h3 className="ovs-qr-side-title">How to adjust</h3>
                <ul className="ovs-adjust-help">
                  <li>Drag the document until the QR code is centered in the scan box.</li>
                  <li>Use zoom if the QR is too small or too large.</li>
                  <li>Press <strong>Start Scanning</strong> when the QR fits inside the frame.</li>
                </ul>
                <h3 className="ovs-qr-side-title" style={{ marginTop: '1.25rem' }}>
                  Demo scan outcomes
                </h3>
                <div className="ovs-qr-demo-list">
                  {DEMO_SCANS.map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      className="ovs-btn ovs-btn-light"
                      style={{ justifyContent: 'space-between', width: '100%' }}
                      onClick={() => simulateScan(item.value)}
                      disabled={scanning}
                    >
                      <span>{item.label}</span>
                      <i className="ri-qr-code-line" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PublicLayout>
  )
}
