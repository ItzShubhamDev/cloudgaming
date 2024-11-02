"use client";

import { useEffect, useState } from "react";
import { load } from "@cashfreepayments/cashfree-js";
import { Plus } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

type Plan = {
  name: string;
  price: number;
  features: string[];
  hours: number;
  popular?: boolean;
};

export default function Page() {
  const query = useSearchParams();
  const [cashfree, setCashfree] = useState<any>(null);
  const duration = (query.get("plan") || "weekly").toLowerCase();
  const [hours, setHours] = useState<number>(1);
  const [plan, setPlan] = useState<Plan>();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    fetch("/api/plans").then(async (r) => {
      const plans = (await r.json()) as Plan[];
      setPlans(plans);
    });
  }, []);

  useEffect(() => {
    const p = plans.find((p) => p.name.toLowerCase() === duration);
    setPlan(p);
  }, [duration, plans]);

  useEffect(() => {
    const p = plan?.price || 0;
    const h = plan?.hours || 0;
    if (hours <= h) return setPrice(p);
    setPrice(parseFloat((p + hours * 29).toFixed(2)));
  }, [hours, duration, plan]);

  async function initialize() {
    const cashfree = await load({
      mode: "sandbox",
    });
    setCashfree(cashfree);
  }

  async function createOrder(price: number, plan: string) {
    const res = await fetch("/api/orders/create", {
      method: "POST",
      body: JSON.stringify({ price, plan }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
    return {
      orderId: data.order.order_id,
      sessionId: data.order.payment_session_id,
    };
  }

  async function doPayment(sessionId: string) {
    if (!cashfree) return;
    if (!sessionId) return toast.error("Payment Gateway Error");
    console.log("Payment started");
    const options = {
      paymentSessionId: sessionId,
      redirectTarget: "_modal",
    };
    const r = await cashfree.checkout(options);
    return r;
  }

  async function verifyPayment(orderId: string) {
    const res = await fetch("/api/orders/verify", {
      method: "POST",
      body: JSON.stringify({ orderId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }

  async function handle(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const { orderId, sessionId } = await createOrder(price, duration);
    const r = await doPayment(sessionId);
    if (r.paymentDetails) {
      const r = await verifyPayment(orderId);
      if (r.data.payment_status === "SUCCESS") {
        toast.success("Payment successful");
      }
    } else {
      const r = await verifyPayment(orderId);
      console.log(r);
      if (r.error) {
        toast.error("Payment failed");
      } else if (r.redirect) {
        toast.info("Redirecting to payment gateway");
      }
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-2xl p-8">
            <div className="text-xl font-semibold mb-4">Hourly Pricing</div>
            <div className="mb-6">
              <input
                type="range"
                min={0}
                max={duration === "weekly" ? 168 : 720}
                placeholder="Hours"
                value={hours}
                onChange={(e) => setHours(parseInt(e.target.value))}
                className="bg-gray-700 text-white w-full rounded-lg"
              />
            </div>
            <div className="flex items-baseline mb-6 text-lg  font-bold">
              <span className="">Hours - </span>
              <span className="text-gray-400 ml-2">{hours}</span>
            </div>
          </div>
          <div className="bg-gray-800 rounded-2xl p-8">
            <div className="text-lg font-semibold mb-4">Plan Details</div>
            <div className="text-xl font-semibold mb-4">{plan?.name}</div>
            <div className="flex items-baseline mb-4">
              <span className="text-4xl font-bold">₹{plan?.price}</span>
              <span className="text-gray-400 ml-2">
                /{plan?.name.substring(0, plan?.name.length - 2).toLowerCase()}
              </span>
              {plan?.name.toLowerCase() !== "hourly" && (
                <>
                  <Plus className="h-5 w-5 text-blue-500 mx-2" />
                  <span className="text-sm font-bold">₹29</span>
                  <span className="text-gray-400 ml-1 text-xs">/hour</span>
                </>
              )}
            </div>
            <div className="flex items-baseline mb-2 text-sm text-gray-400">
              <span>*Prepaid Hours -</span>
              <span className="ml-1">{plan?.hours}</span>
            </div>
            {plan?.name.toLowerCase() === "hourly" && (
              <div className="items-baseline mb-4 text-sm text-gray-400">
                *Data is not saved for hourly plans
              </div>
            )}
            <div className="flex items-baseline mb-4 text-lg  font-bold">
              <span className="">Total - </span>
              <span className="text-gray-400 ml-2">₹{price}</span>
            </div>
            <button
              onClick={handle}
              className="block text-center py-3 px-6 rounded-lg font-semibold w-full bg-blue-500"
            >
              Pay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
