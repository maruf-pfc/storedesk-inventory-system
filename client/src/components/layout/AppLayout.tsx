import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAuthStore } from "../../store/authStore";

export default function AppLayout() {
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  function handleLogout() {
    logout();

    navigate("/login");
  }

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar onLogout={handleLogout} />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
