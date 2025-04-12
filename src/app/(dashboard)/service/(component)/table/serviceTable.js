"use client";
import { Table } from "@/component/table/table";
import { httpRequest } from "@/lib/axios/axiosInstance";
import { useRouter } from "next/navigation";
import React from "react";

export const ServiceTable = ({ data, token }) => {
  const columns = [
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
  ];
  const router = useRouter();

  const handleDone = async (id) => {
    console.log(token);

    const confirmDelete = confirm("Are you sure you want to  delete this car?");
    if (!confirmDelete) return;

    try {
      await httpRequest.put(
        `/services/done/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      router.refresh();
    } catch (error) {
      alert("Failed to update service to done.");
    }
  };

  const renderAction = (row) => {
    if (row.is_done) return;

    return (
      <div className="flex gap-2">
        <button
          onClick={() => handleDone(row.id)}
          className="text-green-600 hover:underline"
        >
          Done
        </button>
      </div>
    );
  };

  return <Table columns={columns} data={data} renderAction={renderAction} />;
};
