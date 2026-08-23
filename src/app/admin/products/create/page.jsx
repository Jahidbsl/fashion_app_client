import React from "react";
import CreateProduct from "./CreateProduct";
import { getCategories } from "@/lib/actions/Categories";

const AdminProductCreate = async () => {
  const response = await getCategories();
  const categories = response?.categories || response || [];
  return (
    <div>
      <CreateProduct getCats={categories} />
    </div>
  );
};

export default AdminProductCreate;
