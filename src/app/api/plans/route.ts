import { NextResponse } from "next/server";

const plans = [
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

export async function GET() {
  return NextResponse.json({ success: true, data: plans });
}
