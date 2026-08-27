import { useNavigate } from 'react-router-dom';
import { Map, ChevronRight } from 'lucide-react';
import { OfficerSidebar, OfficerMobileNav, OfficerTopbar } from '@/components/OfficerSidebar';
import { StatusBadge } from '@/components/StatusBadge';
import { BLOCKS } from '@/data/mockData';

export function BlockList() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-leaf-50/40 flex">
      <OfficerSidebar />
      <div className="flex-1 min-w-0 pb-16 lg:pb-0">
        <OfficerTopbar title="Block Analysis" subtitle="Select a block to view detailed prediction" />
        <main className="px-5 lg:px-8 py-6 max-w-5xl space-y-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BLOCKS.map((b) => (
              <button
                key={b.id}
                onClick={() => navigate(`/officer/blocks/${b.id}`)}
                className="card p-5 text-left hover:shadow-card hover:-translate-y-0.5 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="h-10 w-10 rounded-xl bg-leaf-100 grid place-items-center">
                    <Map className="h-5 w-5 text-leaf-600" />
                  </div>
                  <StatusBadge status={b.status} size="sm" />
                </div>
                <h3 className="font-display font-semibold text-brand-800">{b.name}</h3>
                <p className="text-xs text-brand-400 mt-0.5">Madurai District</p>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="p-2 rounded-lg bg-leaf-50">
                    <p className="text-[10px] text-brand-400">Onset</p>
                    <p className="font-display font-bold text-lg text-brand-700">{b.onset}%</p>
                  </div>
                  <div className="p-2 rounded-lg bg-amber-50">
                    <p className="text-[10px] text-brand-400">Break</p>
                    <p className="font-display font-bold text-lg text-amber-600">{b.break}%</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-end text-xs text-brand-500">
                  View Analysis <ChevronRight className="h-3.5 w-3.5" />
                </div>
              </button>
            ))}
          </div>
        </main>
      </div>
      <OfficerMobileNav />
    </div>
  );
}
