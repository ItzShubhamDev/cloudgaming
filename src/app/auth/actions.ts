"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";
import { validateEmail, validatePassword } from "./functions";

export async function login(email: string, password: string) {
  const supabase = await createClient();

  if (!validateEmail(email)) {
    return {
      success: false,
      error: "Invalid Email",
    };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath("/", "layout");
  return {
    success: true,
    error: null,
  };
}

export async function signup(name: string, email: string, password: string) {
  const supabase = await createClient();

  if (!validateEmail(email)) {
    return {
      success: false,
      error: "Invalid Email",
    };
  }
  if (!validatePassword(password)) {
    return {
      success: false,
      error: "Invalid Password",
    };
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  revalidatePath("/", "layout");
  return {
    success: true,
    error: null,
  };
}
