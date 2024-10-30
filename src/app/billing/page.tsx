"use client";

import React, { useState } from "react";
import { CreditCard, Shield } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function Billing() {
  const query = useSearchParams();
  console.log(query);
  const selectedPlan = query.get("plan") || "Pro";
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment processing here
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-800 rounded-2xl p-8">
          <h1 className="text-3xl font-bold mb-8">Complete Your Order</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-gray-700 rounded-lg px-4 py-2"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full bg-gray-700 rounded-lg px-4 py-2"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="w-full bg-gray-700 rounded-lg px-4 py-2 pl-10"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        setFormData({ ...formData, cardNumber: e.target.value })
                      }
                      required
                    />
                    <CreditCard className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full bg-gray-700 rounded-lg px-4 py-2"
                      value={formData.expiry}
                      onChange={(e) =>
                        setFormData({ ...formData, expiry: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      CVV
                    </label>
                    <input
                      type="text"
                      className="w-full bg-gray-700 rounded-lg px-4 py-2"
                      value={formData.cvv}
                      onChange={(e) =>
                        setFormData({ ...formData, cvv: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold mt-6"
                >
                  Complete Purchase
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="bg-gray-700 rounded-lg p-6">
                <div className="flex justify-between mb-4">
                  <span>{selectedPlan} Plan</span>
                  <span className="font-semibold">
                    $
                    {selectedPlan === "Starter"
                      ? "29"
                      : selectedPlan === "Pro"
                      ? "49"
                      : "99"}
                  </span>
                </div>
                <div className="border-t border-gray-600 my-4" />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>
                    $
                    {selectedPlan === "Starter"
                      ? "29"
                      : selectedPlan === "Pro"
                      ? "49"
                      : "99"}
                    /month
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-start space-x-3 text-sm text-gray-400">
                <Shield className="h-5 w-5 text-gray-500 flex-shrink-0" />
                <p>
                  Your payment information is encrypted and secure. We never
                  store your full card details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
