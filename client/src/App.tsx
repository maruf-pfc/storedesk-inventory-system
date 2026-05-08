import Container from "./components/layout/Container";
import Section from "./components/layout/Section";

import Badge from "./components/ui/Badge";
import Button from "./components/ui/Button";
import Card from "./components/ui/Card";
import Input from "./components/ui/Input";
import Label from "./components/ui/Label";
import Select from "./components/ui/Select";
import Table from "./components/ui/Table";
import Textarea from "./components/ui/Textarea";
import Title from "./components/ui/Title";

export default function App() {
  return (
    <main className="min-h-screen bg-slate-50 py-10 text-slate-900">
      <Container>
        <Title
          title="StoreDesk"
          subtitle="Inventory Management System UI Preview"
          action={<Button>Add Product</Button>}
        />

        <Section>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="p-6">
              <p className="text-sm text-slate-600">Total Products</p>

              <h2 className="mt-2 text-3xl font-bold">1,240</h2>
            </Card>

            <Card className="p-6">
              <p className="text-sm text-slate-600">Low Stock</p>

              <h2 className="mt-2 text-3xl font-bold text-amber-600">18</h2>
            </Card>

            <Card className="p-6">
              <p className="text-sm text-slate-600">Out of Stock</p>

              <h2 className="mt-2 text-3xl font-bold text-red-600">5</h2>
            </Card>
          </div>
        </Section>

        <Section>
          <Card className="p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label>Product Name</Label>

                <Input placeholder="Enter product name" />
              </div>

              <div>
                <Label>Category</Label>

                <Select>
                  <option>Electronics</option>

                  <option>Accessories</option>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label>Description</Label>

                <Textarea placeholder="Write product details..." />
              </div>

              <div className="flex gap-3">
                <Button>Save Product</Button>

                <Button variant="secondary">Cancel</Button>
              </div>
            </div>
          </Card>
        </Section>

        <Section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Inventory Table</h2>

            <Badge>Active</Badge>
          </div>

          <Table headers={["Product", "Category", "Stock", "Status"]} />
        </Section>
      </Container>
    </main>
  );
}
