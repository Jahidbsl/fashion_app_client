"use client";

import React, { useState } from "react";
import { Button, Card, Input, Chip } from "@heroui/react";
import { PackageSearch, Truck } from "lucide-react";
import { getUserOrders } from "@/lib/actions/Order";

export default function CustomerOrdersPage() {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const res = await getUserOrders(email);
    if (res?.success) {
      setOrders(res.orders);
    }
    setSearched(true);
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8 my-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-default-950">Track Your Orders</h1>
        <p className="text-sm text-default-500">Enter your email address to check order statuses and delivery updates.</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-3 max-w-md mx-auto">
        <Input
          type="email"
          label="Your Email"
          placeholder="john@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          variant="bordered"
        />
        <Button type="submit" color="primary" size="lg" className="font-bold h-12" isLoading={loading}>
          Track
        </Button>
      </form>

      {searched && (
        <div className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-default-900 text-center sm:text-left">Results for {email}</h2>
          
          {orders.length === 0 ? (
            <Card className="p-8 text-center text-default-400 border border-default-200">
              No orders found matching this email address.
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {orders.map((order) => (
                <Card key={order._id} className="p-5 border border-default-200 shadow-sm space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-2 border-b border-default-100 pb-3">
                      <div>
                        <span className="text-xs text-default-400">Order Placed: {new Date(order.createdAt).toLocaleDateString()}</span>
                        <h3 className="font-bold text-default-900 text-base">Total: ${order.totalAmount?.toFixed(2)}</h3>
                      </div>
                      <Chip color="default" variant="bordered" size="sm" className="capitalize font-bold border-default-300 text-default-900">
                        {order.status}
                      </Chip>
                    </div>

                    <div className="space-y-2">
                      <span className="text-xs font-semibold text-default-500 uppercase tracking-wider">Items:</span>
                      <div className="space-y-1">
                        {order.items?.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-xs sm:text-sm text-default-700 bg-default-50 p-2 rounded-lg border border-default-100">
                            <span>{item.quantity}x {item.name}</span>
                            <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-xs text-default-400 font-mono">
                    ID: {order._id}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}