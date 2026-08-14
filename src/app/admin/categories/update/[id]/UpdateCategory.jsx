"use client";

import React, { useState } from "react";
import { Check } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { UpdateCategory as updateCategoryAction } from "@/lib/actions/Categories";
import { useRouter } from "next/navigation";

const UpdateCategory = ({ categoryId, initialData }) => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [formDataState, setFormDataState] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    console.log("Sending ID:", categoryId);
    console.log("Sending Data:", formDataState);

    try {
      const result = await updateCategoryAction(categoryId, formDataState);

      console.log("Category updated:", result);
      setSuccessMessage("Category updated successfully! Redirecting...");

      setTimeout(() => {
        router.push("/admin/categories");
      }, 1000);
    } catch (error) {
      setErrorMessage(error.message || "Update Faild");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
        <TextField
          isRequired
          name="name"
          type="text"
          maxLength={50}
          value={formDataState.name}
          onChange={(value) =>
            setFormDataState((prev) => ({ ...prev, name: value }))
          }
        >
          <Label>Category</Label>
          <Input placeholder="shirt" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="slug"
          type="text"
          maxLength={50}
          value={formDataState.slug}
          onChange={(value) =>
            setFormDataState((prev) => ({ ...prev, slug: value }))
          }
        >
          <Label>Slug</Label>
          <Input placeholder="shirt" />
          <FieldError />
        </TextField>

        <div className="flex gap-2">
          <Button type="submit" isDisabled={isLoading}>
            <Check />
            {isLoading ? "Updating..." : "Update"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onPress={() =>
              setFormDataState({
                name: initialData?.name || "",
                slug: initialData?.slug || "",
              })
            }
          >
            Reset
          </Button>
        </div>
        {errorMessage && (
          <div className="text-sm font-medium bg-danger-50 text-danger p-3 rounded-lg border border-danger-200">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="text-sm font-medium bg-success-50 text-success p-3 rounded-lg border border-success-200">
            {successMessage}
          </div>
        )}
      </Form>
    </div>
  );
};

export default UpdateCategory;
