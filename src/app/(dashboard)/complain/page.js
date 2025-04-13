import React from "react";
// import { CarTable } from "./(component)/table/table";
import { httpRequest } from "@/lib/axios/axiosInstance";
import { cookies } from "next/headers";
import Link from "next/link";
import { ComplainTable } from "./(component)/table/table";

const Page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const complains = await httpRequest.get("/complains", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Complain</h1>
      </div>

      <ComplainTable data={complains.data.data.data} />
    </div>
  );
};

export default Page;
