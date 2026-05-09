import { useQuery } from "@tanstack/react-query";
import DataTable from "../ui/DataTable";
import EmptyState from "../ui/EmptyState";
import Skeleton from "../ui/Skeleton";
import StatusBadge from "../ui/StatusBadge";
import { getRecentTransactions } from "../../services/dashboardService";
import type { RecentTransaction } from "../../types/dashboard";

export default function RecentTransactionsTable() {
  const { data, isLoading, isError } = useQuery<RecentTransaction[]>({
    queryKey: ["recent-transactions"],

    queryFn: getRecentTransactions,
  });

  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (isError || !data) {
    return (
      <EmptyState
        title="Failed to load transactions"
        description="Unable to fetch recent activity."
      />
    );
  }

  if (data.length === 0) {
    return (
      <EmptyState
        title="No transactions found"
        description="No inventory activity yet."
      />
    );
  }

  return (
    <DataTable headers={["Item", "Borrower", "Quantity", "Status"]}>
      {data.map((transaction) => (
        <tr key={transaction.id} className="hover:bg-slate-50">
          <td className="px-6 py-4 text-sm font-medium text-slate-900">
            {transaction.itemName}
          </td>

          <td className="px-6 py-4 text-sm text-slate-600">
            {transaction.borrowerName}
          </td>

          <td className="px-6 py-4 text-sm text-slate-600">
            {transaction.quantity}
          </td>

          <td className="px-6 py-4">
            <StatusBadge
              status={transaction.isReturned ? "success" : "warning"}
            >
              {transaction.isReturned ? "Returned" : "Borrowed"}
            </StatusBadge>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
