"use client";
import { Table } from "@/component/table/table";
import { httpRequest } from "@/lib/axios/axiosInstance";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const RepairProposalTable = ({ data, token, user }) => {
  const columns = [
    { label: "Car Name", key: "car.name" },
    {
      label: "is done",
      key: "is_done",
      transform: (value) => (value ? "Yes" : "No"),
    },
    {
      label: "is approved",
      key: "is_approved",
      transform: (value) => (value ? "Yes" : "No"),
    },
    { label: "description", key: "description" },
    {
      label: "repaired at",
      key: "created_at",
      transform: (value) => new Date(value).toLocaleDateString("id-ID"),
    },
  ];
  const router = useRouter();

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Are you sure you want to  delete this car?");
    if (!confirmDelete) return;

    try {
      await httpRequest.delete(`/repair-proposals/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      router.refresh();
    } catch (error) {
      alert("Failed to delete car.");
    }
  };

  const renderAction = (row) => (
    <div className="flex gap-2">
      <Link
        href={`/repair-proposal/edit/${row.id}`}
        className="text-blue-600 hover:underline"
      >
        Edit
      </Link>

      {user.roles.map((d) => d.name).includes("super admin") && (
        <Link
          href={`/repair-proposal/approve/${row.id}`}
          className="text-green-600 hover:underline"
        >
          Approve
        </Link>
      )}
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

export default RepairProposalTable;
