import { useMemo, useState } from 'react'
import { AppLayout } from '../../components/layout/AppLayout'
import { DataTable, FormFooter, ListPanel, PageHeader, StatusBadge } from '../../components/ui'
import { dailySummaryRows, verificationLogs } from '../../data/mockData'
import { useWireframe } from '../../context/WireframeContext'

const detailColumns = [
  { key: 'date', label: 'Date' },
  { key: 'method', label: 'Method' },
  {
    key: 'certificateNumber',
    label: 'Certificate / Reg No.',
    render: (row) => (
      <div>
        <div style={{ fontWeight: 600 }}>{row.certificateNumber}</div>
        <div className="hrms-cell-sub">{row.registrationNumber}</div>
      </div>
    ),
  },
  {
    key: 'studentName',
    label: 'Student',
    render: (row) => (
      <div>
        <div style={{ fontWeight: 600 }}>{row.studentName}</div>
        <div className="hrms-cell-sub">{row.qualification}</div>
      </div>
    ),
  },
  {
    key: 'ipAddress',
    label: 'Request IP',
    render: (row) => (
      <span style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: '0.8125rem' }}>{row.ipAddress}</span>
    ),
  },
  {
    key: 'result',
    label: 'Result',
    render: (row) => <StatusBadge status={row.result} />,
  },
]

const summaryColumns = [
  { key: 'period', label: 'Period' },
  { key: 'total', label: 'Total' },
  { key: 'verified', label: 'Verified' },
  { key: 'notVerified', label: 'Not Verified' },
  { key: 'qr', label: 'QR Code' },
  { key: 'certNumber', label: 'Cert. Number' },
  { key: 'verifiedRate', label: 'Verified Rate' },
]

export default function Reports() {
  const { showToast } = useWireframe()
  const [fromDate, setFromDate] = useState('2026-03-01')
  const [toDate, setToDate] = useState('2026-03-11')
  const [method, setMethod] = useState('All')
  const [result, setResult] = useState('All')
  const [viewMode, setViewMode] = useState('detail')

  const resetFilters = () => {
    setFromDate('2026-03-01')
    setToDate('2026-03-11')
    setMethod('All')
    setResult('All')
    setViewMode('detail')
  }

  const filteredLogs = useMemo(() => {
    return verificationLogs.filter((row) => {
      const matchesMethod = method === 'All' || row.method === method
      const matchesResult = result === 'All' || row.result === result
      return matchesMethod && matchesResult
    })
  }, [method, result])

  const isSummary = viewMode === 'summary'
  const rows = isSummary ? dailySummaryRows : filteredLogs
  const columns = isSummary ? summaryColumns : detailColumns

  const download = (format) => {
    showToast(`Wireframe: Verification report — ${format} download ready`)
  }

  return (
    <AppLayout>
      <div className="hrms-ref-page">
        <PageHeader
          breadcrumbs={[{ label: 'Dashboard', to: '/admin' }, { label: 'Reports & Export' }]}
          actions={
            <>
              <button type="button" className="ti-btn ti-btn-primary ti-btn-sm" onClick={() => download('Excel')}>
                <i className="ri-file-excel-2-line" /> Download Excel
              </button>
              <button type="button" className="ti-btn ti-btn-light ti-btn-sm" onClick={() => download('PDF')}>
                <i className="ri-file-pdf-2-line" /> Download PDF
              </button>
            </>
          }
        />

        <div className="hrms-compact-form-card">
          <div className="hrms-compact-form-card__head">
            <h3 className="hrms-compact-form-card__title">Verification Activity Report</h3>
          </div>
          <div className="hrms-compact-form-card__body">
            <p className="hrms-compact-form-card__desc">
              Filter by date, method, and result — or switch to daily/monthly summary. Export matches the current view.
            </p>
            <div className="form-row">
              <div className="form-field form-col-3">
                <label className="form-label">From date</label>
                <input type="date" className="form-control" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
              </div>
              <div className="form-field form-col-3">
                <label className="form-label">To date</label>
                <input type="date" className="form-control" value={toDate} onChange={(e) => setToDate(e.target.value)} />
              </div>
              <div className="form-field form-col-3">
                <label className="form-label">Method</label>
                <select className="form-control" value={method} onChange={(e) => setMethod(e.target.value)}>
                  <option>All</option>
                  <option>QR Code</option>
                  <option>Certificate Number</option>
                </select>
              </div>
              <div className="form-field form-col-3">
                <label className="form-label">Result</label>
                <select className="form-control" value={result} onChange={(e) => setResult(e.target.value)}>
                  <option>All</option>
                  <option>Verified</option>
                  <option>Not Verified</option>
                </select>
              </div>
              <div className="form-field form-col-3">
                <label className="form-label">View</label>
                <select className="form-control" value={viewMode} onChange={(e) => setViewMode(e.target.value)}>
                  <option value="detail">Detailed activity list</option>
                  <option value="summary">Daily / monthly summary</option>
                </select>
              </div>
            </div>
            <FormFooter
              onCancel={resetFilters}
              cancelLabel="Reset filters"
              onSubmit={() => download('Excel')}
              submitLabel="Download Excel"
            />
          </div>
        </div>

        <ListPanel title={isSummary ? 'Summary results' : 'Activity results'}>
          <DataTable columns={columns} rows={rows} emptyMessage="No rows match the selected filters." />
        </ListPanel>
      </div>
    </AppLayout>
  )
}
