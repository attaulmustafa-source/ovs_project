import { Link } from 'react-router-dom'
import { AppLayout } from '../../components/layout/AppLayout'
import { Box, PageHeader, StatCard, StatusBadge } from '../../components/ui'
import DashboardCharts from '../../components/ui/DashboardCharts'
import { dashboardStats, verificationLogs } from '../../data/mockData'

export default function AdminDashboard() {
  const recent = verificationLogs.slice(0, 6)

  return (
    <AppLayout>
      <div className="hrms-ref-page">
        <PageHeader
          breadcrumbs={[{ label: 'Dashboard' }]}
          actions={
            <Link to="/" className="ti-btn ti-btn-light">
              <i className="ri-global-line" /> Public Portal
            </Link>
          }
        />

        <Box className="main-dashboard-banner mb-4" bodyClassName="p-6">
          <h4 style={{ margin: '0 0 0.35rem', fontWeight: 500, fontSize: '1rem' }}>
            Welcome to Online Certificate Verification
          </h4>
          <p style={{ margin: 0, opacity: 0.92, fontSize: '0.875rem' }}>
            Live verification analytics from the NAVTTC Unified Database — volume, outcomes, methods, and trends.
          </p>
        </Box>

        {/* Row 1 — primary KPIs */}
        <div className="grid-12 mb-4">
          <div className="col-span-3">
            <StatCard icon="ri-shield-flash-line" value={dashboardStats.totalRequests.toLocaleString()} label="Total Requests" variant="primary" />
          </div>
          <div className="col-span-3">
            <StatCard icon="ri-checkbox-circle-line" value={dashboardStats.verified.toLocaleString()} label="Verified" variant="success-tint" />
          </div>
          <div className="col-span-3">
            <StatCard icon="ri-close-circle-line" value={dashboardStats.notVerified.toLocaleString()} label="Not Verified" variant="info-tint" />
          </div>
          <div className="col-span-3">
            <StatCard icon="ri-calendar-check-line" value={dashboardStats.todayCount} label="Today" variant="warning" />
          </div>
        </div>

        {/* Row 2 — method / period KPIs */}
        <div className="grid-12 mb-4">
          <div className="col-span-4">
            <StatCard icon="ri-qr-scan-2-line" value={dashboardStats.qrCount.toLocaleString()} label="QR Code Verifications" variant="plain" />
          </div>
          <div className="col-span-4">
            <StatCard icon="ri-hashtag" value={dashboardStats.certNumberCount.toLocaleString()} label="Certificate Number Verifications" variant="plain" />
          </div>
          <div className="col-span-4">
            <StatCard icon="ri-bar-chart-grouped-line" value={dashboardStats.monthlyCount.toLocaleString()} label="This Month" variant="plain" />
          </div>
        </div>

        {/* Row 3–4 — charts (outcome / method / weekly + monthly trend) */}
        <DashboardCharts />

        {/* Row 5 — recent activity full width */}
        <div className="grid-12">
          <div className="col-span-12">
            <Box
              title="Recent Verification Activity"
              actions={
                <Link to="/admin/activity" className="ti-btn ti-btn-light ti-btn-sm">
                  View all
                </Link>
              }
            >
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Method</th>
                      <th>Certificate</th>
                      <th>Request IP</th>
                      <th>Result</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recent.map((row) => (
                      <tr key={row.id}>
                        <td>{row.date}</td>
                        <td>{row.method}</td>
                        <td>
                          <div style={{ fontWeight: 600 }}>{row.certificateNumber}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.studentName}</div>
                        </td>
                        <td>
                          <div style={{ fontWeight: 600, fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '0.8125rem' }}>
                            {row.ipAddress}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.device}</div>
                        </td>
                        <td>
                          <StatusBadge status={row.result} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Box>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
