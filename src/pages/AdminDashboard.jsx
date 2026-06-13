import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import logo from "../assets/logo.png";
import Navbar from "../components/Navbar";

// ── Icons (unchanged) ─────────────────────────────────────────
const ProfileIcon = () => (
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

const ProductsIcon = () => (
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
      d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
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
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
);

const EditIcon = () => (
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
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125"
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

// ── Helper ────────────────────────────────────────────────────
const adminHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
});

// ── Input Field ───────────────────────────────────────────────
const InputField = ({ label, value, onChange, type = "text", placeholder }) => (
  <div className="flex flex-col gap-1">
    <label className="text-xs text-gray-400 uppercase tracking-wider">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0C850C] transition-colors bg-transparent"
    />
  </div>
);

// ── Eye Toggle ────────────────────────────────────────────────
const EyeToggle = ({ show, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className="text-gray-400 hover:text-[#0C850C] transition-colors"
  >
    {show ? (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
        />
      </svg>
    ) : (
      <svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    )}
  </button>
);

// ── Admin Profile Panel (unchanged) ───────────────────────────
const AdminProfilePanel = ({ admin }) => {
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const handlePasswordSave = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      setPasswordMsg("Please fill in all password fields");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setPasswordMsg("New passwords do not match");
      return;
    }
    if (passwords.new.length < 8) {
      setPasswordMsg("Password must be at least 8 characters");
      return;
    }
    setPasswordLoading(true);
    setPasswordMsg("");
    try {
      await api.patch(
        "/admins/me/password",
        {
          current_password: passwords.current,
          new_password: passwords.new,
        },
        { headers: adminHeaders() },
      );
      setPasswordMsg("Password changed successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch {
      setPasswordMsg("Failed to change password. Check your current password.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const PasswordField = ({ label, field, show, onToggle }) => (
    <div className="flex flex-col gap-1">
      <label className="text-xs text-gray-400 uppercase tracking-wider">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 rounded-lg px-4 py-3 gap-2 focus-within:border-[#0C850C] transition-colors">
        <input
          type={show ? "text" : "password"}
          value={passwords[field]}
          onChange={(e) =>
            setPasswords((p) => ({ ...p, [field]: e.target.value }))
          }
          className="flex-1 bg-transparent outline-none text-sm"
        />
        <EyeToggle show={show} onToggle={onToggle} />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-[#1a1a1a]">Admin Profile</h2>
      {admin && (
        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 rounded-full bg-[#0C850C] flex items-center justify-center text-white font-bold text-lg">
            {admin.first_name?.[0]}
            {admin.last_name?.[0]}
          </div>
          <div>
            <p className="font-semibold text-[#1a1a1a]">
              {admin.first_name} {admin.last_name}
            </p>
            <p className="text-sm text-gray-400">{admin.email}</p>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-4 border border-gray-200 rounded-xl p-5">
        <p className="font-semibold text-[#1a1a1a]">Account Information</p>
        <div className="flex flex-col gap-4">
          {[
            { label: "First Name", value: admin?.first_name },
            { label: "Last Name", value: admin?.last_name },
            { label: "Email", value: admin?.email },
            { label: "Phone", value: admin?.phone },
            {
              label: "Status",
              value: admin?.is_active ? "Active" : "Inactive",
            },
            {
              label: "Last Login",
              value: admin?.last_login
                ? new Date(admin.last_login).toLocaleDateString()
                : "N/A",
            },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col gap-1 border-b border-gray-100 pb-3"
            >
              <p className="text-xs text-gray-400 uppercase tracking-wider">
                {label}
              </p>
              <p className="text-sm font-medium text-[#1a1a1a]">
                {value || "—"}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <button
          onClick={() => setShowChangePassword(!showChangePassword)}
          className="w-fit text-sm text-[#0C850C] underline font-medium"
        >
          {showChangePassword ? "Hide Change Password" : "Change Password"}
        </button>
        {showChangePassword && (
          <div className="flex flex-col gap-4 border border-gray-200 rounded-xl p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PasswordField
                label="Current Password"
                field="current"
                show={showCurrent}
                onToggle={() => setShowCurrent(!showCurrent)}
              />
              <PasswordField
                label="New Password"
                field="new"
                show={showNew}
                onToggle={() => setShowNew(!showNew)}
              />
              <PasswordField
                label="Confirm Password"
                field="confirm"
                show={showConfirm}
                onToggle={() => setShowConfirm(!showConfirm)}
              />
            </div>
            {passwordMsg && (
              <p
                className={`text-sm ${passwordMsg.includes("success") ? "text-[#0C850C]" : "text-red-500"}`}
              >
                {passwordMsg}
              </p>
            )}
            <button
              onClick={handlePasswordSave}
              disabled={passwordLoading}
              className="w-fit bg-[#0C850C] text-white text-sm font-medium px-6 py-2.5 rounded-lg hover:bg-[#075207] transition-colors disabled:opacity-60"
            >
              {passwordLoading ? "Saving..." : "Save New Password"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Create Category Modal (unchanged) ─────────────────────────
const CategoryModal = ({ onClose, onCreated }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }
    setLoading(true);
    try {
      await api.post(
        "/products/categories",
        { name },
        { headers: adminHeaders() },
      );
      onCreated();
      onClose();
    } catch (err) {
      console.error("Create category error:", err.response?.data);
      setError("Failed to create category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-[#1a1a1a]">Create Category</h3>
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <InputField
            label="Category Name"
            value={name}
            onChange={(e) => {
              setError("");
              setName(e.target.value);
            }}
            placeholder="e.g. Pap Products"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#0C850C] text-white font-medium py-3 rounded-lg hover:bg-[#075207] transition-colors disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Category"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-600 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Product Modal (FIXED thumbnail endpoint) ──────────────────
const ProductModal = ({
  product,
  categories,
  onClose,
  onSaved,
  onNeedCategory,
}) => {
  const isEdit = !!product;
  const [form, setForm] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    category_id: product?.product_category?.id || "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(product?.thumbnail_url || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.category_id) {
      setError("Name, price and category are required");
      return;
    }
    setLoading(true);
    setError("");
    try {
      let productId = product?.id;

      if (isEdit) {
        // Edit: update product details
        await api.put(
          `/products/${productId}`,
          {
            name: form.name,
            description: form.description || "",
            price: Number(form.price),
            product_category_id: Number(form.category_id),
          },
          { headers: adminHeaders() },
        );
      } else {
        // Create: first create the product (without image)
        const createRes = await api.post(
          `/products?product_category_id=${form.category_id}`,
          {
            name: form.name,
            description: form.description || "",
            price: Number(form.price),
          },
          { headers: adminHeaders() },
        );
        productId = createRes.data.data.id;
      }

      // Upload thumbnail if a new file was selected (for both create and edit)
      if (imageFile && productId) {
        const formData = new FormData();
        formData.append("thumbnail", imageFile);
        // CORRECT endpoint according to your API spec
        await api.post(`/products/images/${productId}/thumbnail`, formData, {
          headers: { ...adminHeaders(), "Content-Type": "multipart/form-data" },
        });
      }

      onSaved(); // close modal and refresh list
    } catch (err) {
      console.error("Save product error:", err.response?.data);
      // Show a more helpful error message
      if (err.response?.status === 422) {
        const detail = err.response.data.detail;
        if (Array.isArray(detail)) {
          setError(
            detail.map((d) => `${d.loc.join(".")}: ${d.msg}`).join(", "),
          );
        } else {
          setError("Validation error. Check your input fields.");
        }
      } else {
        setError("Failed to save product. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg text-[#1a1a1a]">
            {isEdit ? "Edit Product" : "Add New Product"}
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div
            onClick={() => fileRef.current.click()}
            className="border-2 border-dashed border-gray-300 rounded-xl h-36 flex items-center justify-center cursor-pointer hover:border-[#0C850C] transition-colors overflow-hidden"
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="h-full w-full object-contain"
              />
            ) : (
              <div className="text-center text-gray-400 text-sm">
                <p>Click to upload image</p>
                <p className="text-xs mt-1">PNG, JPG supported</p>
              </div>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <InputField
            label="Product Name"
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            placeholder="e.g. My Dear Pap 100g"
          />
          <InputField
            label="Description"
            value={form.description}
            onChange={(e) =>
              setForm((p) => ({ ...p, description: e.target.value }))
            }
            placeholder="e.g. Nutritious pap product"
          />
          <InputField
            label="Price (₦)"
            value={form.price}
            onChange={(e) => setForm((p) => ({ ...p, price: e.target.value }))}
            type="number"
            placeholder="e.g. 500"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <label className="text-xs text-gray-400 uppercase tracking-wider">
                Category
              </label>
              <button
                type="button"
                onClick={onNeedCategory}
                className="text-xs text-[#0C850C] underline"
              >
                + Create new category
              </button>
            </div>
            <select
              value={form.category_id}
              onChange={(e) =>
                setForm((p) => ({ ...p, category_id: e.target.value }))
              }
              className="border border-gray-300 rounded-lg px-4 py-3 text-sm outline-none focus:border-[#0C850C] transition-colors bg-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {categories.length === 0 && (
              <p className="text-xs text-amber-500 mt-1">
                No categories yet — create one first using the link above.
              </p>
            )}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex gap-3 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#0C850C] text-white font-medium py-3 rounded-lg hover:bg-[#075207] transition-colors disabled:opacity-60"
            >
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Add Product"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-600 font-medium py-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ── Products Panel (unchanged) ────────────────────────────────
const ProductsPanel = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteProduct, setDeleteProduct] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get("/products/categories");
      setCategories(res.data.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleDelete = async () => {
    if (!deleteProduct) return;
    try {
      await api.delete(`/products/${deleteProduct.id}`, {
        headers: adminHeaders(),
      });
      setProducts((prev) => prev.filter((p) => p.id !== deleteProduct.id));
      setDeleteProduct(null);
      setErrorMsg("");
    } catch (err) {
      console.error("Delete failed:", err);
      setErrorMsg("Failed to delete product. Please try again.");
      setTimeout(() => setErrorMsg(""), 3000);
      setDeleteProduct(null);
    }
  };

  const handleSaved = () => {
    setShowModal(false);
    setEditProduct(null);
    fetchProducts();
  };

  const handleCategoryCreated = () => {
    fetchCategories();
    setShowCatModal(false);
    setShowModal(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#1a1a1a]">Manage Products</h2>
        <button
          onClick={() => {
            setEditProduct(null);
            setShowModal(true);
          }}
          className="bg-[#0C850C] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#075207] transition-colors flex items-center gap-2"
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
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add New Product
        </button>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
          {errorMsg}
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-400">Loading products...</p>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <ProductsIcon />
          <p className="text-gray-400 text-sm">
            No products yet. Add your first one!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                {["Picture", "Product Name", "Price", "Status", "Actions"].map(
                  (h) => (
                    <th
                      key={h}
                      className="px-4 py-3 text-left text-xs text-gray-400 uppercase tracking-wider font-medium"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3">
                    <img
                      src={product.thumbnail_url || "/placeholder.png"}
                      alt={product.name}
                      className="w-12 h-12 object-contain rounded-lg bg-gray-100"
                    />
                  </td>
                  <td className="px-4 py-3 font-medium text-[#1a1a1a]">
                    {product.name}
                  </td>
                  <td className="px-4 py-3 text-[#1a1a1a]">
                    ₦{product.price?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${product.is_available !== false ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
                    >
                      {product.is_available !== false
                        ? "Active"
                        : "Out of Stock"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => {
                          setEditProduct(product);
                          setShowModal(true);
                        }}
                        className="text-gray-400 hover:text-[#0C850C] transition-colors"
                        title="Edit"
                      >
                        <EditIcon />
                      </button>
                      <button
                        onClick={() => setDeleteProduct(product)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Delete"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {deleteProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h3 className="font-bold text-lg text-[#1a1a1a]">Confirm Delete</h3>
            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete{" "}
              <span className="font-semibold">{deleteProduct.name}</span>? This
              action cannot be undone.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white font-medium py-2.5 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteProduct(null)}
                className="flex-1 border border-gray-300 text-gray-600 font-medium py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <ProductModal
          product={editProduct}
          categories={categories}
          onClose={() => {
            setShowModal(false);
            setEditProduct(null);
          }}
          onSaved={handleSaved}
          onNeedCategory={() => {
            setShowModal(false);
            setShowCatModal(true);
          }}
        />
      )}
      {showCatModal && (
        <CategoryModal
          onClose={() => {
            setShowCatModal(false);
            setShowModal(true);
          }}
          onCreated={handleCategoryCreated}
        />
      )}
    </div>
  );
};

// ── Orders Panel (placeholder) ────────────────────────────────
const OrdersPanel = () => (
  <div className="flex flex-col items-center justify-center py-20 gap-3">
    <OrdersIcon />
    <p className="text-gray-400 text-sm">Order management coming soon.</p>
  </div>
);

// ── AdminDashboard Page ───────────────────────────────────────
const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin");
      return;
    }

    const fetchAdmin = async () => {
      try {
        const response = await api.get("/admins/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmin(response.data.data);
      } catch (err) {
        console.error("Failed to fetch admin:", err.response?.data);
        navigate("/admin");
      }
    };
    fetchAdmin();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_refresh_token");
    navigate("/admin");
  };

  const tabs = [
    { id: "profile", label: "Admin Profile", icon: <ProfileIcon /> },
    { id: "products", label: "Products", icon: <ProductsIcon /> },
    { id: "orders", label: "Orders", icon: <OrdersIcon /> },
  ];

  return (
    <div className="min-h-screen font-geist bg-white">
      <Navbar logo={logo} />
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-6 min-h-[calc(100vh-80px)]">
        <aside className="w-full md:w-56 flex-shrink-0 flex flex-col">
          <div className="bg-[#0C850C] rounded-2xl p-4 flex flex-col gap-2 shadow-lg flex-1">
            {tabs.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left transition-all duration-200 ${activeTab === id ? "bg-[#075207] text-white" : "text-white/80 hover:bg-[#075207]/60 hover:text-white"}`}
              >
                {icon}
                {label}
              </button>
            ))}
            <div className="mt-auto pt-10">
              <button
                onClick={handleLogout}
                className="w-full border border-white text-white text-sm font-medium py-2.5 rounded-full hover:bg-white hover:text-[#0C850C] transition-all duration-200"
              >
                Sign Out
              </button>
            </div>
          </div>
        </aside>
        <main className="flex-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {activeTab === "profile" && <AdminProfilePanel admin={admin} />}
          {activeTab === "products" && <ProductsPanel />}
          {activeTab === "orders" && <OrdersPanel />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
