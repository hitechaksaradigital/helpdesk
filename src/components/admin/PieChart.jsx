/**
 * PieChart donut (SVG) — distribusi status pengaduan.
 *
 * Props:
 *  - data: array of { status, label, jumlah, color } (color = "bg-xxx text-xx")
 */
function polarToCartesian(cx, cy, r, angleDeg) {
  const angleRad = (angleDeg - 90) * (Math.PI / 180)
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) }
}

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle)
  const end = polarToCartesian(cx, cy, r, startAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0
  return ['M', cx, cy, 'L', start.x, start.y, 'A', r, r, 0, largeArc, 0, end.x, end.y, 'Z'].join(' ')
}

const STATUS_COLOR_MAP = {
  baru: 'bg-error',
  diverifikasi: 'bg-amber-500',
  diproses: 'bg-secondary',
  selesai: 'bg-primary',
  ditolak: 'bg-outline',
}

export default function PieChart({ data }) {
  const total = data.reduce((sum, d) => sum + d.jumlah, 0)
  const r = 54
  const cx = 70
  const cy = 70
  const gap = 2

  let startAngle = 0
  const slices = data.map((item) => {
    const pct = (item.jumlah / total) * 100
    const angle = (item.jumlah / total) * 360
    const endAngle = startAngle + angle
    const d = describeArc(cx, cy, r, startAngle + gap, endAngle - gap)
    const fill = STATUS_COLOR_MAP[item.status] || item.color
    startAngle = endAngle
    return { ...item, pct, d, fill }
  })

  return (
    <div className="flex items-center gap-6 flex-wrap">
      <div className="relative">
        <svg width="140" height="140" viewBox="0 0 140 140">
          {slices.map((s) => (
            <path
              d={s.d}
              fill="none"
              key={s.status}
              style={{ fill: s.fill }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-headline-md text-headline-md font-bold text-on-surface">
            {total}
          </span>
          <span className="font-caption text-caption text-on-surface-variant">Total Tiket</span>
        </div>
      </div>

      <ul className="space-y-2.5">
        {slices.map((s) => (
          <li className="flex items-center gap-3" key={s.status}>
            <span className={'w-3 h-3 rounded-full ' + s.fill} />
            <span className="font-label-sm text-label-sm font-semibold text-on-surface">{s.label}</span>
            <span className="font-caption text-caption text-on-surface-variant w-8 text-right">{s.jumlah}</span>
            <span className="font-caption text-caption text-on-surface-variant w-10 text-right">
              {s.pct.toFixed(0)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
