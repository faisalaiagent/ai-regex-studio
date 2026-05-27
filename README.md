# AI Regex Studio

> The most powerful AI-powered regex tool for developers. Generate regex from natural language, test live, understand every symbol, save & share. Built with Next.js 15, Gemini AI, and Prisma.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![Prisma](https://img.shields.io/badge/Prisma-5.0-2D3748?logo=prisma)](https://prisma.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## ✨ Features

| Feature | Free | Pro |
|---|---|---|
| AI Regex Generator (Gemini) | 20/day | Unlimited |
| Live Regex Tester (Monaco) | ✅ | ✅ |
| AI Regex Explainer | 20/day | Unlimited |
| Save Snippets | Up to 25 | Unlimited |
| Folder Organization | ✅ | ✅ |
| Share Public Links | ✅ | ✅ SEO pages |
| Multi-Flavor Support (JS/Python/PCRE/Java) | ✅ | ✅ |
| Export JSON/TXT | ✅ | ✅ |
| Regex Optimizer & Simplifier | ❌ | ✅ |
| API Access | ❌ | ✅ |
| Team Workspace | ❌ | Team plan |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS + shadcn/ui |
| Animation | Framer Motion |
| Code Editor | Monaco Editor |
| AI | Google Gemini 1.5 Flash |
| Auth | NextAuth v5 (Google OAuth) |
| Database | PostgreSQL + Prisma ORM |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database (local or hosted — see [Neon](https://neon.tech) for free PostgreSQL)
- Google Cloud project with OAuth credentials
- Google AI Studio API key (Gemini)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ai-regex-studio.git
cd ai-regex-studio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
# Database — PostgreSQL connection string
DATABASE_URL="postgresql://username:password@localhost:5432/ai_regex_studio"

# NextAuth — generate with: openssl rand -base64 32
AUTH_SECRET="your-secret-here"
AUTH_URL="http://localhost:3000"

# Google OAuth
# Create at: https://console.cloud.google.com/apis/credentials
# Authorized redirect URIs: http://localhost:3000/api/auth/callback/google
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"

# Gemini AI
# Get free API key at: https://aistudio.google.com/apikey
GEMINI_API_KEY="your-gemini-api-key"

# App config
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="AI Regex Studio"

# Usage limits (requests per day)
GUEST_DAILY_LIMIT=3
FREE_DAILY_LIMIT=20
```

### 4. Set Up the Database

```bash
# Generate Prisma client
npm run db:generate

# Push schema to your database
npm run db:push

# (Optional) Open Prisma Studio
npm run db:studio
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 📁 Project Structure

```
ai-regex-studio/
├── app/                          # Next.js App Router
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth handlers
│   │   ├── regex/
│   │   │   ├── generate/         # POST — AI regex generation
│   │   │   └── explain/          # POST — AI regex explanation
│   │   └── snippets/             # GET, POST — snippet management
│   ├── auth/
│   │   ├── signin/               # Sign-in page
│   │   └── error/                # Auth error page
│   ├── blog/                     # Blog listing page
│   ├── dashboard/                # User dashboard + templates
│   ├── docs/                     # Documentation page
│   ├── explainer/                # AI Regex Explainer page
│   ├── generator/                # AI Regex Generator page
│   ├── pricing/                  # Pricing page
│   ├── privacy/                  # Privacy policy
│   ├── terms/                    # Terms of service
│   ├── tester/                   # Live Regex Tester page
│   ├── globals.css               # Global styles + CSS variables
│   └── layout.tsx                # Root layout + metadata
│
├── components/
│   ├── auth/
│   │   └── signin-form.tsx       # Google OAuth sign-in button
│   ├── landing/
│   │   ├── hero.tsx              # Landing hero section
│   │   ├── features.tsx          # Feature grid
│   │   ├── demo.tsx              # Live demo section
│   │   ├── pricing.tsx           # Pricing cards
│   │   ├── faq.tsx               # FAQ accordion
│   │   └── footer.tsx            # Site footer
│   ├── layout/
│   │   ├── navbar.tsx            # Navigation bar
│   │   ├── theme-provider.tsx    # Dark/light mode provider
│   │   └── theme-toggle.tsx      # Theme toggle button
│   ├── regex/
│   │   ├── generator.tsx         # AI Generator component
│   │   ├── tester.tsx            # Live Tester component (Monaco)
│   │   └── explainer.tsx         # AI Explainer component
│   └── ui/                       # shadcn/ui components
│       ├── button.tsx
│       ├── badge.tsx
│       ├── textarea.tsx
│       ├── toast.tsx
│       └── toaster.tsx
│
├── hooks/
│   └── use-toast.ts              # Toast notification hook
│
├── lib/
│   ├── auth.ts                   # NextAuth configuration
│   ├── gemini.ts                 # Gemini AI client + prompts
│   ├── prisma.ts                 # Prisma client singleton
│   ├── regex-utils.ts            # Client-side regex testing utilities
│   ├── usage.ts                  # Usage tracking + limit checks
│   └── utils.ts                  # cn() utility
│
├── prisma/
│   └── schema.prisma             # Database schema
│
├── types/
│   └── index.ts                  # Shared TypeScript types
│
├── .env.example                  # Environment variables template
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🗄️ Database Schema

Key models in `prisma/schema.prisma`:

- **User** — auth, plan (GUEST/FREE/PRO/TEAM)
- **Account / Session** — NextAuth OAuth accounts
- **RegexSnippet** — saved patterns with tags, folders, public flag
- **Folder** — snippet organization with color
- **SharedRegex** — public share links with slug + view count
- **UsageTracking** — per-action daily usage records
- **Subscription** — plan billing info (Stripe-ready)

---

## 🤖 AI Integration

Gemini 1.5 Flash is used for:

1. **Generate** (`lib/gemini.ts → generateRegex`) — structured JSON output: pattern, flags, explanation, examples, edge cases, multi-flavor variants, complexity rating

2. **Explain** (`lib/gemini.ts → explainRegex`) — token-by-token breakdown with type classification, beginner/technical modes, simplified and optimized variants

3. **Correct** (`lib/gemini.ts → correctRegex`) — auto-fix a broken regex based on error + intent

All AI calls use `responseMimeType: "application/json"` for reliable structured output. Temperature is set low (0.3) for consistency.

---

## 🔒 Security

- Input validation with Zod on all API routes
- Rate limiting via database usage tracking (per-user, per-action, per-day)
- Sanitized HTML output for regex match highlighting
- CSRF protection via NextAuth session tokens
- Environment variables for all secrets
- Prisma parameterized queries (SQL injection prevention)

---

## 🌐 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add all environment variables from `.env.example`
4. Deploy

### 3. Set Up Production Database

Use [Neon](https://neon.tech) (free PostgreSQL with Vercel integration):

1. Create a Neon project
2. Copy the connection string to `DATABASE_URL` in Vercel env vars
3. Run `npm run db:push` with your production DATABASE_URL

### 4. Configure Google OAuth for Production

Add to **Authorized redirect URIs** in Google Cloud Console:
```
https://your-app.vercel.app/api/auth/callback/google
```

Update `AUTH_URL` in Vercel env vars to your production URL.

---

## 📈 Google AdSense Approval

This app is structured for AdSense approval:

- ✅ Privacy Policy page (`/privacy`)
- ✅ Terms of Service page (`/terms`)
- ✅ Original, high-quality content (blog posts, docs)
- ✅ Clear navigation and site structure
- ✅ No copyrighted/scraped content
- ✅ Substantial tools with real utility (generator, tester, explainer)
- ✅ SEO-optimized pages with metadata and Open Graph tags

**Recommendation:** Before applying for AdSense, publish at least 3 blog posts and ensure the app has at least 2–3 weeks of organic traffic.

---

## 🛣️ Roadmap

- [ ] Stripe payment integration
- [ ] Team workspace feature
- [ ] Regex visual flow diagram
- [ ] Browser extension
- [ ] VS Code extension
- [ ] Community regex library
- [ ] AI regex correction (auto-fix broken patterns)
- [ ] REST API with key management

---

## 📄 License

MIT — free to use, modify, and deploy.

---

## 🙏 Contributing

Contributions are welcome! Please open an issue first to discuss major changes.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes
4. Push and open a Pull Request

---

Built with ❤️ for developers who spend too much time Googling regex syntax.
