import { createContext, useContext, useState } from 'react';
import type React from 'react';

interface PageTitleContextValue {
  override: string | null;
  setOverride: (title: string | null) => void;
}

const PageTitleContext = createContext<PageTitleContextValue>({
  override: null,
  setOverride: () => undefined,
});

export const PageTitleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [override, setOverride] = useState<string | null>(null);
  return (
    <PageTitleContext.Provider value={{ override, setOverride }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitle = () => useContext(PageTitleContext);
