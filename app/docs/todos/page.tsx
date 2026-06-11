// app/docs/todos/page.tsx
import { DocsPageHeader, EndpointCard, SectionTitle, OnThisPage } from "@/components/docs/DocsComponents";
import type { Endpoint } from "@/components/docs/DocsComponents";

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET", path: "/api/todos", description: "Get all todos",
    params: [
      { name: "limit",  type: "number", required: false, description: "Items per page (default: 30)" },
      { name: "skip",   type: "number", required: false, description: "Items to skip" },
      { name: "delay",  type: "number", required: false, description: "Simulate latency in ms" },
    ],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/todos?limit=10');
const data = await res.json();
// { todos: [...], total: 254, skip: 0, limit: 10 }`,
  },
  {
    method: "GET", path: "/api/todos/:id", description: "Get single todo",
    params: [{ name: "id", type: "number", required: true, description: "Todo ID (1–254)" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/todos/1');
const todo = await res.json();
// { id: 1, todo: "Buy groceries", completed: false, userId: 42 }`,
  },
  {
    method: "GET", path: "/api/todos/random", description: "Get a random todo",
    params: [],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/todos/random');
const todo = await res.json();
// { id: 87, todo: "Read a book", completed: true, userId: 12 }`,
  },
  {
    method: "GET", path: "/api/users/:id/todos", description: "Get todos by user",
    params: [{ name: "id", type: "number", required: true, description: "User ID" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/users/1/todos');
const data = await res.json();
// { todos: [...], total: 5, skip: 0, limit: 5 }`,
  },
  {
    method: "POST", path: "/api/todos", description: "Add a new todo",
    params: [],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ todo: 'Learn Next.js', completed: false, userId: 5 }),
});
const data = await res.json();
// { id: 255, todo: "Learn Next.js", completed: false, userId: 5 }`,
  },
  {
    method: "PATCH", path: "/api/todos/:id", description: "Update a todo",
    params: [{ name: "id", type: "number", required: true, description: "Todo ID" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/todos/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ completed: true }),
});
const data = await res.json();`,
  },
  {
    method: "DELETE", path: "/api/todos/:id", description: "Delete a todo",
    params: [{ name: "id", type: "number", required: true, description: "Todo ID" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/todos/1', { method: 'DELETE' });
const data = await res.json();
// { ...todo, isDeleted: true, deletedOn: "2025-..." }`,
  },
];

export default function TodosDocsPage() {
  return (
    <div className="flex">
      <div className="flex-1 px-8 py-7 max-w-[720px]">
        <DocsPageHeader breadcrumb="Todos" title="Todos"
          description="254 fake todos with completion status and user associations. Supports random todo, filter by user, and full CRUD." />
        <SectionTitle title="Endpoints" />
        {ENDPOINTS.map((ep) => <EndpointCard key={`${ep.method}-${ep.path}`} endpoint={ep} />)}
      </div>
      <OnThisPage items={["Get all todos","Get single todo","Random todo","By user","Add todo","Update todo","Delete todo"]} />
    </div>
  );
}