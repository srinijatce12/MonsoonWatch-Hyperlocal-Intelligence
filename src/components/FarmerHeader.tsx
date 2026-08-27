import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, CloudRain, Map, Bell, LogOut, Menu } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useApp } from '@/context/AppContext';
import { useState } from 'react';

const nav = [
  { to: '/farmer', label: 'Home', icon: Home, end: true },
  { to: '/farmer/forecast', label: 'Forecast', icon: CloudRain, end: false },
  { to: '/farmer/map', label: 'Local Map', icon: Map, end: false },
  { to: '/farmer/advisories', label: 'Advisories', icon: Bell, end: false },
];

export function FarmerHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { setRole, notifications } = useApp();
  const [open, setOpen] = useState(false);

  const logout = () => {
    setRole(null);
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-leaf-200/70">
      <div className="px-4 lg:px-6 py-3 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((item) => {
            const active = item.end ? pathname === item.to : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition ${
                  active ? 'bg-brand-700 text-white' : 'text-brand-600 hover:bg-leaf-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
                {item.label === 'Advisories' && notifications > 0 && (
                  <span className="ml-1 chip bg-red-500 text-white px-1.5 py-0.5 text-[10px]">
                    {notifications}
                  </span>
                )}
              </Link>
            );
          })}
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium text-brand-500 hover:bg-leaf-50 ml-1"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </nav>
        <button className="md:hidden p-2 rounded-lg text-brand-600" onClick={() => setOpen(!open)}>
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-leaf-200/70 bg-white px-4 py-3 space-y-1 animate-fadeIn">
          {nav.map((item) => {
            const active = item.end ? pathname === item.to : pathname.startsWith(item.to);
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                  active ? 'bg-brand-700 text-white' : 'text-brand-600 hover:bg-leaf-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-brand-500 hover:bg-leaf-50 w-full"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export function FarmerMobileNav() {
  const { pathname } = useLocation();
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-leaf-200 z-40 flex justify-around py-2">
      {nav.map((item) => {
        const active = item.end ? pathname === item.to : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] font-medium ${
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
