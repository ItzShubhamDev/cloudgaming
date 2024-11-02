import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

type Payments = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  amount: number;
  paid: boolean;
};

export async function GET() {
  const supabase = await createClient();
  try {
    const user = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("payments")
      .select("*")
      .eq("user_id", user.data.user?.id);
    if (error) {
      return NextResponse.json({ success: false, error });
    }
    const plan = currentPlan(data as any);
    return NextResponse.json({ success: true, data: plan });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "An error occured" },
      { status: 500 }
    );
  }
}

function currentPlan(payments: Payments[]) {
  if (payments.length === 0) {
    return;
  }
  const latestPayment = payments.reduce((prevPayment, payment) => {
    return new Date(prevPayment.created_at) > new Date(payment.created_at)
      ? prevPayment
      : payment;
  });

  return latestPayment;
}
