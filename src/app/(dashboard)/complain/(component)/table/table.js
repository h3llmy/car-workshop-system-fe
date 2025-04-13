"use client";
import { Table } from "@/component/table/table";
import React from "react";

export const ComplainTable = ({ data }) => {
  const columns = [
    { label: "Description", key: "description" },
    { label: "Proposal Description", key: "repair_proposal.description" },
    { label: "Car name", key: "repair_proposal.car.name" },
  ];

  return <Table columns={columns} data={data} />;
};
