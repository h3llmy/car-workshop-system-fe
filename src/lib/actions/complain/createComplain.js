"use server";

import { httpRequest } from "@/lib/axios/axiosInstance";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function createComplain(proposalId, _currentState, formData) {
  try {
    const cookieStore = await cookies();
    const response = await httpRequest.post(
      "/complains",
      {
        description: formData.get("description"),
        repair_proposal_id: proposalId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${cookieStore.get("token")?.value}`,
        },
      }
    );

    revalidatePath("/complain");

    return {
      success: true,
      message: response.data.message,
      token: response.data.data.token,
    };
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Create Complain failed. Please try again.";
    return { success: false, error: errorMessage };
  }
}
