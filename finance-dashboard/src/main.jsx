import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <FinanceProvider>
      <App />
    </FinanceProvider>
  </BrowserRouter>
);
