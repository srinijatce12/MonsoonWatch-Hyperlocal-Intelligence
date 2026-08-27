import { Link } from 'react-router-dom';
import { CloudRain, MapPin, Sprout, Bell, ArrowRight, TrendingUp, ShieldCheck, CalendarDays } from 'lucide-react';
import { Logo } from '@/components/Logo';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-leaf-50/40">
      {/* Nav */}
      <header className="sticky top-0 z-30 bg-leaf-50/70 backdrop-blur-md border-b border-leaf-200/60">
        <div className="max-w-6xl mx-auto px-5 lg:px-8 py-4 flex items-center justify-between">
          <Logo />
          <Link to="/login" className="btn-ghost text-sm">
            Login
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-5 lg:px-8 pt-12 lg:pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fadeIn">
            <span className="chip bg-leaf-200/60 text-leaf-700 mb-5">
              <Sprout className="h-3.5 w-3.5" />
              Built for Indian Agriculture
            </span>
            <h1 className="font-display font-bold text-brand-800 text-4xl lg:text-5xl leading-[1.1] tracking-tight">
              Hyperlocal Monsoon Intelligence for{' '}
              <span className="text-leaf-600">Smarter Farming</span>
            </h1>
            <p className="mt-5 text-brand-500 text-lg leading-relaxed max-w-md">
              Predict local monsoon patterns. Prepare better. Protect crops.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/login" className="btn-primary text-base px-6 py-3">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="#how" className="btn-ghost text-base px-6 py-3">
                How it works
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-6">
              {[
                { icon: CalendarDays, label: '7–30 Day Outlook' },
                { icon: MapPin, label: 'Block-Level Predictions' },
                { icon: Sprout, label: 'Crop-Specific Advisories' },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2 text-sm text-brand-600">
                  <f.icon className="h-4 w-4 text-leaf-500" />
                  <span className="font-medium">{f.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual flow card */}
          <div className="relative animate-scaleIn">
            <div className="card p-6 lg:p-8 bg-gradient-to-br from-white to-leaf-50">
              <p className="text-xs font-semibold text-brand-400 uppercase tracking-wide mb-5">
                Prediction Workflow
              </p>
              <div className="space-y-3">
                {[
                  { icon: CloudRain, title: 'Weather & Climate Data', desc: 'Satellite + station inputs', color: 'bg-leaf-200/60 text-leaf-700' },
                  { icon: TrendingUp, title: 'Prediction', desc: 'ML-based onset & break probability', color: 'bg-brand-100 text-brand-700' },
                  { icon: ShieldCheck, title: 'Local Risk', desc: 'Block-level risk assessment', color: 'bg-amber-100 text-amber-700' },
                  { icon: Sprout, title: 'Agricultural Action', desc: 'Officer-approved advisories to farmers', color: 'bg-leaf-200/60 text-leaf-700' },
                ].map((step, i) => (
                  <div key={step.title} className="flex items-center gap-3">
                    <div className={`h-11 w-11 rounded-xl ${step.color} grid place-items-center shrink-0`}>
                      <step.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-brand-800">{step.title}</p>
                      <p className="text-xs text-brand-400">{step.desc}</p>
                    </div>
                    {i < 3 && <div className="hidden lg:block absolute" />}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-leaf-200/70 flex items-center gap-3 text-xs text-brand-400">
                <Bell className="h-4 w-4 text-leaf-500" />
                Farmers receive simple, action-oriented advisories — not raw data.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-white border-y border-leaf-200/60 py-16">
        <div className="max-w-6xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display font-bold text-brand-800 text-3xl">Predict. Monitor. Decide. Advise.</h2>
            <p className="mt-3 text-brand-500 max-w-xl mx-auto">
              A decision-support system that turns monsoon predictions into clear farming action.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { n: '01', title: 'Predict', desc: 'ML model estimates onset & break probability for each block.', icon: TrendingUp },
              { n: '02', title: 'Monitor', desc: 'Officers monitor district-wide risk on a live block map.', icon: MapPin },
              { n: '03', title: 'Decide', desc: 'System suggests action; officer reviews and approves.', icon: ShieldCheck },
              { n: '04', title: 'Advise', desc: 'Farmers receive simple advisories and warnings.', icon: Bell },
            ].map((s) => (
              <div key={s.n} className="card p-6 hover:shadow-card transition-all hover:-translate-y-0.5">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-10 w-10 rounded-xl bg-brand-700 text-white grid place-items-center">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <span className="font-display font-bold text-2xl text-leaf-200">{s.n}</span>
                </div>
                <h3 className="font-display font-semibold text-brand-800 text-lg">{s.title}</h3>
                <p className="mt-1.5 text-sm text-brand-500 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-5 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-brand-400">
          <Logo />
          <p>MonsoonWatch · Hyperlocal Monsoon Intelligence for Smarter Farming</p>
        </div>
      </footer>
    </div>
  );
}
