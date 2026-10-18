create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null check (length(trim(full_name)) between 1 and 120),
  email text not null check (length(trim(email)) between 3 and 320),
  subject text not null check (length(trim(subject)) between 1 and 160),
  message text not null check (length(trim(message)) between 1 and 5000),
  status text not null default 'new' check (status in ('new', 'read', 'replied')),
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) between 1 and 100),
  role text not null check (length(trim(role)) between 1 and 100),
  content text not null check (length(trim(content)) between 1 and 1200),
  rating integer not null default 5 check (rating between 1 and 5),
  category text not null default 'Trading' check (length(trim(category)) between 1 and 50),
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.button_click_stats (
  action_key text not null,
  click_date date not null default current_date,
  clicks bigint not null default 0 check (clicks >= 0),
  primary key (action_key, click_date)
);

alter table public.admin_users enable row level security;
alter table public.inquiries enable row level security;
alter table public.testimonials enable row level security;
alter table public.button_click_stats enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create or replace function public.record_button_clicks(p_clicks jsonb)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_action text;
  v_count integer;
  v_total integer := 0;
  v_item record;
begin
  if jsonb_typeof(p_clicks) <> 'object' then
    raise exception 'Click counts must be a JSON object';
  end if;

  for v_item in select * from jsonb_each_text(p_clicks)
  loop
    v_action := v_item.key;
    v_count := v_item.value::integer;

    if v_action not in (
      'join_now',
      'join_pip_chasers',
      'view_services',
      'send_message',
      'signals_monthly',
      'signals_yearly',
      'mentorship_monthly',
      'mentorship_yearly',
      'mentorship_lifetime',
      'service_learn_more',
      'gallery_view_more'
    ) then
      raise exception 'Unknown button action';
    end if;

    if v_count < 1 or v_count > 100 then
      raise exception 'Click batch counts must be between 1 and 100';
    end if;

    v_total := v_total + v_count;
    if v_total > 100 then
      raise exception 'Click batch cannot exceed 100 clicks';
    end if;

    insert into public.button_click_stats (action_key, click_date, clicks)
    values (v_action, current_date, v_count)
    on conflict (action_key, click_date)
    do update set clicks = public.button_click_stats.clicks + excluded.clicks;
  end loop;
end;
$$;

revoke all on function public.record_button_clicks(jsonb) from public;
grant execute on function public.record_button_clicks(jsonb) to anon, authenticated;

revoke all on public.admin_users from anon, authenticated;
revoke all on public.inquiries from anon, authenticated;
revoke all on public.testimonials from anon, authenticated;
revoke all on public.button_click_stats from anon, authenticated;
grant insert on public.inquiries to anon, authenticated;
grant select, update, delete on public.inquiries to authenticated;
grant select on public.testimonials to anon;
grant select, insert, update, delete on public.testimonials to authenticated;
grant select on public.button_click_stats to authenticated;

drop policy if exists "Anyone can submit an inquiry" on public.inquiries;
create policy "Anyone can submit an inquiry"
  on public.inquiries for insert to anon, authenticated
  with check (status = 'new');

drop policy if exists "Admins can read inquiries" on public.inquiries;
create policy "Admins can read inquiries"
  on public.inquiries for select to authenticated
  using (public.is_admin());

drop policy if exists "Admins can update inquiries" on public.inquiries;
create policy "Admins can update inquiries"
  on public.inquiries for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete inquiries" on public.inquiries;
create policy "Admins can delete inquiries"
  on public.inquiries for delete to authenticated
  using (public.is_admin());

drop policy if exists "Anyone can read published testimonials" on public.testimonials;
create policy "Anyone can read published testimonials"
  on public.testimonials for select to anon
  using (is_published);

drop policy if exists "Authenticated users can read testimonials" on public.testimonials;
create policy "Authenticated users can read testimonials"
  on public.testimonials for select to authenticated
  using (is_published or public.is_admin());

drop policy if exists "Admins can add testimonials" on public.testimonials;
create policy "Admins can add testimonials"
  on public.testimonials for insert to authenticated
  with check (public.is_admin());

drop policy if exists "Admins can update testimonials" on public.testimonials;
create policy "Admins can update testimonials"
  on public.testimonials for update to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "Admins can delete testimonials" on public.testimonials;
create policy "Admins can delete testimonials"
  on public.testimonials for delete to authenticated
  using (public.is_admin());

drop policy if exists "Admins can read button click stats" on public.button_click_stats;
create policy "Admins can read button click stats"
  on public.button_click_stats for select to authenticated
  using (public.is_admin());

-- After creating/inviting your admin in Authentication > Users, allow that account:
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'you@example.com';
