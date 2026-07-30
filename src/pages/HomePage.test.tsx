// features/events/HomePage.test.tsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import HomePage from "./HomePage";

// mock the axios instance every fetcher imports
vi.mock("@/lib/api", () => ({
  default: {
    get: vi.fn((url: string) => {
      if (url.includes("/popular/event_ids"))
        return Promise.resolve({ data: { popular_event_ids: ["100"] } });

      if (url.includes("/markets") && url.includes("/events/"))
        return Promise.resolve({
          data: { markets: [{ id: "9", event_id: "100", name: "Match Odds" }] },
        });

      if (url.includes("/contracts"))
        return Promise.resolve({
          data: { contracts: [{ id: "c1", market_id: "9", name: "Arsenal" }] },
        });

      if (url.includes("/quotes"))
        return Promise.resolve({
          data: {
            c1: { offers: [{ price: 5000, quantity: 1 }], bids: [{ price: 5100, quantity: 1 }] },
          },
        });

      // events-by-id (the plain /v3/events/{ids}/ call)
      if (url.includes("/events/"))
        return Promise.resolve({
          data: {
            events: [
              {
                id: "100",
                name: "Arsenal vs Chelsea",
                short_name: null,
                type: "football_match",
                state: "upcoming",
                start_datetime: "2026-08-01T14:00:00Z",
              },
            ],
          },
        });

      return Promise.resolve({ data: {} });
    }),
    defaults: { headers: { common: {} } },
  },
}));

// stub auth so the `enabled: !!token` guards let queries run
vi.mock("@/hooks/useAuthContext", () => ({
  useAuthContext: () => ({ token: "test-token", email: "a@b.com" }),
}));

function renderHome() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("HomePage", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders a featured event with its priced contract", async () => {
    renderHome();

    expect(await screen.findByText("Arsenal vs Chelsea")).toBeInTheDocument();
    expect(await screen.findByText("Arsenal")).toBeInTheDocument();
    // 5000 basis points -> 2.00 decimal (buy price)
    expect(await screen.findByText("2.00")).toBeInTheDocument();
  });
});