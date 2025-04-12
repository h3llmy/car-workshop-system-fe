import { cookies } from "next/headers";
import { httpRequest } from "@/lib/axios/axiosInstance";
import { updateRepairProposal } from "@/lib/actions/repairProposal/updateRepairProposal";
import RepairProposalForm from "../../(component)/form/repairProposalForm";
const Page = async ({ params }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const updateRepairProposalWithId = updateRepairProposal.bind(
    null,
    (await params).id
  );

  const cars = await httpRequest.get("/cars", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <RepairProposalForm
      action={updateRepairProposalWithId}
      header={"Update Repair Proposal"}
      cars={cars.data.data.data}
    />
  );
};

export default Page;
