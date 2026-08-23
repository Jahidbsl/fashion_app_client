"use client";

import React, { useState } from "react";
import { Button, Card, Input, RadioGroup, Radio } from "@heroui/react";
import {
  ShoppingBag,
  ArrowLeft,
  CheckCircle2,
  Truck,
  CreditCard,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { createOrder } from "@/lib/actions/Order";

export default function CheckoutPage() {
  const { cart, clearCart, isLoaded } = useCart();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "Cash on Delivery",
  });

  if (!isLoaded) {
    return null;
  }

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (value) => {
    setFormData({ ...formData, paymentMethod: value });
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setLoading(true);

    const orderPayload = {
      customer: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
      },
      items: cart,
      totalAmount: subtotal,
      paymentMethod: formData.paymentMethod,
    };

    const response = await createOrder(orderPayload);

    if (response && response.success) {
      clearCart();
      setSuccess(true);
    } else {
      alert("Failed to place order. Please try again.");
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto p-8 sm:p-12 text-center space-y-6 my-12 bg-content1 rounded-3xl border border-default-200 shadow-sm mx-4 sm:mx-auto">
        <CheckCircle2 className="w-16 h-16 text-default-900 mx-auto" />
        <h2 className="text-2xl sm:text-3xl font-extrabold text-default-900">
          Order Placed Successfully!
        </h2>
        <p className="text-default-500 text-sm">
          Thank you for your purchase. We have received your order and are
          getting it ready for shipment.
        </p>
        <Link href="/products">
          <Button color="primary" className="font-bold">
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-12 text-center space-y-6">
        <ShoppingBag className="w-12 h-12 text-default-300 mx-auto" />
        <h2 className="text-2xl font-bold text-default-900">
          Your cart is empty
        </h2>
        <Link href="/products">
          <Button color="primary">Go to Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6 sm:space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-default-900 tracking-tight">
          Checkout
        </h1>
        <Link href="/cart">
          <Button
            variant="flat"
            size="sm"
            startContent={<ArrowLeft className="w-4 h-4" />}
          >
            Back to Cart
          </Button>
        </Link>
      </div>

      <form
        onSubmit={handleSubmitOrder}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-4 sm:p-6 border border-default-200 shadow-sm space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-default-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-default-900" /> Shipping Information
            </h2>

            <div className="space-y-4 pt-2">
              <Input
                label="Full Name"
                name="fullName"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                variant="bordered"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  variant="bordered"
                />
                <Input
                  label="Phone Number"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="bordered"
                />
              </div>
              <Input
                label="Street Address"
                name="address"
                placeholder="123 Fashion St"
                value={formData.address}
                onChange={handleChange}
                variant="bordered"
              />
              <Input
                label="City / Region"
                name="city"
                placeholder="Style City"
                value={formData.city}
                onChange={handleChange}
                variant="bordered"
              />
            </div>
          </Card>

          <Card className="p-4 sm:p-6 border border-default-200 shadow-sm space-y-4">
            <h2 className="text-base sm:text-lg font-bold text-default-900 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-default-900" /> Payment Method
            </h2>
            <RadioGroup
              value={formData.paymentMethod}
              onChange={handlePaymentChange}
              className="pt-2 gap-3"
            >
              <Radio value="Cash on Delivery">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  Cash on Delivery (COD)
                </Radio.Content>
              </Radio>
              <Radio value="Online Payment">
                <Radio.Content>
                  <Radio.Control>
                    <Radio.Indicator />
                  </Radio.Control>
                  Online Card Payment / Mobile Banking
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </Card>
        </div>

        <div>
          <Card className="p-4 sm:p-6 border border-default-200 shadow-sm space-y-6">
            <h2 className="text-lg font-bold text-default-900">
              Order Summary
            </h2>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="text-default-600 line-clamp-1 pr-2">
                    {item.quantity}x {item.name}{" "}
                    {item.variant?.size ? `(${item.variant.size})` : ""}
                  </div>
                  <div className="font-bold text-default-900 flex-shrink-0">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <hr className="border-default-200" />

            <div className="flex justify-between text-base font-extrabold text-default-900">
              <span>Total Payable</span>
              <span className="text-default-900 text-xl">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full font-bold shadow-lg"
              isLoading={loading}
            >
              Confirm & Place Order
            </Button>
          </Card>
        </div>
      </form>
    </div>
  );
}