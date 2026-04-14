import { createContext, useContext, useEffect, useState } from "react";

const FinanceContext = createContext(null);

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [role, setRole] = useState("admin");

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [{ ...transaction, id: Date.now() }, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <FinanceContext.Provider
      value={{ transactions, addTransaction, deleteTransaction, role, setRole }}
    >
      {children}
    </FinanceContext.Provider>
  );
}

export const useFinance = () => useContext(FinanceContext);

