# Brian M. Burudi Portfolio

A production-ready executive portfolio website for **Brian M. Burudi** — B2B Sales Lead, Business Development, and Strategic Partnerships professional based in Nairobi, Kenya.

The site positions Brian for recruiters, executives, employers, partners, consulting clients, investors, and organizations seeking commercial growth leadership across electric mobility, healthcare, sustainability, fintech, conservation, connectivity, and technology-enabled services.

## Technology stack

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- shadcn-style local UI primitives
- PostgreSQL on Neon
- Drizzle ORM and Drizzle Kit
- React Server Components
- Next.js Route Handlers and Server Actions
- Zod validation
- Resend email notifications, optional
- Lucide React icons
- Framer Motion for subtle reduced-motion-aware reveals
- Vercel deployment target

## Folder structure

```text
src/app/                App Router routes, metadata, APIs, admin pages
src/app/api/contact     Contact form route handler
src/app/admin           Protected content-management dashboard
src/components          Public, admin, UI, form, SEO, and layout components
src/db                  Drizzle client and schema
src/lib                 Content constants, data access, auth, validators, utilities
scripts/seed.mjs        Safe verified-content seed script
public/                 CV, portrait placeholder, and deployable static assets
```

## Local installation

```bash
npm install
cp .env.example .env
npm run dev
```

The app is designed to run with:

```bash
npm install
npm run dev
npm run build
```

## Environment variables

Create `.env` locally and add values:

```bash
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
AUTH_SECRET="generate-a-strong-random-secret-at-least-32-characters"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="a-long-private-admin-password"
RESEND_API_KEY="optional"
CONTACT_NOTIFICATION_EMAIL="optional@example.com"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Never commit real secrets.

## Creating a Neon project

1. Create a Neon account and project.
2. Create or select the production database.
3. Copy the pooled connection string for `DATABASE_URL`.
4. Copy the direct connection string for `DIRECT_URL` if you use migration tooling that requires it.
5. Add both values to `.env` locally and to Vercel project settings.

## Database migrations

Generate a Drizzle migration after schema changes:

```bash
npx drizzle-kit generate
```

Apply the schema directly to a fresh development database:

```bash
npx drizzle-kit push
```

The current Drizzle config points to a local PostgreSQL URL for sandbox development. For Neon environments, ensure `DATABASE_URL` is configured in the environment where commands run.

## Seeding verified portfolio content

After applying the schema, run:

```bash
node scripts/seed.mjs
```

The seed script is safe to rerun. It uses conflict handling to avoid duplicating verified experience entries, metrics, case studies, certifications, site settings, and the configured admin user.

## Admin authentication setup

The admin area is available at `/admin` and login is at `/admin/login`.

- There is no public sign-up.
- The first administrator is configured with `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- The login flow stores only an HTTP-only, same-site, secure-in-production session cookie.
- Plain-text passwords are not stored in the database.
- Use a strong `AUTH_SECRET` of at least 32 characters.

To create the first administrator securely:

1. Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and `AUTH_SECRET` locally or in Vercel.
2. Apply migrations.
3. Run `node scripts/seed.mjs`, or sign in once and the configured admin record will be created.
4. Keep `ADMIN_PASSWORD` private and rotate it through environment configuration when needed.

## Admin dashboard features

The protected dashboard supports:

- Overview statistics
- Add, edit, publish, unpublish, reorder, and delete experience entries
- Manage impact metrics
- Manage case studies
- Manage certifications
- View and update contact-submission status
- Update public contact information
- Replace the portrait path or URL
- Replace the downloadable CV path or URL
- Preview public content
- Confirmation prompts before deletion
- Toast-style success feedback through redirect messages

## Contact form

The contact form includes:

- Client-side and server-side Zod validation
- Honeypot spam protection
- In-memory rate limiting
- PostgreSQL persistence through Drizzle
- Optional Resend email notification if `RESEND_API_KEY` and `CONTACT_NOTIFICATION_EMAIL` are configured
- A privacy notice and consent checkbox

## Portrait and CV replacement

Expected portrait filename:

```text
public/Brian.jpeg
```

The application uses `next/image` and will automatically use `/Brian.jpeg` when present. A professional monogram placeholder is included only so the application remains functional in environments where the supplied photograph has not yet been copied into `public/`.

Downloadable CV path:

```text
public/Brian-M-Burudi-CV.pdf
```

To replace the CV, overwrite that file or update the `cvUrl` setting in `/admin` to a durable hosted asset path.

## Vercel deployment

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Create a new Vercel project.
3. Connect the repository.
4. Add environment variables:
   - `DATABASE_URL`
   - `DIRECT_URL`
   - `AUTH_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `RESEND_API_KEY`, optional
   - `CONTACT_NOTIFICATION_EMAIL`, optional
   - `NEXT_PUBLIC_SITE_URL`
5. Deploy.
6. Run migrations against Neon from a secure local environment or CI step.
7. Run `node scripts/seed.mjs` after the schema is ready.

## Connecting a custom domain

1. In Vercel, open Project Settings → Domains.
2. Add the desired domain.
3. Follow Vercel’s DNS instructions.
4. Update `NEXT_PUBLIC_SITE_URL` to the production domain.
5. Redeploy so canonical URLs, sitemap, and Open Graph metadata use the correct domain.

## SEO and discoverability

Implemented:

- Per-page metadata
- Canonical URLs
- Open Graph and Twitter/X cards
- Dynamic Open Graph image
- Sitemap and robots routes
- Person and ProfilePage structured data
- Breadcrumb structured data on internal pages
- Semantic headings and accessible image alt text

## Accessibility notes

The site includes a skip-to-content link, visible focus states, semantic landmarks, accessible form labels and errors, keyboard-friendly navigation, reduced-motion handling, strong color contrast, and minimum touch-target sizing.

## Troubleshooting

### Database connection errors

Confirm `DATABASE_URL` is present and points to a reachable PostgreSQL or Neon database. Apply the schema with `npx drizzle-kit push` before testing admin or contact submissions.

### Admin login fails

Check `AUTH_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`. Ensure the database schema exists and the password is at least 8 characters.

### Contact form does not send email

Submissions are saved to the database even if Resend is not configured. To enable notifications, add `RESEND_API_KEY` and `CONTACT_NOTIFICATION_EMAIL` server-side.

### Portrait placeholder appears

Copy Brian’s supplied photo to `public/Brian.jpeg` or update `portraitUrl` in `/admin` to a valid public path.

### Seed duplicates

The seed script uses unique constraints and `ON CONFLICT` updates. If duplicates appear, verify the schema constraints were applied before running the seed.

## Content-verification notes

All published experience, metrics, education, certifications, and case-study content are based on the supplied CV and verified instructions.

**Roles, dates, and achievements for SasaPay, Peleza, and Byon must be verified with Brian before being published.**

These organizations are included in the public organization wall and as unpublished database placeholders only. Do not publish role titles, dates, descriptions, or achievements for them until Brian confirms the details.
