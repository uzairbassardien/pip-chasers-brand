# Pip Chasers

A React, TypeScript, and Vite website for Pip Chasers, with a Supabase-powered admin panel.

## Run locally

```sh
npm install
npm run dev
```

## Connect Supabase and set up the admin panel

1. Create a project at [supabase.com](https://supabase.com/).
2. In Project Settings → API, copy the Project URL and the anon/publishable key.
3. Copy `.env.example` to `.env.local` and replace its placeholder values. In PowerShell:

   ```powershell
   Copy-Item .env.example .env.local
   ```

   ```dotenv
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-or-publishable-key
   ```

   The publishable key can also be named `VITE_SUPABASE_PUBLISHABLE_KEY`. Never put a `service_role` key in this Vite app; browser environment variables are public.

4. Open the Supabase SQL Editor and run [`supabase/schema.sql`](./supabase/schema.sql).
5. In Authentication → Users, invite or create your administrator account.
6. In the SQL Editor, grant that account admin access, replacing the email:

   ```sql
   insert into public.admin_users (user_id)
   select id from auth.users where email = 'you@example.com';
   ```

   Confirm one row was inserted. Only users in `admin_users` can read inquiries or manage testimonials.
7. Restart the Vite server, then visit `/admin` and sign in with that account.

The admin panel manages contact inquiries, testimonials, and anonymous button-click totals. The public contact form saves inquiries to Supabase and opens WhatsApp as before. Published testimonials are read from Supabase on the public site; when there are no published database records, the existing built-in testimonials remain visible.

To enable button analytics on an existing project, rerun [`supabase/schema.sql`](./supabase/schema.sql) in the SQL Editor **before deploying the click-tracking code**. This creates the daily aggregate table and its restricted batch-write function. Only allowlisted action names can be recorded. The site batches clicks and stores one counter per action per day; it does not store individual click records, visitor identifiers, or personal data. The admin panel reads aggregate counts for the last 30 days.

### Security and operations

- Row Level Security is enabled for all tables. Public visitors can submit inquiries and read published testimonials, but cannot read inquiry data.
- Use Supabase Auth's invite flow for administrators; do not enable public sign-ups for the admin panel.
- Because the inquiry form accepts public submissions, configure Supabase CAPTCHA / rate limits before production if you expect abuse.
- For production hosting, set the same `VITE_SUPABASE_URL` and anon/publishable key in the hosting provider's environment settings, then rebuild the site.
