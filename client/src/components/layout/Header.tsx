export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">Dashboard</h2>

        <p className="text-sm text-slate-500">Manage your inventory system</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-slate-900">Admin User</p>

          <p className="text-xs text-slate-500">administrator</p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-200 text-sm font-semibold text-slate-700">
          A
        </div>
      </div>
    </header>
  );
}
