import { createContext, useContext, useState, ReactNode } from 'react';
import { INITIAL_ADVISORIES, Advisory, Role } from '@/data/mockData';

interface AppContextValue {
  role: Role | null;
  setRole: (r: Role | null) => void;
  selectedBlockId: string;
  setSelectedBlockId: (id: string) => void;
  advisories: Advisory[];
  issueAdvisory: (a: Advisory) => void;
  markRead: (id: string) => void;
  notifications: number;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role | null>(null);
  const [selectedBlockId, setSelectedBlockId] = useState('vadipatti');
  const [advisories, setAdvisories] = useState<Advisory[]>(INITIAL_ADVISORIES);

  const issueAdvisory = (a: Advisory) => {
    setAdvisories((prev) => [
      { ...a, issued: true, read: false },
      ...prev,
    ]);
  };

  const markRead = (id: string) => {
    setAdvisories((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const notifications = advisories.filter((a) => !a.read).length;

  return (
    <AppContext.Provider
      value={{ role, setRole, selectedBlockId, setSelectedBlockId, advisories, issueAdvisory, markRead, notifications }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
