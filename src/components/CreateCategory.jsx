"use client";

import React, { useState } from "react";
import { Check, ArrowLeft } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { postCategory } from "@/lib/actions/Categories";
import { useRouter } from "next/navigation";

const CreateCategory = () => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const result = await postCategory(data);
      console.log("Category created:", result);
      setSuccessMessage("Category created successfully! Redirecting...");

      setTimeout(() => {
        router.push("/admin/categories");
      }, 1000);
    } catch (error) {
      console.error("Submission error:", error);
      setErrorMessage(error.message || "Create Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-6">Create Category</h1>

      <div className="w-full max-w-md">
        <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex justify-end">
            <Button
              className={""}
              type="button"
              variant="ghost"
              isDisabled={isLoading}
              onPress={() => router.back()}
            >
              <ArrowLeft />
              Back
            </Button>
          </div>
          <TextField isRequired name="name" type="text" maxLength={50}>
            <Label>Category</Label>
            <Input placeholder="shirt" />
            <FieldError />
          </TextField>

          <TextField isRequired name="slug" type="text" maxLength={50}>
            <Label>Slug</Label>
            <Input placeholder="shirt" />
            <FieldError />
          </TextField>

          <div className="flex gap-2 flex-wrap mt-2">
            <Button type="submit" isDisabled={isLoading}>
              <Check />
              {isLoading ? "Submitting..." : "Submit"}
            </Button>
            <Button type="reset" variant="secondary" isDisabled={isLoading}>
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
    </div>
  );
};

export default CreateCategory;
