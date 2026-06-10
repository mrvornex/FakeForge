// app/docs/auth-login/page.tsx
import { DocsPageHeader, EndpointCard, SectionTitle, OnThisPage } from "@/components/docs/DocsComponents";
import type { Endpoint } from "@/components/docs/DocsComponents";

const ENDPOINTS: Endpoint[] = [
  {
    method: "POST", path: "/auth/login", description: "Login and get JWT tokens",
    params: [],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'emilys',
    password: 'emilyspass',
    expiresInMins: 60,  // optional, default 60
  }),
});
const data = await res.json();
// {
//   id: 1, username: "emilys", email: "...", role: "admin",
//   accessToken: "eyJ...",
//   refreshToken: "eyJ...",
// }`,
  },
  {
    method: "GET", path: "/auth/me", description: "Get current authenticated user",
    params: [],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/auth/me', {
  headers: {
    'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
  },
});
const user = await res.json();
// { id: 1, username: "emilys", email: "...", role: "admin", ... }`,
  },
  {
    method: "POST", path: "/auth/refresh", description: "Refresh access token",
    params: [],
    code: `const res = await fetch('https://fakeforge.vercel.app/api/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    refreshToken: 'YOUR_REFRESH_TOKEN',
    expiresInMins: 60,
  }),
});
const data = await res.json();
// { accessToken: "eyJ...", refreshToken: "eyJ..." }`,
  },
];

export default function AuthDocsPage() {
  return (
    <div className="flex">
      <div className="flex-1 px-8 py-7 max-w-[720px]">
        <DocsPageHeader breadcrumb="Auth / Login" title="Auth / Login"
          description="Authenticate users and receive JWT access and refresh tokens. Use the access token in the Authorization header to access protected endpoints." />

        {/* Info box */}
        <div className="bg-orange-500/[0.08] border border-orange-500/20 rounded-[9px] p-4 mb-6">
          <p className="font-mono text-[11.5px] text-orange-400/80 leading-[1.7]">
            <span className="text-orange-500 font-semibold">Note:</span> FakeForge auth is simulated — any username/password combination will work and return a valid-looking JWT token. The token is not cryptographically verified on the server.
          </p>
        </div>

        <SectionTitle title="Endpoints" />
        {ENDPOINTS.map((ep) => <EndpointCard key={`${ep.method}-${ep.path}`} endpoint={ep} />)}

        {/* Using token section */}
        <SectionTitle title="Using the Token" />
        <div className="bg-[#080810] border border-white/[0.06] rounded-[8px] overflow-hidden">
          <div className="flex items-center px-3 py-2 border-b border-white/[0.05]">
            <span className="font-mono text-[9.5px] text-white/25 uppercase tracking-[0.8px]">javascript</span>
          </div>
          <pre className="px-4 py-3.5 font-mono text-[11.5px] leading-[1.75] text-white/65 overflow-x-auto">{`// 1. Login
const { accessToken } = await fetch('/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'emilys', password: 'emilyspass' }),
}).then(r => r.json());

// 2. Use token in subsequent requests
const user = await fetch('/auth/me', {
  headers: { 'Authorization': \`Bearer \${accessToken}\` },
}).then(r => r.json());`}</pre>
        </div>
      </div>
      <OnThisPage items={["Login","Get current user","Refresh token","Using the token"]} />
    </div>
  );
}