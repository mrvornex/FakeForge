// app/docs/recipes/page.tsx
import { DocsPageHeader, EndpointCard, SectionTitle, OnThisPage } from "@/components/docs/DocsComponents";
import type { Endpoint } from "@/components/docs/DocsComponents";

const ENDPOINTS: Endpoint[] = [
  {
    method: "GET", path: "/recipes", description: "Get all recipes",
    params: [
      { name: "limit",  type: "number", required: false, description: "Items per page (default: 30)" },
      { name: "skip",   type: "number", required: false, description: "Items to skip" },
      { name: "sortBy", type: "string", required: false, description: "Sort field: rating, cookTimeMinutes" },
      { name: "order",  type: "string", required: false, description: "asc or desc" },
      { name: "delay",  type: "number", required: false, description: "Simulate latency in ms" },
    ],
    code: `const res = await fetch('https://fakeforge.vercel.app/recipes?limit=10&sortBy=rating&order=desc');
const data = await res.json();
// { recipes: [...], total: 50, skip: 0, limit: 10 }`,
  },
  {
    method: "GET", path: "/recipes/:id", description: "Get single recipe",
    params: [{ name: "id", type: "number", required: true, description: "Recipe ID (1–50)" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/recipes/1');
const recipe = await res.json();
// { id: 1, name: "...", ingredients: [...], instructions: [...], cuisine: "Italian", ... }`,
  },
  {
    method: "GET", path: "/recipes/search", description: "Search recipes",
    params: [{ name: "q", type: "string", required: true, description: "Search by name or cuisine" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/recipes/search?q=pasta');
const data = await res.json();`,
  },
  {
    method: "GET", path: "/recipes/meal-type/:type", description: "Get recipes by meal type",
    params: [{ name: "type", type: "string", required: true, description: "Meal type: breakfast, lunch, dinner, snack, dessert" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/recipes/meal-type/dinner');
const data = await res.json();`,
  },
  {
    method: "POST", path: "/recipes", description: "Add a new recipe",
    params: [],
    code: `const res = await fetch('https://fakeforge.vercel.app/recipes', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'My Recipe', cuisine: 'Pakistani', servings: 4 }),
});
const data = await res.json();`,
  },
  {
    method: "PATCH", path: "/recipes/:id", description: "Update a recipe",
    params: [{ name: "id", type: "number", required: true, description: "Recipe ID" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/recipes/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ servings: 6 }),
});
const data = await res.json();`,
  },
  {
    method: "DELETE", path: "/recipes/:id", description: "Delete a recipe",
    params: [{ name: "id", type: "number", required: true, description: "Recipe ID" }],
    code: `const res = await fetch('https://fakeforge.vercel.app/recipes/1', { method: 'DELETE' });
const data = await res.json();`,
  },
];

export default function RecipesDocsPage() {
  return (
    <div className="flex">
      <div className="flex-1 px-8 py-7 max-w-[720px]">
        <DocsPageHeader breadcrumb="Recipes" title="Recipes"
          description="50 fake recipes with ingredients, step-by-step instructions, cuisine type, meal type, prep time, cook time, calories, and ratings." />
        <SectionTitle title="Endpoints" />
        {ENDPOINTS.map((ep) => <EndpointCard key={`${ep.method}-${ep.path}`} endpoint={ep} />)}
      </div>
      <OnThisPage items={["Get all recipes","Get single recipe","Search recipes","By meal type","Add recipe","Update recipe","Delete recipe"]} />
    </div>
  );
}