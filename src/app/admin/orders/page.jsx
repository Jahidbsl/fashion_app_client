"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Chip } from "@heroui/react";
import { Package, Truck, Clock, CheckCircle } from "lucide-react";
import { getAllOrders, updateOrderStatus } from "@/lib/actions/Order";

export default function AdminOrderManagePage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await getAllOrders();
    if (res?.success) {
      setOrders(res.orders);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const res = await updateOrderStatus(orderId, newStatus);
    if (res?.success) {
      fetchOrders();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-default-900">Manage Orders</h1>
          <p className="text-sm text-default-500">Track and fulfill customer store purchases.</p>
        </div>
        <Button variant="flat" onPress={fetchOrders}>Refresh List</Button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-default-500">Loading orders...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12 text-default-500">No customer orders found.</div>
        ) : (
          orders.map((order) => (
            <Card key={order._id} className="p-4 sm:p-6 border border-default-200 shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-default-100 pb-4">
                <div>
                  <span className="text-xs text-default-400 font-mono">ID: {order._id}</span>
                  <h3 className="font-bold text-default-900 text-base">{order.customer?.fullName}</h3>
                  <p className="text-xs text-default-500">{order.customer?.email} • {order.customer?.phone}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Chip 
                    variant="bordered" 
                    size="sm" 
                    className="capitalize font-semibold border-default-300 text-default-700"
                  >
                    {order.status}
                  </Chip>
                  
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="text-xs font-medium bg-default-100 text-default-800 border border-default-300 rounded-lg px-3 py-2 outline-none cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>

              {/* Order Info & Items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="md:col-span-2 space-y-2">
                  <span className="text-xs font-semibold text-default-500 uppercase tracking-wider">Items Ordered:</span>
                  <div className="space-y-1">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-default-700 text-xs sm:text-sm bg-default-50 p-2 rounded-lg border border-default-100">
                        <span>{item.quantity}x {item.name} ({item.variant?.size || "Std"})</span>
                        <span className="font-bold text-default-900">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-default-50 p-4 rounded-xl flex flex-col justify-between space-y-2 border border-default-100">
                  <div>
                    <span className="text-xs text-default-400">Shipping Address:</span>
                    <p className="text-xs font-medium text-default-700">{order.customer?.address}, {order.customer?.city}</p>
                  </div>
                  <div className="flex justify-between items-center font-extrabold text-default-900 pt-2 border-t border-default-200">
                    <span>Total Amount:</span>
                    <span className="text-default-900 text-base">${order.totalAmount?.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}