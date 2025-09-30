import React, {createContext, ReactNode, useContext} from 'react';

interface PanelContextType {
  togglePanel: () => void;
  isOpen: boolean;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export const PanelProvider = ({
  children,
  togglePanel,
  isOpen,
}: {
  children: ReactNode;
  togglePanel: () => void;
  isOpen: boolean;
}) => {
  return (
    <PanelContext.Provider value={{togglePanel, isOpen}}>
      {children}
    </PanelContext.Provider>
  );
};

export const usePanel = () => {
  const context = useContext(PanelContext);
  if (context === undefined) {
    throw new Error('usePanel must be used within a PanelProvider');
  }
  return context;
};
