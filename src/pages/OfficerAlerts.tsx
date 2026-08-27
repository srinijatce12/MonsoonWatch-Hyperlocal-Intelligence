import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, AlertTriangle, Info, ChevronRight } from 'lucide-react';
import { OfficerSidebar, OfficerMobileNav, OfficerTopbar } from '@/components/OfficerSidebar';
import { StatusBadge } from '@/components/StatusBadge';
import { BLOCKS } from '@/data/mockData';

const filters = ['All', 'High', 'Moderate', 'Low'] as const;

export function OfficerAlerts() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<(typeof filters)[number]>('All');

  const severityMap: Record<string, 'high' | 'moderate' | 'low' | 'info'> = {
    favourable: 'info',
    moderate: 'moderate',
    attention: 'high',
  };

  const alerts = BLOCKS.map((b) => ({
    block: b,
    severity: severityMap[b.status],
    title: b.status === 'attention' ? 'Possible dry spell / delayed onset' : b.status === 'moderate' ? 'Delayed monsoon onset' : 'Favourable onset conditions',
    period: b.status === 'attention' ? b.possibleBreak : b.expectedOnset,
  }));

  const filtered = alerts.filter((a) => {
    if (filter === 'All') return true;
    if (filter === 'High') return a.severity === 'high';
    if (filter === 'Moderate') return a.severity === 'moderate';
    return a.severity === 'info';
  });

  const severityCfg: Record<'high' | 'moderate' | 'low' | 'info', { icon: typeof ShieldAlert; bg: string; text: string; label: string }> = {
    high: { icon: ShieldAlert, bg: 'bg-red-100', text: 'text-red-600', label: 'High Priority' },
    moderate: { icon: AlertTriangle, bg: 'bg-amber-100', text: 'text-amber-600', label: 'Moderate' },
    low: { icon: Info, bg: 'bg-leaf-200/60', text: 'text-leaf-700', label: 'Low' },
    info: { icon: Info, bg: 'bg-leaf-200/60', text: 'text-leaf-700', label: 'Information' },
  };

  return (
    <div className="min-h-screen bg-leaf-50/40 flex">
      <OfficerSidebar />
      <div className="flex-1 min-w-0 pb-16 lg:pb-0">
        <OfficerTopbar title="Alerts" subtitle="District-wide alerts across all blocks" />
        <main className="px-5 lg:px-8 py-6 space-y-5 max-w-5xl">
          {/* Filters */}
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`chip px-4 py-2 text-xs font-medium transition ${
                  filter === f ? 'bg-brand-700 text-white' : 'bg-white text-brand-500 border border-leaf-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Alerts */}
          <div className="space-y-3">
            {filtered.length === 0 && (
              <div className="card p-8 text-center text-sm text-brand-400">No alerts in this category.</div>
            )}
            {filtered.map(({ block, severity, title, period }) => {
              const cfg = severityCfg[severity];
              const Icon = cfg.icon;
              return (
                <div key={block.id} className="card p-5 flex items-center gap-4 hover:shadow-card transition">
                  <div className={`h-12 w-12 rounded-xl grid place-items-center shrink-0 ${cfg.bg} ${cfg.text}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`chip text-[10px] ${cfg.bg} ${cfg.text}`}>{cfg.label}</span>
                      <StatusBadge status={block.status} size="sm" />
                    </div>
                    <p className="font-semibold text-brand-800 mt-1.5">{block.name}</p>
                    <p className="text-sm text-brand-500">{title}</p>
                    <p className="text-xs text-brand-400 mt-0.5">Expected: {period}</p>
                  </div>
                  <button
                    onClick={() => navigate(`/officer/blocks/${block.id}`)}
                    className="btn-ghost text-sm shrink-0"
                  >
                    View Analysis <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </main>
      </div>
      <OfficerMobileNav />
    </div>
  );
}
