import { useNavigate } from 'react-router-dom';
import { AlertTriangle, ChevronRight, ShieldAlert } from 'lucide-react';
import { OfficerSidebar, OfficerMobileNav, OfficerTopbar } from '@/components/OfficerSidebar';
import { BlockMap } from '@/components/BlockMap';
import { StatusBadge } from '@/components/StatusBadge';
import { BLOCKS } from '@/data/mockData';

export function OfficerDashboard() {
  const navigate = useNavigate();
  const favourable = BLOCKS.filter((b) => b.status === 'favourable').length;
  const breakRisk = BLOCKS.filter((b) => b.status === 'attention').length;
  const moderate = BLOCKS.filter((b) => b.status === 'moderate').length;

  const priorities = [...BLOCKS].sort((a, b) => a.onset - b.onset);

  return (
    <div className="min-h-screen bg-leaf-50/40 flex">
      <OfficerSidebar />
      <div className="flex-1 min-w-0 pb-16 lg:pb-0">
        <OfficerTopbar title="Dashboard" subtitle="District-wide monsoon monitoring" />
        <main className="px-5 lg:px-8 py-6 space-y-6 max-w-7xl">
          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <SummaryCard label="Blocks Monitored" value={BLOCKS.length} icon="grid" tone="brand" />
            <SummaryCard label="Favourable" value={favourable} icon="check" tone="leaf" />
            <SummaryCard label="Break Risk" value={breakRisk} icon="alert" tone="red" />
            <SummaryCard label="Moderate" value={moderate} icon="alert" tone="amber" />
          </div>

          {/* Map + priority */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-bold text-brand-800">Block-Level Map</h2>
                <span className="text-xs text-brand-400">Click a block to analyze</span>
              </div>
              <BlockMap onSelect={(id) => navigate(`/officer/blocks/${id}`)} />
            </div>

            <div className="card p-5">
              <h2 className="font-display font-bold text-brand-800 mb-4">Priority Areas</h2>
              <div className="space-y-3">
                {priorities.slice(0, 4).map((b, i) => (
                  <button
                    key={b.id}
                    onClick={() => navigate(`/officer/blocks/${b.id}`)}
                    className="w-full text-left p-3 rounded-xl border border-leaf-200/70 hover:bg-leaf-50 transition flex items-center gap-3"
                  >
                    <div className={`h-8 w-8 rounded-lg grid place-items-center shrink-0 ${
                      i === 0 ? 'bg-red-100 text-red-600' : i === 1 ? 'bg-amber-100 text-amber-600' : 'bg-leaf-200/60 text-leaf-700'
                    }`}>
                      {i === 0 ? <ShieldAlert className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm text-brand-800 truncate">{b.name}</p>
                        <StatusBadge status={b.status} size="sm" />
                      </div>
                      <p className="text-xs text-brand-400 mt-0.5">{b.concern}</p>
                    </div>
                    <ChevronRight className="h-4 w-4 text-brand-300 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <OfficerMobileNav />
    </div>
  );
}

function SummaryCard({ label, value, icon, tone }: { label: string; value: number; icon: string; tone: string }) {
  const tones: Record<string, string> = {
    brand: 'bg-brand-50 text-brand-700',
    leaf: 'bg-leaf-200/60 text-leaf-700',
    red: 'bg-red-100 text-red-600',
    amber: 'bg-amber-100 text-amber-600',
  };
  return (
    <div className="card p-4">
      <div className="flex items-center justify-between">
        <p className="text-xs text-brand-400 font-medium">{label}</p>
        <div className={`h-7 w-7 rounded-lg grid place-items-center ${tones[tone]}`}>
          <span className="text-xs font-bold">{value}</span>
        </div>
      </div>
      <p className="font-display font-bold text-3xl text-brand-800 mt-2">{value}</p>
    </div>
  );
}
