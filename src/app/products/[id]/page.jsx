import React from "react";
import { getCategories, getProductById } from "@/lib/actions/Products";
import ClientProductDetails from "./ClientProductDetails";

export default async function ProductDetailsPage({ params }) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const { id } = resolvedParams;

  // Fetch product and categories in parallel
  const [product, categories] = await Promise.all([
    getProductById(id),
    getCategories(),
  ]);

  if (!product || product.error) {
    return (
      <div className="p-12 text-center">
        <h2 className="text-xl font-bold text-default-700">Product not found</h2>
        <p className="text-default-400 mt-2">
          The product you are looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  // Safely extract categories array regardless of response format
  const categoriesList = Array.isArray(categories)
    ? categories
    : categories?.categories || categories?.data || [];

  // Find category name based on product.category ID
  const matchedCategory = categoriesList.find(
    (cat) => cat._id?.toString() === product.category?.toString()
  );
  const categoryName = matchedCategory ? matchedCategory.name : "General";

  return <ClientProductDetails product={product} categoryName={categoryName} />;
}