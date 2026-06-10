// app/docs/products/page.tsx
import { DocsPageHeader, EndpointCard, SectionTitle, OnThisPage } from "@/components/docs/DocsComponents";
import type { Endpoint } from "@/components/docs/DocsComponents";

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET",
    path: "/products",
    description: "Get all products",
    params: [
      { name: "limit",  type: "number", required: false, description: "Items per page (default: 30, max: 100)" },
      { name: "skip",   type: "number", required: false, description: "Items to skip for pagination" },
      { name: "select", type: "string", required: false, description: "Comma-separated fields: id,title,price" },
      { name: "sortBy", type: "string", required: false, description: "Field to sort by: price, title, rating" },
      { name: "order",  type: "string", required: false, description: "Sort direction: asc or desc" },
      { name: "delay",  type: "number", required: false, description: "Simulate latency in milliseconds" },
    ],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/products?limit=10&sortBy=price&order=asc');
const data = await res.json();
// { products: [...], total: 194, skip: 0, limit: 10 }`,
  },
  {
    method: "GET",
    path: "/products/:id",
    description: "Get single product",
    params: [
      { name: "id", type: "number", required: true, description: "Product ID (1–194)" },
    ],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/products/1');
const product = await res.json();
// { id: 1, title: "...", price: 549, category: "smartphones", ... }`,
  },
  {
    method: "GET",
    path: "/products/search",
    description: "Search products by title, brand or description",
    params: [
      { name: "q",     type: "string", required: true,  description: "Search query" },
      { name: "limit", type: "number", required: false, description: "Items per page" },
      { name: "skip",  type: "number", required: false, description: "Pagination offset" },
    ],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/products/search?q=phone');
const data = await res.json();
// { products: [...], total: 12, skip: 0, limit: 30 }`,
  },
  {
    method: "GET",
    path: "/products/categories",
    description: "Get all product categories",
    params: [],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/products/categories');
const cats = await res.json();
// [{ slug: "smartphones", name: "Smartphones", url: "..." }, ...]`,
  },
  {
    method: "GET",
    path: "/products/category/:slug",
    description: "Get products by category",
    params: [
      { name: "slug", type: "string", required: true, description: "Category slug (e.g. smartphones)" },
    ],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/products/category/smartphones');
const data = await res.json();`,
  },
  {
    method: "POST",
    path: "/products",
    description: "Add a new product",
    params: [],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title: 'My New Product',
    price: 99.99,
    category: 'smartphones',
  }),
});
const data = await res.json();
// { id: 195, title: "My New Product", price: 99.99, ... }`,
  },
  {
    method: "PUT",
    path: "/products/:id",
    description: "Replace a product entirely",
    params: [
      { name: "id", type: "number", required: true, description: "Product ID to update" },
    ],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/products/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Updated', price: 299 }),
});
const data = await res.json();`,
  },
  {
    method: "PATCH",
    path: "/products/:id",
    description: "Partially update a product",
    params: [
      { name: "id", type: "number", required: true, description: "Product ID to patch" },
    ],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/products/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ price: 199.99 }),
});
const data = await res.json();`,
  },
  {
    method: "DELETE",
    path: "/products/:id",
    description: "Delete a product",
    params: [
      { name: "id", type: "number", required: true, description: "Product ID to delete" },
    ],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/products/1', {
  method: 'DELETE',
});
const data = await res.json();
// { ...product, isDeleted: true, deletedOn: "2025-01-01T00:00:00.000Z" }`,
  },
];

const ON_THIS_PAGE = [
  "Get all products", "Get single product", "Search products",
  "Get categories", "Get by category", "Add product",
  "Replace product", "Update product", "Delete product",
];

export default function ProductsDocsPage() {
  return (
    <div className="flex">
      <div className="flex-1 px-8 py-7 max-w-[720px]">
        <DocsPageHeader
          breadcrumb="Products"
          title="Products"
          description="Manage and retrieve fake product data. Includes 194 products across 20 categories with full CRUD support, search, pagination, sorting and filtering."
        />
        <SectionTitle title="Endpoints" />
        {ENDPOINTS.map((ep) => (
          <EndpointCard key={`${ep.method}-${ep.path}`} endpoint={ep} />
        ))}
      </div>
      <OnThisPage items={ON_THIS_PAGE} />
    </div>
  );
}