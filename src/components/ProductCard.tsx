import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
}

const ProductCard = ({ id, title, price, image }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
      <Link href={`/product/${id}`}>
        <div className="h-48 relative">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold truncate">{title}</h3>
          <p className="text-xl font-bold text-primary mt-2">${price.toFixed(2)}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <button className="btn btn-primary w-full">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 