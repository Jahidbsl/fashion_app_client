"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Table } from "@heroui/react";
import { deleteCategory } from "@/lib/actions/Categories";
import { SquarePen, Trash2, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const AdminCategoryManage = ({ initialCategories }) => {
  const router = useRouter();
  const [categories, setCategories] = useState(initialCategories || []);
  const [deletingId, setDeletingId] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleDelete = async (categoryId) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    setDeletingId(categoryId);
    setErrorMessage(null);

    try {
      await deleteCategory(categoryId);
      // Filter out the deleted category from local state instantly
      setCategories((prev) => prev.filter((cat) => (cat._id || cat.id) !== categoryId));
      // Refresh Next.js server cache
      router.refresh();
    } catch (error) {
      setErrorMessage(error.message || "Failed to delete category");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Manage Categories</h1>
        <Link
          href="/admin/categories/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
        >
          Create Category
        </Link>
      </div>

      {errorMessage && (
        <div className="mb-4 text-sm font-medium bg-danger-50 text-red-600 p-3 rounded-lg border border-danger-200">
          {errorMessage}
        </div>
      )}

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Categories management table">
            <Table.Header>
              <Table.Column isRowHeader={true}>ID / INDEX</Table.Column>
              <Table.Column>Category Name</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {categories.length > 0 ? (
                categories.map((category, index) => {
                  const catId = category._id || category.id;
                  const isBeingDeleted = deletingId === catId;

                  return (
                    <Table.Row key={catId || index}>
                      <Table.Cell>{index + 1}</Table.Cell>
                      <Table.Cell>{category.name}</Table.Cell>
                      <Table.Cell>
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/admin/categories/update/${catId}`}
                            className="text-gray-500 text-sm hover:text-blue-600 transition"
                          >
                            <SquarePen size={18} />
                          </Link>
                          
                          <button
                            type="button"
                            disabled={isBeingDeleted}
                            onClick={() => handleDelete(catId)}
                            className="text-red-500 hover:text-red-700 transition disabled:opacity-50 cursor-pointer"
                            title="Delete Category"
                          >
                            {isBeingDeleted ? (
                              <Loader2 className="animate-spin" size={18} />
                            ) : (
                              <Trash2 size={18} />
                            )}
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row>
                  <Table.Cell colSpan={3} className="text-center">
                    No categories found.
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        <Table.Footer>{/* Optional footer content */}</Table.Footer>
      </Table>
    </div>
  );
};

export default AdminCategoryManage;