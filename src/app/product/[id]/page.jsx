import { getProductById } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const product = await getProductById(parseInt(params.id));
  
  return {
    title: product ? `${product.title} | RevoShop` : 'Product Not Found',
    description: product?.description || 'Product details not available',
  };
}

export default async function ProductPage({ params }) {
  const productId = parseInt(params.id);
  const product = await getProductById(productId);
  
  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Produk Tidak Ditemukan</h1>
        <p className="text-gray-600 mb-8">Produk yang kamu cari tidak ada.</p>
        <Link href="/" className="text-blue-500 underline">Kembali ke Home</Link>
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
          
          <button className="btn btn-primary w-full" onClick={() => alert('Fitur add to cart coming soon!')}>
            Add to Cart
          </button>
        </div>
      </div>
      
      <div className="mt-8">
        <Link href="/" className="text-blue-500 underline">← Kembali ke Home</Link>
      </div>
    </main>
  );
}