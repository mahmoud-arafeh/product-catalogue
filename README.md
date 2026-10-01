# Product Catalogue

A React + TypeScript product browsing application built against the [DummyJSON Products API](https://dummyjson.com/).

The application supports browsing, searching, filtering, sorting, product details and editing, shortlisting, and product comparison.

## Features

* Paginated product catalogue
* Search with debounced input
* Category filtering
* Sort by price and rating
* Shareable catalogue URLs
* Product detail pages with:

  * Images
  * Description
  * Stock
  * Rating
  * Reviews
* Edit product title and price through the API
* Optimistic product editing with rollback when a save fails
* Shortlist up to 4 products
* Shortlist persistence across page refreshes
* Shortlist synchronization across multiple browser tabs
* Product comparison
* Identifies the cheapest and best-rated products
* Loading, error, and empty states
* Offline status indicator
* Keyboard-accessible controls
* TypeScript throughout

## Tech Stack

* React
* TypeScript
* React Router
* Axios
* Vite
* DummyJSON API

## Getting Started

### Requirements

* Node.js
* npm

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

### Production Build

Create a production build:

```bash
npm run build
```

### Lint

Run ESLint:

```bash
npm run lint
```

## Application Structure

```text
src/
├── app/
│   └── App.tsx
├── components/
├── pages/
├── services/
│   └── product.ts
├── types/
│   └── types.ts
├── styles/
│   ├── app.css
│   ├── index.css
│   └── productList.css
└── main.tsx
```

Route-level views are kept in `pages`, reusable UI is kept in `components`, API communication is centralized in `services`, and shared TypeScript definitions are kept in `types`.

## Key Decisions

### URL-driven catalogue state

Search, category, sorting, and pagination are stored in the URL query parameters.

For example:

```text
/products?page=2&search=phone&sort=price-asc
```

This makes catalogue views shareable and allows browser back/forward navigation to reproduce previous views.

### Search

Search input is debounced so rapid typing does not trigger a request for every keystroke.

Search and category filtering are treated as mutually exclusive filters.

### Product editing

Product edits use an optimistic UI approach.

The interface updates immediately when the user saves. The API request is then sent in the background.

If the request succeeds, the changes remain visible.

If the request fails, the previous product state is restored and an error is shown to the user.

### Shortlist state

Shortlist state is owned at the application level because it is shared between the catalogue, shortlist, and comparison views.

The shortlist is persisted using `localStorage`.

The browser `storage` event is used to synchronize shortlist changes between multiple open instances of the application.

### Rendering

Product cards are memoized, and shortlist callbacks are kept stable so changing one shortlist item does not unnecessarily re-render unaffected product cards.

### API organization

All DummyJSON API communication is kept in `services/product.ts` rather than being performed directly inside components.

## Assumptions

* The catalogue uses a page size of 10 products.
* Search and category filtering are mutually exclusive.
* A shortlist can contain a maximum of 4 products.
* The URL is the source of truth for catalogue navigation state.
* Shortlist data only stores product IDs; product details are fetched when needed.
* The application uses DummyJSON as the only backend API.

## Known Limitations

DummyJSON is a demonstration API. Product updates through its PUT endpoint are simulated and are not guaranteed to persist when the product is fetched again later.

Offline detection is provided to communicate network status, but the application does not provide a fully cached offline catalogue.

## Validation

The project has been checked with:

```bash
npm run build
npm run lint
```

Both complete successfully.
