"use client";
import { Table } from "@/component/table/table";
import { httpRequest } from "@/lib/axios/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export const CarTable = ({ data, token }) => {
  const columns = [
    { label: "Name", key: "name" },
    { label: "Owner", key: "user.name" },
  ];
  const router = useRouter();

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to  delete this car?");
    if (!confirmDelete) return;

    try {
      await httpRequest.delete(`/cars/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      router.refresh();
    } catch (error) {
      alert("Failed to delete car.");
      console.error(error);
    }
  };

  const renderAction = (row) => (
    <div className="flex gap-2">
      <Link
        href={`/car/edit/${row.id}`}
        className="text-blue-600 hover:underline"
      >
        Edit
      </Link>
      <button
        onClick={() => handleDelete(row.id)}
        className="text-red-600 hover:underline"
      >
        Delete
      </button>
    </div>
  );

  return <Table columns={columns} data={data} renderAction={renderAction} />;
};
