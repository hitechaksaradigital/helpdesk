/**
 * LineChart (SVG) — tren mingguan masuk vs selesai.
 *
 * Props:
 *  - data: array of { hari, masuk, selesai }
 */
export default function LineChart({ data, height = 160 }) {
  const max = Math.max(...data.flatMap((d) => [d.masuk, d.selesai]), 1)
  const padding = { top: 16, right: 12, bottom: 24, left: 32 }
  const w = 560
  const h = height
  const plotW = w - padding.left - padding.right
  const plotH = h - padding.top - padding.bottom
  const step = plotW / Math.max(data.length - 1, 1)

  const linePoints = (key) =>
    data
      .map((d, i) => {
        const x = padding.left + i * step
        const y = padding.top + plotH - (d[key] / max) * plotH
        return `${x},${y}`
      })
      .join(' ')

  const dots = (key) =>
    data.map((d, i) => {
      const x = padding.left + i * step
      const y = padding.top + plotH - (d[key] / max) * plotH
      return (
        <circle
          cx={x}
          cy={y}
          key={i}
          r={3.5}
          fill={key === 'masuk' ? '#36671c' : '#2e7d37'}
        />
      )
    })

  const yTicks = 5
  const axisY = Array.from({ length: yTicks + 1 }, (_, i) => {
    const val = Math.round((max / yTicks) * i)
    const y = padding.top + plotH - (val / max) * plotH
    return { val, y }
  })

  return (
    <div className="w-full overflow-x-auto">
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="w-full">
        <line
          className="stroke-surface-container"
          x1={padding.left}
          x2={padding.left + plotW}
          y1={padding.top + plotH}
          y2={padding.top + plotH}
          strokeWidth="1"
        />

        {axisY.map((t) => (
          <g key={t.val}>
            <line
              className="stroke-surface-container"
              x1={padding.left}
              x2={padding.left + plotW}
              y1={t.y}
              y2={t.y}
              strokeWidth="1"
            />
            <text
              className="font-caption text-caption fill-on-surface-variant"
              x={padding.left - 6}
              y={t.y + 4}
              textAnchor="end"
            >
              {t.val}
            </text>
          </g>
        ))}

        <polyline
          className="stroke-primary fill-none"
          strokeWidth="2"
          points={linePoints('masuk')}
        />
        <polyline
          className="stroke-secondary fill-none"
          strokeWidth="2"
          points={linePoints('selesai')}
        />

        {dots('masuk')}
        {dots('selesai')}

        {data.map((d, i) => {
          const x = padding.left + i * step
          return (
            <text
              className="font-caption text-caption fill-on-surface-variant"
              key={d.hari}
              textAnchor="middle"
              x={x}
              y={h - 6}
            >
              {d.hari}
            </text>
          )
        })}
      </svg>

      <div className="flex items-center justify-center gap-6 pt-3">
        <span className="inline-flex items-center gap-2 font-caption text-caption text-on-surface-variant">
          <span className="w-3 h-3 rounded-full bg-primary" />
          <span>Masuk</span>
        </span>
        <span className="inline-flex items-center gap-2 font-caption text-caption text-on-surface-variant">
          <span className="w-3 h-3 rounded-full bg-secondary" />
          <span>Diselesaikan</span>
        </span>
      </div>
    </div>
  )
}
