import { cookies } from "next/headers";
import ApproveProposalForm from "../../(component)/form/approveProposalForm";
import { approveRepairProposal } from "@/lib/actions/repairProposal/approveRepairProposal";

const RepairProposalForm = async ({ params }) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const updateRepairProposalWithId = approveRepairProposal.bind(
    null,
    (await params).id
  );

  return (
    <ApproveProposalForm
      action={updateRepairProposalWithId}
      header={"Approve Repair Proposal"}
    />
  );
};

export default RepairProposalForm;
