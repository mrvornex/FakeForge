// app/docs/users/page.tsx
import { DocsPageHeader, EndpointCard, SectionTitle, OnThisPage } from "@/components/docs/DocsComponents";
import type { Endpoint } from "@/components/docs/DocsComponents";

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET", path: "/users", description: "Get all users",
    params: [
      { name: "limit",  type: "number", required: false, description: "Items per page (default: 30, max: 100)" },
      { name: "skip",   type: "number", required: false, description: "Items to skip for pagination" },
      { name: "select", type: "string", required: false, description: "Comma-separated fields: id,firstName,email" },
      { name: "sortBy", type: "string", required: false, description: "Field to sort by: firstName, age, email" },
      { name: "order",  type: "string", required: false, description: "asc or desc" },
      { name: "delay",  type: "number", required: false, description: "Simulate latency in milliseconds" },
    ],
    code: `const res = await fetch('https://fakeforge.vercel.app/users?limit=10');
const data = await res.json();
// { users: [...], total: 208, skip: 0, limit: 10 }`,
  },
  {
    method: "GET", path: "/users/:id", description: "Get single user",
    params: [{ name: "id", type: "number", required: true, description: "User ID (1–208)" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/users/1');
const user = await res.json();
// { id: 1, firstName: "Emily", lastName: "Smith", email: "...", ... }`,
  },
  {
    method: "GET", path: "/users/search", description: "Search users",
    params: [
      { name: "q",     type: "string", required: true,  description: "Search by name, email or username" },
      { name: "limit", type: "number", required: false, description: "Items per page" },
    ],
    code: `const res = await fetch('https://fakeforge.vercel.app/users/search?q=emily');
const data = await res.json();`,
  },
  {
    method: "GET", path: "/users/:id/posts", description: "Get user's posts",
    params: [{ name: "id", type: "number", required: true, description: "User ID" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/users/1/posts');
const data = await res.json();
// { posts: [...], total: 8, skip: 0, limit: 8 }`,
  },
  {
    method: "GET", path: "/users/:id/todos", description: "Get user's todos",
    params: [{ name: "id", type: "number", required: true, description: "User ID" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/users/1/todos');
const data = await res.json();`,
  },
  {
    method: "GET", path: "/users/:id/carts", description: "Get user's carts",
    params: [{ name: "id", type: "number", required: true, description: "User ID" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/users/1/carts');
const data = await res.json();`,
  },
  {
    method: "POST", path: "/users", description: "Add a new user",
    params: [],
    code: `const res = await fetch('https://fakeforge.vercel.app/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
  }),
});
const data = await res.json();`,
  },
  {
    method: "PATCH", path: "/users/:id", description: "Update a user",
    params: [{ name: "id", type: "number", required: true, description: "User ID to patch" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/users/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ firstName: 'Updated' }),
});
const data = await res.json();`,
  },
  {
    method: "DELETE", path: "/users/:id", description: "Delete a user",
    params: [{ name: "id", type: "number", required: true, description: "User ID to delete" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/users/1', {
  method: 'DELETE',
});
const data = await res.json();
// { ...user, isDeleted: true, deletedOn: "2025-..." }`,
  },
];

export default function UsersDocsPage() {
  return (
    <div className="flex">
      <div className="flex-1 px-8 py-7 max-w-[720px]">
        <DocsPageHeader breadcrumb="Users" title="Users"
          description="Retrieve 208 fake users with full profile data — address, bank, company, hair, and more. Supports search, sorting, pagination, and sub-resources like posts, todos, and carts." />
        <SectionTitle title="Endpoints" />
        {ENDPOINTS.map((ep) => <EndpointCard key={`${ep.method}-${ep.path}`} endpoint={ep} />)}
      </div>
      <OnThisPage items={["Get all users","Get single user","Search users","User posts","User todos","User carts","Add user","Update user","Delete user"]} />
    </div>
  );
}