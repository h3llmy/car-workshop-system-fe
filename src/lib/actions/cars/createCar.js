"use server";

import { httpRequest } from "@/lib/axios/axiosInstance";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createCar(_currentState, formData) {
  try {
    const cookieStore = await cookies();
    const response = await httpRequest.post(
      "/cars",
      { name: formData.get("name") },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${cookieStore.get("token")?.value}`,
        },
      }
    );

    revalidatePath("/car");

    return {
      success: true,
      message: response.data.message,
      token: response.data.data.token,
    };
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message || "Create Car failed. Please try again.";
    return { success: false, error: errorMessage };
  }
}
