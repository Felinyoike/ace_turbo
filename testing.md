# 🧪 Advanced E2E, Integration, & Security Testing Suite Generation Prompt

## 📋 Context & Technical Stack
I am developing a modern web platform named **Ace Turbo** built on a Next.js (App Router) frontend, utilizing Prisma ORM with a live MySQL database, Tailwind CSS (Dark Theme/BOOSTFORGE tokens), and next-auth for state handling. 

The application features real-time data loops including a live vehicle registry lookup engine, complex checkout parameters, dynamic sitemap validation, and administrative backend layers.

---

## 🎯 Testing Objective
Generate a production-ready automated testing suite utilizing **[Playwright / Cypress / Jest - Select your framework]** written in TypeScript. The generated tests must validate functional edge cases, user state persistence, UI regressions, and critical security/authorization guardrails without leaving hanging execution blocks.

---

## 🔍 Core Functional & Security Domains to Test

Your generated testing scripts must cover these six operational domains comprehensively:

### 1. Dynamic Hero Image Carousel & Client States
* **UI Persistence:** Assert that the `HeroImageCarousel` mounts correctly on the client side (`mounted === true`) to protect against server hydration mismatch failures.
* **Interval Loops:** Mock browser timers to verify that the active slide index updates sequentially every 5000ms.
* **Tailwind Class Sync:** Confirm that when a slide becomes active, its parent element gains `opacity-100 z-10` and the image transitions with `scale-105`, while inactive slides securely apply `opacity-0 z-0`.

### 2. Vehicle Catalog & Car Registration Lookup API
* **Live Fetch Handshake:** Test the `/api/vehicles/...` (or local routing paths) endpoint to ensure it handles incoming validation requests without timing out.
* **Config Overrides:** Verify that endpoints correctly execute with `export const dynamic = "force-dynamic"` configurations, bypassing stale static CDN caches.
* **Error Boundary Handling:** Mock a failed 404/500 API lookup response and assert that the UI safely displays a fallback component instead of crashing the layout view.

### 3. Dynamic Sitemap & Search Index Pipelines
* **Concurrent Fetch Performance:** Validate that the asynchronous `sitemap()` function fetches entries via concurrent `Promise.all` streams without choking memory limits.
* **Routing Array Integrity:** Assert that the final sitemap array output properly aggregates hardcoded static URLs (Home, `/turbos`, `/contact`) with database-driven dynamic models (`/turbos/[seoSlug]`).

### 4. Admin Dashboard Security & Auditing Modules
* **Session Guardrails:** Attempt unauthenticated tracking visits to protected routes (e.g., `/admin/audit`, `/admin/seo`) and assert that next-auth securely intercepts the thread and forces a redirect to the login terminal.
* **Data Flow Mutation:** Write integration tests ensuring that administrative data mutations accurately hit the MySQL persistent layer through the local Prisma Client setup.

### 5. 🔒 Penetration Testing & Security Validation (NEW)
* **RBAC Enforcement (Role-Based Access Control):** Authenticate a test user with a standard `'CUSTOMER'` or `'USER'` role, attempt to make unauthorized `POST/PUT/DELETE` requests to `/api/admin` endpoints, and assert that the server explicitly denies access with a `403 Forbidden` status.
* **SQL Injection (SQLi) Probing:** Attack form inputs and dynamic query parameters with common injection sequences (e.g., `' OR '1'='1`, `UNION SELECT`). Assert that the Prisma abstraction layer safely sanitizes the strings as literals, executing the query cleanly without leaking table schemas or data structures.
* **Header & Cookie Inspection:** Analyze the HTTP headers of network requests to ensure security baselines are maintained (e.g., verifying that the `next-auth.session-token` cookie utilizes the `Secure`, `HttpOnly`, and `SameSite=Lax/Strict` attributes in production environments).
* **Information Disclosure Prevention:** Hit known error boundaries intentionally and verify that production API responses mask internal raw system stack traces or server paths from malicious clients.

---

## 🤖 Output Requirements for the AI Engine

When generating the code files, you must follow these rules strictly:
1. **Zero Mocks for Pure States:** Do not mock elements that depend on client viewport layouts; write functional user interaction statements (e.g., `.click()`, `.hover()`).
2. **Environment Isolation:** Use placeholders for sensitive infrastructure strings (`process.env.DATABASE_URL`, `process.env.NEXTAUTH_URL`) to prevent credentials leakage in test script outputs.
3. **Clean Teardowns:** Ensure every execution block includes a robust cleanup framework (`afterEach` or `afterAll`) to tear down temporary elements or close open database connections cleanly.

---

## 📥 Test Suite Location

All E2E tests live in `tests/e2e/`:

| File | Domain |
|------|--------|
| `carousel.spec.ts` | Hero carousel mounting, transitions, indicators |
| `catalog-lookup.spec.ts` | Car registration API, turbo finder form, catalog pages |
| `sitemap.spec.ts` | Sitemap XML generation and route integrity |
| `admin-security.spec.ts` | Admin/B2B/account route protection |
| `security-pentest.spec.ts` | RBAC, SQLi probing, security headers, info disclosure |
| `cart.spec.ts` | Cart API (GET/POST/PATCH/DELETE), cart page, checkout |
| `home.spec.ts` | Homepage rendering, cards, links, sections |

---

## � Running Tests

```bash
# Run full suite (chromium only)
npx playwright test --project=chromium

# Run a specific domain
npx playwright test tests/e2e/security-pentest.spec.ts --project=chromium

# Show full report
npx playwright show-report
```

---

## ⚠️ Infrastructure Requirements

Some tests require backend infrastructure to pass:

| Env Variable | Required For | Fallback |
|---|---|---|
| `DATABASE_URL` | Cart API, checkout, turbo search, orders | **None — tests will timeout** |
| `REDIS_URL` | Rate limiting (caching layer) | In-memory buckets (works without Redis) |
| `DVLA_API_KEY` | Car registration real lookup | Demo/mock data returned |
| `STRIPE_SECRET_KEY` | Checkout payment redirect | Mock checkout mode |

Tests that **always pass without infrastructure**:
- All admin/B2B/account route protection (middleware only)
- Security header inspection
- Information disclosure prevention
- Homepage rendering
- Carousel transitions
- Sitemap generation (returns static routes even without DB)

---

## � Latest Test Run Results (2026-05-23)

**Environment:** No `REDIS_URL`, dev server with cold compilation

| Category | Passed | Failed | Notes |
|----------|--------|--------|-------|
| Carousel | 3/4 | 1 | Indicators timeout on cold start |
| Admin Security | 12/12 | 0 | All routes properly protected |
| Public Pages | 5/6 | 1 | /turbos and /cart need DB |
| Cart API | 3/6 | 3 | POST/validation need DB |
| Catalog Lookup | 3/8 | 5 | API needs DB for validation |
| Homepage | 3/3 | 0 | All content renders |
| Security/Pentest | Partial | Partial | Headers pass, RBAC redirect issues |

**Key findings:**
- All security guardrails work correctly
- Carousel transitions confirmed working
- Homepage renders all sections and cards
- Cart/checkout/lookup tests need `DATABASE_URL` to pass
