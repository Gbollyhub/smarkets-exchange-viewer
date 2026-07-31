# Smarkets Exchange Viewer

A React application that authenticates with the Smarkets API and displays live exchange data. The application includes a featured events homepage with live price updates and an event page showing all available markets with both buy and sell prices.

Github URL: https://github.com/Gbollyhub/smarkets-exchange-viewer 
---

## Features

- Authenticate using a Smarkets account
- View featured exchange events
- Live price updates via polling
- Browse all markets for an event
- Display both buy and sell prices for each contract
- Protected routes with session management
- Responsive UI inspired by the Smarkets Exchange

---

## Tech Stack

- React
- TypeScript
- Vite
- TanStack React Query
- React Router
- Axios
- Tailwind CSS
- Vitest
- React Testing Library

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Configure environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Populate the following variables:

```env
VITE_SMARKET_API_URL=
VITE_SMARKET_CLIENT_URL=
```

Where:

- `VITE_SMARKET_API_URL` is the Smarkets API base URL.
- `VITE_SMARKET_CLIENT_URL` is the Smarkets website used for authentication links.

### Run the application

```bash
npm run dev
```

Open:

```
http://localhost:5173
```

### Run tests

```bash
npm run test
```

---

## Implementation Summary

I built the application using React, TypeScript, and Vite, as the project is a client-side dashboard with no requirement for server-side rendering. React Query is used to manage API requests, caching, polling, loading states, and background refetching, while React Router handles navigation and protected routes. State management is intentionally lightweight, with React Query handling server state, a small authentication context managing the user session, and local component state used where appropriate.

The application consists of a login flow, a homepage displaying featured exchange events with live prices, and an event page listing all available markets for a selected event. The interface takes visual inspiration from the Smarkets Exchange, with an emphasis on readability and making prices the primary focus.

One of the main technical decisions was using the `popular/event_ids` endpoint to build the homepage rather than the navigation tree. This provided a simpler way to display active exchange events while reducing implementation complexity. To support live updates, visible market prices are refreshed at regular intervals using React Query polling, with the polling logic isolated inside a reusable hook so it can easily be replaced by the streaming API in the future.

The biggest challenge was understanding the Smarkets API and how events, markets, contracts, and quotes relate to one another. I also encountered CORS restrictions, which were resolved using the Vite development proxy. Large events introduced another challenge, as requesting quotes for every market exceeded URL length limits. To address this, contracts and prices are only requested for expanded markets, reducing both request size and API usage.

With additional time, I would replace polling with the streaming API for true real-time updates, move authentication behind a backend using secure httpOnly cookies, expand automated test coverage, improve accessibility, and add category browsing, order book depth, and price history.

---

## API Endpoints Used

The application uses the following Smarkets API endpoints:

| Endpoint | Purpose |
|----------|---------|
| `POST /v3/sessions/` | Authenticate the user and create a session. |
| `GET /v0/users/current/` | Retrieve the authenticated user's information. |
| `DELETE /v0/sessions/current/` | Log out and invalidate the current session. |
| `GET /v3/popular/event_ids/` | Retrieve featured exchange events displayed on the homepage. |
| `GET /v3/events/{ids}/` | Retrieve event details. |
| `GET /v3/events/{ids}/markets/` | Retrieve markets for one or more events. |
| `GET /v3/markets/{ids}/contracts/` | Retrieve contracts for selected markets. |
| `GET /v3/markets/{ids}/quotes/` | Retrieve live buy and sell prices. |
| `GET /v3/events/{id}/` | Retrieve details for an individual event. |
| `GET /v3/events/{id}/markets/` | Retrieve all markets for an event. |

---

## Technical Decisions

- Used **Vite** for a lightweight React application with fast development and build times.
- Used **TypeScript** to improve type safety when working with nested API responses.
- Chose **React Query** for data fetching, caching, polling, loading states, and request deduplication.
- Used **React Router** for page navigation and route protection.
- Used **Axios** with interceptors to centralise authentication handling.
- Used **Tailwind CSS** for rapid and consistent UI development.
- Kept state management simple by combining React Query, React Context for authentication, and local component state.
- Built the homepage from the `popular/event_ids` endpoint instead of the navigation tree to keep the implementation simpler.
- Loaded contracts and quotes only for expanded markets to avoid URL length limitations and reduce API usage.
- Encapsulated polling inside a reusable hook so it can easily be replaced with the streaming API.

---

## Testing

The project uses:

- Vitest
- React Testing Library

Current test coverage includes:

- Price conversion utility
- Homepage integration behaviour

---

## Future Improvements

Given more time, I would:

- Replace polling with the Smarkets streaming API.
- Move authentication behind a backend using secure httpOnly cookies.
- Expand unit and integration test coverage.
- Add end-to-end tests for authentication and live pricing.
- Add category browsing and filtering.
- Improve accessibility.
- Add loading skeletons and retry strategies.
- Display order book depth.
- Add historical price charts.
- Support the passwordless authentication flow.

---

## Notes

- API requests are proxied through Vite during development to avoid CORS issues.
- Prices are displayed as decimal odds after converting the API's basis point values.
- Polling intervals were chosen to balance live updates with API rate limits.