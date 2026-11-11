import { useMemo, useState } from 'react'
import { AppLayout } from '../../components/layout/AppLayout'
import { DataTable, ListPanel, PageHeader, StatusBadge } from '../../components/ui'
import { verificationLogs } from '../../data/mockData'
import { useWireframe } from '../../context/WireframeContext'

export default function VerificationActivity() {
  const { showToast } = useWireframe()
  const [search, setSearch] = useState('')
  const [method, setMethod] = useState('All')
  const [result, setResult] = useState('All')

  const rows = useMemo(() => {
    return verificationLogs.filter((row) => {
      const q = search.trim().toLowerCase()
      const matchesSearch =
        !q ||
        row.certificateNumber.toLowerCase().includes(q) ||
        row.studentName.toLowerCase().includes(q) ||
        row.qualification.toLowerCase().includes(q) ||
        row.registrationNumber.toLowerCase().includes(q) ||
        row.ipAddress.toLowerCase().includes(q)
      const matchesMethod = method === 'All' || row.method === method
      const matchesResult = result === 'All' || row.result === result
      return matchesSearch && matchesMethod && matchesResult
    })
  }, [search, method, result])

  const columns = [
    { key: 'date', label: 'Verification Date' },
    { key: 'method', label: 'Method' },
    {
      key: 'certificateNumber',
      label: 'Certificate / Reg No.',
      render: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.certificateNumber}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{row.registrationNumber}</div>
        </div>
      ),
    },
    {
      key: 'studentName',
      label: 'Student',
      render: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.studentName}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>{row.qualification}</div>
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
    { key: 'device', label: 'Device' },
    {
      key: 'result',
      label: 'Result',
      render: (row) => <StatusBadge status={row.result} />,
    },
  ]

  return (
    <AppLayout>
      <div className="hrms-ref-page">
        <PageHeader
          breadcrumbs={[{ label: 'Dashboard', to: '/admin' }, { label: 'Verification Activity' }]}
          actions={
            <button type="button" className="ti-btn ti-btn-primary ti-btn-sm" onClick={() => showToast('Wireframe: export to Excel/PDF')}>
              <i className="ri-download-2-line" /> Export
            </button>
          }
        />

        <ListPanel
          title="Verification Activity Log"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search certificate, student, IP…"
          filters={
            <>
              <select className="hrms-ref-select" value={method} onChange={(e) => setMethod(e.target.value)} aria-label="Method filter">
                <option>All</option>
                <option>QR Code</option>
                <option>Certificate Number</option>
              </select>
              <select className="hrms-ref-select" value={result} onChange={(e) => setResult(e.target.value)} aria-label="Result filter">
                <option>All</option>
                <option>Verified</option>
                <option>Not Verified</option>
              </select>
            </>
          }
        >
          <DataTable columns={columns} rows={rows} emptyMessage="No verification activity matches these filters." />
        </ListPanel>
      </div>
    </AppLayout>
  )
}
