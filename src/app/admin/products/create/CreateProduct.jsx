"use client";

import React, { useState } from "react";
import { Check, Plus, TrashBin } from "@gravity-ui/icons";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  ListBox,
  Select,
} from "@heroui/react";
import { postProduct } from "@/lib/actions/Products";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { text } from "@gravity-ui/uikit";

const CreateProduct = ({ getCats }) => {
  const router = useRouter();
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories] = useState(getCats || []);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [variants, setVariants] = useState([
    { size: "", imageUrl: "", color: "" },
  ]);
  const [p, setP] = useState("");
  const [s, setS] = useState("");

  const handelP = (value) => {
    if (value.length <= 10) {
      setP(value);
    }
  };

  const handelS = (value) => {
    if (value.length <= 10) {
      setS(value);
    }
  };

  const handleAddVariant = () => {
    setVariants([...variants, { size: "", imageUrl: "", color: "" }]);
  };

  const handleRemoveVariant = (index) => {
    const updatedVariants = variants.filter((_, i) => i !== index);
    setVariants(updatedVariants);
  };

  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...variants];
    updatedVariants[index][field] = value;
    setVariants(updatedVariants);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      category: selectedCategory,
      price: p,
      stock: s,
      description: formData.get("description"),
      variants: variants,
    };

    try {
      const result = await postProduct(data);
      console.log("Product created:", result);
      setSuccessMessage("Product created successfully! Redirecting...");

      setTimeout(() => {
        router.push("/admin/products");
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
      <h1 className="text-xl font-bold mb-6">Create Product</h1>

      <Form className="flex w-full max-w-lg flex-col gap-6" onSubmit={onSubmit}>
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
       
        <TextField isRequired name="name" type="text" maxLength={100}>
          <Label>Product Name</Label>
          <Input placeholder="e.g. Cotton T-Shirt" />
          <FieldError />
        </TextField>

        <Select
          className="w-full"
          placeholder="Select category"
          isRequired
          selectedKey={selectedCategory}
          onSelectionChange={setSelectedCategory}
        >
          <Label>Categories</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {categories.map((category) => {
                const catId = category._id || category.id;
                return (
                  <ListBox.Item
                    key={catId}
                    id={catId}
                    textValue={category.name}
                  >
                    {category.name}
                    <ListBox.ItemIndicator />
                  </ListBox.Item>
                );
              })}
            </ListBox>
          </Select.Popover>
        </Select>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold">
              Variants (Size, Image URL, Color)
            </h2>
            <Button
              type="button"
              size="sm"
              variant="flat"
              onPress={handleAddVariant}
            >
              <Plus /> Add Variant
            </Button>
          </div>

          {variants.map((variant, index) => (
            <div
              key={index}
              className="flex gap-3 items-end border p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800"
            >
              <div className="flex-1 flex flex-col gap-3">
                <TextField
                  isRequired
                  value={variant.size}
                  onChange={(val) => handleVariantChange(index, "size", val)}
                  maxLength={50}
                >
                  <Label>Size</Label>
                  <Input placeholder="M, L, XL" />
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  value={variant.imageUrl}
                  onChange={(val) =>
                    handleVariantChange(index, "imageUrl", val)
                  }
                  maxLength={150}
                >
                  <Label>Image URL</Label>
                  <Input placeholder="https://example.com/image.jpg" />
                  <FieldError />
                </TextField>

                <TextField
                  isRequired
                  value={variant.color}
                  onChange={(val) => handleVariantChange(index, "color", val)}
                  maxLength={50}
                >
                  <Label>Color</Label>
                  <Input placeholder="Red, Blue" />
                  <FieldError />
                </TextField>
              </div>

              {variants.length > 1 && (
                <Button
                  type="button"
                  color="danger"
                  variant="flat"
                  onPress={() => handleRemoveVariant(index)}
                  title="Remove Variant"
                >
                  <TrashBin />
                </Button>
              )}
            </div>
          ))}
        </div>

        <TextField
          isRequired
          name="price"
          type="number"
          value={p}
          onChange={handelP}
        >
          <Label>Price</Label>
          <Input placeholder="500" />
          <FieldError />
        </TextField>

        <TextField
          isRequired
          name="stock"
          type="number"
          value={s}
          onChange={handelS}
        >
          <Label>Stock</Label>
          <Input placeholder="200" />
          <FieldError />
        </TextField>

        <TextField name="description" maxLength={150}>
          <Label>Description</Label>
          <Input placeholder="Product descriptions..." />
          <FieldError />
        </TextField>

        <div className="flex gap-2 mt-4">
          <Button type="submit" isDisabled={isLoading}>
            <Check />
            {isLoading ? "Submitting..." : "Submit Product"}
          </Button>
          <Button
            type="reset"
            variant="secondary"
            onPress={() => {
              setVariants([{ size: "", imageUrl: "", color: "" }]);
              setP("");
              setS("");
              setSelectedCategory("");
            }}
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

export default CreateProduct;
