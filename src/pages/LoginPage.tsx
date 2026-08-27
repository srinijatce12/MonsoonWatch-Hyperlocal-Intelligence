import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sprout, ShieldCheck, ArrowLeft, Phone, Lock } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useApp } from '@/context/AppContext';
import type { Role } from '@/data/mockData';

export function LoginPage() {
  const [role, setRole] = useState<Role>('farmer');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setRole: setCtxRole } = useApp();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setCtxRole(role);
    navigate(role === 'farmer' ? '/farmer' : '/officer');
  };

  return (
    <div className="min-h-screen bg-leaf-50/40 flex flex-col">
      <div className="px-5 py-4">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-brand-500 hover:text-brand-700">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-5 pb-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Logo />
            </div>
            <h1 className="font-display font-bold text-brand-800 text-2xl mt-4">Welcome back</h1>
            <p className="text-brand-400 text-sm mt-1">Choose your role to continue</p>
          </div>

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('farmer')}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                role === 'farmer'
                  ? 'border-brand-700 bg-brand-50 shadow-soft'
                  : 'border-leaf-200 bg-white hover:border-leaf-300'
              }`}
            >
              <Sprout className={`h-6 w-6 mb-2 ${role === 'farmer' ? 'text-brand-700' : 'text-leaf-500'}`} />
              <p className="font-semibold text-brand-800 text-sm">Farmer</p>
              <p className="text-xs text-brand-400 mt-0.5">View advisories & forecast</p>
            </button>
            <button
              type="button"
              onClick={() => setRole('officer')}
              className={`p-4 rounded-2xl border-2 text-left transition-all ${
                role === 'officer'
                  ? 'border-brand-700 bg-brand-50 shadow-soft'
                  : 'border-leaf-200 bg-white hover:border-leaf-300'
              }`}
            >
              <ShieldCheck className={`h-6 w-6 mb-2 ${role === 'officer' ? 'text-brand-700' : 'text-leaf-500'}`} />
              <p className="font-semibold text-brand-800 text-sm">Agri Officer</p>
              <p className="text-xs text-brand-400 mt-0.5">Manage blocks & advisories</p>
            </button>
          </div>

          <form onSubmit={submit} className="card p-6 space-y-4">
            <div>
              <label className="text-xs font-semibold text-brand-600 mb-1.5 block">Mobile / Email</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-300" />
                <input
                  className="input pl-10"
                  placeholder="98765 43210 or you@example.com"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-brand-600 mb-1.5 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-300" />
                <input
                  type="password"
                  className="input pl-10"
                  placeholder="Enter any password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <p className="text-xs text-brand-400 bg-leaf-50 rounded-lg px-3 py-2">
              Demo mode: any valid-looking input will proceed.
            </p>
            <button type="submit" className="btn-primary w-full py-3">
              Login as {role === 'farmer' ? 'Farmer' : 'Agricultural Officer'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
