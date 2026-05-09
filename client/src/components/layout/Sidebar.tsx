import { NavLink } from "react-router-dom";

import { navigationItems } from "../../config/navigation";

export default function Sidebar() {
  return (
    <aside
      className="
        hidden w-64 flex-col border-r
        border-slate-800 bg-slate-900
        lg:flex
      "
    >
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
                rounded-lg px-4 py-2.5
                text-sm font-medium
                transition-colors
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
    </aside>
  );
}
