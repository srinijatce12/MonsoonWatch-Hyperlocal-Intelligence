import { CloudRain } from 'lucide-react';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid place-items-center h-9 w-9 rounded-xl bg-brand-700 text-white shadow-soft">
        <CloudRain className="h-5 w-5" />
      </div>
      {!compact && (
        <div className="leading-none">
          <p className="font-display font-bold text-brand-700 text-lg tracking-tight">MonsoonWatch</p>
          <p className="text-[10px] text-brand-400 font-medium tracking-wide uppercase">Hyperlocal Intelligence</p>
        </div>
      )}
    </div>
  );
}
