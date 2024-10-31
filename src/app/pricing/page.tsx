"use client";

import React from "react";
import { Check } from "lucide-react";

type Plan = {
  name: string;
  price: number;
  features: string[];
  hours: number;
  popular?: boolean;
};

const plans: Plan[] = [
  {
    name: "Hourly",
    price: 29,
    hours: 0,
    features: [
      "RTX 3060 GPU",
      "6-Core CPU",
      "16GB RAM",
      "250GB NVMe Storage",
      "1Gbps Network",
      "Basic Support",
    ],
  },
  {
    name: "Weekly",
    price: 99,
    hours: 5,
    features: [
      "RTX 3080 GPU",
      "8-Core CPU",
      "32GB RAM",
      "500GB NVMe Storage",
      "2.5Gbps Network",
      "Priority Support",
    ],
  },
  {
    name: "Monthly",
    price: 299,
    hours: 30,
    popular: true,
    features: [
      "RTX 4090 GPU",
      "16-Core CPU",
      "64GB RAM",
      "1TB NVMe Storage",
      "10Gbps Network",
      "24/7 Premium Support",
    ],
  },
];

export default function Pricing() {
  async function createOrder(price: number, plan: "weekly" | "monthly") {
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        body: JSON.stringify({ price, plan }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-gray-400">
            Choose the perfect plan for your gaming needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-gray-800 rounded-2xl p-8 ${
                plan.popular ? "border-2 border-blue-500" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 transform -translate-y-1/2">
                  <div className="bg-blue-500 text-sm px-3 py-1 rounded-full">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-xl font-semibold mb-4">{plan.name}</div>
              <div className="flex items-baseline mb-6">
                <span className="text-4xl font-bold">₹{plan.price}</span>
                <span className="text-gray-400 ml-2">
                  /{plan?.name.substring(0, plan.name.length - 2).toLowerCase()}
                </span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-blue-500 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`block text-center py-3 px-6 rounded-lg font-semibold w-full ${
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
                onClick={() => createOrder(plan.price, "monthly")}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
