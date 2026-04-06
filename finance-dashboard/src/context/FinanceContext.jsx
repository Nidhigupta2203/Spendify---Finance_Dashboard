import { createContext, useContext, useEffect, useState } from "react";

export const FinanceContext = createContext();

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [role, setRole] = useState("admin");

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Add transaction
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <FinanceContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        role,
        setRole,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

// Custom hook
export const useFinance = () => {
  return useContext(FinanceContext);
};
