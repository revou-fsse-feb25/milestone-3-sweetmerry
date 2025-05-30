'use client';

import { getProductById } from '@/lib/api';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(parseInt(params.id));
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container-custom py-16 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
        <Link href="/" className="text-blue-500 underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <main className="container-custom py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="relative h-96 bg-white rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-8"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
        </div>
        
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-2xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>
          
          <div className="bg-gray-100 px-4 py-2 rounded mb-6">
            <div className="flex items-center">
              <span className="text-yellow-500">★★★★</span>
              <span className="ml-2 text-gray-600">{product.rating.rate} ({product.rating.count} reviews)</span>
            </div>
          </div>
          
          <p className="mb-6">{product.description}</p>
          
          <button 
            className="btn btn-primary w-full"
            onClick={() => {
              addToCart(product);
              alert('Product added to cart!');
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        <Link href="/" className="text-blue-500 underline">← Back to Home</Link>
      </div>
    </main>
  );
}