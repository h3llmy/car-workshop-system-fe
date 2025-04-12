import React from "react";
import { httpRequest } from "@/lib/axios/axiosInstance";
import { cookies } from "next/headers";
import Link from "next/link";
import RepairProposalTable from "./(component)/table/repairProposalTable";

const Page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const [repairProposals, user] = await Promise.all([
    httpRequest.get("/repair-proposals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    httpRequest.get("/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  ]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Repair Proposal</h1>
        <Link
          href="/repair-proposal/create"
          className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Create Repair Proposal
        </Link>
      </div>
      <RepairProposalTable
        data={repairProposals.data.data.data}
        token={token}
        user={user.data.data}
      />
    </div>
  );
};

export default Page;
