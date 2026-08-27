import { BLOCKS, statusConfig, Status } from '@/data/mockData';
import { useState } from 'react';

interface Props {
  selectedId?: string;
  onSelect?: (id: string) => void;
  compact?: boolean;
}

// Grid-based block map visualization (no GIS backend needed)
const positions: Record<string, { x: number; y: number }> = {
  thirupparankundram: { x: 30, y: 25 },
  melur: { x: 65, y: 30 },
  usilampatti: { x: 25, y: 60 },
  vadipatti: { x: 55, y: 65 },
  perungudi: { x: 78, y: 55 },
};

export function BlockMap({ selectedId, onSelect, compact = false }: Props) {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div className={`relative w-full ${compact ? 'aspect-[4/3]' : 'aspect-[16/10]'} bg-leaf-50 rounded-2xl border border-leaf-200/70 overflow-hidden`}>
      {/* decorative grid */}
      <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D9EFBD" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* district outline */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M 15,15 Q 50,8 85,18 Q 92,50 82,80 Q 50,92 18,85 Q 8,50 15,15 Z"
          fill="none"
          stroke="#B9D175"
          strokeWidth="0.6"
          strokeDasharray="2,1.5"
          opacity="0.7"
        />
      </svg>

      <div className="absolute top-3 left-3 chip bg-white/80 text-brand-600 backdrop-blur-sm border border-leaf-200">
        Madurai District
      </div>

      {BLOCKS.map((block) => {
        const pos = positions[block.id];
        const cfg = statusConfig[block.status];
        const isSel = selectedId === block.id;
        const isHover = hover === block.id;
        const size = compact ? 44 : 56;
        return (
          <button
            key={block.id}
            onClick={() => onSelect?.(block.id)}
            onMouseEnter={() => setHover(block.id)}
            onMouseLeave={() => setHover(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 group"
            style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
          >
            <div
              className={`rounded-2xl ${cfg.bg} border-2 ${isSel ? 'border-brand-700' : 'border-white'} shadow-card grid place-items-center transition-all ${isHover ? 'scale-110' : ''}`}
              style={{ width: size, height: size }}
            >
              <span className={`font-display font-bold text-sm ${cfg.color}`}>{block.onset}%</span>
            </div>
            <p className={`text-[10px] mt-1 font-medium text-brand-600 text-center whitespace-nowrap ${compact ? 'hidden' : ''}`}>
              {block.name}
            </p>
            {(isSel || isHover) && (
              <div className="absolute z-20 top-full mt-2 left-1/2 -translate-x-1/2 w-44 bg-white rounded-xl shadow-card border border-leaf-200 p-3 text-left animate-scaleIn">
                <p className="font-semibold text-xs text-brand-800">{block.name}</p>
                <div className="mt-1.5 space-y-1 text-[11px] text-brand-500">
                  <p className="flex justify-between"><span>Onset</span><span className="font-semibold text-brand-700">{block.onset}%</span></p>
                  <p className="flex justify-between"><span>Break</span><span className="font-semibold text-brand-700">{block.break}%</span></p>
                </div>
                <div className="mt-1.5">
                  <StatusPill status={block.status} />
                </div>
              </div>
            )}
          </button>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-2 bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 border border-leaf-200">
        {(['favourable', 'moderate', 'attention'] as Status[]).map((s) => (
          <div key={s} className="flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${statusConfig[s].dot}`} />
            <span className="text-[10px] font-medium text-brand-500">{statusConfig[s].label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: Status }) {
  const cfg = statusConfig[status];
  return (
    <span className={`chip ${cfg.bg} ${cfg.color} text-[10px] px-2 py-0.5`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
