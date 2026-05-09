import { useQuery } from "@tanstack/react-query";
import Skeleton from "../components/ui/Skeleton";
import { getItems } from "../services/itemService";
import StockBadge from "../components/items/StockBadge";

export default function ItemsPage() {
  const { data: items = [], isLoading } = useQuery({
    queryKey: ["items"],

    queryFn: getItems,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Items
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage inventory items and stock
        </p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        {isLoading ? (
          <div className="space-y-3 p-5">
            {Array.from({
              length: 5,
            }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Item
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Category
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Price
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Quantity
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 bg-white">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        {item.name}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {item.categoryName}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    ${item.price.toFixed(2)}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {item.quantity}
                  </td>

                  <td className="px-6 py-4">
                    <StockBadge quantity={item.quantity} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
