import React from "react";
import Link from "next/link";
import { Button, Table } from "@heroui/react";
import { getCategories } from "@/lib/actions/Categories";
import { SquarePen, Trash2 } from "lucide-react";

const AdminCategoryManage = async () => {
  const response = await getCategories();
  const categories = response?.categories || response || [];

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

      <Table>
        <Table.ScrollContainer>
          <Table.Content aria-label="Categories management table">
            <Table.Header>
              {/* Added isRowHeader={true} to satisfy React Aria requirements */}
              <Table.Column isRowHeader={true}>ID / INDEX</Table.Column>
              <Table.Column>Category Name</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>
            <Table.Body>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <Table.Row key={category._id || index}>
                    <Table.Cell>{index + 1}</Table.Cell>
                    <Table.Cell>{category.name}</Table.Cell>
                    <Table.Cell>
                      <div className="flex items-center gap-3">
                       
                        <Link
                          href={`/admin/categories/update/${category._id}`}
                          className="text-gray-500 text-sm hover:text-blue-600 transition"
                        >
                          <SquarePen />
                        </Link>
                        <Trash2 color="red" className="cursor-pointer" />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
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
