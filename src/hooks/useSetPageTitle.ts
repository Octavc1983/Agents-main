import { useEffect } from 'react';
import { usePageTitle } from '../providers/PageTitleContext';

export const useSetPageTitle = (title: string) => {
  const { setOverride } = usePageTitle();
  useEffect(() => {
    setOverride(title);
    return () => setOverride(null);
  }, [title, setOverride]);
};
