import { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import { FarmerHeader, FarmerMobileNav } from '@/components/FarmerHeader';
import { BlockMap } from '@/components/BlockMap';
import { StatusBadge } from '@/components/StatusBadge';
import { BLOCKS } from '@/data/mockData';

export function FarmerMap() {
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const selected = BLOCKS.find((b) => b.id === selectedId);

  return (
    <div className="min-h-screen bg-leaf-50/40 pb-20 md:pb-0">
      <FarmerHeader />
      <main className="max-w-3xl mx-auto px-4 lg:px-6 py-6 space-y-5">
        <div>
          <h1 className="font-display font-bold text-brand-800 text-xl">Local Map</h1>
          <p className="text-sm text-brand-400">Madurai District · Block-wise monsoon outlook</p>
        </div>

        <BlockMap selectedId={selectedId} onSelect={setSelectedId} />

        {/* Block list */}
        <div className="grid sm:grid-cols-2 gap-3">
          {BLOCKS.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedId(b.id)}
              className={`card p-4 text-left flex items-center justify-between hover:shadow-card transition ${
                selectedId === b.id ? 'border-brand-500' : ''
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-lg bg-leaf-100 grid place-items-center">
                  <MapPin className="h-4 w-4 text-leaf-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-brand-800">{b.name}</p>
                  <p className="text-xs text-brand-400">Onset {b.onset}% · Break {b.break}%</p>
                </div>
              </div>
              <StatusBadge status={b.status} size="sm" />
            </button>
          ))}
        </div>
      </main>

      {/* Detail panel */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="absolute inset-0 bg-brand-900/40 backdrop-blur-sm" onClick={() => setSelectedId(undefined)} />
          <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-card border border-leaf-200 animate-fadeIn p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-leaf-500" />
                <h3 className="font-display font-bold text-brand-800">{selected.name}</h3>
              </div>
              <button onClick={() => setSelectedId(undefined)} className="p-1.5 rounded-lg text-brand-400 hover:bg-leaf-50">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="p-3 rounded-xl bg-leaf-50">
                <p className="text-xs text-brand-400">Onset Probability</p>
                <p className="font-display font-bold text-2xl text-brand-700">{selected.onset}%</p>
              </div>
              <div className="p-3 rounded-xl bg-amber-50">
                <p className="text-xs text-brand-400">Break Probability</p>
                <p className="font-display font-bold text-2xl text-amber-600">{selected.break}%</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-brand-400">Expected Onset</span><span className="font-medium text-brand-700">{selected.expectedOnset}</span></div>
              <div className="flex justify-between"><span className="text-brand-400">Possible Break</span><span className="font-medium text-brand-700">{selected.possibleBreak}</span></div>
              <div className="flex justify-between items-center"><span className="text-brand-400">Status</span><StatusBadge status={selected.status} size="sm" /></div>
            </div>
            <p className="mt-4 text-xs text-brand-500 bg-leaf-50 rounded-lg p-3">{selected.concern}</p>
          </div>
        </div>
      )}

      <FarmerMobileNav />
    </div>
  );
}
