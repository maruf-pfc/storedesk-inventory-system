import { BrowserRouter, Route, Routes } from "react-router-dom";

import AppLayout from "./components/layout/AppLayout";

import DashboardPage from "./pages/DashboardPage";
import CategoriesPage from "./pages/CategoriesPage";
import ItemsPage from "./pages/ItemsPage";
import TransactionsPage from "./pages/TransactionsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />

          <Route path="/categories" element={<CategoriesPage />} />

          <Route path="/items" element={<ItemsPage />} />

          <Route path="/transactions" element={<TransactionsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
