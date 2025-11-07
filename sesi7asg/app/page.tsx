'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductCard = ({ product }: { product: Product }) => {
  
  return (
    <div 
      className="bg-white p-5 rounded-xl shadow-lg transition-all duration-300 border border-gray-100 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6"
    >
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-24 object-cover rounded-lg flex-shrink-0"
        onError={(e) => { e.currentTarget.src = 'https://placehold.co/150x150/607D8B/FFFFFF?text=Image+Error'; }}
      />
      
      <div className="flex-grow text-center md:text-left">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">{product.title}</h2>
      </div>

      <div className="flex flex-col items-center md:items-end flex-shrink-0">
        <Link href={`/products/${product.id}`} className='hover:bg-indigo-600 hover:text-white duration-300 text-indigo-600 outline-solid border-indigo-600 p-3 rounded-xl'>View Details</Link>
      </div>
    </div>
  );
};

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="space-y-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/products');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data: Product[] = await response.json();
          
          setProducts(data.slice(0, 5)); 
          setError(null);
          setLoading(false);
          
        } catch (err) {
          setError("Failed to fetch products after multiple retries. Please check the network.");
          setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center p-8 text-xl font-medium text-indigo-500">
          Loading products... 
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center p-8 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          Error: {error}
        </div>
      );
    }

    return <ProductList products={products} />;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-10 p-6 bg-white rounded-xl shadow-lg">
          <h1 className="text-4xl font-extrabold text-indigo-600 tracking-tight">
            Product Catalog
          </h1>
        </header>
        {renderContent()}
      </div>
    </div>
  );
};

export default App;