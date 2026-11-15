"use client"

import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { whatsappLink } from "@/lib/site"
import { useSitePreferences } from "@/components/site-preferences"
import { productTranslations } from "@/lib/i18n"

interface Product {
  id: string
  name: string
  category: string
  price: number
  image_url: string
  in_stock: boolean
  description: string
}

interface ProductCopy {
  name: string
  category: string
  description: string
}

const CATEGORIES = [
  { value: "Todos", labelKey: "all" },
  { value: "Audio", labelKey: "audio" },
  { value: "Equipos", labelKey: "equipment" },
  { value: "Móviles", labelKey: "mobile" },
  { value: "Periféricos", labelKey: "peripherals" },
] as const

const priceFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
})

function getDisplayProduct(product: Product, locale: "es" | "en" | "fr") {
  const copy = (productTranslations[locale] as Record<string, ProductCopy | undefined>)[product.name]
  return copy ? { ...product, ...copy } : product
}

export default function ProductsSection() {
  const { locale, t } = useSitePreferences()
  const [activeCategory, setActiveCategory] = useState("Todos")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function loadProducts() {
      try {
        const supabase = getSupabaseBrowserClient()
        const { data, error: queryError } = await supabase
          .from("products")
          .select("id, name, category, price, image_url, in_stock, description")
          .order("created_at", { ascending: false })

        if (queryError) {
          throw new Error(`No se pudo cargar el catálogo: ${queryError.message}`)
        }

        if (!cancelled) {
          setProducts(data ?? [])
        }
      } catch (loadError) {
        if (!cancelled) {
          setError(loadError instanceof Error ? loadError.message : "No se pudo cargar el catálogo.")
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      cancelled = true
    }
  }, [])

  const filteredProducts = useMemo(
    () =>
      activeCategory === "Todos"
        ? products
        : products.filter((product) => product.category === activeCategory),
    [activeCategory, products],
  )

  function handleWhatsAppBuy(productName: string) {
    window.open(
      whatsappLink(`${t.products.buyMessage} ${productName}.`),
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <section
      id="productos"
      className="bg-zinc-100 px-6 py-20 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 md:px-16"
    >
      <div className="mx-auto max-w-7xl space-y-10">
        <div className="space-y-3">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            {t.products.available}
          </span>
          <h2 className="text-3xl font-bold tracking-tight md:text-5xl">{t.products.title}</h2>
          <p className="max-w-2xl text-zinc-600 dark:text-zinc-400">
            {t.products.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2" aria-label="Filtrar productos">
          {CATEGORIES.map((category) => (
            <button
              key={category.value}
              type="button"
              aria-pressed={activeCategory === category.value}
              onClick={() => setActiveCategory(category.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                activeCategory === category.value
                  ? "bg-zinc-900 text-white shadow-sm dark:bg-white dark:text-zinc-900"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:border-primary/30 hover:text-primary dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
              }`}
            >
              {category.value === "Todos"
                ? t.products.all
                : t.products[category.labelKey as "audio" | "equipment" | "mobile" | "peripherals"]}
            </button>
          ))}
        </div>

        {isLoading && <p className="text-zinc-600 dark:text-zinc-400">{t.products.loading}</p>}

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-rose-500/30 bg-rose-50 p-4 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300"
          >
            {error}
          </p>
        )}

        {!isLoading && !error && filteredProducts.length === 0 && (
          <p className="rounded-xl border border-zinc-200 bg-white p-8 text-center text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
            {t.products.empty}
          </p>
        )}

        {!isLoading && !error && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => {
              const displayProduct = getDisplayProduct(product, locale)

              return (
                <article
                  key={product.id}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
                >
                <div className="flex flex-1 flex-col">
                  <div className="relative aspect-square w-full overflow-hidden bg-zinc-50 dark:bg-zinc-950">
                    <Image
                      src={product.image_url}
                      alt={displayProduct.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                    <span
                      className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        product.in_stock
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                          : "bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                      }`}
                    >
                      {product.in_stock ? t.products.availableStatus : t.products.outStatus}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col gap-2 p-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                      {displayProduct.category}
                    </span>
                    <h3 className="line-clamp-2 text-base font-medium leading-snug text-zinc-900 dark:text-zinc-100">
                      {displayProduct.name}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {displayProduct.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 border-t border-zinc-100 p-4 dark:border-zinc-800">
                  <span className="block text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                    {priceFormatter.format(product.price)}
                  </span>
                  <button
                    type="button"
                    disabled={!product.in_stock}
                    onClick={() => handleWhatsAppBuy(displayProduct.name)}
                    className={`w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
                      product.in_stock
                        ? "bg-primary text-primary-foreground hover:bg-primary/90"
                        : "cursor-not-allowed bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
                    }`}
                  >
                    {product.in_stock ? t.actions.consult : t.actions.outOfStock}
                  </button>
                </div>
                </article>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
