// lib/store.ts — shared in-memory store for custom responses
// Note: Vercel serverless functions may run on different instances
// For production persistence, replace with Redis/KV/Database

const globalStore = global as typeof global & {
  __fakeforgeStore?: Map<string, { data: unknown; createdAt: string }>;
};

if (!globalStore.__fakeforgeStore) {
  globalStore.__fakeforgeStore = new Map();
}

export const store = globalStore.__fakeforgeStore;