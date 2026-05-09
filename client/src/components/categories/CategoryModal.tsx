import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Label from "../ui/Label";
import Modal from "../ui/Modal";
import Textarea from "../ui/Textarea";
import type { Category, CreateCategoryPayload } from "../../types/category";

interface CategoryModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: CreateCategoryPayload) => void;
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
  const [name, setName] = useState(category?.name || "");

  const [description, setDescription] = useState(category?.description || "");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    onSubmit({
      name,
      description,
    });
  }

  function handleClose() {
    setName("");

    setDescription("");

    onClose();
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={category ? "Edit Category" : "Create Category"}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <Label>Name</Label>

          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter category name"
          />
        </div>

        <div>
          <Label>Description</Label>

          <Textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Optional description"
          />
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
