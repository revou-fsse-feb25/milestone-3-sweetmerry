import { getProductById } from '@/lib/api';

export async function generateMetadata({ params }) {
  const product = await getProductById(parseInt(params.id));
  
  return {
    title: product ? `${product.title} | RevoShop` : 'Product Not Found',
    description: product?.description || 'Product details not available',
  };
} 