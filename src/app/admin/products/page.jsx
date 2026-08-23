import React from "react";
import AdminProductManage from "./AdminProductManage";
import { getCategories, getProducts } from "@/lib/actions/Products";

const AdminProductPage = async ({ searchParams }) => {
  // 1. Await searchParams first (Next.js App Router searchParams can be a promise)
  const resolvedSearchParams = (await searchParams) || {};

  // 2. Define filters using the resolved search parameters before calling Promise.all
  const filters = {
    search: resolvedSearchParams.search || "",
    category: resolvedSearchParams.category || "",
    sort: resolvedSearchParams.sort || "",
    page: resolvedSearchParams.page || "1",
  };

  // 3. Now getProducts(filters) will work correctly because 'filters' is initialized
  const [allProducts, categories] = await Promise.all([
    getProducts(filters),
    getCategories(),
  ]);

  const productList = allProducts?.products || [];
  const categoryList = categories?.categories || [];

  return (
    <div>
      <AdminProductManage
        productList={productList}
        categoryList={categoryList}
        searchParams={resolvedSearchParams}
        productData={allProducts}
      />
    </div>
  );
};

export default AdminProductPage;