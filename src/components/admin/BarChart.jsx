/**
 * BarChart horizontal (SVG) — distribusi kategori & performa OPD.
 *
 * Props:
 *  - data: array of { label, value, color }
 *    color = "bg-xxx text-on-xxx" atau hanya "bg-xxx"
 */
function splitColor(color = 'bg-primary text-on-primary') {
  const parts = color.split(/\s+/)
  const bg = parts.find((c) => c.startsWith('bg-')) || 'bg-primary'
  const txt = parts.find((c) => c.startsWith('text-')) || 'text-on-primary'
  return { bg, txt }
}

export default function BarChart({ data, labelKey = 'label', valueKey = 'jumlah', showValue = true }) {
  const max = Math.max(...data.map((d) => d[valueKey]), 1)

  return (
    <div className="space-y-3">
      {data.map((item) => {
        const width = (item[valueKey] / max) * 100
        const { bg, txt } = splitColor(item.color)
        return (
          <div className="flex items-center gap-3" key={item[labelKey]}>
            <span className="w-32 shrink-0 font-caption text-caption text-on-surface-variant text-right">
              {item[labelKey]}
            </span>
            <div className="relative flex-1 h-7 bg-surface-container rounded-lg overflow-hidden">
              <div
                className={
                  'h-full rounded-lg transition-all flex items-center ' +
                  (showValue ? 'justify-end pr-2' : 'justify-start') +
                  ' ' +
                  bg +
                  ' ' +
                  txt
                }
                style={{ width: `${width}%`, minWidth: '2px' }}
              >
                {showValue && (
                  <span className="font-label-sm text-label-sm font-semibold truncate">
                    {item[valueKey]}
                  </span>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
