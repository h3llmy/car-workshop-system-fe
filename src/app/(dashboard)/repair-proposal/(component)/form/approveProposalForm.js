"use client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

const ApproveProposalForm = ({ action, header }) => {
  const initialState = { message: "", error: null, success: false };
  const [state, formAction] = useActionState(action, initialState);
  const [services, setServices] = useState([
    { name: "", price: "", description: "" },
  ]);

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.back();
    }
  }, [state.success, router]);

  const handleAddService = () => {
    setServices([...services, { name: "", price: "", description: "" }]);
  };

  const handleRemoveService = (index) => {
    if (services.length === 1) return;
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
  };

  const handleServiceChange = (index, field, value) => {
    const newServices = [...services];
    newServices[index][field] = value;
    setServices(newServices);
  };

  return (
    <form action={formAction} className="mx-auto">
      <h1 className="text-white text-3xl pb-5">{header}</h1>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Services
        </label>
        {services.map((service, index) => (
          <div key={index} className="flex flex-col gap-2 mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                name={`services[${index}][name]`}
                value={service.name}
                onChange={(e) =>
                  handleServiceChange(index, "name", e.target.value)
                }
                placeholder="Name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              <input
                type="number"
                name={`services[${index}][price]`}
                value={service.price}
                onChange={(e) =>
                  handleServiceChange(index, "price", e.target.value)
                }
                placeholder="Price"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <textarea
              name={`services[${index}][description]`}
              value={service.description}
              onChange={(e) =>
                handleServiceChange(index, "description", e.target.value)
              }
              placeholder="Description"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {services.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveService(index)}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddService}
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-2"
        >
          Add Service
        </button>
      </div>

      {state.error && (
        <div className="mb-5 text-red-500 text-sm">{state.error}</div>
      )}

      <div className="flex flex-col w-full justify-end gap-2 sm:flex-row sm:gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Back
        </button>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ApproveProposalForm;
