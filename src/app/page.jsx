'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/api';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      setError('');
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError('Gagal mengambil data produk.');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to RevoShop</h1>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Belanja produk keren dengan harga terjangkau. Semua produk diambil dari FakeStoreAPI.
        </p>
        <h2 className="text-2xl font-semibold mb-6">Daftar Produk</h2>
        {loading && <div className="text-center">Loading...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!loading && !error && products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
}