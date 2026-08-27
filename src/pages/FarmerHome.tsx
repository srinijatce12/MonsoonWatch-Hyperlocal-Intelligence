import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bell, Sprout, CloudRain, ChevronRight, Calendar } from 'lucide-react';
import { FarmerHeader, FarmerMobileNav } from '@/components/FarmerHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { BLOCKS, statusConfig } from '@/data/mockData';
import { useApp } from '@/context/AppContext';

export function FarmerHome() {
  const { advisories, markRead } = useApp();
  const [blockId, setBlockId] = useState('thirupparankundram');
  const block = BLOCKS.find((b) => b.id === blockId)!;

  const myAdvisories = advisories.filter((a) => a.blockId === blockId);

  return (
    <div className="min-h-screen bg-leaf-50/40 pb-20 md:pb-0">
      <FarmerHeader />

      <main className="max-w-3xl mx-auto px-4 lg:px-6 py-6 space-y-6">
        {/* Location selector */}
        <div className="card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-leaf-200/60 grid place-items-center">
              <MapPin className="h-5 w-5 text-leaf-600" />
            </div>
            <div>
              <p className="text-xs text-brand-400">Your Location</p>
              <p className="font-semibold text-brand-800 text-sm">Madurai District</p>
              <select
                value={blockId}
                onChange={(e) => setBlockId(e.target.value)}
                className="text-sm font-semibold text-brand-700 bg-transparent border-none focus:outline-none cursor-pointer"
              >
                {BLOCKS.map((b) => (
                  <option key={b.id} value={b.id}>{b.name} Block</option>
                ))}
              </select>
            </div>
          </div>
          <Link to="/farmer/advisories" className="relative p-2.5 rounded-xl bg-leaf-50 hover:bg-leaf-100 transition">
            <Bell className="h-5 w-5 text-brand-600" />
            {myAdvisories.filter((a) => !a.read).length > 0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-[10px] grid place-items-center font-bold">
                {myAdvisories.filter((a) => !a.read).length}
              </span>
            )}
          </Link>
        </div>

        {/* Monsoon Outlook */}
        <div className="card p-6 animate-fadeIn">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <CloudRain className="h-5 w-5 text-leaf-500" />
              <h2 className="font-display font-bold text-brand-800">Monsoon Outlook</h2>
            </div>
            <StatusBadge status={block.status} />
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center">
              <p className="text-xs text-brand-400 mb-1">Onset Probability</p>
              <p className="font-display font-bold text-3xl text-brand-700">{block.onset}%</p>
            </div>
            <div className="text-center border-x border-leaf-200/70">
              <p className="text-xs text-brand-400 mb-1">Expected Onset</p>
              <p className="font-display font-semibold text-sm text-brand-700 mt-1.5">{block.expectedOnset}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-brand-400 mb-1">Current Status</p>
              <p className="font-semibold text-sm text-brand-600 mt-1.5">Pre-Monsoon</p>
            </div>
          </div>

          {/* 7-day visual */}
          <div>
            <p className="text-xs font-semibold text-brand-500 mb-3 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" /> Next 7 Days
            </p>
            <div className="grid grid-cols-7 gap-1.5">
              {block.sevenDay.map((d) => (
                <div key={d.day} className="text-center">
                  <p className="text-[10px] text-brand-400 mb-1.5">{d.day}</p>
                  <div
                    className={`h-10 rounded-lg ${statusConfig[d.status].bg} grid place-items-center`}
                    title={d.label}
                  >
                    <span className={`h-2.5 w-2.5 rounded-full ${statusConfig[d.status].dot}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Advisory card */}
        <div className={`card p-6 border-l-4 ${
          block.suggestedAction === 'warning' ? 'border-l-red-400 bg-red-50/40' : 'border-l-leaf-400 bg-leaf-50/40'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`h-11 w-11 rounded-xl grid place-items-center shrink-0 ${
              block.suggestedAction === 'warning' ? 'bg-red-100 text-red-600' : 'bg-leaf-200/60 text-leaf-700'
            }`}>
              <Sprout className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-display font-semibold text-brand-800">
                  {block.suggestedAction === 'warning' ? 'Warning' : 'Advisory'}
                </h3>
                <span className="chip bg-white text-brand-500 text-[10px]">Crop: {block.majorCrops[0]}</span>
              </div>
              <p className="text-sm text-brand-600 leading-relaxed">{block.suggestedMessage}</p>
            </div>
          </div>
        </div>

        {/* Recent notifications */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-display font-semibold text-brand-800">Recent Advisories</h3>
            <Link to="/farmer/advisories" className="text-xs text-brand-500 hover:text-brand-700 flex items-center gap-0.5">
              View all <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-2.5">
            {myAdvisories.length === 0 && (
              <div className="card p-5 text-center text-sm text-brand-400">
                No advisories for your block yet.
              </div>
            )}
            {myAdvisories.slice(0, 2).map((a) => (
              <button
                key={a.id}
                onClick={() => markRead(a.id)}
                className={`card p-4 w-full text-left flex items-start gap-3 hover:shadow-card transition ${!a.read ? 'border-l-4 border-l-brand-500' : ''}`}
              >
                <div className={`h-9 w-9 rounded-lg grid place-items-center shrink-0 ${
                  a.type === 'Warning' ? 'bg-red-100 text-red-600' : 'bg-leaf-200/60 text-leaf-700'
                }`}>
                  <Bell className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-sm text-brand-800 truncate">{a.title}</p>
                    {!a.read && <span className="h-2 w-2 rounded-full bg-brand-500 shrink-0" />}
                  </div>
                  <p className="text-xs text-brand-400 mt-0.5">{a.date} · {a.blockName}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </main>

      <FarmerMobileNav />
    </div>
  );
}
