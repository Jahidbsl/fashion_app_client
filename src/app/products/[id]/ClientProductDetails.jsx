"use client";

import React, { useState } from "react";
import { Button, Chip } from "@heroui/react";
import { ShoppingBag, ArrowLeft, Tag, ShieldCheck, Truck, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { authClient } from "@/lib/auth-client"; 

export default function ClientProductDetails({ product, categoryName }) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCart();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const variants = product.variants || [];
  const currentVariant = variants[selectedVariantIndex] || {};

  const discount = product.discountInfo;
  const originalPrice = Number(product.price) || 0;
  const finalPrice = discount
    ? originalPrice - (originalPrice * Number(discount.percentage)) / 100
    : originalPrice;

  const isOutOfStock = Number(product.stock) <= 0;

  const handleAddToCart = () => {
    if (!session?.user) {
      router.push(`/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
      return;
    }
    addToCart(product, currentVariant, quantity, finalPrice);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };


  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Back button */}
      <div>
        <Link href="/products">
          <Button
            variant="flat"
            size="sm"
            startContent={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Products
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 bg-content1 p-6 sm:p-8 rounded-3xl border border-default-200/60 shadow-sm">
        {/* Left Column: Image Gallery Preview */}
        <div className="space-y-4">
          <div className="relative h-[400px] sm:h-[500px] w-full rounded-2xl overflow-hidden bg-default-100 border border-default-200">
            <Image
              fill
              src={
                currentVariant.imageUrl ||
                "https://placehold.co/600x600?text=No+Image"
              }
              alt={product.name || "Product Image"}
              className="object-cover"
              priority
            />
            {discount && (
              <div className="absolute top-4 left-4 z-10">
                <Chip
                  color="danger"
                  variant="solid"
                  size="md"
                  className="font-bold shadow-md"
                >
                  <span className="flex items-center gap-1">
                    <Tag className="w-4 h-4" />
                    {discount.percentage}% OFF ({discount.code})
                  </span>
                </Chip>
              </div>
            )}
          </div>

          {/* Variants Selector Thumbnails */}
          {variants.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {variants.map((variant, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedVariantIndex(index)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    selectedVariantIndex === index
                      ? "border-primary ring-2 ring-primary/20 scale-105"
                      : "border-default-200 opacity-75 hover:opacity-100"
                  }`}
                >
                  <Image
                    fill
                    src={variant.imageUrl || "https://placehold.co/100x100"}
                    alt={`Variant ${index}`}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Actions */}
        <div className="flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Stock Badge & Category Name */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-default-500 bg-default-100 px-3 py-1 rounded-full">
                Category: {categoryName}
              </span>
              <Chip
                color={isOutOfStock ? "danger" : "success"}
                variant="flat"
                size="sm"
                className="capitalize"
              >
                {isOutOfStock
                  ? "Out of Stock"
                  : `${product.stock} items available`}
              </Chip>
            </div>

            <h1 className="text-3xl font-extrabold text-default-950 tracking-tight">
              {product.name}
            </h1>

            {/* Price Box */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-primary">
                ${finalPrice.toFixed(2)}
              </span>
              {discount && (
                <span className="text-lg text-default-400 line-through font-medium">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-default-600 leading-relaxed pt-2 border-t border-default-200/60">
              {product.description ||
                "No description provided for this product."}
            </p>

            {/* Variant Options Selection */}
            <div className="space-y-3 pt-2">
              <h3 className="text-sm font-semibold text-default-900">
                Selected Variant Options:
              </h3>
              <div className="flex flex-wrap gap-4">
                {currentVariant.color && (
                  <div className="flex items-center gap-2 bg-default-50 border border-default-200 px-3 py-1.5 rounded-xl">
                    <span className="text-xs text-default-400">Color:</span>
                    <span className="text-sm font-bold text-default-800 capitalize">
                      {currentVariant.color}
                    </span>
                  </div>
                )}
                {currentVariant.size && (
                  <div className="flex items-center gap-2 bg-default-50 border border-default-200 px-3 py-1.5 rounded-xl">
                    <span className="text-xs text-default-400">Size:</span>
                    <span className="text-sm font-bold text-default-800 uppercase">
                      {currentVariant.size}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 pt-2">
              <span className="text-sm font-semibold text-default-900">
                Quantity:
              </span>
              <div className="flex items-center border border-default-200 rounded-xl overflow-hidden bg-default-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-default-600 hover:bg-default-200 transition-colors"
                >
                  -
                </button>
                <span className="px-4 text-sm font-bold text-default-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-default-600 hover:bg-default-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons & Trust Perks */}
          <div className="space-y-6 pt-6 border-t border-default-200/60">
            <div className="flex gap-4">
              <Button
                color={isAdded ? "success" : "primary"}
                size="lg"
                className="w-full font-bold shadow-lg transition-all"
                startContent={
                  isAdded ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <ShoppingBag className="w-5 h-5" />
                  )
                }
                isDisabled={isOutOfStock}
                onPress={handleAddToCart}
              >
                {isOutOfStock
                  ? "Out of Stock"
                  : isAdded
                    ? "Added to Cart!"
                    : "Add to Cart"}
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-default-500">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-primary" />
                <span>Fast Worldwide Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>100% Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
