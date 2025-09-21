import React, {createContext, ReactNode, useContext} from 'react';

interface PanelContextType {
  openPanel: () => void;
}

const PanelContext = createContext<PanelContextType | undefined>(undefined);

export const PanelProvider = ({
  children,
  openPanel,
}: {
  children: ReactNode;
  openPanel: () => void;
}) => {
  return (
    <PanelContext.Provider value={{openPanel}}>
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
