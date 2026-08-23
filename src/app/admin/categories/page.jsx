import { getCategories } from "@/lib/actions/Categories";
import AdminCategoryManage from "./AdminCategoryManage";

export default async function CategoriesPage() {
  const response = await getCategories();
const categories = response?.categories || response || [];
  return <AdminCategoryManage initialCategories={categories} />;
}