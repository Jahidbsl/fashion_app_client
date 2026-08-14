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
import { postCategory } from "@/lib/actions/Categories";

const CreateCategory = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    try {
      const result = await postCategory(data);

      console.log("Category created:", result);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
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
        <div className="flex gap-2">
          <Button type="submit" isDisabled={isLoading}>
            <Check />
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
          <Button type="reset" variant="secondary">
            Reset
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateCategory;
