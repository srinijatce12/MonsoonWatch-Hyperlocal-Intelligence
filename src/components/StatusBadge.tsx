import { statusConfig, Status } from '@/data/mockData';

export function StatusBadge({ status, size = 'md' }: { status: Status; size?: 'sm' | 'md' }) {
  const cfg = statusConfig[status];
  return (
    <span
      className={`chip ${cfg.bg} ${cfg.color} ${size === 'sm' ? 'px-2.5 py-0.5 text-[11px]' : ''}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot}`} />
      {cfg.label}
    </span>
  );
}
