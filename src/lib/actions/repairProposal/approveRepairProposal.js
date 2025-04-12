"use server";

import { httpRequest } from "@/lib/axios/axiosInstance";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function approveRepairProposal(
  proposalId,
  _currentState,
  formData
) {
  try {
    const cookieStore = await cookies();
    const response = await httpRequest.put(
      `/repair-proposals/accept/${proposalId}`,
      formData,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${cookieStore.get("token")?.value}`,
        },
      }
    );

    revalidatePath("/repair-proposal");

    return {
      success: true,
      message: response.data.message,
      token: response.data.data.token,
    };
  } catch (error) {
    const errorMessage =
      error?.response?.data?.message ||
      "Update Repair Proposal failed. Please try again.";
    return { success: false, error: errorMessage };
  }
}
