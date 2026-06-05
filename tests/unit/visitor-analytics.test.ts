jest.mock("@/lib/db", () => ({
  pool: {
    query: jest.fn(),
    execute: jest.fn()
  }
}));

import { pool } from "@/lib/db";
import { getVisitorCount } from "@/lib/visitor-analytics";

const mockedPool = pool as unknown as {
  query: jest.Mock;
};

describe("visitor analytics", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns the stored visitor count", async () => {
    mockedPool.query.mockResolvedValue([[{ visitorCount: 12 }]]);

    await expect(getVisitorCount()).resolves.toBe(12);
  });

  it("falls back to zero when visitor count storage is unavailable", async () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    mockedPool.query.mockRejectedValue(new Error("connect ETIMEDOUT"));

    await expect(getVisitorCount()).resolves.toBe(0);

    warnSpy.mockRestore();
  });
});
