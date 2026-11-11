import { useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { AppLayout } from '../../components/layout/AppLayout'
import { DataTable, ListPanel, PageHeader, StatusBadge } from '../../components/ui'
import { adminUsers } from '../../data/mockData'
import { useWireframe } from '../../context/WireframeContext'

export default function AdminUsers() {
  const { adminSession, showToast } = useWireframe()
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('All')
  const [status, setStatus] = useState('All')

  const rows = useMemo(() => {
    const q = search.trim().toLowerCase()
    return adminUsers.filter((u) => {
      const matchesSearch =
        !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.role.toLowerCase().includes(q)
      const matchesRole = role === 'All' || u.role === role
      const matchesStatus = status === 'All' || u.status === status
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [search, role, status])

  if (adminSession && adminSession.role !== 'Super Admin') {
    return <Navigate to="/admin" replace />
  }

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    {
      key: 'role',
      label: 'Role',
      render: (row) => <StatusBadge status={row.role} />,
    },
    {
      key: 'status',
      label: 'Status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    { key: 'lastLogin', label: 'Last Login' },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <div style={{ display: 'flex', gap: '0.35rem' }}>
          <button type="button" className="ti-btn ti-btn-light ti-btn-sm" onClick={() => showToast('Wireframe: edit admin user')}>
            Edit
          </button>
          <button type="button" className="ti-btn ti-btn-light ti-btn-sm" onClick={() => showToast('Wireframe: toggle active status')}>
            Deactivate
          </button>
        </div>
      ),
    },
  ]

  return (
    <AppLayout>
      <div className="hrms-ref-page">
        <PageHeader
          breadcrumbs={[{ label: 'Dashboard', to: '/admin' }, { label: 'User Management' }]}
          actions={
            <button type="button" className="hrms-btn-primary" onClick={() => showToast('Wireframe: create admin account form')}>
              <i className="ri-user-add-line" /> Create Admin
            </button>
          }
        />

        <ListPanel
          title="User Management"
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search name or email…"
          filters={
            <>
              <select className="hrms-ref-select" value={role} onChange={(e) => setRole(e.target.value)} aria-label="Role filter">
                <option>All</option>
                <option>Super Admin</option>
                <option>Admin</option>
              </select>
              <select className="hrms-ref-select" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status filter">
                <option>All</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </>
          }
        >
          <DataTable columns={columns} rows={rows} />
        </ListPanel>
      </div>
    </AppLayout>
  )
}
