import { Card } from '../../../components/ui/Card';
import { SectionHeader } from '../../../components/ui/SectionHeader';
import { TrendingUp } from 'lucide-react';

export const TrendChart = ({ trends = [] }) => {
  if (!trends || trends.length === 0) return null;

  const height = 180;
  const width = 500;
  const padding = 20;

  const maxVal = 100;
  const minVal = 0;

  const points = trends.map((t, idx) => {
    const x = padding + (idx / Math.max(1, trends.length - 1)) * (width - 2 * padding);
    const y = height - padding - ((t.completionRate - minVal) / (maxVal - minVal)) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');

  return (
    <Card hoverEffect={false} className="space-y-3">
      <SectionHeader
        icon={TrendingUp}
        title="Completion Trend"
        subtitle="Performance trajectory over time"
      />

      <div className="w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 overflow-visible">
          {/* Grid lines */}
          <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#E2E8F0" strokeDasharray="4 4" />
          <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#E2E8F0" strokeDasharray="4 4" />

          {/* Smooth Trend Line */}
          <polyline
            fill="none"
            stroke="#2563EB"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {/* Data Circles */}
          {trends.map((t, idx) => {
            const x = padding + (idx / Math.max(1, trends.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((t.completionRate - minVal) / (maxVal - minVal)) * (height - 2 * padding);
            return (
              <g key={t.label}>
                <circle cx={x} cy={y} r="5" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
                <text x={x} y={height - 2} textAnchor="middle" className="text-[10px] font-semibold fill-slate-400">
                  {t.label}
                </text>
                <text x={x} y={y - 10} textAnchor="middle" className="text-[10px] font-bold fill-blue-600">
                  {t.completionRate}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Card>
  );
};
