import { useState } from 'react';
import { Bell, CheckCircle2, Info, AlertTriangle, Sprout, MapPin, Calendar } from 'lucide-react';
import { FarmerHeader, FarmerMobileNav } from '@/components/FarmerHeader';
import { useApp } from '@/context/AppContext';
import { tamilTranslations } from '@/data/mockData';

export function FarmerAdvisories() {
  const { advisories, markRead } = useApp();
  const [lang, setLang] = useState<'English' | 'Tamil'>('English');
  const [filter, setFilter] = useState<'All' | 'Advisory' | 'Warning'>('All');

  const filtered = advisories.filter((a) => filter === 'All' || a.type === filter);

  return (
    <div className="min-h-screen bg-leaf-50/40 pb-20 md:pb-0">
      <FarmerHeader />
      <main className="max-w-3xl mx-auto px-4 lg:px-6 py-6 space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="font-display font-bold text-brand-800 text-xl">Advisories & Notifications</h1>
            <p className="text-sm text-brand-400">Official information from the Agricultural Department</p>
          </div>
          <div className="flex gap-1.5 p-1 bg-white rounded-xl border border-leaf-200">
            {(['English', 'Tamil'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  lang === l ? 'bg-brand-700 text-white' : 'text-brand-500'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Filter */}
        <div className="flex gap-2">
          {(['All', 'Advisory', 'Warning'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`chip px-3.5 py-1.5 text-xs font-medium transition ${
                filter === f ? 'bg-brand-700 text-white' : 'bg-white text-brand-500 border border-leaf-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="card p-8 text-center">
              <Bell className="h-8 w-8 text-brand-300 mx-auto mb-2" />
              <p className="text-sm text-brand-400">No {filter.toLowerCase()} notifications.</p>
            </div>
          )}
          {filtered.map((a) => {
            const isWarning = a.type === 'Warning';
            const message = lang === 'Tamil' ? (tamilTranslations[a.message] || a.message) : a.message;
            return (
              <button
                key={a.id}
                onClick={() => markRead(a.id)}
                className={`card p-5 w-full text-left transition hover:shadow-card ${
                  !a.read ? 'border-l-4 border-l-brand-500' : ''
                } ${isWarning ? 'bg-red-50/30' : 'bg-leaf-50/30'}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`h-11 w-11 rounded-xl grid place-items-center shrink-0 ${
                    isWarning ? 'bg-red-100 text-red-600' : 'bg-leaf-200/60 text-leaf-700'
                  }`}>
                    {isWarning ? <AlertTriangle className="h-5 w-5" /> : <Info className="h-5 w-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`chip text-[10px] ${isWarning ? 'bg-red-100 text-red-700' : 'bg-leaf-200/60 text-leaf-700'}`}>
                        {a.type}
                      </span>
                      {!a.read && <span className="h-2 w-2 rounded-full bg-brand-500" />}
                    </div>
                    <h3 className="font-display font-semibold text-brand-800 mt-2">{a.title}</h3>
                    <p className="text-sm text-brand-600 mt-1.5 leading-relaxed">{message}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-3 text-xs text-brand-400">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {a.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {a.blockName}</span>
                      <span className="flex items-center gap-1"><Sprout className="h-3 w-3" /> {a.crop}</span>
                      <span>Issued by: {a.issuedBy}</span>
                    </div>
                  </div>
                  {a.read && <CheckCircle2 className="h-4 w-4 text-leaf-400 shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>
      </main>
      <FarmerMobileNav />
    </div>
  );
}
