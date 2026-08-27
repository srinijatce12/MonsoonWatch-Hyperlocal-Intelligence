import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Map, Bell, FileText, LogOut, CloudRain } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useApp } from '@/context/AppContext';

const nav = [
  { to: '/officer', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/officer/blocks', label: 'Block Analysis', icon: Map, end: false },
  { to: '/officer/alerts', label: 'Alerts', icon: Bell, end: false },
  { to: '/officer/advisories', label: 'Advisories', icon: FileText, end: false },
];

export function OfficerSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setRole, notifications } = useApp();

  const logout = () => {
    setRole(null);
    navigate('/login');
  };

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-white border-r border-leaf-200/70 h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-leaf-200/70">
        <Logo />
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map((item) => {
          const active = item.end ? pathname === item.to : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? 'bg-brand-700 text-white shadow-soft'
                  : 'text-brand-600 hover:bg-leaf-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
              {item.label === 'Alerts' && notifications > 0 && (
                <span className="ml-auto chip bg-red-500 text-white px-2 py-0.5 text-[10px]">
                  {notifications}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="px-3 py-4 border-t border-leaf-200/70">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="h-9 w-9 rounded-full bg-leaf-200 grid place-items-center text-brand-700 font-semibold text-sm">
            AK
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-brand-800">A. Kumar</p>
            <p className="text-xs text-brand-400">Agri Officer · Madurai</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-brand-500 hover:bg-leaf-50 w-full transition"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}

export function OfficerMobileNav() {
  const { pathname } = useLocation();
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-leaf-200 z-40 flex justify-around py-2">
      {nav.map((item) => {
        const active = item.end ? pathname === item.to : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-[11px] font-medium ${
              active ? 'text-brand-700' : 'text-brand-400'
            }`}
          >
            <Icon className="h-5 w-5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function OfficerTopbar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-leaf-200/70">
      <div className="px-5 lg:px-8 py-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-brand-800 text-lg lg:text-xl">{title}</h1>
          {subtitle && <p className="text-xs text-brand-400 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 text-sm text-brand-500">
            <CloudRain className="h-4 w-4 text-leaf-500" />
            Madurai District
          </div>
          <div className="hidden sm:block text-sm text-brand-400">Aug 27, 2026</div>
        </div>
      </div>
    </header>
  );
}
