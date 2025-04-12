import { cookies } from "next/headers";
import RepairProposalForm from "../(component)/form/repairProposalForm";
import { createRepairProposal } from "@/lib/actions/repairProposal/createRepairProposal";
import { httpRequest } from "@/lib/axios/axiosInstance";

const Page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const cars = await httpRequest.get("/cars", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <RepairProposalForm
      action={createRepairProposal}
      header={"Create Repair Proposal"}
      cars={cars.data.data.data}
    />
  );
};

export default Page;
