import { Link } from 'react-router-dom'

export function StatusBadge({ status }) {
  const normalized = String(status || '').toLowerCase().replace(/\s+/g, '_')
  return <span className={`status-badge status-badge--${normalized}`}>{status?.replace(/_/g, ' ')}</span>
}

export function PageHeader({ breadcrumbs, actions }) {
  return (
    <div className="page-header-breadcrumb hrms-breadcrumb-row">
      <div className="page-header-breadcrumb__left">
        {breadcrumbs?.length > 0 && (
          <ol className="breadcrumb">
            {breadcrumbs.map((item, i) => {
              const label = typeof item === 'string' ? item : item.label
              const to = typeof item === 'object' ? item.to : undefined
              const isLast = i === breadcrumbs.length - 1
              return (
                <li
                  key={`${label}-${i}`}
                  className={`breadcrumb-item${isLast ? ' active' : ''}`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {to && !isLast ? <Link to={to}>{label}</Link> : label}
                </li>
              )
            })}
          </ol>
        )}
      </div>
      {actions && <div className="page-header-breadcrumb__actions">{actions}</div>}
    </div>
  )
}

export function ListPanel({
  title,
  filters,
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search…',
  children,
  hint,
  headerAction,
  onResetFilters,
}) {
  const hasFilters = Boolean(filters) || onSearchChange != null

  return (
    <article className="hrms-ref-panel">
      <header className={`hrms-ref-panel-head${hasFilters ? ' hrms-ref-panel-head--toolbar' : ''}`}>
        <div className="hrms-ref-panel-head__row">
          <h2 className="hrms-ref-panel-title">{title}</h2>
          {headerAction}
        </div>
        {hasFilters && (
          <div className="hrms-ref-panel-toolbar">
            <div className="hrms-ref-panel-toolbar__left">
              {filters}
              {onResetFilters && (
                <button type="button" className="hrms-ref-btn-secondary" onClick={onResetFilters}>
                  <i className="ri-refresh-line" aria-hidden /> Reset filters
                </button>
              )}
            </div>
            {onSearchChange != null && (
              <div className="hrms-ref-panel-toolbar__right">
                <input
                  type="search"
                  className="hrms-ref-search"
                  placeholder={searchPlaceholder}
                  value={searchValue ?? ''}
                  onChange={(e) => onSearchChange(e.target.value)}
                />
              </div>
            )}
          </div>
        )}
      </header>
      {hint && <div className="hrms-ref-panel-hint">{hint}</div>}
      <div className="hrms-ref-panel-body">{children}</div>
    </article>
  )
}

export function Box({ title, actions, children, className = '', bodyClassName = '' }) {
  const hasHeader = title || actions
  return (
    <div className={`box overflow-hidden ${className}`.trim()}>
      {hasHeader && (
        <div className="box-header">
          {title && <h3 className="box-title">{title}</h3>}
          {actions && <div className="box-header__actions">{actions}</div>}
        </div>
      )}
      <div className={`box-body ${bodyClassName}`.trim()}>{children}</div>
    </div>
  )
}

export function DataTable({ columns, rows, emptyMessage = 'No records found.' }) {
  if (!rows?.length) {
    return (
      <div className="empty-state" style={{ padding: '2rem 1.25rem' }}>
        <i className="ri-inbox-line" />
        <p>{emptyMessage}</p>
      </div>
    )
  }
  return (
    <div className="hrms-data-table-wrap">
      <table className="hrms-data-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} style={col.width ? { width: col.width } : undefined}>
                <span className="hrms-th-inner">{col.label}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id ?? i}>
              {columns.map((col) => (
                <td key={col.key}>{col.render ? col.render(row) : row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const statVariants = {
  'success-tint': 'stat-card-inner--success-tint',
  'info-tint': 'stat-card-inner--info-tint',
  primary: 'stat-card-inner--primary',
  warning: 'stat-card-inner--warning',
  plain: 'stat-card-inner--plain',
}

export function StatCard({ icon, value, label, variant = 'plain' }) {
  return (
    <div className="box overflow-hidden">
      <div className="box-body p-0">
        <div className={`stat-card-inner ${statVariants[variant] || statVariants.plain}`}>
          {icon && (
            <div className="stat-card-inner__icon">
              <i className={icon} />
            </div>
          )}
          <p className="stat-card-inner__value">{value}</p>
          <p className="stat-card-inner__label">{label}</p>
        </div>
      </div>
    </div>
  )
}

export function FormField({ label, required, hint, children, className = 'form-col-6' }) {
  return (
    <div className={`form-field ${className}`.trim()}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="form-required"> *</span>}
        </label>
      )}
      {children}
      {hint && <p className="form-hint">{hint}</p>}
    </div>
  )
}

export function FormFooter({
  onCancel,
  cancelLabel = 'Cancel',
  submitLabel = 'Save',
  onSubmit,
  submitDisabled,
  variant = 'page',
}) {
  return (
    <div className={`form-page-footer${variant === 'modal' ? ' form-page-footer--modal' : ''}`}>
      {onCancel && (
        <button type="button" className="ti-btn ti-btn-light" onClick={onCancel}>
          <i className="ri-close-line" /> {cancelLabel}
        </button>
      )}
      {onSubmit && (
        <button type="button" className="ti-btn ti-btn-primary" onClick={onSubmit} disabled={submitDisabled}>
          <i className="ri-save-line" /> {submitLabel}
        </button>
      )}
    </div>
  )
}
