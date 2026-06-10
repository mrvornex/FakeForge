// app/docs/comments/page.tsx
import { DocsPageHeader, EndpointCard, SectionTitle, OnThisPage } from "@/components/docs/DocsComponents";
import type { Endpoint } from "@/components/docs/DocsComponents";

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET", path: "/comments", description: "Get all comments",
    params: [
      { name: "limit",  type: "number", required: false, description: "Items per page (default: 30)" },
      { name: "skip",   type: "number", required: false, description: "Items to skip" },
      { name: "delay",  type: "number", required: false, description: "Simulate latency in ms" },
    ],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/comments?limit=10');
const data = await res.json();
// { comments: [...], total: 340, skip: 0, limit: 10 }`,
  },
  {
    method: "GET", path: "/comments/:id", description: "Get single comment",
    params: [{ name: "id", type: "number", required: true, description: "Comment ID (1–340)" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/comments/1');
const comment = await res.json();
// { id: 1, body: "...", postId: 3, likes: 12, user: { id, username, fullName } }`,
  },
  {
    method: "GET", path: "/posts/:id/comments", description: "Get comments by post",
    params: [{ name: "id", type: "number", required: true, description: "Post ID" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/posts/1/comments');
const data = await res.json();`,
  },
  {
    method: "POST", path: "/comments", description: "Add a new comment",
    params: [],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/comments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ body: 'Great post!', postId: 1, userId: 5 }),
});
const data = await res.json();`,
  },
  {
    method: "PATCH", path: "/comments/:id", description: "Update a comment",
    params: [{ name: "id", type: "number", required: true, description: "Comment ID" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/comments/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ body: 'Updated comment' }),
});
const data = await res.json();`,
  },
  {
    method: "DELETE", path: "/comments/:id", description: "Delete a comment",
    params: [{ name: "id", type: "number", required: true, description: "Comment ID" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/comments/1', { method: 'DELETE' });
const data = await res.json();`,
  },
];

export default function CommentsDocsPage() {
  return (
    <div className="flex">
      <div className="flex-1 px-8 py-7 max-w-[720px]">
        <DocsPageHeader breadcrumb="Comments" title="Comments"
          description="340 fake comments linked to posts and users. Each comment has body text, likes count, and a user object. Supports full CRUD and filtering by post." />
        <SectionTitle title="Endpoints" />
        {ENDPOINTS.map((ep) => <EndpointCard key={`${ep.method}-${ep.path}`} endpoint={ep} />)}
      </div>
      <OnThisPage items={["Get all comments","Get single comment","By post","Add comment","Update comment","Delete comment"]} />
    </div>
  );
}