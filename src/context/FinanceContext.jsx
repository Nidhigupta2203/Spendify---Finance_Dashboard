import { createContext, useContext, useEffect, useState } from "react";

const FinanceContext = createContext(null);

const defaultTransactions = [
  { id: 1, title: "Software Engineer Salary", amount: 85000, category: "Salary", type: "income", date: "2024-04-10" },
  { id: 2, title: "Office Rent", amount: 25000, category: "Housing", type: "expense", date: "2024-04-11" },
  { id: 3, title: "Client Project Freelance", amount: 15000, category: "Salary", type: "income", date: "2024-04-12" },
  { id: 4, title: "Team Lunch", amount: 3500, category: "Food", type: "expense", date: "2024-04-13" },
  { id: 5, title: "Internet Bill", amount: 1200, category: "Utilities", type: "expense", date: "2024-04-14" },
];

export function FinanceProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    return defaultTransactions;
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

