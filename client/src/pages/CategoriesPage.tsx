import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import Skeleton from "../components/ui/Skeleton";
import CategoriesTable from "../components/categories/CategoriesTable";
import CategoryModal from "../components/categories/CategoryModal";
import DeleteCategoryModal from "../components/categories/DeleteCategoryModal";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../services/categoryService";
import type { Category, CreateCategoryPayload } from "../types/category";

export default function CategoriesPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["categories"],

    queryFn: getCategories,
  });

  const filteredCategories = useMemo(() => {
    return categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categories, search]);

  const createMutation = useMutation({
    mutationFn: createCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      setModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;

      payload: CreateCategoryPayload;
    }) => updateCategory(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      setModalOpen(false);

      setSelectedCategory(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });

      setDeleteOpen(false);

      setSelectedCategory(null);
    },
  });

  function handleCreate() {
    setSelectedCategory(null);

    setModalOpen(true);
  }

  function handleEdit(category: Category) {
    setSelectedCategory(category);

    setModalOpen(true);
  }

  function handleDelete(category: Category) {
    setSelectedCategory(category);

    setDeleteOpen(true);
  }

  function handleSubmit(payload: CreateCategoryPayload) {
    if (selectedCategory) {
      updateMutation.mutate({
        id: selectedCategory.id,
        payload,
      });

      return;
    }

    createMutation.mutate(payload);
  }

  function confirmDelete() {
    if (!selectedCategory) {
      return;
    }

    deleteMutation.mutate(selectedCategory.id);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Categories
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage inventory categories
          </p>
        </div>

        <Button onClick={handleCreate}>Create Category</Button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5">
          <Input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search categories..."
          />
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {Array.from({
              length: 5,
            }).map((_, index) => (
              <Skeleton key={index} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <CategoriesTable
            categories={filteredCategories}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>

      <CategoryModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
        loading={createMutation.isPending || updateMutation.isPending}
        category={selectedCategory}
      />

      <DeleteCategoryModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
        loading={deleteMutation.isPending}
      />
    </div>
  );
}
