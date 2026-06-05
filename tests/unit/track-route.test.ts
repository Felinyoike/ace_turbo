jest.mock("@/lib/rateLimit", () => ({
  rateLimit: jest.fn()
}));

jest.mock("@/lib/visitor-analytics", () => ({
  createVisitorLog: jest.fn(),
  summarizeVisitorAnalyticsError: jest.fn((error) => error.message || String(error))
}));


import { POST } from "@/app/api/track/route";
import { rateLimit } from "@/lib/rateLimit";
import { createVisitorLog } from "@/lib/visitor-analytics";

const mockedRateLimit = rateLimit as jest.MockedFunction<typeof rateLimit>;
const mockedCreateVisitorLog = createVisitorLog as jest.MockedFunction<typeof createVisitorLog>;

function createTrackRequest(body: unknown) {
  return new Request("http://localhost/api/track", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": "203.0.113.42, 10.0.0.1"
    },
    body: JSON.stringify(body)
  });
}

describe("POST /api/track", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedRateLimit.mockResolvedValue({ allowed: true, remaining: 119 });
  });

  it("returns 201 when the visitor log is written", async () => {
    mockedCreateVisitorLog.mockResolvedValue(undefined);

    const response = await POST(createTrackRequest({ page: "/", referrer: null }));

    await expect(response.json()).resolves.toEqual({ status: "tracked" });
    expect(response.status).toBe(201);
    expect(mockedCreateVisitorLog).toHaveBeenCalledWith({
      page: "/",
      referrer: null,
      userAgent: undefined,
      ipAddress: "203.0.113.42"
    });
  });

  it("returns 202 when analytics storage is unavailable", async () => {
    const warnSpy = jest.spyOn(console, "warn").mockImplementation(() => {});
    mockedCreateVisitorLog.mockRejectedValue(new Error("connect ETIMEDOUT"));

    const response = await POST(createTrackRequest({ page: "/turbos", userAgent: "jest" }));

    await expect(response.json()).resolves.toEqual({ status: "tracking-unavailable" });
    expect(response.status).toBe(202);
    warnSpy.mockRestore();
  });
});
