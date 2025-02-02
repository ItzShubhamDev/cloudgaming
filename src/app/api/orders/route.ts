import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

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
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "An error occured" },
      { status: 500 }
    );
  }
}
