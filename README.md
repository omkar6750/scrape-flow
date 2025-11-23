# ScrapeFlow - No-Code Web Scraping Platform

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-6.11-2D3748?style=for-the-badge&logo=prisma)
![Status](https://img.shields.io/badge/Status-Demo-green?style=for-the-badge)

A powerful no-code web scraping platform that enables users to build complex automation workflows through an intuitive drag-and-drop interface. Create, schedule, and monitor web scraping workflows without writing a single line of code.

## ✨ Features

-   **Visual Workflow Builder** - Drag-and-drop interface powered by React Flow for creating complex automation workflows
-   **11+ Workflow Modules** - Comprehensive set of modules including:
    -   Browser automation (Launch, Navigate)
    -   Data extraction (HTML parsing, AI-powered extraction)
    -   User interactions (Click, Fill Input, Press Key)
    -   Timing controls (Wait for Element)
    -   Data processing (JSON manipulation)
    -   Result delivery (Webhook integration)
-   **Scheduled Execution** - Cron-based scheduling for automated workflow runs
-   **Real-time Monitoring** - Track workflow executions with detailed phase-by-phase logs
-   **Credit-based System** - Pay-as-you-go credit system for resource management
-   **Secure Credentials** - Encrypted credential storage for API keys and sensitive data
-   **Analytics Dashboard** - Visualize execution statistics and credit usage
-   **AI-Powered Extraction** - Leverage Google Gemini AI for intelligent data extraction from unstructured content

## 🛠️ Tech Stack

### Frontend

-   **Next.js 14** - App Router with Server Components
-   **React 18** - UI library
-   **TypeScript** - Type-safe development
-   **Tailwind CSS** - Utility-first CSS framework
-   **Shadcn UI** - High-quality component library
-   **React Flow** - Visual workflow editor

### Backend

-   **Next.js API Routes** - RESTful API endpoints
-   **Server Actions** - Type-safe server-side mutations
-   **Prisma ORM** - Database abstraction layer
-   **SQLite** - Lightweight database (can be migrated to PostgreSQL)

### Authentication & Security

-   **Clerk** - Authentication and user management
-   **Symmetric Encryption** - AES encryption for sensitive credentials

### Automation & AI

-   **Puppeteer** - Headless browser automation
-   **Google Generative AI** - Gemini 2.5 Flash for AI-powered data extraction
-   **Cheerio** - Server-side HTML parsing

### State Management & Data Fetching

-   **TanStack Query** - Server state management and caching
-   **React Hook Form** - Form state management
-   **Zod** - Schema validation

### Additional Libraries

-   **date-fns** - Date manipulation
-   **cron-parser** - Cron expression parsing
-   **Stripe** - Payment processing (optional, disabled in demo mode)

## 🏗️ Architecture Overview

### Next.js App Router Structure

The application follows Next.js 14 App Router conventions with:

-   **Route Groups** - Organized routing with `(auth)`, `(dashboard)`, and `(home)` groups
-   **Server Components** - Default server-side rendering for better performance
-   **Client Components** - Interactive UI components marked with `"use client"`

### Server Actions Pattern

Business logic is implemented as Server Actions in the `/actions` directory:

-   Type-safe function calls from client components
-   Automatic request/response handling
-   Built-in error handling

### Modular Workflow System

-   **Task Registry** - Type-safe registry of all available workflow modules
-   **Executor Pattern** - Each module has a dedicated executor function
-   **Environment-based Execution** - Isolated execution environment for each workflow run
-   **Phase-based Tracking** - Granular execution phase monitoring

### Type Safety

-   Comprehensive TypeScript types for all workflow components
-   Zod schemas for runtime validation
-   Type-safe task and executor interfaces

## 🚀 Getting Started

### Prerequisites

-   Node.js 18+ and npm/yarn/pnpm
-   Git

### Installation

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd scrape-flow
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Set up environment variables**

    Create a `.env.local` file in the root directory:

    ```env
    # Database
    DATABASE_URL="file:./dev.db"

    # Encryption (generate a random 32-character string)
    ENCRYPTION_KEY="your-32-character-encryption-key"

    # Application URL
    NEXT_PUBLIC_APP_URL="http://localhost:3000"

    # API Secret for cron jobs (generate a random string)
    API_SECRET="your-api-secret"

    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
    CLERK_SECRET_KEY="your-clerk-secret-key"

    # Stripe (Optional - leave empty for demo mode)
    STRIPE_SECRET_KEY=""
    STRIPE_WEBHOOK_SECRET=""
    STRIPE_SMALL_PACK_PRICE_ID=""
    STRIPE_MEDIUM_PACK_PRICE_ID=""
    STRIPE_LARGE_PACK_PRICE_ID=""

    # Google AI (Required for AI extraction module)
    # Users provide their own API key via credentials
    ```

4. **Set up the database**

    ```bash
    npx prisma migrate dev
    npx prisma generate
    ```

5. **Run the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

6. **Open your browser**

    Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
scrape-flow/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Protected dashboard routes
│   │   ├── billing/       # Billing and credits management
│   │   ├── credentials/   # Credential management
│   │   ├── workflows/     # Workflow list and management
│   │   └── (home)/        # Analytics dashboard
│   ├── workflow/          # Workflow editor and execution views
│   ├── api/               # API routes
│   │   ├── webhooks/      # Stripe webhook handler
│   │   └── workflows/     # Workflow execution endpoints
│   ├── about/             # About page
│   ├── pricing/           # Pricing page
│   └── page.tsx           # Landing page
├── actions/               # Server Actions
│   ├── analytics.ts       # Analytics data fetching
│   ├── billing/           # Billing operations
│   ├── credentials/       # Credential CRUD operations
│   └── workflows/         # Workflow CRUD and execution
├── components/            # React components
│   ├── ui/                # Shadcn UI components
│   └── ...                # Custom components
├── lib/                   # Utilities and business logic
│   ├── workflow/          # Workflow execution engine
│   │   ├── executor/      # Module executors
│   │   └── task/          # Task definitions
│   ├── encryption.ts      # Credential encryption
│   ├── prisma.ts          # Prisma client singleton
│   └── stripe/            # Stripe integration
├── prisma/                # Database schema and migrations
│   ├── schema.prisma      # Prisma schema
│   └── migrations/        # Database migrations
└── types/                 # TypeScript type definitions
```

## 🔑 Environment Variables

### Required

| Variable                            | Description                                       |
| ----------------------------------- | ------------------------------------------------- |
| `DATABASE_URL`                      | SQLite database file path (e.g., `file:./dev.db`) |
| `ENCRYPTION_KEY`                    | 32-character key for credential encryption        |
| `NEXT_PUBLIC_APP_URL`               | Full URL of your application                      |
| `API_SECRET`                        | Secret key for authenticating cron job requests   |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key                             |
| `CLERK_SECRET_KEY`                  | Clerk secret key                                  |

### Optional (for Stripe integration)

| Variable                      | Description                                   |
| ----------------------------- | --------------------------------------------- |
| `STRIPE_SECRET_KEY`           | Stripe secret key (leave empty for demo mode) |
| `STRIPE_WEBHOOK_SECRET`       | Stripe webhook signing secret                 |
| `STRIPE_SMALL_PACK_PRICE_ID`  | Stripe price ID for small credit pack         |
| `STRIPE_MEDIUM_PACK_PRICE_ID` | Stripe price ID for medium credit pack        |
| `STRIPE_LARGE_PACK_PRICE_ID`  | Stripe price ID for large credit pack         |

### User-Provided (via Credentials)

Users can add their own API keys through the credentials management interface:

-   Google Generative AI API key (for AI extraction module)

## 🎯 Key Technical Highlights

### Type-Safe Workflow System

-   Complete TypeScript coverage for all workflow components
-   Type-safe task registry prevents runtime errors
-   Compile-time validation of workflow definitions

### Modular Executor Pattern

-   Each workflow module has a dedicated executor function
-   Easy to extend with new modules
-   Isolated execution environments prevent conflicts

### Real-time Execution Tracking

-   Phase-by-phase execution monitoring
-   Detailed logging for debugging
-   Execution history with status tracking

### Security Best Practices

-   Symmetric encryption for sensitive credentials
-   Server-side only credential decryption
-   Authentication-protected routes
-   API secret validation for cron jobs

### Credit-based Resource Management

-   Pay-per-use credit system
-   Automatic credit deduction on workflow execution
-   Credit balance tracking and analytics

### Visual Flow Validation

-   Real-time workflow validation
-   Connection type checking
-   Required input validation

## 🎮 Demo Features

This demo version includes:

-   **200 Free Credits** - New users receive 200 credits upon signup (enough to test all modules multiple times)
-   **Pre-configured Sample Workflow** - Automatically created for new users to get started quickly
-   **Stripe Integration Disabled** - Payment functionality is disabled for demo purposes
-   **No Credit Card Required** - Full access to all features without payment

## 🔮 Future Improvements

-   [ ] Unit and integration tests with Jest/Vitest
-   [ ] Error boundaries for better error handling
-   [ ] Performance optimizations (code splitting, lazy loading)
-   [ ] Additional workflow modules (Screenshot, PDF generation, etc.)
-   [ ] Workflow templates library
-   [ ] Team collaboration features
-   [ ] Advanced scheduling options
-   [ ] Export/import workflows
-   [ ] Workflow versioning

This project is private and for demonstration purposes.

## 👤 Contact

For questions or feedback, please reach out through the repository or your portfolio.

---

Built with ❤️ using Next.js, TypeScript, and modern web technologies.
