"use client";

import React, { useTransition } from "react";
import {
  Table,
  Pagination,
  Button,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Select,
  Label,
  ListBox,
} from "@heroui/react";
import { MoreVertical, Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteProduct } from "@/lib/actions/Products"; // Adjust import path if needed
import Image from "next/image";

const AdminProductManage = ({ searchParams, productData, categoryList }) => {
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

  // Delete handler function
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await deleteProduct(id);
      if (res?.success || res) {
        // Refresh the Next.js router cache to get updated server data
        startTransition(() => {
          router.refresh();
        });
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("An error occurred while deleting the product.");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-default-900">
            Manage Products
          </h1>
          <p className="text-sm text-default-500">
            A list of all products in your store including name, price, stock,
            and variants.
          </p>
        </div>
        <Link href="/admin/products/create">
          <Button color="primary" startContent={<Plus className="w-4 h-4" />}>
            Create Product
          </Button>
        </Link>
      </div>

      {/* Search, Filter & Sort Controls Form */}
      <form
        method="GET"
        className="flex flex-col sm:flex-row items-center gap-4 bg-content1 border border-default-200 rounded-2xl p-4"
      >
        {/* Search Input */}
        <div className="relative flex items-center w-full sm:max-w-xs">
          <Input
            name="search"
            defaultValue={filters.search}
            placeholder="Search by product name..."
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
          variant="ghost"
          color="primary"
          className="sm:ml-auto"
        >
          Apply Filters
        </Button>
      </form>

      {/* Responsive Table Container */}
      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Admin product management table">
            <Table.Header>
              <Table.Column isRowHeader={true}>PRODUCT</Table.Column>
              <Table.Column>CATEGORY</Table.Column>
              <Table.Column>PRICE</Table.Column>
              <Table.Column>STOCK</Table.Column>
              <Table.Column>VARIANTS</Table.Column>
              <Table.Column>ACTIONS</Table.Column>
            </Table.Header>
            <Table.Body>
              {productList.length > 0 ? (
                productList.map((product) => (
                  <Table.Row key={product._id}>
                    {/* Product Name, Image & Description Preview */}
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                        <Image
                          width={40}
                          height={40}
                          src={
                            product.variants?.[0]?.imageUrl ||
                            "https://placehold.co/100x100?text=No+Image"
                          }
                          alt={product.name || "Product image"}
                          className="w-10 h-10 object-cover flex-shrink-0 rounded-lg"
                        />
                        <div className="flex flex-col">
                          <span className="font-semibold text-default-800 text-sm">
                            {product.name}
                          </span>
                          <span className="text-xs text-default-400 line-clamp-1 max-w-[250px]">
                            {product.description || "No description provided"}
                          </span>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* Category */}
                    <Table.Cell>
                      <span className="text-xs font-mono text-default-600 bg-default-100 px-2 py-1 rounded-md">
                        {categoryList.find((c) => c._id === product.category)
                          ?.name || product.category}
                      </span>
                    </Table.Cell>

                    {/* Price */}
                    <Table.Cell>
                      <span className="font-medium text-default-700">
                        ${Number(product.price).toFixed(2)}
                      </span>
                    </Table.Cell>

                    {/* Stock Chip */}
                    <Table.Cell>
                      <Chip
                        className="capitalize"
                        color={
                          Number(product.stock) > 10
                            ? "success"
                            : Number(product.stock) > 0
                              ? "warning"
                              : "danger"
                        }
                        size="sm"
                        variant="flat"
                      >
                        {product.stock} in stock
                      </Chip>
                    </Table.Cell>

                    {/* Variants */}
                    <Table.Cell>
                      <span className="text-sm text-default-600">
                        {product.variants?.length || 0} variant(s)
                      </span>
                    </Table.Cell>

                    {/* Actions Dropdown */}
                    <Table.Cell>
                      <div className="flex items-center justify-center gap-2">
                        {/* View Button */}
                        <Link
                          href={`/products/${product._id}`}
                          className="p-2 rounded-lg bg-default-100 hover:bg-default-200 transition-colors text-default-600 inline-flex items-center justify-center"
                          title="View Product"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>

                        {/* Edit Button */}
                        <Link
                          href={`/admin/products/update/${product._id}`}
                          className="p-2 rounded-lg bg-default-100 hover:bg-default-200 transition-colors text-default-600 inline-flex items-center justify-center"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleDelete(product._id)}
                          className="p-2 rounded-lg bg-danger-50 hover:bg-danger-100 transition-colors text-danger inline-flex items-center justify-center cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <Table.Cell
                    colSpan={6}
                    className="text-center py-6 text-default-500"
                  >
                    No products found matching your filters.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer />
      </Table>

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

export default AdminProductManage;
