'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  inStock: boolean;
  description: string;
}

const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Auriculares Lenovo RS106',
    category: 'Audio',
    price: '$XX.XXX',
    image: '/products/lenovo-rs106.jpg',
    inStock: true,
    description: 'Auriculares inalámbricos de alta definición y baja latencia.',
  },
  {
    id: '2',
    name: 'Tablet Lenovo M11"',
    category: 'Equipos',
    price: '$XXX.XXX',
    image: '/products/lenovo-tablet.jpg',
    inStock: true,
    description: 'Ideal para estudio, entretenimiento y productividad diaria.',
  },
  {
    id: '3',
    name: 'Xiaomi 12T 128GB/8GB',
    category: 'Móviles',
    price: '$X.XXX.XXX',
    image: '/products/xiaomi-12t.jpg',
    inStock: false,
    description: 'Cámara de 108MP, carga ultra rápida de 120W y pantalla AMOLED.',
  },
];

const CATEGORIES = ['Todos', 'Audio', 'Equipos', 'Móviles', 'Periféricos'];

export default function ProductsSection() {
  const [activeCategory, setActiveCategory] = useState('Todos');

  const filteredProducts = activeCategory === 'Todos'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleWhatsAppBuy = (productName: string) => {
    const text = encodeURIComponent(`¡Hola LS Solutions! Estoy interesado en comprar: ${productName}.`);
    window.open(`https://wa.me/573000000000?text=${text}`, '_blank');
  };

  return (
    <section id="productos" className="bg-[#121212] text-white py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header de la sección */}
        <div className="space-y-3">
          <span className="inline-flex items-center px-3 py-1 text-xs text-zinc-400 bg-zinc-800/60 border border-zinc-700/50 rounded-full">
            Catálogo disponible
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Componentes y Accesorios
          </h2>
          <p className="text-zinc-400 max-w-2xl">
            Equipos y accesorios seleccionados con garantía y soporte directo de LS Solutions.
          </p>
        </div>

        {/* Filtros por Categoría */}
        <div className="flex flex-wrap gap-2 border-b border-zinc-800 pb-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat
                  ? 'bg-white text-black'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-zinc-900/60 border border-zinc-800/80 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 group"
            >
              <div>
                {/* Imagen del producto */}
                <div className="relative h-52 w-full bg-zinc-950 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-semibold rounded-full backdrop-blur-md ${
                      product.inStock
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {product.inStock ? 'Disponible' : 'Agotado'}
                  </span>
                </div>

                {/* Info del producto */}
                <div className="p-5 space-y-2">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-bold text-white group-hover:text-zinc-200">
                    {product.name}
                  </h3>
                  <p className="text-sm text-zinc-400 line-clamp-2">
                    {product.description}
                  </p>
                </div>
              </div>

              {/* Footer de la Card: Precio y Acción */}
              <div className="p-5 pt-0 flex items-center justify-between mt-4">
                <span className="text-xl font-extrabold text-white">
                  {product.price}
                </span>
                <button
                  disabled={!product.inStock}
                  onClick={() => handleWhatsAppBuy(product.name)}
                  className={`px-4 py-2 text-xs font-semibold rounded-full transition-all flex items-center gap-2 ${
                    product.inStock
                      ? 'bg-white text-black hover:bg-zinc-200'
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                  }`}
                >
                  {product.inStock ? 'Consultar' : 'Sin Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}