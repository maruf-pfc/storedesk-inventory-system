import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Modal from "../ui/Modal";
import Textarea from "../ui/Textarea";
import {
  categorySchema,
  type CategoryFormValues,
} from "../../schemas/categorySchema";
import type { Category } from "../../types/category";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: CategoryFormValues) => void;
  loading?: boolean;
  category?: Category | null;
}

export default function CategoryModal({
  open,
  onClose,
  onSubmit,
  loading = false,
  category,
}: CategoryModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),

    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (category) {
      reset({
        name: category.name,
        description: category.description || "",
      });

      return;
    }

    reset({
      name: "",
      description: "",
    });
  }, [category, reset, open]);

  function handleClose() {
    reset();
    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={category ? "Edit Category" : "Create Category"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <Label>Name</Label>

          <Input placeholder="Enter category name" {...register("name")} />

          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label>Description</Label>

          <Textarea
            placeholder="Optional description"
            {...register("description")}
          />

          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : category ? "Update" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
