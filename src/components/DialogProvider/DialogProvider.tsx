'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define context type
type DialogContextType = {
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
  toggleDialog: () => void;
};

// Create context with correct type, initially undefined
const DialogProviderContext = createContext<DialogContextType | undefined>(undefined);

// DialogProvider component
function DialogProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => setIsOpen(true);
  const closeDialog = () => setIsOpen(false);
  const toggleDialog = () => setIsOpen(!isOpen);

  return (
    <DialogProviderContext.Provider value={{ isOpen, openDialog, closeDialog, toggleDialog }}>
      {children}
    </DialogProviderContext.Provider>
  );
}

export function useDialog() {
  const context = useContext(DialogProviderContext);
  if (!context) throw new Error('useDialog must be used within a DialogProvider');
  return context;
}

export default DialogProvider;
