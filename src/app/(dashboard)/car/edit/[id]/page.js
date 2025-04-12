"use client";
import { updateCar } from "@/lib/actions/cars/updateCar";
import { useParams, useRouter } from "next/navigation";
import { CarForm } from "../../(component)/form/carForm";

const Page = () => {
  const params = useParams();
  const updateCarWithId = updateCar.bind(null, params.id);

  return <CarForm action={updateCarWithId} header={"Update Car"} />;
};

export default Page;
