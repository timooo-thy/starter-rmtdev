import { createContext, useEffect, useState } from "react";

type useActiveIdType = {
  activeId: number | null;
};

export const ActiveIdContext = createContext<useActiveIdType | null>(null);

type useActiveIdProvider = {
  children: React.ReactNode;
};
export function ActiveIdProvider({ children }: useActiveIdProvider) {
  const [activeId, setActiveId] = useState<number | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const id = +window.location.hash.substring(1);
      if (id === 0) return;
      setActiveId(id);
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <ActiveIdContext.Provider value={{ activeId }}>
      {children}
    </ActiveIdContext.Provider>
  );
}
