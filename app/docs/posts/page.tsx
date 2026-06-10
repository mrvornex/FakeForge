// app/docs/posts/page.tsx
import { DocsPageHeader, EndpointCard, SectionTitle, OnThisPage } from "@/components/docs/DocsComponents";
import type { Endpoint } from "@/components/docs/DocsComponents";

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET", path: "/posts", description: "Get all posts",
    params: [
      { name: "limit",  type: "number", required: false, description: "Items per page (default: 30)" },
      { name: "skip",   type: "number", required: false, description: "Pagination offset" },
      { name: "select", type: "string", required: false, description: "Fields: id,title,body,userId" },
      { name: "sortBy", type: "string", required: false, description: "Sort by: title, views, reactions" },
      { name: "order",  type: "string", required: false, description: "asc or desc" },
      { name: "delay",  type: "number", required: false, description: "Simulate latency (ms)" },
    ],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/posts?limit=10');
const data = await res.json();
// { posts: [...], total: 251, skip: 0, limit: 10 }`,
  },
  {
    method: "GET", path: "/posts/:id", description: "Get single post",
    params: [{ name: "id", type: "number", required: true, description: "Post ID (1–251)" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/posts/1');
const post = await res.json();
// { id: 1, title: "...", body: "...", tags: [...], userId: 5, views: 1200 }`,
  },
  {
    method: "GET", path: "/posts/search", description: "Search posts",
    params: [{ name: "q", type: "string", required: true, description: "Search in title and body" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/posts/search?q=love');
const data = await res.json();`,
  },
  {
    method: "GET", path: "/posts/:id/comments", description: "Get post's comments",
    params: [{ name: "id", type: "number", required: true, description: "Post ID" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/posts/1/comments');
const data = await res.json();
// { comments: [...], total: 3, skip: 0, limit: 3 }`,
  },
  {
    method: "POST", path: "/posts", description: "Add a new post",
    params: [],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'My Post', body: 'Content...', userId: 5 }),
});
const data = await res.json();
// { id: 252, title: "My Post", ... }`,
  },
  {
    method: "PATCH", path: "/posts/:id", description: "Update a post",
    params: [{ name: "id", type: "number", required: true, description: "Post ID to patch" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/posts/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Updated Title' }),
});
const data = await res.json();`,
  },
  {
    method: "DELETE", path: "/posts/:id", description: "Delete a post",
    params: [{ name: "id", type: "number", required: true, description: "Post ID to delete" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/posts/1', {
  method: 'DELETE',
});
const data = await res.json();
// { ...post, isDeleted: true, deletedOn: "2025-..." }`,
  },
];

export default function PostsDocsPage() {
  return (
    <div className="flex">
      <div className="flex-1 px-8 py-7 max-w-[720px]">
        <DocsPageHeader breadcrumb="Posts" title="Posts"
          description="Access 251 fake blog posts with tags, reactions, views, and comments. Full CRUD support with search and sorting." />
        <SectionTitle title="Endpoints" />
        {ENDPOINTS.map((ep) => <EndpointCard key={`${ep.method}-${ep.path}`} endpoint={ep} />)}
      </div>
      <OnThisPage items={["Get all posts","Get single post","Search posts","Post comments","Add post","Update post","Delete post"]} />
    </div>
  );
}