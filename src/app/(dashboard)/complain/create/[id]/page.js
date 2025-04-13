import React from "react";
import ComplainForm from "../../(component)/form/complainForm";
import { createComplain } from "@/lib/actions/complain/createComplain";

const Page = async ({ params }) => {
  const { id } = await params;
  const createComplainWithId = createComplain.bind(null, id);
  return (
    <ComplainForm action={createComplainWithId} header={"Create Complain"} />
  );
};

export default Page;
