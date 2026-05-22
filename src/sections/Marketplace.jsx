import React, { useState, useEffect } from 'react';
import api from '../api/axios';

const StarRating = ({ rating, max = 5 }) => {
  const count = Math.round(rating); // rating comes as a number from backend
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < count ? 'text-[#F76319]' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
        </svg>
      ))}
    </div>
  );
};

const ProductCard = ({ product, onAddToCart, adding }) => (
  <div className="flex flex-col rounded-lg overflow-hidden border-2 border-gray-200 bg-white
    transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer">
    <div className="bg-gray-100 flex items-center justify-center p-4 aspect-square">
      <img
        src={product.thumbnail_url}
        alt={product.name}
        className="object-contain w-full h-full"
        onError={(e) => { e.target.src = '/placeholder.png'; }} // fallback if image fails
      />
    </div>
    <div className="p-3 flex flex-col gap-1.5">
      <p className="text-[#404040] font-medium text-sm leading-tight">{product.name}</p>
      <StarRating rating={product.rating} />
      <div className="flex items-center justify-between mt-1 flex-wrap gap-2">
        <p className="text-[#404040] font-bold text-base">₦{product.price.toLocaleString()}</p>
        <button
          onClick={() => onAddToCart(product)}
          disabled={adding === product.id}
          className="btn-green text-xs px-3 py-1.5 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {adding === product.id ? 'Adding...' : 'Add to cart'}
        </button>
      </div>
    </div>
  </div>
);

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(null); // tracks which product is being added
  const [feedback, setFeedback] = useState(''); // success/error message

  // Fetch all products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data.data);
      } catch (error) {
        console.log('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      console.log('Products response:', response.data); // add this
      setProducts(response.data.data);
    } catch (error) {
      console.log('Failed to fetch products:', error); // already there
    } finally {
      setLoading(false);
    }
  };
  fetchProducts();
}, []);
  const addToCart = async (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setFeedback('Please log in to add items to cart');
      setTimeout(() => setFeedback(''), 3000);
      return;
    }

    setAdding(product.id);

    try {
      // Step 1 — check if user already has a cart
      let cartId = localStorage.getItem('cart_id');

      if (!cartId) {
        // Step 2 — no cart yet, create one with the product
        const createResponse = await api.post('/carts', {
          products: [{ product_id: product.id, quantity: 1 }]
        });
        cartId = createResponse.data.data.id;
        localStorage.setItem('cart_id', cartId);
      } else {
        // Step 3 — cart exists, just add the product
        await api.post(`/carts/${cartId}/add`, {
          products: [{ product_id: product.id, quantity: 1 }]
        });
      }

      setFeedback(`${product.name} added to cart!`);
      setTimeout(() => setFeedback(''), 3000);

    } catch (error) {
      console.log('Add to cart failed:', error);
      setFeedback('Failed to add to cart. Please try again.');
      setTimeout(() => setFeedback(''), 3000);
    } finally {
      setAdding(null);
    }
  };

  return (
    <section id="marketplace" className="bg-white py-16 px-6 md:px-12 font-geist">
      <p className="text-[#0C850C] font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-10">
        MarketPlace
      </p>

      {/* Feedback message */}
      {feedback && (
        <p className={`text-center text-sm mb-6 font-medium
          ${feedback.includes('Failed') || feedback.includes('log in')
            ? 'text-red-500'
            : 'text-[#0C850C]'
          }`}>
          {feedback}
        </p>
      )}

      {/* Loading state */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-400 text-sm">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              adding={adding}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default Marketplace;