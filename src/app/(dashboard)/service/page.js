import { cookies } from "next/headers";
import { ServiceTable } from "./(component)/table/serviceTable";
import { httpRequest } from "@/lib/axios/axiosInstance";

const page = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const services = await httpRequest.get("/services", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return <ServiceTable data={services.data.data.data} token={token} />;
};

export default page;
