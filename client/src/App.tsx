import Button from "./components/ui/Button";

export default function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="rounded-xl border border-slate-200 bg-white p-10 shadow-sm">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">StoreDesk</h1>

        <p className="mb-6 text-slate-600">Inventory Management System</p>

        <Button>Test Button</Button>
      </div>
    </main>
  );
}
