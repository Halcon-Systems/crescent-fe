"use client";

import { createContext, useContext, useState } from "react";

const InventoryContext = createContext(null);

export const InventoryProvider = ({ children }) => {
  const [showAddInventory, setShowAddInventory] = useState(false);

  const openAddInventoryForm = () => setShowAddInventory(true);
  const closeAddInventoryForm = () => setShowAddInventory(false);

  return (
    <InventoryContext.Provider
      value={{
        showAddInventory,
        openAddInventoryForm,
        closeAddInventoryForm,
        setShowAddInventory,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventoryContext = () => {
  const context = useContext(InventoryContext);
  if (!context) {
    throw new Error(
      "useInventoryContext must be used within a InventoryProvider"
    );
  }
  return context;
};
