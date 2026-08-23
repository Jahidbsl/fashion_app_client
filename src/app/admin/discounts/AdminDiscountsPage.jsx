"use client";

import React, { useState, useEffect } from "react";
import { getDiscounts, postDiscount, deleteDiscount } from "@/lib/actions/Discounts";
import { getProducts } from "@/lib/actions/Products";

export default function AdminDiscountsPage() {
  const [discounts, setDiscounts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    code: "",
    percentage: "",
    expiryDate: "",
    productId: "",
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const discountRes = await getDiscounts();
      if (discountRes && discountRes.success) {
        setDiscounts(discountRes.discounts || []);
      } else if (Array.isArray(discountRes)) {
        setDiscounts(discountRes);
      } else {
        setDiscounts([]);
      }

      const productRes = await getProducts({ limit: 100 });
      if (productRes && productRes.success) {
        setProducts(productRes.products || []);
      } else if (Array.isArray(productRes)) {
        setProducts(productRes);
      }
    } catch (error) {
      console.error("Failed to fetch data", error);
      setDiscounts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postDiscount(formData);
      if (res && res.success) {
        alert("Discount created successfully!");
        setFormData({ code: "", percentage: "", expiryDate: "", productId: "" });
        fetchData(); 
      } else {
        alert(res?.error || "Failed to create discount");
      }
    } catch (error) {
      console.error("Error creating discount:", error);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this discount?")) {
      try {
        const res = await deleteDiscount(id);
        if (res && res.success) {
          fetchData(); 
        } else {
          alert(res?.error || "Failed to delete discount");
        }
      } catch (error) {
        console.error("Error deleting discount:", error);
      }
    }
  };

  // Pagination Calculations
  const totalItems = discounts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDiscounts = discounts.slice(startIndex, startIndex + itemsPerPage);

  // Pagination Handlers
  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-200">
      <h1 className="text-2xl font-bold mb-6">Manage Discounts</h1>

      {/* Create Discount Form */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 border border-gray-200 dark:border-gray-700"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Discount Code</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g. SAVE20"
            required
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Percentage (%)</label>
          <input
            type="number"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            placeholder="e.g. 20"
            required
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Select Product</label>
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Choose Product --</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div className="md:col-span-4 flex justify-end">
          <button 
            type="submit" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium transition-colors cursor-pointer"
          >
            Create Discount Code
          </button>
        </div>
      </form>

      {/* Discounts Table Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200">
                <th className="p-3">Code</th>
                <th className="p-3">Percentage</th>
                <th className="p-3">Expiry Date</th>
                <th className="p-3">Product Name / ID</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500 dark:text-gray-400">Loading...</td>
                </tr>
              ) : currentDiscounts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-500 dark:text-gray-400">No discounts found.</td>
                </tr>
              ) : (
                currentDiscounts.map((discount) => {
                  const matchedProduct = products.find((p) => p._id === discount.productId);
                  return (
                    <tr key={discount._id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="p-3 font-semibold text-blue-600 dark:text-blue-400">{discount.code}</td>
                      <td className="p-3">{discount.percentage}%</td>
                      <td className="p-3">{new Date(discount.expiryDate).toLocaleDateString()}</td>
                      <td className="p-3 text-sm text-gray-600 dark:text-gray-300">
                        {matchedProduct ? matchedProduct.name : discount.productId}
                      </td>
                      <td className="p-3">
                        <button
                          type="button"
                          onClick={() => handleDelete(discount._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {!loading && totalItems > 0 && (
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 text-sm">
            <div>
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, totalItems)} of {totalItems} entries
            </div>
            <div className="flex gap-2 items-center">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="px-3.5 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer disabled:cursor-not-allowed font-medium"
              >
                Previous
              </button>
              <span className="px-3 py-1 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                onClick={handleNext}
                disabled={currentPage >= totalPages}
                className="px-3.5 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 disabled:opacity-40 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer disabled:cursor-not-allowed font-medium"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}