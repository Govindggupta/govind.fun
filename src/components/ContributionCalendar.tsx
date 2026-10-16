import type { Contribution } from '@/lib/github';

const COLORS = ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'];
const BLOCK = 12;
const GAP = 4;
const TOP_PAD = 20;
const LEFT_PAD = 32;
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const WEEKDAY_LABELS: Array<[row: number, label: string]> = [
  [1, 'Mon'],
  [3, 'Wed'],
  [5, 'Fri'],
];

interface Props {
  contributions: Contribution[];
  total: number | null;
}

function parseDate(value: string): Date {
  return new Date(`${value}T00:00:00`);
}

function formatDate(value: string): string {
  return parseDate(value).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Static, server-rendered contribution calendar (no client JS). Tooltips use
 * native SVG <title> elements, so hover still works without hydration.
 */
export default function ContributionCalendar({ contributions, total }: Props) {
  if (contributions.length === 0) {
    return (
      <p className="text-sm text-[#8b949e]">
        Contribution data is currently unavailable.
      </p>
    );
  }

  // Group days into week columns (Sunday-first), matching GitHub's layout.
  const weeks: Array<Array<Contribution | null>> = [];
  let week: Array<Contribution | null> = Array(7).fill(null);

  for (const day of contributions) {
    const dayOfWeek = parseDate(day.date).getDay();
    if (dayOfWeek === 0 && week.some(Boolean)) {
      weeks.push(week);
      week = Array(7).fill(null);
    }
    week[dayOfWeek] = day;
  }
  weeks.push(week);

  const monthLabels: Array<{ x: number; label: string }> = [];
  let lastMonth = -1;
  weeks.forEach((column, index) => {
    const firstDay = column.find((day): day is Contribution => day !== null);
    if (!firstDay) return;
    const month = parseDate(firstDay.date).getMonth();
    if (month !== lastMonth) {
      monthLabels.push({ x: LEFT_PAD + index * (BLOCK + GAP), label: MONTHS[month] });
      lastMonth = month;
    }
  });

  const width = LEFT_PAD + weeks.length * (BLOCK + GAP) - GAP;
  const height = TOP_PAD + 7 * (BLOCK + GAP) - GAP;
  const summary =
    total !== null
      ? `${total} contributions in the last year`
      : 'Contribution calendar for the last year';

  return (
    <figure>
      <div className="overflow-x-auto">
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={summary}
          className="mx-auto block"
        >
          {monthLabels.map(({ x, label }) => (
            <text key={`${x}-${label}`} x={x} y={TOP_PAD - 6} fontSize={9} fill="#8b949e">
              {label}
            </text>
          ))}
          {WEEKDAY_LABELS.map(([row, label]) => (
            <text
              key={label}
              x={LEFT_PAD - 6}
              y={TOP_PAD + row * (BLOCK + GAP) + BLOCK - 2}
              fontSize={9}
              fill="#8b949e"
              textAnchor="end"
            >
              {label}
            </text>
          ))}
          {weeks.map((column, index) => (
            <g key={index}>
              {column.map((day, row) =>
                day ? (
                  <rect
                    key={day.date}
                    x={LEFT_PAD + index * (BLOCK + GAP)}
                    y={TOP_PAD + row * (BLOCK + GAP)}
                    width={BLOCK}
                    height={BLOCK}
                    rx={2}
                    fill={COLORS[Math.max(0, Math.min(COLORS.length - 1, day.level))]}
                  >
                    <title>{`${day.count} contribution${day.count === 1 ? '' : 's'} on ${formatDate(day.date)}`}</title>
                  </rect>
                ) : null
              )}
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#8b949e]">
        <span>{summary}</span>
        <span className="flex items-center gap-1">
          Less
          {COLORS.map((color) => (
            <span
              key={color}
              className="inline-block h-[11px] w-[11px] rounded-[2px]"
              style={{ backgroundColor: color }}
            />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  );
}
