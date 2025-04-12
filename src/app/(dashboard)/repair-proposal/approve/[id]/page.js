"use client";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";

const RepairProposalForm = ({ action, header, cars }) => {
  const initialState = { message: "", error: null, success: false };
  const [state, formAction] = useActionState(action, initialState);
  const [repairItems, setRepairItems] = useState([
    { service: "", name: "", price: 0 },
  ]);

  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.back();
    }
  }, [state.success, router]);

  const handleAddItem = () => {
    setRepairItems([...repairItems, { service: "", name: "", price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = [...repairItems];
    newItems.splice(index, 1);
    setRepairItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...repairItems];
    newItems[index][field] = value;
    setRepairItems(newItems);
  };

  return (
    <form action={formAction} className="mx-auto">
      <h1 className="text-white text-3xl pb-5">{header}</h1>

      <div className="mb-5">
        <label
          htmlFor="car_id"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Car
        </label>
        <select
          name="car_id"
          required
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">-- Select a car --</option>
          {cars?.map((car) => (
            <option key={car.id} value={car.id}>
              {car.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label
          htmlFor="description"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Description
        </label>
        <textarea
          name="description"
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Your car name"
          required
        />
      </div>

      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Repair Items
        </label>
        {repairItems?.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              name={`repair_items[${index}][name]`}
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
              placeholder="Item name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            <input
              type="number"
              name={`repair_items[${index}][cost]`}
              value={item.cost}
              onChange={(e) => handleItemChange(index, "cost", e.target.value)}
              placeholder="Cost"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {repairItems.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveItem(index)}
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-1 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddItem}
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-1 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 mt-2"
        >
          Add Item
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

export default RepairProposalForm;
