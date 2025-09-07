# Simple Quote Generator

#### Created by Taing Bunsou

## Brief Description:

This is just a simple quote generator that generates random quotes from a predefined list of quotes. The goal of this is just to make a simple project to practice my full stack development skills to integrate frontend, backend and database.

Tech Stack:

- Frontend: NextJS, TailwindCSS, TypeScript, Shadcn UI
- Backend: NestJS, TypeScript
- Database: Neon (PostgreSQL), Drizzle ORM

## Setup Instructions:

First go to my [backend repo](https://github.com/Bunsou/KIT---Simple-Quote-Generator-Backend.git) and follow the instructions there to set up the backend.

Once the backend is running, you can start the frontend by following these steps:

1. Clone the frontend repository
   ```bash
   git clone https://github.com/Bunsou/KIT---Simple-Quote-Generator-Frontend.git
   ```
2. Install the dependencies
   ```bash
   cd KIT---Simple-Quote-Generator-Frontend
   npm install
   ```
3. Start the development server
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:3000` to see the app

## Architecture Explanation:

- The Next.js frontend uses the App Router (src/app) with a global wrapper in src/app/layout.tsx and global styles in src/app/globals.css.
- The root page (src/app/page.tsx) renders the QuoteGenerator component (src/components/quote-generator.tsx), which calls helper functions in src/lib/utils.ts (e.g., getRandomQuote and getAllQuotes) to fetch JSON from the backend GET endpoints (/quotes/random and /quotes).
- The create-quote page (src/app/create-quote/page.tsx) renders the QuoteCreator component (src/components/quote-creator.tsx), which sends new quote data via a helper function createQuote in src/lib/utils.ts that POSTs to /quotes.
- Components update client-side React state from the fetch responses and re-render; all networking is performed via fetch calls in the utils module unless a component is implemented as a server component that uses server-side fetch.
- The backend repository linked above hosts the API that stores and returns quotes.
