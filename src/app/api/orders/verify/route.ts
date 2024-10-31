import { NextRequest, NextResponse } from "next/server";
import Cashfree from "@/utils/cashfree";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  try {
    const body = await req.json();
    const orderId = body.orderId;

    const r = await Cashfree.PGOrderFetchPayments("2023-08-01", orderId);
    const data = r.data as any;

    if (data.length > 0 && data[0].payment_status === "SUCCESS") {
      const { error } = await supabase
        .from("payments")
        .update({ paid: true })
        .eq("id", orderId);
      return NextResponse.json({ success: true, data: data[0] });
    }
    return NextResponse.json({ success: false, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "An error occured" },
      { status: 500 }
    );
  }
}
