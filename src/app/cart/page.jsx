"use client";

import React from "react";
import { Button, Card } from "@heroui/react";
import { Trash2, ShoppingBag, ArrowLeft, Plus, Minus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart();

  // Calculate subtotal
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Handle quantity adjustments precisely (+1 or -1)
  const handleUpdateQuantity = (item, delta) => {
    const newQty = item.quantity + delta;
    if (newQty > 0) {
      addToCart(
        { _id: item.productId, name: item.name, price: item.originalPrice },
        item.variant,
        delta, // passes 1 or -1 to increment/decrement accurately
        item.price
      );
    } else {
      removeFromCart(item.cartItemId);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 sm:p-12 text-center space-y-6">
        <div className="w-20 h-20 bg-default-100 rounded-full flex items-center justify-center mx-auto text-default-400">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-default-900">Your cart is empty</h2>
        <p className="text-default-500 max-w-sm mx-auto text-sm sm:text-base">
          Looks like you haven't added anything to your cart yet. Explore our products and find something you like!
        </p>
        <Link href="/products">
          <Button color="primary" variant="solid" className="font-bold">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      {/* Header & Back Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-default-950 tracking-tight">
          Shopping Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
        </h1>
        <Link href="/products">
          <Button variant="flat" size="sm" startContent={<ArrowLeft className="w-4 h-4" />}>
            Continue Shopping
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card
              key={item.cartItemId}
              className="p-4 border border-default-200/60 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Product Image */}
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-default-100 flex-shrink-0">
                  <Image
                    fill
                    src={item.imageUrl || "https://placehold.co/100x100?text=No+Image"}
                    alt={item.name}
                    className="object-cover"
                  />
                </div>

                {/* Item Details */}
                <div className="flex-1 space-y-1">
                  <h3 className="font-bold text-default-900 text-sm sm:text-base">{item.name}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-default-500">
                    {item.variant?.color && (
                      <span>Color: <strong className="capitalize text-default-700">{item.variant.color}</strong></span>
                    )}
                    {item.variant?.size && (
                      <span>Size: <strong className="uppercase text-default-700">{item.variant.size}</strong></span>
                    )}
                  </div>
                  <div className="text-primary font-black text-base sm:text-lg pt-1">
                    ${item.price.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Quantity Changer & Delete controls */}
              <div className="flex items-center justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-default-100">
                <div className="flex items-center border border-default-200 rounded-xl overflow-hidden bg-default-50">
                  <button
                    onClick={() => handleUpdateQuantity(item, -1)}
                    className="p-2 text-default-600 hover:bg-default-200 transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-3 text-sm font-bold text-default-900">{item.quantity}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item, 1)}
                    className="p-2 text-default-600 hover:bg-default-200 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <Button
                  isIconOnly
                  variant="light"
                  color="danger"
                  size="sm"
                  className="sm:ml-4"
                  onClick={() => removeFromCart(item.cartItemId)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}

          <div className="flex justify-between items-center pt-2">
            <Button color="danger" variant="flat" size="sm" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </div>

        {/* Order Summary Checkout Card */}
        <div className="space-y-4">
          <Card className="p-6 border border-default-200/60 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-default-900">Order Summary</h2>
            
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-default-600">
                <span>Subtotal</span>
                <span className="font-bold text-default-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-default-600">
                <span>Shipping</span>
                <span className="font-bold text-success">Free</span>
              </div>
              <hr className="border-default-200 my-2" />
              <div className="flex justify-between text-base font-extrabold text-default-950">
                <span>Estimated Total</span>
                <span className="text-primary text-xl">${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <Link href="/checkout" className="block w-full">
              <Button color="primary" size="lg" className="w-full font-bold shadow-lg">
                Proceed to Checkout
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}