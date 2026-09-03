import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserAuthService } from "../utils/userAuthService";
import Navbar from "../components/Navbar";
import logo from "../assets/logo.png";
import background from "../assets/background.svg";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

// ── Nigerian states with delivery fees ──────────────────────
const STATES = [
  { name: "Abia", fee: 1500 },
  { name: "Adamawa", fee: 2000 },
  { name: "Akwa Ibom", fee: 1800 },
  { name: "Anambra", fee: 1500 },
  { name: "Bauchi", fee: 2000 },
  { name: "Bayelsa", fee: 2000 },
  { name: "Benue", fee: 1800 },
  { name: "Borno", fee: 2500 },
  { name: "Cross River", fee: 2000 },
  { name: "Delta", fee: 1800 },
  { name: "Ebonyi", fee: 1800 },
  { name: "Edo", fee: 1500 },
  { name: "Ekiti", fee: 1500 },
  { name: "Enugu", fee: 1500 },
  { name: "FCT (Abuja)", fee: 5000 },
  { name: "Gombe", fee: 2000 },
  { name: "Imo", fee: 1500 },
  { name: "Jigawa", fee: 2200 },
  { name: "Kaduna", fee: 2000 },
  { name: "Kano", fee: 2000 },
  { name: "Katsina", fee: 2200 },
  { name: "Kebbi", fee: 2200 },
  { name: "Kogi", fee: 1800 },
  { name: "Kwara", fee: 1500 },
  { name: "Lagos", fee: 1000 },
  { name: "Nasarawa", fee: 1500 },
  { name: "Niger", fee: 1800 },
  { name: "Ogun", fee: 1200 },
  { name: "Ondo", fee: 1500 },
  { name: "Osun", fee: 1500 },
  { name: "Oyo", fee: 500 },
  { name: "Plateau", fee: 1800 },
  { name: "Rivers", fee: 1800 },
  { name: "Sokoto", fee: 2500 },
  { name: "Taraba", fee: 2500 },
  { name: "Yobe", fee: 5000 },
  { name: "Zamfara", fee: 5000 },
];

// ── Currency formatter ──────────────────────────────────────
const formatCurrency = (amount) => {
  const num = Number(amount);
  if (isNaN(num)) return "₦0.00";
  return `₦${num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
};

// ── Icons ────────────────────────────────────────────────────
const AccountIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

const OrdersIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    />
  </svg>
);

const InboxIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.981l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />
  </svg>
);

// ── Rating Modal ──────────────────────────────────────────────
const RatingModal = ({ product, onClose, onRated }) => {
  const [stars, setStars] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (stars === 0) {
      setError("Please select a star rating");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await UserAuthService.authenticatedRequest(
        `${API_BASE}/products/${product.product_id}/rate`,
        { method: "POST", body: JSON.stringify({ rating: stars }) },
      );
      console.log("Rating response status:", response.status);
      const responseJson = await response.json().catch(() => null);
      console.log("Rating response body:", responseJson);
      if (!response.ok) throw new Error("Failed to submit rating");
      onRated();
      onClose();
    } catch (err) {
      setError("Failed to submit rating. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-[#1a1a1a]">
            Rate this product
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-sm text-gray-500">{product.product_name}</p>

        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setStars(n)}
              onMouseEnter={() => setHovered(n)}
              onMouseLeave={() => setHovered(0)}
              className="transition-transform hover:scale-110"
            >
              <svg
                className={`w-9 h-9 ${(hovered || stars) >= n ? "text-[#F76319]" : "text-gray-300"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
              </svg>
            </button>
          ))}
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-[#0C850C] text-white font-medium py-3 rounded-lg hover:bg-[#075207] transition-colors disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit Rating"}
        </button>
      </div>
    </div>
  );
};

// ── Account Panel ─────────────────────────────────────────────
const AccountPanel = ({ user }) => (
  <div className="flex flex-col gap-6">
    <h2 className="text-xl font-bold text-[#1a1a1a]">My Gorefresh Account</h2>
    {user ? (
      <div className="flex flex-col gap-4">
        {[
          { label: "First Name", value: user.first_name },
          { label: "Last Name", value: user.last_name },
          { label: "Email", value: user.email },
          { label: "Phone", value: user.phone },
          { label: "Status", value: user.is_active ? "Active" : "Inactive" },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col gap-1 border-b border-gray-100 pb-3"
          >
            <p className="text-xs text-gray-400 uppercase tracking-wider">
              {label}
            </p>
            <p className="text-sm font-medium text-[#1a1a1a]">{value || "—"}</p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-sm text-gray-400">Loading your details...</p>
    )}
  </div>
);

// ── Orders Panel ──────────────────────────────────────────────
const OrdersPanel = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");
  const [orderRef, setOrderRef] = useState(null);
  const [updatingQty, setUpdatingQty] = useState(null);
  const [ratingProduct, setRatingProduct] = useState(null);

  // ── Fetch cart ───────────────────────────────────────────
  const fetchCart = async () => {
    try {
      const response = await UserAuthService.authenticatedRequest(
        `${API_BASE}/carts/me`,
      );
      if (!response.ok) throw new Error("Failed to fetch cart");
      const json = await response.json();
      setCart(json.data);
      localStorage.setItem("cart_id", json.data.id);
    } catch (err) {
      console.log("No cart or error:", err);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // ── Remove item ──────────────────────────────────────────
  const removeItem = async (productId) => {
    if (!cart) return;
    try {
      await UserAuthService.authenticatedRequest(
        `${API_BASE}/carts/${cart.id}/remove?product_id=${productId}`,
        { method: "DELETE" },
      );
      fetchCart();
    } catch (error) {
      console.log("Remove failed:", error);
    }
  };

  // ── Edit quantity ────────────────────────────────────────
  const updateQuantity = async (productId, newQty) => {
    if (!cart || newQty < 1) return;
    setUpdatingQty(productId);
    try {
      await UserAuthService.authenticatedRequest(
        `${API_BASE}/carts/${cart.id}/edit`,
        {
          method: "PUT",
          body: JSON.stringify({ product_id: productId, quantity: newQty }),
        },
      );
      fetchCart();
    } catch (err) {
      console.log("Quantity update failed:", err);
    } finally {
      setUpdatingQty(null);
    }
  };

  // ── Handle state change ──────────────────────────────────
  const handleStateChange = (e) => {
    const stateName = e.target.value;
    setSelectedState(stateName);
    const found = STATES.find((s) => s.name === stateName);
    setDeliveryFee(found ? found.fee : 0);
  };

  // ── Checkout ─────────────────────────────────────────────
  const handleCheckout = async () => {
    if (!selectedState) {
      setCheckoutError("Please select your state for delivery");
      return;
    }
    if (!deliveryAddress.trim()) {
      setCheckoutError("Please enter your full delivery address");
      return;
    }
    if (!cart) return;

    setCheckoutLoading(true);
    setCheckoutError("");
    try {
      const response = await UserAuthService.authenticatedRequest(
        `${API_BASE}/orders`,
        {
          method: "POST",
          body: JSON.stringify({
            cart_id: cart.id,
            payment_method: "paystack",
            delivery_address: deliveryAddress,
            additional_info: additionalInfo,
            delivery_state: selectedState,
          }),
        },
      );

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.msg || "Failed to create order");
      }

      const json = await response.json();
      console.log("Order response:", json);

      const paymentUrl =
        json.data?.data?.authorization_url || json.data?.authorization_url;
      if (paymentUrl) {
        window.location.href = paymentUrl;
        return;
      }

      const ref =
        json.data?.data?.reference ||
        json.data?.reference ||
        json.data?.order_ref ||
        String(json.data?.id || "");
      if (ref) {
        setOrderRef(ref);
        setCheckoutError(
          "Order created, but we couldn't redirect to payment. Please download your invoice and try again later.",
        );
      } else {
        setCheckoutError(
          "Order created but no payment URL or reference returned.",
        );
      }
    } catch (err) {
      setCheckoutError(
        err.message || "Something went wrong. Please try again.",
      );
    } finally {
      setCheckoutLoading(false);
    }
  };

  // ── Download invoice ─────────────────────────────────────
  const downloadInvoice = async (ref) => {
    try {
      const response = await UserAuthService.authenticatedRequest(
        `${API_BASE}/orders/${ref}/invoice`,
      );
      if (!response.ok) throw new Error("Failed to get invoice");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `invoice-${ref}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.log("Invoice download failed:", err);
      alert("Failed to download invoice. Please try again.");
    }
  };

  if (loading)
    return <p className="text-sm text-gray-400">Loading orders...</p>;

  const products = cart?.products ?? [];
  const subtotal = Number(cart?.subtotal) || 0;
  const serviceFee = subtotal * 0.025;
  const deliveryFeeNum = Number(deliveryFee) || 0;
  const total = subtotal + deliveryFeeNum + serviceFee;
  // const total = subtotal + deliveryFee + serviceFee;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-[#1a1a1a]">Orders</h2>

      {orderRef && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col gap-3">
          <p className="text-sm text-green-700 font-medium">
            ✅ Order placed successfully! Reference:{" "}
            <span className="font-bold">{orderRef}</span>
          </p>
          <button
            onClick={() => downloadInvoice(orderRef)}
            className="w-fit bg-[#0C850C] text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-[#075207] transition-colors flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
              />
            </svg>
            Download Invoice
          </button>
        </div>
      )}

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
          <OrdersIcon />
          <p className="text-gray-400 text-sm">You have no orders yet.</p>
          <Link to="/" className="btn-orange text-sm">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {products.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 border border-gray-200 rounded-xl"
            >
              <img
                src={item.product_thumbnail}
                alt={item.product_name}
                className="w-14 h-14 object-contain rounded-lg bg-gray-100"
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                }}
              />
              <div className="flex-1">
                <p className="font-medium text-sm">{item.product_name}</p>
                <p className="text-xs text-gray-400">{item.product_category}</p>
                <p className="text-sm font-bold text-[#1a1a1a] mt-1">
                  {formatCurrency(item.unit_price * item.quantity)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.product_id, item.quantity - 1)
                    }
                    disabled={
                      item.quantity <= 1 || updatingQty === item.product_id
                    }
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#0C850C] hover:text-[#0C850C] transition-colors disabled:opacity-40"
                  >
                    −
                  </button>
                  <span className="text-sm font-medium w-5 text-center">
                    {updatingQty === item.product_id ? "..." : item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      updateQuantity(item.product_id, item.quantity + 1)
                    }
                    disabled={updatingQty === item.product_id}
                    className="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#0C850C] hover:text-[#0C850C] transition-colors disabled:opacity-40"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => setRatingProduct(item)}
                  className="text-xs text-[#0C850C] underline font-medium mt-2"
                >
                  Rate this product
                </button>
              </div>
              <button
                onClick={() => removeItem(item.product_id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <TrashIcon />
              </button>
            </div>
          ))}

          {/* Delivery location selection */}
          <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-2 bg-gray-50">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#1a1a1a]">
                Select your State <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedState}
                onChange={handleStateChange}
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0C850C] transition-colors bg-white"
              >
                <option value="">Choose your state</option>
                {STATES.map((state) => (
                  <option key={state.name} value={state.name}>
                    {state.name} — ₦{state.fee.toLocaleString()}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-[#1a1a1a]">
                Full Delivery Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => {
                  setDeliveryAddress(e.target.value);
                  setCheckoutError("");
                }}
                placeholder="e.g. 12 Bodija Road, Ibadan (house number, street, landmark)"
                className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0C850C] transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-[#1a1a1a]">
              Additional Info{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="e.g. Call before delivery, Gate code is 1234..."
              rows={2}
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0C850C] transition-colors resize-none"
            />
          </div>

          {/* Order summary */}
          <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-2 text-sm bg-gray-50">
            <div className="flex justify-between text-gray-500">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Delivery fee</span>
              <span>{formatCurrency(deliveryFee)}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Service fee (2.5%)</span>
              <span>{formatCurrency(serviceFee)}</span>
            </div>
            <div className="flex justify-between font-bold text-[#1a1a1a] pt-2 border-t border-gray-200 mt-1">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            📍 Delivery fee is based on your state. We'll calculate the exact
            distance when we process your order.
          </p>

          {checkoutError && (
            <p className="text-red-500 text-sm">{checkoutError}</p>
          )}

          <button
            onClick={handleCheckout}
            disabled={checkoutLoading || !selectedState || !deliveryAddress}
            className="w-full bg-[#0C850C] text-white font-semibold py-3 rounded-xl hover:bg-[#075207] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {checkoutLoading
              ? "Processing..."
              : `Checkout — ${formatCurrency(total)}`}
          </button>
        </div>
      )}

      {ratingProduct && (
        <RatingModal
          product={ratingProduct}
          onClose={() => setRatingProduct(null)}
          onRated={() => {}}
        />
      )}
    </div>
  );
};

// ── Inbox Panel ───────────────────────────────────────────────
const InboxPanel = () => (
  <div className="flex flex-col gap-6">
    <h2 className="text-xl font-bold text-[#1a1a1a]">Inbox</h2>
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-center">
      <InboxIcon />
      <p className="text-gray-400 text-sm">No messages yet.</p>
    </div>
  </div>
);

// ── Dashboard Page ────────────────────────────────────────────
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthAndFetchUser = async () => {
      if (!UserAuthService.isAuthenticated()) {
        navigate("/login");
        return;
      }
      let userData = UserAuthService.getUserData();
      if (userData) {
        setUser(userData);
      } else {
        const fetchedUser = await UserAuthService.fetchAndStoreUser();
        if (fetchedUser) {
          setUser(fetchedUser);
        } else {
          UserAuthService.logout();
          navigate("/login");
        }
      }
    };
    checkAuthAndFetchUser();
  }, [navigate]);

  const handleLogout = () => {
    UserAuthService.logout();
    navigate("/login");
  };

  const tabs = [
    { id: "account", label: "My Gorefresh Account", icon: <AccountIcon /> },
    { id: "orders", label: "Orders", icon: <OrdersIcon /> },
    { id: "inbox", label: "Inbox", icon: <InboxIcon /> },
  ];

  return (
    <div className="min-h-screen font-geist bg-white">
      <Navbar logo={logo} />

      <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-6 min-h-[calc(100vh-80px)]">
        <aside className="w-full md:w-60 flex-shrink-0 flex flex-col">
          <div className="bg-[#0C850C] rounded-2xl p-4 flex flex-col gap-2 shadow-lg flex-1">
            {tabs.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200
                  ${activeTab === id ? "bg-[#075207] text-white" : "text-white/80 hover:bg-[#075207]/60 hover:text-white"}`}
              >
                {icon}
                {label}
              </button>
            ))}
            <div className="mt-auto pt-16">
              <button
                onClick={handleLogout}
                className="w-full border border-white text-white text-sm font-medium py-2.5 rounded-full hover:bg-white hover:text-[#0C850C] transition-all duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        <main
          className="flex-1 rounded-2xl p-6 shadow-sm bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${background})` }}
        >
          {activeTab === "account" && <AccountPanel user={user} />}
          {activeTab === "orders" && <OrdersPanel />}
          {activeTab === "inbox" && <InboxPanel />}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
