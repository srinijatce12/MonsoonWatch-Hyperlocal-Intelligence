import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { AppProvider, useApp } from '@/context/AppContext';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { FarmerHome } from '@/pages/FarmerHome';
import { FarmerForecast } from '@/pages/FarmerForecast';
import { FarmerMap } from '@/pages/FarmerMap';
import { FarmerAdvisories } from '@/pages/FarmerAdvisories';
import { OfficerDashboard } from '@/pages/OfficerDashboard';
import { BlockList } from '@/pages/BlockList';
import { BlockAnalysis } from '@/pages/BlockAnalysis';
import { OfficerAlerts } from '@/pages/OfficerAlerts';
import { AdvisoryManagement } from '@/pages/AdvisoryManagement';
import type { Role } from '@/data/mockData';

function Protected({ role, children }: { role: Role; children: React.ReactNode }) {
  const { role: current } = useApp();
  if (current !== role) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/farmer" element={<Protected role="farmer"><FarmerHome /></Protected>} />
      <Route path="/farmer/forecast" element={<Protected role="farmer"><FarmerForecast /></Protected>} />
      <Route path="/farmer/map" element={<Protected role="farmer"><FarmerMap /></Protected>} />
      <Route path="/farmer/advisories" element={<Protected role="farmer"><FarmerAdvisories /></Protected>} />
      <Route path="/officer" element={<Protected role="officer"><OfficerDashboard /></Protected>} />
      <Route path="/officer/blocks" element={<Protected role="officer"><BlockList /></Protected>} />
      <Route path="/officer/blocks/:blockId" element={<Protected role="officer"><BlockAnalysis /></Protected>} />
      <Route path="/officer/alerts" element={<Protected role="officer"><OfficerAlerts /></Protected>} />
      <Route path="/officer/advisories" element={<Protected role="officer"><AdvisoryManagement /></Protected>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
