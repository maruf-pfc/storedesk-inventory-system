import { NavLink } from "react-router-dom";

interface SidebarProps {
  onLogout: () => void;
}

const navigationItems = [
  {
    label: "Dashboard",
    path: "/",
  },
  {
    label: "Categories",
    path: "/categories",
  },
  {
    label: "Items",
    path: "/items",
  },
  {
    label: "Transactions",
    path: "/transactions",
  },
];

export default function Sidebar({ onLogout }: SidebarProps) {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-800 bg-slate-900">
      <div className="border-b border-slate-800 px-6 py-5">
        <h1 className="text-xl font-semibold tracking-tight text-white">
          StoreDesk
        </h1>

        <p className="mt-1 text-sm text-slate-400">Inventory Management</p>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `
                rounded-lg px-4 py-2.5 text-sm font-medium transition-colors
                ${
                  isActive
                    ? "bg-slate-800 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }
                `
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-3">
        <button
          onClick={onLogout}
          className="
            w-full rounded-lg px-4 py-2.5
            text-left text-sm font-medium
            text-slate-300
            transition-colors
            hover:bg-slate-800
            hover:text-white
            cursor-pointer
          "
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
