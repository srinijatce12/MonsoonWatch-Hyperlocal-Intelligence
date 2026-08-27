import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CloudRain, Droplets, TrendingDown, Sprout, AlertTriangle, FileText, CalendarDays } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { OfficerSidebar, OfficerMobileNav, OfficerTopbar } from '@/components/OfficerSidebar';
import { StatusBadge } from '@/components/StatusBadge';
import { BLOCKS } from '@/data/mockData';
import { useState } from 'react';

const tabs = ['7 Days', '14 Days', '30 Days'] as const;

export function BlockAnalysis() {
  const { blockId } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = useState<(typeof tabs)[number]>('7 Days');
  const block = BLOCKS.find((b) => b.id === blockId) || BLOCKS[0];

  const days = tab === '7 Days' ? 7 : tab === '14 Days' ? 14 : 30;
  const outlook = block.outlook.slice(0, days);
  const deviation = Math.round(((block.expectedRainfall - block.historicalRainfall) / block.historicalRainfall) * 100);

  return (
    <div className="min-h-screen bg-leaf-50/40 flex">
      <OfficerSidebar />
      <div className="flex-1 min-w-0 pb-16 lg:pb-0">
        <OfficerTopbar title={`${block.name} Block`} subtitle="Madurai District · Detailed Analysis" />
        <main className="px-5 lg:px-8 py-6 space-y-6 max-w-7xl">
          <button
            onClick={() => navigate('/officer/blocks')}
            className="flex items-center gap-1.5 text-sm text-brand-500 hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blocks
          </button>

          {/* Status */}
          <div className="card p-5 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <div className={`h-12 w-12 rounded-xl grid place-items-center ${
                block.status === 'attention' ? 'bg-red-100 text-red-600' : block.status === 'moderate' ? 'bg-amber-100 text-amber-600' : 'bg-leaf-200/60 text-leaf-700'
              }`}>
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-display font-bold text-brand-800 text-lg">{block.name}</h2>
                <p className="text-xs text-brand-400">Madurai District</p>
              </div>
            </div>
            <StatusBadge status={block.status} />
          </div>

          {/* Prediction */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-2">
                <CloudRain className="h-4 w-4 text-leaf-500" />
                <p className="text-xs text-brand-400">Onset Probability</p>
              </div>
              <p className="font-display font-bold text-3xl text-brand-700">{block.onset}%</p>
            </div>
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-4 w-4 text-amber-500" />
                <p className="text-xs text-brand-400">Break Probability</p>
              </div>
              <p className="font-display font-bold text-3xl text-amber-600">{block.break}%</p>
            </div>
            <div className="card p-5">
              <p className="text-xs text-brand-400 mb-2">Expected Onset</p>
              <p className="font-display font-semibold text-brand-700 mt-1">{block.expectedOnset}</p>
            </div>
            <div className="card p-5">
              <p className="text-xs text-brand-400 mb-2">Possible Break</p>
              <p className="font-display font-semibold text-brand-700 mt-1">{block.possibleBreak}</p>
            </div>
          </div>

          {/* Outlook tabs */}
          <div className="flex gap-1.5 p-1 bg-white rounded-xl border border-leaf-200 w-fit">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  tab === t ? 'bg-brand-700 text-white' : 'text-brand-500 hover:bg-leaf-50'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <CalendarDays className="h-5 w-5 text-brand-500" />
                <h3 className="font-semibold text-brand-700 text-sm">Probability Outlook ({tab})</h3>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={outlook} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D9EFBD" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#7a245f' }} interval={Math.floor(days / 7)} />
                    <YAxis tick={{ fontSize: 10, fill: '#7a245f' }} domain={[0, 100]} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #D9EFBD', fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Line type="monotone" dataKey="onset" stroke="#B9D175" strokeWidth={2.5} name="Onset %" dot={false} />
                    <Line type="monotone" dataKey="break" stroke="#f59e0b" strokeWidth={2.5} name="Break %" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="card p-5">
              <div className="flex items-center gap-2 mb-4">
                <Droplets className="h-5 w-5 text-leaf-500" />
                <h3 className="font-semibold text-brand-700 text-sm">Rainfall vs Historical</h3>
              </div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={block.rainfallTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#D9EFBD" vertical={false} />
                    <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#7a245f' }} />
                    <YAxis tick={{ fontSize: 10, fill: '#7a245f' }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #D9EFBD', fontSize: 12 }} />
                    <Legend wrapperStyle={{ fontSize: 12 }} />
                    <Bar dataKey="historical" fill="#D9EFBD" name="Historical" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="mm" fill="#B9D175" name="Expected" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Rainfall summary */}
          <div className="card p-5">
            <h3 className="font-semibold text-brand-700 text-sm mb-4">Rainfall Summary</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-leaf-50">
                <p className="text-xs text-brand-400">Expected Rainfall</p>
                <p className="font-display font-bold text-2xl text-brand-700">{block.expectedRainfall} mm</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-leaf-50">
                <p className="text-xs text-brand-400">Historical Average</p>
                <p className="font-display font-bold text-2xl text-brand-600">{block.historicalRainfall} mm</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-amber-50">
                <p className="text-xs text-brand-400">Deviation</p>
                <p className={`font-display font-bold text-2xl flex items-center justify-center gap-1 ${deviation < 0 ? 'text-amber-600' : 'text-leaf-600'}`}>
                  <TrendingDown className="h-5 w-5" />{deviation}%
                </p>
              </div>
            </div>
          </div>

          {/* Agricultural Impact */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Sprout className="h-5 w-5 text-leaf-500" />
              <h3 className="font-semibold text-brand-700 text-sm">Agricultural Impact</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-brand-400 mb-2">Major Crops</p>
                <div className="flex flex-wrap gap-2">
                  {block.majorCrops.map((c) => (
                    <span key={c} className="chip bg-leaf-200/60 text-leaf-700"><Sprout className="h-3 w-3" /> {c}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-brand-400 mb-2">Potential Concern</p>
                <p className="text-sm text-brand-700 bg-amber-50 rounded-lg p-3">{block.concern}</p>
              </div>
            </div>
          </div>

          {/* System suggested action */}
          <div className={`card p-5 border-l-4 ${block.suggestedAction === 'warning' ? 'border-l-red-400' : 'border-l-leaf-400'}`}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div className={`h-10 w-10 rounded-xl grid place-items-center shrink-0 ${
                  block.suggestedAction === 'warning' ? 'bg-red-100 text-red-600' : 'bg-leaf-200/60 text-leaf-700'
                }`}>
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide">System Suggestion</p>
                  <p className="font-semibold text-brand-800 mt-1">
                    {block.suggestedAction === 'warning' ? 'Warning recommended' : 'Advisory recommended'}
                  </p>
                  <p className="text-sm text-brand-600 mt-1.5 leading-relaxed">{block.suggestedMessage}</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/officer/advisories')}
                className="btn-primary shrink-0"
              >
                <FileText className="h-4 w-4" />
                Review Advisory
              </button>
            </div>
          </div>
        </main>
      </div>
      <OfficerMobileNav />
    </div>
  );
}
