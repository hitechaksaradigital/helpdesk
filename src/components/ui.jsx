/**
 * Ikon Material Symbols berbasis ligatur + komponen kecil yang dipakai bersama.
 */
import { useEffect } from 'react'

/* ------------------------------------------------------------------ *
 * Ikon Material Symbols
 * ------------------------------------------------------------------ */
export function Icon({ name, className = '', filled = false, style, ...rest }) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined ${className}`}
      style={{
        ...(filled ? { fontVariationSettings: "'FILL' 1" } : null),
        ...style,
      }}
      {...rest}
    >
      {name}
    </span>
  )
}

/* ------------------------------------------------------------------ *
 * Logo + nama aplikasi
 * ------------------------------------------------------------------ */
export function BrandLogo({
  subtitle = 'Sistem Aspirasi & Pengaduan Rakyat',
  tone = 'primary',
}) {
  return (
    <div className="flex items-center gap-4 flex-shrink-0">
      <img
        alt="Logo LAPOR-DAERAH"
        className="h-8 w-auto object-contain"
        src="/images/logo.png"
      />
      <div className="flex flex-col">
        <span
          className={
            'font-title-md text-title-md leading-tight ' +
            (tone === 'primary' ? 'text-primary' : 'text-on-surface')
          }
        >
          LAPOR-DAERAH
        </span>
        <span className="font-caption text-caption text-on-surface-variant">{subtitle}</span>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Rating bintang
 * ------------------------------------------------------------------ */
export function StarRating({ value = 0, className = 'text-sm' }) {
  return (
    <span className={'inline-flex items-center gap-0.5 text-primary ' + className}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon
          key={i}
          name={i < Math.round(value) ? 'star' : 'star_outline'}
          className={className}
          filled={i < Math.round(value)}
        />
      ))}
    </span>
  )
}

/* ------------------------------------------------------------------ *
 * Modal generik
 * ------------------------------------------------------------------ */
export function Modal({
  open,
  onClose,
  title,
  icon,
  children,
  footer,
  maxWidth = 'max-w-2xl',
}) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      aria-label={typeof title === 'string' ? title : 'Dialog'}
      aria-modal="true"
      className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
      role="dialog"
    >
      <div
        className={
          'w-full ' +
          maxWidth +
          ' bg-surface-container-lowest rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]'
        }
      >
        <div className="px-6 py-4 bg-surface-container flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {icon && <Icon name={icon} className="text-primary text-[24px]" />}
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">{title}</h3>
          </div>
          <button
            aria-label="Tutup dialog"
            className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant"
            onClick={onClose}
            type="button"
          >
            <Icon name="close" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto space-y-4">{children}</div>
        {footer && (
          <div className="px-6 py-4 bg-surface-container flex items-center justify-end gap-3">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 * Toast Notifikasi
 * ------------------------------------------------------------------ */
export function Toast({ message, icon = 'check_circle', onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300 pointer-events-auto">
      <div className="px-5 py-3 rounded-xl bg-inverse-surface text-inverse-on-surface shadow-xl flex items-center gap-3">
        <Icon name={icon} className="text-[20px] text-primary-fixed" />
        <span className="font-body-sm text-body-sm font-medium">{message}</span>
        {onClose && (
          <button
            aria-label="Tutup notifikasi"
            className="p-1 rounded hover:bg-white/10 text-inverse-on-surface ml-2"
            onClick={onClose}
            type="button"
          >
            <Icon name="close" className="text-[16px]" />
          </button>
        )}
      </div>
    </div>
  )
}

