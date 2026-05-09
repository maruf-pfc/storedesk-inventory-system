import { useQuery } from "@tanstack/react-query";
import DataTable from "../ui/DataTable";
import EmptyState from "../ui/EmptyState";
import StatusBadge from "../ui/StatusBadge";
import Skeleton from "../ui/Skeleton";
import { getLowStockItems } from "../../services/dashboardService";
import type { LowStockItem } from "../../types/dashboard";

export default function LowStockTable() {
  const { data, isLoading, isError } = useQuery<LowStockItem[]>({
    queryKey: ["low-stock-items"],

    queryFn: getLowStockItems,
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
        title="Failed to load low stock items"
        description="Unable to fetch inventory alerts."
      />
    );
  }

  if (data.length === 0) {
    return (
      <EmptyState
        title="No low stock items"
        description="Inventory levels are healthy."
      />
    );
  }

  return (
    <DataTable headers={["Item", "Category", "Quantity", "Status"]}>
      {data.map((item) => (
        <tr key={item.id} className="hover:bg-slate-50">
          <td className="px-6 py-4 text-sm font-medium text-slate-900">
            {item.name}
          </td>

          <td className="px-6 py-4 text-sm text-slate-600">
            {item.categoryName}
          </td>

          <td className="px-6 py-4 text-sm text-slate-600">{item.quantity}</td>

          <td className="px-6 py-4">
            <StatusBadge status="warning">Low Stock</StatusBadge>
          </td>
        </tr>
      ))}
    </DataTable>
  );
}
