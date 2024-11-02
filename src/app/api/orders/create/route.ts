import { NextRequest, NextResponse } from "next/server";
import Cashfree from "@/utils/cashfree";
import { createClient } from "@/utils/supabase/server";

type Body = {
  price: number;
  user_id: string;
  plan: "Hourly" | "Weekly" | "Monthly";
};

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  try {
    const user = await supabase.auth.getUser();
    const body = (await req.json()) as Body;
    const order = await supabase
      .from("payments")
      .insert([
        {
          user_id: body.user_id || user?.data.user?.id,
          amount: body.price,
          name: body.plan,
        },
      ])
      .select();

    if (order.error) {
      return NextResponse.json(
        { success: false, error: "An error occured" },
        { status: 500 }
      );
    }

    const d = order.data as any;
    const orderId = d[0].id;

    const res = await Cashfree.PGCreateOrder("2023-08-01", {
      order_amount: body.price,
      order_currency: "INR",
      order_id: orderId,
      customer_details: {
        customer_id: user?.data.user?.id as string,
        customer_name: user?.data.user?.user_metadata.name,
        customer_email: user?.data.user?.email,
        customer_phone: "9999999999",
      },
    });

    if (res.status !== 200) {
      return NextResponse.json(
        { success: false, error: "An error occured" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: res.data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "An error occured" },
      { status: 500 }
    );
  }
}
