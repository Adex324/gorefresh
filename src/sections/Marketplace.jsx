import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/api";
import { UserAuthService } from "../utils/userAuthService";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const StarRating = ({ rating, noOfRatings = 0, max = 5 }) => {
  // If no one has rated yet, show a fixed 5-star display (no count shown)
  // Once real ratings exist, show the actual average + review count
  const hasRealRatings = noOfRatings > 0;
  const count = hasRealRatings ? Math.round(rating) : max;

  return (
    <div className="flex items-center gap-1">
      <div className="flex gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < count ? "text-[#F76319]" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
          </svg>
        ))}
      </div>
      {hasRealRatings && (
        <span className="text-xs text-gray-400">({noOfRatings})</span>
      )}
    </div>
  );
};

const ProductCard = ({ product, onAddToCart, adding, justAdded }) => (
  <div
    className="flex flex-col rounded-lg overflow-hidden border-2 border-gray-200 bg-white
    transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
  >
    <div className="bg-gray-100 flex items-center justify-center p-4 aspect-square">
      <img
        src={product.thumbnail_url}
        alt={product.name}
        className="object-contain w-full h-full"
        onError={(e) => { e.target.src = "/placeholder.png"; }}
      />
    </div>
    <div className="p-3 flex flex-col gap-1.5">
      <p className="text-[#404040] font-medium text-sm leading-tight">{product.name}</p>
      <StarRating rating={product.rating} noOfRatings={product.no_ratings} />
      <div className="flex items-center justify-between mt-1 flex-wrap gap-2">
        <p className="text-[#404040] font-bold text-base">₦{product.price.toLocaleString()}</p>
        <button
          onClick={() => onAddToCart(product)}
          disabled={adding === product.id || justAdded === product.id}
          className={`text-xs px-3 py-1.5 rounded transition-colors disabled:cursor-not-allowed
            ${justAdded === product.id
              ? 'bg-[#0C850C] text-white opacity-100'
              : 'btn-green disabled:opacity-60'
            }`}
        >
          {adding === product.id
            ? "Adding..."
            : justAdded === product.id
              ? "Added to cart ✓"
              : "Add to cart"}
        </button>
      </div>
    </div>
  </div>
);

// ── Success Toast ──────────────────────────────────────────────
const CartToast = ({ productName, onClose }) => (
  <div className="fixed bottom-6 right-6 z-50">
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 w-72 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-[#0C850C]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-[#1a1a1a]">Added to cart!</p>
          <p className="text-xs text-gray-400 mt-0.5">{productName}</p>
        </div>
        <button onClick={onClose} className="text-gray-300 hover:text-gray-500 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <Link
        to="/dashboard"
        className="bg-[#0C850C] text-white text-sm font-medium text-center py-2.5 rounded-lg hover:bg-[#075207] transition-colors"
      >
        Check it out on Dashboard now?
      </Link>
    </div>
  </div>
);

const Marketplace = () => {
  const [products, setProducts]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [adding, setAdding]         = useState(null);
  const [feedback, setFeedback]     = useState("");
  const [cartId, setCartId]         = useState(null);
  const [cartLoading, setCartLoading] = useState(true);
  const [toastProduct, setToastProduct] = useState(null); // holds product name for toast
  const [justAdded, setJustAdded]       = useState(null);  // product id, briefly shows "Added!" on button

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        console.log("Failed to fetch products:", error);
        setFeedback("Failed to load products. Please refresh.");
        setTimeout(() => setFeedback(""), 3000);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    const fetchUserCart = async () => {
      if (!UserAuthService.isAuthenticated()) { setCartLoading(false); return; }
      try {
        const response = await UserAuthService.authenticatedRequest(`${API_BASE}/carts/me`);
        if (!response.ok) {
          if (response.status === 404) setCartId(null);
          else throw new Error("Failed to fetch cart");
        } else {
          const json = await response.json();
          const cart = json.data;
          if (cart && cart.id) {
            setCartId(cart.id);
            localStorage.setItem("cart_id", cart.id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setCartLoading(false);
      }
    };
    fetchUserCart();
  }, []);

  // Auto-dismiss toast after 6 seconds
  useEffect(() => {
    if (!toastProduct) return;
    const timer = setTimeout(() => setToastProduct(null), 6000);
    return () => clearTimeout(timer);
  }, [toastProduct]);

  const handleAddToCart = async (product) => {
   if (!UserAuthService.isAuthenticated()) {
  window.location.href = "/login";
  return;
}

    setAdding(product.id);

    try {
      let currentCartId = cartId;

      if (!currentCartId) {
        const response = await UserAuthService.authenticatedRequest(`${API_BASE}/carts`, {
          method: "POST",
          body: JSON.stringify({ products: [{ product_id: product.id, quantity: 1 }] }),
        });
        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err.error?.msg || "Failed to create cart");
        }
        const json = await response.json();
        currentCartId = json.data.id;
        setCartId(currentCartId);
        localStorage.setItem("cart_id", currentCartId);
      } else {
        const response = await UserAuthService.authenticatedRequest(`${API_BASE}/carts/${currentCartId}/add`, {
          method: "POST",
          body: JSON.stringify({ products: [{ product_id: product.id, quantity: 1 }] }),
        });
        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          throw new Error(err.error?.msg || "Failed to add to cart");
        }
      }

      // Show success toast and brief "Added!" state on the button
      setToastProduct(product.name);
      setJustAdded(product.id);
      setTimeout(() => setJustAdded(null), 2000);
    } catch (error) {
      console.error("Add to cart failed:", error);
      setFeedback(error.message || "Failed to add to cart. Please try again.");
      setTimeout(() => setFeedback(""), 3000);
    } finally {
      setAdding(null);
    }
  };

  return (
    <section id="marketplace" className="bg-white py-16 px-6 md:px-12 font-geist">
      <p className="text-[#0C850C] font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-10">
        MarketPlace
      </p>

      {feedback && (
        <p className={`text-center text-sm mb-6 font-medium ${feedback.includes("Failed") || feedback.includes("log in") ? "text-red-500" : "text-[#0C850C]"}`}>
          {feedback}
        </p>
      )}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-400 text-sm">Loading products...</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} adding={adding} justAdded={justAdded} />
          ))}
        </div>
      )}

      {/* Success toast */}
      {toastProduct && (
        <CartToast productName={toastProduct} onClose={() => setToastProduct(null)} />
      )}
    </section>
  );
};

export default Marketplace;