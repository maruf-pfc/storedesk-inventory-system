import { useEffect, useState } from "react";
import StatCard from "../components/ui/StatCard";
import { getDashboardStats } from "../services/dashboardService";
import type { DashboardStats } from "../types/dashboard";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  const [loading, setLoading] = useState(true);

  async function loadDashboard() {
    try {
      const data = await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function initializeDashboard() {
      await loadDashboard();
    }

    initializeDashboard();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-sm text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="py-20 text-center">
        <p className="text-sm text-red-600">Failed to load dashboard</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Overview of your inventory system
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard
          title="Total Items"
          value={stats.totalItems}
          description="Available inventory items"
        />

        <StatCard
          title="Categories"
          value={stats.totalCategories}
          description="Inventory categories"
        />

        <StatCard
          title="Low Stock"
          value={stats.lowStockItems}
          description="Items needing attention"
        />

        <StatCard
          title="Active Borrowings"
          value={stats.activeTransactions}
          description="Currently issued items"
        />

        <StatCard
          title="Returned"
          value={stats.returnedTransactions}
          description="Completed returns"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Low Stock Alert
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Items requiring restock soon
            </p>
          </div>

          <div className="rounded-lg border border-dashed border-slate-300 py-10 text-center">
            <p className="text-sm text-slate-500">
              Low stock table coming next
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Recent Transactions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest inventory activities
            </p>
          </div>

          <div className="rounded-lg border border-dashed border-slate-300 py-10 text-center">
            <p className="text-sm text-slate-500">
              Transaction table coming next
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
