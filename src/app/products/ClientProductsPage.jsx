"use client";

import React, { useTransition } from "react";
import {
  Pagination,
  Button,
  Chip,
  Input,
  Select,
  Label,
  ListBox,
  Card,
} from "@heroui/react";
import { Search, Eye, ShoppingBag, Tag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ClientProductsPage = ({ searchParams, productData, categoryList }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Await/resolve searchParams if it's a promise (Next.js 15+)
  const resolvedSearchParams =
    searchParams instanceof Promise
      ? React.use(searchParams)
      : searchParams || {};

  // Extract pagination and product list from API response object
  const productList = productData?.products || [];
  const totalPages = productData?.totalPages || 1;
  const currentPage = Number(productData?.currentPage) || 1;

  const filters = {
    search: resolvedSearchParams.search || "",
    category: resolvedSearchParams.category || "",
    sort: resolvedSearchParams.sort || "newest",
    page: currentPage,
  };

  // Handle Page Change for Server-Side Pagination
  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage);

    startTransition(() => {
      router.push(`?${params.toString()}`);
    });
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-default-950">
            Explore Products
          </h1>
          <p className="text-sm text-default-500 mt-1">
            Browse through our exclusive curation of modern fashion products.
          </p>
        </div>
      </div>

      {/* Search, Filter & Sort Controls Form */}
      <form
        method="GET"
        className="flex flex-col sm:flex-row items-center gap-4 bg-content1/60 backdrop-blur-md border border-default-200/80 rounded-2xl p-4 shadow-sm"
      >
        {/* Search Input */}
        <div className="relative flex items-center w-full sm:max-w-xs">
          <Input
            name="search"
            defaultValue={filters.search}
            placeholder="Search products..."
            size="sm"
            variant="bordered"
            className="[&_input]:pl-8 w-full"
          />
          <span className="absolute right-3 z-10 text-default-400 pointer-events-none flex items-center">
            <Search className="w-4 h-4" />
          </span>
        </div>

        {/* Category Filter Select */}
        <div className="w-full sm:max-w-xs">
          <Select
            name="category"
            defaultSelectedKeys={filters.category ? [filters.category] : []}
            placeholder="All categories"
            fullWidth
          >
            <Label className="sr-only">Category</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="" textValue="All Categories">
                  All Categories
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                {categoryList.map((cat) => (
                  <ListBox.Item key={cat._id} id={cat._id} textValue={cat.name}>
                    {cat.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Sort Select */}
        <div className="w-full sm:w-auto sm:min-w-[180px]">
          <Select name="sort" defaultSelectedKeys={[filters.sort]} fullWidth>
            <Label className="sr-only">Sort</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item id="newest" textValue="Sort by: Newest">
                  Sort by: Newest
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="asc" textValue="Price: Low to High">
                  Price: Low to High
                  <ListBox.ItemIndicator />
                </ListBox.Item>
                <ListBox.Item id="desc" textValue="Price: High to Low">
                  Price: High to Low
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* Submit Filter Button */}
        <Button
          type="submit"
          size="sm"
          variant="flat"
          color="primary"
          className="sm:ml-auto font-medium"
        >
          Apply Filters
        </Button>
      </form>

      {/* Product Cards Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productList.length > 0 ? (
          productList.map((product) => {
            const categoryName =
              categoryList.find((c) => c._id === product.category)?.name ||
              "General";
            const isOutOfStock = Number(product.stock) <= 0;

            // Extract discount information from the aggregated lookup
            const discount = product.discountInfo;
            const originalPrice = Number(product.price);

            // Calculate final price if discount exists
            const finalPrice = discount
              ? originalPrice -
                (originalPrice * Number(discount.percentage)) / 100
              : originalPrice;

            return (
              <Card
                key={product._id}
                className="group relative flex flex-col justify-between overflow-hidden border border-default-200/60 bg-content1 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl"
              >
                {/* Image & Top Badges Container */}
                <Card.Header className="relative p-0 h-64 w-full overflow-hidden bg-default-100">
                  <Image
                    fill
                    src={
                      product.variants?.[0]?.imageUrl ||
                      "https://placehold.co/400x400?text=No+Image"
                    }
                    alt={product.name || "Product image"}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Floating Category Tag */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="text-[11px] font-semibold tracking-wide uppercase bg-black/40 backdrop-blur-md text-white px-2.5 py-1 rounded-full">
                      {categoryName}
                    </span>
                  </div>

                  {/* Floating Stock Indicator */}
                  <div className="absolute top-3 right-3 z-10">
                    <Chip
                      className="capitalize shadow-sm backdrop-blur-md"
                      color={
                        Number(product.stock) > 10
                          ? "success"
                          : Number(product.stock) > 0
                            ? "warning"
                            : "danger"
                      }
                      size="sm"
                      variant="solid"
                    >
                      {isOutOfStock ? "Out of Stock" : `${product.stock} left`}
                    </Chip>
                  </div>

                  {/* Floating Discount Badge */}
                  {discount && (
                    <div className="absolute bottom-3 left-3 z-10">
                      <Chip
                        color="danger"
                        variant="solid"
                        size="sm"
                        className="shadow-md font-bold tracking-wide"
                      >
                        <span className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {discount.percentage}% OFF ({discount.code})
                        </span>
                      </Chip>
                    </div>
                  )}
                </Card.Header>

                {/* Card Body Details */}
                <Card.Content className="p-4 space-y-2.5 flex-grow">
                  <div className="space-y-1">
                    <Card.Title className="text-base font-bold text-default-900 tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
                      {product.name}
                    </Card.Title>
                    <Card.Description className="text-xs text-default-500 line-clamp-2 leading-relaxed">
                      {product.description ||
                        "Explore premium craftsmanship and stylish comfort tailored for your wardrobe."}
                    </Card.Description>
                  </div>

                  {/* Price Tag Display with Discount Logic */}
                  <div className="pt-2 flex items-baseline gap-2">
                    <span className="text-lg font-extrabold text-default-950">
                      ${finalPrice.toFixed(2)}
                    </span>
                    {discount && (
                      <span className="text-xs text-default-400 line-through">
                        ${originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </Card.Content>

                {/* Footer Actions */}
                <Card.Footer className="p-4 pt-0 gap-2">
                  <Link href={`/products/${product._id}`} className="w-full">
                    <Button
                      color="primary"
                      variant="ghost"
                      size="sm"
                      className="w-full font-semibold shadow-sm hover:opacity-90 transition-opacity"
                      startContent={<Eye className="w-4 h-4" />}
                    >
                      View Details
                    </Button>
                  </Link>
                </Card.Footer>
              </Card>
            );
          })
        ) : (
          <div className="col-span-full text-center py-16 text-default-500 bg-content1 rounded-2xl border border-default-200">
            <ShoppingBag className="w-12 h-12 mx-auto text-default-300 mb-3" />
            <p className="text-base font-medium">No products found</p>
            <p className="text-xs text-default-400 mt-1">
              Try adjusting your search query or filter options.
            </p>
          </div>
        )}
      </div>

{/* Pagination Component */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center my-10">
          <Pagination
            page={currentPage}
            total={totalPages}
            onChange={(page) => handlePageChange(page)}
          >
            <Pagination.Content>
              {/* Previous Button */}
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={currentPage <= 1}
                  onClick={() => {
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                >
                  <Pagination.PreviousIcon />
                  <span>Previous</span>
                </Pagination.Previous>
              </Pagination.Item>

              {/* Numbered Links */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                <Pagination.Item key={pageNumber}>
                  <Pagination.Link
                    isActive={pageNumber === currentPage}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </Pagination.Link>
                </Pagination.Item>
              ))}

              {/* Next Button */}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={currentPage >= totalPages}
                  onClick={() => {
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                >
                  <span>Next</span>
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default ClientProductsPage;
