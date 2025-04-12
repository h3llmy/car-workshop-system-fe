import React from "react";
import { CarTable } from "./(component)/table/table";
import { httpRequest } from "@/lib/axios/axiosInstance";
import { cookies } from "next/headers";
import Link from "next/link";

const Page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const cars = await httpRequest.get("/cars", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">Cars</h1>
        <Link
          href="/car/create"
          className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Create Car
        </Link>
      </div>

      <CarTable data={cars.data.data.data} token={token} />
    </div>
  );
};

export default Page;
