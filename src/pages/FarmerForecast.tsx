import { useState } from 'react';
import { CloudRain, Droplets, CalendarDays, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { FarmerHeader, FarmerMobileNav } from '@/components/FarmerHeader';
import { StatusBadge } from '@/components/StatusBadge';
import { BLOCKS } from '@/data/mockData';

const tabs = ['7 Days', '14 Days', '30 Days'] as const;

export function FarmerForecast() {
  const [tab, setTab] = useState<(typeof tabs)[number]>('7 Days');
  const [blockId] = useState('thirupparankundram');
  const block = BLOCKS.find((b) => b.id === blockId)!;

  const days = tab === '7 Days' ? 7 : tab === '14 Days' ? 14 : 30;
  const outlook = block.outlook.slice(0, days);

  return (
    <div className="min-h-screen bg-leaf-50/40 pb-20 md:pb-0">
      <FarmerHeader />
      <main className="max-w-3xl mx-auto px-4 lg:px-6 py-6 space-y-6">
        <div>
          <h1 className="font-display font-bold text-brand-800 text-xl">Forecast</h1>
          <p className="text-sm text-brand-400">{block.name} Block · Madurai District</p>
        </div>

        {/* Tabs */}
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

        {/* Probability cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <CloudRain className="h-5 w-5 text-leaf-500" />
              <h3 className="font-semibold text-brand-700 text-sm">Monsoon Onset</h3>
            </div>
            <p className="font-display font-bold text-4xl text-brand-700">{block.onset}%</p>
            <p className="text-xs text-brand-400 mt-1">Expected: {block.expectedOnset}</p>
            <div className="mt-3 h-2 rounded-full bg-leaf-100 overflow-hidden">
              <div className="h-full bg-leaf-400 rounded-full" style={{ width: `${block.onset}%` }} />
            </div>
          </div>
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <Droplets className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold text-brand-700 text-sm">Monsoon Break</h3>
            </div>
            <p className="font-display font-bold text-4xl text-amber-600">{block.break}%</p>
            <p className="text-xs text-brand-400 mt-1">Possible: {block.possibleBreak}</p>
            <div className="mt-3 h-2 rounded-full bg-amber-100 overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: `${block.break}%` }} />
            </div>
          </div>
        </div>

        {/* Probability chart */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <CalendarDays className="h-5 w-5 text-brand-500" />
            <h3 className="font-semibold text-brand-700 text-sm">Probability Over Time</h3>
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

        {/* Rainfall outlook */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Droplets className="h-5 w-5 text-leaf-500" />
            <h3 className="font-semibold text-brand-700 text-sm">Rainfall Outlook</h3>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-3 rounded-xl bg-leaf-50">
              <p className="text-xs text-brand-400">Expected</p>
              <p className="font-display font-bold text-xl text-brand-700">{block.expectedRainfall}mm</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-leaf-50">
              <p className="text-xs text-brand-400">Normal</p>
              <p className="font-display font-bold text-xl text-brand-600">{block.historicalRainfall}mm</p>
            </div>
            <div className="text-center p-3 rounded-xl bg-amber-50">
              <p className="text-xs text-brand-400">Deviation</p>
              <p className={`font-display font-bold text-xl flex items-center justify-center gap-0.5 ${block.expectedRainfall < block.historicalRainfall ? 'text-amber-600' : 'text-leaf-600'}`}>
                <TrendingDown className="h-4 w-4" />
                {Math.round(((block.expectedRainfall - block.historicalRainfall) / block.historicalRainfall) * 100)}%
              </p>
            </div>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={block.rainfallTrend} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#D9EFBD" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#7a245f' }} />
                <YAxis tick={{ fontSize: 10, fill: '#7a245f' }} />
                <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #D9EFBD', fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="historical" fill="#D9EFBD" name="Normal" radius={[4, 4, 0, 0]} />
                <Bar dataKey="mm" fill="#B9D175" name="Expected" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-4 flex items-center gap-3 bg-leaf-50/60">
          <StatusBadge status={block.status} />
          <p className="text-xs text-brand-500">{block.concern}</p>
        </div>
      </main>
      <FarmerMobileNav />
    </div>
  );
}
