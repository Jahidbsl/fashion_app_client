import React from "react";
import { getCategoryById } from "@/lib/actions/Categories";
import UpdateCategory from "./UpdateCategory";

const UpdateCategoryPage = async ({ params }) => {
  const { id } = await params;

  const response = await getCategoryById(id);
  const category = response?.category || response;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Update Category</h1>
      
      <UpdateCategory categoryId={id} initialData={category} />
    </div>
  );
};

export default UpdateCategoryPage;