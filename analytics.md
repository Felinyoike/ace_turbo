"Act as a Senior Backend Developer. I am building a high-performance, custom analytics and reporting dashboard for my e-commerce site (Ace Turbo). I have moved away from Prisma and am now using **Raw SQL (mysql2/promise)** for all database operations.

Please generate the following components for my project:

**1. Database Schema (Raw SQL):**

* Provide the `CREATE TABLE` script for a `VisitorLog` table.
* Include a column for `page`, `referrer`, `userAgent`, and a `hashedIp` column.
* Include the SQL statement to create an index on the `timestamp` column for high-speed reporting performance.

**2. Backend Logic (Raw SQL & IP Hashing):**

* Provide an optimized API route (`src/app/api/track/route.ts`).
* **Requirement:** Before insertion, the logic must hash the visitor's IP address (using `crypto` module with a server-side `SALT`) to ensure privacy and GDPR/Data compliance.
* Include the `pool.execute` logic to insert the log.

**3. Analytics Aggregation API:**

* Provide the SQL query to fetch the `visitorCount` for the dashboard.
* Update the existing `src/app/api/admin/analytics/route.ts` structure to include this `visitorCount` in the JSON response alongside the existing order and revenue metrics.

**4. Frontend Integration:**

* Provide the `useEffect` hook for my `layout.tsx` that sends the beacon. Ensure it uses `keepalive: true` to prevent data loss on page exit.
* Update the `AnalyticsDashboard.tsx` type definition and JSX to include the new `StatCard` for 'Total Site Visits' using the passed `visitorCount` prop.

**5. Performance Optimization:**

* Explain how to use MySQL 'INSERT DELAYED' or similar strategies to ensure the tracking script never blocks the main page load for users.

**Constraints:** * Maintain my existing quality code structure.

* Do not use Prisma.
* Ensure the code is secure against SQL injection by using parameterized queries."




