'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

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

export default function ProductDetailPage() {
    const params = useParams();
    const productId = params.slug as string;
    
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {

    }, []);

    const handleToggleFavorite = () => {
        const newFavoriteState = !isFavorite;
        setIsFavorite(newFavoriteState);
    };

    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true);
                const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
                
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                
                const data = await response.json();
                setProduct(data);
            } catch (e) {
                setError(`Error loading product ${productId}`);
            } finally {
                setLoading(false);
            }
        }

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    if (loading) {
        return <div className="text-center p-8">Loading...</div>;
    }

    if (error) {
        return <div className="text-center p-8 text-red-500">{error}</div>;
    }

    if (!product) {
        return <div className="text-center p-8">Product not found</div>;
    }

    return (
        <div className="w-screen h-screen mx-auto p-6 bg-white shadow-xl">
            <h1 className="text-3xl font-bold text-center text-indigo-700">{product.title}</h1>
            <p className="text-xl text-green-600 text-center my-4">${product.price.toFixed(2)} - {product.category} - ⭐{product.rating.rate} ({product.rating.count})</p>
            <div className='flex flex-row mx-auto my-12'>
                <img 
                src={product.image} 
                alt={product.title} 
                className="w-96 object-cover my-6 ml-auto"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/256x256/607D8B/FFFFFF?text=Image+Error'; }}
            />
                <div className='mr-auto ml-15'>
                    <p className="text-gray-700 leading-relaxed w-120 mr-auto ">{product.description}</p>
                    <button
                        onClick={handleToggleFavorite}
                        className={`p-3 rounded-full transition-all duration-300 mt-6 ${
                            isFavorite 
                                ? 'bg-red-500 hover:bg-red-600 hover:scale-100 scale-110 cursor-pointer' 
                                : 'text-red-500 hover:bg-red-600 hover:text-white bg-white cursor-pointer outline-solid'
                        }`}
                    > Favorite
                    </button>
                </div>
            </div>
        </div>
    );
}