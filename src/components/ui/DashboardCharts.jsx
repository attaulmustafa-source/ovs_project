import { dashboardStats, monthlyTrend, weeklyTrend } from '../../data/mockData'

function DonutChart({ verified, notVerified }) {
  const total = verified + notVerified || 1
  const verifiedPct = (verified / total) * 100
  const radius = 54
  const circumference = 2 * Math.PI * radius
  const verifiedLen = (verifiedPct / 100) * circumference

  return (
    <div className="ovs-chart-donut">
      <svg viewBox="0 0 140 140" width="140" height="140" aria-hidden="true">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#e8eef8" strokeWidth="16" />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#10b981"
          strokeWidth="16"
          strokeDasharray={`${verifiedLen} ${circumference - verifiedLen}`}
          strokeLinecap="round"
          transform="rotate(-90 70 70)"
        />
        <circle
          cx="70"
          cy="70"
          r={radius}
          fill="none"
          stroke="#fb4242"
          strokeWidth="16"
          strokeDasharray={`${circumference - verifiedLen} ${verifiedLen}`}
          strokeDashoffset={-verifiedLen}
          transform="rotate(-90 70 70)"
        />
        <text x="70" y="66" textAnchor="middle" className="ovs-chart-donut__value">
          {Math.round(verifiedPct)}%
        </text>
        <text x="70" y="84" textAnchor="middle" className="ovs-chart-donut__label">
          Verified
        </text>
      </svg>
      <div className="ovs-chart-legend">
        <div>
          <span className="ovs-dot ovs-dot--success" /> Verified
          <strong>{verified.toLocaleString()}</strong>
        </div>
        <div>
          <span className="ovs-dot ovs-dot--danger" /> Not Verified
          <strong>{notVerified.toLocaleString()}</strong>
        </div>
      </div>
    </div>
  )
}

function MethodBars({ qr, cert }) {
  const max = Math.max(qr, cert, 1)
  return (
    <div className="ovs-chart-bars">
      <div className="ovs-chart-bar-row">
        <div className="ovs-chart-bar-row__label">
          <i className="ri-qr-scan-2-line" /> QR Code
        </div>
        <div className="ovs-chart-bar-track">
          <div className="ovs-chart-bar-fill ovs-chart-bar-fill--primary" style={{ width: `${(qr / max) * 100}%` }} />
        </div>
        <div className="ovs-chart-bar-row__value">{qr.toLocaleString()}</div>
      </div>
      <div className="ovs-chart-bar-row">
        <div className="ovs-chart-bar-row__label">
          <i className="ri-hashtag" /> Cert + Reg No.
        </div>
        <div className="ovs-chart-bar-track">
          <div className="ovs-chart-bar-fill ovs-chart-bar-fill--amber" style={{ width: `${(cert / max) * 100}%` }} />
        </div>
        <div className="ovs-chart-bar-row__value">{cert.toLocaleString()}</div>
      </div>
      <p className="ovs-chart-note">Share of all-time verification requests by method</p>
    </div>
  )
}

function WeeklyBars({ data }) {
  const max = Math.max(...data.map((d) => d.total), 1)
  return (
    <div className="ovs-chart-weekly">
      <div className="ovs-chart-weekly__bars">
        {data.map((d) => (
          <div key={d.day} className="ovs-chart-weekly__col" title={`${d.day}: ${d.total} total, ${d.verified} verified`}>
            <div className="ovs-chart-weekly__stack">
              <div className="ovs-chart-weekly__total" style={{ height: `${(d.total / max) * 100}%` }}>
                <div className="ovs-chart-weekly__verified" style={{ height: `${(d.verified / d.total) * 100}%` }} />
              </div>
            </div>
            <span>{d.day}</span>
          </div>
        ))}
      </div>
      <div className="ovs-chart-legend ovs-chart-legend--inline">
        <div>
          <span className="ovs-dot ovs-dot--muted" /> Total requests
        </div>
        <div>
          <span className="ovs-dot ovs-dot--primary" /> Verified
        </div>
      </div>
    </div>
  )
}

function MonthlyTrendChart({ data }) {
  const max = Math.max(...data.map((d) => d.total), 1)
  const points = data.map((d, i) => {
    const x = data.length === 1 ? 50 : (i / (data.length - 1)) * 100
    const y = 100 - (d.total / max) * 78 - 8
    return { ...d, x, y }
  })
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${points[points.length - 1].x} 100 L ${points[0].x} 100 Z`

  return (
    <div className="ovs-chart-monthly">
      <div className="ovs-chart-monthly__svg-wrap">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="ovs-chart-monthly__svg" aria-hidden="true">
          <path d={areaPath} fill="rgba(75, 98, 190, 0.12)" />
          <path d={linePath} fill="none" stroke="#4b62be" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
          {points.map((p) => (
            <circle key={p.month} cx={p.x} cy={p.y} r="1.6" fill="#2f4798" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        <div className="ovs-chart-monthly__bars">
          {data.map((d) => (
            <div key={d.month} className="ovs-chart-monthly__col" title={`${d.month}: ${d.total} total · ${d.verified} verified`}>
              <div className="ovs-chart-monthly__bar-wrap">
                <div className="ovs-chart-monthly__bar" style={{ height: `${(d.total / max) * 100}%` }}>
                  <div className="ovs-chart-monthly__bar-verified" style={{ height: `${(d.verified / d.total) * 100}%` }} />
                </div>
              </div>
              <strong>{d.total.toLocaleString()}</strong>
              <span>{d.month}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="ovs-chart-legend ovs-chart-legend--inline">
        <div>
          <span className="ovs-dot ovs-dot--muted" /> Total requests
        </div>
        <div>
          <span className="ovs-dot ovs-dot--primary" /> Verified
        </div>
        <div>
          <span className="ovs-dot ovs-dot--amber" /> Current month highlighted in bars
        </div>
      </div>
    </div>
  )
}

export default function DashboardCharts() {
  return (
    <>
      <div className="grid-12 mb-4">
        <div className="col-span-4">
          <div className="box overflow-hidden ovs-dash-equal">
            <div className="box-header">
              <h3 className="box-title">Verification Outcome</h3>
            </div>
            <div className="box-body">
              <DonutChart verified={dashboardStats.verified} notVerified={dashboardStats.notVerified} />
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="box overflow-hidden ovs-dash-equal">
            <div className="box-header">
              <h3 className="box-title">Method Mix</h3>
            </div>
            <div className="box-body">
              <MethodBars qr={dashboardStats.qrCount} cert={dashboardStats.certNumberCount} />
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="box overflow-hidden ovs-dash-equal">
            <div className="box-header">
              <h3 className="box-title">Weekly Trend</h3>
            </div>
            <div className="box-body">
              <WeeklyBars data={weeklyTrend} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid-12 mb-4">
        <div className="col-span-12">
          <div className="box overflow-hidden">
            <div className="box-header">
              <h3 className="box-title">Monthly Trend (Last 6 Months)</h3>
            </div>
            <div className="box-body">
              <MonthlyTrendChart data={monthlyTrend} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
