"use server";

import { httpRequest } from "@/lib/axios/axiosInstance";
import { cookies } from "next/headers";

export async function register(_currentState, formData) {
  try {
    const cookieStore = await cookies();
    const response = await httpRequest.post(
      "/register",
      {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    cookieStore.set("token", response.data.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return {
      success: true,
      message: response.data.message,
      token: response.data.data.token,
    };
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Login failed. Please try again.";
    return { success: false, error: errorMessage };
  }
}
