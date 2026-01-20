# CLAUDE.md

This file provides guidance for Claude Code when working with this repository.

## Project Overview

FurEver is a configurable demo platform showcasing Stripe Connect and Stripe Connect embedded components. It's a vertical SaaS platform that can be customized for different business verticals (pet grooming, fitness studios, bookstores, etc.) using a zone configuration system.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui components
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Payments**: Stripe Connect with embedded components
- **Node Version**: 22.x

## Project Structure

```
app/
├── (auth)/          # Authentication pages (login, signup)
├── (dashboard)/     # Dashboard pages (requires auth)
├── api/             # API routes
│   ├── account_session/    # Stripe account session
│   ├── auth/               # NextAuth endpoints
│   ├── webhooks/           # Stripe webhooks
│   └── ...
├── components/      # App-specific components
├── contexts/        # React contexts
├── hooks/           # Custom React hooks (including useConnect.ts)
├── models/          # Mongoose models
└── providers/       # Provider components
components/
└── ui/              # shadcn/ui components
lib/
├── auth.ts          # Authentication utilities
├── dbConnect.ts     # MongoDB connection
├── stripe.ts        # Stripe client initialization
├── utils.ts         # General utilities
└── zoneConfig.ts    # Zone configuration loader
types/               # TypeScript type definitions
```

## Development Commands

```bash
# Install dependencies
yarn

# Run development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start

# Lint code (ESLint + Prettier check)
yarn lint

# Format code with Prettier
yarn prettier

# Type check
yarn typescript

# Full validation (lint + typecheck)
yarn validate-change
```

## Key Patterns

### Path Aliases
Use `@/*` for imports from project root:
```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
```

### Zone Configuration
The platform uses a zone configuration system for customization. Configuration files are JSON (e.g., `furever.zone.json`). Set `ZONE_CONFIG_PATH` in `.env` to change the active configuration.

### Stripe Connect Integration
- Client integration: `app/hooks/useConnect.ts`
- Server endpoint: `app/api/account_session/route.ts`
- Webhook handler: `app/api/webhooks/route.ts`

### Authentication
Uses NextAuth.js with credentials provider. Auth utilities in `lib/auth.ts`.

## Environment Variables

Required variables (see `.env.example`):
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_PUBLIC_KEY` - Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - Webhook signing secret
- `NEXTAUTH_URL` - Application URL
- `NEXTAUTH_SECRET` - Session encryption secret
- `MONGO_URI` - MongoDB connection string
- `ZONE_CONFIG_PATH` - Zone config file path (optional, defaults to furever.zone.json)

## Code Style

- ESLint extends `next/core-web-vitals`
- Prettier for formatting (check `.prettierrc`)
- TypeScript strict mode enabled
- Run `yarn validate-change` before committing

## Testing Stripe Webhooks

```bash
# In a separate terminal, forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks

# Trigger test events
stripe trigger payment_intent.succeeded
```

## Preview Components

Preview components are disabled by default. To enable:
1. Request access via Stripe documentation
2. Set `NEXT_PUBLIC_ENABLE_PREVIEW_COMPONENTS=1` in `.env`
