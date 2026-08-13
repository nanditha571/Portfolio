import { createContext, useContext, useState, useEffect } from 'react';
import type { Portfolio } from '@/types/portfolio';
import { loadPortfolio, savePortfolio, samplePortfolio } from '@/data/samplePortfolio';

export interface PortfolioContextType {
  data: Portfolio;
  updateData: (updates: Partial<Portfolio>) => void;
  resetData: () => void;
}

export const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Portfolio>(() => loadPortfolio() || samplePortfolio);

  useEffect(() => {
    savePortfolio(data);
  }, [data]);

  const updateData = (updates: Partial<Portfolio>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const resetData = () => {
    setData(samplePortfolio);
  };

  return (
    <PortfolioContext.Provider value={{ data, updateData, resetData }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioContext() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolioContext must be used within PortfolioProvider');
  return ctx;
}
