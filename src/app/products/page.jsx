import { getCategories, getProducts } from "@/lib/actions/Products";
import ClientProductsPage from "./ClientProductsPage";

const ProductPage = async ({ searchParams }) => {
  // 1. Await searchParams first (Next.js App Router searchParams can be a promise)
  const resolvedSearchParams = (await searchParams) || {};

  // 2. Define filters including explicit limit so pagination triggers
  const filters = {
    search: resolvedSearchParams.search || "",
    category: resolvedSearchParams.category || "",
    sort: resolvedSearchParams.sort || "",
    page: resolvedSearchParams.page || "1",
    limit: "8", // Per page 8ta kore product dekhabe, 22ta thakle automatically 3 pages hoye jabe!
  };

  // 3. Fetch products and categories with proper filters
  const [allProducts, categories] = await Promise.all([
    getProducts(filters),
    getCategories(),
  ]);

  const productList = allProducts?.products || [];
  const categoryList = categories?.categories || [];
console.log("Product Data Response:", allProducts);
  return (
    <div>
      <ClientProductsPage
        productList={productList}
        categoryList={categoryList}
        searchParams={resolvedSearchParams}
        productData={allProducts}
      />
    </div>
  );
};

export default ProductPage;