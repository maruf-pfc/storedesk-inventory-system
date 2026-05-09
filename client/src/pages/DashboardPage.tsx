import { useQuery } from "@tanstack/react-query";
import EmptyState from "../components/ui/EmptyState";
import Skeleton from "../components/ui/Skeleton";
import StatCard from "../components/ui/StatCard";

import { getDashboardStats } from "../services/dashboardService";

export default function DashboardPage() {
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["dashboard-stats"],

    queryFn: getDashboardStats,
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <Skeleton className="h-8 w-48" />

          <Skeleton className="mt-2 h-4 w-72" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <Skeleton className="h-4 w-24" />

              <Skeleton className="mt-4 h-10 w-20" />

              <Skeleton className="mt-3 h-4 w-32" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !stats) {
    return (
      <EmptyState
        title="Failed to load dashboard"
        description="Something went wrong while loading dashboard statistics."
      />
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
