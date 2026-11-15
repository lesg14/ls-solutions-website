create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  price numeric(12, 0) not null check (price >= 0),
  image_url text not null,
  in_stock boolean not null default true,
  description text not null,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

drop policy if exists "Anyone can read products" on public.products;
create policy "Anyone can read products"
  on public.products
  for select
  to anon, authenticated
  using (true);

insert into public.products (name, category, price, image_url, in_stock, description)
values
  (
    'Auriculares Lenovo RS106',
    'Audio',
    89900,
    'https://pcktreuddnskzheqjiki.supabase.co/storage/v1/object/public/products/lenovo-rs106.PNG',
    true,
    'Auriculares inalámbricos de alta definición y baja latencia.'
  ),
  (
    'Tablet Lenovo M11',
    'Equipos',
    899900,
    'https://pcktreuddnskzheqjiki.supabase.co/storage/v1/object/public/products/lenovo-tablet.JPG',
    true,
    'Ideal para estudio, entretenimiento y productividad diaria.'
  ),
  (
    'Xiaomi 12T 128GB/8GB',
    'Móviles',
    1299900,
    'https://pcktreuddnskzheqjiki.supabase.co/storage/v1/object/public/products/xiaomi-12t-2.JPG',
    false,
    'Cámara de 108MP, carga ultrarrápida de 120W y pantalla AMOLED.'
  )
on conflict do nothing;
