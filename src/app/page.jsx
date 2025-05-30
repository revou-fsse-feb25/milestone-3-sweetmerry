import { getAllProducts } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 3600; // Revalidate every hour

export async function generateMetadata() {
  return {
    title: 'RevoShop - Your One-Stop Shop',
    description: 'Browse our collection of high-quality products at great prices.',
  };
}

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <main className="container-custom py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Welcome to RevoShop</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link 
            href={`/product/${product.id}`} 
            key={product.id}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <div className="relative h-48">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h2>
                <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}