import { createCar } from "@/lib/actions/cars/createCar";
import { CarForm } from "../(component)/form/carForm";

const page = () => {
  return <CarForm action={createCar} header={"Create Car"} />;
};

export default page;
